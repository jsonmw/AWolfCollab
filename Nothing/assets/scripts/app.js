// We should change the name of this to "main.js" or whatever.

const greetButton = document.getElementById('greet');

greetButton.addEventListener('click', greetingsFromJimbo);

// how to get Jim to turn into satan on mouseover? click?

// greetButton.addEventListener('mouseover', hailSatan);

// function hailSatan() {
//     const image = document.querySelector('img');
//     image.innerHTML="<img src='https://pbs.twimg.com/media/DQJRFgsW4AUKvZd.jpg:large'>";
// }

function greetingsFromJimbo() {
    const name = document.getElementById('name').value;
    const greetingSpace = document.getElementById('greeting');
    greetingSpace.innerText = `hello ${name}, I am jimbo`
}

const aBunchAShitInAMap = new Map;
aBunchAShitInAMap.set({color: 'green', size: 'big'}, 37)