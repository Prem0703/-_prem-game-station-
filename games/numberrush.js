registerGame("numberrush","🔢 Number Rush",function(area){

let score=0
let coins=0
let level=1
let time=150
let nextNumber=1

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let info=document.createElement("h2")
info.innerText="Remember numbers → click in order!"

let grid=document.createElement("div")

grid.style.display="grid"
grid.style.gap="10px"
grid.style.justifyContent="center"
grid.style.marginTop="20px"

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

area.append(levelText,scoreText,coinText,timerText,info,grid,shopBtn)

function updateUI(){

levelText.innerText="⚡ Level: "+level
scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
timerText.innerText="⏱ Time: "+time

}

function shuffle(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))
let temp=arr[i]
arr[i]=arr[j]
arr[j]=temp

}

}

function startLevel(){

grid.innerHTML=""
nextNumber=1

let count = level + 5
let cols = Math.min(7,Math.ceil(Math.sqrt(count)))

grid.style.gridTemplateColumns="repeat("+cols+",70px)"

let numbers=[]

for(let i=1;i<=count;i++){
numbers.push(i)
}

shuffle(numbers)

let buttons=[]

numbers.forEach(num=>{

let btn=document.createElement("button")

btn.innerText=num
btn.style.fontSize="20px"
btn.style.padding="15px"

buttons.push(btn)

btn.onclick=function(){

if(num===nextNumber){

playWin()

btn.style.visibility="hidden"

score+=10
coins+=1

nextNumber++

if(nextNumber>count){

level++
time+=5

alert("⚡ Level "+level)

startLevel()

}

updateUI()

}else{

playLose()

score=Math.max(0,score-5)
time-=4

alert("❌ Wrong!")

updateUI()

}

}

grid.appendChild(btn)

})

/* MEMORY MODE */

setTimeout(()=>{

buttons.forEach(btn=>{
btn.innerText="?"
})

},7000)

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

alert("⏰ Time Up!\nScore: "+score)

closeGame()

}

},1000)

activeTimers.push(timer)

updateUI()
startLevel()

})