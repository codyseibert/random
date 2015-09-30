var runner = runner || new TestRunner();

runner.addTest({
    name: "testSeenFilterTest_SeenPoint_Filterd", 

    test: function(){
        var seen = {};
        var point = new IJPoint(0, 0);
        seen[point.toString()] = true;

        var points = [point];

        var seenFilter = new SeenFilter(seen);
        var filteredPoints = seenFilter.filter(points);

        return filteredPoints.length == 0;
    }
});

runner.addTest({
    name: "testSeenFilterTest_UnseenPoint_NotFiltered", 

    test: function(){
        var seen = {};
        var point = new IJPoint(0, 0);

        var points = [point];

        var seenFilter = new SeenFilter(seen);
        var filteredPoints = seenFilter.filter(points);
        
        return filteredPoints.length == 1
            && filteredPoints[0].equals(new IJPoint(0, 0));
    }
});
