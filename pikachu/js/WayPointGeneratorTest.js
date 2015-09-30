var runner = runner || new TestRunner();

runner.addTest({
    name: "testWayPointGenerator_OnGenericMap_CorrectWayPointsReturned", 

    test: function(){
        var map = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, -1, -1, -1, 0],
            [0, 0, 0, 0, 0],
            [-1, -1, -1, -1, -1]
        ];    
        
        var generator = new WayPointGenerator(map);
        var points = generator.generate();
        
        return points.size() == 12 
            && points.contains(new IJPoint(1, 0))
            && points.contains(new IJPoint(2, 0))
            && points.contains(new IJPoint(3, 0))
            && points.contains(new IJPoint(3, 1))
            && points.contains(new IJPoint(3, 2))
            && points.contains(new IJPoint(3, 3))
            && points.contains(new IJPoint(3, 4))
            && points.contains(new IJPoint(2, 4))
            && points.contains(new IJPoint(1, 4))
            && points.contains(new IJPoint(1, 3))
            && points.contains(new IJPoint(1, 2))
            && points.contains(new IJPoint(1, 1));
    }
});
