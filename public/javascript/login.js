const form = document.querySelector('form');
const log = document.querySelector('#log');

form.addEventListener('submit', (event) => {
    fetch('/users/login', {
        method: 'POST',
        credentials: 'same-origin',
        body: new URLSearchParams({
            'username': form['username'].value,
            'password': form['password'].value
        })
    })
        .then(response => response.text())
        .then(message => {
            if (message == 'Success') {
                window.location.replace('/')
            } else {
                log.innerHTML = message;
                log.style.color = "red";
            }
        });
    event.preventDefault();
});
