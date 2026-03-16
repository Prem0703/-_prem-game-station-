const games={}

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

function openGame(id){

const modal=document.getElementById("modal")

modal.style.display="flex"

const area=document.getElementById("gameArea")

area.innerHTML=""

games[id](area)

}

function closeGame(){

document.getElementById("modal").style.display="none"

}