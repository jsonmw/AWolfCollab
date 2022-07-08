
const greetButton = document.getElementById('greet');

greetButton.addEventListener('click', greetingsFromJimbo);

function greetingsFromJimbo() {
    const name = document.getElementById('name').value;
    const greetingSpace = document.getElementById('greeting');
    greetingSpace.innerText = `hello ${name}, I am jimbo`
}

const aBunchAShitInAMap = new Map;
aBunchAShitInAMap.set({color: 'green', size: 'big'}, 37)