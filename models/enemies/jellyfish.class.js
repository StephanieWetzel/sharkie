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
    verticalMovementInterval;


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


    animate() {
        this.verticalMovementInterval = setInterval(() => {
            // Vertical movement
            if (this.y >= 600) {
                this.direction = -1; // up
            } else if (this.y <= 0) {
                this.direction = 1; // down
            }
            this.y += this.direction * this.speed; // speed
        }, 1000 / 25);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.applyGravity();
                clearInterval(this.verticalMovementInterval);
                setInterval(() => {
                    this.x += 4;
                    this.y -= 3;
                }, 1000 / 25);

            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 130);
    }
}