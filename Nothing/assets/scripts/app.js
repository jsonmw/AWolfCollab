// We should change the name of this to "main.js" or whatever.

const greetButton = document.getElementById('greet');
greetButton.addEventListener('click', greetingsFromJimbo);

const goodJim = document.getElementById('good-jim');
const badJim = document.getElementById('bad-jim');
const mainHeader = document.getElementById('main-header');
const menuHeader = document.getElementById('menu-header');
const listItems = document.querySelectorAll('li'); // returns an object containing all list items that you can reference by index
goodJim.addEventListener('mouseover', hailSatan);
badJim.addEventListener('mouseover', hailSatan);

// Swaps Jimbo for Satan.

function hailSatan() {
    if(goodJim.className === 'jim-visible') {
        goodJim.className = 'jim-invisible';
        badJim.className = 'jim-visible';
        mainHeader.innerText = "LORD SATAN";
        menuHeader.innerText = "SATAN";
        listItems[2].innerText = "Meet Satan";
    } else {
        goodJim.className = 'jim-visible';
        badJim.className = 'jim-invisible';
        mainHeader.innerText = "JIMBO OYLE";
        menuHeader.innerText = "JIMBO";
        listItems[2].innerText = "Meet Jim";
    }
}

// Renders greeting based on given input text.

function greetingsFromJimbo() {
    const name = document.getElementById('name').value;
    const greetingSpace = document.getElementById('greeting');
    greetingSpace.innerText =`hello ${name}, I am jimbo`;
}
