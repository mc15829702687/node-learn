const {
  loginCheck
} = require('../controller/user');
const {
  SuccessModel,
  ErrorModel
} = require('../model/model')
const { get, set } = require('../db/redis');


const getUserData = (req, res) => {
  if (req.method === 'GET' && req.path === '/api/blog/login') {
    const result = loginCheck(req.query.username, req.query.password);
    // const result = loginCheck(req.body.name, req.body.password);
    return result.then(data => {
      if (data[0]) {
        req.session.username = data[0].username;
        req.session.realname = data[0].realname;
        set('username', req.session.username);
        get('username').then(res => {
          console.log('res: ', res);
        });
        return new SuccessModel('用户登录成功！');
      }
      return new ErrorModel('用户登录失败！');
    });
  }

  // 测试
  if (req.method === 'GET' && req.path === '/api/blog/login-test') {
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }));
    }
    return Promise.resolve(new SuccessModel('用户测试尚未登录！'));
  }
}

module.exports = getUserData