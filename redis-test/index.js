const redis = require('redis');

// 创建 redis 客户端
const redisCli = redis.createClient(6379, '127.0.0.1');
redisCli.on('error', err  => {
    console.error(err);
});

// 设置 redis
redisCli.set('myusername', '222222', redis.print);
redisCli.get('myusername', (err, val) => {
  if(err) {
    console.error(err);
    return;
  }
  console.log('val: ', val);

  // 退出
  redisCli.quit();
});