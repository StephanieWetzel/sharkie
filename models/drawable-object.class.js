class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 120;
    width = 110;
    imageCache = {};
    currentImage = 0;


    /**
    * Loads an image for the drawable object.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image(); // same as -> this.img = document.getElementById('image') / <img id="image">
        this.img.src = path;
    }


    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the drawable object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}