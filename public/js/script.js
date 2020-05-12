const playerX = 'player-x';
const playerO = 'player-o';

let currentPlayer = playerX;

function switchPlayers() {
    if (currentPlayer === playerX) {
        currentPlayer = playerO;
        return currentPlayer;
    } else {
        currentPlayer = playerX;
        return currentPlayer;
    }
}

const buttons = document.querySelectorAll(".box");

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    if (button.firstElementChild.className === '') {
        function updateButtonStatus() {
            let currentBox = button.firstElementChild;
            currentBox.setAttribute("class", switchPlayers());
            console.log(this.firstElementChild.className);

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