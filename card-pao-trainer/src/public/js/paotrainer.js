$(document).ready(function(){

    var currentThreeCards = null;

    var cardToImageMapper = new CardToImageMapper();

    var getExpectedText = function(card1, card2, card3) {
        var suitValuePairs = PAOTrainer.SUIT_VALUE_MAPPING;

        var first = suitValuePairs[card1.suit][card1.value];
        var token1 = first.split(" ")[0];

        var second = suitValuePairs[card2.suit][card2.value];
        var token2 = second.split(" ")[1];

        var third = suitValuePairs[card3.suit][card3.value];
        var token3 = third.split(" ")[2];

        var expected = token1 + " " + token2 + " " + token3;
        return expected;
    }

    var drawThreeNewCards = function(){
        var deck = new Deck();
        var cards = [];
        cards.push(deck.draw());
        cards.push(deck.draw());
        cards.push(deck.draw());
        return cards;
    }

    var displayCards = function(threeCardList){
        $("#cards").html("");
        var $cards = $("#cards");

        var card1 = threeCardList[0];
        var card2 = threeCardList[1];
        var card3 = threeCardList[2];

        var offset1 = cardToImageMapper.getOffset(card1.suit, card1.value);
        var offset2 = cardToImageMapper.getOffset(card2.suit, card2.value);
        var offset3 = cardToImageMapper.getOffset(card3.suit, card3.value);
        var $i1 = $("<div class='card'></div>");
        $i1.css("background", "url(images/cards.png) "+offset1.x+" "+offset1.y);
        $i1.css("width", "73px");
        $i1.css("height", "100px");
        $i1.css("min-height", "1px");
        $cards.append($i1);

        var $i2 = $("<div class='card'></div>");
        $i2.css("background", "url(images/cards.png) "+offset2.x+" "+offset2.y);
        $i2.css("width", "73px");
        $i2.css("height", "100px");
        $i2.css("min-height", "1px");
        $cards.append($i2);

        var $i3 = $("<div class='card'></div>");
        $i3.css("background", "url(images/cards.png) "+offset3.x+" "+offset3.y);
        $i3.css("width", "73px");
        $i3.css("height", "100px");
        $i3.css("min-height", "1px");
        $cards.append($i3);
    }

    var drawAndDisplayThreeCards = function(){
        currentThreeCards = drawThreeNewCards();
        displayCards(currentThreeCards);
    }

    $("#pao").submit(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        var userInput = $("#text").val();

        var expectedText = getExpectedText(
            currentThreeCards[0],
            currentThreeCards[1],
            currentThreeCards[2]);

        isUserInputCorrect = expectedText === userInput;

        if (isUserInputCorrect){
            $("body").css("background-color", "green");
            drawAndDisplayThreeCards();
        }else{
            console.log("Wrong, the correct answer is: " + expectedText)
            $("body").css("background-color", "red");
        }

        $("#text").val("");

        // Animate the flashing color of background
        setTimeout(function(){
            $("body").css("background-color", "white");
        }, 200);

    });
    drawAndDisplayThreeCards();
});
