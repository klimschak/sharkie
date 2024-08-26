class BackgroundObject extends MovableObject {

   constructor(imagePath, x, y){
      super();
      this.loadImage(imagePath);
      this.width = 720;
      this.height = 480;
      this.y = y;
      this.x = x;


   }
   
}