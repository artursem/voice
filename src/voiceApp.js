// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const fs = require('fs');
const AudioRecorder = require('node-audiorecorder');
const { filePath } = require('./filePath');
const { callWhisper } = require('./callWhisper');
const { spinner } = require('./spinner');

function voiceApp() {

  // Initialize recorder and file stream.
  const audioRecorder = new AudioRecorder({
    program: 'sox',
    rate: 16000, // Sample rate.
    type: 'wav', // Format type.
    silence: 5,
  });

  // Create write stream.
  const fileStream = fs.createWriteStream(filePath, { encoding: 'binary' });

  // Start and write to the file.
  console.clear();
  const recordSpinner = spinner('Listening');
  audioRecorder.start().stream().pipe(fileStream);

  // Kill spinner
  fileStream.on('finish', () => {
    console.clear();
    clearInterval(recordSpinner);
    callWhisper();
  });
}

module.exports = {
  voiceApp,
};
