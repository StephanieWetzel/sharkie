class StatusbarEndboss extends DrawableObject {
    IMAGES_STATUS_BAR_HEALTH = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];

    percentage = 100;


    /**
     * Represents a status bar for endboss health in the game.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_HEALTH);
        this.x = 850;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets the percentage value of the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_HEALTH[this.getImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Gets the index of the image in the array based on the current percentage value.
     */
    getImageIndex() {
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