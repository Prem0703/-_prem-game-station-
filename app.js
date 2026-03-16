const games={}

let activeTimers=[]

// register game

function registerGame(id,name,start){

games[id]=start

const card=document.createElement("div")

card.className="gameCard"

card.innerText=name

card.onclick=function(){

playClick()

openGame(id)

}

document.getElementById("menu").appendChild(card)

}

// open game

function openGame(id){

// stop old timers

activeTimers.forEach(t=>clearInterval(t))
activeTimers=[]

const modal=document.getElementById("modal")

modal.style.display="flex"

const area=document.getElementById("gameArea")

area.innerHTML=""

games[id](area)

}

// close game

function closeGame(){

// stop timers

activeTimers.forEach(t=>clearInterval(t))
activeTimers=[]

document.getElementById("modal").style.display="none"

}