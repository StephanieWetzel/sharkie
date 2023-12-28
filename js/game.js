let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    let startScreen = document.getElementById('startScreen');
    canvas.classList.remove('d-None');
    startScreen.style.display = 'none';
    // console.log('My character is', world.character);
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