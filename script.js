const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Game initialization
cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'activeX' : 'activeO';
    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {
        statusMessage.textContent = `${isXTurn ? 'Player X' : 'Player O'} Wins!`;
        endGame();
    } else if (isDraw()) {
        statusMessage.textContent = "Draw!";
    } else {
        isXTurn = !isXTurn;
        statusMessage.textContent = `${isXTurn ? 'Player X' : 'Player O'}'s turn`;
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combo => 
        combo.every(index => cells[index].classList.contains(currentClass))
    );
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains('activeX') || cell.classList.contains('activeO'));
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
    isXTurn = true;
    statusMessage.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.classList.remove('activeX', 'activeO');
        cell.addEventListener('click', handleClick, { once: true });
    });
}
