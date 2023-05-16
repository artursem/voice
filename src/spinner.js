function spinner(message) {
  // const frames = ['-', '\\', '|', '/'];
  // const framesV2 = ['◜ ', ' ◝', ' ◞', '◟ '];
  const framesV3 = '⣾⣽⣻⢿⡿⣟⣯⣷'.split('');
  let i = 0;

  return setInterval(() => {
    // eslint-disable-next-line no-plusplus
    process.stdout.write(`\r${framesV3[i++ % framesV3.length]} ${message}`);
  }, 100);
}

module.exports = {
  spinner,
};
