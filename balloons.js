const balloonContainer = document.createElement("div");
balloonContainer.id = "balloon-container";
document.querySelector('body').appendChild(balloonContainer);

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
    background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
  `;
}

function createBalloons(num) {
    console.log("hehe");
    for (var i = 0; i < num; i++) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles(); // Apply styles directly
        balloonContainer.append(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        balloonContainer.remove();
    }, 500);
}

document.addEventListener('DOMContentLoaded', function () {
    // Your code here
    document.querySelector('.button').addEventListener('click', function () {
        if (balloonContainer.children.length === 0) {
            createBalloons(30);
        }
    });
});