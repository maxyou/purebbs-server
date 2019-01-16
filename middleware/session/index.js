const session = require("./session")
const minimal = require("./minimal")
module.exports = (app) => {
   // return session(app)
   return minimal(app)
}