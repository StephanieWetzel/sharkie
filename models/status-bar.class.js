class StatusBarBottles extends DrawableObject {
    IMAGES_STATUS_BAR_BOTTLES = [
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
        this.loadImages(this.IMAGES_STATUS_BAR_BOTTLES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_BOTTLES[this.getImageIndex()];
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


class StatusBarHealth extends DrawableObject {
    IMAGES_STATUS_BAR_HEALTH = [
        'img/4. Marcadores/green/Life/0_  copia 3.png', // img 0
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png' // img 5
    ];

    percentage = 100; // status (%) of health bar


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_HEALTH);
        this.x = 40;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_HEALTH[this.getImageIndex()];
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


class StatusBarCoins extends DrawableObject {
    IMAGES_STATUS_BAR_COINS = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png', // img 0
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png' // img 5
    ];

    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_COINS);
        this.x = 40;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_COINS[this.getImageIndex()];
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