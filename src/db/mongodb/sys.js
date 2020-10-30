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

    },
    async getPostNumByCategory(category) {

        console.log('--------db/getPostNumByCategory()-------2')
        console.log(category)

        var brr = {}
        category.forEach((v)=>{
            brr = {...brr, [v.idStr]:[
                {"$match":{category:v.idStr}},
                {"$count":v.idStr}
            ]}
        })
        console.log('--------db/getPostNumByCategory()-------2.0')
        console.log(JSON.stringify(brr))
        
        var db = native.getDb()
        console.log('--------db/getPostNumByCategory()-------3')
        try{
            var a = await db.collection('posts').aggregate([    
                {
                    "$facet": brr
                }
            ]).toArray()
        }catch(e){
            console.log(e)
        }        

        console.log(JSON.stringify(a))
        console.log('--------db/getPostNumByCategory()-------4')

        // [{"category_all":[],
        //  "category_dev_web":[{"category_dev_web":66}],
        //  "category_dev_client":[{"category_dev_client":2}],
        //  "category_pm":[{"category_pm":3}],
        //  "category_job":[],
        //  "category_no_category":[{"category_no_category":3}]}]

        let aa = a[0]
        let aaa = []
        Object.keys(aa).forEach((k) => {
            if(k != category[0].idStr){ //不用返回分类“all”
                console.log(k)
                console.log(category[0].idStr)

                if(aa[k][0]){
                    aaa.push({[k]:aa[k][0][k]})
                }else{
                    aaa.push({[k]:0})
                }
            }
        })
        console.log('--------db/getPostNumByCategory()-------4.1')
        console.log(JSON.stringify(aaa))

        return {
            docs:aaa, 
            totalDocs:aaa.length,
        }
    },

}