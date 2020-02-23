// 1. 导入http模块
const http = require('http');
const querystring = require('querystring');

// 2. 创建服务
const server = http.createServer((req, res) => {
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);
  const method = req.method;

  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json');

  // 返回数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  } else if (method === 'POST') {
    let postData = '';

    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

// 3. 监听3000接口
server.listen(3000);
console.log('OK');