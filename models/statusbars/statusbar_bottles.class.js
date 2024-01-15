class StatusbarBottles extends DrawableObject {
    IMAGES_STATUS_BAR_BOTTLES = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    percentage = 0;


    /**
     * Represents a status bar for bottles in the game.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_BOTTLES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Sets the percentage value of the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_BOTTLES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
    * Gets the index of the image in the array based on the current percentage value.
    */
    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}