const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const contactForm = document.getElementById("contact-form");

openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const question = document.getElementById("question").value;
    const subject = `Új kérdés érkezett: ${name}`;
    const body = `Név: ${name}%0D%0AE-mail: ${email}%0D%0ATelefonszám: ${phone}%0D%0AKérdés: ${question}`;
    const mailtoLink = `mailto:contact@buborek-marko.online?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    modal.style.display = "none";
});