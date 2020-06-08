const fs = require('fs');
var querystring = require('querystring');
var express = require('express')
// 1. 创建一个路由容器
var router = express.Router()
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'jd'
});
// jsonp
router.get('/jsonp',function (req,res,next) {
  console.log(req)
  res.send('cb(1)')
})
// 获取低价商品
router.get('/api/getLow', function (req, res, next) {
  db.query(`select * from product order by product_uprice asc limit 1,8 `, (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  });
});

// 获取类型
router.get('/api/getType', function (req, res, next) {
  db.query(`SELECT * FROM category order by category_id asc`, (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  });
});

// 获取banner
router.get('/api/getBanner', function (req, res, next) {
  db.query(`SELECT * FROM product where product_uprice > 10000 order by category_id asc`, (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  });
});



module.exports = router
