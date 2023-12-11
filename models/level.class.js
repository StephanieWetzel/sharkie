class Level {
    enemies;
    lights;
    collectableObjects;
    backgroundObjects;
    map_end_x = 6000; // bis hier kann Character gehen, dann stoppt er
    map_end_y = 520;

    constructor(enemies, lights, collectableObjects, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.collectableObjects = collectableObjects;
        this.backgroundObjects = backgroundObjects;
    }
}