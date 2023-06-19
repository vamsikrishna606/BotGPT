const fs = require('fs');
const { promisify } = require('util');
const googleTTS = require('google-tts-api');

// Function to convert text to speech
const textToSpeech = async (text, callback) => {
  try {
    // Generate the speech audio URL
    const audioUrl = googleTTS.getAudioUrl(text, {
      lang: 'en', // Language code (e.g., 'en', 'es', 'fr')
      slow: false, // Whether to use the slow-speed voice
      host: 'https://translate.google.com',
    });

    // Download the audio file
    const writeFile = promisify(fs.writeFile);
    const outputFile=speech.mp3;
    await writeFile(outputFile, await googleTTS.download(audioUrl));
    callback(outputFile);
    console.log(`Speech audio saved to: ${outputFile}`);
  } catch (error) {
    console.error('Error converting text to speech:', error);
  }
};
module.exports = textToSpeech;

// Usage example
// const text = 'Hello, how are you?';
// const outputFile = 'output.mp3';

// textToSpeech(text, outputFile);
