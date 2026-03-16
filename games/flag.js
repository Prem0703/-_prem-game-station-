registerGame("flagquiz","🌍 Country Flag Guess",function(area){

let score=0
let coins=0
let level=1
let time=120

let scoreText=document.createElement("h3")
let coinText=document.createElement("h3")
let levelText=document.createElement("h3")
let timerText=document.createElement("h3")

let flag=document.createElement("img")
flag.style.width="140px"
flag.style.margin="20px"

let options=document.createElement("div")
options.style.marginTop="20px"

let shopBtn=document.createElement("button")
shopBtn.innerText="🪙 Shop"

area.append(levelText,scoreText,coinText,levelText,timerText,flag,options,shopBtn)

let questions=[

{flag:"https://flagcdn.com/w320/in.png",a:"India",o:["India","Pakistan","Bangladesh","Nepal"]},
{flag:"https://flagcdn.com/w320/us.png",a:"USA",o:["USA","Canada","Australia","UK"]},
{flag:"https://flagcdn.com/w320/gb.png",a:"United Kingdom",o:["United Kingdom","France","Germany","Italy"]},
{flag:"https://flagcdn.com/w320/fr.png",a:"France",o:["France","Italy","Spain","Germany"]},
{flag:"https://flagcdn.com/w320/de.png",a:"Germany",o:["Germany","Belgium","Austria","Netherlands"]},
{flag:"https://flagcdn.com/w320/it.png",a:"Italy",o:["Italy","France","Spain","Portugal"]},
{flag:"https://flagcdn.com/w320/es.png",a:"Spain",o:["Spain","Portugal","Italy","France"]},
{flag:"https://flagcdn.com/w320/jp.png",a:"Japan",o:["Japan","China","South Korea","Vietnam"]},
{flag:"https://flagcdn.com/w320/cn.png",a:"China",o:["China","Japan","Thailand","Vietnam"]},
{flag:"https://flagcdn.com/w320/kr.png",a:"South Korea",o:["South Korea","Japan","China","Thailand"]},
{flag:"https://flagcdn.com/w320/ca.png",a:"Canada",o:["Canada","USA","Denmark","Finland"]},
{flag:"https://flagcdn.com/w320/br.png",a:"Brazil",o:["Brazil","Argentina","Mexico","Chile"]},
{flag:"https://flagcdn.com/w320/au.png",a:"Australia",o:["Australia","New Zealand","UK","Canada"]},
{flag:"https://flagcdn.com/w320/nz.png",a:"New Zealand",o:["New Zealand","Australia","UK","Canada"]},
{flag:"https://flagcdn.com/w320/za.png",a:"South Africa",o:["South Africa","Nigeria","Kenya","Egypt"]},
{flag:"https://flagcdn.com/w320/eg.png",a:"Egypt",o:["Egypt","Morocco","Turkey","Saudi Arabia"]}

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

flag.src=current.flag

options.innerHTML=""

current.o.forEach(opt=>{

let btn=document.createElement("button")

btn.innerText=opt

btn.onclick=function(){

if(opt===current.a){

playWin()

score+=10
coins+=2

}else{

playLose()

score=Math.max(0,score-5)

alert("❌ Wrong!\nCorrect answer: "+current.a)

}

updateUI()
newQuestion()

}

options.appendChild(btn)

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