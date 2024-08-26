class Puffer extends MovableObject {
   
   IMAGES_SWIM = [
      'assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim1.png',
      'assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim2.png',
      'assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim3.png',
      'assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim4.png',
      'assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim5.png',
   ];

   offsetX = 0;
   offsetY = 0;
   constructor() {
      super().loadImage('assets/img/2.Enemy/1-Pufferfish/1-Swim/1.swim1.png')
      this.loadImages(this.IMAGES_SWIM);
      this.animate();


      this.x = 200 + Math.random() * 500;
      this.y = 30 + Math.random() * 420;

      this.offsetLeft = 14;
      this.offsetRight = 14;
      this.offsetTop = 10;
      this.offsetBottom = 30;

      this.moveLeft(0.2 + Math.random() * 0.35, 1000/120);


      
      
   };


   animate() {
       
      setInterval(() => {
         let i = this.currentImage % this.IMAGES_SWIM.length;
         let path = this.IMAGES_SWIM[i];
         this.img = this.imageCache[path];
         this.currentImage++;
      }, 1000/7);
   };
 } 