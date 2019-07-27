const config = require('./config')
const native = require('./native')
// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db getByPaginate pageInfo --------------')
        // console.log(query)
        // console.log(options)
        
        var project = {}
        if(options.select){
            var s = options.select.split(' ')
            s.forEach((ss)=>{
                project[ss] = 1
            })
            // console.log(project)
        }
        
        // var res = await config.getModel('Post').paginate(query, options)
        var db = native.getDb()
        try{
            var a = await db.collection('posts').aggregate([
    
                {
                    "$facet":{
                        "docs":[
                            { "$match": query},
                            { "$project": project},
                            { "$sort": options.sort }, //注意次序，要先sort，再skip+limit
                            { "$skip": options.offset },
                            { "$limit": options.limit },
                            { "$lookup":
                                {
                                  from:"users",
                                  let: {
                                    authorId:"$authorId"
                                  },
                                  pipeline: [
                                      { "$addFields": { "userId": { "$toString": "$_id" }}},
                                      {
                                          $match:{
                                              $expr:{
                                                  $eq: ["$userId", "$$authorId"]
                                              }
                                          }
                                      },
                                      {
                                        "$project": {
                                        //   "_id": {
                                        //     "$toString": "$_id"
                                        //   },
                                          avatarFileName: 1
                                        }
                                      },
                                  ],
                                  as: "fromUser"
                                }
                            },

                        ],
                        "totalDocs":[
                            { "$count": "count" }
                        ]
                    }
                }
            ]).toArray()
        }catch(e){
            console.log(e)
        }
        
        // console.log('----------a---------')
        // console.log(JSON.stringify(a))

        // var res = await db.collection('posts').find()
        //     .limit(options.limit)
        //     .skip(options.offset)
        //     .sort({_id:-1})
        //     .toArray()

        // console.log('---------db getByPaginate res --------------')
        // console.log(res)

        // var totalDocs
        // try{
        //     const c = db.collection('posts')
        //     console.log('---------db getByPaginate totalDocs --------------2')
        //     totalDocs = await c.estimatedDocumentCount()
        // }catch(e){
        //     console.log(e)
        // }

        // console.log('---------db getByPaginate totalDocs --------------3')
        // console.log(totalDocs)

        return {
            docs:a[0].docs, 
            totalDocs:a[0].totalDocs[0]?a[0].totalDocs[0].count:0,
        }
    },
    async getPostId(){
        var postId = await config.getModel('Config').findOne({name:'postId'})
        return parseInt(postId.content)
    },
    async setPostId(postIdNum){
        return await config.getModel('Config').findOneAndUpdate({name:'postId'}, {content:''+postIdNum})
    },
    async add(post) {
        
        // console.log('--------db/mongodb/user.js-------addUser')

        // var postIdLast = await config.getModel('Config').findOne({name:'postId'})
        // console.log(postIdLast)
        // var postIdLastNew = parseInt(postIdLast.content)
        // postIdLastNew++
        // await config.getModel('Config').findOneAndUpdate({name:'postId'}, {content:''+postIdLastNew})

        // var postWithId = {...post, postId:postIdLastNew}

        var Model = config.getModel('Post')
        // console.log('--------db/mongodb/user.js-------addUser---getModel')
        //增加用户
        return await new Model(post).save(
            //注意，如果添加这个callback，那么await就返回undefined
            // function (err, res) {
            //   console.log(res)
            //   console.log(err)//成功时返回null          
            //   if (err) {
            //     console.log('mongoose save with err')        
            //   } else {
            //     console.log('mongoose save without err')
            //   }
            // }
        );
    },

    async findByIdAndUpdate({_id, ...resProps}) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndUpdate(_id, resProps)
        return res
    },

    async findByIdAndDelete({_id}) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndDelete(_id)
        return res
    },
    async findCommentByPostIdAndDelete({postId}) {

        // console.log('-----db findCommentByPostIdAndDelete-------postId:'+postId)
        // console.log(resProps)
        
        var res = await config.getModel('Comment').deleteMany({postId: postId})
        // console.log('-----db findCommentByPostIdAndDelete-------res:')
        // console.log(res)
        return res
    },
    async findAndCount(query) {
        
        console.log('-----db findAndCount-------')
        var res = await await config.getModel('Post').countDocuments(query)
        console.log('-----db findAndCount-------res:')
        // console.log(res)
        return res
    },

}