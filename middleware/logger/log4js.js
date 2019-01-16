const log4js = require('log4js');
const fmt = require("./fmt.js")
const setting = require("./setting.js")
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

const { env, appLogLevel, dir, serverIp, projectName } = setting

module.exports = () => {
  const contextLogger = {}
  const contextFmtLogger = {}
  const appenders = {}
  
  // 打印到log文件
  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }
  // 打印到服务器控制台
  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        // appenders: ['cheese','out'],
        level: appLogLevel
      }
    }
  }

  const logger = log4js.getLogger();

  return async (ctx, next) => {
    const start = Date.now()

    log4js.configure(config)
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
        logger[method](message)
      }
      contextFmtLogger[method] = (message) => {
        logger[method](fmt(ctx, message))
      }
    })
    ctx.log = contextLogger;
    ctx.fmtLog = contextFmtLogger;

    await next()
    const responseTime = Date.now() - start;
    // logger.info(fmt(ctx, `响应时间为${responseTime/1000}s`))
  }
}