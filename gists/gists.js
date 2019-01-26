
var p1 = new Promise(function (resolve, reject) {
    console.log("1");
    setTimeout(function(){
      console.log("from p1, before reject");//【打印次序3】
      // reject(new Error('fail in p1'));
      resolve('fail in p1');
      console.log("from p1, after reject");//【打印次序4】
    }, 3000)
    console.log("11");
  });
  
  var p2 = new Promise(function (resolve, reject) {
    console.log("2");
    setTimeout(function(){
      console.log("from p2, before resolve(p1)");//【打印次序1】
      resolve(p1);
      console.log("from p2, after resolve(p1)");//【打印次序2】
    }, 1000)
    console.log("22");
  });
  
  p2
    .then(function(result){
     console.log("p2 then resolve");
        console.log(result);
    },function(result){
      console.log("p2 then reject");
       console.log(result);
     }
    )
    .catch(function(result){
     console.log("p2 catch");
        console.log(result);//【打印次序5】
    });
  
  // sqlQuery(
  //   'SELECT * FROM _mysql_session_store',
  //   []
  // ).then((v)=>{
  //   console.log('=====then======')
  //   console.log(v)
  // })
  
  // async function selectAllData( ) {
  //   let sql = 'SELECT * FROM _mysql_session_store'
  //   console.log('===== 2 ==========')
  //   let dataList = await sqlQuery( sql, [] )
  //   console.log('===== 4 ==========')
    // console.log(dataList)
    // return dataList
  // }
  // console.log('===== 1 ==========')
  // selectAllData()
  // console.log('===== 3 ==========')