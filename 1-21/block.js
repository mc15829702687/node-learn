let fs = require('fs');

let data = fs.readFileSync('block.text');

console.log('data', data.toString());
console.log('执行结束!');
