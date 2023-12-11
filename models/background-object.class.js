class BackgroundObject extends MovableObject {
    width = 2000;
    height = 700;

    constructor(imagePath, x) {
        super().loadImage(imagePath); // Hintergrund soll dynamisch sein, daher path als Parameter mitgegeben
        this.x = x;
        this.y = 700 - this.height; // Y-Koordinate berechnet -> Höhe Canvas - Höhe Objekt = Position in der Y-Achse, an der das Objekt eingefügt wird 
    }
}