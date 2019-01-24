const Koa = require('koa')
const router = require('./router')
const views = require('koa-views')
const path = require('path')
const middleware = require('./middleware')


// sqlQuery(
//   'SELECT * FROM _mysql_session_store',
//   []
// ).then((v)=>{
//   console.log('=====then======')
//   console.log(v)
// })

// async function selectAllData( ) {
//   let sql = 'SELECT * FROM _mysql_session_store'
//   console.log('===== 2 ==========')
//   let dataList = await sqlQuery( sql, [] )
//   console.log('===== 4 ==========')
  // console.log(dataList)
  // return dataList
// }
// console.log('===== 1 ==========')
// selectAllData()
// console.log('===== 3 ==========')


const app = new Koa()

app.use(views(path.join(__dirname, './view'),{
  extension: 'ejs'
}))

middleware(app)

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})