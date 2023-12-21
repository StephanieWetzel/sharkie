class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; // sagt aus, ob Bild gespiegelt wird
    health = 100;
    lastHit = 0;
    speedY = 0;
    acceleration = 1; // sagt, wie schnell Objekt beschleunigt


    constructor() {
        super();
    }


    applyGravity() {
        setInterval(() => {
            if (this.speedY > 0) {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isColliding(mo) {
        if (mo instanceof Endboss) {
            return this.x + this.width >= mo.x + 50 &&
                this.x <= (mo.x + 50) + (mo.width - 125) &&
                this.y + this.height >= mo.y + 225 &&
                this.y <= (mo.y + 225) + (mo.height - 380);
        }

        else if (mo instanceof Jellyfish || mo instanceof JellyfishDangerous || mo instanceof Pufferfish) {
            return this.x + this.width >= mo.x + 25 &&
                this.x <= (mo.x + 25) + (mo.width - 50) &&
                this.y + this.height >= mo.y + 25 &&
                this.y <= (mo.y + 25) + (mo.height - 100);
        }

        else {
            // used these dimensions: this.x + 25, this.y + 70, this.width - 50, this.height - 95 = from draw frame in drawable-object.class.js
            return ((this.x + 25) + (this.width - 50)) >= mo.x &&
                this.x + 25 <= (mo.x + mo.width) &&
                ((this.y + 70) + (this.height - 95)) >= mo.y &&
                (this.y + 70) <= (mo.y + mo.height);
        }

        // mo.onCollisionCourse -> Optional = hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else { // if character still has health left when hit
            this.lastHit = new Date().getTime(); // get moment (time) of hit
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms - shows how much time passed since the last hit by an enemy
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 1; // if the time that´s passed is less than 1 second - function becomes TRUE, else it´s FALSE
    }


    isDead() {
        return this.health == 0;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveUp() {
        this.y -= this.speed;
    }


    moveDown() {
        this.y += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo = mathematischer Rest => Bsp. 6 % 6 (Länge Array) = 6 : 6 = 1, Rest 0 => modulo hebt nur Rest auf, also ist currentImage wieder 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... => fängt immer wieder von vorn an (character bleibt in Bewegung)
        let path = images[i];
        this.img = this.imageCache[path]; // this.img refers to movableObjects; current img being replaced
        this.currentImage++; // next img
    }
}