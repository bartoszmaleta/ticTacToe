const cellElements = document.querySelectorAll('[data-cell');

cellElements.forEach(cell => {
    cell.addEventListener('click', hadnleClick, { once: true})
});

function handleClick(e) {
    console.log('clicked');
    // Place mark
    // Check for win
    // Check for Draw
    // Switch Turns
}