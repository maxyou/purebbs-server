var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate-v2');
var clazz = require('./clazz')

const url = 'mongodb://rbacAdmin:123456@127.0.0.1:27017/rbac'

console.log('--------db/mongodb/config.js-------')

mongoose.connect(url, {useNewUrlParser: true});

console.log('mongodb connect......')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('mongodb connected')
});

for(let m in clazz){
    var Schema = new mongoose.Schema(clazz[m])
    Schema.plugin(mongoosePaginate)
    mongoose.model(m, Schema)
}
console.log('mongodb connect......2')

module.exports = {
    
    getModel: name=>{
        return mongoose.model(name)
    }
}