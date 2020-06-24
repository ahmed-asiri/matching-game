var counter = 0; 
var previousCard;
var currentCard;
let score = 0;
let timerID;
let timer;


function shuffleArr(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


function resetEvent() {
    var btns = document.querySelector(".btns-container");
    btns.classList.remove("play-btn");
    btns.classList.add("reset-btn");
    btns.addEventListener("click", resetGame);
    btns.firstElementChild.innerHTML = "Reset";
    btns.lastElementChild.classList.remove("fa-play")
    btns.lastElementChild.classList.add("fa-redo")

}


function resetGame() {
    LoadPage();

    clearInterval(timerID);
    let cards = document.querySelectorAll(".card");
    counter = 0;
    for (const card of cards) {
        card.classList.remove("selected");
        card.classList.remove("correct");
        card.classList.remove("wrong");
        card.classList.remove("hidden");
    }
    score = 0;
    document.querySelector("#score").innerHTML = score;
    document.querySelector("#timer").innerHTML = "00:00";
    let cardContainer = document.querySelector(".card-container");
    cardContainer.removeEventListener("click", cradsMatchingAction);
    var btns = document.querySelector(".btns-container");
    btns.removeEventListener("click", resetGame);

}


function addIcons() {
    var cards = document.querySelectorAll(".card");
    let index = 0;
    var icons = [
        "fas fa-ice-cream", "fas fa-headphones", "fas fa-crow", "fas fa-cat"
        , "fas fa-car", "fas fa-anchor", "fas fa-baby-carriage", "fas fa-home"
    ];
    for (const card of cards) {
        if(index === 0 || index === 8){
            shuffleArr(icons);
            index = 0;
        }
        card.innerHTML = '<i class="' + icons[index] + '"></i>';
        index++;
    }
}


function createCardsListener() {
    let cardContainer = document.querySelector(".card-container");
    for (const card of cardContainer.children) {
        card.classList.add("hidden");
    }
    cardContainer.addEventListener("click",  cradsMatchingAction);
}


function cradsMatchingAction(eve) {
    if(eve.target.nodeName === "I"){
        let card = eve.target.parentNode;
        if(!card.classList.contains("correct") && !card.classList.contains("selected")){
                card.classList.remove("hidden");
                card.classList.add("selected");
            if(counter === 0){
                previousCard = card;
                counter++;
            } else if(counter === 1){
                currentCard = card;
                 if(currentCard.id != previousCard.id){
                    checker(previousCard, currentCard);
                    counter = 0;
                    return;
            }
            }
        }   
    }
}


function changeScore() {
    score++;
    document.querySelector("#score").innerHTML = score;
    if(score == 8){
        clearInterval(timerID);
        Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'You WON the game in ' + timer
          })
    }
}


function checker(previous, current) {
    setTimeout(function() {
        if (previous.firstChild.className === current.firstChild.className){    
            previous.classList.remove("selected");
            previous.classList.add("correct");
            current.classList.remove("selected");
            current.classList.add("correct");
            changeScore();
        }
        else {
            previous.classList.remove("selected");
            previous.classList.add("wrong");
            current.classList.remove("selected");
            current.classList.add("wrong");
            setTimeout(function(){
                previous.classList.remove("wrong");
                previous.classList.add("hidden");
                current.classList.remove("wrong");
                current.classList.add("hidden");
            }, 600);
        }
    }, 200);
    previousCard, currentCard = undefined;
}


function timerSetting() {
    let min = 0;
    let sec = 0;
    timerID = setInterval(function(){
        sec++;
        if(sec === 60){
            min++;
            sec = 0;
        }
        timer = concatenateTimer(min, sec);
        document.querySelector("#timer").innerHTML = `${timer}`
    }, 1000);
}


function concatenateTimer(min, sec){
    let timer;
    if(min <= 9){
        timer = "0" + min;
    } else {
        timer = min;
    }
    if(sec <= 9){
        timer += ":0" + sec; 
    } else {
        timer += ":" + sec;
    }
    return timer;
}


function startGame() {
    currentCard = undefined;
    previousCard = undefined;
    document.querySelector(".btns-container").removeEventListener("click", startGame);
    resetEvent();
    createCardsListener();
    timerSetting();
}


function LoadPage() {
    addIcons();
    let btns = document.querySelector(".btns-container");
    btns.classList.remove("reset-btn");
    btns.classList.add("play-btn");
    btns.firstElementChild.innerHTML = "Play";
    btns.lastElementChild.classList.remove("fa-redo")
    btns.lastElementChild.classList.add("fa-play")
    btns.addEventListener("click", startGame);
}


LoadPage();
