class PoisonBubble extends MovableObject {
    constructor(x, y) {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }


    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            this.y -= 2;
        }, 25);
    }
}