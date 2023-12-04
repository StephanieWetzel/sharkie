class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 120;
    width = 110;
    imageCache = {}; // JSON benutzt, da somit auf eine Stelle direkt zugegriffen werden kann
    currentImage = 0; // Variable, um aktuelles Bild anzuzeigen bzw. zu verändern
    speed = 0.15;
    otherDirection = false; // sagt aus, ob Bild gespiegelt wird


    // how to use: loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // same as -> this.img = document.getElementById('image') / <img id="image">
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // setzt Bild spiegelverkehrt ins Canvas
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof PufferFish) { // instanceof = only executes function for character and pufferfish
            // Red rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    isColliding(mo) {
        return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
            (this.y + this.height) >= mo.y &&
            (this.y) <= (mo.y + mo.height);
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => { // path ist aktuell nur String, noch kein richtiges Bild
            let img = new Image(); // Bild (Objekt) wird erstellt
            img.src = path; // path (String) wird in das Objekt geladen = ein Bild wurde erstellt
            this.imageCache[path] = img; // imageCache wird mit dem aktuellen Bild aktualisiert; [path] = Schlüssel, mit dem der Wert aufgerufen werden kann -> imageCache['img/image1.png']
        });
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_SWIMMING.length; // modulo = mathematischer Rest => Bsp. 6 % 6 (Länge Array) = 6 : 6 = 1, Rest 0 => modulo hebt nur Rest auf, also ist currentImage wieder 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... => fängt immer wieder von vorn an (character bleibt in Bewegung)
        let path = images[i];
        this.img = this.imageCache[path]; // this.img refers to movableObjects; current img being replaced
        this.currentImage++; // next img
    }
}