
var fs=require("fs"), //导入文件系统(File System)
  rs=fs.createReadStream("./3.txt"), //创建读取流，参数为要读取内容的文件，这里使用的是绝对路径， ./表示当前路径 ，../表示上层路径。读取的内容以buffer形式存放
  ws=fs.createWriteStream("./result.txt");

var data=Buffer.from(''), //创建一个buffer用于存储读取完的信息
  buffers=[], //创建一个数组，用于存储每一个流读取的信息
  nread=0; //用于记录读取全部内容的长度
function getContent(rs,callback) { //传入参数为：读取流，回调函数
  rs.on("data", function (chuck) { //给rs绑定data事件，用于按流读取文件内容
    buffers.push(chuck); //把读取到的buffer存入数组中
    nread += chuck.length; //记录读取文件全部内容的buffer长度
  }).on("end", function () {  //文件全部读取完，执行end事件，用于对读取的数据进行处理
    var buffer = null;
    switch (buffers.length) {
      case 0:
        buffer = new Buffer(0);
        break;
      case 1:
        buffer = buffers[0];
        break;
      default:
        buffer = new Buffer(nread);  //创建nread长度的buffer，用于存储最终的内容buffer
        for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {  //循环遍历每个装片段buffer的数组
          var chunk = buffers[i];
          chunk.copy(buffer, pos);  //把每段buffer片段，copy到新建buffer的对应位置
          pos += chunk.length;
        }
        break;
    }
    data += buffer.toString(); //把buffer转换为需要的String类型
    //使用回调函数是因为读取文件是异步的，只有等文件全部读取完，才能对其内容进行操作
    callback(data);  //把string类型的数据转化为对象，方便对数据进行修改
  });
}


getContent(rs,function(data) {
  //对文件内容进行操作...
  //操作完成之后把内容输出到里一个文件中
  ws.appendChild(data, 'utf8'); //使用write方法写文件，内容转换为string类型，并设置字符编码为utf-8，不支持gbk或gb312
  ws.end(); //文件写完之后，执行end方法，告诉程序文件已经写完

})