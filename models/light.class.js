class Light extends MovableObject {
    y = 0;
    width = 5000;
    height = 800;
    direction = -1; // left


    constructor() {
        super();
        this.loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = Math.random() * 500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.x += this.direction * this.speed; // value of x changes depending on direction (1 or -1)
        }, 1000 / 50);

        setInterval(() => {
            this.direction *= -1; // changes direction every 6 seconds
        }, 6000);
    }
}