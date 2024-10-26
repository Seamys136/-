const app = document.getElementById('app');
const timeRemainingDisplay = document.getElementById('timeRemaining');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.getElementById('gameContainer');
const finishSection = document.getElementById('finishSection');
const restartButton = document.getElementById('restartButton');
const gameOverMessage = document.getElementById('gameOverMessage');
const highScoreMessage = document.getElementById('highScoreMessage');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const newRecordMessage = document.getElementById('newRecordMessage');

let score = 0;
let timeRemaining = 30;
let gameOver = false;
let highScore = localStorage.getItem('highScore') || 0;

function createFly() {
    const fly = document.createElement('div');
    fly.className = 'fly';
    fly.style.width = '50px'; 
    fly.style.height = '50px'; 
    fly.style.backgroundImage = "url('muha.png')"; 
    fly.style.backgroundSize = 'cover';
    fly.style.top = Math.random() * (window.innerHeight - 50) + 'px'; 
    fly.style.left = Math.random() * (window.innerWidth - 50) + 'px'; 

    fly.addEventListener('click', () => {
        score++;
        scoreDisplay.innerText = score;
        fly.style.opacity = 0;
        setTimeout(() => {
            fly.remove();
        }, 500);
        updateHighScore();
    });

    gameContainer.appendChild(fly);
    setTimeout(() => {
        if (!gameOver) {
            fly.remove();
        }
    }, 5000);  
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.innerText = highScore;
        newRecordMessage.style.display = 'block';
    } else {
        newRecordMessage.style.display = 'none';
    }
}

function startGame() {
    score = 0;
    timeRemaining = 30;
    gameOver = false;
    scoreDisplay.innerText = score;
    timeRemainingDisplay.innerText = timeRemaining;
    gameOverMessage.style.display = 'none';
    highScoreMessage.style.display = 'none';

    const timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timeRemainingDisplay.innerText = timeRemaining;
        } else {
            clearInterval(timer);
            gameOver = true;
            gameOverMessage.style.display = 'block';
            highScoreMessage.style.display = 'block';
            highScoreDisplay.innerText = highScore;
        }
    }, 1000);

    setInterval(createFly, 750);
}

restartButton.addEventListener('click', startGame);
startGame();