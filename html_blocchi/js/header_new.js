;
(function(r$) {

    'use strict';

    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }


            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    r$(document)
        .ready(function() {
            var $headerDomObject = r$('#header');
            HEADER
                .init($headerDomObject);
        });

    var HEADER = {
        headerSlickConfig: {
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        },
        headerContainer: false,
        headerSup: false,
        headerSupElements: false,
        init: function($headerDomObject) {
            var $HEADER = this;
            $HEADER
                .setHeaderElements($headerDomObject);

            $HEADER
                .bindEvents();

            $HEADER
                .resizeHeader();



            var $slideshow = r$('.slider_topMenu');

            $slideshow
                .slick($HEADER.headerSlickConfig);

            $HEADER
                .checkHeader();

            r$('.slider_topMenu')
                .animate({
                    'opacity': 1
                }, 500);

            return $HEADER;
        },
        setHeaderElements: function($headerDomObject) {
            var $HEADER = this;

            $HEADER.headerContainer = $headerDomObject;
            $HEADER.headerSup = $HEADER.headerContainer.find('.slider_topMenu');
            $HEADER.headerSupElements = $HEADER.headerSup.find('li');
            $HEADER.headerMain = $HEADER.headerContainer.find('.menu-right');
            $HEADER.headerMainElements = $HEADER.headerMain.find('a');

            return $HEADER;


        },
        setHeader: function() {
            var $HEADER = this;
            var width = 0;
            r$('.menu_sup')
                .find('li')
                .each(function() {
                    var $this = r$(this);
                    width += $this.outerWidth();
                });
            width = (width + 90) + 'px';
            console.log(width);
            return (width);

            return $HEADER;

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
        resizeHeader: function() {
            var $HEADER = this;
            var headerHeight = r$('#header').height();
            r$('.margin_top_header')
                .css('margin-top', headerHeight);
        },

        bindEvents: function() {
            var $HEADER = this;
            r$('.open_sidebar_button')
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

            r$(window)
                .resize(function() {
                    //alert('ciao');
                    $HEADER
                        .checkHeader();
                    //HEADER.resizeHeader(); function deleted cause on mobile the browsers fires resize on scroll
                    $('.slider_topMenu')
                        .slick('resize');
                });

            r$(window)
                .scroll(function() {
                    if (r$(window).width() > 768) {
                        if (r$(document).scrollTop() > 100) {

                            r$(".header_sup")
                                .slideUp();
                        } else {
                            r$(".header_sup")
                                .slideDown();
                        }
                    } else { //se E' MOBILE
                        if (r$(document).scrollTop() > 100) {

                            r$('.header_second .menu')
                                .slideUp('fast', function() {
                                    r$('.header .logo')
                                        .slideDown(100);
                                });
                        } else {
                            r$('.header .logo')
                                .slideUp('fast', function() {
                                    r$('.header_second .menu')
                                        .slideDown();
                                });
                        }
                    }
                });
        }
    };


})(jQuery);
