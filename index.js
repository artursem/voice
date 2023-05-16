const { voiceApp } = require('./src/voiceApp');

// Start the application
function startApp() {
    console.log('Press [Enter] to start');
  
    // Set raw mode to read single key press
    process.stdin.setRawMode(true);
  
    // Handle key presses
    process.stdin.on('data', (data) => {
      const key = data.toString();
  
      if (key === '\r') { // Enter key
        voiceApp();
      } else {
        process.exit();
      }
    });
  }
  
  // Run the voiceAPP() function initially
  voiceApp();
  
  // Wait for user input
  startApp();