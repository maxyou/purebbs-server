const db = require('../db')

class User {

    constructor(obj) {
        this.props = { ...obj }
        console.log(this.props)
    }

    exist() {
        return db.query(
            `SELECT * FROM ${db.config.tbUsers} WHERE name='${this.props.name}'`,
            []
        )
    }    

    insert() {
        return db.query(
            `INSERT INTO ${db.config.tbUsers} (name, password) VALUES ('${this.props.name}','${this.props.code}')`,
            []
        )
    }

    update() {

    }
}

module.exports = User