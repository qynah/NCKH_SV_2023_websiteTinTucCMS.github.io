var username = document.querySelector('.username')
var gmail = document.querySelector('.email')
var pass = document.querySelector('.pass')
var messErrUsername = document.querySelector('.messErrUsername')
var messErrEmail = document.querySelector('.messErrEmail')
var messErrPass = document.querySelector('.messErrPass')
var messageNoti = document.querySelector('.messageNotification')
var submit = document.querySelector('.submit')
var checkusername = false
var checkgmail = false
var checkpass = false
var StorageAccount = []

function initAccount() {
    const data = JSON.parse(localStorage.getItem('ListAccount'))
    if (data !== null) {
        data.forEach((item) => {
            StorageAccount.push(item)
        })
    }
}
initAccount()

username.oninput = username.onblur = function () {
    var name = username.value.trim()
    if (name == "") {
        messErrUsername.innerHTML = "Không được để trống"
        checkusername = false
    } else if (name.length > 12) {
        messErrUsername.innerHTML = "Không được quá 12 ký tự"
        checkusername = false
    } else {
        messErrUsername.innerHTML = ""
        checkusername = true
    }
}

gmail.oninput = gmail.onblur = function () {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (gmail.value.trim() == "") {
        messErrEmail.innerHTML = "Không được để trống"
        checkgmail = false
    } else if (regex.test(gmail.value.trim()) == false) {
        messErrEmail.innerHTML = "Gmail chưa đúng định dạng"
        checkgmail = false
    } else {
        messErrEmail.innerHTML = ""
        checkgmail = true
    }
}

pass.oninput = pass.onblur = function () {
    var password = pass.value.trim()
    if (password == "") {
        messErrPass.innerHTML = "Không được để trống"
        checkpass = false
    } else if (password.length < 6) {
        messErrPass.innerHTML = "Tối thiểu 6 ký tự"
        checkpass = false
    } else {
        messErrPass.innerHTML = ""
        checkpass = true
    }
}

submit.addEventListener('click', function () {
    if (checkusername && checkgmail && checkpass) {
        var check = true
        StorageAccount.forEach(item => {
            if (item.Username == username.value.trim() || item.Gmail == gmail.value.trim()) {
                check = false
                messageNoti.innerHTML = "Tài khoản đã tồn tại."
            }
        })
        if (check) {
            const ArrAccount = {
                Username: username.value.trim(),
                Password: pass.value.trim(),
                Gmail: gmail.value.trim(),
                CheckOnline: false,
            }
            StorageAccount.push(ArrAccount)
            messageNoti.innerHTML = "Đăng ký thành công."
        }
        localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
    }
})