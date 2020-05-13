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

function chooseGameMode() {
    const pvpButton = document.getElementById('pvpButton');
    const pvaiButton = document.getElementById('pvaiButton');

}

function activatePvpMode() {
    board.classList.remove('pvp');
    board.classList.remove('pvai');
    board.classList.add('pvp');
    board.style = 'display: grid';
}

function activatePvaiMode() {
    board.classList.remove('pvp');
    board.classList.remove('pvai');
    board.classList.add('pvai');
    board.style = 'display: grid';
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

    // if ((!board.classList.contains('pvp')) || (!cell.classList.contains('pvai'))) {
    //     cellElements.forEach(cell => {
    //         cell.style = 'cursor: pointer';
    //     })
    // }



    console.log('clicked');
    const cell = e.target;

    // Place mark
    if (board.classList.contains('pvp')) {
        let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        console.log('pvp')

        //player turn
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
        let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

        console.log('pvai');
        console.log(currentClass);

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
        currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        try {
            aiPlaceMark(currentClass);
        } catch (e) {
            console.log(e);
        }

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
        board.style = 'display: none';

    } else {
        // winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        console.log('notDraw')
        board.style = 'display: none';
    }
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