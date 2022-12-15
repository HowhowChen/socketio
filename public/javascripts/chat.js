const socket = io(`http://${window.location.hostname}:3000`)
let myName = null
console.log(window.location.hostname)
const loginBtn = document.querySelector('.login-btn')
const loginName = document.querySelector('#loginName')

loginBtn.addEventListener('click', event => {
  myName = loginName.value
  if (myName) {
    socket.emit('login', { username: myName })
  } else {
    alert('Please enter a name')
  }
})

/*登入成功*/
socket.on('loginSuccess', function(data){
  if(data.username === myName){
      checkIn(data)
  }else{
      alert('Wrong username:( Please try again!')
  }
})

/*登入失敗*/
socket.on('loginFail', function(){
  alert('Duplicate name already exists:0')
})

/*加入聊天室提示*/
socket.on('add', function(data){
  const chatCon = document.querySelector('.chat-con')
  const p = document.createElement('p')
  p.innerHTML = `<p>${data.username} 加入聊天室</p>`
  chatCon.appendChild(p)
  document.getElementById('chat-title').innerHTML = `在線人數: ${data.userCount}`
})

/*隱藏登入頁，顯示聊天頁*/
// function checkIn(data){
//   $('.login-wrap').hide('slow');
//   $('.chat-wrap').show('slow');
// }

function checkIn (data) {
  console.log(data)
}