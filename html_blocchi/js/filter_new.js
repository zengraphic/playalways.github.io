;
(function(r$) {
    'use strict';

    var DOUBLEFILTER = {
        container: false,
        showMore: false,
        tabs: false,
        cards: false,
        isLocked: false,
        filters: [],
        initFilter: function($filterDOMObject, filters, isLocked) {
            var $FILTER = this;

            $FILTER
                .setFilterItems($filterDOMObject, isLocked)
                .bindFilters();

            if (!filters) {
                var $firstTabs = $FILTER.tabs.filter(':first-child');
                $firstTabs
                    .each(function() {
                        var $currentTab = r$(this);
                        $currentTab
                            .click();
                    });
            }

            return $FILTER;
        },
        setFilterItems: function($filterDOMObject, isLocked) {
            var $FILTER = this;

            $FILTER.container = $filterDOMObject;
            $FILTER.showMore = $FILTER.container.find('div[class*="__showMore"]');
            $FILTER.tabs = $FILTER.container.find('.tab_button');
            $FILTER.cards = $FILTER.container.find('.card_item');
            $FILTER.isLocked = (isLocked == undefined) ? false : isLocked;

            return $FILTER;
        },
        bindFilters: function() {
            var $FILTER = this;

            $FILTER
                .showMore
                .on({
                    'click': function() {

                    }
                });
            $FILTER
                .tabs
                .on({
                    'click': function(event) {
                        event
                            .preventDefault();
                        var $clickedTab = r$(this);
                        $FILTER
                            .handleClickedTab($clickedTab);
                    }
                });

            return $FILTER;
        },
        handleClickedTab: function($clickedTab) {
            var $FILTER = this;

            var dataObj = $clickedTab.data();
            if (dataObj.card) {
                $FILTER
                    .handleCards($clickedTab);
            } else {
                $FILTER
                    .handlePlans($clickedTab);
            }

            return $FILTER;
        },
        handleCards: function($cardFilterTab) {
            var $FILTER = this;

            if (!$cardFilterTab.hasClass('active')) {
                var $activeSibling = $cardFilterTab.siblings().filter('.active');
                if ($activeSibling.length > 0) {
                    $activeSibling
                        .removeClass('active');
                    var filterToClean = $activeSibling.data().card;
                    $FILTER.filters = $.grep($FILTER.filters, function(currentFilter) {
                        return filterToClean != currentFilter;
                    });
                }
                $cardFilterTab
                    .addClass('active');
                var cardFilter = $cardFilterTab.data().card;
                $FILTER
                    .filters
                    .push(cardFilter);
                $FILTER
                    .applyFilter();
            }
            return $FILTER;
        },
        applyFilter: function() {
          var $FILTER = this;
          console.log($FILTER.filters);
          return $FILTER;
        },
        handlePlans: function($planFilterTab, operation) {
            var $FILTER = this;
            return $FILTER;
        }
    };

    r$(document)
        .ready(function() {
            var $filterDOMObject = r$('#filter-showcase');

            DOUBLEFILTER
                .initFilter($filterDOMObject, false, true);
        });

})(jQuery);






/*jQuery(document).ready(function($) {

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
        if (btn.hasClass('active') && (!btn.parents('[class*="__tabs__container"]').hasClass('locked'))) {
            btn.removeClass('active');
            if (btn.hasClass('tab_rightFilter')) {
                btnDx = 0;
            } else {
                btnSx = 0;
            }
        } else { //se non ha classe
            if (btn.siblings().hasClass('active')) {
                //se altro active
                //rimuovi la classe agli altri btn presenti
                btn.siblings('.active').removeClass('active');
            } //se altro active fine
            btn.addClass('active');
        }

        checkActive();

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

    function checkActive() {
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
            showCards(tab);
        });
    }
    checkActive();

    $('.home_page').on({
        'click': function() {
            var $self = $(this);
            activeBtns($self);
        }
    }, '.tab_button');

});*/
