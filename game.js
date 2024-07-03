let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));


    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }


    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#1abc9c' : '#e74c3c';


    checkWin();


    checkDraw();


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = `Current Turn: ${currentPlayer}`;
}


function checkWin() {
    for (let combo of winCombinations) {
        const [a, b, c] = combo;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            document.getElementById('winner').textContent = `Player ${currentPlayer} wins!`;
        }
    }
}


function checkDraw() {
    if (!gameState.includes('')) {
        gameActive = false;
        document.getElementById('winner').textContent = "It's a draw!";
    }
}


function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
    document.getElementById('turn').textContent = `Current Turn: ${currentPlayer}`;
    document.getElementById('winner').textContent = '';
}


document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

document.getElementById('restart-btn').addEventListener('click', restartGame);
