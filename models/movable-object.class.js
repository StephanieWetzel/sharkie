class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 120;
    width = 110;

    // how to use: loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // same as -> this.img = document.getElementById('image') / <img id="image">
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}