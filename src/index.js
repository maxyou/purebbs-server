const Koa = require('koa')
const router = require('./router')
const middleware = require('./middleware')

const app = new Koa()




middleware(app)

router(app)

module.exports = app