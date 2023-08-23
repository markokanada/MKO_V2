function sendData() {
    const allStars = document.querySelectorAll('.star');
    let value = 0;

    allStars.forEach((star, i) => {
        if (star.innerHTML == "★") {
            value++
        }
    })

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://kellsosserver.duckdns.org:7000/star.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("data=" + value);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let response = xhr.responseText
            stars(response[1])
        }
    }
}

function stars(stars) {
    const allStars = document.querySelectorAll('.star');
    if (stars == -1) {
        allStars.forEach((star, i) => {
            star.onclick = function() {
                let current_star_level = i + 1;

                allStars.forEach((star, j) => {
                    if (current_star_level >= j + 1) {
                        star.innerHTML = '&#9733';
                    } else {
                        star.innerHTML = '&#9734';
                    }

                })

            }
        })
    } else {
        let k = 0;
        while (k < stars) {
            allStars[k].onclick = function() {}
            allStars[k].innerHTML = '&#9733';
            k++;
        }

        let ertekeles = document.getElementById("ertekeles");
        let gomb = document.getElementById("gomb");
        ertekeles.innerHTML = "Köszönjük értékelését! Jelenlegi statisztikánk";
        gomb.style.display = "none";
    }
}
