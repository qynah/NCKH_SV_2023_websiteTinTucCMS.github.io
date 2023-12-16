var StorageAccount = []
var boxAccount = document.querySelector('.BoxLogin')
var Clock = document.querySelector('.Clock')

function initAccount() {
    const data = JSON.parse(localStorage.getItem('ListAccount'))
    if (data !== null) {
        data.forEach((item) => {
            StorageAccount.push(item)
        })
    }

    const ArrAccount = {
        Username: "admin",
        Password: "123",
        Gmail: "admin@gmail.com",
        CheckOnline: false,
    }
    let check = 0;
    StorageAccount.forEach(item => {
        if (item.Gmail === "admin@gmail.com") {
            check = 1
        }
    })
    if (check === 0) {
        StorageAccount.push(ArrAccount)
        saveStorageAccount()
    }

    StorageAccount.forEach(item => {
        if (item.CheckOnline === true) {
            // <p class="username">${item.Username}</p>
            boxAccount.innerHTML = `  
            <a class="logout" onclick="Logout()">Đăng xuất</a>`
            if (item.Gmail === "admin@gmail.com" && item.Password === "123") {
                Clock.classList.remove("none")
            }
        }

    })
}
initAccount()

Logout = function () {
    StorageAccount.forEach(item => {
        if (item.CheckOnline) {
            item.CheckOnline = false
            saveStorageAccount()
        }
    })
    location.reload()
}

function saveStorageAccount() {
    localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
}