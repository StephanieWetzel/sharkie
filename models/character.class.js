class Character extends MovableObject {
    y = 250;
    height = 180;
    width = 170;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world; // um auf Variablen aus Welt zugreifen zu können -> keyboard


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING); // Bilder werden geladen
        this.animate(); // Character wird mit geladenen Bildern animiert
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMAGES_SWIMMING.length; // modulo = mathematischer Rest => Bsp. 6 % 6 (Länge Array) = 6 : 6 = 1, Rest 0 => modulo hebt nur Rest auf, also ist currentImage wieder 0
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... => fängt immer wieder von vorn an (character bleibt in Bewegung)
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path]; // this.img refers to movableObjects; current img being replaced
                this.currentImage++; // next img
            }

        }, 100);
    }


    moveUp() {

    }
}