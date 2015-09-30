var RandomMapPointFinder = function(pMap){

    this.find = function(){
        var ri = parseInt(Math.random() * pMap.length);
        var rj = parseInt(Math.random() * pMap[0].length);

        var val = pMap[ri][rj];

        while (val == -1){
            ri = parseInt(Math.random() * pMap.length);
            rj = parseInt(Math.random() * pMap[0].length);
            val = pMap[ri][rj];
        }

        return new IJPoint(ri, rj);
    }   
}
