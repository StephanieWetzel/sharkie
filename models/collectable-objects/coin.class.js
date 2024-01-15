class Coin extends MovableObject {
    IMAGES_COIN = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];


    /**
     * Creates an instance of Coin.
     * Initializes the coin properties, including image loading, position, and animation.
     */
    constructor() {
        super();
        this.loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 4000;
        this.y = Math.random() * 650;
        this.height = 40;
        this.width = 40;
        this.animate();
    }


    /**
    * Animates the coin by playing the animation at a regular interval.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 130);
    }
}