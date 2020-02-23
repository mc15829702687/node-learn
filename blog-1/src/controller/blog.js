const { exec } = require('../db/mysql');

// 博客列表所有数据
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if(author) {
    sql += `and author = '${author}' `
  }

  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += 'order by createTime desc';
  return exec(sql);
}

// 博客查询数据
const getDeatil = (id) => {
  let sql = `select * from blogs where id = ${id}`;
  return exec(sql);
}

// 博客增加数据
const getAddBlog = (postData) => {
  // postData 里面包含 title content author
  const title = postData.title;
  const content = postData.content;
  const author = postData.author;

  let sql = `insert into blogs(title, content, author) 
  values ('${title}', '${content}', '${author}')`;

  return exec(sql);
}

const getUpdateBlog = (postData) => {
  // postData 里面包含 title content author
  const title = postData.title;
  const id = postData.id;
  const content = postData.content;

  let sql = `update blogs set title = '${title}', content = '${content}' where id = ${id}`
  return exec(sql);
}

const getDelBlog = (id, postData) => {
  const author = postData.author;

  let sql = `delete from blogs where id = ${id} and author = '${author}'`;
  return exec(sql);
}

module.exports = {
  getList,
  getDeatil,
  getAddBlog,
  getUpdateBlog,
  getDelBlog
}