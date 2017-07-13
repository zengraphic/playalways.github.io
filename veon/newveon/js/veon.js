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

    // function checkVideoSize(videoWidth, videoHeight, winWidth, winHeight) {

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
    }

    storeOS();
    initSliders();
});
