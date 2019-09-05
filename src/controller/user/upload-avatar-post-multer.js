const multer = require('koa-multer')
const path = require('path')
const { user: service } = require('../../service')
const { calc } = require('../../tool')

// const uploadUserAvatarDir = 'upload/user/avatar'


module.exports = async (ctx, next) => {

    let fileName
    let dir = calc.getUploadUserAvatarDir()

    console.log('in upload avatar post multer')

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir) //项目根目录的upload目录
        },
        filename: function (req, file, cb) {
            cb(null, calc.genFileNameAndRecord(file, function(name){fileName=name}))
        }
    })
    
    let upload = multer({storage: storage})
    
    console.log('in upload avatar post multer 2')

    await upload.single('file')(ctx, next)
    
    console.log('in upload avatar post multer 3')

    // await service.uploadAvatar(path.join(dir, fileName), ctx)
    
    ctx.body = await service.uploadAvatar(fileName, ctx)

    console.log('in upload avatar post multer 4')

    // await ctx.render('user/upload/upload-avatar-success', {
    //     title: 'Upload avatar success',
    // })

}