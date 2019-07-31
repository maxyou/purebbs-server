var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate-v2');
var clazz = require('./clazz')

const appConfig = require('../../../config')
// console.log('------------app config in mongodb.config.js--------------')
// console.log(appConfig)

// Connection URL
const url = appConfig.db.host

// console.log('--------db/mongodb/config.js-------')

mongoose.connect(url, {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

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
// console.log('mongodb connect......2')


function initConfigModelIfEmpty({name, content}){
    const ConfigModel = mongoose.model('Config')

    ConfigModel.findOne({name:name}, function(err, arg){
        if(err){
            console.log('arg err:')
            console.log(err)
        }else{
            // console.log('arg:')
            // console.log(arg)
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

initConfigModelIfEmpty({name:'postId', content:'10000'})

// await new ConfigModel({name:}).save()

module.exports = {
    
    getModel: name=>{
        return mongoose.model(name)
    }
}
