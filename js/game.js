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
    }
    else if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    else if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    else if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    else if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    else if (e.keyCode == 66) {
        keyboard.B = true;
    }
    else if (e.keyCode == 86) {
        keyboard.V = true;
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
    else if (e.keyCode == 66) {
        keyboard.B = false;
    }
    else if (e.keyCode == 86) {
        keyboard.V = false;
    }

})