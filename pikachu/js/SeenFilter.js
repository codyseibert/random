var SeenFilter = function(pSeenMap){
    this.filter = function(pIJPointArray){
        var points = [];
        for (var i = 0; i < pIJPointArray.length; i++){
            var point = pIJPointArray[i];
            
            if (pSeenMap[point.toString()] !== true){
                points.push(point);
            }
        }
        return points;
    }
}
