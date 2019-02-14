const formidable = require('formidable')

module.exports = async (ctx, next) => {

    let form = new formidable.IncomingForm()
    
    form.uploadDir = `${__dirname}/`
    form.keepExtensions = true

    await new Promise((resolve, reject) => {
        form.parse(
            ctx.req,
            (err, fields, files)=>{
                if(err) return reject(err)
                ctx.req.fields = fields
                ctx.req.files = files
                resolve()
            }
        )
    })

    await ctx.render('upload-avatar-success', {
        title: 'Upload avatar success',
    })

}