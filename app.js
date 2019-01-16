const Koa = require('koa')
const router = require('./router')
const middleware = require('./middleware')

const app = new Koa()

middleware(app)

app.use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.log.info(n + ' views');

  await next()
});

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})