registerGame("colormatch","🎨 Color Match Challenge",function(area){

let score=0
let coins=0
let level=1
let time=120

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let word=document.createElement("h1")

let buttons=document.createElement("div")
buttons.style.marginTop="20px"

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

area.append(levelText,scoreText,coinText,timerText,word,buttons,shopBtn)

let colors=["red","blue","green","yellow","purple"]

let colorNames=["RED","BLUE","GREEN","YELLOW","PURPLE"]

let answer=""

function updateUI(){

levelText.innerText="⚡ Level: "+level
scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
timerText.innerText="⏱ Time: "+time

}

function newRound(){

let textIndex=Math.floor(Math.random()*colors.length)
let colorIndex=Math.floor(Math.random()*colors.length)

word.innerText=colorNames[textIndex]
word.style.color=colors[colorIndex]

answer=colors[colorIndex]

buttons.innerHTML=""

colors.forEach(c=>{

let btn=document.createElement("button")

btn.innerText=c.toUpperCase()

btn.onclick=function(){

if(c===answer){

playWin()

score+=10
coins+=2

if(score%50===0){

level++
time+=5

alert("⚡ Level Up!")

}

}else{

playLose()

score=Math.max(0,score-5)

}

updateUI()
newRound()

}

buttons.appendChild(btn)

})

}

shopBtn.onclick=function(){

if(coins>=10){

coins-=10
time+=15

alert("⏱ Extra Time Purchased!")

}else{

alert("Not enough coins!")

}

updateUI()

}

/* TIMER FIX */

let timer=setInterval(()=>{

time--

updateUI()

if(time<=0){

clearInterval(timer)

alert("⏰ Game Over!\nScore: "+score)

closeGame()

}

},1000)

activeTimers.push(timer)

updateUI()
newRound()

})