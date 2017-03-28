jQuery(function($) {


    var HEADER = {
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
            prevArrow: '<a class="prev">&lt;</a>',
            nextArrow: '<a class="next">&gt;</a>',
            variableWidth: true,
            responsive: [{
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
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
        scrollableElement: undefined,
        primaryNavElement: undefined,
        secondaryNavElement: undefined,
        activeElements: undefined,
        activeElementsWidth: 0,
        initHeader: function($headerElement) {
            var theHeader = this;

            theHeader
                .setHeaderItems($headerElement);

            return theHeader;

        },
        setHeaderItems: function($headerElement) {
            var theHeader = this;

            theHeader.scrollableElement = $headerElement.parents('.windtre__scrollable');
            theHeader.containerElement = $headerElement.find('.windtre__primary-nav');
            theHeader.primaryNavElement = $headerElement.find('.windtre__primary-nav__links');
            theHeader.secondaryNavElement = $headerElement.find('.windtre__secondary-nav__links');

            theHeader
                .initScroll(theHeader.scrollableElement)
                .initStickyHeader(theHeader.containerElement)
                .initPrimaryNav(theHeader.primaryNavElement)
                .initSecondaryNav(theHeader.secondaryNavElement);

            return theHeader;
        },
        initScroll: function($scrollableElement) {
            var theHeader = this;
            $scrollableElement
                .niceScroll(theHeader.scrollConfig);
            return theHeader;
        },
        initStickyHeader: function($containerElement) {
            var theHeader = this;
            var sticky = new Waypoint.Sticky({
                element: $containerElement
            });
            return theHeader;
        },
        initPrimaryNav: function($primaryNavElement) {
            var theHeader = this;
            $primaryNavElement
                .not($primaryNavElement[0])
                .hide();
            $primaryNavElement
                .not(':hidden')
                .slick(theHeader.primaryNavConfig);

            $('.nav_link--label', '#header')
                .on('click', function(event) {
                    event
                        .preventDefault();
                    $clickedLink = $(this);
                    theHeader
                        .handleClick($clickedLink);

                });
            return theHeader;
        },
        initSecondaryNav: function($secondaryNavElement) {
            var theHeader = this;
            $secondaryNavElement
                .slick(theHeader.secondaryNavConfig);
            return theHeader;
        },
        handleClick: function($clickedLink) {
            var theHeader = this;

            var $clickedLinkListItem = $clickedLink.parent('.windtre__primary-nav__link');

            var logoElementWidth = $('.windtre__primary-nav__logo').outerWidth();
            var langElementWidth = $('.windtre__primary-nav__language').outerWidth();



            if ($clickedLinkListItem.hasClass('active')) {

                theHeader.activeElements = $($clickedLinkListItem.find('.active').addBack().get().reverse());
                theHeader
                    .activeElements
                    .each(function() {
                        var $currentActive = $(this);
                        
                        theHeader
                            .handleLevel($currentActive);

                    });

                theHeader
                    .handleActiveWidths();

                $clickedLinkListItem
                    .siblings('.windtre__primary-nav__link')
                    .show();

                $clickedLinkListItem
                    .closest('.windtre__primary-nav__links')
                    .css({
                        'width': 'calc(100% - ' + logoElementWidth + 'px - ' + langElementWidth + 'px - ' + theHeader.activeElementsWidth + ')'
                    })
                    .slick(theHeader.primaryNavConfig);
            } else {

                $clickedLinkListItem
                    .addClass('active');

                theHeader
                    .handleActiveWidths();

                $clickedLinkListItem
                    .parent('.slick-initialized')
                    .slick('unslick');
                $clickedLinkListItem
                    .siblings()
                    .hide();

                $clickedLinkListItem
                    .find('.windtre__primary-nav__links')
                    .eq(0)
                    .show()
                    .css({
                        'width': 'calc(100% - ' + logoElementWidth + 'px - ' + langElementWidth + 'px - ' + theHeader.activeElementsWidth + ')'
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

            return theHeader;

        },
        handleActiveWidths: function() {
            var theHeader = this;
            theHeader.activeElementsWidth = 0;
            $('#header')
                .find('active')
                .each(function() {
                    theHeader.activeElementsWidth += $(this).outerWidth();
                });
            return theHeader;
        }
    };

    $(document)
        .ready(function() {

            var $headerElement = $('#header');
            HEADER
                .initHeader($headerElement);

        });



});
