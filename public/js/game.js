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
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    // Place mark
    if (board.classList.contains('pvp')) {
        placeMark(cell, currentClass);
        // Check for win
        if (checkWin(currentClass)) {
            console.log('winner');
            endGame(false);

            // Check for Draw
        } else if (isDraw()) {
            endGame(true);

        } else {
            // Switch Turns
            swapTurns();
            setBoardHoverClass();
        }
    } else if (board.classList.contains('pvai')) {
        // player turn
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            console.log('winner');
            endGame(false);

            // Check for Draw
        } else if (isDraw()) {
            endGame(true);

        } else {
            // Switch Turns
            swapTurns();
            setBoardHoverClass();
        }

        // ai turn
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        let aiCellToMark = aiPlaceMark();
        placeMark(aiCellToMark, currentClass);

        if (checkWin(currentClass)) {
            console.log('winner');
            endGame(false);

            // Check for Draw
        } else if (isDraw()) {
            endGame(true);

        } else {
            // Switch Turns
            swapTurns();
            setBoardHoverClass();
        }
    }
}


// function handleClick(e) {
//     console.log('clicked');
//     const cell = e.target;
//     const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

//     // Place mark
//     placeMark(cell, currentClass);

//     // Check for win
//     if (checkWin(currentClass)) {
//         console.log('winner');
//         endGame(false);

//         // Check for Draw
//     } else if (isDraw()) {
//         endGame(true);

//     } else {
//         // Switch Turns
//         swapTurns();
//         setBoardHoverClass();
//     }
// }

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw) {
    console.log('endGame');

    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
        console.log('Draw')
    } else {
        // winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        console.log('notDraw')
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function aiPlaceMark() {
    let arrayWithCell = [];
    // while (arrayWithCell.length === 0) {
    //     const indexOfCell = Math.floor(Math.random() * (8 - 0)) + 0;
    //     if (!cellElements[indexOfCell].classList.contains('x') || !cellElements[indexOfCell].classList.contains('circle')) {
    //         arrayWithCell.push(cell);
    //         return cell;
    //     }
    //     console.log('looping');
        // for (cellElements.forEach(cell => {
        //     if (cell.classList.)
        // }))
    // }
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