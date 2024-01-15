let level1;

/**
 * Initializes the game level with specific entities such as enemies, lights, items, and background objects.
 */
function initLevel() {
    level1 = new Level(
        [
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Pufferfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new Jellyfish(),
            new JellyfishDangerous(),
            new JellyfishDangerous(),
            new JellyfishDangerous(),
            new Endboss()
        ],
        [
            new Light()
        ],
        [
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new PoisonBottle(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', -2000),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', -2000),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', -2000),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', -2000),

            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 0),

            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 2000),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 2000),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 2000),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 2000),

            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 2000 * 2),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 2000 * 2),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 2000 * 2),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 2000 * 2),

            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 2000 * 3),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 2000 * 3),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 2000 * 3),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 2000 * 3),

            new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 2000 * 4),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 2000 * 4),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 2000 * 4),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 2000 * 4)
        ]
    );
}