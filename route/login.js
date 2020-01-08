// var fs = require('fs')
const iconv = require('iconv-lite');
const fs = require('fs');
var querystring = require('querystring');
// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
//var mutipart = require('connect-multiparty');
// var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用
// app.use(mutipart({
//   uploadDir: './public/image'
// }));
// 1. 创建一个路由容器
var router = express.Router()
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'jd'
});
// 返回js 代码
router.get('/getJs',function (req, res, next) {
  fs.readFile('./public/file/sendjs.js', (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  })
})
// 获取banner
router.get('/home/:id', function (req, res, next) {
  db.query(`SELECT * FROM product_image WHERE product_id =${req.params.id} order by product_id asc`, (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  });
});
// 获取歌词
router.get('/lyc', function (req, res, next) {
  let lrcArr = [];
  fs.readFile('./public/file/smlt.lrc', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let lrc = iconv.decode(data, 'gb2312').split('\n');
      let regx = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;
      let newregx = /\[\w{2}:(.*)]/;
      //因为lrc分为两部分，所以我们需要正则表达式提取这两部分，特别是对时间的提取。
      //转换成数组,然后通过foreach遍历
      let start = new Date().getTime();

      lrc.forEach((value) => {
        let str = regx.exec(value);
        if (str) {
          //  regx中的{2}是因为时，分，秒都会存在两位数，不会只有一位数。下面的newregx                        // 是		对歌词开头的一些其他部分的处理。可以忽略！
          //下面是时间的处理，需要将时分秒转换为ms。所以有以下代码的存在
          let minute = parseFloat(str[1]);
          let second = parseFloat(str[2]);
          let millisecond = parseFloat(str[3]);
          let content = str[4];
          let end = new Date().getTime();
          let time = minute * 60 * 1000 + second * 1000 + millisecond - (end - start);
          let item = {
            time: time,
            lrc: content
          }
          lrcArr.push(item)
          // setTimeout(() => {
          //   // console.log("[" + minute + ":" + second + ":" + millisecond + "]", content);
          // }, time);
        } else {
          let deputy = newregx.exec(value);
          if (deputy) {
            console.log(deputy[1]);
          }
        }
      });
    }
  });
  setTimeout(() => {
    res.cookie('isVisit', 1, {path: '/', maxAge: 60 * 1000, httpOnly: true}) // 该处是设置 cookie 与 httpOnly
    res.send(lrcArr)
  }, 200)
});

module.exports = router
