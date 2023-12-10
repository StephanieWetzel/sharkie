class Level {
    enemies;
    lights;
    throwableObjects;
    backgroundObjects;
    map_end_x = 2200; // bis hier kann Character gehen, dann stoppt er
    map_end_y = 300;

    constructor(enemies, lights, throwableObjects, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.throwableObjects = throwableObjects;
        this.backgroundObjects = backgroundObjects;
    }
}