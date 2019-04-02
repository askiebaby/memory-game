const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  // 剛剛沒配對成功的話，就把牌蓋起來
  if (lockBoard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this; // this => the clicked card
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  // 如果牌組配對成功 => isMatch
  // 就不可以再點擊那組牌 => disableCards()
  // 配對錯誤就把該牌組蓋起來 => unflipCards()
  let isMatch = firstCard.dataset.framework === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  // 移除監聽事件，釋放記憶體
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  lockBoard = true;

  // 把牌蓋起來
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
  }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard));