// const config = require('./mysql/config')
// const query = require('./mysql/query')

// module.exports = {config, query}

const {user, post, detail} = require('./mongodb')
console.log('--------db/index.js-------')

module.exports = {user, post, detail}