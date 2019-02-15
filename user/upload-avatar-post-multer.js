const multer = require('koa-multer')

console.log('---multer----')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('---multer----destination:')
        console.log(file)
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log('---multer----filename:')
        console.log(file)
        let fileFormat = (file.originalname).split(".")
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
    }
})

let upload = multer({storage: storage})

console.log('---multer----before upload')

module.exports = upload.single('file')
// module.exports = async (ctx, next) => {

    // console.log('---multer----after upload')

    // await ctx.render('upload-avatar-success', {
    //     title: 'Upload avatar success',
    // })

// }