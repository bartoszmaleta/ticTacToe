const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');

let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

// function changeToCross3() {
//     alert('qweqwe');
//     let cells = document.querySelectorAll('.cell');
//     cells.forEach(cell => {
//         if (cell.classList.contains('x')) {
//             console.log(cell);
//             cell.style = 'background-image: url(../resources/icon/cross/cross3.svg)';        
//         }
//     });
// }

function activatePvpMode() {
    board.classList.remove('pvp');
    board.classList.remove('pvai');
    board.classList.add('pvp');
    board.style = 'display: grid';
    document.getElementById('pvpButton').style = 'display: none';
    document.getElementById('pvaiButton').style = 'display: none';
}

function activatePvaiMode() {
    board.classList.remove('pvp');
    board.classList.remove('pvai');
    board.classList.add('pvai');
    board.style = 'display: grid';
    document.getElementById('pvpButton').style = 'display: none';
    document.getElementById('pvaiButton').style = 'display: none';
}

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        // NEED FOR NEXT ROUNDS
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);

        // NEED FOR FIRST ROUND AND NEXT ROUNDS
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();

    // NEED FOR NEXT ROUNDS
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {

    console.log('clicked');
    const cell = e.target;

    if (board.classList.contains('pvp')) {
        let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        console.log('pvp')

        placeMark(cell, currentClass);

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    } else if (board.classList.contains('pvai')) {
        let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

        placeMark(cell, currentClass);
        
        if (checkWin(currentClass)) {
            endGame(false);

        } else if (isDraw()) {
            endGame(true);

        } else {
            swapTurns();
            setBoardHoverClass();
        }

        currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        try {
            aiPlaceMark(currentClass);
        } catch (e) {
            console.log(e);
        }

        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);

        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    board.style = 'display: none';
    document.getElementById('pvaiButton').style = 'display: inline-block';
    document.getElementById('pvpButton').style = 'display: inline-block';
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function aiPlaceMark(currentClass) {
    let arrayWithEmptyCells = [];
    cellElements.forEach(cell => {
        if ((!cell.classList.contains('x')) && (!cell.classList.contains('circle'))) {
            arrayWithEmptyCells.push(cell);
        }
    })

    let randomCell = arrayWithEmptyCells[Math.floor(Math.random() * arrayWithEmptyCells.length)];
    randomCell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}