registerGame("emoji","🔎 Find Different Emoji",function(area){

let score=0
let coins=0
let level=1
let time=120
let combo=0

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let grid=document.createElement("div")

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

grid.style.display="grid"
grid.style.gridTemplateColumns="repeat(5,60px)"
grid.style.gap="10px"
grid.style.justifyContent="center"
grid.style.marginTop="20px"

area.append(levelText,scoreText,coinText,timerText,grid,shopBtn)

let emojis=["😀","😃","😄","😁","😆","😅","😂","🤣"]

function updateUI(){

scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
levelText.innerText="🗺 Level: "+level
timerText.innerText="⏱ Time: "+time

}

function newRound(){

grid.innerHTML=""

let base=emojis[Math.floor(Math.random()*emojis.length)]
let diff=emojis[Math.floor(Math.random()*emojis.length)]

while(diff===base){

diff=emojis[Math.floor(Math.random()*emojis.length)]

}

let size=25+level*2

let diffIndex=Math.floor(Math.random()*size)

for(let i=0;i<size;i++){

let tile=document.createElement("div")

tile.style.fontSize="28px"
tile.style.cursor="pointer"

tile.innerText=(i===diffIndex)?diff:base

tile.onclick=function(){

if(i===diffIndex){

playWin()

score+=10
coins+=3
combo++

if(combo>=3){

score+=20
coins+=5
combo=0

alert("🔥 Combo Bonus!")

}

if(score%60===0){

level++

}

updateUI()

newRound()

}

else{

playLose()

combo=0

}

}

grid.appendChild(tile)

}

}

// SHOP BUTTON

shopBtn.onclick=function(){

if(coins>=10){

coins-=10
time+=10

alert("⏱ +10 seconds purchased!")

updateUI()

}else{

alert("❌ Not enough coins!")

}

}

// TIMER

let timer=setInterval(()=>{

time--

updateUI()

if(time<=0){

clearInterval(timer)

alert("⏰ Game Over! Score: "+score)

closeGame()

}

},1000)

updateUI()

newRound()

})