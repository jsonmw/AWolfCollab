// We should change the name of this to "main.js" or whatever.

const greetButton = document.getElementById('greet');
greetButton.addEventListener('click', greetingsFromJimbo);

const goodJim = document.getElementById('good-jim');
const badJim = document.getElementById('bad-jim');
const mainHeader = document.getElementById('main-header');
goodJim.addEventListener('mouseover', hailSatan);
badJim.addEventListener('mouseover', hailSatan);

function hailSatan() {
    if(goodJim.className === 'jim-visible') {
        goodJim.className = 'jim-invisible';
        badJim.className = 'jim-visible';
        mainHeader.innerText = "LORD SATAN";
    } else {
        goodJim.className = 'jim-visible';
        badJim.className = 'jim-invisible';
        mainHeader.innerText = "JIMBO OYLE";
    }
}

function greetingsFromJimbo() {
    const name = document.getElementById('name').value;
    const greetingSpace = document.getElementById('greeting');
    greetingSpace.innerText = `hello ${name}, I am jimbo`
}

const aBunchAShitInAMap = new Map;
aBunchAShitInAMap.set({color: 'green', size: 'big'}, 37)