jQuery('body').addClass('landing');

jQuery(document).ready(function($) {
    function checkDevice() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/android/i.test(userAgent)) {
            //Android
            return ('android');
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //iOS
            return ('ios');
        }
    }

    function loadSlickMagnum() {
        $('.slider__device').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/img-landing/icons-interface/slider_arrow_right.png'>",
            prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/img-landing/icons-interface/slider_arrow_left.png'>",
            dotsClass: 'slider__dots',
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="slider__single"></div>';
            },
            responsive: [{
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true
                    }
                }, {
                    breakpoint: 670,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
    // SE C'E' LO SLIDER
    if ($('.slider__device')) {
        loadSlickMagnum();
    }
    // AGGIUNGI LANDING (SAFEGUARD)
    $('body').addClass('landing');

    //TRIGGER LOGIN
    $('.button_shoulder_login').click(function() {
        r$.magnificPopup.open({
            items: {
                src: $('#login')
            }
        });
    });


    //TABS MAGNUM
    $('body').on("click", ".landing__hero__tabs--button", function() {
        var tabNumber = $(this).data('tabn');
        var element = $(this);
        $('.landing__hero__tabs--button').removeClass('active');
        $(this).addClass('active');
        console.log(tabNumber + " " + this);
        $('.hero_tab').each(function() {
            var thisTab = $(this).data('tabtarget');
            console.log(thisTab);
            if (thisTab == tabNumber) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    // TRIGGER ACCORDION NEGOZIO
    $('body').on("click", ".button_open_accordion_store", function() {
        $('.blocco_store_locator').parents('.showcase_accordions_block__single').find('.accordionBox').prop('checked', false);
        $('html, body').animate({
            scrollTop: $(".blocco_store_locator").offset().top
        }, 1000, function() {
            // codice
        });
    });

    //CHECK SMS DATA
    $('body').on("click", ".compile_sms_button", function(e) {
        var smsNumber = $(this).data('smsnumber');
        var smsText = $(this).data('smstext');
        var smsDivider;
        var mergeCode;
        if (checkDevice() == 'android') {
            smsDivider = '?';
        } else {
            smsDivider = '&';
        }
        mergeCode = "sms:" + smsNumber + smsDivider + "body=" + smsText;
        console.log(mergeCode);
        e.preventDefault();        
        location.href = mergeCode;
    });

});
