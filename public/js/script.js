isPlayerX = true;
let count;

const buttons = document.querySelectorAll(".box");

buttons.forEach(button => {

    function updateButtonStatus() {
        let currentBox = button.firstElementChild;
        currentBox.setAttribute("class", 'player-x');
        console.log(this);
        button.removeEventListener('click', updateButtonStatus);
    }
    button.addEventListener('click', updateButtonStatus);
    // button.document.classList="player-x";

});

// find all buttons *
//
// add event addEventListener() to each button *
//
// add class to button *
//
// disable button *
//
// switch isPlayerX