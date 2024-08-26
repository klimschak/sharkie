class MovableObject extends DrawableObject{


   energy = 100;



   otherDirection = false;
   dead = false;
   moop = false;
   ishurt = false;
   offsetLeft = 10;
   offsetRight = 10;
   offsetTop = 20;
   offsetBottom = 30;
   speedY = 0;
   accelaration = 1.5
   speed = 0.2;



   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelaration;
         }


      }, 1000 / 40 );
   }

   isAboveGround() {
      if (this instanceof ThrowableObject) {
         return true;
      }  else {
         return this.y < 180;
      }
      
}


   isColliding(mo) {
      return this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
      this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
      this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
      this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom
      //&& obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

   }

   hit() {
      if (this.energy > 0 && !this.dead && !this.isHurt) {
         
         this.isHurt = true;
         this.energy -= 20;
         console.log('Energy: ', this.energy);
         setTimeout(() => {
            
            this.isHurt = false; // Nach 3 Sekunden wieder bereit für Treffer
        }, 1500);
      }
      
      
      
      if (this.energy <= 0 && !this.dead) {
         this.energy = 0;
         this.isDead();
         
         
      }
      

   } 

   isDead() {
      
          this.dead = true;  // Einmalige Zustandsänderung
          
      
  }
    

   moveLeft(move, refresh) {
      setInterval(() => {
         this.x -= move;
      }, refresh);
   }

   moveRight() {

   };

}


