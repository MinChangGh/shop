function submit() {
  let user = document.getElementById('user').value
  let pwd = document.getElementById('pwd').value
  let phone = document.getElementById('phone').value
  $.ajax({
    url: '/home/3',
    method: 'get',
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
      console.log(err)
    }
  })
  // $.ajax({
  //   url: '/login',
  //   method: 'post',
  //   data: {
  //     user: user,
  //     pwd: pwd,
  //     phone: phone
  //   },
  //   success: (res) => {
  //     console.log(res)
  //   },
  //   error: (err) => {
  //   }
  // })
}

function alter() {
  let user = document.getElementById('user').value
  let pwd = document.getElementById('pwd').value
  $.ajax({
    url: '/alter',
    method: 'post',
    data: {
      user: user,
      pwd: pwd
    },
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
    }
  })

}
function del() {
  let user = document.getElementById('user').value
  let pwd = document.getElementById('pwd').value
  $.ajax({
    url: '/del',
    method: 'post',
    data: {
      user: user,
      pwd: pwd
    },
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
    }
  })

}
