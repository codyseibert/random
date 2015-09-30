var runner = runner || new TestRunner();

runner.addTest({
    name: "testEdgeMapGenetor_GivenIJPointList_CorrectEdgeMapGenerated", 

    test: function(){
        var list = new List();
        list.add(new IJPoint(0, 0));
        list.add(new IJPoint(1, 0));
        list.add(new IJPoint(1, 1));
        list.add(new IJPoint(1, 2));
        list.add(new IJPoint(0, 2));
        list.add(new IJPoint(2, 1));

        var generator = new EdgeMapGenerator();
        var edgeMap = generator.generate(list.getElements());
       
        var keyCount = 0;
        for (var key in edgeMap){
            keyCount++;
        }
        return keyCount == 6
            && edgeMap[new IJPoint(0, 0).toString()]
                .contains(new IJPoint(1, 0))
            
            && edgeMap[new IJPoint(1, 0).toString()]
                .contains(new IJPoint(0, 0))
            && edgeMap[new IJPoint(1, 0).toString()]
                .contains(new IJPoint(1, 1))

            && edgeMap[new IJPoint(1, 1).toString()]
                .contains(new IJPoint(1, 0))
            && edgeMap[new IJPoint(1, 1).toString()]
                .contains(new IJPoint(2, 1))
            && edgeMap[new IJPoint(1, 1).toString()]
                .contains(new IJPoint(1, 2))
            
            && edgeMap[new IJPoint(1, 2).toString()]
                .contains(new IJPoint(1, 1))
            && edgeMap[new IJPoint(1, 2).toString()]
                .contains(new IJPoint(0, 2))
            
            && edgeMap[new IJPoint(0, 2).toString()]
                .contains(new IJPoint(1, 2));
    }
});
