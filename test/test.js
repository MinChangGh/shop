var path=require('path');
var fs=require('fs');
var multiparty = require('multiparty');//文件上传模块
var async = require('async');//异步模块


//这里定时，是做异步串行，等上执行完后，再执行下面
setTimeout(function(){
  /*进行合并文件，先创建可写流，再把所有BOLB文件读出来，
      流入可写流，生成文件
      fs.createWriteStream创建可写流
      aname是存放所有生成bolb文件路径数组:
      ['Uploads/img/3G.rar1','Uploads/img/3G.rar2',...]
  */
  var writeStream=fs.createWriteStream('./a');
  var aname=['./3.txt,./4.txt'];
  // for(var i=1;i<=total;i++){
  //   var url='Uploads/img/'+name+i;
  //   aname.push(url);
  // }

  //async.eachLimit进行同步处理
  async.eachLimit(aname,1,function(item,callback){
    //item 当前路径， callback为回调函数
    fs.readFile(item,function(err,data){
      if(err)throw err;
      //把数据写入流里
      writeStream.write(data);
      //删除生成临时bolb文件
     // fs.unlink(item,function(){console.log('删除成功');})
      callback();
    });
  },function(err){
    if (err) throw err;
    //后面文件写完，关闭可写流文件，文件已经成生完成
    writeStream.end();
    //返回给客服端，上传成功
    var data=JSON.stringify({'code':0,'msg':'上传成功'});
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end(data);//返回数据
  });
},50);