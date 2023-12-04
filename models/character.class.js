class Character extends MovableObject {
    y = 250;
    height = 180;
    width = 170;
    speed = 10;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_DEAD_PUFFERFISH = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_HURT_PUFFERFISH = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    world; // greift auf World Klasse zu
    swimming_sound = new Audio('audio/swimming.mp3');


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING); // Bilder werden geladen
        this.loadImages(this.IMAGES_HURT_PUFFERFISH);
        this.loadImages(this.IMAGES_DEAD_PUFFERFISH);
        this.animate(); // Character wird mit geladenen Bildern animiert
    }


    animate() {
        // character moves right or left (forward or backward)
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.map_end_x) {
                this.moveRight();
                this.otherDirection = false; // img not mirrored
                this.swimming_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true; // img mirrored
                this.swimming_sound.play();
            }

            if (this.world.keyboard.UP && this.y > 0) {
                this.moveUp();
                this.swimming_sound.play();
            }

            if (this.world.keyboard.DOWN && this.y < this.world.level.map_end_y) {
                this.moveDown();
                this.swimming_sound.play();
            }
            this.world.camera_x = -this.x + 100; // camera_x entspricht immer dem Wert von dem x unseres Characters, aber das GEGENTEIL (Welt bewegt sich um die gleichen Pixel nach links, wie Character sich nach rechts bewegt)
        }, 1000 / 60); // 60 x pro Sekunde

        // swim animation
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_PUFFERFISH);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_PUFFERFISH);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_SWIMMING); // s. movable-objects.js
                }
            }
        }, 50); // alle 50 Millisekunden bzw. 20 x pro Sekunde
    }
}