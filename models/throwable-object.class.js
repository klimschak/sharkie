class ThrowableObject extends MovableObject {
   speedY = 0;
   acceleration = 0.05; // Geringere Beschleunigung für langsames Aufsteigen
   xDirection = 10; // Initiale Geschwindigkeit in X-Richtung
   maxXSpeed = 20; // Maximale Geschwindigkeit in X-Richtung
   hasChangedDirection = false; // Kontrolliert den Übergang

   constructor(x, y, otherDirection) {
      super();
      this.loadImage('assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
      this.x = x;
      this.y = y;
      this.height = 40;
      this.width = 40;

      // Richtung festlegen basierend auf der Blickrichtung des Charakters
      if (otherDirection) {
         this.xDirection = -this.xDirection; // Nach links schießen
      }

      this.throw();
   }

   throw() {
      this.speedY = 1; // Sehr langsame vertikale Geschwindigkeit zum Start
      this.shootBubble();
   }

   shootBubble() {
      setInterval(() => {
         // Erhöhe die horizontale Geschwindigkeit, bis die maximale erreicht ist
         if (!this.hasChangedDirection && Math.abs(this.xDirection) < this.maxXSpeed) {
            this.xDirection += this.xDirection > 0 ? 5 : -5; // Zunehmende Geschwindigkeit
         }

         // Bewege die Bubble horizontal
         this.x += this.xDirection;

         // Prüfe, ob die Bubble mehr als 80 Pixel zurückgelegt hat
         if (Math.abs(this.x) >= 100 && !this.hasChangedDirection) {
            this.hasChangedDirection = true; // Übergang einleiten
            this.speedY = 2; // Sehr langsames Aufsteigen nach dem Übergang
         }

         // Wenn die Richtung geändert wurde, verlangsamen und nach oben bewegen
         if (this.hasChangedDirection) {
            this.xDirection = this.xDirection > 0 
               ? Math.max(this.xDirection - 0.5, 1)
               : Math.min(this.xDirection + 0.5, -1); // Verlangsamen bis zum Stillstand
            this.y -= this.speedY; // Langsam nach oben bewegen
            this.speedY += this.acceleration; // Leichte Zunahme der vertikalen Geschwindigkeit
         }
      }, 50); // Interval auf 50 ms, um flüssige Bewegung zu gewährleisten
   }
}
