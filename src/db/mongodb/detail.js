const config = require('./config')
const native = require('./native')
// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async detailPostGet(condition, select) {

        // console.log('---------db detail get--------------')
        // console.log(condition)
        // console.log(select)
        
        var project = {}
        if(select){
            var s = select.split(' ')
            s.forEach((ss)=>{
                project[ss] = 1
            })
            // console.log(project)
        }
        // console.log('---------db detail get--------------1')

        var db = native.getDb()
        try{
            var a = await db.collection('posts').aggregate([
                { "$match": condition},
                { "$project": project},
                { "$limit": 1 },
                // { "$lookup":
                //     {
                //       from:"users",
                //       let: {
                //         authorId:"$authorId"
                //       },
                //       pipeline: [
                //           { "$addFields": { "userId": { "$toString": "$_id" }}},
                //           {
                //               $match:{
                //                   $expr:{
                //                       $eq: ["$userId", "$$authorId"]
                //                   }
                //               }
                //           },
                //           {
                //             "$project": {
                //               avatarFileName: 1,
                //               source: 1,
                //               oauth: 1
                //             }
                //           },
                //       ],
                //       as: "fromUser"
                //     }
                // },    
            ]).toArray()
        }catch(e){
            console.log(e)
        }
        
        // console.log('---------db detail get--------------2')
        // console.log(JSON.stringify(a[0].docs))
        // console.log(a[0])

        return a[0]
        
        // var res = await config.getModel('Post').findOne(condition, select)
        // console.log('---------db detail post get res --------------')
        // console.log(res)
        // return res;
    },
    async getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db comment getByPaginate pageInfo --------------')
        // console.log(query)
        // console.log(options)

        var project = {}
        if(options.select){
            var s = options.select.split(' ')

            // console.log('----------comment get select--------------')
            // console.log(s) //可以在这里强制读出anonymous这样的安全属性

            s.forEach((ss)=>{
                project[ss] = 1
            })
            // console.log(project)
        }

        var db = native.getDb()
        try{
            var a = await db.collection('comments').aggregate([
    
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
                                          avatarFileName: 1,
                                          source: 1,
                                          oauth: 1
                                        }
                                      },
                                  ],
                                  as: "fromUser"
                                }
                            },

                        ],
                        "totalDocs":[
                            { "$match": query},
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
        
        return {
            docs:a[0].docs, 
            totalDocs:a[0].totalDocs[0]?a[0].totalDocs[0].count:0,
        }

        // var res = await config.getModel('Comment').paginate(query, options)
        // console.log('---------db getByPaginate res --------------')
        // console.log(res)
        // return res;
    }, 
    
    async detailCommentAdd(comment) {
        

        var Model = config.getModel('Comment')
        // console.log('--------db/mongodb/detail.js-------detailCommentAdd')

        return await new Model(comment).save(
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
    async findByIdAndDelete({_id}) {        

        // console.log('--------db/mongodb/user.js-------addUser---getModel')
        return await config.getModel('Comment').findByIdAndDelete(_id);
    },
    async findByIdAndUpdate(comment) {        

        // console.log('--------db/mongodb/user.js-------addUser---getModel')
        return await config.getModel('Comment').findByIdAndUpdate(comment._id, comment);
    },
    async commentFindById(comment) {
        return await config.getModel('Comment').findById(comment._id);
    },

    async postFindByIdAndUpdate(post) {

        console.log('-----db postFindByIdAndUpdate-------post:')
        // console.log(JSON.stringify(post))
        // console.log(post.postId)
        // console.log(post._id)

        return await config.getModel('Post').findByIdAndUpdate(post._id, post)
    },



}