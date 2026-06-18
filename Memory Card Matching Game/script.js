const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");

let emojis;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let score = 0;
let matchedPairs = 0;

function startGame(){

    emojis = [
        "🍎","🍎",
        "🍌","🍌",
        "🍇","🍇",
        "🍒","🍒",
        "🥝","🥝",
        "🍉","🍉",
        "🍓","🍓",
        "🍍","🍍"
    ];

    emojis.sort(() => Math.random() - 0.5);
    board.innerHTML = "";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    score = 0;
    matchedPairs = 0;
    movesText.textContent = moves;
    scoreText.textContent = score;
    message.textContent = "";

    emojis.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = "?";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    if(this.classList.contains("matched")) return;
    this.textContent = this.dataset.emoji;
    if(!firstCard){
        firstCard = this;
        return;
    }
    secondCard = this;
    moves++;
    movesText.textContent = moves;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.emoji === secondCard.dataset.emoji){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        score += 5;
        scoreText.textContent = score;
        matchedPairs++;
        resetCards();

        if(matchedPairs === 8){
            message.textContent =
            `🎉 You Won! Score: ${score}`;
        }

    }else{
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";
            resetCards();
        },1000);
    }
}

function resetCards(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

startGame();