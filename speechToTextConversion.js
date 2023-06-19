const WebSocket = require('ws');
const  assemblyai  = require('assemblyai');
const { Readable } = require('stream');

const api_key = 'f9cbf97979414ca58e230411acf27baa';
const client = assemblyai.setAPIKey((api_key));

// const client = assemblyai.Client;
// client.setAPIKey(api_key);

const startSpeechToTextConversion = (transcriptionCallback) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    const audioStream = new Readable();
    audioStream._read = () => {};

    const streamingConfig = {
      audio: {
        format: 'pcm',
        sample_rate: 16000,
        channels: 1,
      },
    };

    const response = client.createStreamingJob(streamingConfig)
      .then((response) => {
        const job_id = response.id;
        const websocketUrl = response.websocket_url;
        const websocket = new WebSocket(websocketUrl);

        websocket.on('message', (message) => {
          const data = JSON.parse(message);
          if (data.type === 'transcript') {
            const transcription = data.text;
            console.log('Transcription:', transcription);

            // Pass the transcription to the callback function for further processing
            transcriptionCallback(transcription);
          }
        });

        ws.on('message', (audioData) => {
          websocket.send(audioData);
        });

        ws.on('close', () => {
          console.log('WebSocket connection closed');
          websocket.sendEnd(); // Signal end of audio stream
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    audioStream.pipe(response);
  });
};

module.exports = startSpeechToTextConversion;

