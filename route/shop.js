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

// 获取banner
router.get('/getType', function (req, res, next) {
  db.query(`SELECT * FROM category order by category_id asc`, (err, data) => {
    if (err) {
      return err
    }
    res.send(data)
  });
});


module.exports = router
