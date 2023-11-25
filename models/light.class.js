class Light extends MovableObject {
    y = 0;
    width = 800;
    height = 500;

    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/1.png');

        this.x = Math.random() * 500; // starting point: 200px; pufferfish will spawn somewhere between 200 and 700

    }
}