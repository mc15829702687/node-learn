// 1. 导入http模块
const http = require('http');
const querystring = require('querystring');

// 2. 创建服务
const server = http.createServer((req, res) => {
  const url = req.url;
  res.query = querystring.parse(url.split('?')[1]);
  res.end(JSON.stringify(res.query));
});

// 3. 监听3000端口
server.listen(3000);