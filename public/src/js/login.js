
let dom  = document.getElementsByClassName('list')[0]
let audio = document.getElementsByTagName('audio')[0]
let lrcdata
// 获取歌词
function getLrc() {
  $.ajax({
    url: 'http://192.168.0.173:90/home/3',
    method: 'get',
    data: {
    },
    success: (res) => {
      lrcdata = res
    },
    error: (err) => {
    }
  })
}
// 歌词展示
function loopLrc() {
  for (let i=0; i< lrcdata.length;i++) {
    setTimeout(()=>{
      dom.innerHTML = lrcdata[i].lrc
    },lrcdata[i].time)
  }
}
getLrc()
// 监听播放
audio.addEventListener('playing', function () {
  loopLrc()
}, false);

