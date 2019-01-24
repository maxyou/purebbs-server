const db = require('../db')

class User {

    constructor(obj) {
        this.props = { ...obj }
        console.log(this.props)
    }

    exist() {
        db.query(
            `SELECT * FROM ${db.config.tbUsers} WHERE name='${this.props.name}'`,
            []
        ).then((v) => {
            console.log('=====exist then======')
            console.log(v)

            if (v) {
                return true
            } else {
                return false
            }
        })

    }

    insert() {
        db.query(
            `INSERT INTO ${db.config.tbUsers} (name, code) VALUES ('${this.props.name}','${this.props.code}')`,
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