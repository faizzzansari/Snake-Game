// Constants and Variabbles
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const highScore = document.getElementById("hScore");

// Scores
let scoreValue = 0;
let highScoreValue = localStorage.getItem('highScore') || 0; // Getting the previous High Score from Local Storage on Game start
highScore.textContent = `Hi Score ${highScoreValue}`;

// Important Variables for game
let direction;
let box = 20;
let snake = [
    { x: 5, y: 6 },
];
let food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
};

// Event Listener for movement or setting the direction
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction != 'Down') direction = 'Up';    break;
        case 'ArrowDown':
            if (direction != 'Up') direction = 'Down';    break;
        case 'ArrowLeft':
            if (direction != 'Right') direction = 'Left'; break;
        case 'ArrowRight':
            if (direction != 'Left') direction = 'Right'; break;
    }
})

// function to move or animate the snake
function moveSnake() {
    let newHead = { x: snake[0].x, y: snake[0].y }
    switch (direction) {
        case 'Up':    newHead.y--; break;
        case 'Down':  newHead.y++; break;
        case 'Left':  newHead.x--; break;
        case 'Right': newHead.x++; break;
    }
    snake.unshift(newHead);
    snake.pop();
}

// function to check the gameover conditions
function gameOver() {
    if (snake[0].x >= 20 || snake[0].y >= 20 || snake[0].x <= -1 || snake[0].y <= -1) { //Cheking border collission
        return true;
    }
    for(i = 1; i < snake.length-1; i++){   //Cheking self collission
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true;
        }
    }
    return false;
}

// Main function for game
function Game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = "red";  // Drawing the Food
    ctx.fillRect(food.x * box, food.y * box, box, box);

    moveSnake();

    if (snake[0].x == food.x && snake[0].y == food.y) {   // Checking if the Snake has eaten the Food or not
        food.x = Math.floor(Math.random() * 20);
        food.y = Math.floor(Math.random() * 20);
        // Extending the Snake when he eat the food
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });

        scoreValue++;  // Increasing the score value
        score.textContent = `Score : ${scoreValue}`;
    }

    snake.forEach((e, index) => {   // Drawing the Snake body
        ctx.fillStyle = index === 0 ? 'lime' : 'green';
        ctx.fillRect(snake[index].x * box, snake[index].y * box, box, box);
    })

    if (scoreValue > highScoreValue) {  // Checking if the High Score is breaked or not 
        highScoreValue = scoreValue;
        highScore.textContent = `Hi Score ${highScoreValue}`;
        localStorage.setItem('highScore', highScoreValue);  // Setting the new High Score on the Local Storage
    }

    if (gameOver()) {  //Checking the gameover conditions
        alert(`Game Over \nYour Score : ${scoreValue}`);
        snake[0].x = 5
        snake[0].y = 6
        document.location.reload();
    }
}

// Calling the Main or Game funtion in Loop to play game contiously
function gameLoop() {
    setTimeout(() => {
        Game();
        requestAnimationFrame(gameLoop);
    }, 150);
}

gameLoop(); // Start the game loop