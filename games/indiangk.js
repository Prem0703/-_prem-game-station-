registerGame("indiangk"," Indian GK Challenge",function(area){

let score=0
let coins=0
let level=1
let time=160
let combo=0

let usedQuestions=[]
let lastLevel=1

let character=document.createElement("div")
character.innerHTML="INDIA 🫡"
character.style.fontSize="70px"
character.style.textAlign="center"
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
{q:"Capital of India?",o:["New Delhi","Mumbai","Kolkata"],a:0},
{q:"National animal of India?",o:["Tiger","Lion","Elephant"],a:0},
{q:"National bird of India?",o:["Peacock","Parrot","Eagle"],a:0},
{q:"National flower of India?",o:["Lotus","Rose","Lily"],a:0},
{q:"National fruit of India?",o:["Mango","Banana","Apple"],a:0},
{q:"Currency of India?",o:["Rupee","Dollar","Yen"],a:0},
{q:"Father of Nation?",o:["Mahatma Gandhi","Nehru","Ambedkar"],a:0},
{q:"Pink City of India?",o:["Jaipur","Delhi","Agra"],a:0},
{q:"Gateway of India located in?",o:["Mumbai","Delhi","Kolkata"],a:0},
{q:"India got independence in?",o:["1947","1950","1942"],a:0}
]

// MEDIUM
let medium=[
{q:"Who wrote Indian National Anthem?",o:["Rabindranath Tagore","Gandhi","Nehru"],a:0},
{q:"Largest state of India?",o:["Rajasthan","Maharashtra","UP"],a:0},
{q:"Smallest state of India?",o:["Goa","Sikkim","Tripura"],a:0},
{q:"Where is Taj Mahal?",o:["Agra","Delhi","Jaipur"],a:0},
{q:"First Prime Minister of India?",o:["Jawaharlal Nehru","Gandhi","Patel"],a:0},
{q:"Longest river in India?",o:["Ganga","Yamuna","Godavari"],a:0},
{q:"Silicon Valley of India?",o:["Bangalore","Hyderabad","Pune"],a:0},
{q:"Thar Desert is in which state?",o:["Rajasthan","Punjab","Gujarat"],a:0},
{q:"Which ocean touches India?",o:["Indian Ocean","Pacific","Atlantic"],a:0},
{q:"Golden Temple is in?",o:["Amritsar","Delhi","Jaipur"],a:0}
]

// HARD
let hard=[
{q:"First President of India?",o:["Dr Rajendra Prasad","Radhakrishnan","Zakir Hussain"],a:0},
{q:"Highest civilian award?",o:["Bharat Ratna","Padma Shri","Padma Bhushan"],a:0},
{q:"ISRO headquarters?",o:["Bangalore","Delhi","Hyderabad"],a:0},
{q:"Who designed Indian flag?",o:["Pingali Venkayya","Gandhi","Tagore"],a:0},
{q:"Which state has most national parks?",o:["Madhya Pradesh","Assam","Kerala"],a:0},
{q:"Who founded Maurya Empire?",o:["Chandragupta Maurya","Ashoka","Harsha"],a:0},
{q:"Commonwealth Games 2010 hosted in?",o:["Delhi","Mumbai","Chennai"],a:0},
{q:"Highest mountain in India?",o:["Kangchenjunga","Everest","Nanda Devi"],a:0},
{q:"Which river called Dakshin Ganga?",o:["Godavari","Krishna","Kaveri"],a:0},
{q:"Indian Constitution adopted in?",o:["1950","1947","1952"],a:0}
]

// EXTRA HARD
let extra=[
{q:"First woman Prime Minister?",o:["Indira Gandhi","Sarojini Naidu","Pratibha Patil"],a:0},
{q:"India became republic in?",o:["1950","1947","1942"],a:0},
{q:"Mars mission of India?",o:["Mangalyaan","Chandrayaan","Gaganyaan"],a:0},
{q:"Highest literacy state?",o:["Kerala","Goa","Maharashtra"],a:0},
{q:"City of Lakes?",o:["Udaipur","Bhopal","Indore"],a:0},
{q:"Who wrote Indian Constitution?",o:["B R Ambedkar","Nehru","Gandhi"],a:0}
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

if(combo>=3){
score+=20
coins+=5
combo=0
alert("🔥 Combo Bonus!")
}

updateLevel()
updateUI()
getQuestion()

}else{

playLose()
combo=0
alert("❌ Wrong!")
getQuestion()

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

let q={q:"🎯 Daily: National sport of India?",o:["Hockey","Cricket","Football"],a:0}

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

// TIMER FIX

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