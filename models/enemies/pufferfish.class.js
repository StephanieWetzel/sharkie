class Pufferfish extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    IMAGES_TRANSITION = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];

    IMAGES_BUBBLESWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];

    isHit = false;


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
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
            if (this.isDead()) {
                this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png');
                this.applyGravity();
                setInterval(() => {
                    this.x += 5;
                    this.y -= 10;
                }, 15);
            }

            else if (this.isHit) {
                this.playAnimation(this.IMAGES_TRANSITION);

                this.playAnimation(this.IMAGES_BUBBLESWIM);

                setTimeout(() => {
                    this.isHit = false; // Zurücksetzen nach einigen Sekunden
                }, 3000); // Hier kannst du die Dauer der BUBBLESWIM-Animation in Millisekunden einstellen
            }

            else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 130);
    }
}