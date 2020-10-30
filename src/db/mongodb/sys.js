const config = require('./config')
const native = require('./native')
// console.log('--------db/mongodb/user.js-------')


/**
 * sys.js 系统性操作，比如查看统计信息
 */

module.exports = {

    async getTopUserByPostNum(
        query = {'statistic':{$exists:true}}, 
        options = {offset: 0, 
            limit: 25, 
            // sort:{'statistic.postNum':1}, 
            sort:{'statistic.postNum':-1},
            select:'name source statistic role'}) {

        console.log('--------db/getTopUserByPostNum()-------')

        var project = {}
        if(options.select){
            var s = options.select.split(' ')
            s.forEach((ss)=>{
                project[ss] = 1
            })
            // console.log(project)
        }
        
        console.log('--------db/getTopUserByPostNum()-------2')
        // var res = await config.getModel('Post').paginate(query, options)
        var db = native.getDb()
        console.log('--------db/getTopUserByPostNum()-------3')
        try{
            var a = await db.collection('users').aggregate([
    
                {
                    "$facet":{
                        "docs":[
                            { "$match": query},
                            { "$project": project},
                            { "$sort": options.sort }, //注意次序，要先sort，再skip+limit
                            { "$skip": options.offset },
                            { "$limit": options.limit },
                        ],
                        "totalDocs":[ //在server层已经获取了totalDocs，这里可以省略了
                            { "$match": query},
                            { "$count": "count" }
                        ]
                    }
                }
            ]).toArray()
        }catch(e){
            console.log(e)
        }        

        console.log('--------db/getTopUserByPostNum()-------4')

        return {
            docs:a[0].docs, 
            totalDocs:a[0].totalDocs[0]?a[0].totalDocs[0].count:0,
        }




        // config.getModel('User').find({}).sort({})
        return res;
    },
    async __getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db getByPaginate pageInfo admin--------------')
        // console.log(query)
        // console.log(options)
        var res = await config.getModel('User').paginate(query, options)
        // console.log('---------db getByPaginate res admin--------------')
        // console.log(res)
        return res;
    },
    async __getPostId(){
        var postId = await config.getModel('Config').findOne({name:'postId'})
        return parseInt(postId.content)
    },

}