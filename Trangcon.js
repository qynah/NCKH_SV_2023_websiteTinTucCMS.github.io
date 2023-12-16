var ArrPost = []
var StorageAccount = []
var boxAccount = document.querySelector('.BoxLogin')
var Clock = document.querySelector('.Clock')
var boxPost = document.querySelector('.box-post')

function initAccount() {
    const data = JSON.parse(localStorage.getItem('ListAccount'))
    if (data !== null) {
        data.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    const Data = JSON.parse(localStorage.getItem('StoragePost'))
    if (Data !== null) {
        Data.forEach((item) => {
            ArrPost.push(item)
        })
    }
    console.log(ArrPost)
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

    ArrPost.forEach(item => {
        boxPost.innerHTML += `
        <div class="row item-3-content">
        <div class="col l-6 m-6 c-12 item-3-content-img">
            <img class="imgNewhethy" src="${item.Image}" alt="">
        </div>
        <div class="col l-6 m-6 c-12">
            <p class="item-3-content-title">${item.Title}</p>
            <p class="item-3-content-time">Ngày đăng: ${item.Date}</p>
            <div class="item-3-content-notifi">${item.Content}
            </div>
        </div>
    </div>`
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

