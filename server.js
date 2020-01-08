var express = require('express');
var cors = require('cors');
var app = express();
const path = require('path');
const iconv = require('iconv-lite');
const fs = require('fs');
var router = require('./route/login')
var mp4 = require('./route/mp4')
// var read = require('./component/readFile')
//var api = require('./route/api')
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用
app.use(express.static(path.join(__dirname, 'public')))

app.use(mutipart({
  uploadDir: './public/image'
}))
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({  // bodyParser 的作用
//   extended: false
// }));
//
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials",true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.setHeader('Set-Cookie', `key1=value1;expires=${getExpireTime()}`)
  next();
});
// app.use(cors({
//   credentials: true,                //如果需要跨域那么需要设置这两个属性，表示服务器端接受这个域来的信息
//   origin: 'http://localhost:8080'
// }))
function getExpireTime () {
  let d = new Date()
  d.setTime(d.getTime() + 15 * 60 * 1000)
  return d.toUTCString()
}

//
// app.use(router)
app.use(mp4)
app.listen(90, () => {
  console.log('listen:' + 90)
});
