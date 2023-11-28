class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish()
    ];
    lights = [
        new Light()
    ];
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 0)
    ];
    canvas;
    ctx;
    keyboard;


    constructor(canvas, keyboard) { // Variable aus game.js wird übergeben
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Wert von canvas aus der game.js wird an das World-canvas übergeben (this.canvas bezieht sich auf Variable, die oben definiert ist)
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this; // this greift auf diese Welt zu
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // this.canvas = canvas -> wird zu Beginn geleert
        // draw figures (order matters!! - backgroundObjects first):
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.lights);


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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}