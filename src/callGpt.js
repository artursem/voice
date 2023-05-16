const Configuration = require("openai").Configuration;
const OpenAIApi = require("openai").OpenAIApi;
const dotenv = require('dotenv').config();
const { spinner } = require("./spinner");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

async function callGpt(prompt) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(prompt),
            max_tokens: 80,
            echo: false,
            temperature: .1,
    });
    const result = completion.data.choices[0].text;
    console.log(result.trim())  
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        }
    }
};

function generatePrompt(string) {
    return `You are an assistant in a chatbot. You are always nice and helpful. Please help me with following task or question: ${string}`
}


// delete
async function callAndPrint(){
    const responseSpinner = spinner('Response')
    await callGpt('what is the longest river in europe?')
    clearInterval(responseSpinner)
}
callAndPrint()
// delete
module.exports = {
    callGpt
}

