class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 2200; // bis hier kann Character gehen, dann stoppt er

    constructor(enemies, lights, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}