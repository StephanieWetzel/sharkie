class World {
    character = new Character();
    level = level1; // damit können wir auf die Variablen aus level1 zugreifen (enemies, lights und backgroundobjects)
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // damit können wir die Welt auf der X-Achse verschieben


    constructor(canvas, keyboard) { // Variable aus game.js wird übergeben
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Wert von canvas aus der game.js wird an das World-canvas übergeben (this.canvas bezieht sich auf Variable, die oben definiert ist)
        this.keyboard = keyboard; // keyboard aus dieser Klasse bekommt den Wert von keyboard aus game.js übergeben
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => { // das Gleiche wie for-Schleife
                if (this.character.isColliding(enemy)) {
                    console.log('Collision with Character', enemy);
                }
            });
        }, 1000);
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
        mo.drawFrame(this.ctx);

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