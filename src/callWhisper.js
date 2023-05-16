// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { filePath } = require('./filePath');
const { spinner } = require('./spinner');
const { callGpt } = require('./callGpt');

const apiKey = process.env.OPENAI_API_KEY;

const model = 'whisper-1';

const formData = new FormData();
formData.append('model', model);
formData.append('file', fs.createReadStream(filePath));

function callWhisper() {
  const processingSpinner = spinner('User: ');
  axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then(async(response) => {
    clearInterval(processingSpinner);
    const question = response.data.text
    console.log(`\rUser: ${question}`);
    await callGpt(question)
  })
  .catch((error) => {
    clearInterval(processingSpinner);
    console.log(error);
  });
}

module.exports = {
  callWhisper,
};
