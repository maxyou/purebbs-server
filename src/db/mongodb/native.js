const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
require('dotenv').config()
const url = process.env.DB_HOST

// Create a new MongoClient
const client = new MongoClient(url);
let db

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

//   const db = client.db(dbName);
  db = client.db();

//   db.collection('users').find({name:'aa'}).toArray(function(err, docs){

//     if(err){
//         console.log(err)
//     }else{
//         console.log('native find:')
//         console.log(docs)
//     }
//   })

//   client.close();
});

module.exports = {    
    db,
    getDb: ()=>client.db(),
}
