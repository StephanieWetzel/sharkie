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


    /**
     * Creates an instance of PoisonBottle.
     * Initializes the poison bottle properties, including image loading, position, and animation.
     */
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


    /**
     * Animates the poison bottle by playing the animation at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_BOTTLE);
        }, 100);
    }
}