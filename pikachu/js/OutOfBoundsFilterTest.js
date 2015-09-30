TestRunner.addTest(
    "testOutOfBoundsFilter", 
    function(){
        var filter = new OutOfBoundsFilter(10, 10);
       
        var points = [
            new IJPoint(0, 0),
            new IJPoint(-1, 0),
            new IJPoint(0, -1),
            new IJPoint(10, 9),
            new IJPoint(9, 10),
            new IJPoint(5, 5)
        ];

        var filteredPoints = filter.filter(points);

        if (filteredPoints.length != 2) return false;

        var contains = function(array, value){
            var con = false;
            for (var i = 0; i < array.length; i++){
                var a = array[i];
                con |= a.equals(value);
            }
            return con;
        }

        if (contains(filteredPoints, points[0]) 
            && contains(filteredPoints, points[5])){
            return true;
        }

        return false;
    }
);
