function hasCookie(name) {
    return document.cookie.split(';').some((cookie) => {
        return cookie.trim().startsWith(name + '=');
    });
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
                resolve(data);
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
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
}

function searchBook(isbn) {
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
                if (book2.imageLinks.thumbnail != undefined || book2.imageLinks.thumbnail != null) {
                    bookData1.kep = book2.imageLinks.thumbnail
                } else if (book2.imageLinks.smallThumbnail != undefined || book2.imageLinks.smallThumbnail != null) {
                    bookData1.kep = book2.imageLinks.smallThumbnail
                }
                resolve(bookData1)
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
                        resolve(bookData2)
                    } else {

                        NotFoundedWarning();
                    }

                })
            } else {

            }
        })

    })

}



function isbnSearch() {

    let input = document.getElementById("isbnInput");
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
                upload(data);
            })

        } else {
            wrongISBN();
        }
    }

    if (realISBN.split("").length == 13) {

        if (isValidISBN13(realISBN)) {
            searchBook(realISBN).then(data => {
                upload(data);
            })

        } else {
            wrongISBN();
        }
    } else {
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

    upload(manualData);



}

function kepFeltoltes() {

    const clientId = '5b05f11e00511f8';

    const form = document.querySelector('#uploadForm');
    const fileInput = document.querySelector('#image');
    const urlInput = document.querySelector('#url');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (urlInput.value == "") {
            const file = fileInput.files[0];
            const formData = new FormData();

            formData.append('image', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    const response = JSON.parse(xhr.responseText);
                    const imageUrl = response.data.link;
                    urlInput.value = imageUrl;
                    return imageUrl;
                    SuccessfullImageUpload();

                }
            };

            xhr.send(formData);
        }
    });

}

function upload(data) {

    var username = getCookie("user");


    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://backend.buborek-marko.online/hozzaadas.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            SuccessfullUpload();


        }
    };
    let adat = {
        "username": username,
        "cim": data.cim,
        "szerzo": data.szerzo,
        "kiado": data.kiado,
        "megjelenes": data.megjelenes,
        "kep": data.kep
    }

    xhttp.send(JSON.stringify(adat));
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
/*
function imageScales(urls) {
    const promises = urls.map((url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = function() {
                const imgSize = {
                    width: this.width,
                    height: this.height,
                };
                resolve(imgSize);
            };
            img.onerror = function() {
                reject(new Error('Kép betöltése sikertelen.'));
            };
        });
    });
    return Promise.all(promises);
}
*/
/*
function imageScales(urls) {
    return new Promise(async(resolve, reject) => {
        const sizes = [];

        for (let i = 0; i < urls.length; i++) {
            const img = new Image();

            img.onerror = () => {
                reject(new Error(`Kép betöltése sikertelen: ${urls[i]}`));
            };

            await new Promise((imgResolve) => {
                img.onload = () => {
                    const imgSize = {
                        width: img.width,
                        height: img.height,
                    };
                    sizes.push(imgSize);
                    imgResolve();
                };
                img.src = urls[i];
            });
        }

        resolve(sizes);
    });
}
*/
function imageScales(urls) {
    return new Promise((resolve, reject) => {
        //console.log(urls)
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
                    resolve(sizes);
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
            innerred += `<img src="Assets/empty-bookcase.webp" style="display:block;position:absolute;top:${j*optimalHeight}px;left:${(i*optimalWidth)+menuWidth}px;height:${optimalHeight}px;width: ${optimalWidth}px;}" alt="">`
        }

    }

    bg.innerHTML = innerred;

    return { "iterations": iterations, "optimalWidth": optimalWidth, "optimalHeight": optimalHeight };

}

function generateImages(columnSize, bgstat, images, titles, authors, publishers, date) {
    console.log(columnSize, bgstat, images, titles, authors, publishers, date)
    let optionalWidth = bgstat.optimalWidth;
    let maxHeight = bgstat.optimalHeight * 0.8;
    let maxWidth;
    if (window.innerWidth >= 768) {
        maxWidth = ((window.innerWidth - 200) * 0.8) / columnSize
    } else {
        maxWidth = ((window.innerWidth) * 0.8) / columnSize
    }

    imageScales(images) //["https://i.imgur.com/17PrU7g.jpg", "http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"])
        .then((imgSizes) => {
            console.log(imgSizes)
            let img = document.getElementById("img");
            let inner = "";
            let counter = 0;
            let start = "<div class='row'>";
            let baseStart = "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>";
            let baseend = "</div>"
            let end = "</div>";

            for (let i = 0; i < imgSizes.length; i++) {
                let currentRatio = imgSizes[i].width / imgSizes[i].height;
                let currentWidth;
                if (i % 4 == 0 && i != 0) {
                    counter++;
                }
                if (maxWidth / currentRatio > maxHeight) {
                    currentWidth = maxWidth;
                    while (currentWidth / currentRatio > maxHeight) {
                        currentWidth--;
                    }
                } else {
                    currentWidth = maxWidth;
                }
                let currentHeight = currentWidth / currentRatio;
                inner += baseStart;
                inner += `<img src="${images[i]}" alt="${titles[i]} - ${authors[i]} (${publishers[i]}, ${date[i]})" style="position:absolute;display:block;top:${maxHeight-currentHeight}px">`
                inner += baseend;
            }


            img.innerHTML = start + inner + end;
            console.log(inner)

        })
        .catch((error) => {
            console.error(error);
        });

}

function getImages() {
    let images = [];
    let titles = [];
    let authors = [];
    let publishers = [];
    let date = [];
    let username = getCookie("user");
    return new Promise((resolve, reject) => {
            fetch('http://backend.buborek-marko.online/adatLekérés.php?username=' + encodeURIComponent(username))
                .then(response => response.json())
                .then(data => {

                    for (let i = 0; i < data.length; i++) {

                        images.push(data[i]["kep"]);
                        titles.push(data[i]["cim"]);
                        authors.push(data[i]["szerzo"]);
                        publishers.push(data[i]["kiado"]);
                        date.push(data[i]["megjelenes"]);
                    }
                    return { "images": images, "titles": titles, "authors": authors, "publishers": publishers, "data": date }


                });
            resolve({ "images": images, "titles": titles, "authors": authors, "publishers": publishers, "date": date });
        })
        .catch(error => {
            reject(error);
        });

}

function loading() {



    getImages()
        .then(data => {
            console.log(data)
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
            let backgroundStats = generateBackground(heightIterations + 1);

            generateImages(columnSize, backgroundStats, data.images, data.titles, data.authors, data.publishers, data.date);;


        })
        .catch(error => {
            // Hiba kezelése
            console.error(error);
        });


}