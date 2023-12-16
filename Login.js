var email = document.querySelector('.email')
var pass = document.querySelector('.pass')
var messageError = document.querySelector('.messageError')
var submit = document.querySelector('.submit')
var StorageAccount = []

function initAccount() {
    const dataAccount = JSON.parse(localStorage.getItem('ListAccount'))
    if (dataAccount !== null) {
        dataAccount.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    StorageAccount.forEach(item => {
        console.log(item)
        console.log(StorageAccount.length)
    })
}
initAccount()


submit.addEventListener('click', function (e) {
    if (email.value.trim() === '' || pass.value.trim() === '') {
        messageError.innerHTML = 'Nhập đủ thông tin.'
    } else {
        console.log(email.value.trim(), pass.value.trim())
        var check = false
        StorageAccount.forEach(item => {
            if (item.Gmail === email.value.trim()) {
                if (item.Password === pass.value.trim()) {
                    check = true
                    item.CheckOnline = true
                    localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
                    window.location.href = 'Trangchu.html'
                }
            }
        })
        if (check === false) {
            messageError.innerHTML = 'Tài khoản hoặc mật khẩu bị sai!'
        }
    }
})