// 1. 导入http模块
const http = require('http');
const querystring = require('querystring');

// 2. 创建服务
const server = http.createServer((req, res) => {
  if(req.method === 'POST') {
    console.log('content-type', req.headers['content-type']);
    let postData = '';

    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      console.log('postData', postData);
      res.end('hellow world');
    });
  }
});

// 3. 监听3000端口
server.listen(3000);
console.log('ok');