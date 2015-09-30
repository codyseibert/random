var MapObject = function(pType, pI, pJ){
    this.type = pType;
    this.i = pI;
    this.j = pJ;

    this.left = pJ * 32;
    this.right = pJ * 32 - 1;
    this.top = pI * 32;
    this.bottom = pI * 32 -1;

    this.intersects = function(pOtherObject){
        return !(pOtherObject.left > this.right 
            || pOtherObject.right < this.left
            || pOtherObject.top > this.bottom 
            || pOtherObject.bottom < this.top);
    }
}
