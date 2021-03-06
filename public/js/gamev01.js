const playerX = 'Player-x';
const playerO = 'Player-o';
let currentPlayer = playerX;
const buttons = document.querySelectorAll(".box");
const winningOptions = [
    ['top-left', 'top-center', 'top-right'],
    ['mid-left', 'mid-center', 'mid-right'],
    ['bottom-left', 'bottom-center', 'bottom-right'],
    ['top-left', 'mid-left', 'bottom-left'],
    ['top-center', 'mid-center', 'bottom-center'],
    ['top-right', 'mid-right', 'bottom-right'],
    ['top-right', 'mid-center', 'bottom-left'],
    ['top-left', 'mid-center', 'bottom-right']
];

function switchPlayers() {
    if (currentPlayer === playerX) {
        currentPlayer = playerO;
        return currentPlayer;
    } else {
        currentPlayer = playerX;
        return currentPlayer;
    }
}

function displayWinner() {
    alert('Winner is: ' + currentPlayer)
}

function markBox() {
    const gridGame = document.querySelector('.mainCont');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.firstElementChild.className === '') {
            function updateButtonStatus() {
                let currentBox = button.firstElementChild;
                let currentSymbol = switchPlayers();
                currentBox.setAttribute("class", currentSymbol);
                if (checkWin(currentSymbol)) {
                    setTimeout(function (){
                        gridGame.style.visibility='hidden';
                    },400);
                    let winner = 'Winner is ' + currentSymbol;
                    setTimeout(function (){
                        displayWinner();
                    },500);
                }
                button.removeEventListener('click', updateButtonStatus);
            }
            button.addEventListener('click', updateButtonStatus);
        }
    };
}

markBox();

function checkWin(currentClass) {
    return winningOptions.some(id => {
        let first = document.getElementById(id[0]).firstElementChild.className === currentClass;
        let second = document.getElementById(id[1]).firstElementChild.className === currentClass;
        let third = document.getElementById(id[2]).firstElementChild.className === currentClass;

        return first && second && third;
    })
}

// TODO: find all buttons *
//
// TODO: add event addEventListener() to each button *
//
// TODO: add class to button *
//
// TODO: disable button *
//
// TODO: switch isPlayerX *