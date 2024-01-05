class Character extends MovableObject {
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

    IMAGES_HURT_JELLYFISH = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
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

    IMAGES_DEAD_JELLYFISH = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
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

    IMAGES_POISON_BUBBLE_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];

    IMAGES_FIN_ATTACK = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    x = 100;
    y = 250;
    height = 160;
    width = 150;
    speed = 10;
    world;
    dead = false;
    movementInterval;
    animationInterval;
    offsetX = 120;
    // for fin-slap
    isProtected = false;
    protectionDuration = 2000;
    // checking for attacks:
    isBubbleShooting = false;
    isPoisonBubbleShooting = false;
    isFinSlapping = false;
    // for transition to sleeping:
    lastTimeStamp;
    currentTimeStamp;
    secondsPassed;


    constructor() {
        super();
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_HURT_PUFFERFISH);
        this.loadImages(this.IMAGES_HURT_JELLYFISH);
        this.loadImages(this.IMAGES_DEAD_PUFFERFISH);
        this.loadImages(this.IMAGES_DEAD_JELLYFISH);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_POISON_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_FIN_ATTACK);
        this.animateSharkieMovement();
        this.animateSharkieConditions();
        this.checkForGameOver();
    }


    // CAMERA
    moveCameraSmoothly() {
        const targetCameraX = this.otherDirection ? -this.x + 740 : -this.x + 200; // if (?) otherDirection = true then x + 700, else (:) x + 200
        const smoothness = 0.05; // the smaller the number, the smoother the camera movement

        this.world.camera_x = this.lerp(this.world.camera_x, targetCameraX, smoothness); // current cameraX position getting updated
    }

    // lerp = linear interpolation (smooth transition between a start- and endpoint)
    lerp(start, end, t) { // t = value between 0 (start) and 1 (end) that shows progress of interpolation
        return start * (1 - t) + end * t;
    }


    // ANIMATIONS
    animateSharkieMovement() {
        this.lastTimeStamp = new Date(); // used to determine how much time has passed since a key was last pressed (for sleep animation)

        setInterval(() => {
            if (this.rightArrowDownAndNotAtEndOfMap()) {
                this.goRight();
                this.lastTimeStamp = new Date();
            } if (this.leftArrowDownAndNotAtStartOfMap()) {
                this.goLeftAndMirrorImage();
                this.lastTimeStamp = new Date();
            } if (this.upArrowDownAndNotAtTop()) {
                this.goUp();
                this.lastTimeStamp = new Date();
            } if (this.downArrowDownAndNotAtBottom()) {
                this.goDown();
                this.lastTimeStamp = new Date();
            }

            if (this.otherDirection) {
                this.moveCameraSmoothly();
            } else {
                this.moveCameraSmoothly();
            }

            this.moveCameraSmoothly();
        }, 1000 / 50);
    }


    animateSharkieConditions() {
        setInterval(() => {
            this.currentTimeStamp = new Date(); // needed to get the time difference between active- and sleeping-state (for transition to sleeping)
            this.checkForSleeping();
            this.checkForCollisions();
            this.checkForAttacks();
            this.checkForDeath();
        }, 110);
    }


    checkForSleeping() {
        this.secondsPassed = (this.currentTimeStamp - this.lastTimeStamp) / 1000; // time difference between active- and sleeping-state

        if (this.arrowKeyDown()) {
            this.playAnimation(this.IMAGES_SWIMMING);
        } else { // transition from IDLE to LONG_IDLE to SLEEPING if no key is pressed
            this.playAnimation(this.IMAGES_IDLE);
            if (this.secondsPassed >= 10) {
                this.transitionToSleeping();
            }
        }
    }


    checkForCollisions() {
        if (this.isHurt() && !this.isProtected) {
            if (this.world.damageType == Pufferfish) {
                playSound(hit_by_pufferfish);
                this.playAnimation(this.IMAGES_HURT_PUFFERFISH);
                this.lastTimeStamp = new Date();
            }
            if (this.world.damageType == Jellyfish) {
                playSound(hit_by_jellyfish);
                this.playAnimation(this.IMAGES_HURT_JELLYFISH);
                this.lastTimeStamp = new Date();
            }
            console.log(this.health);
        }
    }


    checkForDeath() {
        // setInterval(() => {
        if (this.isDead()) {
            if (!this.dead) {
                if (this.world.damageType == Pufferfish) {
                    this.playAnimation(this.IMAGES_DEAD_PUFFERFISH);
                    this.applyGravity();
                    setInterval(() => {
                        this.y -= 10;
                    }, 1000);
                }
                if (this.world.damageType == Jellyfish) {
                    this.playAnimation(this.IMAGES_DEAD_JELLYFISH);
                    this.applyGravity();
                    setInterval(() => {
                        if (this.y < this.world.level.map_end_y) {
                            this.y += 20;
                        }
                    }, 1000);
                }

                setTimeout(() => {
                    this.dead = true;
                }, 800);
            }
        }
        // }, 110);
    }


    // ATTACKS
    checkForAttacks() {
        if (!this.isBubbleShooting || !this.isPoisonBubbleShooting || !this.isFinSlapping) {
            if (this.world.keyboard.B) {
                this.isBubbleShooting = true;
                this.animateBubbleAttack();
                this.lastTimeStamp = new Date();
            }
            if (this.world.keyboard.V) {
                this.isPoisonBubbleShooting = true;
                this.animatePoisonBubbleAttack();
                this.lastTimeStamp = new Date();
            }
            if (this.world.keyboard.SPACE) {
                this.isFinSlapping = true;
                this.animateFinAttack();
                this.lastTimeStamp = new Date();
            }
        }
    }


    animateBubbleAttack() {
        this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
        playSound(bubble_breath);

        if (this.currentImage == this.IMAGES_BUBBLE_ATTACK.length - 1) {
            this.isBubbleShooting = false;
        }
    }


    animatePoisonBubbleAttack() {
        this.playAnimation(this.IMAGES_POISON_BUBBLE_ATTACK);
        playSound(bubble_breath);

        if (this.currentImage == this.IMAGES_POISON_BUBBLE_ATTACK.length - 1) {
            this.isPoisonBubbleShooting = false;
        }
    }


    animateFinAttack() {
        this.playAnimation(this.IMAGES_FIN_ATTACK);
        playSound(fin_attack);

        if (this.currentImage == this.IMAGES_FIN_ATTACK.length - 1) {
            this.isFinSlapping = false;
        }
    }


    // SLEEPING
    transitionToSleeping() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (this.secondsPassed >= 11) {
            this.playAnimation(this.IMAGES_SLEEPING);
            if (this.y < 500) {
                this.y++;
            }
        }
    }


    // MOVING
    rightArrowDownAndNotAtEndOfMap() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.map_end_x;
    }


    goRight() {
        this.moveRight();
        this.otherDirection = false; // img not mirrored
        playSound(characterSwimming);
    }


    leftArrowDownAndNotAtStartOfMap() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    goLeftAndMirrorImage() {
        this.moveLeft();
        this.otherDirection = true; // img mirrored
        playSound(characterSwimming);
    }


    upArrowDownAndNotAtTop() {
        return this.world.keyboard.UP && this.y >= -25;
    }


    goUp() {
        this.moveUp();
        playSound(characterSwimming);
    }


    downArrowDownAndNotAtBottom() {
        return this.world.keyboard.DOWN && this.y < this.world.level.map_end_y;
    }


    goDown() {
        this.moveDown();
        playSound(characterSwimming);
    }


    arrowKeyDown() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
    }


    // GAME OVER
    checkForGameOver() {
        setInterval(() => {
            if (this.health == 0) {
                setTimeout(() => {
                    clearAllIntervals();
                    let gameOverScreen = document.getElementById('gameOverScreen');
                    gameOverScreen.classList.remove('d-None');
                    playSound(game_over);
                    game_music.pause();
                    game_music.currentTime = 0;
                    endboss_fight.pause();
                    endboss_fight.currentTime = 0;
                }, 1000);
            }
        }, 3000);
    }
}