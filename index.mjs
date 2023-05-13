import fs from 'fs';
import axios from 'axios';
import recorder from 'node-record-lpcm16'

// Create temp file
const file = fs.createWriteStream('./audio/test.wav', { encoding: 'binary' })
 
// Create recording
const recording = recorder.record({
  sampleRate: 44100
})

recording.stream()
.pipe(file)

// Stop recording after three seconds
setTimeout(() => {
  recording.stop()
}, 3000)