jQuery(document).ready(function($) {

    var $cards = $('div[class*="tab_link_"]');

    $('div[class*="__showMore"]').click(function() {
        var thisItem = $(this);
        $cards.each(function(index) {
            if ($(this).hasClass('card_visible')) {
                $(this).show();
            }
            thisItem.hide();
        });
    });
    var $card = $('div[class*="tab_link_"]');
    var btnSx = 0;
    var btnDx = 0;
    function manageCardShow(element) {
        element.show();
        element.addClass('card_visible');
    }
    function manageCardHide(element) {
        element.hide();
        element.removeClass('card_visible');
    }
    function showCards(btn) {
        if (btn.hasClass('active')) {
            btn.removeClass('active');
            if (btn.hasClass('tab_rightFilter')) {
                btnDx = 0;
            } else {
                btnSx = 0;
            }
        } else { //se non ha classe
            if (btn.siblings().hasClass('active')) { //se altro active
                //rimuovi la classe agli altri btn presenti
                btn.siblings('.active').removeClass('active');
            } //se altro active fine

            btn.addClass('active');
            if (btn.hasClass('tab_rightFilter')) {
                btnDx = btn[0].id;
            } else {
                btnSx = btn[0].id;
            }
        }
        //$card.show();
        $card.each(function() {
            if (btnSx == 0) {
                if ($(this).hasClass(btnDx)) {
                    manageCardShow($(this));
                } else {
                    manageCardHide($(this));
                }
            }
            if (btnDx == 0) {
                if ($(this).hasClass(btnSx)) {
                    manageCardShow($(this));
                } else {
                    manageCardHide($(this));
                }
            }
            if ((btnDx != 0) && (btnSx != 0)) {
                if ($(this).hasClass(btnDx) && $(this).hasClass(btnSx)) {
                    manageCardShow($(this));
                } else {
                    manageCardHide($(this));
                }
            }
            if ((btnDx == 0) && (btnSx == 0)) {
                manageCardShow($(this));

                $('div[class*="__showMore"]').hide();
            }
        });
        console.log($card.not(':hidden').length);
        if ($card.not(':hidden').length > 3) {
            $card.not(':hidden').slice(3).hide();
            $('div[class*="__showMore"]').show();
        } else {
            $('div[class*="__showMore"]').hide();
        }
    }
    //fine funzione
    $('.home_page').on({
        'click': function() {
            var $self = $(this);
            showCards($self);
        }
    }, 'span[class*="__tabs--title"]');
});