class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    characterImages;
    camera_x = 0;
    statusbarBottles = new StatusbarBottles();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarEndboss = new StatusbarEndboss();
    percentageBottles = 0;
    percentageCoins = 0;
    collectedBottles = [];
    collectedCoins = [];
    bubbles = [];
    poisonBubbles = [];
    damageType;
    endbossSpawned = false;


    /**
     * Creates a new instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     * @param {Object} characterImages - The images used for the character animations.
     */
    constructor(canvas, keyboard, characterImages) {
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


    /**
     * Throws objects (bubbles, poison bubbles) in the game world based on keyboard input.
     */
    throwObjects() {
        if (this.keyboard.B && this.character.isBubbleShooting) {
            this.throwBubble();
        }
        if (this.keyboard.V && this.character.isPoisonBubbleShooting && this.percentageBottles != 0) {
            this.throwPoisonBubble();
        }
    }


    /**
     * Initiates the process of throwing a bubble.
     */
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


    /**
     * Initiates the process of throwing a poison bubble.
     */
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


    /**
     * Checks for collisions between the character and collectable objects in the game world.
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


    /**
    * Handles the collection of a bottle object.
    * 
    * @param {object} object - The bottle object to be collected.
    */
    collectBottle(object) {
        if (this.collectedBottles.length <= 9) {
            playSound(collectBottles);
            this.collectedBottles.push(object);
            this.percentageBottles += 10;
            this.statusbarBottles.setPercentage(this.percentageBottles);
            this.removeObjectFromCanvas(object);
        };
    }


    /**
     * Handles the collection of a coin object.
     * If the maximum number of collected coins is reached and the character's health is less than 100, the method triggers a life gain event.
     * 
     * @param {object} object - The coin object to be collected.
     */
    collectCoin(object) {
        if (this.collectedCoins.length <= 8) {
            playSound(collectCoins);
            this.collectedCoins.push(object);
            this.percentageCoins += 10;
            this.statusbarCoins.setPercentage(this.percentageCoins);
            this.removeObjectFromCanvas(object);
        }
        else if (this.collectedCoins.length > 8 && this.character.health < 100) {
            this.getLifeBack(object);
        }
    }


    /**
     * Handles the event of gaining a life back.
     * 
     * @param {object} object - The object triggering the life gain event.
     */
    getLifeBack(object) {
        this.removeObjectFromCanvas(object);
        playSound(getLifeBack);
        this.collectedCoins.length = 0;
        this.percentageCoins = 0;
        this.statusbarHealth.setPercentage(100);
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


    /**
     * Checks for collisions between poisonbubbles and enemies, updating the game state accordingly.
     */
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
                        playSound(bubble_popped);
                        this.removePoisonBubbleFromCanvas(poisonBubble);
                        this.statusbarEndboss.setPercentage(enemy.health);
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
     * Handles the situation where an enemy (pufferfish) cannot be harmed by any bubble.
     * @param {Bubble} bubbleType - The bubble that cannot harm the enemy.
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
                        this.character.isProtected = true;
                        enemy.isHit = true;
                        enemy.health = 0;
                        playSound(jellyfish_defeated);
                        enemy.otherDirection = this.character.otherDirection;
                        setTimeout(() => {
                            this.character.isProtected = false;
                        }, this.character.protectionDuration);
                    }
                }
            }
        });
    }


    /**
     * Draws the game elements on the canvas.
     * The drawing order is important for layering.
     * Coordinates are adjusted based on the camera position.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.poisonBubbles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        if (this.endbossSpawned) {
            this.addToMap(this.statusbarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Adds an array of objects to the game map.
     * 
     * @param {object[]} objects - An array of objects to be added to the game map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
    * Adds a movable object to the game map.
    * Checks the direction of the object, flips its image if necessary, draws it on the canvas, and reverts the image back to its original state if flipped.
    *
    * @param {object} mo - The movable object to be added to the game map.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image of a movable object horizontally on the canvas.
     * Saves the current state of the context, including properties such as transformations and styles,
     * shifts the canvas horizontally by the width of the movable object, flips the image horizontally,
     * and adjusts the X-coordinate to ensure the flipped image is drawn at the correct position.
     *
     * @param {object} mo - The movable object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the adjustment made during image flipping to restore the original X-coordinate of a movable object.
     * Uses the saved state of the context to undo the translation and scaling applied during image flipping.
     *
     * @param {object} mo - The movable object whose image adjustment is to be reverted.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}