cards = document.querySelectorAll(".card");

click = 0;

previousCard = null;

// document.addEventListener("click", function(){
//   alert("clicked");
// });

cards.forEach(card => card.addEventListener("click", flip));

function flip() {
  click = click + 1;

  this.classList.toggle("flip");

  toggleImage(this);

  if (click % 2 == 1) {
    previousCard = this;
    return;
  }

  if (isMatch(previousCard, this)) {
    alert("Hurray! You have got matches!");
    return;
  }

  toggleImage(this);
  toggleImage(previousCard);
}


function isMatch(firstCard, secondCard) {
  img1 = firstCard.querySelector(".back").src;
  img2 = secondCard.querySelector(".back").src;

  // LONG VERSION
  // if (img1 == img2) {
    // return true;
  // }
  // return false;

  // SHORT VERSION
  return img1 == img2;
}

function toggleImage(card) {
  card.querySelector(".front").classList.toggle("hide");
  card.querySelector(".back").classList.toggle("show");
}