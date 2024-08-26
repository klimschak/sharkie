class DrawableObject {
   img;
   imageCache = {};
   currentImage = 0;
   x = 120; 
   y = 300;
   height = 100;
   width = 100;

   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   };

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   };

   drawFrame(ctx) {
      if (this instanceof Character || this instanceof Puffer) {
         ctx.beginPath();
         ctx.lineWidth = '5';
         ctx.strokeStyle = 'yellow';

         // Rechteck zeichnen mit den individuellen Offsets
         ctx.rect(
            this.x + this.offsetLeft,             // X-Position (links)
            this.y + this.offsetTop,              // Y-Position (oben)
            this.width - this.offsetLeft - this.offsetRight,   // Breite unter Berücksichtigung der linken und rechten Offsets
            this.height - this.offsetTop - this.offsetBottom   // Höhe unter Berücksichtigung der oberen und unteren Offsets
         );
         ctx.stroke();
      }
   };

   loadImages(arr) {
      arr.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   };


}