const url = 'mongodb://rbacAdmin:123456@127.0.0.1:27017/rbac'

var mongoose = require('mongoose')
var clazz = require('./clazz')

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
    mongoose.model(m, new mongoose.Schema(clazz[m]))
}
console.log('mongodb connect......2')

module.exports = {
    getModel: name=>{
        try{
            console.log('--------in getModel------0')

            var m = mongoose.model(name)
            console.log('--------in getModel------1')
            console.log(m)
            // console.log(JSON.stringify(m))
            console.log('--------in getModel------2')
            return m
        }catch(e){
            console.log(e)
        }
    }
}
