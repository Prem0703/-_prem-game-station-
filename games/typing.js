registerGame("typing","⌨️ Typing Speed Trainer",function(area){

let score=0
let coins=0
let level=1
let time=120

let typed=0
let correct=0

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let wpmText=document.createElement("h3")
let accText=document.createElement("h3")

let wordText=document.createElement("h2")

let input=document.createElement("input")
input.placeholder="Type here..."

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

area.append(levelText,scoreText,coinText,timerText,wpmText,accText,wordText,input,shopBtn)

let words=[

"apple","banana","tiger","elephant","computer","keyboard","javascript","school","teacher","science",
"planet","galaxy","rocket","internet","mobile","education","language","mountain","ocean","student",
"python","coding","developer","programming","algorithm","database","network","security","technology",
"innovation","machine","learning","artificial","intelligence","robot","satellite","astronaut","universe",
"physics","chemistry","biology","mathematics","engineering","software","hardware","monitor","browser",
"laptop","charger","battery","speaker","microphone","camera","printer","scanner","display","processor"

]

let usedWords=[]
let currentWord=""

function updateUI(){

levelText.innerText="⚡ Level: "+level
scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
timerText.innerText="⏱ Time: "+time

let minutes=(120-time)/60
let wpm=minutes>0 ? Math.round(correct/minutes) : 0
let acc=typed>0 ? Math.round((correct/typed)*100) : 100

wpmText.innerText="⚡ WPM: "+wpm
accText.innerText="🎯 Accuracy: "+acc+"%"

}

function newWord(){

if(usedWords.length>=words.length){
usedWords=[]
}

let index

do{
index=Math.floor(Math.random()*words.length)
}while(usedWords.includes(index))

usedWords.push(index)

currentWord=words[index]

wordText.innerText=currentWord

input.value=""
input.focus()

}

input.addEventListener("keyup",function(e){

if(e.key==="Enter"){

typed++

if(input.value===currentWord){

playWin()

score+=10
coins+=2
correct++

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
newWord()

}

})

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

let minutes=120/60
let wpm=Math.round(correct/minutes)
let acc=typed>0 ? Math.round((correct/typed)*100) : 0

alert("⏰ Game Over!\nScore: "+score+"\nWPM: "+wpm+"\nAccuracy: "+acc+"%")

closeGame()

}

},1000)

activeTimers.push(timer)

updateUI()
newWord()

})