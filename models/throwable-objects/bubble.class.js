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

        let throwDirection = world.character.otherDirection; // saves sharkie´s initial line of sight when bubble is thrown

        let throwing = setInterval(() => {
            if (!throwDirection) { // line of sight was RIGHT (at time of throwing) -> bubble flies to the right
                this.x += 20;
                this.y -= 2;
            } else if (throwDirection) { // line of sight was LEFT (at time of throwing) -> bubble flies to the left
                // offsetX = -100;
                this.x -= 20;
                this.y += 2;
            }
            // throwDirection makes sure bubbles won´t change direction after they´ve been thrown (if sharkie changes direction)
        }, 25);

        setTimeout(() => {
            clearInterval(throwing);
            world.removeBubbleFromCanvas(this);
        }, 1000);
    }
}