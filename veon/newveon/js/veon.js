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

    function checkWindowsVersion() {
        $('.alert_not_compatible').css('display', 'block');
        $('.appstore_button').css('display', 'none');
        $('.gplay_button').css('display', 'none');
        $('.standard_button').css('display', 'none');
    }

    // function checkVideoSize(videoWidth, videoHeight, winWidth, winHeight) {
    function getAndroidVersion(ua) {
        ua = (ua || navigator.userAgent).toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : false;
    };


    function checkAndroidVersion() {
        // getAndroidVersion(); //"4.2.1"

        var versione = getAndroidVersion(); //4
        versione = versione.substring(0, 3);
        if (versione >= 4.1) {
            $('.appstore_button').css('display', 'none');
            $('.standard_button').css('display', 'none');
        } else {
            $('.alert_not_compatible').css('display', 'block');
            $('.appstore_button').css('display', 'none');
            $('.gplay_button').css('display', 'none');
            $('.standard_button').css('display', 'none');
        }
    }

    function checkIosVersion() {
        $('.gplay_button').css('display', 'none');
        $('.standard_button').css('display', 'none');
    }

    function storeOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            checkWindowsVersion();
        } else if (/android/i.test(userAgent)) {
            //Android
            checkAndroidVersion();
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //iOS
            checkIosVersion();
        } else {
            $('.standard_button').css('display', 'block');
            $('.standard_button').css('bottom', '0');
            $('.gplay_button').css('display', 'none');
            $('.appstore_button').css('display', 'none');
        }
    }

    function initSliders() {
        $('.veon_slider_container').slick({
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='../img/icon-NEXT.png'>",
            prevArrow: "<img class='slider_navigation left_arrow hidden' src='../img/icon-BACK.png'>",
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="veon_slide_single"></div>';
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

    function checkWaypoint(element) {
        var waypoint = new Waypoint({
            element: document.getElementById(element),
            handler: function(direction) {
                console.log('Direction: ' + direction)
                if (direction == 'down') {
                    $(".button_veon").animate({
                        bottom: "0"
                    }, 1000, function() {
                        // Animation complete.
                    });
                }
            }
        });
    }

    function initWaypoint() {
        if ($(window).width() < 768) {
            checkWaypoint('buttonWaypointMobile');
        } else {
            $(".button_veon").animate({
                bottom: "0"
            }, 1000, function() {
                // Animation complete.
            });
        }
    }

    $('.veon_slider_container').on('afterChange', function(event, slick, currentSlide) {
        var lastSlide = 4;
        if ($(window).width() > 768) {
            lastSlide = 3;
        }
        if (currentSlide === lastSlide) {
            $('.right_arrow').addClass('hidden');
        }
        if (currentSlide === 0) {
            $('.left_arrow').addClass('hidden');
        }
        if (!((currentSlide == 0) || (currentSlide == lastSlide))) {
            $('.left_arrow').removeClass('hidden');
            $('.right_arrow').removeClass('hidden');
        }
        console.log(currentSlide);
    })
    storeOS();
    initSliders();
    initWaypoint();
});