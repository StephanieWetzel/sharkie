let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    let startScreen = document.getElementById('startScreen');
    let winScreen = document.getElementById('youWinScreen');
    let gameOverScreen = document.getElementById('gameOverScreen');
    canvas.classList.remove('d-None');
    startScreen.classList.add('d-None');
    winScreen.classList.add('d-None');
    gameOverScreen.classList.add('d-None');
    playSound(bubble_popped);
    playSound(game_music);
    deviceRotated();
}


// function openFullscreen() {
//     let fullscreen = document.getElementById('fullscreen');
//     enterFullscreen(fullscreen);
// }


// function enterFullscreen(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
//         element.msRequestFullscreen();
//     } else if (element.webkitRequestFullscreen) {  // iOS Safari
//         element.webkitRequestFullscreen();
//     }
// }


// function exitFullscreen() {
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     }
// }


function openInfoOverlay() {
    document.getElementById('infoScreen').classList.remove('d-None');
    document.getElementById('canvas').classList.add('d-None');
}


function closeInfoOverlay() {
    document.getElementById('infoScreen').classList.add('d-None');
    document.getElementById('canvas').classList.remove('d-None');
}


function deviceRotated() {
    let rotationOverlay = document.getElementById('rotationOverlay');
    if (rotationOverlay.style.display == 'flex') {
        pauseAllAudio();
    }
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 66) {
        keyboard.B = true;
    }
    if (e.keyCode == 86) {
        keyboard.V = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        // left arrow
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        // right arrow
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
        // up arrow
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
        // down arrow
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
        // down arrow
    }
    if (e.keyCode == 66) {
        keyboard.B = false;
    }
    if (e.keyCode == 86) {
        keyboard.V = false;
    }
});