const User = require('./user')

module.exports = async (ctx, next) => {



    
    await ctx.render('upload-avatar-success', {
        title: 'Upload avatar success',
    })

}