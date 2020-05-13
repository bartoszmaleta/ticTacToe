const playerX = 'player-x';
const playerO = 'player-o';

let currentPlayer = playerX;
const buttons = document.querySelectorAll(".box");

const winningOptions = [
    ['top-left','top-center','top-right'],
    ['mid-left','mid-center','mid-right'],
    ['bottom-left', 'bottom-center','bottom-right'],
    ['top-left', 'mid-left','bottom-left'],
    ['top-center', 'mid-center','bottom-center'],
    ['top-right','mid-right', 'bottom-right'],
    ['top-right', 'mid-center', 'bottom-left'],
    ['top-left', 'mid-center', 'bottom-right']];

let playerClicks = [];

let computerClicks = [];

function switchPlayers() {
    if (currentPlayer === playerX) {
        currentPlayer = playerO;
        return currentPlayer;
    } else {
        currentPlayer = playerX;
        return currentPlayer;
    }
}

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    if (button.firstElementChild.className === '') {
        function updateButtonStatus() {
            let currentBox = button.firstElementChild;
            currentBox.setAttribute("class", switchPlayers());
            console.log(this.firstElementChild.className);
            console.log(this.getAttribute('id'));
            console.log(switchPlayers());
            if(switchPlayers() === playerO){
                playerClicks.push(this.getAttribute('id'));
            }
            else {
                computerClicks.push(this.getAttribute('id'));
            }
            button.removeEventListener('click', updateButtonStatus);
        }

        button.addEventListener('click', updateButtonStatus);
        // button.document.classList="player-x";
    }
};

// TODO: find all buttons *
//
// TODO: add event addEventListener() to each button *
//
// TODO: add class to button *
//
// TODO: disable button *
//
// TODO: switch isPlayerX *