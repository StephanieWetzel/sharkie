class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    characterImages;
    camera_x = 0; // moves world along x-axis
    // statusbars
    statusbarBottles = new StatusbarBottles();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    percentageBottles = 0;
    percentageCoins = 0;
    collectedBottles = [];
    collectedCoins = [];
    // throwable objects
    bubbles = [];
    poisonBubbles = [];
    // hurt character
    damageType;


    /**
     * Creates a new instance of the World class.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     * @param {Object} characterImages - The images used for the character animations.
     */
    constructor(canvas, keyboard, characterImages) { //  values from game.js
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.keyboard.handleMobileControls();
        this.characterImages = characterImages;
        this.draw();
        this.setWorld();
        this.runIntervals();
    }


    /**
     * Runs the intervals for various game actions.
     */
    runIntervals() {
        setInterval(() => {
            this.checkForBubbleCollision();
            this.checkForPoisonBubbleCollision();
            this.checkForFinCollision();
            this.collectObjects();
        }, 50);

        setInterval(() => {
            this.checkCollisionsWithEnemies();
        }, 400);

        setInterval(() => {
            this.throwObjects();
        }, 600);
    }


    /**
     * Sets the world reference in the character class.
     */
    setWorld() {
        this.character.world = this;
    }


    // THROW
    /**
     * Throws objects (bubbles, poison bubbles) in the game world based on keyboard input.
     * Checks if the character is currently shooting bubbles and if there are enough poison bottles.
     */
    throwObjects() {
        if (this.keyboard.B && this.character.isBubbleShooting) {
            this.throwBubble();
        }
        if (this.keyboard.V && this.character.isPoisonBubbleShooting && this.percentageBottles != 0) {
            this.throwPoisonBubble();
        }
    }


    throwBubble() {
        let bubble;
        if (this.character.otherDirection) {
            bubble = new Bubble(this.character.x - 10, this.character.y + 80);
        } else if (!this.character.otherDirection) {
            bubble = new Bubble(this.character.x + 120, this.character.y + 80);
        }
        playSound(new_bubble)
        this.bubbles.push(bubble);
    }


    throwPoisonBubble() {
        let poisonBubble;
        if (this.character.otherDirection) {
            poisonBubble = new PoisonBubble(this.character.x - 10, this.character.y + 80);
        } else if (!this.character.otherDirection) {
            poisonBubble = new PoisonBubble(this.character.x + 120, this.character.y + 80);
        }
        playSound(new_bubble)
        this.poisonBubbles.push(poisonBubble);
        this.percentageBottles -= 10;
        this.collectedBottles.splice(-1);
        this.statusbarBottles.setPercentage(this.percentageBottles);
    }


    // COLLECT
    /**
     * Checks for collisions between the character and collectable objects in the game world.
     * If a collision is detected, it triggers the corresponding collection actions for poison bottles and coins.
     */
    collectObjects() {
        this.level.collectableObjects.forEach((object) => {
            if (this.character.isColliding(object)) {
                if (object instanceof PoisonBottle) {
                    this.collectBottle(object);
                }
                if (object instanceof Coin) {
                    this.collectCoin(object);
                }
            }
        });
    }


    collectBottle(object) {
        if (this.collectedBottles.length <= 9) { // character can collect up to 10 bottles
            playSound(collectBottles);
            this.collectedBottles.push(object);
            this.percentageBottles += 10;
            this.statusbarBottles.setPercentage(this.percentageBottles);
            this.removeObjectFromCanvas(object);
        };
    }


    collectCoin(object) {
        if (this.collectedCoins.length <= 8) {
            playSound(collectCoins);
            this.collectedCoins.push(object);
            this.percentageCoins += 10;
            this.statusbarCoins.setPercentage(this.percentageCoins);
            this.removeObjectFromCanvas(object);
        }
        // reward system
        else if (this.collectedCoins.length > 8 && this.character.health < 100) {
            this.getLifeBack(object);
        }
    }


    /**
     * Handles the collection of a specific object (Coin) that triggers a reward, restoring the character's health to full.
     *
     * @param {Coin} object - The Coin object collected to receive the reward.
     */
    getLifeBack(object) {
        this.removeObjectFromCanvas(object);
        playSound(getLifeBack);
        this.collectedCoins.length = 0; // empties coin-array
        this.percentageCoins = 0;
        this.statusbarHealth.setPercentage(100); // character gets full health back
        this.statusbarCoins.setPercentage(0);
    }


    /**
     * Removes a specified object from the game world canvas by updating the list of collectable objects.
     *
     * @param {DrawableObject} object - The object to be removed from the canvas.
     */
    removeObjectFromCanvas(object) {
        let index = this.level.collectableObjects.indexOf(object);
        this.level.collectableObjects.splice(index, 1);
    }


    // COLLISIONS
    /**
     * Checks for collisions between the player character and enemies, updating the game state accordingly.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    this.damageType = Pufferfish;
                    this.character.hit(50);
                }
                if (enemy instanceof JellyfishDangerous) {
                    this.damageType = Jellyfish;
                    this.character.hit(30);
                }
                if (enemy instanceof Jellyfish) {
                    this.damageType = Jellyfish;
                    this.character.hit(10);
                }
                if (enemy instanceof Pufferfish) {
                    this.damageType = Pufferfish;
                    this.character.hit(10);
                    enemy.isHit = true;
                }
                this.statusbarHealth.setPercentage(this.character.health);
            }
        });
    }


    /**
     * Checks for collisions between bubbles and enemies, updating the game state accordingly.
     */
    checkForBubbleCollision() {
        this.bubbles.forEach((bubble) => {
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Jellyfish || enemy instanceof JellyfishDangerous) {
                        this.jellyfishDefeated(bubble, enemy);
                    }
                    if (enemy instanceof Pufferfish) {
                        this.cannotBeHarmed(bubble, enemy);
                    }
                    if (enemy instanceof Endboss) {
                        this.removeBubbleFromCanvas(bubble);
                        playSound(bubble_popped);
                    }
                    clearInterval(this.throwing);
                }
            });
        });
    }


    checkForPoisonBubbleCollision() {
        this.poisonBubbles.forEach((poisonBubble) => {
            this.level.enemies.forEach((enemy) => {
                if (poisonBubble.isColliding(enemy)) {
                    if (enemy instanceof Jellyfish || enemy instanceof JellyfishDangerous) {
                        this.jellyfishDefeated(poisonBubble, enemy);
                        this.removePoisonBubbleFromCanvas(poisonBubble);
                    }
                    if (enemy instanceof Pufferfish) {
                        this.cannotBeHarmed(poisonBubble, enemy);
                        this.removePoisonBubbleFromCanvas(poisonBubble);
                    }
                    if (enemy instanceof Endboss) {
                        enemy.hit(20);
                        console.log(enemy.health);
                        playSound(bubble_popped);
                        this.removePoisonBubbleFromCanvas(poisonBubble);
                    }
                    clearInterval(this.throwing);
                }
            });
        });
    }


    /**
     * Handles the defeat of an enemy (jellyfish) by a regular bubble.
     * @param {Bubble} bubbleType - The regular bubble causing the defeat.
     * @param {Enemy} enemy - The enemy (jellyfish) being defeated.
     */
    jellyfishDefeated(bubbleType, enemy) {
        enemy.health = 0;
        playSound(jellyfish_defeated);
        this.removeBubbleFromCanvas(bubbleType);
    }


    /**
     * Handles the situation where an enemy cannot be harmed by a regular bubble.
     * @param {Bubble} bubbleType - The regular bubble that cannot harm the enemy.
     * @param {Enemy} enemy - The enemy that cannot be harmed.
     */
    cannotBeHarmed(bubbleType, enemy) {
        enemy.isHit = true;
        this.removeBubbleFromCanvas(bubbleType);
        playSound(bubble_popped);
    }


    /**
     * Removes a regular bubble from the canvas.
     * @param {Bubble} bubble - The regular bubble to be removed.
     */
    removeBubbleFromCanvas(bubble) {
        let index = this.bubbles.indexOf(bubble);
        this.bubbles.splice(index, 1);
    }


    /**
     * Removes a poison bubble from the canvas.
     * @param {PoisonBubble} poisonBubble - The poison bubble to be removed.
     */
    removePoisonBubbleFromCanvas(poisonBubble) {
        let index = this.poisonBubbles.indexOf(poisonBubble);
        this.poisonBubbles.splice(index, 1);
    }


    /**
     * Checks for collisions between the character's fin slap and Pufferfish enemies.
     * Activates protection and defeats Pufferfish if a collision is detected.
     */
    checkForFinCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.keyboard.SPACE && this.character.isFinSlapping) {
                if (enemy instanceof Pufferfish) {
                    if (!this.character.isProtected) {
                        this.character.isProtected = true; // protection activated
                        enemy.isHit = true;
                        enemy.health = 0;
                        playSound(jellyfish_defeated);
                        enemy.otherDirection = this.character.otherDirection; // makes pufferfish fly in character´s direction of view
                        setTimeout(() => {
                            this.character.isProtected = false; // protection deactivated after 2 seconds
                        }, this.character.protectionDuration);
                    }
                }
            }
        });
    }


    /**
     * Draws the game elements on the canvas, including background objects, lights, character, enemies,
     * collectable objects, bubbles, poison bubbles, and status bars.
     * The drawing order is important for layering.
     * Coordinates are adjusted based on the camera position.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears canvas to prepare for next frame
        this.ctx.translate(this.camera_x, 0); // translate = shift; shifts canvas horizontally to make it seem like the camera follows the character
        // draw figures - order matters!! -> backgroundObjects first
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.poisonBubbles);
        // statusbars
        this.ctx.translate(-this.camera_x, 0); // Shifts canvas back to original position after drawing the game elements that move with the camera.
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0); // Shifts canvas forward to align it with the moved game elements.
        this.ctx.translate(-this.camera_x, 0); // Shifts canvas back to original position to prevent the world from continuously shifting to the left.
        // Requests the next animation frame and repeatedly calls the draw function, ensuring that the game continuously updates and renders frames:
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) { // mo = movableObject
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save(); // Saves the current state of the context, including properties such as transformations and styles. Ensures that only the specific image is flipped and not the entire canvas.
        this.ctx.translate(mo.width, 0); // Shifts canvas horizontally by the width of the movable object (mo). Necessary to ensure that the image is flipped around its right edge.
        this.ctx.scale(-1, 1); // Flips image horizontally.
        mo.x = mo.x * -1; // Adjusting the X-coordinate ensures that the flipped image is drawn at the correct position (flipped back).
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1; // Necessary to revert the previous adjustment made when flipping the image. It ensures that the original X-coordinate is restored.
        this.ctx.restore(); // It undoes the translation and scaling applied to flip the image, restoring the canvas context to the state it had when save was called.
    }
}