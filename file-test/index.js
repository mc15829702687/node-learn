const fs = require('fs');
const path = require('path');
// 1. 回调函数
// function getFileName(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'json', fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     callback(data.toString());
//   });
// }

// getFileName('a.json', res => {
//   console.log('a.josn: ', res);

//   getFileName('b.json', res => {
//     console.log('b.josn: ', res);

//     getFileName('c.json', res => {
//       console.log('c.josn: ', res);
//     })
//   })
// })


// 2. Promise
function getFileName(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'json', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  })
  return promise;
}

getFileName('a.json').then(res => {
  console.log('a.json: ', res);
  return getFileName(res.next);
}).then(res => {
  console.log('b.json: ', res);
  return getFileName(res.next);
}).then(res => {
  console.log('b.json: ', res);
})