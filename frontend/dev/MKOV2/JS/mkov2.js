function hasCookie(name) {
    return document.cookie.split(';').some((cookie) => {
        return cookie.trim().startsWith(name + '=');
    });
}

var seconds = 30 * 60;

function imgurStats() {
    const clientId = '5b05f11e00511f8';


    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.imgur.com/3/credits', true);
    xhr.setRequestHeader('Authorization', `Client-ID ${clientId}`);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const remainingCredits = response.data.UserRemaining;
            const totalCredits = response.data.UserLimit;
            const resetTime = new Date(response.data.UserReset * 1000).toLocaleString();

            const creditInfo = `Havi limit: ${totalCredits}\nFennmaradó havi kredit: ${remainingCredits}\nKreditek újratöltődnek: ${resetTime}`;
        }
    };

    xhr.send();

}

function isbnValidator(isbn) {
    let subject = `${isbn}`;
    var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    if (regex.test(subject)) {
        var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
        var last = chars.pop();
        var sum = 0;
        var check, i;

        if (chars.length == 9) {
            chars.reverse();
            for (i = 0; i < chars.length; i++) {
                sum += (i + 2) * parseInt(chars[i], 10);
            }
            check = 11 - (sum % 11);
            if (check == 10) {
                check = "X";
            } else if (check == 11) {
                check = "0";
            }
        } else {
            for (i = 0; i < chars.length; i++) {
                sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
            }
            check = 10 - (sum % 10);
            if (check == 10) {
                check = "0";
            }
        }
        if (check == last) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
    return false;
}

function isLoggedIn() {
    return hasCookie("logedIn");
}

if (isLoggedIn()) {

} else {

    window.location.href = 'bejelentkezes.html';
}

const toggleSidebarBtn = document.querySelector("#toggle-sidebar");
const sidebar = document.querySelector("#sidebar");

toggleSidebarBtn.addEventListener("click", function() {

    sidebar.classList.toggle("active");
});

const sidebarLinks = document.querySelectorAll("#sidebar .sidebar-link");

sidebarLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        sidebar.classList.remove("active");
    });
});


function kijelentkezes() {
    document.cookie = `logedIn=${false}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const popup = document.querySelector(".popup");

function showPopup() {
    popup.classList.add("active");
    setTimeout(hidePopup, 5000);
}

function hidePopup() {
    popup.classList.remove("active");
}

showPopup();

function wrongISBN() {

    const popup3 = document.querySelector(".popup3");

    function showPopup3() {
        popup3.classList.add("active");
        setTimeout(hidePopup3, 2000);
    }

    function hidePopup3() {
        popup3.classList.remove("active");
    }

    showPopup3();
}

function SuccessfullUpload() {

    const popup4 = document.querySelector(".popup4");

    function showPopup4() {
        popup4.classList.add("active");
        setTimeout(hidePopup4, 2500);
    }

    function hidePopup4() {
        popup4.classList.remove("active");
    }

    showPopup4();
}

function SuccessfullImageUpload() {

    const popup6 = document.querySelector(".popup6");

    function showPopup6() {
        popup6.classList.add("active");
        setTimeout(hidePopup6, 2500);
    }

    function hidePopup6() {
        popup6.classList.remove("active");
    }

    showPopup6();
}

function startCountdown() {
    var countdownElement = document.getElementById("countdown");
    var interval = setInterval(function() {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;

        var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
        countdownElement.innerHTML = formattedTime;

        if (seconds === 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Jelentkezz be újra!";
        }

        seconds--;
    }, 1000);
}

function NotFoundedWarning() {

    const popup5 = document.querySelector(".popup5");

    function showPopup5() {
        popup5.classList.add("active");
        setTimeout(hidePopup5, 2500);
    }

    function hidePopup5() {
        popup5.classList.remove("active");
    }

    showPopup5();

    let button = document.getElementById("manualis");
    button.classList.remove("d-none");
    button.classList.add("d-block");
}

function isValidISBN13(isbn) {

    isbn = isbn.toString();
    isbn = isbn.replace(/\s/g, '');


    if (isbn.length !== 13) {
        return false;
    }


    if (/^\d+$/.test(isbn) === false) {
        return false;
    }


    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = (10 - (sum % 10)) % 10;


    if (checkDigit !== parseInt(isbn.charAt(12))) {
        return false;
    }


    return true;
}

function Google(isbn) {
    return new Promise((resolve, reject) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API hiba');
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    resolve(data);
                }, 1000);
            })
            .catch(error => {
                reject(error);
            });
    })

}

function openlibrary(isbn) {
    return new Promise((resolve, reject) => {
        const url2 = `https://openlibrary.org/isbn/${isbn}.json`;
        fetch(url2)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API hiba');
                }
                return response.json();
            })
            .then(data => {

                setTimeout(() => {

                    resolve(data);;
                }, 1000);

            })
            .catch(error => {
                reject(error);
            });
    })
}

function searchBook(isbn) {
    let bookData1 = {
        cim: "",
        szerzo: "",
        kiado: "",
        megjelenes: "",
        kep: ""
    };
    let bookData2 = {
        cim: "",
        szerzo: "",
        kiado: "",
        megjelenes: "",
        kep: ""
    };
    let error = "";
    return new Promise((resolve, reject) => {
        Google(isbn).then(data => {
            if (data.totalItems > 0) {
                const book2 = data.items[0].volumeInfo;
                if (typeof book2.authors == 'object') {
                    bookData1.szerzo = book2.authors.join(", ");
                } else {
                    bookData1.szerzo = book2.authors;
                }
                if (typeof book2.publisher == 'object') {
                    bookData1.kiado = book2.publisher.join(", ")
                } else {
                    bookData1.kiado = book2.publisher;
                }

                bookData1.cim = book2.title;
                bookData1.megjelenes = book2.publishedDate;

                if ("imageLinks" in book2) {
                    if ("thumbnail" in book2.imageLinks) {
                        if (book2.imageLinks.thumbnail != undefined || book2.imageLinks.thumbnail != null) {
                            bookData1.kep = book2.imageLinks.thumbnail
                        }
                    } else if ("smallThumbnail" in book2.imageLinks) {
                        if (book2.imageLinks.smallThumbnail != undefined || book2.imageLinks.smallThumbnail != null) {
                            bookData.kep = book2.imageLinks.smallThumbnail
                        }
                    }
                }

                setTimeout(() => {

                    resolve(bookData1);
                }, 1000);
            } else {

                NotFoundedWarning();
            }
            if (data == null) {
                openlibrary(isbn).then(data => {
                    if (Object.keys(data).length) {
                        const book2 = data;
                        if (typeof book2.authors == 'object') {
                            bookData2.szerzo = book2.authors.join(", ");
                        } else {
                            bookData2.szerzo = book2.authors;
                        }
                        if (typeof book2.publishers == 'object') {
                            bookData2.kiado = book2.publishers.join(", ");
                        } else {
                            bookData2.kiado = book2.publishers;
                        }
                        bookData2.cim = book2.title;


                        bookData2.megjelenes = book2.publish_date;
                        bookData2.kep = `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
                        setTimeout(() => {

                            resolve(bookData2);
                        }, 1000);
                    } else {

                        NotFoundedWarning();
                    }

                })
            } else {

            }
        })

    })

}



function isbnSearch(id) {

    let input
    if (id === 1) {
        input = document.getElementById("isbnInput")
    }
    if (id === 2) {
        input = document.getElementById("isbnInput2")
    }

    let isbn = input.value.split("");
    let realISBN = "";

    for (let i = 0; i < isbn.length; i++) {
        if (isbn[i] != "-") {


            realISBN += isbn[i];
        }
    }
    if (realISBN.split("").length == 10) {

        if (isbnValidator(realISBN)) {
            searchBook(realISBN).then(data => {
                if (data.kep !== undefined && data.kep !== "") {
                    if (window.location.includes("#kivansaglista#")) {
                        data.price = document.getElementById("priceInput6").value
                        data.id = window.location.href.slice(window.location.href.indexOf("#kivansaglista#") + "#kivansaglista#".length)
                        upload(data, "listahozadas");
                    } else {
                        upload(data, "hozzaadas");
                    }
                } else {
                    NotFoundedWarning();
                }
            })

        } else {

            wrongISBN();
        }
    }

    if (realISBN.split("").length == 13) {

        if (isValidISBN13(realISBN)) {
            searchBook(realISBN).then(data => {
                if (data.kep !== undefined && data.kep !== "") {
                    if (window.location.href.includes("#kivansaglista#")) {
                        data.price = document.getElementById("priceInput6").value
                        data.id = window.location.href.slice(window.location.href.indexOf("#kivansaglista#") + "#kivansaglista#".length)
                        upload(data, "listahozadas");
                    } else {
                        upload(data, "hozzaadas");
                    }
                } else {
                    NotFoundedWarning();
                }
            })

        } else {
            wrongISBN();
        }
    } else if (realISBN.split("").length !== 10 && realISBN.split("").length !== 13) {
        wrongISBN();
    }

}

function manualAppend() {

    let manualData = {
        cim: document.getElementById("titleInput").value,
        szerzo: document.getElementById("authorInput").value,
        kiado: document.getElementById("publisherInput").value,
        megjelenes: document.getElementById("publishedDate").value,
        kep: document.getElementById("url").value
    };

    upload(manualData, "hozzaadas");



}

const form1 = document.querySelector('#uploadForm1'); //Manual könyv

form1.addEventListener('submit', (e) => {
    e.stopPropagation();
    e.preventDefault();
    kepFeltoltes(1);
})

const form2 = document.querySelector('#uploadForm2'); //Manual lista

form2.addEventListener('submit', (e) => {
    e.stopPropagation();
    e.preventDefault();
    kepFeltoltes(2);
})

const form3 = document.querySelector('#uploadForm3'); //Manual lista könyv

form3.addEventListener('submit', (e) => {
    e.stopPropagation();
    e.preventDefault();
    kepFeltoltes(3);
})

function kepFeltoltes(type) {

    const clientId = '5b05f11e00511f8';
    let fileInput = ""
    let urlInput = ""
    if (type === 1) {
        fileInput = document.querySelector('#image');
        urlInput = document.querySelector('#url');
    } else if (type === 2) {
        fileInput = document.querySelector('#image2');
        urlInput = document.querySelector('#url2');
    } else if (type === 3) {
        fileInput = document.querySelector('#image3');
        urlInput = document.querySelector('#url3');
    }


    urlInput.value = "";
    if (urlInput.value == "") {
        const file = fileInput.files[0];
        const formData = new FormData();

        formData.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', `Client-ID ${clientId}`);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const imageUrl = response.data.link;
                urlInput.value = imageUrl;
                SuccessfullImageUpload();

            }
        };

        xhr.send(formData);
    }

}

function upload(data, path) {
    var username = getCookie("user");


    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", `http://kellsosserver.duckdns.org:7000/${path}.php`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            SuccessfullUpload();


        }
    };
    let adat = ""
    if (path === "hozzaadas") {
        adat = {
            "username": username !== undefined ? username : "",
            "cim": data.cim !== undefined ? data.cim.replaceAll("'", "") : "",
            "szerzo": data.szerzo !== undefined ? data.szerzo.replaceAll("'", "") : "",
            "kiado": data.kiado !== undefined ? data.kiado.replaceAll("'", "") : "",
            "megjelenes": data.megjelenes !== undefined ? data.megjelenes.replaceAll("'", "") : "",
            "kep": data.kep !== undefined ? data.kep : ""
        }
    } else if (path === "UjLista") {
        adat = {
            "username": username !== undefined ? username : "",
            "nev": data.nev !== undefined ? data.nev.replaceAll("'", "") : "",
            "kep": data.kep !== undefined ? data.kep : ""
        }
    } else if (path === "listahozadas") {
        adat = {
            "username": username !== undefined ? username : "",
            "cim": data.cim !== undefined ? data.cim.replaceAll("'", "") : "",
            "szerzo": data.szerzo !== undefined ? data.szerzo.replaceAll("'", "") : "",
            "kiado": data.kiado !== undefined ? data.kiado.replaceAll("'", "") : "",
            "megjelenes": data.megjelenes !== undefined ? data.megjelenes.replaceAll("'", "") : "",
            "kep": data.kep !== undefined ? data.kep : "",
            "id": data.id !== undefined ? data.id : "",
            "price": data.price !== undefined ? data.price : 0.00
        }
    }
    xhttp.send(JSON.stringify(adat));

    setTimeout(loading(), 1500)
}

function getCookie(name) {
    var value = "; " + document.cookie;

    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

function currentScales() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let menu = document.getElementById("sidebar");
    let optionalWidth = 0;

    if (screenWidth >= 768) {
        optionalWidth = screenWidth - menu.offsetWidth;
    } else {
        optionalWidth = screenWidth;
    }

    return optionalWidth;
}

function imageScales(urls) {
    return new Promise((resolve, reject) => {

        let sizes = [];
        let count = 0;
        for (let i = 0; i < urls.length; i++) {
            let img = new Image();
            img.src = urls[i];
            img.onload = function() {
                let imgSize = {
                    width: this.width,
                    height: this.height,
                };
                sizes.push(imgSize);
                count++;
                if (count === urls.length) {
                    setTimeout(() => {

                        resolve(sizes);
                    }, 10);

                }
            };
            img.onerror = function() {
                reject(new Error("Kép betöltése sikertelen."));
            };
        }
    });
}


function generateBackground(height) {
    let backgroundHeight = 390;
    let backgroundWidth = 617;
    let defaultRatio = backgroundHeight / backgroundWidth;
    let currentWidth = currentScales();

    let iterations = Math.ceil(currentWidth / backgroundWidth);
    let menu = document.getElementById("sidebar");

    let optimalWidth = currentWidth / iterations;
    let optimalHeight = optimalWidth * defaultRatio;
    let menuWidth = 0;

    if (window.innerWidth >= 768) {
        menuWidth = menu.offsetWidth;
    } else {
        menuWidth = 0;
    }

    let bg = document.getElementById("bg");
    let innerred = "";

    let heightIterations

    if (height == -1) {
        heightIterations = window.innerHeight / optimalHeight;
    } else {
        heightIterations = height;
    }


    for (let j = 0; j < heightIterations; j++) {
        for (let i = 0; i < iterations; i++) {
            innerred += `<img id='book-bg' src="Assets/empty-bookcase.webp" style="display:block;position:absolute;top:${j*optimalHeight}px;left:${(i*optimalWidth)+menuWidth}px;height:${optimalHeight}px;width: ${optimalWidth}px;}" alt="">`
        }

    }

    bg.innerHTML = innerred;

    return { "iterations": iterations, "optimalWidth": optimalWidth, "optimalHeight": optimalHeight };

}

function changeState(id, desiredState) {

    let dom = document.getElementById(id)
    if (desiredState) {
        dom.innerHTML = `<i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${id},'torles')"></i><i class="fa-solid fa-square-check fa-2xl" style="color: #73ff00;margin-top:125%;" onclick="changeState(${id}, false)"></i>`
    } else if (!desiredState) {
        dom.innerHTML = `<i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${id},'torles')"></i><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00;margin-top:125%;"  onclick="changeState(${id}, true)"></i>`
    }

    const xhr = new XMLHttpRequest();
    const url = "http://kellsosserver.duckdns.org:7000/állapotVáltás.php";


    const data = new FormData();
    data.append("id", id);
    data.append("desiredState", desiredState);

    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {}
    };
    xhr.send(data);

}

function generateImages(columnSize, bgstat, images, titles, authors, publishers, date, ids, olvasotts, collectionName, price) {

    let optionalWidth = bgstat.optimalWidth;
    let maxHeight = bgstat.optimalHeight * 0.8;
    let maxWidth;
    if (window.innerWidth >= 768) {
        maxWidth = ((window.innerWidth - 200) * 0.8) / columnSize
    } else {
        maxWidth = ((window.innerWidth) * 0.8) / columnSize
    }

    imageScales(images)
        .then((imgSizes) => {



            let img = document.getElementById("img");
            let inner = "";
            let counter = 0;
            let start = "<div class='row'>";
            let baseStart = "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 px-2'>";
            let baseend = "</div>"
            let end = "</div>";
            let left = 0;
            let top = 0;
            let count = 0;
            let rowCount = 1;
            for (let i = 0; i < imgSizes.length; i++) {
                let currentRatio = imgSizes[i].width / imgSizes[i].height;
                let currentWidth;
                if (i % 4 == 0 && i != 0) {
                    counter++;
                }
                if (maxWidth / currentRatio > maxHeight && window.innerWidth > 576) {
                    currentWidth = maxWidth;
                    while (currentWidth / currentRatio > maxHeight) {
                        currentWidth--;
                    }
                } else {
                    currentWidth = maxWidth;
                }
                let currentHeight = currentWidth / currentRatio;
                let bgHeight = document.getElementById("book-bg").offsetHeight;
                baseStart = `<div class='d-flex col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 ps-2 pe-4' style='height:${bgHeight}px'>`



                if (window.innerWidth < 576) {
                    rowCount = 1;
                } else if (window.innerWidth > 1400) {
                    rowCount = 6;
                } else if (window.innerWidth > 1200) {
                    rowCount = 4;
                } else if (window.innerWidth > 992) {
                    rowCount = 3;
                } else if (window.innerWidth > 768) {
                    rowCount = 1;
                } else if (window.innerWidth > 576) {
                    rowCount = 1;
                }

                if (window.innerWidth > 768 && count == rowCount) {
                    count = 0;

                    generateBackground(bgHeight)
                }
                if (window.innerWidth < 768) {
                    generateBackground(bgHeight)
                }
                if (window.innerWidth > 768 && count == 0) {
                    inner += baseStart;
                    inner += baseend;
                    count++


                }

                if (window.innerWidth > 768 && imgSizes.length == 1) {
                    inner += baseStart;
                    inner += baseend;
                }

                inner += baseStart;
                if (collectionName !== undefined) {
                    if (ids[i] === 1 || ids[i] === "1") {
                        inner += `<img data-bs-toggle="modal" data-bs-target="#exampleModal4" title="${collectionName[i]}" id="${ids[i]}"  class="bookImage" class="my-4"  src="${images[i]}")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${bgHeight*0.8}px ;width:auto">`

                    } else {
                        inner += `<img title="${collectionName[i]}" id="${ids[i]}"   class="bookImage" class="my-4" onclick="kivansaglista(${ids[i]});alignMiniToolbar();window.addEventListener('scroll', alignMiniToolbar);" src="${images[i]}")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${bgHeight*0.8}px ;width:auto">`

                    }
                } else if (collectionName === undefined && price !== undefined) {
                    inner += `<img id="img_${ids[i]}"  class="bookImage" class="my-4" onclick="kivansaglista(${ids[i]});" src="${images[i]}")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${bgHeight*0.8}px ;width:auto">`
                    inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; height:${bgHeight*0.8}px;" id="check_${ids[i]}"><i title="Aktuális elem átvitele a kívánságlistáról" class="fas fa-cloud-upload-alt fa-2xl text-primary"  onclick="append(${ids[i]})"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${ids[i]},'listaroltorles')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${ids[i]})"></i></div>`
                } else if (collectionName === undefined && (titles !== undefined || authors !== undefined || publishers !== undefined || date !== undefined)) {
                    inner += `<img  class="bookImage" class="my-4" src="${images[i]}" alt="${titles[i]} - ${authors[i]} (${publishers[i]}, ${date[i]})" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${bgHeight*0.8}px ;width:auto">`
                    if (olvasotts[i] == 1) {
                        inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; float:left; height:${bgHeight*0.8}px;" id="${ids[i]}"><i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${ids[i]},'torles')"></i><i class="fa-solid fa-square-check fa-2xl" style=" color: #73ff00; margin-top:125%;"  onclick="changeState(${ids[i]}, false)"></i></div>`
                    } else if (olvasotts[i] == 0) {
                        inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; float:left; height:${bgHeight*0.8}px;" id="${ids[i]}"><i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${ids[i]},'torles')"></i><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:125%;"  onclick="changeState(${ids[i]}, true)"></i></div>`
                    }
                }


                inner += baseend;
                count++
            }
            img.innerHTML = start + inner + end;
            if (collectionName === undefined && price !== undefined) {
                createPriceTags();
            }
        })
        .catch((error) => {
            console.error(error);
        });

}

function getImages(path) {
    let images = [];
    let collectionName = [];
    let prices = [];
    let titles = [];
    let authors = [];
    let publishers = [];
    let date = [];
    let ids = []
    let olvasotts = []
    let username = getCookie("user");
    return new Promise((resolve, reject) => {
            fetch(`http://kellsosserver.duckdns.org:7000/${path}username=` + encodeURIComponent(username))
                .then(response => response.json())
                .then(data => {

                    for (let i = 0; i < data.length; i++) {
                        images.push(data[i]["kep"]);
                        titles.push(data[i]["cim"]);
                        authors.push(data[i]["szerzo"]);
                        publishers.push(data[i]["kiado"]);
                        date.push(data[i]["megjelenes"]);
                        ids.push(data[i]["id"])
                        olvasotts.push(data[i]["olvasott"])
                        collectionName.push(data[i]["nev"])
                        prices.push(data[i]["price"])
                    }
                    return { "images": images, "titles": titles, "authors": authors, "publishers": publishers, "data": date, "ids": ids, "olvasotts": olvasotts, "collectionName": collectionName, "prices": prices }


                });
            setTimeout(() => {

                resolve({ "images": images, "titles": titles, "authors": authors, "publishers": publishers, "date": date, "ids": ids, "olvasotts": olvasotts, "collectionName": collectionName, "prices": prices });
            }, 1000);

        })
        .catch(error => {
            reject(error);
        });

}

async function loading() {
    let hozzadasGomb = document.getElementById("hozzaadas")

    if (window.location.href.includes("#fooldal")) {
        hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Hozzáadás</button>`
        getImages("adatLekérés.php?")
            .then(data => {

                let bgStats = generateBackground();

                let heightIterations = -1;
                let columnSize = 0;
                if (window.innerWidth >= 1400) {
                    columnSize = 6;
                    if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                        heightIterations = data.length / columnSize;
                    } else {
                        heightIterations = window.innerHeight / bgStats["optimalHeight"];
                    }
                } else if (window.innerWidth >= 1200) {
                    columnSize = 4;
                    if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                        heightIterations = data.length / columnSize;
                    } else {
                        heightIterations = window.innerHeight / bgStats["optimalHeight"];
                    }
                } else if (window.innerWidth >= 992) {
                    columnSize = 3;
                    if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                        heightIterations = data.length / columnSize;
                    } else {
                        heightIterations = window.innerHeight / bgStats["optimalHeight"];
                    }
                } else if (window.innerWidth >= 768) {
                    columnSize = 2;
                    if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                        heightIterations = data.length / columnSize;
                    } else {
                        heightIterations = window.innerHeight / bgStats["optimalHeight"];
                    }
                } else if (window.innerWidth >= 576) {
                    columnSize = 1;
                    if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                        heightIterations = data.length / columnSize;
                    } else {
                        heightIterations = window.innerHeight / bgStats["optimalHeight"];
                    }
                }
                let backgroundStats = generateBackground(heightIterations + 2);

                generateImages(columnSize, backgroundStats, data.images, data.titles, data.authors, data.publishers, data.date, data.ids, data.olvasotts, undefined, undefined);

                document.getElementById("priceContainer").innerHTML = "";
            })
            .catch(error => {

                console.error(error);
            });
        document.getElementById("content").style.display = "none";
    } else if (window.location.href.includes("#kivansaglista#")) {
        kivansaglista(window.location.href.slice(window.location.href.indexOf("#kivansaglista#") + "#kivansaglista#".length))
        document.getElementById("content").style.display = "block";
        alignMiniToolbar();

    } else if (window.location.href.includes("#kivansaglista") && !window.location.href.includes("#kivansaglista#")) {
        hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal4">Hozzáadás</button>`
        document.getElementById("content").style.display = "none";
        kivansaglista_csoportok();
        document.getElementById("priceContainer").innerHTML = "";

    } else if (window.location.href.includes("#olvasott")) {
        hozzadasGomb.innerHTML = `<button id="" type="button" disabled>Hozzáadás</button>`
        olvasottak();
        document.getElementById("content").style.display = "none";
    } else if (window.location.href.includes("#elnemkezdett")) {
        hozzadasGomb.innerHTML = `<button id="" type="button" disabled>Hozzáadás</button>`
        nemElkezdettek();
        document.getElementById("content").style.display = "none";
    }


}

function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    const scrollbarWidth = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);

    return scrollbarWidth;
}


function getBottomPosition() {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;

    const bottomPosition = scrollY + innerHeight;
    return bottomPosition;
}

function turnOfMiniToolbar() {
    let el = document.getElementById("rectangle_content")
    if (!el.classList.contains("d-none")) {
        el.classList.add("d-none");
    }
    if (el.classList.contains("d-flex")) {
        el.classList.remove("d-flex")
    }
    if (!document.getElementById("content").classList.contains("d-none")) {
        document.getElementById("content").classList.add("d-none");
    }
    if (document.getElementById("content").classList.contains("d-block")) {
        document.getElementById("content").classList.remove("d-block");
    }
}

function alignMiniToolbar() {

    let bookbgs = document.querySelectorAll("#book-bg")
    let bookbg = undefined;
    let bookbgHeight = undefined;

    if (bookbgs !== undefined && bookbgs.length > 0) {
        bookbg = bookbgs[bookbgs.length - 1]
        bookbgHeight = bookbgs[bookbgs.length - 1].offsetHeight;

    }
    let el = document.getElementById("rectangle_content")
    if (el.classList.contains("d-none")) {
        el.classList.remove("d-none");
    }
    if (!el.classList.contains("d-flex")) {
        el.classList.add("d-flex")
    }
    if (document.getElementById("content").classList.contains("d-none")) {
        document.getElementById("content").classList.remove("d-none");
    }
    if (!document.getElementById("content").classList.contains("d-block")) {
        document.getElementById("content").classList.add("d-block");
    }
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    let windowHeight = getBottomPosition();
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) {
        el.style.left = "0px";
    } else {
        el.style.left = `${windowWidth-width-getScrollbarWidth()}px`
        if (bookbg !== undefined) {
            if (windowHeight - height <= parseInt(bookbg.style.top.replace("px", "")) + bookbgHeight) {
                el.style.top = `${windowHeight-height}px`
            }

        } else {
            el.style.top = `${window.innerHeight-height}px`
        }
    }
}

async function kivansaglista_csoportok() {
    let img = document.getElementById("img");
    let bg = document.getElementById("bg");

    img.innerHTML = "";
    bg.innerHTML = "";

    getImages("kivansaglistaCsoportok.php?")
        .then(data => {

            let bgStats = generateBackground();

            let heightIterations = -1;
            let columnSize = 0;
            if (window.innerWidth >= 1400) {
                columnSize = 6;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 1200) {
                columnSize = 4;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 992) {
                columnSize = 3;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 768) {
                columnSize = 2;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 576) {
                columnSize = 1;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            }
            let backgroundStats = generateBackground(heightIterations + 2);

            generateImages(columnSize, backgroundStats, data.images, undefined, undefined, undefined, undefined, data.ids, undefined, data.collectionName, undefined);


        })
        .catch(error => {

            console.error(error);
        });
}

async function newkivansaglista() {
    let manualData = {
        nev: document.getElementById("nameInput2").value,
        kep: document.getElementById("url2").value
    };

    upload(manualData, "UjLista");
}

async function listahozadas() {
    let manualData = {
        cim: document.getElementById("titleInput5").value,
        szerzo: document.getElementById("authorInput5").value,
        kiado: document.getElementById("publisherInput5").value,
        megjelenes: document.getElementById("publishedDate5").value,
        kep: document.getElementById("url5").value,
        id: window.location.href.slice(window.location.href.indexOf("#kivansaglista#") + "#kivansaglista#".length),
        price: document.getElementById("priceInput5").value,
    };

    upload(manualData, "listahozadas");
}
let globalKivansagListaElemek = { "ids": [], "prices": [] };
let globalSelectedElemek = [];
let globalPrices = undefined;
let isEuro = true;

async function kivansaglista(id) {
    if (!window.location.href.includes(`#${id}`)) {
        window.location.href = window.location.href + "#" + id
    }
    let hozzadasGomb = document.getElementById("hozzaadas")
    hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal6">Hozzáadás</button>`


    let img = document.getElementById("img");
    let bg = document.getElementById("bg");

    img.innerHTML = "";
    bg.innerHTML = "";

    getImages(`kivansaglista.php?id=${id}&`)
        .then(data => {

            let bgStats = generateBackground();

            let heightIterations = -1;
            let columnSize = 0;
            if (window.innerWidth >= 1400) {
                columnSize = 6;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 1200) {
                columnSize = 4;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 992) {
                columnSize = 3;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 768) {
                columnSize = 2;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 576) {
                columnSize = 1;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            }
            let backgroundStats = generateBackground(heightIterations + 2);

            generateImages(columnSize, backgroundStats, data.images, data.titles, data.authors, data.publishers, data.date, data.ids, data.olvasotts, undefined, data.prices);
            globalPrices = data.prices
            globalKivansagListaElemek = { "ids": data.ids, "prices": data.prices }


        })
        .catch(error => {

            console.error(error);
        });
}

function createPriceTags() {
    const priceContainer = document.getElementById("priceContainer");
    priceContainer.innerHTML = "";
    const bookImages = document.querySelectorAll(".bookImage");
    const bg = document.getElementById("book-bg")
    let rowCount = 0;
    if (window.innerWidth < 576) {
        rowCount = 1;
    } else if (window.innerWidth > 1400) {
        rowCount = 6;
    } else if (window.innerWidth > 1200) {
        rowCount = 4;
    } else if (window.innerWidth > 992) {
        rowCount = 3;
    } else if (window.innerWidth > 768) {
        rowCount = 1;
    } else if (window.innerWidth > 576) {
        rowCount = 1;
    }
    let count = 1;
    let index = 0;
    bookImages.forEach(bookImage => {
        if (count % rowCount === 0 && rowCount !== 1) {
            count++;
        }


        const priceTag = document.createElement("div");
        priceTag.className = "priceTag";

        const imageRect = bookImage.getBoundingClientRect();
        const tagWidth = imageRect.width;
        const tagHeight = "20"

        priceTag.style.width = `${tagWidth}px`;
        priceTag.style.height = `${tagHeight}px`;
        priceTag.style.left = `${imageRect.left}px`;
        priceTag.style.top = `${(((bg.getBoundingClientRect().height-imageRect.height)/2)+(Math.floor(count/rowCount- (rowCount === 1? 1: 0) )*bg.getBoundingClientRect().height))-tagHeight-10}px`;
        priceTag.style.position = "absolute";
        const stripe = document.createElement("div");
        stripe.className = "stripe";

        const triangle = document.createElement("div");
        triangle.className = "triangle";

        priceTag.appendChild(stripe);
        priceTag.appendChild(triangle);
        const price = document.createElement("p")
        price.className = "Price";
        price.style.textAlign = "center";
        price.style.verticalAlign = "middle";
        price.innerText = globalPrices !== undefined ? `${globalPrices[index]}€` : "0.00€"
        price.style.fontSize = "16px"
        priceTag.appendChild(price)

        priceContainer.appendChild(priceTag);
        index++;
        count++;
    });
}

function selection(ids) {
    let elementDom = document.getElementById(`check_${ids}`)
    let id = ids.toString()
    if (!globalSelectedElemek.includes(id) && globalKivansagListaElemek.ids.includes(id)) {
        globalSelectedElemek.push(id)
        toolBarCounter();
        elementDom.innerHTML = `<i class="fas fa-cloud-upload-alt fa-2xl text-primary" title="Aktuális elem átvitele a kívánságlistáról"  onclick="append(${id})"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'listaroltorles')"></i><br><i class="fa-solid fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`
    } else if (globalSelectedElemek.includes(id) && globalKivansagListaElemek.ids.includes(id)) {
        globalSelectedElemek = globalSelectedElemek.filter(elem => elem !== id);
        elementDom.innerHTML = `<i class="fas fa-cloud-upload-alt fa-2xl text-primary" title="Aktuális elem átvitele a kívánságlistáról"  onclick="append(${id})"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'listaroltorles')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`
        toolBarCounter();


    }

}

async function getEuroToForintExchangeRate() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();

        const euroToForintRate = data.rates.HUF; // Az EUR/HUF árfolyam

        return euroToForintRate;
    } catch (error) {
        console.error('Hiba történt az adatlekérdezés során:', error);
        return null;
    }
}

async function calculateEuroToForint(amountInEuro) {
    const exchangeRate = await getEuroToForintExchangeRate();

    if (exchangeRate !== null) {
        const amountInForint = amountInEuro * exchangeRate;
        return amountInForint;
    } else {
        return null;
    }
}

function append(id) {
    var username = getCookie("user");
    const xhr = new XMLHttpRequest();
    const url = `http://kellsosserver.duckdns.org:7000/listaAtvitel.php?id=${id}&username=${username}`;


    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                setTimeout(loading, 800);
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };
    xhr.send();
}

function remove(id, path) {
    var username = getCookie("user");

    const xhr = new XMLHttpRequest();
    const url = `http://kellsosserver.duckdns.org:7000/${path}.php?id=${id}&username=${username}`;


    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                setTimeout(loading, 800);
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };
    xhr.send();

}

function toolBarCounter() {
    const counter = document.getElementById("euro-label");
    let euroSum = 0.00;
    if (globalKivansagListaElemek !== undefined) {
        for (let i = 0; i < globalKivansagListaElemek.ids.length; i++) {
            if (globalSelectedElemek.includes(globalKivansagListaElemek.ids[i])) {
                euroSum += parseFloat(globalKivansagListaElemek.prices[i].replace("€", ""));
            }

        }
    }
    if (isEuro) {
        counter.innerText = `${euroSum.toFixed(2)}€`
    } else {
        calculateEuroToForint(euroSum.toFixed(2)).then(result => {
            if (result !== null) {
                counter.innerText = `${result.toFixed(2)}Ft`
            } else {
                console.log('Nem sikerült lekérdezni az árfolyamot.');
            }
        });

    }
}

function toolBarSwitch() {
    const switcher = document.getElementById("switcher")
    if (isEuro) {
        switcher.classList.add("text-primary")
        isEuro = false;
        toolBarCounter()
    } else {
        switcher.classList.remove("text-primary")
        isEuro = true;
        toolBarCounter()
    }
}

function toolBarAppend() {
    if (globalKivansagListaElemek !== undefined) {
        for (let i = 0; i < globalKivansagListaElemek.ids.length; i++) {
            if (globalSelectedElemek.includes(globalKivansagListaElemek.ids[i])) {
                append(globalKivansagListaElemek.ids[i])
            }
        }
        globalSelectedElemek = []
        toolBarCounter();
    }
}

function toolBarRemove() {
    if (globalKivansagListaElemek !== undefined) {
        for (let i = 0; i < globalKivansagListaElemek.ids.length; i++) {
            if (globalSelectedElemek.includes(globalKivansagListaElemek.ids[i])) {
                remove(globalKivansagListaElemek.ids[i], "listaroltorles")
            }
        }
        globalSelectedElemek = []
        toolBarCounter();
    }
}

function olvasottak() {
    let img = document.getElementById("img");
    let bg = document.getElementById("bg");

    img.innerHTML = "";
    bg.innerHTML = "";

    getImages("olvasottLekeres.php?")
        .then(data => {

            let bgStats = generateBackground();

            let heightIterations = -1;
            let columnSize = 0;
            if (window.innerWidth >= 1400) {
                columnSize = 6;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 1200) {
                columnSize = 4;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 992) {
                columnSize = 3;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 768) {
                columnSize = 2;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 576) {
                columnSize = 1;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            }
            let backgroundStats = generateBackground(heightIterations + 2);

            generateImages(columnSize, backgroundStats, data.images, data.titles, data.authors, data.publishers, data.date, data.ids, data.olvasotts, undefined, undefined);

            document.getElementById("priceContainer").innerHTML = "";
        })
        .catch(error => {

            console.error(error);
        });

}

function nemElkezdettek() {
    let img = document.getElementById("img");
    let bg = document.getElementById("bg");

    img.innerHTML = "";
    bg.innerHTML = "";

    getImages("nemelkezdettLekeres.php?")
        .then(data => {

            let bgStats = generateBackground();

            let heightIterations = -1;
            let columnSize = 0;
            if (window.innerWidth >= 1400) {
                columnSize = 6;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 1200) {
                columnSize = 4;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 992) {
                columnSize = 3;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 768) {
                columnSize = 2;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            } else if (window.innerWidth >= 576) {
                columnSize = 1;
                if (data.length / columnSize > window.innerHeight / bgStats["optimalHeight"]) {
                    heightIterations = data.length / columnSize;
                } else {
                    heightIterations = window.innerHeight / bgStats["optimalHeight"];
                }
            }
            let backgroundStats = generateBackground(heightIterations + 2);

            generateImages(columnSize, backgroundStats, data.images, data.titles, data.authors, data.publishers, data.date, data.ids, data.olvasotts, undefined, undefined);

            document.getElementById("priceContainer").innerHTML = "";
        })
        .catch(error => {

            console.error(error);
        });


}