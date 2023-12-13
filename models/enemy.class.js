class PufferFish extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING_PUFFERFISH = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_PUFFERFISH[0]);
        this.loadImages(this.IMAGES_SWIMMING_PUFFERFISH);
        this.x = 500 + Math.random() * 4000; // starting point: 200px; pufferfish will spawn somewhere between 200 and 700
        this.y = Math.random() * 600;
        this.speed = 0.15 + Math.random() * 1; // Pufferfish bewegt sich mit mind. 0.15 Geschwindigkeit; Geschwindigkeit variiert aber bei jedem Fisch
        this.animate();
    }


    animate() { // aktuelles Bild wird immer wieder ausgetauscht, damit character sich bewegt
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING_PUFFERFISH); // s. movable-objects.js
        }, 200);
    }
}


class JellyFishYellow extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING_JELLYFISH_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_JELLYFISH_YELLOW[0]);
        this.loadImages(this.IMAGES_SWIMMING_JELLYFISH_YELLOW);
        this.x = 500 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.speed = 0.15 + Math.random() * 1;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveUp();
            this.moveDown();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING_JELLYFISH_YELLOW); // s. movable-objects.js
        }, 130);
    }
}


class JellyFishDangerousGreen extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING_JELLYFISH_GREEN = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_JELLYFISH_GREEN[0]);
        this.loadImages(this.IMAGES_SWIMMING_JELLYFISH_GREEN);
        this.x = 500 + Math.random() * 4000;
        this.y = Math.random() * 600;
        this.speed = 0.15 + Math.random() * 1;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveUp();
            this.moveDown();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING_JELLYFISH_GREEN); // s. movable-objects.js
        }, 150);
    }
}