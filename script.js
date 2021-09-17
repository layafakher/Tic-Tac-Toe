const statusDisplay = document.querySelector('.game--status');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick(clickedCellEvent) {
    if (checkPlayerWon()!==-1){
        let won = checkPlayerWon();
        statusDisplay.innerHTML = `Player ${won} has won!`;
        return;
    }
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '') {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    if (checkPlayerWon()!==-1){
        let won = checkPlayerWon();
        statusDisplay.innerHTML = `Player ${won} has won!`;
        return;
    }
    if (checkGameEnd()){
        statusDisplay.innerHTML = `Game ended in a draw!`;
        return;
    }
    handlePlayerChange();
}

function handleRestartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => (cell.innerHTML = ''));
}
function checkPlayerWon() {

    for (let i = 0; i < 9; i+=3) {
        if (checkRows(i)!=-1){
            return checkRows(i);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (checkColumn(i)!=-1){
            return checkColumn(i);
        }
    }
    if (gameState[0]===gameState[4] && gameState[0]===gameState[8]){
        if (gameState[0]!== ''){
            return gameState[0];
        }

    }
    if (gameState[2]===gameState[4] && gameState[2]===gameState[6]){
        if (gameState[2]!== ''){
            return gameState[2];
        }
    }
    return -1;
}

function checkRows(index) {
    if (gameState[index] === gameState[index+1] && gameState[index]=== gameState[index+2] ) {
        if (gameState[index]!== ''){
            return gameState[index];
        }
    }
    return -1;
}
function checkColumn(index) {
    if (gameState[index] === gameState[index+3] && gameState[index]=== gameState[index+6]) {
        if (gameState[index]!== ''){
            return gameState[index];
        }

    }
    return -1;
}

function checkGameEnd() {
    return gameState.every(function (e) {
        return e !== '';
    });
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
