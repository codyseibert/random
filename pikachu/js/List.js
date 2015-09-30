var List = function(){
    this.elements = [];

    this.add = function(element){
        this.elements.push(element);
    }

    this.contains = function(element){
        for (var i = 0; i < this.elements.length; i++){
            if (this.elements[i].equals(element)){
                return true;
            }
        }

        return false;
    }

    this.size = function(){
        return this.elements.length;
    }

    this.getElements = function(){
        return this.elements;
    }
}
