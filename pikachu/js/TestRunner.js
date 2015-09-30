var TestRunner = function(){
    var tests = [];

    this.addTest = function(pTest){
        tests.push(pTest);
    }

    this.run = function(){
        for (var i = 0; i < tests.length; i++){i
            var test = tests[i];
            var name = test.name;
            var testFunction = test.test;
            var passed = testFunction();
            var status = passed ? "passed" : "failed";
            console.log("Test " + name + " " + status);
        }
    }   
}
