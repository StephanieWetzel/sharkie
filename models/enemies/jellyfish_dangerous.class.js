class JellyfishDangerous extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];

    direction = 1; // 1 for up, -1 for down


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.speed = 0.15 + Math.random() * 1;
        this.animate();
    }


    animate() {
        let verticalMovement = setInterval(() => {
            if (this.y >= 600) {
                this.direction = -1; // up
            } else if (this.y <= 0) {
                this.direction = 1; // down
            }
            this.y += this.direction * this.speed; // speed
        }, 1000 / 25);

        let animations = setInterval(() => {
            if (this.isDead()) {
                this.animateDeath(animations, verticalMovement);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 130);
    }


    animateDeath(animations, verticalMovement) {
        clearInterval(animations);
        clearInterval(verticalMovement);
        this.playAnimation(this.IMAGES_DEAD);
        let deathAnimation = setInterval(() => {
            this.x += 5;
            this.y -= 5;
        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(deathAnimation);
        }, 2500);
    }
}