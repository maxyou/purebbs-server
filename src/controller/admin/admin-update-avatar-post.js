const multer = require('koa-multer')
const path = require('path')
const { admin: service } = require('../../service')
const { calc } = require('../../tool')

const uploadDir = 'upload/user/avatar'


module.exports = async (ctx, next) => {

    let fileName

    console.log('admin in upload avatar post multer')

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir) //项目根目录的upload目录
        },
        filename: function (req, file, cb) {
            cb(null, calc.genFileNameAndRecord(file, function(name){fileName=name}))
        }
    })
    
    let upload = multer({storage: storage})
    
    console.log('admin in upload avatar post multer 2')

    await upload.single('file')(ctx, next)
    
    // console.log(ctx.body)
    console.log(ctx.req.body._id)
    // console.log(ctx.request.body)
    console.log('admin in upload avatar post multer 3')

    await service.findByIdAndUpdateAvatar(fileName, ctx.req.body._id)
    ctx.body = { code: 0, message: 'upload success' }

    console.log('admin in upload avatar post multer 4')

}