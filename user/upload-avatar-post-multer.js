const multer = require('koa-multer')

module.exports = async (ctx, next) => {

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'user/upload/')
        },
        filename: function (req, file, cb) {
            let fileFormat = (file.originalname).split(".")
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
        }
    })

    let upload = multer({storage: storage})

    upload.single('file')(ctx, next)

    await ctx.render('upload-avatar-success', {
        title: 'Upload avatar success',
    })

}