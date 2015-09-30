var PathFinder = function(pMap){
    var wayPointGenerator = new WayPointGenerator(pMap);
    var wayPoints = wayPointGenerator.generate();
    var edgeMapGenerator = new EdgeMapGenerator();
    var edgeMap = edgeMapGenerator.generate(wayPoints);
    
    var closestTo = function(vertex, edgeMap){
        var closest = null; 
        var min = 1000000;
        for (var key in edgeMap){
            var points = edgeMap[key].elements;
            for (var i = 0; i < points.length; i++){
                if (vertex.equals(points[i])) continue;
                var distance = points[i].distance(vertex);
                if (distance < min){
                    min = distance;
                    closest = points[i];
                }
            }
        }
        return closest;
    }

    this.findPath = function(fromIJPoint, toIJPoint){

        var closestFromPoint = closestTo(fromIJPoint, edgeMap);
        var closestToPoint = closestTo(toIJPoint, edgeMap);
        var queue = [];
        var seen = [];
        var path = [];

        var start = new IJPointPair(closestFromPoint, null);
        seen[start.toString()] = true; 
        queue.push(start);
        while (queue.length > 0){
          var currentPair = queue.shift();
          var current = currentPair.current;
             
          if (currentI.i == toI && currentJ.j == toJ){
            var cur = currentPair;
            while (cur != null){
                path.unshift(cur.current);
                cur = cur.last;
            }
            return path;
          }else{

            var adj = edgeMap[current.toString()].elements;
                 
            for (var i = 0; i < adj.length; i++){
                seen[adjPoints[i].toString()] = true;
                queue.push(
                    new IJPointPair(
                        adjPoints[i], 
                        currentPointPair));
            }
          }
        }

        return path;
      }
    }

