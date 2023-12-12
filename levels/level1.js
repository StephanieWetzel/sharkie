const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFishYellow(),
        new JellyFishYellow(),
        new JellyFishYellow(),
        new JellyFishYellow(),
        new JellyFishYellow(),
        new JellyFishDangerousGreen(),
        new JellyFishDangerousGreen(),
        new JellyFishDangerousGreen(),
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
        // evtl. mit for-Schleife lösen
        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', -2000),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', -2000),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', -2000),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', -2000),

        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 0), // 0 = X-Koordinate, wo das Bild eingefügt wird
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


// noch Funktion einfügen, die bei Klick auf Start-Screen ausgeführt wird (wird aktuell direkt beim Laden der Seite ausgeführt):

// function initNewLevel() {

// }