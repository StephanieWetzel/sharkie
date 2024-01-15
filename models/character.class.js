class Character extends MovableObject {
    x = 100;
    y = 250;
    height = 160;
    width = 150;
    speed = 10;
    world;
    characterImages;
    isProtected = false;
    protectionDuration = 2000;
    isBubbleShooting = false;
    isPoisonBubbleShooting = false;
    isFinSlapping = false;
    hitByJellyfish = false;
    hitByPufferfish = false;
    killedByJellyfish = false;
    killedByPufferfish = false;
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


    /**
     * Moves the camera smoothly towards a target position based on the 'otherDirection' property.
     */
    moveCameraSmoothly() {
        const targetCameraX = this.otherDirection ? -this.x + 740 : -this.x + 200;
        const smoothness = 0.05;

        this.world.camera_x = this.lerp(this.world.camera_x, targetCameraX, smoothness);
    }


    /**
     * Performs linear interpolation between two values.
     *
     * @param {number} start - The starting value.
     * @param {number} end - The ending value.
     * @param {number} t - The interpolation parameter (usually between 0 and 1).
     */
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }


    /**
     * Controls the animation and behavior of the character.
     */
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
            this.cameraMovement();
        }, 1000 / 50);

        let animation = setInterval(() => {
            let currentTimeStamp = new Date();
            let secondsPassed = (currentTimeStamp - lastTimeStamp) / 1000;
            if (this.isDead() && this.world.damageType == Pufferfish) {
                this.deathByPufferfish(animation);
            } else if (this.isDead()) {
                this.deathByJellyfish(animation);
            } else if (this.isHurt() && !this.isProtected && this.world.damageType == Pufferfish) {
                this.hurtByPufferfish();
                lastTimeStamp = new Date();
            } else if (this.isHurt() && !this.isProtected && this.world.damageType == Jellyfish) {
                this.hurtByJellyfish();
                lastTimeStamp = new Date();
            } else if (this.world.keyboard.B) {
                this.shootBubble();
                lastTimeStamp = new Date();
            } else if (this.world.keyboard.V) {
                this.shootPoisonBubble();
                lastTimeStamp = new Date();
            } else if (this.world.keyboard.SPACE) {
                this.slapFin();
                lastTimeStamp = new Date();
            } else if (this.arrowKeyDown()) {
                this.playAnimation(this.characterImages.IMAGES_SWIMMING);
            } else {
                this.goToSleep(secondsPassed);
            }
        }, 100);
    }


    /**
     * Handles the death of the character caused by a pufferfish.
     * @param {number} animation - The ID of the death animation interval.
     */
    deathByPufferfish(animation) {
        this.killedByPufferfish = true;
        this.world.keyboard = false;
        this.playDeathAnimation(animation);
    }


    /**
    * Handles the death of the character caused by a jellyfish.
    * @param {number} animation - The ID of the death animation interval.
    */
    deathByJellyfish(animation) {
        this.killedByJellyfish = true;
        this.world.keyboard = false;
        this.playDeathAnimation(animation);
    }


    /**
    * Initiates the death animation for the player.
    *
    * @param {AnimationType} animation - The type of animation to play.
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


    /**
     * Initiates the death animation specific to a player killed by a pufferfish.
     *
     * @param {AnimationType} animation - The type of animation to play.
     */
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


    /**
     * Initiates the death animation specific to a player killed by a jellyfish.
     *
     * @param {AnimationType} animation - The type of animation to play.
     */
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


    /**
     * Initiates a floating animation by gradually moving the player character upward until they reach a specific y-coordinate threshold.
     */
    floatUp() {
        let floating = setInterval(() => {
            if (this.y > -60) {
                this.y -= 2;
            } else {
                clearInterval(floating);
            }
        }, 1000 / 60);
    }


    /**
     * Initiates a sinking animation by gradually moving the player character downward until they reach a specific y-coordinate threshold.
     */
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
      * Handles the player character being hurt by a pufferfish.
      */
    hurtByPufferfish() {
        playSound(hit_by_pufferfish);
        this.playAnimation(this.characterImages.IMAGES_HURT_PUFFERFISH);
    }


    /**
     * Handles the player character being hurt by a jellyfish.
     */
    hurtByJellyfish() {
        playSound(hit_by_jellyfish);
        this.playAnimation(this.characterImages.IMAGES_HURT_JELLYFISH);
    }


    /**
     * Initiates the player character shooting a bubble.
     */
    shootBubble() {
        this.isBubbleShooting = true;
        this.activateBubbleAttack();
        this.playAnimation(this.characterImages.IMAGES_BUBBLE_ATTACK);
    }


    /**
     * Activates the bubble attack, simulating the player character pressing the 'B' key to shoot bubbles.
     */
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


    /**
     * Initiates the player character shooting a poison bubble.
     */
    shootPoisonBubble() {
        this.isPoisonBubbleShooting = true;
        this.activatePoisonBubbleAttack();
        this.playAnimation(this.characterImages.IMAGES_POISON_BUBBLE_ATTACK);
    }


    /**
     * Activates the poison bubble attack, simulating the player character pressing the 'V' key to shoot poison bubbles.
     */
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


    /**
     * Initiates the player character slapping with its fin.
     */
    slapFin() {
        this.isFinSlapping = true;
        this.activateFinSlap();
        this.playAnimation(this.characterImages.IMAGES_FIN_ATTACK);
    }


    /**
     * Activates the fin slap, simulating the player character pressing the 'SPACE' key to perform a fin slap.
     */
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


    /**
     * Initiates the transition of the player character to a sleeping state based on the elapsed time.
     * 
     * @param {number} secondsPassed - The elapsed time in seconds since the start of the transition.
     */
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
     * Checks if the right arrow key is pressed and the player character is not at the end of the map.
     */
    rightArrowDownAndNotAtEndOfMap() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.map_end_x;
    }


    /**
     * Initiates the player character movement to the right.
     */
    goRight() {
        this.moveRight();
        this.otherDirection = false;
        playSound(characterSwimming);
    }


    /**
     * Checks if the left arrow key is pressed and the player character is not at the start of the map.
     */
    leftArrowDownAndNotAtStartOfMap() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * Initiates the player character movement to the left and mirrors the character's image.
     */
    goLeftAndMirrorImage() {
        this.moveLeft();
        this.otherDirection = true;
        playSound(characterSwimming);
    }


    /**
     * Checks if the up arrow key is pressed and the player character is not at the top of the allowed y-coordinate range.
     */
    upArrowDownAndNotAtTop() {
        return this.world.keyboard.UP && this.y >= -25;
    }


    /**
     * Initiates the player character movement upward.
     */
    goUp() {
        this.moveUp();
        playSound(characterSwimming);
    }


    /**
     * Checks if the down arrow key is pressed and the player character is not at the bottom of the map.
     */
    downArrowDownAndNotAtBottom() {
        return this.world.keyboard.DOWN && this.y < this.world.level.map_end_y;
    }


    /**
     * Initiates the player character movement downward.
     */
    goDown() {
        this.moveDown();
        playSound(characterSwimming);
    }


    /**
     * Checks if any of the arrow keys (RIGHT, LEFT, UP, or DOWN) are currently pressed.
     */
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