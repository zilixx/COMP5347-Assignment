window.onload = function () {

    var tbody = document.getElementById("tbody");
    var books = document.getElementsByName("book");
    var cart = document.getElementById("cart");

    var items = document.createElement("span");
    var text = document.createTextNode("(0)");
    items.appendChild(text);
    cart.appendChild(items);

    
    // click only one checkbox at a time
    for (var i = 0; i < books.length; i++) {
        books[i].onclick = function () {
            for (var i = 0; i < books.length; i++) {
                if (books[i] != this) {
                    books[i].checked = false;
                }
            }
        }
    }

    // add function
    document.getElementById("add").onclick = function () {
        for (var i = 0; i < books.length; i++) {
            if (books[i].checked) {
                var number = prompt("Type the number you want to add");
                if (!/^\d+$/.test(number)) {
                    alert("Please type a number!");
                    books[i].checked = false;
                    break;
                } else {
                    var current_num = parseInt(items.innerHTML.slice(1, -1)) + parseInt(number);
                    items.innerHTML = "(" + current_num + ")";
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
    document.getElementById("reset").onclick = function () {
        if (items.innerHTML != "(0)") {
            if (window.confirm("Are you sure to reset the cart?")) {
                items.innerHTML = "(0)";
            }
        } else {
            alert("Your cart has no item!");
        }
    }

    // switch to dark mode
    document.getElementById("retheme").onclick = function () {
        if (this.checked) {
            document.body.setAttribute("class", "dark-mode-body");
        } else {
            document.body.classList.remove("dark-mode-body");
        }
    }

    // search books
    document.getElementById("search").onclick = function () {
        var tds = document.getElementsByTagName("td");
        var trs = document.getElementsByTagName("tr");
        var keyword = document.getElementById("keyword").value;

        // remove highlight class
        for (var i = 0; i < trs.length; i++) {
            // console.log(trs[i]);
            trs[i].classList.remove("class", "highlight-color");
        }

        for (var i = 2; i < tds.length; i += 8) {
            var title = tds[i].innerHTML;
            if (tds[i].parentNode.style.display != "none" && 
                    keyword === title.slice(0, title.indexOf("<"))) {
                tds[i].parentNode.setAttribute("class", "highlight-color");
                break;
            } else if (i == tds.length - 6) {
                alert("nothing found!");
            }
        }

        document.getElementById("keyword").value = "";
    }

    function showUpItems() {
        var tds = document.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            if (tds[i].parentNode.style.display == "none") {
                tds[i].parentNode.style.display = "";
            }
        }
    }

    // filter books
    document.getElementById("filterBook").onclick = function () {
        showUpItems();
        var tds = document.getElementsByTagName("td");
        var trs = document.getElementsByTagName("tr");
        var selectedItem = document.getElementById("category");
        var index = selectedItem.selectedIndex;
        var category = selectedItem.options[index].text;
        var n = 0;
        console.log(category);
        for (var i = 7; i < tds.length; i += 8) {
            if (tds[i].innerHTML != category) {
                tds[i].parentNode.style.display = "none";
                n += 1;
            }
        }
        console.log(n);
        if (n == trs.length - 1) {
            if ("Category" != category) {
                alert("no such category!");
                location.reload();
            }
            showUpItems();
        }
    }

    function ratingToImg(rating) {
        var td = document.createElement("td");
        var ratings = [];
        for (var i = 0; i < 5; i++) {
            ratings[i] = document.createElement("img");
            ratings[i].style.float = "right";
        }
        switch (rating) {
            case "1":
                ratings[4].src = "images/star-16.ico";
                for (var i = 0; i < 4; i++) {
                    ratings[i].src = "images/outline-star-16.ico";
                }
                break;
            case "2":
                for (var i = 3; i < 5; i++) {
                    ratings[i].src = "images/star-16.ico";
                }
                for (var i = 0; i < 3; i++) {
                    ratings[i].src = "images/outline-star-16.ico";
                }
                break;
            case "3":
                for (var i = 2; i < 5; i++) {
                    ratings[i].src = "images/star-16.ico";
                }
                for (var i = 0; i < 2; i++) {
                    ratings[i].src = "images/outline-star-16.ico";
                }
                break;
            case "4":
                for (var i = 1; i < 5; i++) {
                    ratings[i].src = "images/star-16.ico";
                }
                ratings[0].src = "images/outline-star-16.ico";
                break;
            case "5":
                for (var i = 0; i < 5; i++) {
                    ratings[i].src = "images/star-16.ico";
                }
                break;
        }
        return ratings;
    }

    function loadBooks(bookList) {
        var td_array = [];
        var tr;
        for (x in bookList) {
            tr = document.createElement("tr");
            for (var i = 0; i < 8; i++) {
                td_array[i] = document.createElement("td");
            }
            var cBox = document.createElement("input");
            cBox.type = "checkbox";
            cBox.name = "book";
            td_array[0].appendChild(cBox);

            for (y in bookList[x]) {
                switch (y) {
                    case "img":
                        var img = document.createElement("img");
                        img.src = bookList[x][y];
                        td_array[1].appendChild(img);
                        break;
                    case "title":
                        td_array[2].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                    case "rating":
                        var ratings = ratingToImg(bookList[x][y]);
                        for (var i = 0; i < ratings.length; i++) {
                            td_array[2].appendChild(ratings[i]);
                        }
                        break;
                    case "authors":
                        td_array[3].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                    case "year":
                        td_array[4].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                    case "price":
                        td_array[5].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                    case "publisher":
                        td_array[6].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                    case "category":
                        td_array[7].appendChild(document.createTextNode(bookList[x][y]));
                        break;
                }
            }

            for (var x = 0; x < td_array.length; x++) {
                tr.appendChild(td_array[x]);
            }
            tbody.appendChild(tr);
        }
    }

    function getJsonObject(path, success, error) {
        var xhr = new XMLHttpRequest();
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

    bookList = []; // book list container
    getJsonObject('data.json', function (data) {
        bookList = data; // store the book list into bookList
        // console.log(bookList); // print it into console (developer tools)
        // console.log(bookList.length); // print the first book object into console 
        // here you can call methods to load or refresh the page 
        // loadBooks() or refreshPage()
        loadBooks(bookList);
    }, function (xhr) { console.error(xhr); }
    );
}