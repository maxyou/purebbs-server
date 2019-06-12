const multer = require('koa-multer')
const path = require('path')
const { user: service } = require('../../service')

const uploadDir = 'upload/user/avatar'
let fileName
const genFileNameAndRecord = (file) => {
    let fileFormat = (file.originalname).split(".")
    fileName = Date.now() + "." + fileFormat[fileFormat.length - 1]
    return fileName
}

module.exports = async (ctx, next) => {

    console.log('in upload avatar post multer')

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir) //项目根目录的upload目录
        },
        filename: function (req, file, cb) {
            cb(null, genFileNameAndRecord(file))
        }
    })
    
    let upload = multer({storage: storage})
    
    console.log('in upload avatar post multer 2')

    await upload.single('file')(ctx, next)
    
    console.log('in upload avatar post multer 3')

    await service.uploadAvatar(fileName, ctx)
    ctx.body = { code: 0, message: 'upload success' }

    console.log('in upload avatar post multer 4')

    // await ctx.render('user/upload/upload-avatar-success', {
    //     title: 'Upload avatar success',
    // })

}