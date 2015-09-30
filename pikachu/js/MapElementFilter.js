var MapElementFilter = function(pMap, pValueToFilter){
    this.filter = function(pIJPointArray){
        var points = [];
        for (var i = 0; i < pIJPointArray.length; i++){
            var point = pIJPointArray[i];
            
            if (pMap 
                && pMap[point.i] 
                && pMap[point.j] 
                && pMap[point.i][point.j] != pValueToFilter){
                points.push(point);
            }
        }
        return points;
    }
}
