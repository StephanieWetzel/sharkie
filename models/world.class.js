class World {
    character = new Character();
    level = level1; // damit können wir auf die Variablen aus level1 zugreifen (enemies, lights und backgroundobjects)
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // damit können wir die Welt auf der X-Achse verschieben
    // statusbars:
    statusbarBottles = new StatusbarBottles();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    // collect:
    percentageBottles = 0;
    percentageCoins = 0;
    collectedBottles = [];
    collectedCoins = [];
    // throw:
    bubbles = [];
    // duration of animations:
    // lastTimeStamp = new Date();
    // currentTimeStamp = new Date();
    // secondsPassed = (this.currentTimeStamp - this.lastTimeStamp) / 1000;


    constructor(canvas, keyboard) { // Variable aus game.js wird übergeben
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Wert von canvas aus der game.js wird an das World-canvas übergeben (this.canvas bezieht sich auf Variable, die oben definiert ist)
        this.keyboard = keyboard; // keyboard aus dieser Klasse bekommt den Wert von keyboard aus game.js übergeben
        this.draw();
        this.setWorld();
        this.runIntervals();
    }


    runIntervals() {
        setInterval(() => {
            this.checkForBubbleCollision();
            this.checkForFinCollision();
            this.collectObjects();
        }, 50);

        setInterval(() => {
            this.checkCollisions();
        }, 200);

        setInterval(() => {
            this.throwObjects();
        }, 600);
    }


    // THROW
    throwObjects() {
        if (this.keyboard.B) {
            let bubble = new Bubble(this.character.x + 120, this.character.y + 80);
            this.bubbles.push(bubble);
        }
    }


    async checkForBubbleCollision() {
        this.bubbles.forEach((bubble) => {
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Jellyfish || enemy instanceof JellyfishDangerous) {
                        this.jellyfishDefeated(bubble, enemy);
                    }
                    if (enemy instanceof Pufferfish) {
                        this.cannotBeHarmed(bubble, enemy);
                    }
                }
            });
        });
    }


    jellyfishDefeated(bubble, enemy) {
        enemy.health = 0;
        jellyfish_defeated.play();
        this.removeBubbleFromCanvas(bubble);
    }


    cannotBeHarmed(bubble, enemy) {
        enemy.playAnimation(enemy.IMAGES_TRANSITION);
        enemy.playAnimation(enemy.IMAGES_BUBBLESWIM);
        this.removeBubbleFromCanvas(bubble);
    }


    removeBubbleFromCanvas(bubble) {
        let index = this.bubbles.indexOf(bubble);
        this.bubbles.splice(index, 1);
    }


    checkForFinCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.keyboard.SPACE) {
                if (enemy instanceof Pufferfish) {
                    enemy.health = 0;
                }
            }
        });
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
            collectBottles.play();
            this.collectedBottles.push(object);
            this.percentageBottles += 10;
            this.statusbarBottles.setPercentage(this.percentageBottles);
            this.removeObjectFromCanvas(object);
        };
    }


    collectCoin(object) {
        if (this.collectedCoins.length <= 9) {
            collectCoins.play();
            this.collectedCoins.push(object);
            this.percentageCoins += 10;
            this.statusbarCoins.setPercentage(this.percentageCoins);
            this.removeObjectFromCanvas(object);
        }
        // reward system
        if (this.collectedCoins.length > 9 && this.character.health < 100) {
            getLifeBack.play();
            this.statusbarHealth.setPercentage(100); // character gets full health
            this.statusbarCoins.setPercentage(0); // coins are emptied in exchange
        }
    }


    removeObjectFromCanvas(object) {
        let index = this.level.collectableObjects.indexOf(object);
        this.level.collectableObjects.splice(index, 1);
    }


    // COLLISIONS
    checkCollisions() {
        this.level.enemies.forEach((enemy) => { // ähnlich wie for-Schleife
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.health); // health bar now shows current health of character
            }
        });
    }


    setWorld() { // Klasse World an den character übergeben
        this.character.world = this; // this.character.world -> auf world in character zugreifen; = this -> world in character bekommt Wert aus DIESER world (somit kann auf Variablen wie keyboard zugegriffen werden)
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
        this.drawFrames(mo);

        if (mo.otherDirection) {
            this.flipImageBack(mo); // ctx wird wieder normal angezeigt (sorgt dafür, dass alle anderen Bilder NICHT spiegelverkehrt gezeichnet werden)
        }
    }


    drawFrames(mo) {
        mo.drawFrameAroundCharacter(this.ctx);
        mo.drawFrameAroundEnemies(this.ctx);
        mo.drawFrameAroundEndboss(this.ctx);
        mo.drawFrameAroundBubble(this.ctx);
    }


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