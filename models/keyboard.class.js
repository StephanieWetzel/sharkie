class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    B = false;
    V = false;


    /**
     * Creates a new instance of the Keyboard class and sets up event listeners for desktop controls.
     */
    constructor() {
        this.handleDesktopControls();
    }


    handleDesktopControls() {
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
            }
            if (e.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            if (e.keyCode == 38) {
                keyboard.UP = false;
            }
            if (e.keyCode == 40) {
                keyboard.DOWN = false;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = false;
            }
            if (e.keyCode == 66) {
                keyboard.B = false;
            }
            if (e.keyCode == 86) {
                keyboard.V = false;
            }
        });
    }


    /**
     * Sets up event listeners for mobile touch controls. (active in world.class.js)
     */
    handleMobileControls() {
        document.getElementById('arrowUp').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('arrowUp').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.UP = false;
        });
        document.getElementById('arrowDown').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.DOWN = true;
        });
        document.getElementById('arrowDown').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.DOWN = false;
        });
        document.getElementById('arrowLeft').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('arrowLeft').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('arrowRight').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('arrowRight').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('spacebar').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('spacebar').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('vKeybind').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.V = true;
        });
        document.getElementById('vKeybind').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.V = false;
        });
        document.getElementById('bKeybind').addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.B = true;
        });
        document.getElementById('bKeybind').addEventListener("touchend", (e) => {
            e.preventDefault();
            this.B = false;
        });
    }
}