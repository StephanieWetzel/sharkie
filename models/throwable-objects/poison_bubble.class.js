class PoisonBubble extends MovableObject {
    constructor() {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.height = 50;
        this.width = 50;
        this.applyGravity();
    }
}