jQuery(function($) {
    var scrollConfig = {
        cursorcolor: "#F4F4F4",
        cursorwidth: "5px",
        cursorborder: "0",
        mousescrollstep: 60,
        background: "#292F36",
        spacebarenabled: false,
        horizrailenabled: false,
        autohidemode: false,
        zindex: 900
    };

    var primaryNavConfig = {
        arrows: false,
        infinite: false,
        slidesToShow: 6,
        prevArrow: '<a class="prev">&lt;</a>',
        nextArrow: '<a class="next">&gt;</a>',
        variableWidth: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                //arrows: true,
                centerMode: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    };
    var secondaryNavConfig = {
        arrows: false,
        infinite: false,
        slidesToShow: 4,
        prevArrow: '<a class="prev">&lt;</a>',
        nextArrow: '<a class="next">&gt;</a>',
        variableWidth: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                //arrows: true,
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    };

    $(document)
        .ready(function() {
            var $primaryNav = $('.windtre__primary-nav__links');
            var $secondaryNav = $('.windtre__secondary-nav__links');
            var $scrollable = $('.windtre__scrollable');

            $scrollable
                .niceScroll(scrollConfig);

            $primaryNav
                .slick(primaryNavConfig);
            $secondaryNav
                .slick(secondaryNavConfig);
        });



});
