const mysql = require('mysql')
const config = require('./config')
const pool = mysql.createPool(config)

pool.getConnection(function (err, connection) {

    connection.query('SELECT * FROM _mysql_session_store', (error, results, fields) => {

        console.log('====db/mysql.js=========')
        console.log(results)
        console.log('========================')
        console.log(fields)
        // 结束会话
        connection.release();

        // 如果有错误就抛出
        if (error) throw error;
    })
})

