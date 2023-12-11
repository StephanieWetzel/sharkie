class Light extends MovableObject {
    y = 0;
    width = 3000;
    height = 800;

    constructor() {
        super();
        this.loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = Math.random() * 500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}