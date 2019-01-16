const Service = require('./service')

module.exports = {
    index: async (ctx, next) => {
        ctx.response.body = `<h1>index page</h1>`
        ctx.fmtLog.info('root path is visited')
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
        ctx.log.info('home is visited')
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async (ctx, next) => {
        ctx.response.body =
            `
        <form action="/login/user" method="post">
          <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
          <br/>
          <input name="password" type="text" placeholder="请输入密码：123456"/>
          <br/> 
          <button>GoGoGo</button>
        </form>
      `
    },
    user: async (ctx, next) => {
        let {
            name,
            password
        } = ctx.request.body
        let data = await Service.login(name, password)
        ctx.response.body = data
    }
}