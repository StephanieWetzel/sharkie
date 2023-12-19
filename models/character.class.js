class Character extends MovableObject {
    x = 100;
    y = 250;
    height = 160;
    width = 150;
    speed = 10;

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];

    IMAGES_SLEEPING = [
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_HURT_PUFFERFISH = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
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

    IMAGES_BUBBLE_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];

    IMAGES_FIN_ATTACK = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    world; // greift auf World Klasse zu
    swimming_sound = new Audio('audio/swimming.mp3');


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_HURT_PUFFERFISH);
        this.loadImages(this.IMAGES_DEAD_PUFFERFISH);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_FIN_ATTACK);
        this.animate();
    }


    animate() {
        let lastTimeStamp = new Date();

        setInterval(() => {
            if (this.rightArrowDownAndNotAtEndOfMap()) {
                this.goRight();
                lastTimeStamp = new Date();
            }

            if (this.leftArrowDownAndNotAtStartOfMap()) {
                this.goLeftAndMirrorImage();
                lastTimeStamp = new Date();
            }

            if (this.upArrowDownAndNotAtTop()) {
                this.goUp();
                lastTimeStamp = new Date();
            }

            if (this.downArrowDownAndNotAtBottom()) {
                this.goDown();
                lastTimeStamp = new Date();
            }
            this.world.camera_x = -this.x + 100; // camera_x entspricht immer dem Wert von dem x unseres Characters, aber das GEGENTEIL (Welt bewegt sich um die gleichen Pixel nach links, wie Character sich nach rechts bewegt)
        }, 1000 / 50); // 60 x pro Sekunde


        setInterval(() => {
            let currentTimeStamp = new Date();
            let secondsPassed = (currentTimeStamp - lastTimeStamp) / 1000;

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_PUFFERFISH);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_PUFFERFISH);
            }
            // ATTACKS
            else if (this.world.keyboard.B) {
                this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
            }
            else if (this.world.keyboard.SPACE) {
                this.playAnimation(this.IMAGES_FIN_ATTACK);
            }
            // transition from IDLE to LONG_IDLE to SLEEPING if no arrow key is pressed
            else if (this.noArrowKeyDown()) {
                this.playAnimation(this.IMAGES_IDLE);
                if (secondsPassed >= 10) {
                    this.transitionToSleeping(secondsPassed);
                }
            }
            else {
                if (this.arrowKeyDown()) {
                    this.playAnimation(this.IMAGES_SWIMMING);
                }
            }
        }, 110);
    }

    // CLEAN CODING
    rightArrowDownAndNotAtEndOfMap() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.map_end_x;
    }


    goRight() {
        this.moveRight();
        this.otherDirection = false; // img not mirrored
        this.swimming_sound.play();
    }


    leftArrowDownAndNotAtStartOfMap() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    goLeftAndMirrorImage() {
        this.moveLeft();
        this.otherDirection = true; // img mirrored
        this.swimming_sound.play();
    }


    upArrowDownAndNotAtTop() {
        return this.world.keyboard.UP && this.y > 0;
    }


    goUp() {
        this.moveUp();
        this.swimming_sound.play();
    }


    downArrowDownAndNotAtBottom() {
        return this.world.keyboard.DOWN && this.y < this.world.level.map_end_y;
    }


    goDown() {
        this.moveDown();
        this.swimming_sound.play();
    }


    arrowKeyDown() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.B;
    }


    noArrowKeyDown() {
        return !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.B);
    }

    transitionToSleeping(secondsPassed) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (secondsPassed >= 11) {
            this.playAnimation(this.IMAGES_SLEEPING);
            if (this.y < 500) {
                this.y++;
            }
        }
    }

}