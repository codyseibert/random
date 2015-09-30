var PhysicsManager = function(pMap){
    this.update = function(pObject){
        var lastX = pObject.x;
        pObject.setX(pObject.x + pObject.vx);
        if (colliding(pObject)){
            pObject.vx = 0;
            pObject.setX(lastX);
        }

        pObject.setY(pObject.y + pObject.vy);
        var lastY = pObject.y;
        if (colliding(pObject)){
            if (pObject.vy > 0){
                pObject.jumping = false;
            }
            pObject.vy = 0;
            pObject.setY(lastY);
        }
        // gravity
        pObject.vy = Math.min(pObject.vy + 0.1, 5.0);
    }

    var colliding = function(pObject){
        for (var i = 0; i < pMap.length; i++){
            for (var j = 0; j < pMap[0].length; j++){
                var m = pMap[i][j];
                var obj = new MapObject(m, i, j);
                if (m == -1 && obj.intersects(pObject)){
                    return true;
                }
            }
        }

        return false;
    }
}
