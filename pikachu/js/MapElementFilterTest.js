var runner = runner || new TestRunner();

runner.addTest({
    name: "testMapElementFilter_BadMapPoint_IsFiltered", 

    test: function(){
        var map = [
            [0, 0, 0],
            [0, 0, 0],
            [0, -1, -1]
        ];     
        var filter = new MapElementFilter(map, -1);
        var points = [];
        points.push(new IJPoint(2, 2));

        var filteredPoints = filter.filter(points);
        return filteredPoints.length == 0;
    }
});

runner.addTest({
    name: "testMapElementFilter_GoodMapPoint_IsNotFiltered", 
    test: function(){
        var map = [
            [0, 0, 0],
            [0, 0, 0],
            [0, -1, -1]
        ];     
        var filter = new MapElementFilter(map, -1);
        var points = [];
        points.push(new IJPoint(0, 0));

        var filteredPoints = filter.filter(points);

        return filteredPoints.length == 1
            && filteredPoints[0].equals(new IJPoint(0, 0));
    }
});
