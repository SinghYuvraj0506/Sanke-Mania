// Game Constants
let direction = { x: 0, y: 0 }     /*It tells the direction of the snake movement and will change according to the key pressed on the keyboard */
let snakeArr = [            /* It decides the values of the boxes in the grid and also as the size  of the snake increases the more ogjects will be added to the array */
    { x: 12, y: 15 }
]
let food = { x: 5, y: 6 }      // food coordinate
let board = document.querySelector(".board")
let scorecard = document.getElementById("score")
let score = 0    /* It is the score counting variable of the snake game */
let speed = 5
let lastPaintTime = 0;


// Game functions
function main(ctime) {
    // it basically runs the game again and and and refreshes the page in every few milli seconds
    window.requestAnimationFrame(main);
    /*Now we can slow down the speed of the game running by use fps = 1/speed in seconds*/
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime;
    scorecard.innerHTML = "Your score - "+score
    gameEngine()
}

function isCollide(snakeArr) {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        if (snakeArr[snakeArr.length - 1].x == snakeArr[i].x && snakeArr[snakeArr.length - 1].y == snakeArr[i].y) {
            return true
        }
    }
    if (snakeArr[snakeArr.length - 1].x >= 18 || snakeArr[snakeArr.length - 1].x <= 0 || snakeArr[snakeArr.length - 1].y >= 18 || snakeArr[snakeArr.length - 1].y <= 0) {
        return true
    }
    return false
}

function gameEngine() {
    // Part1. It will update the snake after eating the food
    if (isCollide(snakeArr)) {
        direction = { x: 0, y: 0 }
        alert("Game Over, Press any key to Play Again!")
        snakeArr = [{ x: 13, y: 15 }]
        score = 0
    }

    // If you have eaten the food and then inncrese the size as well as regenrate the food

    if (snakeArr[snakeArr.length - 1].x == food.x && snakeArr[snakeArr.length - 1].y == food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }          /* it will randomly genrate the position of the food autoatically */
        score+=1;
    }

    // Movement of the snake
    for (let i = 0; i < snakeArr.length - 1; i++) {
        snakeArr[i] = { ...snakeArr[i + 1] };      // here we assigned the value of the first coordinates of snakeARr which is actually the tail of the snake to its second element and so on till all the element refer to the head element to move
    }

    snakeArr[snakeArr.length - 1].x += direction.x
    snakeArr[snakeArr.length - 1].y += direction.y





    // Part2 . It will Display food and the snake portions on the screen

    // Display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        /*Iterates each element of snakearr ie checks each element position */
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y    /* decides the position of the div inside the grid */
        snakeElement.style.gridColumnStart = e.x /* decides the position of the div inside the grid */
        if (index == snakeArr.length - 1) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })


    // Display the food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y    /* decides the position of the div inside the grid */
    foodElement.style.gridColumnStart = food.x /* decides the position of the div inside the grid */
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}



// Main component of the game which is used to run the game  again and again
/*here we could have used setinverval also but for running a game we need a smooth graphics */
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    console.log(e.keyCode)
    direction = { x: 0, y: 1 }   // Starts the game as any button on the keyboard is pressed
    // towards right is the positive x and towards down is positive y
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;    // means -ive y direction        
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }
})