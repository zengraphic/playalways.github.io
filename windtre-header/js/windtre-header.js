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
        slidesToShow: 1,
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

            $secondaryNav
                .slick(secondaryNavConfig);


            var sticky = new Waypoint.Sticky({
                element: $('.windtre__primary-nav')
            });

            $primaryNav
                .slick(primaryNavConfig);

            $('.nav_link','#header')
                .on('click', function(event) {
                    event.preventDefault();
                    var logo = $('.windtre__primary-nav__logo').outerWidth();
                    var lang = $('.windtre__primary-nav__language').outerWidth();
                    var theParent =$(this).parent().parent().parent();
                    theParent
                        .addClass('active');
                    var actives = $('#header').find('.active');
                    var activesW;
                    actives
                        .each(function() {
                            activesW += $(this).outerWidth();
                        });
                    theParent
                        .parents('.slick-initialized')
                        .slick('unslick');
                    theParent
                        .siblings()
                        .hide();

                    theParent
                        .children('.nav_link--sub')
                        .eq(0)
                        .show()
                        .css({
                            'width': 'calc(100% -'+logo+'px-'+lang+'px-'+activesW+')'
                        })
                        .slick(primaryNavConfig);




                });
        });



});
