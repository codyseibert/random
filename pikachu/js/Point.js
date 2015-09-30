var Point = function(pX, pY){
    this.x = pX;
    this.y = pY;
}


point.distance = function(pPoint){
    var dx = this.x - pPoint.x;
    var dy = this.y - pPoint.y;
    var distance = Math.sqrt(dx*dx + dy*dy);
    return distance;
}

point.toString = function(){
    return this.x + " " + this.y;
}
