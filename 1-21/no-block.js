let fs = require('fs');

fs.readFile('block.text', (err, data) => {
  if(err) {
    return console.error(err);
  }
  console.log('data', data.toString());
});

console.log('程序结束~');