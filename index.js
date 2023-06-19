const express = require('express');
const startSpeechToTextConversion = require('./speechToTextConversion');
const generateTextWithGPT = require('./openai');
const textToSpeech = require('./textToSpeech');
const joinZoomMeeting = require('./client');

const app = express();
app.use(express.json());

// Set up WebSocket server for speech-to-text conversion
const transcriptionCallback = (transcription) => {
  // Pass the transcription to GPT for text generation
  generateTextWithGPT(transcription, textGenerationCallback);
};

startSpeechToTextConversion(transcriptionCallback);

// Text generation callback
const textGenerationCallback = (generatedText) => {
  // Convert generated text to speech
  textToSpeech(generatedText, (speechAudio) => {
    // Pass the synthesized speech audio to Zoom integration
    joinZoomMeeting(speechAudio);
  });
};

// API endpoint to start the speech-to-text conversion and join the Zoom meeting
app.post('/startMeeting', (req, res) => {
  const { meetingLink } = req.body;

  // Join Zoom meeting
  joinZoomMeeting(meetingLink);

  // Return a response
  res.json({ success: true, message: 'Meeting started successfully' });
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve the meetingStarted.html file
app.get('/meetingStarted.html', (req, res) => {
  res.sendFile(__dirname + '/meetingStarted.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
