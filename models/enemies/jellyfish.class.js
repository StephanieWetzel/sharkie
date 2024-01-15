class Jellyfish extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];

    direction = 1; // 1 for up, -1 for down


    /**
    * Represents a jellyfish in the game.
    */
    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.speed = 1 + Math.random() * 1;
        this.animate();
    }


    /**
   * Initiates the animation of the jellyfish.
   */
    animate() {
        let verticalMovement = setInterval(() => {
            if (this.y >= 600) {
                this.direction = -1;
            } else if (this.y <= 0) {
                this.direction = 1;
            }
            this.y += this.direction * this.speed;
        }, 1000 / 25);

        let animations = setInterval(() => {
            if (this.isDead()) {
                this.animateDeath(animations, verticalMovement);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 130);
    }


    /**
 * Initiates the death animation of the jellyfish.
 * @param {number} animations - The interval for animations.
 * @param {number} verticalMovement - The interval for vertical movement.
 */
    animateDeath(animations, verticalMovement) {
        clearInterval(animations);
        clearInterval(verticalMovement);
        this.playAnimation(this.IMAGES_DEAD);
        let deathAnimation = setInterval(() => {
            if (!world.character.otherDirection) {
                this.x += 5;
                this.y -= 5;
            } else if (world.character.otherDirection) {
                this.x -= 5;
                this.y -= 5;
            }
        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(deathAnimation);
        }, 2500);
    }
}