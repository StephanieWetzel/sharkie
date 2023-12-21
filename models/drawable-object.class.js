class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 120;
    width = 110;
    imageCache = {}; // JSON benutzt, da somit auf eine Stelle direkt zugegriffen werden kann
    currentImage = 0; // Variable, um aktuelles Bild anzuzeigen bzw. zu verändern


    // how to use: loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // same as -> this.img = document.getElementById('image') / <img id="image">
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // setzt Bild spiegelverkehrt ins Canvas
    }


    drawFrameAroundCharacter(ctx) {
        if (this instanceof Character) { // instanceof = only executes function for character
            // Red rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 25, this.y + 70, this.width - 50, this.height - 95);
            ctx.stroke();
        }
    }


    drawFrameAroundEnemies(ctx) {
        if (this instanceof Pufferfish || this instanceof Jellyfish || this instanceof JellyfishDangerous) {
            // Red rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameAroundEndboss(ctx) {
        if (this instanceof Endboss) {
            // Red rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 25, this.y + 190, this.width - 60, this.height - 270);
            ctx.stroke();
        }
    }


    drawFrameAroundBubble(ctx) {
        if (this instanceof Bubble || this instanceof PoisonBubble) {
            // Red rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
}