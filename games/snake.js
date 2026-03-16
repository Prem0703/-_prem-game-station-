registerGame("snake","🐍 Snake Speed Trainer",function(area){

let score = 0
let level = 1
let time = 120

let speed = 200
let grid = 20

let snake = [
{x:200,y:200},
{x:180,y:200},
{x:160,y:200}
]

let direction = "RIGHT"

let food = {
x:Math.floor(Math.random()*20)*grid,
y:Math.floor(Math.random()*20)*grid
}

let canvas = document.createElement("canvas")
canvas.width = 400
canvas.height = 400

let ctx = canvas.getContext("2d")

let scoreText = document.createElement("h3")
let levelText = document.createElement("h3")
let timerText = document.createElement("h3")

area.appendChild(levelText)
area.appendChild(scoreText)
area.appendChild(timerText)
area.appendChild(canvas)

function updateUI(){

scoreText.innerText="🏆 Score: "+score
levelText.innerText="⚡ Level: "+level
timerText.innerText="⏱ Time: "+time

}

// keyboard control
document.addEventListener("keydown",function(e){

if(e.key==="ArrowUp" && direction!=="DOWN") direction="UP"
if(e.key==="ArrowDown" && direction!=="UP") direction="DOWN"
if(e.key==="ArrowLeft" && direction!=="RIGHT") direction="LEFT"
if(e.key==="ArrowRight" && direction!=="LEFT") direction="RIGHT"

})

function moveSnake(){

let head={...snake[0]}

if(direction==="UP") head.y -= grid
if(direction==="DOWN") head.y += grid
if(direction==="LEFT") head.x -= grid
if(direction==="RIGHT") head.x += grid

// wall wrap
if(head.x < 0) head.x = 380
if(head.y < 0) head.y = 380
if(head.x > 380) head.x = 0
if(head.y > 380) head.y = 0

snake.unshift(head)

// food eat
if(head.x === food.x && head.y === food.y){

playWin()

score += 15
time += 2

food = {
x:Math.floor(Math.random()*20)*grid,
y:Math.floor(Math.random()*20)*grid
}

// level system
if(score >= 200){

level++

score = 0

snake = [
{x:200,y:200},
{x:180,y:200},
{x:160,y:200}
]

speed -= 20
if(speed < 70) speed = 70

clearInterval(gameInterval)
gameInterval = setInterval(gameLoop,speed)

alert("⚡ Level "+level+" Speed Increased!")

}

}

else{

snake.pop()

}

// self collision
for(let i=1;i<snake.length;i++){

if(head.x===snake[i].x && head.y===snake[i].y){

clearInterval(gameInterval)
clearInterval(timer)

alert("💀 Game Over!\nScore: "+score)

closeGame()

return

}

}

}

function draw(){

ctx.fillStyle="#020617"
ctx.fillRect(0,0,400,400)

// food
ctx.fillStyle="orange"
ctx.fillRect(food.x,food.y,grid,grid)

// snake
ctx.fillStyle="#22c55e"

snake.forEach(part=>{
ctx.fillRect(part.x,part.y,grid,grid)
})

}

function gameLoop(){

moveSnake()
draw()
updateUI()

}

let gameInterval = setInterval(gameLoop,speed)

// timer
let timer = setInterval(function(){

time--

updateUI()

if(time<=0){

clearInterval(timer)
clearInterval(gameInterval)

alert("⏰ Time Up!\nScore: "+score)

closeGame()

}

},1000)

updateUI()

})