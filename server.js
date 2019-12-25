var express = require('express');
var app = express();
const path = require('path');
const iconv = require('iconv-lite');
const fs = require('fs');
var router = require('./route/login')
// var read = require('./component/readFile')
//var api = require('./route/api')
app.use(express.static(path.join(__dirname, 'public')))
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({  // bodyParser 的作用
//   extended: false
// }));
//
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.use(router)
// app.use(api)
app.listen(90, () => {
  console.log('listen:' + 90)
});
