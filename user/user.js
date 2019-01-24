class User{
    
    constructor(obj){
        this.props = {...obj}
        console.log(this.props)
    }

    validate(){
        if(this.props.name=='myname'){
            return true
        }else{
            return flase
        }

    }

    save(){
        if(this.props.id){
            this.update()
        }else{
            
        }
    }

    update(){

    }
}

module.exports = User