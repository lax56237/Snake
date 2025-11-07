// DOM elements
const box = document.getElementById("0");
const container = document.querySelector(".container");
const food = document.getElementById("food");
const scoreDisplay = document.getElementById("scoreDisplay");

// Sounds
const eatSound = new Audio("eat.mp3");
const crashSound = new Audio("crash.mp3");

// Variables
let key = null;
let intid = null;
let ftop = null;
let fleft = null;
let score = 0;
let i = 0;
let obj = { 0: [350, 350] };
let past = [];

// Initialize first food
addFood();

// Handle key presses
document.addEventListener("keydown", (event) => {
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!validKeys.includes(event.key)) return;

    if (
        (key === "ArrowUp" && event.key === "ArrowDown") ||
        (key === "ArrowDown" && event.key === "ArrowUp") ||
        (key === "ArrowLeft" && event.key === "ArrowRight") ||
        (key === "ArrowRight" && event.key === "ArrowLeft")
    ) {
        return;
    }

    if (event.key !== key) {
        key = event.key;
        clearInterval(intid);
        intid = setInterval(() => moveSnake(key), 100);
    }
});

// Main movement
function moveSnake(direction) {
    let top = obj[0][0];
    let left = obj[0][1];

    switch (direction) {
        case "ArrowUp":
            top -= 50;
            break;
        case "ArrowDown":
            top += 50;
            break;
        case "ArrowLeft":
            left -= 50;
            break;
        case "ArrowRight":
            left += 50;
            break;
    }

    obj[0] = [top, left];
    box.style.top = top + "px";
    box.style.left = left + "px";

    // Move body smoothly
    if (i > 0) {
        for (let I = i; I > 0; I--) {
            obj[I] = [...obj[I - 1]];
        }
        shiftBody();
    }

    // Check wall collision
    if (top < 0 || top >= 750 || left < 0 || left >= 750) {
        clearInterval(intid);
        crashSound.play();
        alert(`💀 Game Over! Final Score: ${score}`);
        location.reload();
        return;
    }

    // Check food collision
    if (top === ftop && left === fleft) {
        score++;
        updateScore();
        eatSound.play();
        addFood();
        addBody();
    }
}

// Add food in random grid
function addFood() {
    ftop = 50 * Math.floor(Math.random() * 15);
    fleft = 50 * Math.floor(Math.random() * 15);

    food.style.top = ftop + "px";
    food.style.left = fleft + "px";
    food.style.height = "50px";
    food.style.width = "50px";
}

// Add new body segment
function addBody() {
    i++;
    const lastPos = [...obj[i - 1]];
    obj[i] = lastPos;

    const div = document.createElement("div");
    div.className = "box";
    div.id = i;
    div.style.top = lastPos[0] + "px";
    div.style.left = lastPos[1] + "px";
    container.appendChild(div);
}

// Move the body parts
function shiftBody() {
    for (let I = i; I > 0; I--) {
        const segment = document.getElementById(I);
        segment.style.top = obj[I][0] + "px";
        segment.style.left = obj[I][1] + "px";
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}
