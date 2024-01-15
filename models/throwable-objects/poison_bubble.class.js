class PoisonBubble extends MovableObject {
    /**
     * Creates a poisoned bubble object.
     * @param {number} x - The initial x-coordinate of the poisoned bubble.
     * @param {number} y - The initial y-coordinate of the poisoned bubble.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }


    /**
    * Throws the poisoned bubble in the direction based on the player's line of sight.
    */
    throw() {
        this.speedY = 10;
        this.applyGravity();

        let throwDirection = world.character.otherDirection;

        let throwing = setInterval(() => {
            if (!throwDirection) {
                this.x += 20;
                this.y -= 2;
            } else if (throwDirection) {
                this.x -= 20;
                this.y += 2;
            }
        }, 25);

        setTimeout(() => {
            clearInterval(throwing);
            world.removePoisonBubbleFromCanvas(this);
        }, 1000);
    }
}