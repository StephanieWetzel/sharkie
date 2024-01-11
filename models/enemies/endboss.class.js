class Endboss extends MovableObject {
    height = 600;
    width = 530;
    y = -50;
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

    hadFirstContact = false;
    health = 100;
    hasDied = false;
    // animationInterval;


    constructor() {
        super();
        this.loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.winGame();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        let i = 0;

        let animation = setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_SPAWNING);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
            i++;

            if (world && world.character.x > 4400 && !this.hadFirstContact && !endbossMusic) {
                i = 0;
                this.hadFirstContact = true;
                playSound(endboss_fight);
                endbossMusic = true;
                game_music.pause();
                game_music.currentTime = 0;
            }

            if (this.hadFirstContact) {
                this.followCharacter();
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                }
            }
            if (this.isDead() && !this.hasDied) {
                this.playAnimation(this.IMAGES_DEAD);
                if (this.y < -100) {
                    this.y -= 4;
                }
                setTimeout(() => {
                    this.hasDied = true;
                    clearInterval(animation);
                }, 600);
            }
        }, 150);
    }


    followCharacter() {
        setInterval(() => {
            // Überprüfe, ob der Charakter in der Nähe ist (z.B., wenn die x-Koordinaten innerhalb eines bestimmten Bereichs liegen)
            // Passe die x-Koordinate des Endbosses an die x-Koordinate des Charakters an
            if (this.x >= world.character.x) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.x <= world.character.x) {
                this.moveRight();
                this.otherDirection = true;
            }

            // Passe die y-Koordinate des Endbosses an die y-Koordinate des Charakters an
            if (this.y >= world.character.y) {
                this.moveUp();
            } else if (this.y <= world.character.y) {
                this.moveDown();
            }
        }, 100); // Ändere die Aktualisierungsrate entsprechend deiner Anforderungen
    }


    winGame() {
        setInterval(() => {
            if (this.health == 0) {
                setTimeout(() => {
                    clearAllIntervals();
                    let winScreen = document.getElementById('youWinScreen');
                    winScreen.classList.remove('d-None');
                    playSound(win_game);
                    endboss_fight.pause();
                    endboss_fight.currentTime = 0;
                    endbossMusic = false;
                }, 1000);
            }
        }, 2000);
    }
}