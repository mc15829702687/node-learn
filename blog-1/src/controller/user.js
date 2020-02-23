const { exec } = require('../db/mysql');

const loginCheck = (name, password) => {
  let sql = `select * from users where username = '${name}' and password = '${password}'`
  return exec(sql);
}

module.exports = { loginCheck };