class ThrowableObject extends MovableObject {
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


    constructor(x, y) {
        super();
        this.loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_BOTTLE);
        // this.playAnimation(this.IMAGES_POISON_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.shoot();
    }


    shoot() {
        // this.speed = 3;
        setInterval(() => {
            this.x += 30;
        }, 25);

    }
}