var runner = runner || new TestRunner();

runner.addTest({
    name: "testList_ContainsElement_ReturnsTrue", 

    test: function(){
        var list = new List();
        list.add(new IJPoint(0, 1337));
        return list.contains(new IJPoint(0, 1337));
    }
});

runner.addTest({
    name: "testList_DoesNotContainElement_ReturnsFalse", 

    test: function(){
        var list = new List();
        list.add(new IJPoint(0, 1337));
        return !list.contains(new IJPoint(0, 0));
    }
});
