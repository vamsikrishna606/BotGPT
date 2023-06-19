const openai = require('openai');

const generateTextWithGPT = (transcription, textGenerationCallback) => {
  const openaiApiKey = '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';
  const openaiClient = new openai.OpenAIApi(openaiApiKey);

  openaiClient.complete({
    engine: 'davinci',
    prompt: transcription,
    maxTokens: 100,
    temperature: 0.7,
  })
    .then((response) => {
      const generatedText = response.choices[0].text;
      console.log('Generated Text:', generatedText);

      // Pass the generated text to the callback function for further processing
      textGenerationCallback(generatedText);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

module.exports = generateTextWithGPT;
