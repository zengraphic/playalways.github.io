HEADER = {};

jQuery(document).ready(function($) {
    HEADER.setHeader = function() {
        var width = 0;
        $('.menu_sup li').each(function() {
            var $this = $(this);
            width += $this.outerWidth();
        });
        width = (width + 90) + 'px';
        return (width);
    }

    HEADER.checkHeader = function() {
        var firstCheck = HEADER.setHeader();
        var secondCheck = HEADER.setHeader();
        if (firstCheck >= secondCheck) {
            $('.menu_sup').width(firstCheck);
        } else {
            $('.menu_sup').width(secondCheck);
        }
        console.log(firstCheck + " " + secondCheck);
    }

    HEADER.resizeHeader = function() {
        var headerHeight = $('#header').height();
        console.log(headerHeight);
        $('.margin_top_header').css('margin-top', headerHeight);
    }

    HEADER.setSlider = function() {
        $('.open_sidebar_button, .btn_entra').click(function() {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            return false;
        });
        $('.gradient_overlay').click(function() {
            $slideshow.slick('slickGoTo', parseInt($slideshow.slick('slickCurrentSlide')) + 1);
        });
        HEADER.resizeHeader();
        $slideshow = $('.slider_topMenu').slick({
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
                        centerMode: false,
                        initialSlide: 0,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        HEADER.checkHeader();
        $('.slider_topMenu')
          .animate({
            opacity: 1
          },500);
    };



    $(window).resize(function() {
        //alert('ciao');
        HEADER.checkHeader();
        HEADER.resizeHeader();
        $('.slider_topMenu').slick('resize');
    });

    $(window).scroll(function() {
        if ($(window).width() > 768) {
            if ($(document).scrollTop() > 100) {

                $(".header_sup").slideUp();
            } else {
                $(".header_sup").slideDown();
            }
        } else { //se E' MOBILE
            if ($(document).scrollTop() > 100) {

                $('.header_second .menu').slideUp('fast', function() {
                    $('.header .logo').slideDown(100);
                });
            } else {
                $('.header .logo').slideUp('fast', function() {
                    $('.header_second .menu').slideDown();
                });
            }
        }
    });

});
