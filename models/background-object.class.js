class BackgroundObject extends MovableObject {
    width = 1500;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath); // Hintergrund soll dynamisch sein, daher path als Parameter mitgegeben
        this.x = x;
        this.y = 480 - this.height; // Y-Koordinate berechnet -> Höhe Canvas - Höhe Objekt = Position in der Y-Achse, an der das Objekt eingefügt wird 
    }
}