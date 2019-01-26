
async function getS1(){
    const s1 = await new Promise(resolve => resolve('from resolve s1'))
    console.log(s1)
  }
  getS1()
  
  const s2 = new Promise(resolve => resolve('from resolve s2'))
  s2.then(v=>{console.log(v)})