var CardToImageMapper = function(){
    var offsets = {};

    var SUITS = PAOTrainer.SUITS;
    var VALUES = PAOTrainer.VALUES;

    var Offset = function(x, y){
        this.x = x;
        this.y = y;
    }

    for (var i = 0; i < SUITS.length; i++){
        for (var j = 0; j < VALUES.length; j++){
            var suit = SUITS[i];
            var value = VALUES[j];

            if (!offsets[suit]){
                offsets[suit] = {}; 
            }

            offsets[suit][value] = new Offset(j * -73, i * -98);
        }
    }

    this.getOffset = function(suit, value){ 
        return offsets[suit][value];
    };
};