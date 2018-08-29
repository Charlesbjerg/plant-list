// let dom elements
let loader = document.getElementById('loader');
let btns = document.getElementsByClassName('btn-wide');

// add event listeners
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', activateLoader);
}

// define functions
function activateLoader() {
    loader.style.display = "flex";
    loader.style.opacity = "1";   
}