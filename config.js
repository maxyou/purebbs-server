var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname)
}

const smtp = {
    host: "smtp.126.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'hyyouwork',
        pass: 'FlYrtxItfYeS9JRr'
    },
    email:'hyyouwork@126.com',
    nickName:'hyyouwork@126.com',
    url_domain:'http://localhost:3000'
}

const user = {
    hmacKey: 'koa2base hmackey'
}

const db = {
    host: 'mongodb://rbacAdmin:123456@127.0.0.1:27017/rbac'
}

const board = {
    
}
module.exports = {
    board,
    smtp,
    db,
    user,
    sys,
}