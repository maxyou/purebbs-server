
Promise.resolve('hello').then(

    function (post){
  
        console.log('1.0:'+post)
        return new Promise(function (resolve, reject) {
  
            setTimeout(function(){
                console.log('1.1:'+post)
                resolve('1.2:'+post);
                console.log('1.3:'+post)
                return '1.4'+post //no use, no where receive
            }, 2000)
            console.log('1.5:'+post)
            return '1.6:'+post
        });
  
        
    },function(){
        console.log(2)
    }
  
  ).then(
  
    function (post){
  
        console.log('2.0:'+post)
        return new Promise(function (resolve, reject) {
  
            setTimeout(function(){
                console.log('2.1:'+post)
                resolve('2.2:'+post);
                console.log('2.3:'+post)
                return '2.4'+post //no use, no where receive
            }, 2000)
            console.log('2.5:'+post)
            return '2.6:'+post
        });
  
        
    },function(){
        console.log(2)
    }
  
  ).then(
  
    function (post){
  
        console.log('3.0:'+post)
        return new Promise(function (resolve, reject) {
  
            setTimeout(function(){
                console.log('3.1:'+post)
                resolve('3.2:'+post);
                console.log('3.3:'+post)
                return '3.4'+post //no use, no where receive
            }, 2000)
            console.log('3.5:'+post)
            return '3.6:'+post
        });
  
        
    },function(){
        console.log(2)
    }
  
  ).then(
    function(post){
      console.log('4.0:'+post)
      return '4.0:'+post
    }
  ).then(
    function(post){
      console.log('5.0:'+post)
      return '5.0:'+post
    }
  ).then(
    function(post){
      console.log('6.0:'+post)
      return '6.0:'+post
    }
  ).then(
    function(post){
      console.log('7.0:'+post)
      return '7.0:'+post
    }
  )
  