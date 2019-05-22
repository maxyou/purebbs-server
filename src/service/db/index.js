// const config = require('./mysql/config')
// const query = require('./mysql/query')

// module.exports = {config, query}

const {updateUser} = require('./mongodb')
console.log('--------db/index.js-------')

module.exports = {updateUser}