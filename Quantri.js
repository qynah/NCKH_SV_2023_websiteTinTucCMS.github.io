var title = document.querySelector('.title')
var author = document.querySelector('.author')
var content = document.querySelector('.content')
var selectElement = document.querySelector('#my-combobox')
var image = document.querySelector('input[type="file"]');
var t = document.querySelector('#preview')
var url = ""
var file = ""
var ArrImage = [
    {
        nameImg: "Giaoduc1.jpg",
        urlImage: "./access/Image/Giaoduc/Giaoduc1.jpg"
    }, {
        nameImg: "Giaoduc2.jpg",
        urlImage: "./access/Image/Giaoduc/Giaoduc2.jpg"
    }, {
        nameImg: "Giaoduc3.jpg",
        urlImage: "./access/Image/Giaoduc/Giaoduc3.jpg"
    }, {
        nameImg: "Giaoduc4.jpg",
        urlImage: "./access/Image/Giaoduc/Giaoduc4.jpg"
    }, {
        nameImg: "Giaoduc5.jpg",
        urlImage: "./access/Image/Giaoduc/Giaoduc5.jpg"
    }]

image.addEventListener('change', () => {
    file = image.files[0];
    console.log(file.name)
    ArrImage.forEach(i => {
        if (i.nameImg === file.name) {
            url = i.urlImage
            console.log("ok", url)
        }
    })
});

var submit = document.querySelector('.submit')
var ArrPost = []

submit.addEventListener('click', function () {
    var cbbValue = selectElement.options[selectElement.selectedIndex].value;

    if (title.value !== "" && author.value !== "" && cbbValue !== "" && content.value !== "" && image.files[0].name !== "") {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var datetime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;

        var Post = {
            Title: title.value,
            Author: author.value,
            Image: url,
            CbbValue: cbbValue,
            Date: datetime,
            Content: content.value
        }
        ArrPost.push(Post)
        localStorage.setItem('StoragePost', JSON.stringify(ArrPost))
    }
})


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