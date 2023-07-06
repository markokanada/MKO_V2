function problemHappend(problem) {
    const popup12 = document.querySelector(".popup12");
    let popup12_text = document.getElementById('popup12-text');
    popup12_text.innerHTML = problem;

    function showPopup12() {
        popup12.classList.add("active");
        setTimeout(hidePopup12, 2000);
    }

    function hidePopup12() {
        popup12.classList.remove("active");
    }

    showPopup12();
}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://backend.buborek-marko.online/bejelentkezes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    console.log(JSON.stringify({ username, password }))
    const data = await response.json();

    if (data.success) {
        document.cookie = `logedIn=${true}; expires=${new Date(Date.now() + 15 * 60 * 1000).toUTCString()}; path=/`;
        document.cookie = `user=${username}; expires=${new Date(Date.now() + 15 * 60 * 1000).toUTCString()}; path=/`;
        window.location.href = 'mkov2.html';
    } else {
        problemHappend(data.message);
    }
});