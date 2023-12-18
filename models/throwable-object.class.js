class Bubble extends MovableObject {
    constructor(x, y) {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }


    // shoot() {
    //     // this.speed = 3;
    //     setInterval(() => {
    //         this.x += 30;
    //     }, 25);

    // }


    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            this.y -= 2;
        }, 25);
        // let bubble = new Bubble(this.character.x + 120, this.character.y + 80); // places bubble in position of character
        // // this.throwableObjects.push(bottle);
        // this.shoot;
    }
}


class PoisonBubble extends MovableObject {
    constructor() {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.height = 50;
        this.width = 50;
        this.applyGravity();
    }
}