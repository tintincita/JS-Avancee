const btn = document.getElementById("nInput");
let place = document.getElementById("grid");


let NewElt, newChild, cardNumber, firstFlip;
let nFlipped, tempsrc, tempResult ;
let nPairsFound, pairsFound = [];
let nFruits=2 , allowClick = true;


const delayInMilliseconds = 500;

let fruits = ["apple", "kiwi", "banana", "cherry", "grape","lemon", "mango", "orange", "pear", "strawberry", "watermelon"];
let cards = [];

// display selector for new game and choice of size (nFruits)
newElt = document.createElement("select");
newElt.id = "taille";
newElt.classList.add("newGame");
newElt.name = "tailleInput";

for (i = 2; i<12; i++) {
    newChild = document.createElement("option");
    newChild.value = i;
    newChild.innerText = i;
    newChild.classList.add("newGame");
    newElt.appendChild(newChild)
}

btn.appendChild(newElt);

// function to layout cards
const drawBoard = (taille) => {
    nFlipped = 0;
    nPairsFound = 0;
    pairsFound = [];

    cards = fruits.slice(0,taille);
    cards = cards.concat(cards);
    
    cards = cards.sort(()=> Math.random() - 0.5);

    
    for (i = 0; i < taille*2; i++){
        newElt = document.createElement("div");
        newElt.innerHTML = '<img src="./assets/img/back.jpg" alt="card" id ="' + i + '">';
        
        place.appendChild(newElt);
    }
    
}

const flip = (target) => {
    allowClick = false;
    target.src = "./assets/img/"+cards[target.id]+".jpg";
    nFlipped++;

    switch (nFlipped) {
        case 1 :
            firstFlip = target.id;
            allowClick = true;
            break;
        case 2 :
            tempResult = (cards[firstFlip] == cards[target.id]);
            setTimeout(returnFlipped, delayInMilliseconds, target, tempResult);
            if (tempResult) {
                foundAPair(target)
            }
    }

    if (nPairsFound >= (cards.length/2)){
        endGame();
    }
}

const returnFlipped = (target, empty) => {
    (empty?  tempsrc = "./assets/img/blank.jpg" : tempsrc = "./assets/img/back.jpg")
    console.log(target.src);
    console.log(firstFlip);
    target.src = tempsrc;
    newElt = document.getElementById(firstFlip);
    newElt.src = tempsrc;
    nFlipped = 0;
    allowClick = true;
}

const foundAPair = (target) => {
    nPairsFound ++;
    pairsFound.push(target.id, firstFlip);
}

const endGame = () =>{
    showSelector();
}

// 
const hideSelector = () => {
    newElt = document.querySelectorAll(".newGame")
    newElt.forEach(element => element.classList.add("ongoingGame"))
}

const showSelector = () => {
    newElt = document.querySelectorAll(".newGame")
    newElt.forEach(element => element.classList.remove("ongoingGame"))
}

// listen to window
window.addEventListener("click", function(e) {
    
    if(e.target.id == "taille"){
        nFruits = e.target.value;
    }
    
    if (e.target.type == "submit") {
        place.innerHTML = "";
        hideSelector();
        drawBoard(nFruits);
    }
    
     if(e.target.type == undefined&& !pairsFound.includes(e.target.id) && allowClick) {
        console.log(e.target.src);
        flip (e.target);
     }
});