class Level {
    enemies;
    lights;
    collectableObjects;
    backgroundObjects;
    map_end_x = 6000;
    map_end_y = 520;


    /**
     * Creates a new instance of the Level class with specified enemies, lights, collectible objects, and background objects.
     * @param {Array} enemies - The array of enemies in the level.
     * @param {Array} lights - The array of lights in the level.
     * @param {Array} collectableObjects - The array of collectible objects in the level.
     * @param {Array} backgroundObjects - The array of background objects in the level.
     */
    constructor(enemies, lights, collectableObjects, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.collectableObjects = collectableObjects;
        this.backgroundObjects = backgroundObjects;
    }
}