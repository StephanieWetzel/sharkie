class BackgroundObject extends MovableObject {
    width = 2000;
    height = 700;

    /**
     * Creates a movable background object.
     * @param {string} imagePath - The file path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath); // path as parameter for dynamic background
        this.x = x;
        this.y = 700 - this.height; // height canvas - height object = position y-axis
    }
}