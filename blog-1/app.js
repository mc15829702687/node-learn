const querystring = require('querystring');
const getBlogData = require('./src/router/blog');
const getUserData = require('./src/router/user');

// 对 cookie 做限制
const setCookieTime = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

const SESSION_DATA = {};
// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  })
  return promise;
}


const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('content-type', 'application/json');

  // 公用的变量
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // 获取cookie
  const cookie = req.headers.cookie || '';
  req.cookie = {};
  cookie.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1];
    req.cookie[key] = val;
  });

  // 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];
  
  getPostData(req).then(postData => {
    req.body = postData;

    // 博客接口返回的数据
    const blogResult = getBlogData(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieTime()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    // 用户接口返回的数据
    const userResult = getUserData(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieTime()}`);
        }
        res.end(JSON.stringify(userData))
      })
      return;
    }

    // 未命中路由， 返回404
    res.writeHead(404, {
      'content-type': 'text/plain'
    });
    res.write('404 not Found\n');
    res.end();
  });
}

module.exports = serverHandle