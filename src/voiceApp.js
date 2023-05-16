// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const { filePath } = require('./filePath');
const { callWhisper } = require('./callWhisper');
const { spinner } = require('./spinner');

function voiceApp() {
  // Initialize recorder and file stream.
  const audioRecorder = new AudioRecorder({
    program: 'sox',
    rate: 16000, // Sample rate.
    type: 'wav', // Format type.
    silence: 3, // Number of seconds of silence.
  });

  // Create write stream.
  const fileStream = fs.createWriteStream(filePath, { encoding: 'binary' });

  // Start and write to the file.
  const recordSpinner = spinner('Speak');
  audioRecorder.start().stream().pipe(fileStream);
  
  // Kill spinner
  fileStream.on('finish', () => {
    clearInterval(recordSpinner);
    callWhisper();
  });

  return;
}

module.exports = {
  voiceApp,
};
