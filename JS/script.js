let scores = JSON.parse(localStorage.getItem('total_scores')) || {wins : 0, loses : 0, ties : 0}


updateScore();
function playgame(playerMove) {
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
    document.querySelector('.scoreParagraph').innerHTML = result;
    
    document.querySelector('.moves_paragraph'). innerHTML = `You <img src="../IMAGES/${playerMove}-emoji.png" alt="${playerMove}"> <img src="../IMAGES/${compMove}-emoji.png" alt="${compMove}"> Computer`;
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
    document.querySelector('.final_scores').innerHTML = `Wins: ${scores.wins}, Loses: ${scores.loses}, Ties: ${scores.ties}`
}

function resetScore() {
    scores.wins = 0;
    scores.loses = 0;
    scores.ties = 0;
    localStorage.clear();
    document.querySelector('.scoreParagraph').innerHTML = `No scores yet...`
    document.querySelector('.moves_paragraph').innerHTML = ` You <img src="../IMAGES/you_start.png" alt=""> <img src="../IMAGES/computer_start.png" alt=""> Computer`
    updateScore();
    colorScores();
}

function colorScores(){
    if (scores.wins > scores.loses){
        document.querySelector('.final_scores').style.color = "green";
    } else if (scores.loses > scores.wins) {
        document.querySelector('.final_scores').style.color = "red";
    } else if (scores.wins == scores.loses){
        document.querySelector('.final_scores').style.color = "yellow";
    }
}