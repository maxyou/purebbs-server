
module.exports = {

    genFileNameAndRecord (file, cb) {
        let fileFormat = (file.originalname).split(".")
        let fileName = Date.now() + "." + fileFormat[fileFormat.length - 1]
        if(cb){cb(fileName)}
        return fileName
    },
    isLogin(ctx){
        if(ctx.session && ctx.session.userinfo && ctx.session.userinfo.isLogin){            
            return true
        }else{
            return false
        }
    },
    getUserData(ctx){
        // console.log('--------calc/getUserData-----------')
        if(ctx.session && ctx.session.userinfo && ctx.session.userinfo.result && ctx.session.userinfo.result.data){
            // console.log('--------calc/getUserData-------return:')
            // console.log(ctx.session.userinfo.result.data)
            // console.log('--------calc/getUserData-------return:----1')
            return ctx.session.userinfo.result.data
        }else{
            // console.log('--------calc/getUserData-------return {}')
            return {}
        }
    }
}