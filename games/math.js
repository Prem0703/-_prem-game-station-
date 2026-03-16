registerGame("math","🧠 Math Adventure World",function(area){

let score = 0
let coins = 0
let level = 1
let time = 160
let combo = 0

let character = document.createElement("div")
character.innerText = "🧙"
character.style.fontSize = "70px"
character.style.animation = "bounce 1s infinite"

let scoreText = document.createElement("h3")
let coinText = document.createElement("h3")
let levelText = document.createElement("h3")
let timerText = document.createElement("h3")

let question = document.createElement("h2")

let input = document.createElement("input")

let btn = document.createElement("button")
btn.innerText = "Submit"

let shopBtn = document.createElement("button")
shopBtn.innerText = "🪙 Shop"

let dailyBtn = document.createElement("button")
dailyBtn.innerText = "🎯 Daily Challenge"

area.appendChild(character)
area.appendChild(levelText)
area.appendChild(scoreText)
area.appendChild(coinText)
area.appendChild(timerText)
area.appendChild(question)
area.appendChild(input)
area.appendChild(btn)
area.appendChild(shopBtn)
area.appendChild(dailyBtn)

let ans

function updateUI(){

scoreText.innerText = "🏆 Score: " + score
coinText.innerText = "🪙 Coins: " + coins
levelText.innerText = "🗺 Level: " + level
timerText.innerText = "⏱ Time: " + time

}

function updateLevel(){

if(score >= 350){

level = 5

}

else if(score >= 300){

level = 4

}

else if(score >= 250){

level = 3

}

else if(score >= 100){

level = 2

}

else{

level = 1

}

}

function newQuestion(){

let a = Math.floor(Math.random()*10)+1
let b = Math.floor(Math.random()*10)+1

if(level === 1){

ans = a + b
question.innerText = `${a} + ${b} = ?`

}

else if(level === 2){

ans = a - b
question.innerText = `${a} - ${b} = ?`

}

else if(level === 3){

ans = a * b
question.innerText = `${a} × ${b} = ?`

}

else if(level === 4){

ans = Math.floor(a / b)
question.innerText = `${a} ÷ ${b} = ?`

}

else if(level === 5){

bossBattle()

}

input.value = ""

}

function bossBattle(){

let a = Math.floor(Math.random()*40)+10
let b = Math.floor(Math.random()*40)+10

ans = a * b

question.innerText = `👾 BOSS: ${a} × ${b}`

}

btn.onclick = function(){

if(Number(input.value) === ans){

playWin()

score += 10
coins += 3
combo++

character.innerText = "😎"

if(combo >= 3){

score += 20
coins += 5
combo = 0

alert("🔥 Combo Bonus!")

}

updateLevel()

updateUI()

newQuestion()

}

else{

playLose()

character.innerText = "😵"

combo = 0

setTimeout(()=>character.innerText="🧙",500)

}

}

shopBtn.onclick = function(){

if(coins >= 10){

coins -= 10
time += 20

alert("⏱ Extra Time Purchased!")

}

else{

alert("Not enough coins!")

}

updateUI()

}

dailyBtn.onclick = function(){

let a = Math.floor(Math.random()*100)
let b = Math.floor(Math.random()*100)

ans = a + b

question.innerText = `🎯 Daily Challenge: ${a} + ${b}`

}

let timer = setInterval(function(){

time--

updateUI()

if(time <= 0){

clearInterval(timer)

saveScore()

alert("⏰ Game Over! Score: " + score)

closeGame()

}

},1000)

function saveScore(){

let scores = JSON.parse(localStorage.getItem("mathScores") || "[]")

scores.push(score)

scores.sort((a,b)=>b-a)

scores = scores.slice(0,5)

localStorage.setItem("mathScores",JSON.stringify(scores))

}

updateUI()

newQuestion()

})