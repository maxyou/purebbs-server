module.exports = {// 提取默认公用参数对象
  appLogLevel: 'debug',  // 指定记录的日志级别
  dir: 'logs',		// 指定日志存放的目录名
  env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
  projectName: 'koa2-tutorial',  // 项目名，记录在日志中的项目信息
  serverIp: '0.0.0.0'		// 默认情况下服务器 ip 地址
}