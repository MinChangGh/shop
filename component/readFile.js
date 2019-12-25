const iconv = require('iconv-lite');
const fs = require('fs');
function read () {
  fs.readFile('./public/file/green.lrc', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let lrc = iconv.decode(data, 'UTF8').split('\n');
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
          setTimeout(() => {
            console.log("[" + minute + ":" + second + ":" + millisecond + "]",content);
          }, time);
        } else {
          let deputy = newregx.exec(value);
          if (deputy) {
            console.log(deputy[1]);
          }
        }
      });
    }
  });
}

module.exports = read
