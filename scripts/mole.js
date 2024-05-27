   // Initialize game variables
let score = 0;
let molesLeft = 30;
let popupLength = 3000; // Initial time the mole stays up
let hideTimeout;       // Timeout to hide mole
let clickable = false; // To prevent multiple clicks on the same mole

   // Array of background images to cycle through
const backgrounds = ['../assets/images/mole-background1.png', '../assets/images/mole-background2.jpg'];
let currentBackgroundIndex = 0;

  // Function to change or alternate the available background images
function changeBackground() {
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url('${backgrounds[currentBackgroundIndex]}')`;
}

   // Function to pop up a random mole
function popUpRandomMole() {
  // but first check if the game is over
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    return;
  }
 // Get all mole heads
  const moleHeads = document.querySelectorAll('.mole-head');

  if (moleHeads.length === 0) {
    return;
  }

  // Pick a random mole head
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  clickable = true;
// Show the mole head
  moleHead.classList.remove('mole-head--hidden', 'mole-head--whacked');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  // Set a timeout to hide the mole head after a while
  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}
  // Function to hide a mole
function hideMole(mole) {
  clickable = false;
  mole.classList.add('mole-head--hidden');

  // Pop up another mole after a short delay
  setTimeout(popUpRandomMole, 500);
}

// Set up event listeners after the DOM content is load
window.addEventListener('DOMContentLoaded', () => {
  const whackSound = document.getElementById('whack-sound');

  // Start the game by popping up the first mole
  setTimeout(popUpRandomMole, 0);

  // Get all mole heads and set up click event listeners
  const moleHeads = document.querySelectorAll('.mole-head');
  for (let moleHead of moleHeads) {
    moleHead.addEventListener('click', event => {
      if (!clickable) return; // Ignore clicks when not clickable

      score += 1;
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10; // Moles pop up for shorter times as the game progresses

      // Play the whack sound effect
      whackSound.currentTime = 0;
      whackSound.play();

      // Hide the clicked mole head
      clearTimeout(hideTimeout);
      hideMole(event.target);

      event.target.classList.add('mole-head--hidden');

      event.target.classList.add('mole-head--whacked');

      // Set to change background every 5 scores
      if (score % 5 === 0) {
        changeBackground();
      }
    });
  }
});
