registerGame("reaction","⚡ Reaction Speed Trainer",function(area){

let score=0
let level=1
let best=999
let waiting=true
let startTime=0

let scoreText=document.createElement("h3")
let levelText=document.createElement("h3")
let bestText=document.createElement("h3")

let info=document.createElement("h2")

let btn=document.createElement("button")

btn.style.fontSize="28px"
btn.style.padding="30px"
btn.style.marginTop="20px"

area.append(levelText,scoreText,bestText,info,btn)

function updateUI(){

scoreText.innerText="🏆 Score: "+score.toFixed(2)
levelText.innerText="⚡ Level: "+level
bestText.innerText="🥇 Best: "+best.toFixed(3)+" sec"

}

function startRound(){

waiting=true

info.innerText="WAIT..."
btn.innerText="..."

let delay=Math.random()*2000 + 1000

setTimeout(()=>{

// trap chance
if(Math.random()<0.2){

info.innerText="WAIT!"
btn.innerText="TRAP!"

waiting=true

setTimeout(startRound,1200)

return

}

waiting=false

info.innerText="GO!"
btn.innerText="CLICK!"

startTime=Date.now()

},delay)

}

btn.onclick=function(){

// early click
if(waiting){

info.innerText="❌ Too Early!"

score=Math.max(0,score-5)

setTimeout(startRound,1200)

updateUI()

return

}

let reaction=(Date.now()-startTime)/1000

score+=Math.max(5,20-reaction*10)

if(reaction<best){
best=reaction
}

info.innerText="⚡ "+reaction.toFixed(3)+" sec"

level++

updateUI()

setTimeout(startRound,1500)

}

updateUI()
startRound()

})