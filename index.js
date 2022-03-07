// Core Variables 
let inputDir = { x: 0, y: 0 };
let speed = 1;
let score = 0;
let lastFrame = 0;
let snakeArr = [
    { x: 14, y: 13 },
];

food = { x: 21, y: 20 };
// Game Functions
const main = (time) => {
    window.requestAnimationFrame(main);
    // console.log(time)
    if ((time - lastFrame) / 100 < 1 / speed) {
        return;
    }
    lastFrame = time;
    mainFunction();

}

const collision = (snake) => {
    // If you run into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you run into a wall
    if (snake[0].x >= 26 || snake[0].x <= 0 || snake[0].y >= 26 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

const mainFunction = () => {
    // The snake array & Food
    if (collision(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again.");
        snakeArr = [{ x: 14, y: 13 }];
        score = 0;
    }

    // If you ate food add 1 to the score and add a new food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;

        if (score > highScoreValue) {
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            highScoreBox.innerHTML = "High Score: " + highScoreValue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 25;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // snake mobility
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // The snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // The food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
// to log highScore and keep it
let highScore = localStorage.getItem("high Score");
if (highScore === null) {
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
} else {
    highScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}

// arrow direction
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});