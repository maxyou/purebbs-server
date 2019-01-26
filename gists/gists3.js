function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    console.log('0-------------');
    await timeout(ms);
    console.log(value);
    console.log('1-------------');
    return 'from asyncPrint'
  }
  let r = asyncPrint('hello world', 3);
  console.log('2-------------');
  console.log(r)
  r.then((v)=>{
    console.log('3-------------');
    console.log(v);
  })