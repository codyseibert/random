var OutOfBoundsFilter = function(pMaxI, pMaxJ){
    this.filter = function(IJPointArray){
        var adj = [];
        for (var i = 0; i < pIJPointArray.length; i++){
            var ijPoint = pIJPointArray[i];
            
            if (ijPoint.i >= 0 && ijPoint.i < pMaxI
                && ijPoint.j >= 0 && ijPoint.j < pMaxJ){
                adj.push(ijPoint);   
            }
        }
        return adj;
    }
}
