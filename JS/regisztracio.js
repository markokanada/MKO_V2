function warningEmptyFields() {
    const popup10 = document.querySelector(".popup10");

    function showPopup10() {
        popup10.classList.add("active");
        setTimeout(hidePopup10, 2000);
    }

    function hidePopup10() {
        popup10.classList.remove("active");
    }

    showPopup10();
}

function warningWrongUsername() {
    const popup9 = document.querySelector(".popup9");

    function showPopup9() {
        popup9.classList.add("active");
        setTimeout(hidePopup9, 2000);
    }

    function hidePopup9() {
        popup9.classList.remove("active");
    }

    showPopup9();
}

function warningFalseEmail() {
    const popup8 = document.querySelector(".popup8");

    function showPopup8() {
        popup8.classList.add("active");
        setTimeout(hidePopup8, 2000);
    }

    function hidePopup8() {
        popup8.classList.remove("active");
    }

    showPopup8();
}

function successfullyRegistrated() {
    const popup7 = document.querySelector(".popup7");

    function showPopup7() {
        popup7.classList.add("active");
        setTimeout(hidePopup7, 2000);
    }

    function hidePopup7() {
        popup7.classList.remove("active");
    }

    showPopup7();
}

function problemHappend() {
    const popup11 = document.querySelector(".popup11");

    function showPopup11() {
        popup11.classList.add("active");
        setTimeout(hidePopup11, 2000);
    }

    function hidePopup11() {
        popup11.classList.remove("active");
    }

    showPopup11();
}



document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // megakadályozza az űrlap alapértelmezett elküldését

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!username || !email || !password) {
        warningEmptyFields();
        return;
    }

    if (username.indexOf('@') !== -1) {
        warningWrongUsername();
        return;
    }

    if (!isValidEmail(email)) {
        warningFalseEmail();
        return;
    }

    var hashedPassword = password;

    // elküldi az adatokat a szervernek
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://kellsosserver.duckdns.org:7000/regisztracio.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            successfullyRegistrated();
        } else {
            problemHappend();
        }
    };
    xhr.send(JSON.stringify({ username: username, email: email, password: hashedPassword }));
});

function isValidEmail(email) {
    // egyszerű e-mail ellenőrzési szabályok
    return /\S+@\S+\.\S+/.test(email);
}
