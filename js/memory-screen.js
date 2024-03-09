//Memory
const memoryCards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let memoryCount = 0;

//load all pictures
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.memory-card').forEach(card => {
    const memoryType = card.getAttribute('data-picture');
    const memoryFrontImg = card.querySelector('.front-face');
    const memoryBackImg = card.querySelector('.back-face');

    memoryFrontImg.src = entities[memoryType].img;
    memoryBackImg.src = entities.corn.img; // Assuming every card uses the same back-face image
  });
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.picture === secondCard.dataset.picture;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  memoryCount = memoryCount + 1;
  if (memoryCount == 6) {
    setTimeout(function () {
      solveMarker('2');
      collectPart('wheel');
      showScreen('#dialogueScreen')
      showScene('scene20');
    }, 1000);
  } else {
    resetBoard();
  }


}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  memoryCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

memoryCards.forEach(card => card.addEventListener('click', flipCard));