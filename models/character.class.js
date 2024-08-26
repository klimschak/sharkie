class Character extends MovableObject {

   IMAGES_SWIM = [
      'assets/img/1.Sharkie/3.Swim/1.png',
      'assets/img/1.Sharkie/3.Swim/2.png',
      'assets/img/1.Sharkie/3.Swim/3.png',
      'assets/img/1.Sharkie/3.Swim/4.png',
      'assets/img/1.Sharkie/3.Swim/5.png',
      'assets/img/1.Sharkie/3.Swim/6.png',
   ];
   IMAGES_IDLE = [
      'assets/img/1.Sharkie/1.IDLE/1.png',
      'assets/img/1.Sharkie/1.IDLE/2.png',
      'assets/img/1.Sharkie/1.IDLE/3.png',
      'assets/img/1.Sharkie/1.IDLE/4.png',
      'assets/img/1.Sharkie/1.IDLE/5.png',
      'assets/img/1.Sharkie/1.IDLE/6.png',
      'assets/img/1.Sharkie/1.IDLE/7.png',
      'assets/img/1.Sharkie/1.IDLE/8.png',
      'assets/img/1.Sharkie/1.IDLE/9.png',
      'assets/img/1.Sharkie/1.IDLE/10.png',
      'assets/img/1.Sharkie/1.IDLE/11.png',
      'assets/img/1.Sharkie/1.IDLE/12.png',
      'assets/img/1.Sharkie/1.IDLE/13.png',
      'assets/img/1.Sharkie/1.IDLE/14.png',
      'assets/img/1.Sharkie/1.IDLE/15.png',
      'assets/img/1.Sharkie/1.IDLE/16.png',
      'assets/img/1.Sharkie/1.IDLE/17.png',
      'assets/img/1.Sharkie/1.IDLE/18.png',
   ];

   IMAGES_DEAD = [
      'assets/img/1.Sharkie/6.dead/1.Poisoned/1.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/2.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/3.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/4.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/5.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/6.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/7.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/8.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/9.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/10.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/11.png',
      'assets/img/1.Sharkie/6.dead/1.Poisoned/12.png'
   ];

   IMAGES_HURT = [
      'assets/img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
      'assets/img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
      'assets/img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
      'assets/img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
      'assets/img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
   ];

   swim_sound = new Audio('assets/audio/swim_sharky.mp3');

   world;
   sharkyDead = 0;
   sharkyDeadMovement = 0;
   speedY = 5;
   accelaration = 0.1;

  
   


   constructor() {
      super();
      this.loadImage('assets/img/1.Sharkie/1.IDLE/1.png');
      this.x = 50;
      this.y = 200;
      this.height = 150;
      this.width = 150;
      this.offsetLeft = 30;
      this.offsetRight = 30;
      this.offsetTop = 80;
      this.offsetBottom = 40;
      
      
      this.loadImages(this.IMAGES_IDLE); 
      this.loadImages(this.IMAGES_SWIM);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.animate();

      


   };

   sharkyFloatsDown(){
   
         setInterval(() => {
            if (this.dead && this.speedY > 0  && this.sharkyDead < 9) {
               this.y -= this.speedY;
               this.speedY -= this.accelaration;
         }
   
         }, 1000/80);

         setInterval(() => {

            if (this.dead && this.sharkyDead < 9) {
                  let i = this.sharkyDead;
                  let path = this.IMAGES_DEAD[i];
                  this.img = this.imageCache[path];
                  this.sharkyDead++
            };
         }, 1000 / 4);

         setInterval(() => {
            if (this.dead && this.sharkyDead == 9 && this.y < 330) {
               this.y += this.speedY/4;
               this.speedY += this.accelaration/4;
         }
   
         }, 1000/80);
 

   };

   sharkyHurt() {
      setInterval(() => {
         if (this.isHurt) {
            let i = this.currentImage % this.IMAGES_HURT.length;
            let path = this.IMAGES_HURT[i];
            this.img = this.imageCache[path];
            this.currentImage++;
         }
      }, 1000/24);

   }

   sharkyDies() {
      setInterval(() => {

         if (this.dead && this.sharkyDead < this.IMAGES_DEAD.length ) {
               let i = this.sharkyDead;
               let path = this.IMAGES_DEAD[i];
               this.img = this.imageCache[path];
               this.sharkyDead++
         };
      }, 1000 / 24);


      setInterval(() => {
         if (this.dead && this.sharkyDeadMovement < 300 && sharkyDead < 4) {
            this.y -= 2;
            this.sharkyDeadMovement++
         };
      }, 1000/60);

   }

   sharkyMoves() {
      setInterval(() => {
          this.swim_sound.pause();
          // Sichtbaren Bereich für den Charakter berechnen
          const margin = 30;
          const minX = -this.world.camera_x - margin;
          const maxX = -this.world.camera_x + this.world.canvas.width - this.width + margin;

          // Bewegung nach rechts
          if (this.world.keyboard.RIGHT && this.x < maxX && !this.dead) {
              this.x += 7;
              this.otherDirection = false;
              this.swim_sound.play();
          }

          // Bewegung nach links
          if (this.world.keyboard.LEFT && this.x > minX && !this.dead) {
              this.x -= 7;
              this.otherDirection = true;
              this.swim_sound.play();
          }

          // Bewegung nach unten
          if (this.world.keyboard.DOWN && !this.dead) {
              this.y += 7;
              this.swim_sound.play();
          }

          // Bewegung nach oben
          if (this.world.keyboard.UP && !this.dead) {
              this.y -= 7;
              this.swim_sound.play();
          }

          // Kamera soll nicht nach links weiter schieben, wenn der Charakter am linken Rand ist
          if (this.x <= minX) {
              this.x = minX; // Charakter am linken Rand fixieren
          }

          // Charakter automatisch nach rechts verschieben, wenn er am linken Rand ist
          if (this.x <= minX + 10 && !this.world.keyboard.RIGHT) {
              this.x += 2; // Automatisch nach rechts schieben
          }

      }, 1000 / 60);

      setInterval(() => {
          if (this.world.keyboard.RIGHT && !this.dead && !this.isHurt || this.world.keyboard.UP && !this.dead && !this.isHurt || this.world.keyboard.DOWN && !this.dead && !this.isHurt || this.world.keyboard.LEFT && !this.dead && !this.isHurt) {
              let i = this.currentImage % this.IMAGES_SWIM.length;
              let path = this.IMAGES_SWIM[i];
              this.img = this.imageCache[path];
              this.currentImage++;
          }
      }, 1000 / 8);
  }

   sharkyIdles(){


      setInterval(() => {
         if (!this.dead && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.D  && !this.isHurt){
            let i = this.currentImage % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            
         }
         
      }, 1000 / 7);

   }

   animate() {
            //this.sharkyDies();
            this.sharkyMoves();
            this.sharkyIdles();
            this.sharkyFloatsDown();
            this.sharkyHurt();
   };

   jump() {

   };
}

