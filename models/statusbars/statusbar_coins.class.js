class StatusbarCoins extends DrawableObject {
    IMAGES_STATUS_BAR_COINS = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    percentage = 0;


    /**
     * Represents a status bar for coins in the game.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BAR_COINS);
        this.x = 40;
        this.y = 80;
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
        let path = this.IMAGES_STATUS_BAR_COINS[this.getImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Gets the index of the image in the array based on the current percentage value.
     * @returns {number} - The index of the image in the array.
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