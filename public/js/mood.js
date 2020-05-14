const boxes = document.querySelectorAll('.box');
console.log('on');

for (let i =0; 0 < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener('click', handleClick, { once: true })

}

function handleClick() {
    console.log('click')
}
