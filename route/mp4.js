const fs = require('fs');
const path = require('path')
var express = require('express')
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用  文件上传

// 1. 创建一个路由容器
var mp4 = express.Router()
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'jd'
});
// 推送视频流
mp4.get('/video', function(req, res, next) {
  let head = { 'Content-Type': 'video/mp4' };
  //需要设置HTTP HEAD
  res.writeHead(200, head);
  //使用pipe
  fs.createReadStream('./public/mp4/xs.mp4').pipe(res);

});


// upload  上传
let a= 0
mp4.post('/upload', mutipartMiddeware, function (req, res) {
  let path = req.files.file.path
  fs.rename(path,`public/mp4/${a}.mp4`,function (err) {
    if (err) return err
  })
  console.log(req.files.file.path)
  // let data = JSON.stringify(req.files)
  a++
  res.send('200')
});
// 合并文件
mp4.get('/merge', function (req, res) {
  let filePath = path.resolve('./public/mp4')
  let files = fs.readdirSync(filePath)
  let ws = fs.createWriteStream('./public/mp4/q.mp4');

  // files.forEach((item)=>{
  //   let rs = fs.createReadStream(item)
  //   rs.on('data', function (chunk) {
  //     // console.log(chunk.length);
  //     ws.write(chunk);
  //   });
  // })
  fs.readdir('./public/mp4', (err, file) => {
    if (err) {
      return err
    }
    file.forEach((item) => {
      let rs = fs.createReadStream('./public/mp4/' + item)
        rs.on('data', function (chunk) {
          console.log(chunk.length);
          ws.write(chunk);
        });
    })
  })
  setTimeout(() => {
    ws.on('end', function () {
      ws.end()
    })
    res.send('200')
  }, 5000)
  // ws.on('end', function () {
  //   ws.end()
  //   res.send('200')
  // })
  // 文件写入流
// rs.pipe(ws);  // 管道
//   fs.readdir('./public/image',(err,file)=>{
//     if (err) {
//       return err
//     }
//     file.forEach((item)=>{
//       let rs = fs.createReadStream('./public/image/'+ item)
//       rs.on('data', function (chunk) {
//         // console.log(chunk.length);
//         ws.write(chunk);
//       });
//     })
//   })
//   setTimeout(()=>{
//     fs.rmdir('./public/image')
//     fs.mkdir('./public/image')
//     ws.end();
//   },2000)

})

module.exports = mp4
