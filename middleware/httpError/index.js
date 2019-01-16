module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
      /**
       * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
       */
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404);
      }
    } catch (e) {

      ctx.fmtLog.info('find 404')

    }
  }
}