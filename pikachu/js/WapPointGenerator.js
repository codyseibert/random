var WayPointGenerator = function(pMap){
    this.generate = function(){ 
        var wpList = [];
        var seen = {};

        for (var i = 0; i < pMap.length; i++){
            for (var j = 0; j < pMap.length; j++){
                if (pMap[i][j] == -1){
                    var above = IJPoint(i - 1, j);
                    var aboveLeft = new IJPoint(i - 1, j - 1);
                    var aboveRight = new IJPoint(i - 1, j + 1);
                    
                    if (seen[above.toString()] != true){
                        wpList.push(above);
                    }

                    if (seen[aboveLeft.toString()] != true){
                        wpList.push(aboveLeft);
                    }

                    if (seen[aboveRight.toString()] != true){
                        wpList.push(aboveRight);
                    }
                }
            }
        }

        return wpList;
    }
}
