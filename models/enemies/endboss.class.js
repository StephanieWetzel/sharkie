class Endboss extends MovableObject {
    height = 600;
    width = 530;
    y = -500;
    x = 5000;

    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'

    ];

    speed = 10;
    // SPAWNING
    hadFirstContact = false;
    spawnAnimationDone = false;
    spawnCounter = 0;
    // DEATH
    deathAnimationDone = false;
    deathCounter = 0;
    // ATTACK
    lastAttack = 0;
    isAttacking = false;
    secondsPassed;


    /**
     * Creates an instance of Endboss.
     * Initializes the end boss properties, including image loading and animation.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        setTimeout(() => {
            this.animate();
        }, 2000);
    }


    /**
     * Animates the end boss by playing different animations based on its state.
     */
    animate() {
        let i = 0;
        let animation = setInterval(() => {
            if (i < 10 && this.hadFirstContact) {
                if (this.y < 0) {
                    this.y += 100;
                }
                this.playAnimation(this.IMAGES_SPAWNING);
            } else if (this.isDead() && !this.deathAnimationDone) {
                this.animateDeath();
                clearInterval(animation);

                setTimeout(() => {
                    this.winGame();
                }, 3000);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.attackCooldown() && this.spawnAnimationDone && !this.isHurt() && !this.isAttacking) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.followCharacter();
            } else if (this.attackCooldown() && this.spawnAnimationDone) {
                this.animateAttack();
                this.lastAttack = new Date().getTime();
            }
            i++;

            if (world.character.x > 4300 && !this.hadFirstContact && !endbossMusic) {
                i = 0;
                this.intro();
            }
        }, 150);
    }


    /**
     * Handles the introduction of the end boss.
     */
    intro() {
        this.hadFirstContact = true;
        this.spawnAnimationDone = true;
        playSound(endboss_fight);
        endbossMusic = true;
        game_music.pause();
        game_music.currentTime = 0;
    }


    /**
     * Animates the death of the end boss.
     */
    animateDeath() {
        let deathAnimation = setInterval(() => {
            this.deathCounter++;
            this.playAnimation(this.IMAGES_DEAD);
            if (this.deathCounter == this.IMAGES_DEAD.length - 1) {
                clearInterval(deathAnimation);
                this.deathAnimationDone = true;
                world.keyboard = false;
                this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1])
                this.floatUp();
            }
        }, 100);
    }


    /**
    * Floats the end boss up after death.
    */
    floatUp() {
        let floating = setInterval(() => {
            if (this.y > -150) {
                this.y -= 1;
            } else {
                clearInterval(floating);
            }
        }, 1000 / 60);
    }


    /**
     * Follows the character to hunt.
     */
    followCharacter() {
        if (this.x >= world.character.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.x <= world.character.x) {
            this.moveRight();
            this.otherDirection = true;
        }

        if (this.y + 250 >= world.character.y) {
            this.moveUp();
        } else if (this.y - 250 <= world.character.y) {
            this.moveDown();
        }
    }


    /**
     * Checks if the attack cooldown is over.
     */
    attackCooldown() {
        const secondsPassed = (new Date().getTime() - this.lastAttack) / 1000;
        this.secondsPassed = secondsPassed;
        return secondsPassed > 1.5;
    }


    /**
     * Animates the attack of the end boss.
     */
    animateAttack() {
        this.currentImage = 0;
        if (!this.isAttacking) {
            let attackAnimation = setInterval(() => {
                this.attacking = true;
                this.playAnimation(this.IMAGES_ATTACK);
            }, 150)
            setTimeout(() => {
                this.attacking = false;
                clearInterval(attackAnimation)
            }, 600)
        }
    }


    /**
     * Handles the character winning the game.
     */
    winGame() {
        clearAllIntervals();
        let winScreen = document.getElementById('youWinScreen');
        winScreen.classList.remove('d-None');
        playSound(win_game);
        endboss_fight.pause();
        endboss_fight.currentTime = 0;
        endbossMusic = false;
    }
}