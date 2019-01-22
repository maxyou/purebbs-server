class User{
    constructor(obj){
        Object.assign(this, ...obj)
    }

    save(){
        if(this.id){
            this.update()
        }else{
            
        }
    }
}