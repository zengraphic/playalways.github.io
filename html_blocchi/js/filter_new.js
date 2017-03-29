;
(function(r$) {
    'use strict';

    var DOUBLEFILTER = {
        container: false,
        cardContainers: false,
        activeCardContainer: false,
        showMore: false,
        tabs: false,
        cards: false,
        showMoreOn: false,
        isLocked: false,
        filters: [],
        initFilter: function($filterDOMObject, filters, isLocked, showMore) {
            var $FILTER = this;
            $FILTER
                .setFilterItems($filterDOMObject, isLocked, showMore)
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
        setFilterItems: function($filterDOMObject, isLocked, showMore) {
            var $FILTER = this;

            $FILTER.container = $filterDOMObject;
            if (showMore) {
                $FILTER.showMoreOn = showMore;
                $FILTER.showMore = $FILTER.container.find('div[class*="__showMore"]');
                $FILTER.cards = $FILTER.container.find('.card_item');
            }
            $FILTER.tabs = $FILTER.container.find('.tab_button');

            $FILTER.cardContainers = $FILTER.container.find('.tab_cards__container');
            $FILTER.isLocked = (isLocked == undefined) ? false : isLocked;

            return $FILTER;
        },
        bindFilters: function() {
            var $FILTER = this;

            if ($FILTER.showMoreOn) {
                $FILTER
                    .showMore
                    .on({
                        'click': function() {
                            var $clickedShowMore = r$(this);


                            var $relatedCards = $clickedShowMore.parents('.tab_cards__container').find('.card_item');
                            $relatedCards
                                .filter(':hidden')
                                .show();
                            $clickedShowMore
                                .hide();
                        }
                    });
            }
            $FILTER
                .tabs
                .on({
                    'click': function(event) {
                        event
                            .preventDefault();
                        var $clickedTab = r$(this);
                        if (!$clickedTab.is('.disabled')) {
                            $FILTER
                                .handleClickedTab($clickedTab);
                        }

                    }
                });

            return $FILTER;
        },
        handleClickedTab: function($clickedTab) {
            var $FILTER = this;

            /*var cardFilter = $clickedTab.data().filter;
            if (cardFilter == 'abbonamento') {
                console.log('abb');
                $FILTER
                    .tabs
                    .each(function(i) {
                        var $currentTab = r$(this);
                        var currentTabData = $currentTab.data().filter;
                        if (currentTabData == 'unica') {
                            if ($currentTab.is('.active')) {

                                $currentTab
                                    .next()
                                    .trigger('click');
                            }
                            $currentTab
                                .addClass('disabled');
                        }
                    });

            } else {
                $FILTER
                    .tabs
                    .each(function(i) {
                        var $currentTab = r$(this);
                        var currentTabData = $currentTab.data().filter;
                        if (currentTabData == 'unica') {
                            $currentTab
                                .removeClass('disabled');
                        }
                    });
            }*/

            $FILTER
                .handleCards($clickedTab);


            /*var dataObj = $clickedTab.data();
            if (dataObj.card) {
                $FILTER
                    .handleCards($clickedTab);
            } else {
                $FILTER
                    .handlePlans($clickedTab);
            }*/

            return $FILTER;
        },
        handleCards: function($cardFilterTab) {
            var $FILTER = this;

            if (!$cardFilterTab.hasClass('active')) {
                var $activeSibling = $cardFilterTab.siblings().filter('.active');
                var cardFilter = $cardFilterTab.data().filter;
                if ($activeSibling.length > 0) {
                    $activeSibling
                        .removeClass('active');
                    var filterToClean = $activeSibling.data().filter;
                    /*$FILTER.filters = $.grep($FILTER.filters, function(currentFilter) {
                        return filterToClean != currentFilter;
                    });*/
                    r$.each($FILTER.filters, function(i, filter) {
                        if (filter == filterToClean) {
                            $FILTER.filters[i] = cardFilter;
                        }
                    });

                } else {
                    $FILTER
                        .filters
                        .push(cardFilter);

                }
                $cardFilterTab
                    .addClass('active');


                $FILTER
                    .applyFilter();
            }
            return $FILTER;

        },


        applyFilter: function() {
            var $FILTER = this;

            r$.each($FILTER.cardContainers, function() {
                var $cardsContainer = $(this);
                var cardsContainerData = $cardsContainer.data().combo;
                var filtersData = $FILTER.filters.join(' ');
                if (cardsContainerData == filtersData) {
                    $cardsContainer
                        .show();
                } else {
                    if ($cardsContainer.is(':visible')) {
                        if ($FILTER.showMoreOn) {
                            var $relatedCards = $cardsContainer.find('.card_item');
                            var $relatedShowMore = $cardsContainer.find('div[class*="__showMore"]');
                            $relatedCards
                                .each(function(i) {
                                    var $relatedCard = r$(this);
                                    if (i >= 3) {
                                        $relatedCard
                                            .hide();
                                    }
                                });
                            $relatedShowMore
                                .show();
                        }

                    }
                    $cardsContainer
                        .hide();
                }
                /*r$.each($FILTER.filters, function(i, selectedFilters) {
                    if ($.inArray(selectedFilters, cardsContainerData) != -1) {
                        console.log(selectedFilters + ' è uguale a ' + cardsContainerData);

                        //o creo un nuovo array con i valori uguali e poi provo a mostrare


                    } else {

                    }
                });*/

            });
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
                .initFilter($filterDOMObject, false, true, false);
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
