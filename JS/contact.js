// Űrlap megjelenítése
function openForm() {
    document.getElementsByClassName("contact-form")[0].style.display = "block";
    document.getElementsByClassName("contact-form")[0].style.top = window.scrollY + "px";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

}

// Űrlap elrejtése
function closeForm() {

    document.getElementsByClassName("contact-form")[0].style.display = "none";
    document.getElementsByClassName("contact-form")[0].classList.remove("d-none");
    document.getElementsByTagName("body")[0].style.overflowY = "visible";

}

// Űrlap elküldése
document.getElementById("contact-form").addEventListener("submit", function(event) {

    event.preventDefault(); // Az alapértelmezett űrlap küldési viselkedésének megakadályozása

    // Az űrlap adatainak összegyűjtése
    var form = document.getElementById("contact-form");
    var name = form.elements["name"].value;
    var phone = form.elements["phone"].value;
    var email = form.elements["email"].value;
    var message = form.elements["message"].value;

    // AJAX kérés küldése a PHP backendnek
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://backend.buborek-marko.online/contact.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Sikeres küldés esetén az űrlap elrejtése és üzenet megjelenítése a felhasználónak
            closeForm();
            alert("Az üzenet sikeresen elküldve!");
        }
    };
    xhr.send("name=" + name + "&phone=" + phone + "&email=" + email + "&message=" + message);
});