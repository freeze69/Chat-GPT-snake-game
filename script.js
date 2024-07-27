
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{x: 5, y: 5}];
let food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
let direction = {x: 0, y: 0};
let newDirection = {x: 0, y: 0};
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY && direction.x !== 1) {
        newDirection = {x: -1, y: 0};
    }
    if (keyPressed === UP_KEY && direction.y !== 1) {
        newDirection = {x: 0, y: -1};
    }
    if (keyPressed === RIGHT_KEY && direction.x !== -1) {
        newDirection = {x: 1, y: 0};
    }
    if (keyPressed === DOWN_KEY && direction.y !== -1) {
        newDirection = {x: 0, y: 1};
    }
}

function gameLoop() {
    direction = newDirection;

    let head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check for collisions with walls
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || isSnake(head)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
    } else {
        snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
}

function isSnake(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

function resetGame() {
    snake = [{x: 5, y: 5}];
    direction = {x: 0, y: 0};
    newDirection = {x: 0, y: 0};
    score = 0;
    food = {x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize)};
}

setInterval(gameLoop, 100);
