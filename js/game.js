let canvas;
let world;
let keyboard = new Keyboard();
let characterImages = new CharacterImages();


/**
 * Initializes the game by setting up the game level, creating the world, and displaying the game canvas.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, characterImages);
    canvas.classList.remove('d-None');
    document.getElementById('gameOverlay').classList.remove('d-None');
    document.getElementById('startScreen').classList.add('d-None');
    document.getElementById('youWinScreen').classList.add('d-None');
    document.getElementById('gameOverScreen').classList.add('d-None');
    playSound(bubble_popped);
    playSound(game_music);
}


/**
 * Opens the information overlay by removing the 'd-None' class from the info screen and adding it to the canvas.
 */
function openInfoOverlay() {
    document.getElementById('infoScreen').classList.remove('d-None');
    document.getElementById('canvas').classList.add('d-None');
}


/**
 * Closes the information overlay by adding the 'd-None' class to the info screen and removing it from the canvas.
 */
function closeInfoOverlay() {
    document.getElementById('infoScreen').classList.add('d-None');
    document.getElementById('canvas').classList.remove('d-None');
}


/**
 * Clears all intervals created using the `window.setInterval` method.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Checks the viewport size and touch device status to adjust mobile controls visibility and hover behavior.
 */
function mobileCheck() {
    const mobileControls = document.getElementById('mobileControls');
    const isMobile = window.matchMedia('(max-width: 1368px)').matches;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (isMobile && isTouchDevice) {
        mobileControls.style.display = 'flex';
        mobileControls.style.pointerEvents = 'none';
    } else {
        mobileControls.style.display = 'none';
        mobileControls.style.pointerEvents = 'auto';
    }
}


// Event listeners for changes in viewport size or orientation
window.addEventListener('resize', mobileCheck);
window.addEventListener('orientationchange', mobileCheck);