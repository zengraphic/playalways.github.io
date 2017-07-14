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
        $('.veon_slider_container').slick({
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='../img/icon-NEXT.png'>",
            prevArrow: "<img class='slider_navigation left_arrow' src='../img/icon-BACK.png'>",
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

    storeOS();
    initSliders();
});
