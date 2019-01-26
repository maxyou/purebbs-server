const db = require('../db')

class User {

    constructor(obj) {
        this.props = { ...obj }
        console.log(this.props)
    }

    async exist() {
        db.query(
            `SELECT * FROM ${db.config.tbUsers} WHERE name='${this.props.name}'`,
            []
        ).then((v) => {
            return new Promise((resolve, reject)=>{

                console.log('=====exist then 1======')
                console.log(v)
                
                if (v) {
                    console.log('=====exist return true======')
                    resolve(v)
                    // return true
                } else {
                    console.log('=====exist return false======')
                    reject(v)
                    // return false
                }
            })
        },
        (v)=>{
            return new Promise((resolve, reject)=>{

                console.log('=====exist then 2======')
                console.log(v)
                
                if (v) {
                    console.log('=====exist return true 2======')
                    resolve(v)
                    // return true
                } else {
                    console.log('=====exist return false 2======')
                    reject(v)
                    // return false
                }
            })
        })

    }

    insert() {
        db.query(
            `INSERT INTO ${db.config.tbUsers} (name, password) VALUES ('${this.props.name}','${this.props.code}')`,
            []
        ).then((v) => {
            console.log('=====insert then======')
            console.log(v)

            if (v) {
                return true
            } else {
                return false
            }
        })

    }

    update() {

    }
}

module.exports = User