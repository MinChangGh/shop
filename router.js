
var fs = require('fs')

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用
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
// 查找数据
router.get('/home/:id', function(req, res, next) {
  db.query(`SELECT * FROM product_image WHERE product_id =${req.params.id} order by product_id asc`, (err, data) => {
    if(err) {
      return err
    }

    // res.redirect(302, 'http://localhost:90/src/html/test.html');
    // res.location('http://baidu.com');
    // res.send(200);
    //res.end('<script>location.href="http://baidu.com"</script>')
    //res.redirect('/src/html/test.html')
    res.send(JSON.stringify(data))
  });
});
router.get('/banner', function(req, res, next) {
  db.query(`SELECT * FROM product_image WHERE product_id >3 AND product_id<10 GROUP BY product_id `, (err, data) => {
    if(err) {
      return err
    }

    res.send(JSON.stringify(data))
  });
});

// 获取列表

router.get('/getlist', function(req, res, next) {
  db.query(`SELECT * FROM product WHERE product_id%3=0`, (err, data) => {
    if(err) {
      return err
    }
    res.send(JSON.stringify(data))
  });
});


// upload  上传
// router.post('/upload', mutipartMiddeware, function(req, res) {
//   let data = JSON.stringify(req.files)
//   res.send(data)
//
// });

// login  插入数据
router.post('/login', (req, res, next) => {
  let user_name = req.body.user
  let pwd = req.body.pwd
  let phone = req.body.phone
  let sql = `INSERT INTO user (pay_password,user_name,login_password,user_number) VALUES ('19','${user_name}',${pwd},'${phone}')`
  db.query(sql, (err, data) => {
    if(err) {
      return err
    }
    //res.location('http://www.baidu.com')
    // res.send('ok')
  });
});
// 修改数据
router.post('/alter', (req, res, next) => {
  let user_name = req.body.user
  let pwd = req.body.pwd
  console.log(user_name)
  console.log(pwd)
  let sql = `UPDATE user SET login_password= '${pwd}' WHERE user_name= '${user_name}'`
  db.query(sql, (err, data) => {
    if(err) {
      return err
    }
    console.log(data)
    res.send('ok')
  });
});
// 删除 数据
router.post('/del', (req, res, next) => {
  let user_name = req.body.user
  let pwd = req.body.pwd
  console.log(user_name)
  console.log(pwd)
  let sql = `DELETE FROM user WHERE user_name= '${user_name}'`
  db.query(sql, (err, data) => {
    if(err) {
      return err
    }
    console.log(data)
    res.send('ok')
  });
});

// 搜索商品 DELETE FROM 表名称 WHERE 列名称 = 值

router.post('/findGoods', (req, res, next) => {
  let txt = req.body.txt
  let sql = `SELECT * FROM product WHERE product_name LIKE '%${txt}%'`
  db.query(sql, (err, data) => {
    if(err) {
      return err
    }
    res.send(JSON.stringify(data))
  });
});
