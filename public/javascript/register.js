const form = document.querySelector('form');
const log = document.querySelector('#log');

form.addEventListener('submit', (event) => {
    fetch('/users/register', {
        method: 'POST',
        body: new URLSearchParams({
            'username': form['username'].value,
            'password': form['password'].value
        })
    }).then(data => data.text()).then(message => log.innerHTML = message);
    event.preventDefault();
});
