var EdgeMapGenerator = function(){
    this.generate = function(pVertices){
        var edgeMap = {};

        var set = new DisjointSet();
        
        var Edge = function(source, sink, cost){
            this.source = source;
            this.sink = sink;
            this.cost = cost;
        }
        for (var i = 0; i < pVertices.elements.length; i++){
            var v = pVertices.elements[i];
            set.add(v);
        }

        var edges = [];
        for (var i = 0; i < pVertices.length; i++){
            for (var j = i + 1; j < pVertices.length; j++){
                var source = pVertices[i];
                var sink = pVertices[j];
                var cost = source.distance(sink);
                var edge = new Edge(source, sink, cost);
                edges.push(edge);
            }
        }
        
        edges.sort(function(a, b){
            return a.cost - b.cost;
        });

        for (var i = 0; i < edges.length; i++){
            var edge = edges[i];
            
            if (set.isDisjoint(edge.source, edge.sink)){
                set.union(edge.source, edge.sink);

                if (!edgeMap[edge.source.toString()]){
                    edgeMap[edge.source.toString()] = new List();
                }
                edgeMap[edge.source.toString()].add(edge.sink);
                
                if (!edgeMap[edge.sink.toString()]){
                    edgeMap[edge.sink.toString()] = new List();
                }
                edgeMap[edge.sink.toString()].add(edge.source);
            }
        }

        return edgeMap;
    }
}
