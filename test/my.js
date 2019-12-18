var fs = require('fs')
var str=''

fs.writeFile('my1.txt','ppppp',function (err,data) {
  console.log(data)
})

fs.readFile('./my1.txt','utf8',function (err,data) {
   str = data
})
 var buf2 = Buffer.alloc(10, 1);
 //var buf = buf.toString()

setTimeout(()=>{
  console.log(str)
  fs.appendFile('./3.txt',buf2,function (err,data) {
    console.log(data)
  })
  fs.readFile('./3.txt','utf8',function (err,data) {
    //console.log(data)
  })
},100)
