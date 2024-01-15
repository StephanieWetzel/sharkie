class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    health = 100;
    lastHit = 0;
    speedY = 0;
    acceleration = 1;
    currentImage = 0;


    /**
     * Creates a new instance of the MovableObject class.
     */
    constructor() {
        super();
    }


    /**
     * Applies gravity to the movable object, causing it to fall.
     */
    applyGravity() {
        setInterval(() => {
            if (this.speedY > 0) {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the movable object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     */
    isColliding(mo) {
        if (mo instanceof Endboss) {
            return this.x + this.width >= mo.x + 50 &&
                this.x <= (mo.x + 50) + (mo.width - 125) &&
                this.y + this.height >= mo.y + 225 &&
                this.y <= (mo.y + 225) + (mo.height - 380);
        }

        else if (mo instanceof Jellyfish || mo instanceof JellyfishDangerous || mo instanceof Pufferfish) {
            return this.x + this.width >= mo.x + 25 &&
                this.x <= (mo.x + 25) + (mo.width - 50) &&
                this.y + this.height >= mo.y + 20 &&
                this.y <= (mo.y + 25) + (mo.height - 75);
        }

        else {
            return (this.x + 25) + (this.width - 50) >= mo.x &&
                this.x + 25 <= mo.x + mo.width &&
                (this.y + 70) + (this.height - 95) >= mo.y &&
                this.y + 70 <= mo.y + mo.height;
        }
    }


    /**
     * Inflicts damage on the movable object.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the movable object is currently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
    * Checks if the movable object is dead.
    */
    isDead() {
        return this.health == 0;
    }


    /**
     * Moves the movable object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Moves the movable object upward.
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * Moves the movable object downward.
     */
    moveDown() {
        this.y += this.speed;
    }


    /**
     * Plays an animation by updating the character's image based on a sequence of images.
     * The animation cycles through the provided array of image paths in a loop by using the modulo operation.
     * i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ...
     * 
     * @param {string[]} images - An array of image paths representing the frames of the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}