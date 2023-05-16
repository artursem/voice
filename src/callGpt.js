const Configuration = require("openai").Configuration;
const OpenAIApi = require("openai").OpenAIApi;
const dotenv = require('dotenv').config();
const { spinner } = require("./spinner");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

async function callGpt(prompt) {
    const processingSpinner = spinner('Chat: ');
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(prompt),
            max_tokens: 280,
            echo: false,
            temperature: .1,
    });
    clearInterval(processingSpinner);
    const result = completion.data.choices[0].text.trim();
    console.log(`\rChat: ${result}`)
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        }
}

};

function generatePrompt(string) {
    const prompt = `You are an assistant in a chatbot. You are always nice and helpful. I will ask you a question. Question could be either in polish or in english. Do not start the response with the words "Answer" or "Odpowiedź". Please answer following question: ${string}`
    return prompt
}

module.exports = {
    callGpt
}

