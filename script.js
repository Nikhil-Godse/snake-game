let inputDir = {x:0, y:0};
let foodsound = new Audio('eat.mp3');
let gameOverSound = new Audio('over.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let scoreBord = document.querySelector("#score");
let highscroeBox = document.querySelector("#highscroeBox")
// let board = document.getElementById('board')
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]

food = {x:6, y:7}

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngin();

}

function isCollide(snake){
    for(let i = 1; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

let score = 0;

function gameEngin(){
    // updating the snake array
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        inputDir = {x:0, y:0};
        alert("game over press any key to play again")
        snakeArr = [
            {x:13, y:15}
        ];
        musicSound.play();
        score = 0;
        scoreBord.textContent =`Score : ${score}`;
    }
    // if you eaten food, increment the score and reappear food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        foodsound.play();
        score += 1;
        if(score > hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
            highscroeBox.innerHTML = `High Score : ${hiscoreVal}`
        }
        scoreBord.textContent =`Score : ${score}`;
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()),   y: Math.round(a + (b-a) * Math.random())}
    }
    // moving snake
    for (let i = snakeArr.length - 2; i >= 0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};  
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // render the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=> {
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart =  e.x;

    if(index === 0){
        snakeElement.classList.add("head");
    }
    else{
        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
    })
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart =  food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
 
// actual game engin;
let hiscore = localStorage.getItem("highscore");

if(hiscore == null){
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal = JSON.parse(hiscore)
    highscroeBox.innerHTML = `High Score : ${hiscoreVal}`
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=>{
    inputDir = {x:0, y:1}   // start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})