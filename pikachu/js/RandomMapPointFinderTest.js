var runner = runner || new TestRunner();

runner.addTest({
    name: "testRandomMapPointFinder_OnFind_ReturnsOnlyNonCollidable", 

    test: function(){
        var map = [
            [-1, 0],
            [-1, -1]
        ];

        var finder = new RandomMapPointFinder(map);


        var rPoint = finder.find();
        
        return rPoint.equals(new IJPoint(0, 1));
    }
});
