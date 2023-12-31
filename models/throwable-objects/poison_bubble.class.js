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

        const throwDirection = world.character.otherDirection; // saves sharkie´s initial line of sight when bubble is thrown

        setInterval(() => {
            if (!throwDirection) { // line of sight was RIGHT (at time of throwing) -> bubble flies to the right
                this.x += 20;
                this.y -= 2;
            } else if (throwDirection) { // line of sight was LEFT (at time of throwing) -> bubble flies to the left
                this.x -= 20;
                this.y += 2;
            }
            // throwDirection makes sure bubbles won´t change direction after they´ve been thrown (if sharkie changes direction)
        }, 25);
    }
}