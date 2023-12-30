// HTML elements
const playRock = document.querySelector('#rock');
const playPaper = document.querySelector('#paper');
const playScissors = document.querySelector('#scissors');
const resultParagraph = document.querySelector('#resultParagraph');
const scoresParagraph = document.querySelector('#final_scores');
const resetButton = document.querySelector('#reset_scores');

let scores = JSON.parse(localStorage.getItem('total_scores')) || {wins : 0, loses : 0, ties : 0}
updateScore();
colorScores();


// Calling functions
playRock.addEventListener("click", () => playGame('rock'));
playPaper.addEventListener("click", () => playGame('paper'));
playScissors.addEventListener("click", () => playGame('scissors'));
resetButton.addEventListener("click", () => resetScores());

function playGame(playerMove) {
    let compMove = pickComputerMove()
    let result;
    if (playerMove === compMove) {
        scores.ties ++;
        result = 'Tie Game';
    } else if (playerMove === 'rock') {
        if (compMove === 'paper'){
            scores.loses++;
            result = 'You Lose';
        } else {
            scores.wins++;
            result = 'You Win';
        }
    } else if (playerMove === 'paper') {
        if (compMove === 'rock') {
            scores.wins++;
            result = 'You Win';
        } else {
            scores.loses++;
            result = 'You Lose';
        }
    } else {
        if (compMove === 'rock'){
            scores.loses++;
            result = 'You Lose';
        }else {
            scores.wins++;
            result = 'You Win';
        }
    }
    localStorage.setItem('total_scores', JSON.stringify(scores));
    resultParagraph.innerHTML = result;
    document.querySelector("#you_img").src = `./IMAGES/${playerMove}-emoji.png`;
    document.querySelector("#computer_img").src = `./IMAGES/${compMove}-emoji.png`;
    colorResult(result)
    updateScore();
    colorScores();
}


function pickComputerMove() {
    let computerMove;
    const randNum = Math.floor(Math.random() * 3);
    if (randNum == 0) {
        computerMove = 'rock';
    } else if (randNum == 1) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computerMove;
}

function updateScore(){
    scoresParagraph.innerHTML = `Wins: ${scores.wins}, Loses: ${scores.loses}, Ties: ${scores.ties}`
}

function resetScores() {
    scores.wins = 0;
    scores.loses = 0;
    scores.ties = 0;
    localStorage.clear();
    resultParagraph.innerHTML = `No scores yet...`;
    document.querySelector('#computer_img').src = "./IMAGES/computer_start.png";
    document.querySelector('#you_img').src = "./IMAGES/you_start.png";
    updateScore();
    resultParagraph.style.color = "white"
    scoresParagraph.style.color = "white";
}

function colorScores(){
    if (scores.wins === 0 && scores.loses === 0 && scores.ties === 0) {
        return;
    }

    if (scores.wins > scores.loses){
        scoresParagraph.style.color = "green";
    } else if (scores.loses > scores.wins) {
        scoresParagraph.style.color = "red";
    } else {
        scoresParagraph.style.color = "yellow";
    }
}

function colorResult(result) {
    if (result === "You Win") {
        resultParagraph.style.color = "green";
    } else if (result === "You Lose") {
        resultParagraph.style.color = "red";
    } else if (result === "Tie Game") {
        resultParagraph.style.color = "yellow";
    }
}

