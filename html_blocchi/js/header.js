;
(function(r$) {

    'use strict';

    r$(document)
        .ready(function() {


            HEADER
                .setSlider();

        });

    var HEADER = {
        resizeTimer: false,
        slickConfig: {
            slide: 'li',
            centerMode: false,
            dots: false,
            arrows: false,
            speed: 300,
            swipeToSlide: true,
            infinite: false,
            slidesToShow: 5,
            variableWidth: true,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [{
                breakpoint: 560,
                settings: {
                    centerMode: true,
                    centerPadding: "50px",
                    initialSlide: 0,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, ]
        },
        setSlider: function() {
            var $HEADER = this;

            r$('#header')
                .find('.header_second')
                .affix({
                    offset: {
                        top: 43,

                    }
                });

            $HEADER
                .bindEvents();

            var $slideshow = r$('.slider_topMenu').slick($HEADER.slickConfig);

            r$('.slider_topMenu')
                .animate({
                    'opacity': 1
                }, 500);

            $HEADER
                .checkHeader();
        },
        setHeader: function() {
            var $HEADER = this;
            var width = 0;
            r$('.menu_sup li')
                .each(function() {
                    var $this = r$(this);
                    width += $this.outerWidth();
                });
            width = (width + 90) + 'px';
            return (width);
        },
        checkHeader: function() {
            var $HEADER = this;
            var firstCheck = $HEADER.setHeader();
            var secondCheck = $HEADER.setHeader();
            if (firstCheck >= secondCheck) {
                r$('.menu_sup')
                    .width(firstCheck);
            } else {
                r$('.menu_sup')
                    .width(secondCheck);
            }
        },
        bindEvents: function() {
            var $HEADER = this;
            r$('.open_sidebar_button, .btn_entra')
                .click(function() {
                    r$("html, body")
                        .animate({ scrollTop: 0 }, "fast");
                    return false;
                });
            r$('.gradient_overlay')
                .click(function() {
                    $slideshow
                    .slick('slickGoTo', parseInt($slideshow.slick('slickCurrentSlide')) + 1);
                });
            r$('.quick_links')
                .click(function() {
                    if (r$('#header').find('.quick_links').hasClass('active')) {

                        r$('.header_second .menu')
                            .slideUp('fast', function() {
                                r$('.header .logo')
                                    .slideDown(100);
                                r$('#header')
                                .find('.quick_links')
                                .removeClass('active');
                            });
                    } else {
                        r$('.header .logo')
                            .slideUp('fast', function() {
                                r$('.header_second .menu')
                                    .slideDown();
                                r$('#header')
                                    .find('.quick_links')
                                    .addClass('active');
                            });
                    }
                });
            r$(window)
                .resize(function() {
                    //alert('ciao');
                    clearTimeout($HEADER.resizeTimer);
                    $HEADER.resizeTimer = setTimeout(function() {

                        $HEADER
                        .checkHeader();
                        //HEADER.resizeHeader(); function deleted cause on mobile the browsers fires resize on scroll
                        r$('.slider_topMenu')
                            .slick('resize');

                        if (r$(window).width() > 768) {
                            r$('#header')
                            .find('.quick_links')
                            .removeClass('active');
                            r$('.header_second .menu')
                                .slideDown();
                            r$('.header .logo')
                                .slideDown();
                        } else {}

                    }, 150);

                });
        }
    };


})(jQuery);
