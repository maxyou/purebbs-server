const mysql = require('mysql')
const config = require('./config')
const pool = mysql.createPool(config.database)
const printObj = require('../../utils/printobj')

module.exports = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            // console.log(JSON.stringify(connection))
            // printObj(connection)
            
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        // console.log(rows)
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// module.exports = { query }
