var runner = runner || new TestRunner();

runner.addTest({
    name: "testDisjointSet_IsDisjointOnTwoJointSets_ReturnsFalse", 

    test: function(){
       var set = new DisjointSet();
       
       var a = new IJPoint(0, 0);
       var b = new IJPoint(1, 1);
       var c = new IJPoint(2, 2);

       set.add(a);
       set.add(b);
       set.add(c);
       
       set.union(a, b);
       return !set.isDisjoint(a, b); 
    }
});

runner.addTest({
    name: "testDisjointSet_IsDisjointOnTwoDisjointSets_ReturnsTrue", 

    test: function(){
       var set = new DisjointSet();
       
       var a = new IJPoint(0, 0);
       var b = new IJPoint(1, 1);
       var c = new IJPoint(2, 2);
       
       set.add(a);
       set.add(b);
       set.add(c);
       
       set.union(a, b);
       return set.isDisjoint(a, c); 
    }
});
