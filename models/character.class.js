class Character extends MovableObject {
    x = 100;
    y = 250;
    height = 160;
    width = 150;
    speed = 10;
    world;
    characterImages;
    // for fin-slap
    isProtected = false;
    protectionDuration = 2000; // protects character from damage (world.class.js)
    // check for attacks
    isBubbleShooting = false;
    isPoisonBubbleShooting = false;
    isFinSlapping = false;
    // check for collisions
    hitByJellyfish = false;
    hitByPufferfish = false;
    killedByJellyfish = false;
    killedByPufferfish = false;
    // boolean
    animationRunning = false;


    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.characterImages = characterImages;
        this.loadImages(this.characterImages.IMAGES_IDLE);
        this.loadImages(this.characterImages.IMAGES_LONG_IDLE);
        this.loadImages(this.characterImages.IMAGES_SLEEPING);
        this.loadImages(this.characterImages.IMAGES_SWIMMING);
        this.loadImages(this.characterImages.IMAGES_HURT_PUFFERFISH);
        this.loadImages(this.characterImages.IMAGES_HURT_JELLYFISH);
        this.loadImages(this.characterImages.IMAGES_DEAD_PUFFERFISH);
        this.loadImages(this.characterImages.IMAGES_DEAD_JELLYFISH);
        this.loadImages(this.characterImages.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.characterImages.IMAGES_POISON_BUBBLE_ATTACK);
        this.loadImages(this.characterImages.IMAGES_FIN_ATTACK);
        this.animate();
    }


    /**
     * Handles camera movement.
     */
    cameraMovement() {
        if (this.otherDirection) {
            this.moveCameraSmoothly();
        } else {
            this.moveCameraSmoothly();
        }
        this.moveCameraSmoothly();
    }


    moveCameraSmoothly() {
        const targetCameraX = this.otherDirection ? -this.x + 740 : -this.x + 200; // if (?) otherDirection = true then x + 700, else (:) x + 200
        const smoothness = 0.05; // the smaller the number, the smoother the camera movement

        this.world.camera_x = this.lerp(this.world.camera_x, targetCameraX, smoothness); // current cameraX position getting updated
    }


    // lerp = linear interpolation (smooth transition between a start- and endpoint)
    lerp(start, end, t) { // t = value between 0 (start) and 1 (end) that shows progress of interpolation
        return start * (1 - t) + end * t;
    }


    /**
     * Controls the animation and behavior of the character.
     */
    animate() {
        let lastTimeStamp = new Date(); // used to determine how much time has passed since a key was last pressed (for sleep animation)

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
            this.cameraMovement();
        }, 1000 / 50);

        let animation = setInterval(() => {
            let currentTimeStamp = new Date();
            let secondsPassed = (currentTimeStamp - lastTimeStamp) / 1000;
            // DEAD
            if (this.isDead() && this.world.damageType == Pufferfish) {
                this.deathByPufferfish(animation);
            } else if (this.isDead()) {
                this.deathByJellyfish(animation);
                // HURT
            } else if (this.isHurt() && !this.isProtected && this.world.damageType == Pufferfish) {
                this.hurtByPufferfish();
                lastTimeStamp = new Date();
            } else if (this.isHurt() && !this.isProtected && this.world.damageType == Jellyfish) {
                this.hurtByJellyfish();
                lastTimeStamp = new Date();
                // ATTACKS
            } else if (this.world.keyboard.B) {
                this.shootBubble();
                lastTimeStamp = new Date();
            } else if (this.world.keyboard.V) {
                this.shootPoisonBubble();
                lastTimeStamp = new Date();
            } else if (this.world.keyboard.SPACE) {
                this.slapFin();
                lastTimeStamp = new Date();
                // SWIMMING
            } else if (this.arrowKeyDown()) {
                this.playAnimation(this.characterImages.IMAGES_SWIMMING);
            } else {
                this.goToSleep(secondsPassed);
            }
        }, 100);
    }


    /**
     * Handles the death of the character caused by enemies.
     * @param {number} animation - The ID of the death animation interval.
     */
    deathByPufferfish(animation) {
        this.killedByPufferfish = true;
        this.world.keyboard = false;
        this.playDeathAnimation(animation);
    }


    deathByJellyfish(animation) {
        this.killedByJellyfish = true;
        this.world.keyboard = false;
        this.playDeathAnimation(animation);
    }


    /**
     * Plays the death animation based on the cause (pufferfish or jellyfish).
     */
    playDeathAnimation(animation) {
        if (!this.animationRunning) {
            this.animationRunning = true;
            if (this.killedByPufferfish) {
                this.playPufferfishDeathAnimation(animation)
            } else if (this.killedByJellyfish) {
                this.playJellyfishDeathAnimation(animation)
            }

            setTimeout(() => {
                this.gameOver();
            }, 3000);
        }
    }


    playPufferfishDeathAnimation(animation) {
        this.currentImage = 0;
        let deathAnimation = setInterval(() => {
            this.playAnimation(this.characterImages.IMAGES_DEAD_PUFFERFISH);
        }, 100)

        setTimeout(() => {
            this.floatUp();
        }, 600);

        setTimeout(() => {
            clearInterval(animation);
            clearInterval(deathAnimation);
        }, 1200)
    }


    playJellyfishDeathAnimation(animation) {
        this.currentImage = 0;
        let deathAnimation = setInterval(() => {
            this.playAnimation(this.characterImages.IMAGES_DEAD_JELLYFISH);
        }, 100);

        setTimeout(() => {
            this.sinkDown();
        }, 600);

        setTimeout(() => {
            clearInterval(animation);
            clearInterval(deathAnimation);
        }, 1000);
    }


    floatUp() {
        let floating = setInterval(() => {
            if (this.y > -60) {
                this.y -= 2;
            } else {
                clearInterval(floating);
            }
        }, 1000 / 60);
    }


    sinkDown() {
        let sinking = setInterval(() => {
            if (this.y < this.world.level.map_end_y) {
                this.y += 5;
            } else {
                clearInterval(sinking);
            }
        }, 1000 / 60);
    }


    /**
     * Plays the hurt animation for the character depending on the type of enemy.
     */
    hurtByPufferfish() {
        playSound(hit_by_pufferfish);
        this.playAnimation(this.characterImages.IMAGES_HURT_PUFFERFISH);
    }


    hurtByJellyfish() {
        playSound(hit_by_jellyfish);
        this.playAnimation(this.characterImages.IMAGES_HURT_JELLYFISH);
    }



    // BUBBLE-ATTACK
    /**
     * Initiates the animation for attacks depending on the kind of attack.
     */
    shootBubble() {
        this.isBubbleShooting = true;
        this.activateBubbleAttack();
        this.playAnimation(this.characterImages.IMAGES_BUBBLE_ATTACK);
    }


    activateBubbleAttack() {
        if (!this.animationRunning) {
            this.currentImage = 0;
            let bPressed = setInterval(() => {
                this.world.keyboard.B = true;
                this.animationRunning = true;
                playSound(bubble_breath);
            }, 100)

            setTimeout(() => {
                this.world.keyboard.B = false;
                this.animationRunning = false;
                clearInterval(bPressed)
                this.isBubbleShooting = false;
            }, 800)
        }
    }


    // POISON-BUBBLE-ATTACK
    shootPoisonBubble() {
        this.isPoisonBubbleShooting = true;
        this.activatePoisonBubbleAttack();
        this.playAnimation(this.characterImages.IMAGES_POISON_BUBBLE_ATTACK);
    }


    activatePoisonBubbleAttack() {
        if (!this.animationRunning) {
            this.currentImage = 0;
            let vPressed = setInterval(() => {
                this.world.keyboard.V = true;
                this.animationRunning = true;
                playSound(bubble_breath);
            }, 100)

            setTimeout(() => {
                this.world.keyboard.V = false;
                this.animationRunning = false;
                clearInterval(vPressed)
                this.isPoisonBubbleShooting = false;
            }, 800)
        }
    }


    // FIN-SLAP
    slapFin() {
        this.isFinSlapping = true;
        this.activateFinSlap();
        this.playAnimation(this.characterImages.IMAGES_FIN_ATTACK);
    }

    activateFinSlap() {
        if (!this.animationRunning) {
            this.currentImage = 0;
            let spacePressed = setInterval(() => {
                this.world.keyboard.SPACE = true;
                this.animationRunning = true;
                playSound(fin_attack);
            }, 100)

            setTimeout(() => {
                this.world.keyboard.SPACE = false;
                this.animationRunning = false;
                clearInterval(spacePressed)
                this.isFinSlapping = false;
            }, 800)
        }
    }


    /**
     * Plays the sleeping animation when the character is not moving for a certain duration.
     * 
     * @param {number} secondsPassed - The seconds that have passed since the last time a key was pressed.
     */
    goToSleep(secondsPassed) {
        if (!this.isDead()) {
            this.playAnimation(this.characterImages.IMAGES_IDLE);
            if (secondsPassed >= 10) {
                this.transitionToSleeping(secondsPassed);
            }
        }
    }


    // transition from IDLE to LONG_IDLE to SLEEPING if no key is pressed
    transitionToSleeping(secondsPassed) {
        this.playAnimation(this.characterImages.IMAGES_LONG_IDLE);
        if (secondsPassed >= 11) {
            this.playAnimation(this.characterImages.IMAGES_SLEEPING);
            if (this.y < 500) {
                this.y++;
            }
        }
    }


    /**
     * Handle the character's movement based on keyboard input.
     */
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


    /**
     * Ends the game, stops all intervals, and displays the game over screen.
     */
    gameOver() {
        clearAllIntervals();
        let gameOverScreen = document.getElementById('gameOverScreen');
        gameOverScreen.classList.remove('d-None');
        playSound(game_over);
        game_music.pause();
        game_music.currentTime = 0;
        endboss_fight.pause();
        endboss_fight.currentTime = 0;
    }
}