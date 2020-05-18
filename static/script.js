/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

var button2 = document.querySelector('#arrow_down');
var infoElement = document.querySelector('.more_info');

function klik() {
    menuElement.classList.toggle('show');
}

function removeShadow() {
    shadowElement.classList.toggle('shadow');
}

function showFilters() {
    infoElement.classList.toggle('show_filter');
}

button.addEventListener('click', klik);
button.addEventListener('click', removeShadow);
button2.addEventListener('click', showFilters);