const path = require('path')
const uploadUserAvatarDir = 'upload/user/avatar'

module.exports = {
    
    getUploadUserAvatarDir(){
        return uploadUserAvatarDir
    },
    getAvatarDefault(){
        return 'assets/user/avatar/default.png'
    },
    isSysAvatar(avatarFileName){        
        if(avatarFileName.startsWith('anonymous')){ return true }
        if(avatarFileName.startsWith('myanonymous')){return true}
        if(avatarFileName.startsWith('default')){return true}        
        return false
    },
    getAvatarFilePath(avatarFileName){
        /**
         * 如果以default/anonymous/myanonymous开头，那么是系统avatar，返回真实路径，否则返回undefined
         */
        if(avatarFileName.startsWith('anonymous')){
            return 'assets/user/avatar/anonymous.png'            
        }
        if(avatarFileName.startsWith('myanonymous')){
            return 'assets/user/avatar/myanonymous.png'
        }
        if(avatarFileName.startsWith('default')){
            return 'assets/user/avatar/default.png'
        }        
        return path.join(uploadUserAvatarDir, avatarFileName)
    },
    addSecuritySelect(select){

        //暂定添加anonymous字段

        if(!select || select.length == 0){
            return 'anonymous'
        }
        
        var position = select.indexOf('anonymous')
        if(position > -1){
            return select
        }else{
            return select.concat(' anonymous')
        }
    },
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
            console.log('--------calc/getUserData-------return {}')
            return {}
        }
    }
}