const User = require('./user')

module.exports = (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-up/post===============' + name + ' ' + password)

    let user = new User({ name, password })
    let exist = user.exist()
    console.log('>>>>>>exist await return: '+exist)
    exist.then(v => {
        console.log('exist=====1')
        console.log(v)
        console.log('user is exist already')
        ctx.render('sign-error', {
            title: 'user is exist already',
        })
    }).catch(e => {
        console.log('exist=====insert========2')
        user.insert()
        console.log('user is added')
        ctx.render('sign-up-success', {
            title: 'Sign up success',
        })
    })

}