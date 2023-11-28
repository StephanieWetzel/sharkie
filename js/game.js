let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        // left arrow
    }
    else if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        // right arrow
    }
    else if (e.keyCode == 38) {
        keyboard.UP = true;
        // up arrow
    }
    else if (e.keyCode == 40) {
        keyboard.DOWN = true;
        // down arrow
    }
    else if (e.keyCode == 32) {
        keyboard.SPACE = true;
        // down arrow
    }
})


window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        // left arrow
    }
    else if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        // right arrow
    }
    else if (e.keyCode == 38) {
        keyboard.UP = false;
        // up arrow
    }
    else if (e.keyCode == 40) {
        keyboard.DOWN = false;
        // down arrow
    }
    else if (e.keyCode == 32) {
        keyboard.SPACE = false;
        // down arrow
    }
})