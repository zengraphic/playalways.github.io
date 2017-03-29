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
            } else {
                var filtersArray = filters.split(' ');
                $FILTER
                    .setInitialTabs(filtersArray);
            }

            return $FILTER;
        },
        setInitialTabs: function(filtersArray) {
            var $FILTER = this;

            $.each(filtersArray, function(i, filterVal) {
                console.log(filterVal);
                $FILTER
                    .tabs
                    .each(function() {
                        if(){
                            
                        }
                    });
            });
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
                    $cardsContainer
                        .parent()
                        .trigger("combo-change", [filtersData]);

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
                .initFilter($filterDOMObject, "ricaricabile rate", true, false);
        });

})(jQuery);
