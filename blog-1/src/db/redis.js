const {
  REDIS_CONF
} = require('../conf/db');
const redis = require('redis');

// 创建 redis客户端
const redisCli = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisCli.on('error', err => {
  console.error(err);
});

function set(key, val) {
  if(typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisCli.set(key, val, redis.print);
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisCli.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }

      if(val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      }catch(ex) {
        resolve(val);
      }
    });
  });

  return promise;
}

module.exports = {
  set,
  get
}