const form = document.querySelector('form');
const log = document.querySelector('#log');

form.addEventListener('submit', (event) => {
    fetch('/users/register', {
        method: 'POST',
        body: new URLSearchParams({
            'username': form['username'].value,
            'password': form['password'].value
        })
    }).then(data => data.text()).then(message => {
        if (message == "Registered successfully!") {
            log.style.color = "green";
            setTimeout(()=>window.location.replace('/login'), 2000);
        } else {
            log.style.color = "red";
        }
        log.innerHTML = message;
    });
    event.preventDefault();
});
