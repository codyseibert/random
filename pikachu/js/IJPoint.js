var IJPoint = function(pI, pJ){
    this.i = pI;
    this.j = pJ;

    this.distance = function(pIJPoint){
        var di = this.i - pIJPoint.i;
        var dj = this.j - pIJPoint.j;
        var distance = Math.sqrt(di*di + dj*dj);
        return distance;
    }

    this.toString = function(){
        return this.i + " " + this.j;
    }

    this.equals = function(pIJPoint){
        return this.i === pIJPoint.i 
            && this.j === pIJPoint.j;
    }

    this.toXYPoint = function(){
        var x = this.j * 32.0;
        var y = this.i * 32.0;
        return new XYPoint(x, y);
    }
}   
