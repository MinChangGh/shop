'use strict'  // 使用严格模式  ECMAScript5  （后端Node.js不需要考虑兼容性问题）

const fs = require("fs");

const ws = fs.createWriteStream('./public/mp4/q.mp4');  // 文件写入流
// rs.pipe(ws);  // 管道
fs.readdir('./public/image',(err,file)=>{
  if (err) {
    return err
  }
  file.forEach((item)=>{
    let rs = fs.createReadStream('./public/image'+ item)
    rs.on('data', function (chunk) {
      // console.log(chunk.length);
      ws.write(chunk);
    });
  })
})
// console.log(chunks)

// rs.on('data',function(chunk) {
//   // console.log(chunk.length);  // 65536  chunk就是一个Buffer(存放16进制数据的"数组",长度以B字节计算(两个16进制为一个元素))
//
//
//   ws.write(chunk);    // Node中的Buffer不占用垃圾回收机制中的内存。  Buffer是由C/C++模块维护。  'data'+chunk会在内部自动调用toString()函数。 建议直接返回buffer节省处理字符串的性能开销。
// });
//


