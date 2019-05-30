const multer = require('koa-multer')

module.exports = async (ctx, next) => {

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload') //项目根目录的upload目录
        },
        filename: function (req, file, cb) {
            let fileFormat = (file.originalname).split(".")
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
        }
    })

    let upload = multer({storage: storage})

    upload.single('file')(ctx, next)

    await ctx.render('user/upload/upload-avatar-success', {
        title: 'Upload avatar success',
    })

}