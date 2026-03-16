registerGame("truefalse","🧠 True / False Challenge",function(area){

let score=0
let coins=0
let level=1
let time=150

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let question=document.createElement("h2")

let trueBtn=document.createElement("button")
trueBtn.innerText="TRUE"

let falseBtn=document.createElement("button")
falseBtn.innerText="FALSE"

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

area.append(levelText,scoreText,coinText,timerText,question,trueBtn,falseBtn,shopBtn)

let questions=[

// EASY

{q:"The human body has 206 bones.",a:true,e:"Adult human skeleton has 206 bones."},
{q:"Water freezes at 0°C.",a:true,e:"At normal pressure water freezes at 0°C."},
{q:"Plants produce oxygen during photosynthesis.",a:true,e:"Photosynthesis releases oxygen."},
{q:"The Moon produces its own light.",a:false,e:"Moon reflects sunlight."},
{q:"The Earth revolves around the Sun.",a:true,e:"Earth completes one orbit in 365 days."},
{q:"Humans have three hearts.",a:false,e:"Humans have only one heart."},
{q:"Sound travels in vacuum.",a:false,e:"Sound needs a medium to travel."},
{q:"The Sun is a star.",a:true,e:"The Sun is the closest star to Earth."},
{q:"Water boils at 100°C at sea level.",a:true,e:"Boiling point of water is 100°C."},
{q:"Fish can breathe underwater.",a:true,e:"Fish use gills to extract oxygen."},

// MEDIUM

{q:"Velocity is a vector quantity.",a:true,e:"Velocity has magnitude and direction."},
{q:"Acceleration due to gravity is about 9.8 m/s².",a:true,e:"g ≈ 9.8 m/s² on Earth."},
{q:"The SI unit of force is Newton.",a:true,e:"Force is measured in Newton."},
{q:"DNA stands for Deoxyribonucleic Acid.",a:true,e:"DNA stores genetic information."},
{q:"Electrons carry positive charge.",a:false,e:"Electrons carry negative charge."},
{q:"Chlorophyll is responsible for green color in plants.",a:true,e:"Chlorophyll absorbs sunlight."},
{q:"The chemical formula of water is H2O.",a:true,e:"Water = 2 Hydrogen + 1 Oxygen."},
{q:"Light travels faster than sound.",a:true,e:"Speed of light ≈ 3×10^8 m/s."},
{q:"Boiling point decreases at high altitude.",a:true,e:"Lower pressure lowers boiling point."},
{q:"Mitochondria is the powerhouse of the cell.",a:true,e:"It produces ATP energy."},

// HARD

{q:"The derivative of sin(x) is cos(x).",a:true,e:"Basic calculus identity."},
{q:"The square root of 169 is 12.",a:false,e:"√169 = 13."},
{q:"ATP is the energy currency of the cell.",a:true,e:"ATP stores energy in cells."},
{q:"Protons carry negative charge.",a:false,e:"Protons have positive charge."},
{q:"pH value below 7 indicates acidity.",a:true,e:"Acidic solutions have pH < 7."},
{q:"Electron mass is greater than proton mass.",a:false,e:"Electron mass is much smaller."},
{q:"An atom nucleus contains protons and neutrons.",a:true,e:"Electrons orbit around nucleus."},
{q:"Speed of sound is faster than light.",a:false,e:"Light is much faster."},
{q:"The Earth has two natural satellites.",a:false,e:"Earth has only one moon."},
{q:"Energy cannot be created or destroyed.",a:true,e:"Law of conservation of energy."},

// EXTRA QUESTIONS

{q:"Mars is known as the Red Planet.",a:true,e:"Iron oxide makes Mars red."},
{q:"Venus is the hottest planet in our solar system.",a:true,e:"Strong greenhouse effect."},
{q:"Humans have 5 senses.",a:true,e:"Sight, smell, hearing, taste, touch."},
{q:"The brain is part of the nervous system.",a:true,e:"Brain controls body functions."},
{q:"The largest organ in human body is skin.",a:true,e:"Skin covers entire body."},
{q:"Sharks are mammals.",a:false,e:"Sharks are fish."},
{q:"Bats are mammals.",a:true,e:"They give birth and produce milk."},
{q:"The Pacific Ocean is the largest ocean.",a:true,e:"It covers about one-third of Earth."},
{q:"Mount Everest is the tallest mountain.",a:true,e:"Height ≈ 8848 m."},
{q:"The Great Wall of China is visible from space.",a:false,e:"It is not easily visible."},

{q:"The heart pumps blood through the body.",a:true,e:"Heart circulates blood."},
{q:"Oxygen is necessary for respiration.",a:true,e:"Cells use oxygen to release energy."},
{q:"The human brain weighs about 1.4 kg.",a:true,e:"Average adult brain weight."},
{q:"Gold is a good conductor of electricity.",a:true,e:"Gold conducts electricity well."},
{q:"Iron is lighter than aluminum.",a:false,e:"Aluminum is lighter."},
{q:"A leap year has 366 days.",a:true,e:"Occurs every 4 years."},
{q:"Saturn has rings.",a:true,e:"Saturn's rings are made of ice and rock."},
{q:"Pluto is classified as a dwarf planet.",a:true,e:"Pluto was reclassified in 2006."},
{q:"Humans have four lungs.",a:false,e:"Humans have two lungs."},
{q:"Water is a universal solvent.",a:true,e:"It dissolves many substances."}

]

let current

function updateUI(){

levelText.innerText="⚡ Level: "+level
scoreText.innerText="🏆 Score: "+score
coinText.innerText="🪙 Coins: "+coins
timerText.innerText="⏱ Time: "+time

}

function newQuestion(){

current=questions[Math.floor(Math.random()*questions.length)]

question.innerText=current.q

}

function checkAnswer(ans){

if(ans===current.a){

playWin()

score+=10
coins+=2

}else{

playLose()

score=Math.max(0,score-5)

alert("❌ Wrong!\nCorrect answer: "+(current.a?"TRUE":"FALSE")+"\n\n"+current.e)

}

if(score%50===0){

level++
time+=5

alert("⚡ Level Up!")

}

updateUI()
newQuestion()

}

trueBtn.onclick=function(){checkAnswer(true)}
falseBtn.onclick=function(){checkAnswer(false)}

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

let timer=setInterval(()=>{

time--

updateUI()

if(time<=0){

clearInterval(timer)

alert("⏰ Game Over!\nScore: "+score)

closeGame()

}

},1000)

updateUI()
newQuestion()

})