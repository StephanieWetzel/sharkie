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
        this.y = Math.random() * 650;
        this.height = 60;
        this.width = 50;
        this.animate();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE); // s. movable-objects.js
        }, 100);
    }
}