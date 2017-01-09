MYTICKET = {};

jQuery(document).ready(function($) {

    var cards = [];


    MYTICKET.setFilter = function(object) {
        var filter = object.data('filter');
        $('.card_filter__block__tabs--title').each(function(index) {
            $(this).removeClass('active');
        });
        object.addClass('active');
        MYTICKET.showCities(filter);
    };

    MYTICKET.initializeCards = function() {
        $('.myTicket_block__single').each(function(index, value) {
            letterToMatch = $(this).find('.myTicket_block__single--vCard--mainTitle').data('city');
            content = {};
            content.position = index;
            content.html = value;
            content.letter = letterToMatch;
            cards.push(content);
        });
    };

    MYTICKET.removeThisBlock = function(object) {
        object.remove();
    };

    MYTICKET.overlayHide = function() {
        $('.overlay_myTicket__container').hide();
    };

    MYTICKET.appendAllCards = function() {
        for (k = 0; k < cards.length; k++) {
            savedCard = $(cards[k].html).prop('outerHTML');
            $(savedCard).addClass('matched').appendTo('.myTicket_container_append');
        }
        MYTICKET.removeAllCards('fading');
    };

    MYTICKET.removeAllCards = function(fade) {
        $('.myTicket_block__single').each(function(index, value) {
            if (!$(this).hasClass('matched')) {
                if (fade != 'fading') {
                    $(this).animate({
                        left: 1200
                    }, 500, function() {
                        MYTICKET.removeThisBlock($(this));
                    });
                } else {
                    $(this).hide();
                }
            } else {
                // TweenLite.to( $(this), 0.5, {left: 0});
                $(this).animate({
                    left: 0
                }, 500);
                $(this).removeClass('matched');
            }
        });
    };


    MYTICKET.showCities = function(filter) {
        var lettersToCheck = [];
        var letterToMatch;
        var savedCard;
        switch (filter) {
            case 'AD':
                lettersToCheck = ['a', 'b', 'c', 'd'];
                break;
            case 'EI':
                lettersToCheck = ['e', 'f', 'g', 'h', 'i'];
                break;
            case 'LO':
                lettersToCheck = ['l', 'm', 'n', 'o'];
                break;
            case 'PS':
                lettersToCheck = ['p', 'q', 'r', 's'];
                break;
            case 'TZ':
                lettersToCheck = ['t', 'u', 'v', 'z'];
                break;
        }
        // for(i=0; i < cards.length; i++){
        //     console.log("position: " + cards[i].position + " html: " + cards[i].html + " letter:" + cards[i].letter);
        // }
        console.log(cards.length);
        for (k = cards.length - 1; k >= 0; k--) {
            for (i = lettersToCheck.length - 1; i >= 0; i--) {
                if (lettersToCheck[i] == cards[k].letter) {
                    savedCard = $(cards[k].html).prop('outerHTML');
                    $(savedCard).addClass('matched').prependTo('.myTicket_container_append');
                    console.log('MATCHED ' + cards[k].letter + " " + cards[k].position);
                    //console.log($(cards[k].html).prop('outerHTML'));
                }
            }

        }
        MYTICKET.removeAllCards();
    };

    MYTICKET.initializeCards();

    $('.card_filter__block__tabs--title').click(function() {
        MYTICKET.setFilter($(this));
    });

    $('.card_filter__block__tabs--remove_filter').click(function() {
        MYTICKET.appendAllCards($(this));
    });

    $('.myTicket_container_append').on('click', '.button_myTicket', function() {
        var position = $(this).offset();
        var infoBox = $('.overlay_myTicket__container');
        var dataInfo = $(this).find('.myTicket_block__single--vCard--info').prop('outerHTML');
        infoBox.append(dataInfo);
        infoBox.show();
        $('.overlay_myTicket__container .myTicket_block__single--vCard--info').show();
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        $(dataInfo).animate({
            top: 0
        }, 1000);
        $(infoBox).animate({
            top: 0
        }, 1000);
    });

    $('.overlay_button').click(function() {
        var infoBox2 = $('.overlay_myTicket__container');
        $(infoBox2).animate({
            top: '-100%'
        }, 500, function() {
            MYTICKET.overlayHide();
        });
    });

});
