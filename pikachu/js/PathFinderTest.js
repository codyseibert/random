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

        return path.length == 7 
            && path[0].equals(new IJPoint(2, 0))
            && path[1].equals(new IJPoint(1, 0))
            && path[2].equals(new IJPoint(0, 0))
            && path[3].equals(new IJPoint(0, 1))
            && path[4].equals(new IJPoint(0, 2))
            && path[5].equals(new IJPoint(1, 2))
            && path[6].equals(new IJPoint(2, 2));
       
    }
});
