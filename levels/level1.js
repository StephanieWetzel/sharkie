const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new Endboss()
    ],
    [
        new Light()
    ],
    [
        // evtl. mit for-Schleife lösen
        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', -720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', -720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', -720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', -720),

        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 0), // 0 = X-Koordinate, wo das Bild eingefügt wird
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 720),

        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 720 * 2),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 720 * 2),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 720 * 2),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 720 * 2),

        new BackgroundObject('img/3. Background/Layers/5. Water/D.png', 720 * 3),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D.png', 720 * 3),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 720 * 3),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D.png', 720 * 3)
    ]

);