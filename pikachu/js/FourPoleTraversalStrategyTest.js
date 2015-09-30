var runner = runner || new TestRunner();

runner.addTest({
    name: "testFourPoleTraversalStrategy_OnTraverse_Only4PoleDirectionsReturned", 

    test: function(){
        var strategy = new FourPoleTraversalStrategy();

        var point = new IJPoint(0, 0);

        var adjPoints = strategy.getAdjPoints(point);

        var contains = function(list, check){
            for (var i = 0; i < list.length; i++){
                var point = list[i];
                if (point.equals(check)){
                    return true;
                }
            }
            return false;
        }
        return adjPoints.length == 4
            && contains(adjPoints, new IJPoint(-1, 0))
            && contains(adjPoints, new IJPoint(0, -1))
            && contains(adjPoints, new IJPoint(1, 0))
            && contains(adjPoints, new IJPoint(0, 1));
    }
});
