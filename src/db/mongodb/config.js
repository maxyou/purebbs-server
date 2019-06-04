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


function initConfigModel({name, content}){
    const ConfigModel = mongoose.model('Config')

    ConfigModel.findOne({name:name}, function(err, arg){
        if(err){
            console.log('arg err:')
            console.log(err)
        }else{
            console.log('arg:')
            console.log(arg)
            if(!arg){
                ConfigModel.create({name:name, content:content}, function(err, arg2){
                    if(err){
                        console.log('arg2 err:')
                        console.log(err)
                    }else{
                        console.log('arg2:')
                        console.log(arg2)
                    }
                })
            }
        }
    })    
}

initConfigModel({name:'postId', content:'10000'})

// await new ConfigModel({name:}).save()

module.exports = {
    
    getModel: name=>{
        return mongoose.model(name)
    }
}
