const {
  SuccessModel,
  ErrorModel
} = require('../model/model');
const {
  getList,
  getDeatil,
  getAddBlog,
  getUpdateBlog,
  getDelBlog
} = require('../controller/blog');

// 登录校验
const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(new SuccessModel('用户尚未登录！'));
  }
}

const getBlogData = (req, res) => {
  const id = req.query.id;
  req.body.author = 'zhangsan';   // 暂时使用假登录用户

  // 列表信息接口
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);

    return result.then(listData => {
      return new SuccessModel(listData);
    });
  }

  // 博客查询接口
  if (req.method === 'GET' && req.path === '/api/blog/find') {
    const result = getDeatil(id);
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  // 博客增加接口
  if (req.method === 'POST' && req.path === '/api/blog/add') {
    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }

    const result = getAddBlog(req.body);
    return result.then(addBlogData => {
      if(addBlogData.insertId > 0) {
        return new SuccessModel('插入成功');
      }
      return new SuccessModel('插入失败');
    });
  }

  // 博客修改接口
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }

    const result = getUpdateBlog(req.body);
    if (result) {
      return result.then(data => {
        if(data.affectedRows > 0) {
          return new SuccessModel('博客修改成功');
        } 
        return new ErrorModel('博客修改失败');
      });
    }
  }

  // 博客删除接口
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const loginResult = loginCheck(req);
    if(loginResult) {
      return loginResult;
    }
    
    const result = getDelBlog(id, req.body);
    if (result) {
      return result.then(data => {
        if(data.affectedRows > 0) {
          return new SuccessModel('博客删除成功');
        } 
        return new ErrorModel('博客删除失败');
      });
    }
  }
}

module.exports = getBlogData