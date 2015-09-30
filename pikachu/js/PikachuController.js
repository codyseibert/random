var PikachuController = function(pMap, pPikachu){
    
    this.step = function(){
   
       var waypoints = pPikachu.waypoints;
  
       if (waypoints.length === 0){
           var pathFinder = new PathFinder(pMap);
           var randomPointFinder = new RandomMapPointFinder(pMap);
           var randomPoint = randomPointFinder.find();
           var TILE_SIZE = 32;
           var currentPosition = new IJPoint(
                parseInt(pPikachu.y / TILE_SIZE),
                parseInt(pPikachu.x / TILE_SIZE));
           pPikachu.waypoints = pathFinder.findPath(
                currentPosition,            
                randomPoint);
           pPikachu.waypoints = 
                this.convertWaypoints(pPikachu.waypoints);
       }else{
            var targetXY = waypoints[0];
            var MIN_DIST = 8.0;
            var SPEED = 2.1;
            var distance = targetXY.distance(
                new XYPoint(pPikachu.x, pPikachu.y));
            if (distance < MIN_DIST){
                pPikachu.waypoints.shift(); 
            }else{
                /*
                var dx = targetXY.x - pPikachu.x;
                pPikachu.x += Math.min(dx, SPEED);

                var dy = targetXY.y - pPikachu.y;
                pPikachu.y += Math.min(dy, SPEED);
                */
                var dx = targetXY.y - pPikachu.x;
                if (dx < 0){
                    pPikachu.vx = Math.max(dx, -SPEED);
                }else{
                    pPikachu.vx = Math.min(dx, SPEED);
                }
                
                
                var dy = targetXY.y - pPikachu.y;
                if (dy < 0 && !pPikachu.jumping){
                    pPikachu.jumping = true;
                    pPikachu.vy = -10.0;
                }
            }           
       }
    }

    this.convertWaypoints = function(waypoints){
        var xyPoints = [];
        for (var i = 0; i < waypoints.length; i++){
            xyPoints.push(waypoints[i].toXYPoint());
        }
        return xyPoints;
    }
}
