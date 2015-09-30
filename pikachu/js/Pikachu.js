var Pikachu = function(){
  this.x = 0;
  this.y = 0; 
  this.waypoints = [];
  this.vx = 0;
  this.vy = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.bottom = 0;

    this.setHitbox = function(){
      this.left = this.x - 16;
      this.top = this.y - 16;
      this.right = this.x + 15;
      this.bottom = this.y + 15;
  }
  
  this.setHitbox();

  this.setX = function(pX){
      this.x = pX;
    this.setHitbox();
  }

  this.setY = function(pY){
      this.y = pY;
    this.setHitbox();
  }
    this.intersects = function(pOtherObject){
        return !(pOtherObject.left > this.right 
            || pOtherObject.right < this.left
            || pOtherObject.top > this.bottom 
            || pOtherObject.bottom < this.top);
    }
}
