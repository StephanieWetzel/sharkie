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


    constructor(canvas, keyboard, characterImages) { //  values from game.js
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.characterImages = characterImages;
        this.draw();
        this.setWorld();
        this.runIntervals();
    }


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


    setWorld() { // sets World in character-class
        this.character.world = this;
    }


    // THROW
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
        this.statusbarBottles.setPercentage(this.percentageBottles);
    }


    // COLLECT
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


    getLifeBack(object) {
        this.removeObjectFromCanvas(object);
        playSound(getLifeBack);
        this.collectedCoins.length = 0; // empties coin-array
        this.percentageCoins = 0;
        this.statusbarHealth.setPercentage(100); // character gets full health
        this.statusbarCoins.setPercentage(0);
    }


    removeObjectFromCanvas(object) {
        let index = this.level.collectableObjects.indexOf(object);
        this.level.collectableObjects.splice(index, 1);
    }


    // COLLISIONS
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
                }
            });
        });
    }


    jellyfishDefeated(bubbleType, enemy) {
        enemy.health = 0;
        playSound(jellyfish_defeated);
        this.removeBubbleFromCanvas(bubbleType);
    }


    cannotBeHarmed(bubbleType, enemy) {
        enemy.isHit = true;
        this.removeBubbleFromCanvas(bubbleType);
        playSound(bubble_popped);
    }


    removeBubbleFromCanvas(bubble) {
        let index = this.bubbles.indexOf(bubble);
        this.bubbles.splice(index, 1);
    }


    removePoisonBubbleFromCanvas(poisonBubble) {
        let index = this.poisonBubbles.indexOf(poisonBubble);
        this.poisonBubbles.splice(index, 1);
    }


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


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // this.canvas = canvas -> wird zu Beginn geleert
        // this.camera_x hat den Wert von der Klasse Character und wird entsprechend dem Character verschoben (s. Klasse Character)
        this.ctx.translate(this.camera_x, 0); // schiebt ctx nach links; 0 bezeht sich darauf, wie weit die y-Achse verschoben werden soll (translate benötigt immer zwei Argumente, also (x, y))

        // draw figures (order matters!! - backgroundObjects first):
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.lights);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.poisonBubbles);

        // statusbar:
        this.ctx.translate(-this.camera_x, 0); // Koordinatensystem wird zurückverschoben (Originalposition)
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarHealth); // StatusBar wird gezeichnet
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0); // Koordinatensystem wird nach vorne geschoben, damit Objekte mit dem Charakter wandern

        this.ctx.translate(-this.camera_x, 0); // -this bewirkt das Gegenteil = schiebt ctx wieder nach rechts; wird benötigt, da Welt ansonsten bei jedem Aufruf von draw() weiter nach links geschoben wird - Programm stürzt ab
        // draw() wird immer wieder aufgerufen / wird benötigt, um die Charaktere gleich zu Beginn (sobald die Seite fertig geladen hat) anzuzeigen
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
        // this.drawFrames(mo);

        if (mo.otherDirection) {
            this.flipImageBack(mo); // ctx wird wieder normal angezeigt (sorgt dafür, dass alle anderen Bilder NICHT spiegelverkehrt gezeichnet werden)
        }
    }


    // drawFrames(mo) {
    //     mo.drawFrameAroundCharacter(this.ctx);
    //     mo.drawFrameAroundEnemies(this.ctx);
    //     mo.drawFrameAroundEndboss(this.ctx);
    //     mo.drawFrameAroundBubble(this.ctx);
    // }


    flipImage(mo) {
        this.ctx.save(); // speichert Eigenschaften von ctx (dass alle Bilder standardmäßig NICHT spiegelverkehrt gezeichnet werden)
        this.ctx.translate(mo.width, 0); // Canvas wird um die Breite des Charakters nach rechts verschoben, da nun rechts oben (und nicht mehr links oben) angefangen wird zu zeichnen -> Canvas wird um die Differenz dieser zwei Punkte verschoben
        this.ctx.scale(-1, 1); // Bild wird horizontal gespiegelt
        mo.x = mo.x * -1; // X-Koordinate wird umgedreht (notwendig, da wir zuvor mit scale -1 das Bild gespiegelt haben)
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); // setzt ctx wieder zurück auf den Stand von save() (s. flipImage())
    }
}