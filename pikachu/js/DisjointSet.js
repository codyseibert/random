var DisjointSet = function(){

    var set = {};
    
    this.add = function(a){
        set[a.toString()] = a;
    }

    this.union = function(a, b){
       set[find(a).toString()] = b; 
    }

    this.isDisjoint = function(a, b){
        return !find(a).equals(find(b));
    }

    var find = function(a){
        if (set[a.toString()] == a.toString()){
            return a;
        }
        return set[a.toString()] = find(set[a.toString()]);
    }
}
