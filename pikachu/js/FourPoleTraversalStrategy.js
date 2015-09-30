var FourPoleTraversalStrategy = function(){
    this.getAdjPoints = function(currentIJPoint){
        var adj = [];
        var currentI = currentIJPoint.i;
        var currentJ = currentIJPoint.j;
        for (var i = -1; i <= 1; i++){
            for (var j = -1; j <= 1; j++){
                if ((i + j) % 2 == 0) continue;
                var nextI = i + currentI;
                var nextJ = j + currentJ;
                var nextIJPoint = new IJPoint(nextI, nextJ);
                adj.push(nextIJPoint);
            }
        }
        return adj;
    }
}
