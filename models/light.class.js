class Light extends MovableObject {
    y = 0;
    width = 5000;
    height = 800;
    direction = -1; // left


    /**
     * Creates a new instance of the Light class.
     */
    constructor() {
        super();
        this.loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = Math.random() * 500;
        this.animate();
    }


    /**
     * Animates the movement of the light object.
     * The light moves horizontally, changing direction every 6 seconds.
     */
    animate() {
        setInterval(() => {
            this.x += this.direction * this.speed;
        }, 1000 / 50);

        setInterval(() => {
            this.direction *= -1;
        }, 6000);
    }
}