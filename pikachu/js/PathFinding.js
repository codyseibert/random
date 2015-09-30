var PathFinder = function(pMap){
         
    this.findPath(fromIJPoint, toIJPoint){
    
        var queue = [];
        var seen = [];

        var traversalStrategy = new FourPoleTraversalStrategy(); 
        var collidableFilter = new CollidableMapFilter(pMap);
        var seenFilter = new SeenFilter(seen);

        var current = new PointPair(fromIJPoint, null);
        seen[current.toString()] = true; 
        queue.push(current);

        while (queue.length > 0){
          var currentPointPair = queue.shift();
          var currentIJPoint = currentPointPair.current;
          var lastIJPoint = currentPointPair.last;
           
          if (currentI == toI && currentJ == toJ){
            var cur = currentPointPair;
            while (cur != null){
                path.push(cur);
                cur = cur.last;
            }
            return cur;
          }else{
            var adjPoints = traversalStrategy.getAdjPoints(currentIJPoint);
            adjPoints = collidableFilter.filter(adjPoints);
            adjPoints = seenFilter.filter(adjPoints);
        
            for (var i = 0; i < adjPoints.length; i++){
                queue.push(adjPoints[i]);   
            }
          }
        }

        return [];
      }
    }

