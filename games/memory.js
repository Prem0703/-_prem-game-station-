registerGame("memory","🃏 Memory Card Flip",function(area){

let score=0
let coins=0
let level=1
let time=120

let first=null
let lock=false
let matched=0

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let grid=document.createElement("div")

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

grid.style.display="grid"
grid.style.gap="10px"
grid.style.justifyContent="center"
grid.style.marginTop="20px"

area.append(levelText,scoreText,coinText,timerText,grid,shopBtn)

let emojis=[
"🐶","🐱","🐭","🐹","🐰","🦊",
"🐻","🐼","🐸","🐵","🐯","🦁",
"🐨","🐮","🐷","🐔","🐧","🐦"
]

function updateUI(){

scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
levelText.innerText="🗺 Level: "+level
timerText.innerText="⏱ Time: "+time

}

function shuffle(arr){

return arr.sort(()=>Math.random()-0.5)

}

function startGame(){

grid.innerHTML=""
first=null
lock=false
matched=0

let size=level+1   // Level 1 → 2x2

grid.style.gridTemplateColumns=`repeat(${size},70px)`

let total=size*size

// ensure even number
if(total%2!==0) total--

let pairCount=total/2

let selected=emojis.slice(0,pairCount)

let cards=shuffle([...selected,...selected])

cards.forEach(e=>{

let card=document.createElement("div")

card.style.width="70px"
card.style.height="70px"
card.style.background="#1e293b"
card.style.borderRadius="10px"
card.style.display="flex"
card.style.alignItems="center"
card.style.justifyContent="center"
card.style.fontSize="30px"
card.style.cursor="pointer"
card.style.transition="0.3s"

card.dataset.emoji=e
card.innerText="❓"

card.onclick=function(){

if(lock||card.innerText!=="❓") return

card.innerText=e

if(!first){

first=card
return

}

if(first.dataset.emoji===card.dataset.emoji){

playWin()

score+=10
coins+=2

matched+=2

first=null

if(matched===cards.length){

level++

score+=30
coins+=10

alert("🎉 Level "+level)

startGame()

}

}

else{

playLose()

lock=true

setTimeout(()=>{

card.innerText="❓"
first.innerText="❓"

first=null
lock=false

},800)

}

}

grid.appendChild(card)

})

}

shopBtn.onclick=function(){

if(coins>=10){

coins-=10
time+=20

alert("⏱ +20 seconds purchased!")

updateUI()

}

else{

alert("❌ Not enough coins!")

}

}

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

startGame()

})