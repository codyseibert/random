var XYPoint = function(x, y){
    this.x = x;
    this.y = y;
    
    this.distance = function(pOther){
        var dx = this.x - pOther.x;
        dx *= dx + 0.0;

        var dy = this.y - pOther.y;
        dy *= dy + 0.0;

        return Math.sqrt(dx + dy);
    }
}
