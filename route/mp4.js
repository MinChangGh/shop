// var fs = require('fs')
const iconv = require('iconv-lite');
const fs = require('fs');
var querystring = require('querystring');
// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用  文件上传
// app.use(mutipart({
//   uploadDir: './public/image'
// }));
// 1. 创建一个路由容器
var mp4 = express.Router()
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'jd'
});

// upload  上传
mp4.post('/upload', mutipartMiddeware, function(req, res) {
  console.log(req)
  // let data = JSON.stringify(req.files)
  res.send('ds')
});

mp4.get('/merge',function (req,res) {
  const ws = fs.createWriteStream('./public/mp4/q.mp4');  // 文件写入流
// rs.pipe(ws);  // 管道
  fs.readdir('./public/image',(err,file)=>{
    if (err) {
      return err
    }
    file.forEach((item)=>{
      let rs = fs.createReadStream('./public/image/'+ item)
      rs.on('data', function (chunk) {
        // console.log(chunk.length);
        ws.write(chunk);
      });
    })
  })
  setTimeout(()=>{
    fs.rmdir('./public/image')
    fs.mkdir('./public/image')
    ws.end();
  },2000)
  res.send('200')
})

module.exports = mp4
