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
    const checkForRotation = setInterval(() => {
        mobileCheck();
    }, 1000 / 60);
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
 * Checks the current device orientation and width to determine if the mobile controls should be displayed.
 * If the conditions are met, the mobile controls are set to be visible; otherwise, they are hidden.
 */
function mobileCheck() {
    if (window.matchMedia('(orientation: landscape) and (max-width: 920px)').matches || window.matchMedia('(max-width: 1024px)').matches) {
        document.getElementById('mobileControls').style = 'display: flex';
    } else {
        document.getElementById('mobileControls').style = 'display: none';
    }
}
