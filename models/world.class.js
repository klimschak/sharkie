class World {
   ctx;
   canvas;
   camera_x = 0;
   camera_speed = 0.5; // Geschwindigkeit der Kamera
   keyboard;
   character = new Character();
   level = level1;
   statusBar = new StatusBar();
   throwableObjects = [];
   
   constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
      this.autoScroll();
   };

   setWorld() {
      this.character.world = this;
   };

   run() {
      setInterval(() => {
         this.checkCollisions();
         this.checkThrowObjects();
         this.updateCameraPosition(); // Kamera-Position aktualisieren
      }, 1000 / 4);
   };

   autoScroll(){
      setInterval(() => {
         if (this.camera_x > -this.level.level_end_x + this.canvas.width) {
            this.camera_x -= this.camera_speed; // Kamera bewegt sich nach rechts
         }
      }, 1000 / 60);
   }




   checkThrowObjects() {
      if (this.keyboard.D) {
         let bubbleX = this.character.otherDirection ? this.character.x : this.character.x + 100;
         let bubbleY = this.character.y + 80;
         let bubble = new ThrowableObject(bubbleX, bubbleY, this.character.otherDirection);
         this.throwableObjects.push(bubble);
      }
   }
   
   checkCollisions() {
      this.level.enemies.forEach(enemy => {
         if (this.character.isColliding(enemy)) {
            this.character.hit();
         }
         if(this.character.energy > 0){
            this.statusBar.setPercentage(this.character.energy);
         }
      });
   }

   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.addMovingObjects();
      this.addFixedObjects();

      let self = this;
      requestAnimationFrame(function () {
         self.draw();
      });
   }

   addFixedObjects(){
      this.addToMap(this.statusBar);
   }

   addMovingObjects(){
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);

      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
   }

   addToMap(mo) {
      if (mo.otherDirection) {
         this.flipImage(mo);
      }

      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);

      if (mo.otherDirection) {
         this.flipImageToDefault(mo);
      }
   }

   addObjectsToMap(objects) {
      objects.forEach(object => {
         this.addToMap(object);
      });
   }

   flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0)
      this.ctx.scale(-1, 1)
      mo.x = mo.x * -1;
   }

   flipImageToDefault(mo) {
      this.ctx.restore();
      mo.x = mo.x * -1;
   }
}
