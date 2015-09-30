var Deck = function(){
    var cards = [];

    var SUITS = PAOTrainer.SUITS;
    var VALUES = PAOTrainer.VALUES;

    // Create the 52 card deck
    for (var i = 0; i < SUITS.length; i++){
        for (var j = 0; j < VALUES.length; j++){
            var card = new Card(SUITS[i], VALUES[j]);
            cards.push(card);
        }
    }

    cards = _.shuffle(cards); 

    this.draw = function(){ 
        return cards.shift();
    } 
}