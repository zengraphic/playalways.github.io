jQuery(document).ready(function($) {
    var btnSx = 0;
    var btnDx = 0;
    var $cards = $('div[class*="tab_link_"]');
    $('div[class*="__showMore"]').click(function() {
        var thisItem = $(this);
        $(this).parents('.tab_cards__container').find($cards).each(function(index) {
            if ($(this).hasClass('card_visible')) {
                $(this).show();
            }
            thisItem.hide();
        });
    });



    function manageCardShow(element) {
        element.show();
        element.addClass('card_visible');
    }

    function manageCardHide(element) {
        element.hide();
        element.removeClass('card_visible');
    }

    function cardShow(cards) {
        cards.each(function() {
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

                $(this).parents('.tab_cards__container').find('div[class*="__showMore"]').hide();
            }
        });
        if (cards.not(':hidden').length > 3) {
            cards.not(':hidden').slice(3).hide();
            cards.parents('.tab_cards__container').find('div[class*="__showMore"]').show();
        } else {
            $card.parents('.tab_cards__container').find('div[class*="__showMore"]').hide();
        }
    }


    function showCards(btn) {

        if (btn.hasClass('active') && (!btn.parents('[class*="__tabs__container"]').hasClass('locked'))) {
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
                btnDx = btn.data('filter');
            } else {
                btnSx = btn.data('filter');
            }
        }
        var $card = btn.parents('.tab_links__container').siblings('.tab_cards__container').find('div[class*="tab_link_"]');
        cardShow($card);


    }

    function showCards2(btns) {
        var $card = btns.parents('.tab_links__container').siblings('.tab_cards__container').find('div[class*="tab_link_"]');
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

                $(this).parents('.tab_cards__container').find('div[class*="__showMore"]').hide();
            }
        });
        if ($card.not(':hidden').length > 3) {
            $card.not(':hidden').slice(3).hide();
            $card.parents('.tab_cards__container').find('div[class*="__showMore"]').show();
        } else {
            $card.parents('.tab_cards__container').find('div[class*="__showMore"]').hide();
        }

    }

    //fine funzione
    //ogni componente
    var btnSx = 0;
    var btnDx = 0;
    $('.tab_links__container').each(function() {

        var tab = $(this).find('.tab_button');
        //se nessuno ha la classe active fai partire showcards col bottone altrimenti
        tab.each(function() {
            if ($(this).hasClass('active')) {
                if ($(this).hasClass('tab_rightFilter')) {
                    btnDx = $(this).data('filter');
                } else {
                    btnSx = $(this).data('filter');
                }
            }
        });
        var tabActive = $(this).find('.tab_button.active')
        console.log('sx' + btnSx + ' dx' + btnDx);
        var $card = tabActive.parents('.tab_links__container').siblings('.tab_cards__container').find('div[class*="tab_link_"]');
        showCards2(tabActive);


    });
    var btnSx = 0;
    var btnDx = 0;
    $('.home_page').one('ready', function() {

    });

    //fine
    $('.home_page').on({
        'click': function() {
            var $self = $(this);
            showCards($self);
        }
    }, '.tab_button');
});
