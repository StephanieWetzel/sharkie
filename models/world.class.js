class World {
    character = new Character();
    level = level1; // damit können wir auf die Variablen aus level1 zugreifen (enemies, lights und backgroundobjects)
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // damit können wir die Welt auf der X-Achse verschieben
    statusBarBottles = new StatusBarBottles();
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    percentage = 0;

    collectableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;


    constructor(canvas, keyboard) { // Variable aus game.js wird übergeben
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Wert von canvas aus der game.js wird an das World-canvas übergeben (this.canvas bezieht sich auf Variable, die oben definiert ist)
        this.keyboard = keyboard; // keyboard aus dieser Klasse bekommt den Wert von keyboard aus game.js übergeben
        this.draw();
        this.setWorld();
        this.runIntervals();
        this.collect();
    }


    runIntervals() {
        setInterval(() => {
            this.checkCollisions();
            // this.checkForThrownObjects();
        }, 200);
    }


    // checkForThrownObjects() {
    //     if (this.keyboard.SPACE) {
    //         let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 80); // places bottle in position of character
    //         this.throwableObjects.push(bottle);
    //     }
    // }


    collect() {
        setInterval(() => {
            this.level.collectableObjects.forEach((object) => {
                if (this.character.isColliding(object)) {
                    this.collectableObjects.push(object);

                    console.log(this.collectableObjects);

                    // checks of what kind object is
                    if (object instanceof PoisonBottle) {
                        if (this.collectedBottles <= 9) {
                            this.collectableObjects.forEach(() => {
                                this.collectedBottles++;

                                console.log(this.collectedBottles);

                                this.statusBarBottles.setPercentage(this.percentage += 10);
                                // remove img from canvas:
                                this.ctx.clearRect(object.x, object.y, object.x + object.width, object.y + object.height);
                            });
                        }
                    }

                    else if (object instanceof Coin) {
                        if (this.collectedCoins <= 9) {
                            this.collectableObjects.forEach(() => {
                                this.collectedCoins++;

                                console.log(this.collectedCoins);

                                this.statusBarCoins.setPercentage(this.percentage += 10);
                            });
                        }
                    }
                }
            });
        }, 500);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => { // das Gleiche wie for-Schleife
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.health); // health bar now shows current health of character
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

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.collectableObjects);

        // statusbar:
        this.ctx.translate(-this.camera_x, 0); // Koordinatensystem wird zurückverschoben (Originalposition)
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarHealth); // StatusBar wird gezeichnet
        this.addToMap(this.statusBarCoins);
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
        mo.drawFrameAroundCharacter(this.ctx);
        mo.drawFrameAroundEnemies(this.ctx);
        mo.drawFrameAroundEndboss(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo); // ctx wird wieder normal angezeigt (sorgt dafür, dass alle anderen Bilder NICHT spiegelverkehrt gezeichnet werden)
        }
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