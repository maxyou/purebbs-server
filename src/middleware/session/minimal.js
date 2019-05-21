const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

// 配置存储session信息的mysql
let store = new MysqlSession({
    user: 'root',
    password: '123456',
    database: 'koa2session',
    host: '127.0.0.1',
})

// 存放sessionId的cookie配置
let cookie = {
    maxAge: '', // cookie有效时长
    expires: '',  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',

}

module.exports = () => {

    return session({
        key: 'SESSION_ID',
        store: store,
        cookie: cookie
      })
}