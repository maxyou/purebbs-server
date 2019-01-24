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
            console.log('=====then======')
            console.log(v)

            if (this.props.name == 'myname') {
                return true
            } else {
                return false
            }
        })

    }

    save() {
        if (this.props.id) {
            this.update()
        } else {

        }
    }

    update() {

    }
}

module.exports = User