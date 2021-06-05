const basicOptionsButton = document.querySelector('#basic-options-button');
const basicOptions = document.querySelector("#basic-options");
const moreOptionsButton = document.querySelector('#more-options-button');
const moreOptions = document.querySelector('#more-options')

basicOptionsButton.addEventListener('click', event => {
    if (basicOptions.classList.contains('hidden')) {
        basicOptions.classList.toggle('hidden');
        moreOptions.classList.toggle('hidden');
    }
});

moreOptionsButton.addEventListener('click', event => {
    if (moreOptions.classList.contains('hidden')) {
        basicOptions.classList.toggle('hidden');
        moreOptions.classList.toggle('hidden');
    }
});