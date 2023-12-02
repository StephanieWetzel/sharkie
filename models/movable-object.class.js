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
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // 60 FPS
        // 0,15px werden 60 mal pro Sekunde abgezogen
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_SWIMMING.length; // modulo = mathematischer Rest => Bsp. 6 % 6 (Länge Array) = 6 : 6 = 1, Rest 0 => modulo hebt nur Rest auf, also ist currentImage wieder 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... => fängt immer wieder von vorn an (character bleibt in Bewegung)
        let path = images[i];
        this.img = this.imageCache[path]; // this.img refers to movableObjects; current img being replaced
        this.currentImage++; // next img
    }
}