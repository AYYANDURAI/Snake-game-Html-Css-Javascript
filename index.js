let gameBoard = document.getElementById("game-board");
import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/';
        }
        return;
    }


    window.requestAnimationFrame(main);
    const sinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
    if (sinceLastRenderTime < 1 / SNAKE_SPEED) return;
    console.log("render");
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);


function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}