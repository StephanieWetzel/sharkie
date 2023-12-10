class StatusBarBottles extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png', // img 0
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png' // img 5
    ];

    percentage = 0; // status (%) of health bar


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path]; // current img is replaced, depending on the status of health bar
    }


    getImageIndex() { // gets number between 0 and 5 (index of IMAGES Array)
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}