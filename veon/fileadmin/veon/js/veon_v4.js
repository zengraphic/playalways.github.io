jQuery(document).ready(function($) {
    // Returns true if the specified element has been scrolled into the viewport.

    function jumpToUrl() {

        var currentHash = window.location.hash;
        if (currentHash == "#faq_veon") {
            var anchorTag = $("#faq_veon");
            console.log(anchorTag);
            $('html,body').animate({
                scrollTop: anchorTag.offset().top
            }, 'slow');
        }

    }

    function checkVideoSize(videoWidth, videoHeight, winWidth, winHeight) {
        $('.video_main').width('92vw');
        $('.video_main').height('auto');
        $('.video_preview').height($('.video_main').height());
        $('.video_preview').width($('.video_main').width());
       $('html,body').animate({
            scrollTop: $('.video_main').offset().top - ($(window).height() - $('.video_main').outerHeight(true)) / 2
        }, 200, function() {
            $('.video_main')[0].play();
        });
    }

    function fixFontIOS() {
        is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
        is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        is_safari = navigator.userAgent.indexOf("Safari") > -1;
        is_opera = navigator.userAgent.indexOf("Presto") > -1;
        is_mac = (navigator.userAgent.indexOf('Mac OS') != -1);
        is_windows = !is_mac;

        if (is_chrome && is_safari) {
            is_safari = false;
        }

        if (is_safari) {
            $('h1').css('-webkit-text-stroke', '0.5px');
            console.log('this');
        }
    }

    function storeOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            //WP
        } else if (/android/i.test(userAgent)) {
            //Android
            $('.appstore_button').css('display', 'none');
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //iOS
            $('.gplay_button').css('display', 'none');
        }
    }

    function initSliders() {
        $('.slider_1').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='/fileadmin/veon/img/ic_arrow_right.png'>",
            prevArrow: "<img class='slider_navigation left_arrow' src='/fileadmin/veon/img/ic_arrow_left.png'>",
            dotsClass: 'slider_dots',
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="slide_single"></div>';
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    appendDots: $('#dotsTop_one')
                }
            }]
        });

        $('.slider_2').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='/fileadmin/veon/img/ic_arrow_right.png'>",
            prevArrow: "<img class='slider_navigation left_arrow' src='/fileadmin/veon/img/ic_arrow_left.png'>",
            dotsClass: 'slider_dots',
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="slide_single"></div>';
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    appendDots: $('#dotsTop_two')
                }
            }]
        });
    }

    function isElementInViewport(elem) {
        var $elem = $(elem);

        // Get the scroll position of the page.
        var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
        var viewportTop = $(scrollElem).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // Get the position of the element on the page.
        var elemTop = Math.round($elem.offset().top);
        var elemBottom = elemTop + $elem.height();

        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
    }

    // Check if it's time to start the animation.
    function checkAnimation_left() {
        var count = 0;
        $('.to_animate_left').each(function() {
            var $elem = $(this);

            // If the animation has already been started
            if ($elem.hasClass('fadeInLeftBig')) return;

            if (isElementInViewport($elem)) {
                // Start the animation
                $elem.addClass('animated');
                $elem.addClass('fadeInLeftBig');
            }
            // count = count + 1;
            // console.log(count);
        });
    }

    function checkAnimation_right() {
        $('.to_animate_right').each(function() {
            var $elem = $(this);

            // If the animation has already been started
            if ($elem.hasClass('fadeInRightBig')) return;

            if (isElementInViewport($elem)) {
                // Start the animation
                $elem.addClass('animated');
                $elem.addClass('fadeInRightBig');
            }
        });
    }

    // Capture scroll events
    $(window).scroll(function() {
        checkAnimation_left();
        checkAnimation_right();
    });

    $(window).resize(function() {
        if ($('.video_main').hasClass('video_open')) {
            console.log('resizing');
            var videoWidth = $('.video_main').width();
            var videoHeight = $('.video_main').height();
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            checkVideoSize(videoWidth, videoHeight, winWidth, winHeight);
        }
    });

    $('.block').click(function() {
        var elem = $(this);
        $(elem).addClass('slideFaq');
        $('.block').each(function() {
            if (!$(this).hasClass('slideFaq')) {
                $(this).find('.info').slideUp();
            } else {
                $(elem).find('.info').slideDown();
                $(elem).removeClass('slideFaq');
            }
        });
    });

    $('.show_more_faq').click(function() {
        $('.more_faq_container').slideDown();
        $('.show_less_faq').slideDown();
        $(this).slideUp();
    });
    $('.show_less_faq').click(function() {
        $('.more_faq_container').slideUp();
        $(this).slideUp();
        $('.show_more_faq').slideDown();
    });

    $('.video_play').click(function() {
        var videoWidth = $('.video_main').width();
        var videoHeight = $('.video_main').height();
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        console.log('videoW: ' + videoWidth + ' videoH: ' + videoHeight + ' windowW: ' + winWidth + ' windowH: ' + winHeight);
        $('.video_overlay').fadeIn();
        $('.video_preview').fadeIn();
        $('.video_preview').height($('.video_main').height());
        $('.video_preview').width($('.video_main').width());
        $('.video_main').fadeIn();
        $('.video_main').addClass('video_open');
        $('body').addClass('video_noscroll');
        checkVideoSize(videoWidth, videoHeight, winWidth, winHeight);
    });

    $('.video_overlay').click(function() {
        $('.video_overlay').fadeOut();
        $('.video_preview').fadeOut();
        $('.video_main').fadeOut();
        $('.video_main').removeClass('video_open');
        $('body').removeClass('video_noscroll');
        $('.video_main')[0].pause();
    });
    //=================== EASTER EGG ===================//
    //=================== EASTER EGG ===================//
    //=================== EASTER EGG ===================//
    function makeNewPosition() {

        // Get viewport dimensions (remove the dimension of the div)
        var h = $(window).height() - 50;
        var w = $(window).width() - 50;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh, nw];

    }

    function animateDiv(elem) {
        var newq = makeNewPosition();
        $(elem).css('position', 'absolute');
        $(elem).animate({ top: newq[0], left: newq[1] }, function() {
            animateDiv(elem);
        });

    };

    function flashingScreen() {
        setTimeout(function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            console.log(color);
            $('.veon_wrapper').css('background-color', color);
            flashingScreen();
        }, 200);
    }
    var kkeys = [],
        konami = "38,38,40,40,37,39,37,39,66,65";

    $(document).keydown(function(e) {
        kkeys.push(e.keyCode);

        if (kkeys.toString().indexOf(konami) >= 0) {

            $(document).unbind('keydown', arguments.callee);

            // do something awesome
            flashingScreen();
            $('h1').each(function() {
                animateDiv($(this));
            });
            $('h6').each(function() {
                animateDiv($(this));
            });
            $('img').each(function() {
                animateDiv($(this));
            });
        }

    });
    //=================== EASTER EGG ===================//
    //=================== EASTER EGG ===================//
    //=================== EASTER EGG ===================//
    fixFontIOS();
    storeOS();
    initSliders();
    jumpToUrl();
});
