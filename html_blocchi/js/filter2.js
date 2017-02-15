jQuery(document).ready(function($) {

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

    //Dinamica dei bottoni dei filtri e dinamica cards
    function activeBtns(btn) {
        
        console.log('dinamica bottoni entrata sx' + btnSx + ' dx' + btnDx);

        if (btn.hasClass('active') && (!btn.parents('[class*="__tabs__container"]').hasClass('locked'))) {
            btn.removeClass('active');
            if (btn.hasClass('tab_rightFilter')) {
                btnDx = 0;
            } else {
                btnSx = 0;
            }
            btn.parents('.tab_links__container').find('.tab_button.active').each(function() {
            if ($(this).hasClass('active')) {
                if ($(this).hasClass('tab_rightFilter')) {
                    btnDx = $(this).data('filter');
                } else {
                    btnSx = $(this).data('filter');
                }
            }else{}
        });

        } else { //se non ha classe
            if (btn.siblings().hasClass('active')) {
                //se altro active
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
         console.log('dinamica bottoni fine 2 sx' + btnSx + ' dx' + btnDx);
    }
    //Mostra le carte associate alle variabili btnDx btn Sx per il document ready
    function showCards(btns) {
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
        btnSx = 0;
        btnDx = 0;
    }


    $('.tab_links__container').each(function() {
        var tab = $(this).find('.tab_button');

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
        console.log('document ready sx' + btnSx + ' dx' + btnDx);
        showCards(tabActive);

    });

    $('.home_page').on({
        'click': function() {
            var $self = $(this);
            activeBtns($self);

        }
    }, '.tab_button');

});
