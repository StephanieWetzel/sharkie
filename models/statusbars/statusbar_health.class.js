class StatusbarHealth extends DrawableObject {
    IMAGES_STATUS_BAR_HEALTH = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    percentage = 100;


    /**
     * Represents a status bar for health in the game.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_HEALTH);
        this.x = 40;
        this.y = 40;
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
     * @returns {number} - The index of the image in the array.
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