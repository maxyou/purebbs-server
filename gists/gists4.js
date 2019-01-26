
async function asyncFunc(name) {

    const s1 = await new Promise(resolve => setTimeout(function(){
          console.log('---1---'+name)
          resolve('aaa')
      }, 2000));
  
    console.log(s1+'---log');
  
    const s2 = await new Promise(resolve => setTimeout(function(){
          console.log('---2---'+s1)
          resolve('bbb')
      }, 2000));
  
    console.log(s2+'---log');
  
    return s2+'---return';
  }
  
  asyncFunc('google').then(function (result) {
    console.log(result+'---in then');
  });
  