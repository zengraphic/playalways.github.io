jQuery(function($) {

    $(document)
        .ready(function() {

            var $headerElement = $('#header');
            HEADER
                .initHeader($headerElement);

        });

    HEADER = {
        scrollConfig: {
            cursorcolor: "#F4F4F4",
            cursorwidth: "5px",
            cursorborder: "0",
            mousescrollstep: 60,
            background: "#292F36",
            spacebarenabled: false,
            horizrailenabled: false,
            autohidemode: false,
            zindex: 900
        },
        primaryNavConfig: {
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            centerPadding: 0,
            prevArrow: '<a class="prev">&lt;</a>',
            nextArrow: '<a class="next">&gt;</a>',
            variableWidth: true,
            responsive: [{
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        },
        secondaryNavConfig: {
            arrows: false,
            infinite: false,
            slidesToShow: 4,
            prevArrow: '<a class="prev">&lt;</a>',
            nextArrow: '<a class="next">&gt;</a>',
            variableWidth: true,
            responsive: [{
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        },
        headerElement: undefined,
        scrollableElement: undefined,
        primaryNavElement: undefined,
        secondaryNavElement: undefined,
        activeElements: undefined,
        activeElementsWidth: 0,
        logoElementWidth: 0,
        languageElementWidth: 0,
        route: undefined,
        initHeader: function($headerElement, pathname) {
            var theHeader = this;
            theHeader
                .setHeaderItems($headerElement)
                .initScroll()
                .initStickyHeader()
                .initSecondaryNav()
                .initPrimaryNav()
                .handleRoute($headerElement, pathname);
            return theHeader;
        },
        handleRoute: function($headerElement, pathname) {
            var theHeader = this;
            if (typeof pathname === "undefined") {
                pathname = window.location.pathname;
            }


            var $leafLinks = $headerElement.find('a.leaf-link');

            $leafLinks
                .each(function() {
                    if ($(this).attr('href') == pathname) {
                        var $currentLink = $(this);
                        $currentLink
                            .addClass('current');
                        var $pathLinks = $($currentLink.parents('.windtre__primary-nav__links').get().reverse());

                        var time = 200;
                        $pathLinks
                            .each(function(i) {
                                var theLink = $(this).siblings('.nav_link');
                                if (i > 0) {
                                    window.setTimeout(function() {
                                        theLink
                                            .trigger('click');
                                    }, time);
                                    time += 200;
                                }
                            });
                    }
                });

            return theHeader;
        },
        setHeaderItems: function($headerElement) {
            var theHeader = this;

            theHeader.headerElement = $headerElement;
            theHeader.scrollableElement = $headerElement.parents('body.windtre__scrollable');
            theHeader.containerElement = $headerElement.find('.windtre__primary-nav');
            theHeader.primaryNavElement = $headerElement.find('.windtre__primary-nav__links');
            theHeader.secondaryNavElement = $headerElement.find('.windtre__secondary-nav__links');
            if ((window.location.pathname != "/windtre-header/root/") && (window.outerWidth < 480)) {
                theHeader
                    .handleHomeButton('small');
            } else {
                theHeader
                    .handleHomeButton('big');
            }
            theHeader.logoElementWidth = $headerElement.find('.windtre__primary-nav__logo').outerWidth(true);
            theHeader.languageElementWidth = $headerElement.find('.windtre__primary-nav__language').outerWidth(true);

            return theHeader;
        },
        handleHomeButton: function(size) {
            var theHeader = this;
            if (size == 'small') {
                theHeader
                    .headerElement
                    .find('.windtre__primary-nav__logo')
                    .find('.logo')
                    .hide();
                theHeader
                    .headerElement
                    .find('.windtre__primary-nav__logo')
                    .find('.home-icon')
                    .show();
            } else {
                theHeader
                    .headerElement
                    .find('.windtre__primary-nav__logo')
                    .find('.logo')
                    .show();
                theHeader
                    .headerElement
                    .find('.windtre__primary-nav__logo')
                    .find('.home-icon')
                    .hide();
            }
            return theHeader;
        },
        initScroll: function() {
            var theHeader = this;
            theHeader.scrollableElement
                .niceScroll(theHeader.scrollConfig);
            return theHeader;
        },
        initStickyHeader: function() {
            var theHeader = this;
            var sticky = new Waypoint.Sticky({
                element: theHeader.containerElement
            });
            return theHeader;
        },
        initSecondaryNav: function() {
            var theHeader = this;
            theHeader.secondaryNavElement
                .slick(theHeader.secondaryNavConfig);
            return theHeader;
        },
        initPrimaryNav: function() {
            var theHeader = this;

            theHeader
                .primaryNavElement
                .each(function(i) {
                    var $currentNav = $(this);
                    if (i == 0) {
                        var remainingWidth = theHeader.headerElement.outerWidth() - theHeader.logoElementWidth - theHeader.languageElementWidth - 4;
                        $currentNav
                            .show()
                            .css({
                                'width': remainingWidth,
                            })
                            .slick(theHeader.primaryNavConfig);
                    } else {
                        $currentNav
                            .hide();
                    }
                });

            theHeader
                .bindClick()
                .bindResize();
            return theHeader;
        },

        bindClick: function() {
            var theHeader = this;
            $('.nav_link', '#header')
                .on('click', function(event) {
                    $clickedLink = $(this);
                    if (!$clickedLink.hasClass('leaf-link')) {
                        event
                            .preventDefault();

                        theHeader
                            .handleClick($clickedLink);
                    }

                });
            return theHeader;
        },
        bindResize: function() {
            var theHeader = this;
            /* empty space for debounced resize event */
            return theHeader;
        },
        handleClick: function($clickedLink) {
            var theHeader = this;

            var $clickedLinkListItem = $clickedLink.parent('.windtre__primary-nav__link');
            var remainingWidth = 0;

            if ($clickedLinkListItem.hasClass('active')) {

                $clickedLinkListItem
                    .removeClass('active')
                    .siblings()
                    .show();

                if ($clickedLinkListItem.hasClass('base-level')) {
                    theHeader.activeElements = undefined;
                    theHeader.activeElementsWidth = 0;
                } else {
                    $clickedLinkListItem
                        .parent()
                        .prev()
                        .show()
                        .parent()
                        .addClass('active');
                    theHeader.activeElements = $clickedLinkListItem.parent().prev();
                    theHeader
                        .handleActiveWidths();
                }
                remainingWidth = $('#header').outerWidth() - theHeader.logoElementWidth - theHeader.languageElementWidth - theHeader.activeElementsWidth - 4;
                $clickedLinkListItem
                    .parent()
                    .css({
                        'width': remainingWidth
                    })
                    .slick(theHeader.primaryNavConfig);

                $clickedLink
                    .next()
                    .hide()
                    .slick('unslick');
            } else {

                if (typeof theHeader.activeElements !== 'undefined') {
                    theHeader
                        .activeElements
                        .hide()
                        .parent('.windtre__primary-nav__link')
                        .removeClass('active');
                    remainingWidth = $('#header').outerWidth() - theHeader.logoElementWidth - theHeader.languageElementWidth - 6;
                    theHeader
                        .activeElements
                        .next('.windtre__primary-nav__links')
                        .css({
                            'width': remainingWidth
                        });
                }
                theHeader.activeElements = $clickedLink;


                $clickedLinkListItem
                    .addClass('active')
                    .closest('.slick-initialized')
                    .slick('unslick');
                $clickedLinkListItem
                    .siblings()
                    .hide();
                $clickedLink
                    .next()
                    .show(function() {
                        theHeader
                            .handleActiveWidths();
                        var remainingWidth = $('#header').outerWidth() - theHeader.logoElementWidth - theHeader.languageElementWidth - theHeader.activeElementsWidth - 6;
                        $(this)
                            .css({
                                'width': remainingWidth
                            })
                            .children()
                            .show();
                    })
                    .slick(theHeader.primaryNavConfig);
            }

            return theHeader;
        },
        handleLevel: function($currentActive) {
            var theHeader = this;

            $currentActive
                .removeClass('active');

            $currentActive
                .find('.slick-initialized')
                .eq(0)
                .slick('unslick')
                .hide();

            $currentActive
                .siblings()
                .hide();

            if (!$currentActive.hasClass('base-level')) {
                $currentActive
                    .hide();
            }

            return theHeader;

        },
        handleActiveWidths: function() {
            var theHeader = this;
            theHeader.activeElementsWidth = 0;
            theHeader
                .activeElements
                .each(function() {
                    theHeader.activeElementsWidth += ($(this).outerWidth(true) + 2);
                });
            return theHeader;
        }
    };
});
