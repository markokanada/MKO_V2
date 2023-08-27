function openForm() {
    document.getElementsByClassName("contact-form")[0].style.display = "block";
    document.getElementsByClassName("contact-form")[0].style.top = window.scrollY + "px";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

}

function closeForm() {

    document.getElementsByClassName("contact-form")[0].style.display = "none";
    document.getElementsByClassName("contact-form")[0].classList.remove("d-none");
    document.getElementsByTagName("body")[0].style.overflowY = "visible";

}

document.getElementById("contact-form").addEventListener("submit", function(event) {

    event.preventDefault();

    var form = document.getElementById("contact-form");
    var name = form.elements["name"].value;
    var phone = form.elements["phone"].value;
    var email = form.elements["email"].value;
    var message = form.elements["message"].value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://kellsosserver.duckdns.org:7000/contact.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            closeForm();
            alert("Az üzenet sikeresen elküldve!");
        }
    };
    xhr.send("name=" + name + "&phone=" + phone + "&email=" + email + "&message=" + message);
});