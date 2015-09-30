var runner = runner || new TestRunner();

runner.addTest({
    name: "testIJPoint_ReturnsFalse_OnFalseEquals",

    test: function(){
        var pointA = new IJPoint(0, 0);
        var pointB = new IJPoint(1, 1);
        var ret = pointA.equals(pointB);
        var expected = false;
        return ret == expected;
    }
});

runner.addTest({
    name: "testIJPoint_ReturnsTrue_OnTrueEquals",

    test: function(){
        var pointA = new IJPoint(0, 0);
        var pointB = new IJPoint(0, 0);
        var ret = pointA.equals(pointB);
        var expected = true;
        return ret == expected;
    }
});
