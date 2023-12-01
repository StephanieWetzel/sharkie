class Character extends MovableObject {
    y = 250;
    height = 180;
    width = 170;
    speed = 10;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world; // greift auf World Klasse zu


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING); // Bilder werden geladen
        this.animate(); // Character wird mit geladenen Bildern animiert
    }


    animate() {
        // character moves right or left (forward or backward)
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false; // img not mirrored
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true; // img mirrored
            }
            this.world.camera_x = -this.x + 100; // camera_x entspricht immer dem Wert von dem x unseres Characters, aber das GEGENTEIL (Welt bewegt sich um die gleichen Pixel nach links, wie Character sich nach rechts bewegt)
        }, 1000 / 60); // 60 x pro Sekunde

        // swim animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_SWIMMING.length; // modulo = mathematischer Rest => Bsp. 6 % 6 (Länge Array) = 6 : 6 = 1, Rest 0 => modulo hebt nur Rest auf, also ist currentImage wieder 0
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... => fängt immer wieder von vorn an (character bleibt in Bewegung)
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path]; // this.img refers to movableObjects; current img being replaced
                this.currentImage++; // next img
            }

        }, 50); // alle 50 Millisekunden bzw. 20 x pro Sekunde
    }


    moveUp() {

    }
}