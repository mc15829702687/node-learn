// 导入 mysql 模块 
const mysql = require('mysql');

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'ma15829702687',
  database: 'myblogs'
});

// 开启
con.connect();

// 执行 sql 语句
let sql = `select * from blogs order by id desc`;
con.query(sql, (err, result) => {
  if(err) {
    console.error(err);
    return ;
  }
  console.log(result[0].id);
});

// 关闭连接
con.end();