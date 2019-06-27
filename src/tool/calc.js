
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
        if(ctx.session && ctx.session.userinfo && ctx.session.userinfo.result && ctx.session.userinfo.result.data){
            return ctx.session.userinfo.result.data
        }else{
            return {}
        }
    }
}