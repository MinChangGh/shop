var express = require('express');
var app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
var bodyParser = require("body-parser");
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart(); // mutipartMiddeware 作用
app.use(mutipart({
	uploadDir: './public/image'
}));
app.use(bodyParser.urlencoded({  // bodyParser 的作用
	extended: false
}));
var mysql = require('mysql');
var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'jd'
});
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
// 查找数据
app.get('/home/:id', function(req, res, next) {
	db.query(`SELECT * FROM product_image WHERE product_id =${req.params.id}`, (err, data) => {
		if(err) {
			return err
		}

		res.redirect(302, 'http://localhost:90/src/html/test.html');
		// res.location('http://baidu.com');
		// res.send(200);
		//res.end('<script>location.href="http://baidu.com"</script>')
		//res.redirect('/src/html/test.html')
		// res.send(JSON.stringify(data))
	});
});
app.get('/banner', function(req, res, next) {
		db.query(`SELECT * FROM product_image WHERE product_id >3 AND product_id<10 GROUP BY product_id `, (err, data) => {
			if(err) {
				return err
			}

			res.send(JSON.stringify(data))
		});
});

// 获取列表

app.get('/getlist', function(req, res, next) {
  db.query(`SELECT * FROM product WHERE product_id%3=0`, (err, data) => {
    if(err) {
      return err
    }
    res.send(JSON.stringify(data))
  });
});


// upload  上传
app.post('/upload', mutipartMiddeware, function(req, res) {
	let data = JSON.stringify(req.files)
	res.send(data)

});

// login  插入数据
app.post('/login', (req, res, next) => {
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
app.post('/alter', (req, res, next) => {
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
app.post('/del', (req, res, next) => {
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

app.post('/findGoods', (req, res, next) => {
	let txt = req.body.txt
	let sql = `SELECT * FROM product WHERE product_name LIKE '%${txt}%'`
	db.query(sql, (err, data) => {
		if(err) {
			return err
		}
		res.send(JSON.stringify(data))
	});
});


app.listen(90, () => {
	console.log('listen:' + 90)
});
