function hasCookie(name) {
  return document.cookie.split(";").some((cookie) => {
    return cookie.trim().startsWith(name + "=");
  });
}

var seconds = 30 * 60;

function imgurStats() {
  const clientId = "5b05f11e00511f8";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.imgur.com/3/credits", true);
  xhr.setRequestHeader("Authorization", `Client-ID ${clientId}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const remainingCredits = response.data.UserRemaining;
      const totalCredits = response.data.UserLimit;
      const resetTime = new Date(
        response.data.UserReset * 1000
      ).toLocaleString();

      const creditInfo = `Havi limit: ${totalCredits}\nFennmaradó havi kredit: ${remainingCredits}\nKreditek újratöltődnek: ${resetTime}`;
    }
  };

  xhr.send();
}

function isbnValidator(isbn) {
  let subject = `${isbn}`;
  var regex =
    /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
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
        sum += ((i % 2) * 2 + 1) * parseInt(chars[i], 10);
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
  window.location.href = "bejelentkezes.html";
}

const toggleSidebarBtn = document.querySelector("#toggle-sidebar");
const sidebar = document.querySelector("#sidebar");

toggleSidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

const sidebarLinks = document.querySelectorAll("#sidebar .sidebar-link");

sidebarLinks.forEach(function (link) {
  link.addEventListener("click", function () {
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
  var interval = setInterval(function () {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    var formattedTime =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (remainingSeconds < 10 ? "0" : "") +
      remainingSeconds;
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
  if (window.location.href.includes("#fooldal")) {
    let button = document.getElementById("manualis");
    button.classList.remove("d-none");
    button.classList.add("d-block");
  } else if (window.location.href.includes("#kivansaglista#")) {
    let button = document.getElementById("manualis2");
    button.classList.remove("d-none");
    button.classList.add("d-block");
  }
}

function isValidISBN13(isbn) {
  isbn = isbn.toString();
  isbn = isbn.replace(/\s/g, "");

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
      .then((response) => {
        if (!response.ok) {
          throw new Error("API hiba");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function openlibrary(isbn) {
  return new Promise((resolve, reject) => {
    const url2 = `https://openlibrary.org/isbn/${isbn}.json`;
    fetch(url2)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API hiba");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function searchBook(isbn) {
  let bookData1 = {
    cim: "",
    szerzo: "",
    kiado: "",
    megjelenes: "",
    kep: "",
  };
  let bookData2 = {
    cim: "",
    szerzo: "",
    kiado: "",
    megjelenes: "",
    kep: "",
  };
  let error = "";
  return new Promise((resolve, reject) => {
    Google(isbn).then((data) => {
      if (data.totalItems > 0) {
        const book2 = data.items[0].volumeInfo;
        if (typeof book2.authors == "object") {
          bookData1.szerzo = book2.authors.join(", ");
        } else {
          bookData1.szerzo = book2.authors;
        }
        if (typeof book2.publisher == "object") {
          bookData1.kiado = book2.publisher.join(", ");
        } else {
          bookData1.kiado = book2.publisher;
        }

        bookData1.cim = book2.title;
        bookData1.megjelenes = book2.publishedDate;

        if ("imageLinks" in book2) {
          if ("thumbnail" in book2.imageLinks) {
            if (
              book2.imageLinks.thumbnail != undefined ||
              book2.imageLinks.thumbnail != null
            ) {
              bookData1.kep = book2.imageLinks.thumbnail;
            }
          } else if ("smallThumbnail" in book2.imageLinks) {
            if (
              book2.imageLinks.smallThumbnail != undefined ||
              book2.imageLinks.smallThumbnail != null
            ) {
              bookData.kep = book2.imageLinks.smallThumbnail;
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
        openlibrary(isbn).then((data) => {
          if (Object.keys(data).length) {
            const book2 = data;
            if (typeof book2.authors == "object") {
              bookData2.szerzo = book2.authors.join(", ");
            } else {
              bookData2.szerzo = book2.authors;
            }
            if (typeof book2.publishers == "object") {
              bookData2.kiado = book2.publishers.join(", ");
            } else {
              bookData2.kiado = book2.publishers;
            }
            bookData2.cim = book2.title;

            bookData2.megjelenes = book2.publish_date;
            bookData2.kep = `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
            setTimeout(() => {
              resolve(bookData2);
            }, 1000);
          } else {
            NotFoundedWarning();
          }
        });
      } else {
      }
    });
  });
}

function isbnSearch(id) {
  let input;
  if (id === 1) {
    input = document.getElementById("isbnInput");
  }
  if (id === 2) {
    input = document.getElementById("isbnInput2");
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
      searchBook(realISBN).then((data) => {
        if (data.kep !== undefined && data.kep !== "") {
          if (window.location.includes("#kivansaglista#")) {
            data.price = document.getElementById("priceInput6").value;
            data.id = window.location.href.slice(
              window.location.href.indexOf("#kivansaglista#") +
                "#kivansaglista#".length
            );
            upload(data, "listahozadas");
          } else {
            upload(data, "hozzaadas");
          }
        } else {
          NotFoundedWarning();
        }
      });
    } else {
      wrongISBN();
    }
  }

  if (realISBN.split("").length == 13) {
    if (isValidISBN13(realISBN)) {
      searchBook(realISBN).then((data) => {
        if (data.kep !== undefined && data.kep !== "") {
          if (window.location.href.includes("#kivansaglista#")) {
            data.price = document.getElementById("priceInput6").value;
            data.id = window.location.href.slice(
              window.location.href.indexOf("#kivansaglista#") +
                "#kivansaglista#".length
            );
            upload(data, "listahozadas");
          } else {
            upload(data, "hozzaadas");
          }
        } else {
          NotFoundedWarning();
        }
      });
    } else {
      wrongISBN();
    }
  } else if (
    realISBN.split("").length !== 10 &&
    realISBN.split("").length !== 13
  ) {
    wrongISBN();
  }
}

function manualAppend() {
  let manualData = {
    cim: document.getElementById("titleInput").value,
    szerzo: document.getElementById("authorInput").value,
    kiado: document.getElementById("publisherInput").value,
    megjelenes: document.getElementById("publishedDate").value,
    kep: document.getElementById("url").value,
  };

  upload(manualData, "hozzaadas");
}

const form1 = document.querySelector("#uploadForm1"); //Manual könyv

form1.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  kepFeltoltes(1);
});

const form2 = document.querySelector("#uploadForm2"); //Manual lista

form2.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  kepFeltoltes(2);
});

const form3 = document.querySelector("#uploadForm3"); //Manual lista könyv

form3.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  kepFeltoltes(3);
});

const form4 = document.querySelector("#uploadForm4"); //Manual rendelésterv hozzáadás

form4.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  kepFeltoltes(4);
});

function kepFeltoltes(type) {
  const clientId = "5b05f11e00511f8";
  let fileInput = "";
  let urlInput = "";
  if (type === 1) {
    fileInput = document.querySelector("#image");
    urlInput = document.querySelector("#url");
  } else if (type === 2) {
    fileInput = document.querySelector("#image2");
    urlInput = document.querySelector("#url2");
  } else if (type === 3) {
    fileInput = document.querySelector("#image5");
    urlInput = document.querySelector("#url5");
  } else if (type === 4) {
    fileInput = document.querySelector("#rendeleskep");
    urlInput = document.querySelector("#rendelesurl");
  }

  urlInput.value = "";
  if (urlInput.value == "") {
    const file = fileInput.files[0];
    const formData = new FormData();

    formData.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", `Client-ID ${clientId}`);

    xhr.onreadystatechange = function () {
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

  xhttp.open("POST", `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/${path}.php`, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      SuccessfullUpload();
    }
  };
  let adat = "";
  if (path === "hozzaadas") {
    adat = {
      username: username !== undefined ? username : "",
      cim: data.cim !== undefined ? data.cim.replaceAll("'", "") : "",
      szerzo: data.szerzo !== undefined ? data.szerzo.replaceAll("'", "") : "",
      kiado: data.kiado !== undefined ? data.kiado.replaceAll("'", "") : "",
      megjelenes:
        data.megjelenes !== undefined
          ? data.megjelenes.replaceAll("'", "")
          : "",
      kep: data.kep !== undefined ? data.kep : "",
    };
  } else if (path === "UjLista") {
    adat = {
      username: username !== undefined ? username : "",
      nev: data.nev !== undefined ? data.nev.replaceAll("'", "") : "",
      kep: data.kep !== undefined ? data.kep : "",
    };
  } else if (path === "listahozadas") {
    adat = {
      username: username !== undefined ? username : "",
      cim: data.cim !== undefined ? data.cim.replaceAll("'", "") : "",
      szerzo: data.szerzo !== undefined ? data.szerzo.replaceAll("'", "") : "",
      kiado: data.kiado !== undefined ? data.kiado.replaceAll("'", "") : "",
      megjelenes:
        data.megjelenes !== undefined
          ? data.megjelenes.replaceAll("'", "")
          : "",
      kep: data.kep !== undefined ? data.kep : "",
      id: data.id !== undefined ? data.id : "",
      price: data.price !== undefined ? data.price : 0.0,
    };
  } else if (path === "UjRendeles") {
    adat = {
      username: username !== undefined ? username : "",
      rendelesnev:
        data.rendelesnev !== undefined
          ? data.rendelesnev.replaceAll("'", "")
          : "",
      tervezettdatum:
        data.tervezettdatum !== undefined
          ? data.tervezettdatum.replaceAll("'", "")
          : "",
      kep: data.kep !== undefined ? data.kep : "",
      euro: 0.0,
    };
  }
  xhttp.send(JSON.stringify(adat));

  setTimeout(loading(), 1500);
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
      img.onload = function () {
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
      img.onerror = function () {
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

  let heightIterations;

  if (height == -1) {
    heightIterations = window.innerHeight / optimalHeight;
  } else {
    heightIterations = height;
  }

  for (let j = 0; j < heightIterations; j++) {
    for (let i = 0; i < iterations; i++) {
      innerred += `<img id='book-bg' src="Assets/empty-bookcase.webp" style="display:block;position:absolute;top:${
        j * optimalHeight
      }px;left:${
        i * optimalWidth + menuWidth
      }px;height:${optimalHeight}px;width: ${optimalWidth}px;}" alt="">`;
    }
  }

  bg.innerHTML = innerred;

  return {
    iterations: iterations,
    optimalWidth: optimalWidth,
    optimalHeight: optimalHeight,
  };
}

function changeState(id, desiredState) {
  let dom = document.getElementById(id);
  if (desiredState) {
    dom.innerHTML = `<i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${id},'torles')"></i><i class="fa-solid fa-square-check fa-2xl" style="color: #73ff00;margin-top:125%;" onclick="changeState(${id}, false)"></i>`;
  } else if (!desiredState) {
    dom.innerHTML = `<i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${id},'torles')"></i><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00;margin-top:125%;"  onclick="changeState(${id}, true)"></i>`;
  }

  const xhr = new XMLHttpRequest();
  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/állapotVáltás.php`;

  const data = new FormData();
  data.append("id", id);
  data.append("desiredState", desiredState);

  xhr.open("POST", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
  };
  xhr.send(data);
}

function generateImages(
  columnSize,
  bgstat,
  images,
  titles,
  authors,
  publishers,
  date,
  ids,
  olvasotts,
  collectionName,
  price,
  rendeleseuro,
  tervezetettdatum,
  rendelesnev
) {
  let optionalWidth = bgstat.optimalWidth;
  let maxHeight = bgstat.optimalHeight * 0.8;
  let maxWidth;
  if (window.innerWidth >= 768) {
    maxWidth = ((window.innerWidth - 200) * 0.8) / columnSize;
  } else {
    maxWidth = (window.innerWidth * 0.8) / columnSize;
  }

  imageScales(images)
    .then((imgSizes) => {
      let img = document.getElementById("img");
      let inner = "";
      let counter = 0;
      let start = "<div class='row'>";
      let baseStart =
        "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 px-2'>";
      let baseend = "</div>";
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
        baseStart = `<div class='d-flex col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 ps-2 pe-4' style='height:${bgHeight}px'>`;

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

          generateBackground(bgHeight);
        }
        if (window.innerWidth < 768) {
          generateBackground(bgHeight);
        }
        if (window.innerWidth > 768 && count == 0) {
          inner += baseStart;
          inner += baseend;
          count++;
        }

        if (window.innerWidth > 768 && imgSizes.length == 1) {
          inner += baseStart;
          inner += baseend;
        }

        inner += baseStart;

        if (collectionName !== undefined) {
          //Kivánságlisták
          if (ids[i] === 1 || ids[i] === "1") {
            //Új létrehozása
            inner += `<img data-bs-toggle="modal" data-bs-target="#exampleModal4" title="${
              collectionName[i]
            }" id="${ids[i]}"  class="bookImage" class="my-4"  src="${
              images[i]
            }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
              bgHeight * 0.8
            }px ;width:auto">`;
          } else {
            //Sima kivánságlista
            inner += `<img title="${collectionName[i]}" id="${
              ids[i]
            }"   class="bookImage" class="my-4" onclick="kivansaglista(${
              ids[i]
            });alignMiniToolbar();window.addEventListener('scroll', alignMiniToolbar);" src="${
              images[i]
            }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
              bgHeight * 0.8
            }px ;width:auto">`;
          }
        } else if (collectionName === undefined && price !== undefined) {
          //belső nézet
          if (window.location.href.includes("#rendelesterv")) {
            //Rendelesterv belső nézet
            if (window.location.href.includes("#rendelestervekszerkesztese#")) {
              //rendelestervszerkesztes belső nézet
              inner += `<img id="img_${
                ids[i]
              }"  class="bookImage" class="my-4" onclick="kivansaglista(${
                ids[i]
              });" src="${
                images[i]
              }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
                bgHeight * 0.8
              }px ;width:auto">`;
              inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; height:${
                bgHeight * 0.8
              }px;" id="check_${
                ids[i]
              }"><i title="Aktuális elem törlése a rendeléstervből" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${
                ids[i]
              },'rendelestermektorlese')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${
                ids[i]
              })"></i></div>`;
            } else if (
              //Rendelésterv belső könyvek
              !window.location.href.includes("#rendelestervekszerkesztese#")
            ) {
              inner += `<img id="img_${
                ids[i]
              }"  class="bookImage" class="my-4" onclick="kivansaglista(${
                ids[i]
              });" src="${
                images[i]
              }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
                bgHeight * 0.8
              }px ;width:auto">`;
            }
          } else {
            //kívánságlista belső könyvek
            inner += `<img id="img_${
              ids[i]
            }"  class="bookImage" class="my-4" onclick="kivansaglista(${
              ids[i]
            });" src="${
              images[i]
            }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
              bgHeight * 0.8
            }px ;width:auto">`;
            inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; height:${
              bgHeight * 0.8
            }px;" id="check_${
              ids[i]
            }"><i title="Aktuális elem átvitele a kívánságlistáról" class="fas fa-cloud-upload-alt fa-2xl text-primary"  onclick="append(${
              ids[i]
            })"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${
              ids[i]
            },'listaroltorles')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${
              ids[i]
            })"></i></div>`;
          }
        } else if (
          collectionName === undefined &&
          (titles !== undefined ||
            authors !== undefined ||
            publishers !== undefined ||
            date !== undefined)
        ) {
          inner += `<img  class="bookImage" class="my-4" src="${
            images[i]
          }" alt="${titles[i]} - ${authors[i]} (${publishers[i]}, ${
            date[i]
          })" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
            bgHeight * 0.8
          }px ;width:auto">`;
          if (olvasotts[i] == 1) {
            inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; float:left; height:${
              bgHeight * 0.8
            }px;" id="${
              ids[i]
            }"><i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${
              ids[i]
            },'torles')"></i><i class="fa-solid fa-square-check fa-2xl" style=" color: #73ff00; margin-top:125%;"  onclick="changeState(${
              ids[i]
            }, false)"></i></div>`;
          } else if (olvasotts[i] == 0) {
            inner += `<div style="display:flex; align-items: center; float:left; flex-direction:column;justify-content:flex-end; float:left; height:${
              bgHeight * 0.8
            }px;" id="${
              ids[i]
            }"><i title="Aktuális elem törlése" class="fas fa-trash-alt fa-2xl" style="color: #FF0000;"  onclick="remove(${
              ids[i]
            },'torles')"></i><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:125%;"  onclick="changeState(${
              ids[i]
            }, true)"></i></div>`;
          }
        } else if (rendelesnev !== undefined) {
          if (ids[i] === 1 || ids[i] === "1") {
            inner += `<img data-bs-toggle="modal" data-bs-target="#exampleModal7" title="${
              rendelesnev[i]
            }" id="${ids[i]}"  class="bookImage" class="my-4"  src="${
              images[i]
            }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
              bgHeight * 0.8
            }px ;width:auto">`;
          } else {
            inner += `<img title="${rendelesnev[i]}" id="${
              ids[i]
            }"   class="bookImage" class="my-4" onclick="rendelesterv(${
              ids[i]
            });alignMiniShowbar();window.addEventListener('scroll', alignMiniShowbar);" src="${
              images[i]
            }")" style="margin-left:auto;margin-top:auto;margin-bottom:auto;display:block;height:${
              bgHeight * 0.8
            }px ;width:auto">`;
          }
        }

        inner += baseend;
        count++;
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
  let ids = [];
  let olvasotts = [];
  let euro = [];
  let tervezetettdatum = [];
  let rendelesnev = [];
  let username = getCookie("user");
  return new Promise((resolve, reject) => {
    fetch(
      `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/${path}username=` +
        encodeURIComponent(username)
    )
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          images.push(data[i]["kep"]);
          titles.push(data[i]["cim"]);
          authors.push(data[i]["szerzo"]);
          publishers.push(data[i]["kiado"]);
          date.push(data[i]["megjelenes"]);
          ids.push(data[i]["id"]);
          olvasotts.push(data[i]["olvasott"]);
          collectionName.push(data[i]["nev"]);
          prices.push(data[i]["price"]);
          euro.push(data[i]["euro"]);
          tervezetettdatum.push(data[i]["tervezettdatum"]);
          rendelesnev.push(data[i]["rendelesnev"]);
        }
        return {
          images: images,
          titles: titles,
          authors: authors,
          publishers: publishers,
          data: date,
          ids: ids,
          olvasotts: olvasotts,
          collectionName: collectionName,
          prices: prices,
          rendeleseuro: euro,
          tervezetettdatum: tervezetettdatum,
          rendelesnev: rendelesnev,
        };
      });
    setTimeout(() => {
      resolve({
        images: images,
        titles: titles,
        authors: authors,
        publishers: publishers,
        date: date,
        ids: ids,
        olvasotts: olvasotts,
        collectionName: collectionName,
        prices: prices,
        rendeleseuro: euro,
        tervezetettdatum: tervezetettdatum,
        rendelesnev: rendelesnev,
      });
    }, 1000);
  }).catch((error) => {
    reject(error);
  });
}

async function loading() {
  let hozzadasGomb = document.getElementById("hozzaadas");
  if (window.location.href.includes("#fooldal")) {
    hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Hozzáadás</button>`;
    getImages("adatLekérés.php?")
      .then((data) => {
        let bgStats = generateBackground();

        let heightIterations = -1;
        let columnSize = 0;
        if (window.innerWidth >= 1400) {
          columnSize = 6;
          if (
            data.length / columnSize >
            window.innerHeight / bgStats["optimalHeight"]
          ) {
            heightIterations = data.length / columnSize;
          } else {
            heightIterations = window.innerHeight / bgStats["optimalHeight"];
          }
        } else if (window.innerWidth >= 1200) {
          columnSize = 4;
          if (
            data.length / columnSize >
            window.innerHeight / bgStats["optimalHeight"]
          ) {
            heightIterations = data.length / columnSize;
          } else {
            heightIterations = window.innerHeight / bgStats["optimalHeight"];
          }
        } else if (window.innerWidth >= 992) {
          columnSize = 3;
          if (
            data.length / columnSize >
            window.innerHeight / bgStats["optimalHeight"]
          ) {
            heightIterations = data.length / columnSize;
          } else {
            heightIterations = window.innerHeight / bgStats["optimalHeight"];
          }
        } else if (window.innerWidth >= 768) {
          columnSize = 2;
          if (
            data.length / columnSize >
            window.innerHeight / bgStats["optimalHeight"]
          ) {
            heightIterations = data.length / columnSize;
          } else {
            heightIterations = window.innerHeight / bgStats["optimalHeight"];
          }
        } else if (window.innerWidth >= 576) {
          columnSize = 1;
          if (
            data.length / columnSize >
            window.innerHeight / bgStats["optimalHeight"]
          ) {
            heightIterations = data.length / columnSize;
          } else {
            heightIterations = window.innerHeight / bgStats["optimalHeight"];
          }
        }
        let backgroundStats = generateBackground(heightIterations + 2);

        generateImages(
          columnSize,
          backgroundStats,
          data.images,
          data.titles,
          data.authors,
          data.publishers,
          data.date,
          data.ids,
          data.olvasotts,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        );

        document.getElementById("priceContainer").innerHTML = "";
      })
      .catch((error) => {
        console.error(error);
      });
    document.getElementById("content").style.display = "none";
  } else if (window.location.href.includes("#kivansaglista#")) {
    kivansaglista(
      window.location.href.slice(
        window.location.href.indexOf("#kivansaglista#") +
          "#kivansaglista#".length
      )
    );
    document.getElementById("content").style.display = "block";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";
    alignMiniToolbar();
    isEuro = true;
    globalGeneratedListaElemek = {};
  } else if (
    window.location.href.includes("#kivansaglista") &&
    !window.location.href.includes("#kivansaglista#")
  ) {
    hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal4">Hozzáadás</button>`;
    document.getElementById("content").style.display = "none";
    kivansaglista_csoportok();
    document.getElementById("priceContainer").innerHTML = "";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";

    isEuro = true;
    globalGeneratedListaElemek = {};
  } else if (window.location.href.includes("#olvasott")) {
    hozzadasGomb.innerHTML = `<button id="" type="button" disabled>Hozzáadás</button>`;
    olvasottak();
    document.getElementById("content").style.display = "none";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";

    isEuro = true;
    globalGeneratedListaElemek = {};
  } else if (window.location.href.includes("#elnemkezdett")) {
    hozzadasGomb.innerHTML = `<button id="" type="button" disabled>Hozzáadás</button>`;
    nemElkezdettek();
    document.getElementById("content").style.display = "none";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";

    isEuro = true;
    globalGeneratedListaElemek = {};
  } else if (
    window.location.href.includes("#rendelestervek#") &&
    !window.location.href.includes("#rendelestervekszerkesztese#")
  ) {
    hozzadasGomb.innerHTML = `<button type="button" onclick="turnOnEdit()">Szerkesztés</button>`;
    rendelesterv(
      window.location.href.slice(
        window.location.href.indexOf("#rendelestervek#") +
          "#rendelestervek#".length
      )
    );
    document.getElementById("showbar_content").style.display = "block";
    document.getElementById("content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";

    alignMiniShowbar();
    showBarCounter();
    globalGeneratedListaElemek = {};
  } else if (
    window.location.href.includes("#rendelestervek") &&
    !window.location.href.includes("#rendelestervek#") &&
    !window.location.href.includes("#rendelestervekszerkesztese#")
  ) {
    hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal7">Hozzáadás</button>`;

    document.getElementById("priceContainer").innerHTML = "";
    document.getElementById("content").style.display = "none";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "none";

    rendelestervek();
    isEuro = true;
    globalGeneratedListaElemek = {};
  } else if (window.location.href.includes("#rendelestervekszerkesztese#")) {
    document.getElementById("priceContainer").innerHTML = "";
    document.getElementById("content").style.display = "none";
    document.getElementById("showbar_content").style.display = "none";
    document.getElementById("edit_rectangle_content").style.display = "block";

    hozzadasGomb.innerHTML = `<button id="" type="button" onclick="openModal()">Hozzáadás</button>`;
    alignEditToolbar();
    editRendelestervek();
    isEuro = true;
    globalGeneratedListaElemek = {};
  }
}

function getScrollbarWidth() {
  const div = document.createElement("div");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.overflow = "scroll";
  div.style.visibility = "hidden";

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
  let el = document.getElementById("rectangle_content");
  if (!el.classList.contains("d-none")) {
    el.classList.add("d-none");
  }
  if (el.classList.contains("d-flex")) {
    el.classList.remove("d-flex");
  }
  if (!document.getElementById("content").classList.contains("d-none")) {
    document.getElementById("content").classList.add("d-none");
  }
  if (document.getElementById("content").classList.contains("d-block")) {
    document.getElementById("content").classList.remove("d-block");
  }
}

function alignMiniToolbar() {
  let bookbgs = document.querySelectorAll("#book-bg");
  let bookbg = undefined;
  let bookbgHeight = undefined;

  if (bookbgs !== undefined && bookbgs.length > 0) {
    bookbg = bookbgs[bookbgs.length - 1];
    bookbgHeight = bookbgs[bookbgs.length - 1].offsetHeight;
  }
  let el = document.getElementById("rectangle_content");
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none");
  }
  if (!el.classList.contains("d-flex")) {
    el.classList.add("d-flex");
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
    el.style.left = `${windowWidth - width - getScrollbarWidth()}px`;
    if (bookbg !== undefined) {
      if (
        windowHeight - height <=
        parseInt(bookbg.style.top.replace("px", "")) + bookbgHeight
      ) {
        el.style.top = `${windowHeight - height}px`;
      }
    } else {
      el.style.top = `${window.innerHeight - height}px`;
    }
  }
}

async function kivansaglista_csoportok() {
  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages("kivansaglistaCsoportok.php?")
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        undefined,
        undefined,
        undefined,
        undefined,
        data.ids,
        undefined,
        data.collectionName,
        undefined,
        undefined,
        undefined,
        undefined
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

async function newkivansaglista() {
  let manualData = {
    nev: document.getElementById("nameInput2").value,
    kep: document.getElementById("url2").value,
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
    id: window.location.href.slice(
      window.location.href.indexOf("#kivansaglista#") + "#kivansaglista#".length
    ),
    price: document.getElementById("priceInput5").value,
  };

  upload(manualData, "listahozadas");
}
let globalGeneratedListaElemek = { ids: [], prices: [] };
let globalSelectedElemek = [];
let globalPrices = undefined;
let isEuro = true;

async function kivansaglista(id) {
  if (!window.location.href.includes(`#${id}`)) {
    window.location.href = window.location.href + "#" + id;
  }
  let hozzadasGomb = document.getElementById("hozzaadas");
  hozzadasGomb.innerHTML = `<button id="" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal6">Hozzáadás</button>`;

  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages(`kivansaglista.php?id=${id}&`)
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        data.titles,
        data.authors,
        data.publishers,
        data.date,
        data.ids,
        data.olvasotts,
        undefined,
        data.prices,
        undefined,
        undefined,
        undefined
      );
      globalPrices = data.prices;
      globalGeneratedListaElemek = { ids: data.ids, prices: data.prices };
      createPriceTags();
    })
    .catch((error) => {
      console.error(error);
    });
}

function createPriceTags() {
  const priceContainer = document.getElementById("priceContainer");
  priceContainer.innerHTML = "";
  const bookImages = document.querySelectorAll(".bookImage");
  const bg = document.getElementById("book-bg");
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
  bookImages.forEach((bookImage) => {
    if (count % rowCount === 0 && rowCount !== 1) {
      count++;
    }

    const priceTag = document.createElement("div");
    priceTag.className = "priceTag";

    const imageRect = bookImage.getBoundingClientRect();
    const tagWidth = imageRect.width;
    const tagHeight = "20";

    priceTag.style.width = `${tagWidth}px`;
    priceTag.style.height = `${tagHeight}px`;
    priceTag.style.left = `${imageRect.left}px`;
    priceTag.style.top = `${
      (bg.getBoundingClientRect().height - imageRect.height) / 2 +
      Math.floor(count / rowCount - (rowCount === 1 ? 1 : 0)) *
        bg.getBoundingClientRect().height -
      tagHeight -
      10
    }px`;
    priceTag.style.position = "absolute";
    const stripe = document.createElement("div");
    stripe.className = "stripe";

    const triangle = document.createElement("div");
    triangle.className = "triangle";

    priceTag.appendChild(stripe);
    priceTag.appendChild(triangle);
    const price = document.createElement("p");
    price.className = "Price";
    price.style.textAlign = "center";
    price.style.verticalAlign = "middle";
    price.innerText =
      globalPrices !== undefined ? `${globalPrices[index]}€` : "0.00€";
    price.style.fontSize = "16px";
    priceTag.appendChild(price);

    priceContainer.appendChild(priceTag);
    index++;
    count++;
  });
}

function selection(ids) {
  let elementDom = document.getElementById(`check_${ids}`);
  let id = ids.toString();
  if (
    !globalSelectedElemek.includes(id) &&
    globalGeneratedListaElemek.ids.includes(id)
  ) {
    globalSelectedElemek.push(id);
    if (window.location.href.includes("#kivansaglista#")) {
      toolBarCounter();
    } else if (window.location.href.includes("#rendelestervek#")) {
      showBarCounter();
    }
    if (window.location.href.includes("#rendelestervekszerkesztese#")) {
      editToolBarCounter();
    }
    if (window.location.href.includes("#rendelestervekszerkesztese#")) {
      elementDom.innerHTML = `<i title="Aktuális elem törlése a rendeléstervről" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'rendelestermektorlese')"></i><br><i class="fa-solid fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`;
    } else {
      elementDom.innerHTML = `<i class="fas fa-cloud-upload-alt fa-2xl text-primary" title="Aktuális elem átvitele a kívánságlistáról"  onclick="append(${id})"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'listaroltorles')"></i><br><i class="fa-solid fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`;
    }
  } else if (
    globalSelectedElemek.includes(id) &&
    globalGeneratedListaElemek.ids.includes(id)
  ) {
    globalSelectedElemek = globalSelectedElemek.filter((elem) => elem !== id);
    if (window.location.href.includes("#rendelestervekszerkesztese#")) {
      elementDom.innerHTML = `<i title="Aktuális elem törlése a rendeléstervről" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'rendelestermektorlese')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`;
    } else {
      elementDom.innerHTML = `<i class="fas fa-cloud-upload-alt fa-2xl text-primary" title="Aktuális elem átvitele a kívánságlistáról"  onclick="append(${id})"></i><br><i title="Aktuális elem törlése a kívánságlistáról" class="fas fa-trash-alt fa-2xl" style="color: #FF0000; margin-top:45%" onclick="remove(${id},'listaroltorles')"></i><br><i class="fa-regular fa-square-check fa-2xl" style="color: #73ff00; margin-top:45%" onclick="selection(${id})"></i>`;
    }
    if (window.location.href.includes("#kivansaglista#")) {
      toolBarCounter();
    } else if (window.location.href.includes("#rendelestervek#")) {
      showBarCounter();
    }
    if (window.location.href.includes("#rendelestervekszerkesztese#")) {
      editToolBarCounter();
    }
  }
}

async function getEuroToForintExchangeRate() {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/EUR"
    );
    const data = await response.json();

    const euroToForintRate = data.rates.HUF; // Az EUR/HUF árfolyam

    return euroToForintRate;
  } catch (error) {
    console.error("Hiba történt az adatlekérdezés során:", error);
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
  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/listaAtvitel.php?id=${id}&username=${username}`;

  xhr.open("POST", url, true);
  xhr.onreadystatechange = function () {
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
  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/${path}.php?id=${id}&username=${username}`;

  xhr.open("POST", url, true);
  xhr.onreadystatechange = function () {
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
  let euroSum = 0.0;
  if (globalGeneratedListaElemek !== undefined) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      if (globalSelectedElemek.includes(globalGeneratedListaElemek.ids[i])) {
        euroSum += parseFloat(
          globalGeneratedListaElemek.prices[i].replace("€", "")
        );
      }
    }
  }
  if (isEuro) {
    counter.innerText = `${euroSum.toFixed(2)}€`;
  } else {
    calculateEuroToForint(euroSum.toFixed(2)).then((result) => {
      if (result !== null) {
        counter.innerText = `${result.toFixed(2)}Ft`;
      } else {
        console.warn("Nem sikerült lekérdezni az árfolyamot.");
      }
    });
  }
}

function toolBarSwitch() {
  const switcher = document.getElementById("switcher");
  if (isEuro) {
    switcher.classList.add("text-primary");
    isEuro = false;
    toolBarCounter();
  } else {
    switcher.classList.remove("text-primary");
    isEuro = true;
    toolBarCounter();
  }
}

function toolBarAppend() {
  if (globalGeneratedListaElemek !== undefined) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      if (globalSelectedElemek.includes(globalGeneratedListaElemek.ids[i])) {
        append(globalGeneratedListaElemek.ids[i]);
      }
    }
    globalSelectedElemek = [];
    toolBarCounter();
  }
}

function toolBarRemove() {
  if (globalGeneratedListaElemek !== undefined) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      if (globalSelectedElemek.includes(globalGeneratedListaElemek.ids[i])) {
        remove(globalGeneratedListaElemek.ids[i], "listaroltorles");
      }
    }
    globalSelectedElemek = [];
    toolBarCounter();
  }
}

function olvasottak() {
  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages("olvasottLekeres.php?")
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        data.titles,
        data.authors,
        data.publishers,
        data.date,
        data.ids,
        data.olvasotts,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );

      document.getElementById("priceContainer").innerHTML = "";
    })
    .catch((error) => {
      console.error(error);
    });
}

function nemElkezdettek() {
  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages("nemelkezdettLekeres.php?")
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        data.titles,
        data.authors,
        data.publishers,
        data.date,
        data.ids,
        data.olvasotts,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );

      document.getElementById("priceContainer").innerHTML = "";
    })
    .catch((error) => {
      console.error(error);
    });
}

async function newrendelesterv() {
  let manualData = {
    rendelesnev: document.getElementById("rendelesnev").value,
    tervezettdatum: `${document.getElementById("datepicker").value}`,
    kep: document.getElementById("rendelesurl").value,
  };
  upload(manualData, "UjRendeles");
}

function rendelestervek() {
  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages("rendelestervek.php?")
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);
      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        undefined,
        undefined,
        undefined,
        undefined,
        data.ids,
        undefined,
        undefined,
        undefined,
        data.euro,
        data.tervezetettdatum,
        data.rendelesnev
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

async function rendelesterv(id) {
  if (
    !window.location.href.includes(`#${id}`) ||
    window.location.href.includes("#rendelestervekszerkesztese#")
  ) {
    window.location.href = window.location.href.includes(
      "#rendelestervekszerkesztese#"
    )
      ? window.location.href.slice(0, window.location.href.indexOf("#")) +
        "#rendelestervek" +
        "#" +
        id
      : window.location.href + "#" + id;
  }
  let hozzadasGomb = document.getElementById("hozzaadas");
  hozzadasGomb.innerHTML = `<button type="button" onclick="turnOnEdit()">Szerkesztés</button>`;

  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages(`rendelesterv.php?id=${id}&`)
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        data.titles,
        data.authors,
        data.publishers,
        data.date,
        data.ids,
        undefined,
        undefined,
        data.prices,
        undefined,
        undefined,
        undefined
      );
      globalPrices = data.prices;
      globalGeneratedListaElemek = { ids: data.ids, prices: data.prices };
      createPriceTags();
    })
    .catch((error) => {
      console.error(error);
    });
}

function alignMiniShowbar() {
  let bookbgs = document.querySelectorAll("#book-bg");
  let bookbg = undefined;
  let bookbgHeight = undefined;

  if (bookbgs !== undefined && bookbgs.length > 0) {
    bookbg = bookbgs[bookbgs.length - 1];
    bookbgHeight = bookbgs[bookbgs.length - 1].offsetHeight;
  }
  let el = document.getElementById("showbar_rectangle_content");
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none");
  }
  if (!el.classList.contains("d-flex")) {
    el.classList.add("d-flex");
  }
  if (document.getElementById("showbar_content").classList.contains("d-none")) {
    document.getElementById("showbar_content").classList.remove("d-none");
  }
  if (
    !document.getElementById("showbar_content").classList.contains("d-block")
  ) {
    document.getElementById("showbar_content").classList.add("d-block");
  }
  let width = el.offsetWidth;
  let height = el.offsetHeight;
  let windowHeight = getBottomPosition();
  let windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    el.style.left = "0px";
  } else {
    el.style.left = `${windowWidth - width - getScrollbarWidth()}px`;
    if (bookbg !== undefined) {
      if (
        windowHeight - height <=
        parseInt(bookbg.style.top.replace("px", "")) + bookbgHeight
      ) {
        el.style.top = `${windowHeight - height}px`;
      }
    } else {
      el.style.top = `${window.innerHeight - height}px`;
    }
  }
}

function turnOfMiniShowbar() {
  let el = document.getElementById("showbar_rectangle_content");
  if (!el.classList.contains("d-none")) {
    el.classList.add("d-none");
  }
  if (el.classList.contains("d-flex")) {
    el.classList.remove("d-flex");
  }
  if (
    !document.getElementById("showbar_content").classList.contains("d-none")
  ) {
    document.getElementById("showbar_content").classList.add("d-none");
  }
  if (
    document.getElementById("showbar_content").classList.contains("d-block")
  ) {
    document.getElementById("showbar_content").classList.remove("d-block");
  }
}

function showBarSwitch() {
  const switcher = document.getElementById("showbar_switcher");
  if (isEuro) {
    switcher.classList.add("text-primary");
    isEuro = false;
    showBarCounter();
  } else {
    switcher.classList.remove("text-primary");
    isEuro = true;
    showBarCounter();
  }
}

function showBarArrived() {
  var username = getCookie("user");
  const xhr = new XMLHttpRequest();
  const id = window.location.href.slice(
    window.location.href.indexOf("#rendelestervek#") + "#rendelestervek#".length
  );

  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/rendelestervlezarasa.php?id=${id}&username=${username}`;

  xhr.open("POST", url, true);
  xhr.onreadystatechange = function (event) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        setTimeout(loading, 800);
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("numbers=" + globalGeneratedListaElemek.ids.join(","));
  selectedIds = [];

  window.location.href =
    window.location.href.slice(0, window.location.href.indexOf("#")) +
    "#rendelestervek";
  loading();
  turnOfMiniShowbar();
}

function showBarCounter() {
  const counter = document.getElementById("showbar_euro-label");
  let old = counter.innerHTML;
  let euroSum = 0.0;
  if (
    globalGeneratedListaElemek !== undefined &&
    globalGeneratedListaElemek.ids instanceof Array &&
    globalGeneratedListaElemek.prices instanceof Array
  ) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      euroSum += parseFloat(
        globalGeneratedListaElemek.prices[i].replace("€", "")
      );
    }
  }
  if (isEuro) {
    counter.innerText = `${euroSum.toFixed(2)}€`;
  } else {
    calculateEuroToForint(euroSum.toFixed(2)).then((result) => {
      if (result !== null) {
        counter.innerText = `${result.toFixed(2)}Ft`;
      } else {
        console.warn("Nem sikerült lekérdezni az árfolyamot.");
      }
    });
  }

  if (old !== `${euroSum.toFixed(2)}€`) {
    var username = getCookie("user");
    const xhr = new XMLHttpRequest();
    const id = window.location.href.slice(
      window.location.href.indexOf("#rendelestervek#") +
        "#rendelestervek#".length
    );

    const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/rendelestervmodositas.php?id=${id}&username=${username}`;

    xhr.open("POST", url, true);
    xhr.onreadystatechange = function (event) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setTimeout(loading, 800);
        } else {
          console.error("Error:", xhr.statusText);
        }
      }
    };
    xhr.send(euroSum.toFixed(2));
  }
}

function turnOnEdit() {
  window.location.href =
    window.location.href.slice(0, window.location.href.indexOf("#")) +
    "#rendelestervekszerkesztese#" +
    window.location.href.slice(window.location.href.lastIndexOf("#") + 1);
  loading();
  document.getElementById("showbar_content").style.display = "none";
  window.removeEventListener("scroll", alignMiniShowbar);
  window.addEventListener("scroll", alignEditToolbar);
  turnOfMiniShowbar();
  alignEditToolbar();
}

async function editRendelestervek() {
  const id = window.location.href.slice(
    window.location.href.indexOf("#rendelestervekszerkesztese#") +
      "#rendelestervekszerkesztese#".length
  );
  let hozzadasGomb = document.getElementById("hozzaadas");
  hozzadasGomb.innerHTML = `<button id="" type="button" onclick="openModal()">Hozzáadás</button>`;

  let img = document.getElementById("img");
  let bg = document.getElementById("bg");

  img.innerHTML = "";
  bg.innerHTML = "";

  getImages(`rendelesterv.php?id=${id}&`)
    .then((data) => {
      let bgStats = generateBackground();

      let heightIterations = -1;
      let columnSize = 0;
      if (window.innerWidth >= 1400) {
        columnSize = 6;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 1200) {
        columnSize = 4;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 992) {
        columnSize = 3;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 768) {
        columnSize = 2;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      } else if (window.innerWidth >= 576) {
        columnSize = 1;
        if (
          data.length / columnSize >
          window.innerHeight / bgStats["optimalHeight"]
        ) {
          heightIterations = data.length / columnSize;
        } else {
          heightIterations = window.innerHeight / bgStats["optimalHeight"];
        }
      }
      let backgroundStats = generateBackground(heightIterations + 2);

      generateImages(
        columnSize,
        backgroundStats,
        data.images,
        data.titles,
        data.authors,
        data.publishers,
        data.date,
        data.ids,
        undefined,
        undefined,
        data.prices,
        undefined,
        undefined,
        undefined
      );
      globalPrices = data.prices;
      globalGeneratedListaElemek = { ids: data.ids, prices: data.prices };
      createPriceTags();
    })
    .catch((error) => {
      console.error(error);
    });
}

function alignEditToolbar() {
  let bookbgs = document.querySelectorAll("#book-bg");
  let bookbg = undefined;
  let bookbgHeight = undefined;

  if (bookbgs !== undefined && bookbgs.length > 0) {
    bookbg = bookbgs[bookbgs.length - 1];
    bookbgHeight = bookbgs[bookbgs.length - 1].offsetHeight;
  }
  let el = document.getElementById("edit_rectangle_content");
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none");
  }
  if (!el.classList.contains("d-flex")) {
    el.classList.add("d-flex");
  }
  if (document.getElementById("edit_content").classList.contains("d-none")) {
    document.getElementById("edit_content").classList.remove("d-none");
  }
  if (!document.getElementById("edit_content").classList.contains("d-block")) {
    document.getElementById("edit_content").classList.add("d-block");
  }
  let width = el.offsetWidth;
  let height = el.offsetHeight;
  let windowHeight = getBottomPosition();
  let windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    el.style.left = "0px";
  } else {
    el.style.left = `${windowWidth - width - getScrollbarWidth()}px`;
    if (bookbg !== undefined) {
      if (
        windowHeight - height <=
        parseInt(bookbg.style.top.replace("px", "")) + bookbgHeight
      ) {
        el.style.top = `${windowHeight - height}px`;
      }
    } else {
      el.style.top = `${window.innerHeight - height}px`;
    }
  }
}

function turnOfEditToolbar() {
  let el = document.getElementById("edit_rectangle_content");
  if (!el.classList.contains("d-none")) {
    el.classList.add("d-none");
  }
  if (el.classList.contains("d-flex")) {
    el.classList.remove("d-flex");
  }
  if (!document.getElementById("edit_content").classList.contains("d-none")) {
    document.getElementById("edit_content").classList.add("d-none");
  }
  if (document.getElementById("edit_content").classList.contains("d-block")) {
    document.getElementById("edit_content").classList.remove("d-block");
  }
}

function editToolBarSwitch() {
  const switcher = document.getElementById("edit_switcher");
  if (isEuro) {
    switcher.classList.add("text-primary");
    isEuro = false;
    editToolBarCounter();
  } else {
    switcher.classList.remove("text-primary");
    isEuro = true;
    editToolBarCounter();
  }
}

function editToolBarDone() {
  window.location.href =
    window.location.href.slice(0, window.location.href.indexOf("#")) +
    "#rendelestervek#" +
    window.location.href.slice(window.location.href.lastIndexOf("#") + 1);
  document.getElementById("edit_content").style.display = "none";
  window.removeEventListener("scroll", alignEditToolbar);
  window.addEventListener("scroll", alignMiniShowbar);
  turnOfEditToolbar();
  alignMiniShowbar();
  loading();
}

function editToolBarRemove() {
  if (globalGeneratedListaElemek !== undefined) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      if (globalSelectedElemek.includes(globalGeneratedListaElemek.ids[i])) {
        remove(globalGeneratedListaElemek.ids[i], "rendelestermektorlese"); // TODO php
      }
    }
    globalSelectedElemek = [];
    editToolBarCounter();
  }
}

function editToolBarCounter() {
  const counter = document.getElementById("edit_euro-label");
  let euroSum = 0.0;
  if (
    globalGeneratedListaElemek !== undefined &&
    globalGeneratedListaElemek.ids instanceof Array &&
    globalGeneratedListaElemek.prices instanceof Array
  ) {
    for (let i = 0; i < globalGeneratedListaElemek.ids.length; i++) {
      if (globalSelectedElemek.includes(globalGeneratedListaElemek.ids[i])) {
        euroSum += parseFloat(
          globalGeneratedListaElemek.prices[i].replace("€", "")
        );
      }
    }
  }
  if (isEuro) {
    counter.innerText = `${euroSum.toFixed(2)}€`;
  } else {
    calculateEuroToForint(euroSum.toFixed(2)).then((result) => {
      if (result !== null) {
        counter.innerText = `${result.toFixed(2)}Ft`;
      } else {
        console.warn("Nem sikerült lekérdezni az árfolyamot.");
      }
    });
  }
}

async function generateEditViewData() {
  var username = getCookie("user");

  const id = window.location.href.slice(
    window.location.href.indexOf("#rendelestervekszerkesztese#") +
      "#rendelestervekszerkesztese#".length
  );

  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/rendelestervszerkesztese.php?id=${id}&username=${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // Kezeld az esetleges hálózati hibákat vagy más kivételeket itt
    throw error;
  }
}

let selectedIds = [];

const modal = document.getElementById("edit_exampleModal8");
const modalBody = document.getElementById("edit_modalBody");
const orderName = document.getElementById("orderName");
const plannedDate = document.getElementById("plannedDate");
const selectedItems = document.getElementById("selectedItems");
const totalAmount = document.getElementById("totalAmount");
const addButton = document.getElementById("addButton");
const cancelButton = document.getElementById("cancelButton");

addButton.addEventListener("click", addToSelection);
cancelButton.addEventListener("click", closeModal);

async function openModal() {
  try {
    const datas = await generateEditViewData();
    modal.style.display = "block";
    modalBody.innerHTML = "";
    if (!datas) return new Error("Nem megfelelő adatok");
    const orderHeader = document.createElement("h4");
    orderHeader.textContent = datas.rendelesnev;
    orderName.textContent = datas.rendelesnev;
    plannedDate.textContent = "Tervezett dátum: " + datas.tervezettdatum;

    datas.collections.forEach((collection) => {
      const collectionHeader = document.createElement("h5");
      collectionHeader.textContent = collection.collectionName;
      modalBody.appendChild(collectionHeader);

      collection.elements.forEach((element) => {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("edit_checkbox-label");
        modalBody.appendChild(checkboxLabel);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = element.id;
        checkbox.classList.add("edit_checkbox");
        checkbox.addEventListener("change", toggleSelection);
        checkboxLabel.appendChild(checkbox);

        const label = document.createElement("span");
        label.textContent = `${element.nev} - ${element.price}€`;
        checkboxLabel.appendChild(label);

        modalBody.appendChild(document.createElement("br"));
      });
    });
  } catch (error) {}
}

function closeModal() {
  selectedIds = [];

  selectedItems.innerHTML = "";
  totalAmount.innerHTML = "Végösszeg : 0.00€";
  modal.style.display = "none";
}

function toggleSelection(event) {
  const checkbox = event.target;
  const elementId = parseInt(checkbox.value);
  const label = checkbox.nextElementSibling;

  if (checkbox.checked) {
    selectedIds.push(elementId);
  } else {
    const index = selectedIds.indexOf(elementId);
    if (index !== -1) {
      selectedIds.splice(index, 1);
    }
  }

  updateSelectedItems();
}

async function updateSelectedItems() {
  selectedItems.innerHTML = "";
  let total = 0;
  try {
    const datas = await generateEditViewData();
    datas.collections.forEach((collection) => {
      collection.elements.forEach((element) => {
        if (selectedIds.includes(parseInt(element.id))) {
          const item = document.createElement("p");
          item.textContent = `${element.nev} - ${element.price}€`;
          item.classList.add("edit_selected-item");
          selectedItems.appendChild(item);

          total += element.price;
        }
      });
    });
    totalAmount.textContent = `Végösszeg: ${total.toFixed(2)}€`;
  } catch {}
}

function addToSelection() {
  var username = getCookie("user");
  const xhr = new XMLHttpRequest();
  const id = window.location.href.slice(
    window.location.href.indexOf("#rendelestervekszerkesztese#") +
      "#rendelestervekszerkesztese#".length
  );

  const url = `${ window.location.href.slice( 0,window.location.href.lastIndexOf(":") ) }:7000/rendelestervhozzaadas.php?id=${id}&username=${username}`;

  xhr.open("POST", url, true);
  xhr.onreadystatechange = function (event) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        setTimeout(loading, 800);
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("numbers=" + selectedIds.join(","));
  selectedIds = [];

  selectedItems.innerHTML = "";
  closeModal();
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

jQuery.expr[":"].contains = contains;

async function exportToPDF(path) {
  try {
    var username = getCookie("user");
    let data = await getImages(path);

    let books = [];
    for (let index = 0; index < data["authors"].length; index++) {
      books.push({
        author: data["authors"][index],
        title: data["titles"][index],
        readStatus: data["olvasotts"][index] == 1 ? true : false,
        imageUrl: data["images"][index],
      });
    }

    const generateContentHtml = (username, books) => {
      const getStatusText = (status) => (status ? "Yes" : "No");
      let htmlContent = `<h1 style="text-align: center;">${username}'s MKO list</h1><div class="book-list">`;
      htmlContent +=
        '<div style="display: flex; flex-wrap: wrap; margin-bottom: 20px;">';
      books.forEach((book) => {
        htmlContent += `
        <div class="book-row" style="margin-bottom:20px; display: flex; align-items: center; flex-basis: 50%; max-width: 50%;">
    <div class="book-cover" style="flex: 0 0 192px; max-height: 192px; display: flex; align-items: center; justify-content: center;">
      <img src="${book.imageUrl}" alt="${
          book.title
        }" style="max-height: 192px; max-width:128px; width: auto; height: auto;">
    </div>
    <div class="book-details" style="flex: 1; padding-left: 20px;">
      <h2 class="title">${book.title}</h2>
      <p class="author">Author: ${book.author}</p>
      <p class="read-status">Read: ${getStatusText(book.readStatus)}</p>
    </div>
  </div>`;
      });
      htmlContent += "</div>";
      htmlContent += "</div>";
      return htmlContent;
    };
    let filename = username + "'s MKO list";

    const contentHtml = generateContentHtml(username, books);

    var blob = new Blob([contentHtml], { type: "text/html" });

    var a = document.createElement("a");

    a.download = filename;

    a.href = window.URL.createObjectURL(blob);

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  } catch (error) {
    console.error(error);
  }
}

function exportButton() {
  let selected = document.getElementById("lista_select").value;
  if (selected == "teljes") {
    exportToPDF("adatLekérés.php?");
  } else if (selected == "olvasott") {
    exportToPDF("olvasottLekeres.php?");
  } else if (selected == "nem_olvasott") {
    exportToPDF("nemelkezdettLekeres.php?");
  } else if (selected == "kivansaglista") {
    exportToPDF("kivansaglista.php?id=2&");
  }
}
