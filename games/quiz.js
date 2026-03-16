registerGame("quiz","🐾 Animal Adventure Quiz",function(area){

let score=0
let coins=0
let level=1
let time=160
let combo=0

let usedQuestions=[]
let lastLevel=1

let character=document.createElement("div")
character.innerText="🐾"
character.style.fontSize="70px"
character.style.animation="bounce 1s infinite"

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let question=document.createElement("h2")
let optionsDiv=document.createElement("div")

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

let dailyBtn=document.createElement("button")
dailyBtn.innerText="🎯 Daily Challenge"

area.append(character,levelText,scoreText,coinText,timerText,question,optionsDiv,shopBtn,dailyBtn)

let ans

// EASY
let easy=[
{q:"King of jungle?",o:["Lion","Tiger","Dog"],a:0},
{q:"Largest land animal?",o:["Elephant","Horse","Cow"],a:0},
{q:"Animal that loves bananas?",o:["Monkey","Cat","Dog"],a:0},
{q:"Which animal barks?",o:["Dog","Lion","Cow"],a:0},
{q:"Which animal gives milk?",o:["Cow","Tiger","Snake"],a:0},
{q:"Which animal lives in water?",o:["Fish","Dog","Horse"],a:0},
{q:"Which animal hops?",o:["Kangaroo","Elephant","Lion"],a:0},
{q:"Which animal has long neck?",o:["Giraffe","Dog","Tiger"],a:0},
{q:"Which bird cannot fly?",o:["Penguin","Eagle","Crow"],a:0},
{q:"Which animal crawls?",o:["Snake","Horse","Dog"],a:0}
]

// MEDIUM
let medium=[
{q:"Which animal carries baby in pouch?",o:["Kangaroo","Horse","Lion"],a:0},
{q:"Fastest land animal?",o:["Cheetah","Lion","Horse"],a:0},
{q:"Tallest animal?",o:["Giraffe","Elephant","Horse"],a:0},
{q:"Which bird can see at night?",o:["Owl","Crow","Duck"],a:0},
{q:"Which sea animal is intelligent?",o:["Dolphin","Shark","Whale"],a:0},
{q:"Which animal lives in Arctic?",o:["Polar Bear","Lion","Tiger"],a:0},
{q:"Which animal has stripes?",o:["Tiger","Lion","Dog"],a:0},
{q:"Which animal has shell?",o:["Turtle","Dog","Cow"],a:0},
{q:"Which animal roars?",o:["Lion","Cat","Dog"],a:0},
{q:"Which animal howls?",o:["Wolf","Cow","Horse"],a:0}
]

// HARD
let hard=[
{q:"How many hearts octopus has?",o:["3","2","4"],a:0},
{q:"How many neck bones giraffe has?",o:["7","12","20"],a:0},
{q:"How many eyes bee has?",o:["5","2","3"],a:0},
{q:"Which mammal can fly?",o:["Bat","Bird","Butterfly"],a:0},
{q:"Largest shark species?",o:["Whale Shark","Tiger Shark","Great White"],a:0},
{q:"Which animal sleeps standing?",o:["Horse","Lion","Dog"],a:0},
{q:"Which animal changes color?",o:["Chameleon","Dog","Lion"],a:0},
{q:"Which animal lives longest?",o:["Tortoise","Dog","Tiger"],a:0},
{q:"Which bird runs fastest?",o:["Ostrich","Eagle","Crow"],a:0},
{q:"Which animal regrows limbs?",o:["Starfish","Dog","Horse"],a:0}
]

// EXTRA
let extra=[
{q:"Which animal has largest brain?",o:["Sperm Whale","Elephant","Blue Whale"],a:0},
{q:"Which animal sleeps 3 years?",o:["Snail","Bear","Tiger"],a:0},
{q:"Which animal tastes with feet?",o:["Butterfly","Bee","Ant"],a:0},
{q:"Which animal never fully sleeps?",o:["Dolphin","Lion","Horse"],a:0},
{q:"Which animal has blue blood?",o:["Octopus","Fish","Dog"],a:0},
{q:"Which insect strongest?",o:["Ant","Bee","Fly"],a:0}
]

function updateLevel(){

if(score>=300) level=4
else if(score>=200) level=3
else if(score>=100) level=2
else level=1

if(level!==lastLevel){
usedQuestions=[]
lastLevel=level
}

}

function getPool(){

if(level===1) return easy
if(level===2) return medium
if(level===3) return hard
return extra

}

function getQuestion(){

let pool=getPool()

if(usedQuestions.length>=pool.length){
usedQuestions=[]
}

let index

do{
index=Math.floor(Math.random()*pool.length)
}while(usedQuestions.includes(index))

usedQuestions.push(index)

let q=pool[index]

question.innerText=q.q
optionsDiv.innerHTML=""
ans=q.a

q.o.forEach((opt,i)=>{

let btn=document.createElement("button")
btn.innerText=opt

btn.onclick=function(){

if(i===ans){

playWin()

score+=10
coins+=3
combo++

character.innerText="😎"

if(combo>=3){

score+=20
coins+=5
combo=0

alert("🔥 Combo Bonus!")

}

updateLevel()
updateUI()
getQuestion()

}

else{

playLose()

combo=0
character.innerText="😵"

setTimeout(()=>character.innerText="🐾",500)

}

}

optionsDiv.appendChild(btn)

})

}

function updateUI(){

scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
levelText.innerText="🗺 Level: "+level
timerText.innerText="⏱ Time: "+time

}

shopBtn.onclick=function(){

if(coins>=10){

coins-=10
time+=10

alert("⏱ Extra Time Purchased!")

}else{

alert("Not enough coins!")

}

updateUI()

}

dailyBtn.onclick=function(){

let q={q:"🎯 Daily: Smartest sea animal?",o:["Dolphin","Shark","Whale"],a:0}

question.innerText=q.q
optionsDiv.innerHTML=""

q.o.forEach((opt,i)=>{

let btn=document.createElement("button")
btn.innerText=opt

btn.onclick=function(){

if(i===0){

score+=30
coins+=10
alert("🎉 Daily Challenge Complete!")

}

getQuestion()

}

optionsDiv.appendChild(btn)

})

}

/* TIMER FIXED */

let timer=setInterval(()=>{

time--
updateUI()

if(time<=0){

clearInterval(timer)

alert("⏰ Game Over! Score: "+score)

closeGame()

}

},1000)

activeTimers.push(timer)

updateUI()
getQuestion()

})