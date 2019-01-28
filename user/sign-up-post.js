const User = require('./user')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-up/post:' + name + ' ' + password)

    let user = new User({ name, password })
    let searchResult = await user.searchByName()
    console.log('>>>>>>exist await return: ')
    let searchResultObject = JSON.parse(JSON.stringify(searchResult))
    console.log('----vv----')
    console.log(searchResultObject)
    console.log(searchResultObject.length)

    if(searchResultObject.length > 0){
        await ctx.render('sign-error', {
            title: 'user is exist already',
        })
    }else{
        let a = await user.addUser()
        console.log(a)
        if(a.affectedRows==1){
            await ctx.render('sign-up-success',{title:'user is added'})
        }else{
            await ctx.render('sign-error',{title:'user add failed'})
        }
    }
    console.log('sign-up/post===============3')
        
}