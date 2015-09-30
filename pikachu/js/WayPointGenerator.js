var WayPointGenerator = function(pMap){
    this.generate = function(){ 
        var wpList = new List();
        var seen = {};

        var addWhenPossible = function(pPoint){
            if (inBounds(pPoint)
                && pMap[pPoint.i][pPoint.j] !== -1 
                && seen[pPoint.toString()] !== true){
                wpList.add(pPoint);
                seen[pPoint.toString()] = true;
            }            
        }
    
        for (var i = 0; i < pMap.length; i++){
            for (var j = 0; j < pMap.length; j++){
                if (pMap[i][j] == -1){
                    var above = new IJPoint(i - 1, j);
                    var aboveLeft = new IJPoint(i - 1, j - 1);
                    var aboveRight = new IJPoint(i - 1, j + 1);
                    var left = new IJPoint(i, j - 1);
                    var right = new IJPoint(i, j + 1);
                                
                    addWhenPossible(above);   
                    addWhenPossible(aboveLeft);   
                    addWhenPossible(aboveRight);   
                    addWhenPossible(left);   
                    addWhenPossible(right);   
                }
            }
        }

        return wpList;
    }

    var inBounds = function(point){
        return point.i >= 0 
            && point.j < pMap[0].length
            && point.j >= 0 
            && point.i < pMap.length;
    }
}
