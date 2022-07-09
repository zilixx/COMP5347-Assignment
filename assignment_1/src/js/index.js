import '../css/index.css'
import '../data.json'

const tbody = document.getElementById("tbody");
const books = document.getElementsByName("book");
const cart = document.getElementById("cart");

const items = document.createElement("span");
items.className = 'items'
const text = document.createTextNode("0");
items.appendChild(text);
cart.appendChild(items);


// click only one checkbox at a time
let lastChecked = null
function change() {
    if (this.checked) {
        if (lastChecked && lastChecked !== this) {
            lastChecked.checked = false
        }
        lastChecked = this
    }
}

// add function
function addToCart() {
    for (let i = 0; i < books.length; i++) {
        if (books[i].checked) {
            let number = prompt("Type the number you want to add");
            if (!/^\d+$/.test(number)) { // input is not a number
                alert("Please type a number!");
                books[i].checked = false;
                break;
            } else { // input is a number
                items.innerHTML = parseInt(items.innerHTML) + parseInt(number);
                books[i].checked = false;
                break;
            }
        }
        if (i == books.length - 1) {
            alert("nothing selected!");
            break;
        }
    }
}

// reset function
function resetCart() {
    if (items.innerHTML != "0") {
        if (window.confirm("Are you sure to reset the cart?")) {
            items.innerHTML = "0";
        }
    } else {
        alert("Your cart has no item!");
    }
}

// switch to dark mode
function retheme() {
    if (this.checked) {
        document.body.setAttribute("class", "dark-mode-body");
    } else {
        document.body.classList.remove("dark-mode-body");
    }
}

// search books
function searchBooks() {
    let tds = document.getElementsByTagName("td");
    let trs = document.getElementsByTagName("tr");
    let keyword = document.getElementById("keyword").value;

    // remove highlight class
    for (let i = 0; i < trs.length; i++) {
        trs[i].classList.remove("class", "highlight-color");
    }

    for (let i = 2; i < tds.length; i += 8) {
        let title = tds[i].innerHTML;
        if (tds[i].parentNode.style.display != "none" &&
            title.slice(0, title.indexOf("<")).includes(keyword)) {
            tds[i].parentNode.setAttribute("class", "highlight-color");
            break;
        } else if (i == tds.length - 6) {
            alert("nothing found!");
        }
    }

    document.getElementById("keyword").value = "";
}

function showUpItems() {
    let tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].parentNode.style.display == "none") {
            tds[i].parentNode.style.display = "";
        }
    }
}

// filter books
function filterBooks() {
    showUpItems();
    let tds = document.getElementsByTagName("td");
    let trs = document.getElementsByTagName("tr");
    let selectedItem = document.getElementById("category");
    let index = selectedItem.selectedIndex;
    let category = selectedItem.options[index].text;
    let n = 0;
    for (let i = 7; i < tds.length; i += 8) {
        if (tds[i].innerHTML != category) {
            tds[i].parentNode.style.display = "none";
            n += 1;
        }
    }
    if (n == trs.length - 1) {
        if ("Category" != category) {
            alert("no such category!");
            location.reload();
        }
        showUpItems();
    }
}

function ratingToImg(rating) {
    let ratings = [];
    for (let i = 0; i < 5; i++) {
        ratings[i] = document.createElement("img");
        ratings[i].style.float = "right";
    }
    switch (rating) {
        case "1":
            ratings[4].src = "../images/star-16.ico";
            for (let i = 0; i < 4; i++) {
                ratings[i].src = "../images/outline-star-16.ico";
            }
            break;
        case "2":
            for (let i = 3; i < 5; i++) {
                ratings[i].src = "../images/star-16.ico";
            }
            for (let i = 0; i < 3; i++) {
                ratings[i].src = "../images/outline-star-16.ico";
            }
            break;
        case "3":
            for (let i = 2; i < 5; i++) {
                ratings[i].src = "../images/star-16.ico";
            }
            for (let i = 0; i < 2; i++) {
                ratings[i].src = "../images/outline-star-16.ico";
            }
            break;
        case "4":
            for (let i = 1; i < 5; i++) {
                ratings[i].src = "../images/star-16.ico";
            }
            ratings[0].src = "../images/outline-star-16.ico";
            break;
        case "5":
            for (let i = 0; i < 5; i++) {
                ratings[i].src = "../images/star-16.ico";
            }
            break;
    }
    return ratings;
}

function loadBooks(bookList) {
    let td_array = [];
    let tr;
    for (let book in bookList) {
        tr = document.createElement("tr");
        for (let i = 0; i < 8; i++) {
            td_array[i] = document.createElement("td");
        }
        let cBox = document.createElement("input");
        cBox.type = "checkbox";
        cBox.name = "book";
        cBox.addEventListener('change', change)
        td_array[0].appendChild(cBox);

        for (let item in bookList[book]) {
            switch (item) {
                case "img":
                    let img = document.createElement("img");
                    img.src = bookList[book][item];
                    td_array[1].appendChild(img);
                    break;
                case "title":
                    td_array[2].appendChild(document.createTextNode(bookList[book][item]));
                    break;
                case "rating":
                    let ratings = ratingToImg(bookList[book][item]);
                    for (let i = 0; i < ratings.length; i++) {
                        td_array[2].appendChild(ratings[i]);
                    }
                    break;
                case "authors":
                    td_array[3].appendChild(document.createTextNode(bookList[book][item]));
                    break;
                case "year":
                    td_array[4].appendChild(document.createTextNode(bookList[book][item]));
                    break;
                case "price":
                    td_array[5].appendChild(document.createTextNode(bookList[book][item]));
                    break;
                case "publisher":
                    td_array[6].appendChild(document.createTextNode(bookList[book][item]));
                    break;
                case "category":
                    td_array[7].appendChild(document.createTextNode(bookList[book][item]));
                    break;
            }
        }

        for (let td_idx = 0; td_idx < td_array.length; td_idx++) {
            tr.appendChild(td_array[td_idx]);
        }
        tbody.appendChild(tr);
    }
}

function getJsonObject(path, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

let bookList = []; // book list container

const init = () => {
    getJsonObject('../data.json', data => {
        bookList = data
        console.log(data);
        loadBooks(bookList);
    }, err => console.error(err));
    bindEvent()
}

const oBookFilter = document.getElementById("filterBook")
const oBookSearch = document.getElementById("search")
const oAddBtn = document.getElementById("add")
const oThemeSwitch = document.getElementById("retheme")
const oResetCart = document.getElementById("reset")

const bindEvent = () => {
    oBookFilter.addEventListener('click', filterBooks)
    oBookSearch.addEventListener('click', searchBooks)
    oAddBtn.addEventListener('click', addToCart)
    oThemeSwitch.addEventListener('click', retheme)
    oResetCart.addEventListener('click', resetCart)
}

init()