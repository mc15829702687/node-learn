const env = process.env.NODE_ENV;

let MYSQL_CONF = {};
let REDIS_CONF = {};

// 判断是生产环境还是开发环境
if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ma15829702687',
    database: 'myblogs'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ma15829702687',
    database: 'myblogs'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}