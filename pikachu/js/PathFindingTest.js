var runner = runner || new TestRunner();

runner.addTest({
    name: "testPathFinder_OnSimpleMap_PathUpRightDown", 

    test: function(){
        var map = [
            [0, 0, 0],
            [0, -1, 0],
            [0, -1, 0]
        ];
        var pathFinder = new PathFinder(map);

        var path = pathFinder.findPath(
            new IJPoint(2, 0),
            new IJPoint(2, 2));

        console.log(path);
       
    }
});
