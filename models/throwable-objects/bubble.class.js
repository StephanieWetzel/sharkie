class Bubble extends MovableObject {
    /**
     * Creates a bubble object.
     * @param {number} x - The initial x-coordinate of the bubble.
     * @param {number} y - The initial y-coordinate of the bubble.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }


    /**
     * Throws the bubble in the direction based on the player's line of sight.
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
            world.removeBubbleFromCanvas(this);
        }, 1000);
    }
}