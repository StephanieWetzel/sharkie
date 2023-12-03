class PufferFish extends MovableObject {
    y = 250;
    height = 70;
    width = 60;
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 200 + Math.random() * 500; // starting point: 200px; pufferfish will spawn somewhere between 200 and 700
        this.speed = 0.15 + Math.random() * 0.5; // Pufferfish bewegt sich mit mind. 0.15 Geschwindigkeit; Geschwindigkeit variiert aber bei jedem Fisch
        this.animate();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING); // s. movable-objects.js
        }, 200);
    }

}