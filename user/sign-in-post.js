const User = require('./user')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-in/post==============='+name+' '+password)
    let user
    try{
        user = new User({name, password})
    }catch(e){
        console.log(e)
    }
    if(user.validate()){
        console.log('user is valid')
    }else{
        console.log('user is invalid')
    }
    console.log(user)

    // let data = await Service.login(name, password)
    // ctx.response.body = data
    await ctx.render('sign-in-success',{
        title:'Sign in success',
    })
}