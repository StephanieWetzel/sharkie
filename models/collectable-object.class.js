class PoisonBottle extends MovableObject {
    IMAGES_POISON_BOTTLE = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    constructor() {
        super();
        this.loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_BOTTLE);
        this.x = 400 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.height = 60;
        this.width = 50;
        this.animate();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE); // s. movable-objects.js
        }, 150);
    }
}


class Coin extends MovableObject {
    IMAGES_COIN = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor() {
        super();
        this.loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.height = 40;
        this.width = 40;
        this.animate();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN); // s. movable-objects.js
        }, 150);
    }
}