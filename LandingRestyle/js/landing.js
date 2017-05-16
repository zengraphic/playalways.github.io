jQuery(document).ready(function($) {
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
                $(this).removeClass('active')
            }
        });
    });

});

    function loadSlick() {
        $('.slider__device').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: "<img class='slider__navigation right__arrow' src='../img/icons-interface/slider_arrow_right.png'>",
            prevArrow: "<img class='slider__navigation left__arrow' src='../img/icons-interface/slider_arrow_left.png'>",
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
