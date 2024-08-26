class Cloud extends MovableObject {

   
   constructor(){
      super().loadImage('assets/img/3.Background/1.png')

      this.x = 200 + Math.random() * 500;
      this.y = 0
      this.width = 500;
      this.height = 300;
      this.animate();
   }

   animate() {
      this.moveLeft(0.1, 1000/180);
   }



}  