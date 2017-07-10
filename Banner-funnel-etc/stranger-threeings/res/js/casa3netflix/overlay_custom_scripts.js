function dissolveOverlay() {
    var particlesPromise =
        $('#particles-js-1,#particles-js-2,#particles-js-3')
        .fadeOut(600);
    var overlayHeaderPromise =
        $('.overlay-header')
        .fadeOut(600);


    $.when(particlesPromise, overlayHeaderPromise)
        .then(function() {
            $('.particles-background')
                .fadeOut(600)
                .css({
                    'cursor': 'default'
                });
        });
}

jQuery(document)
    .ready(function($) {
        particlesJS
            .load('particles-js-1', 'js/particlesjs-config-1.json');

        particlesJS
            .load('particles-js-2', 'js/particlesjs-config-2.json');

        particlesJS
            .load('particles-js-3', 'js/particlesjs-config-3.json');

        $("body")
            .mousemove(function(e) {
                $(".particles-background")
                    .css('background-position', (e.pageX - 1920) + 'px ' + (e.pageY - 1800) + 'px');
            });

        setTimeout(function() {
            $('.logo-3, .logo-netflix,.action-switch')
                .addClass('text-flicker-in-glow');

            setTimeout(function() {
                $('.overlay-banner')
                    .fadeIn(1000);
            }, 3000);
        }, 4000);


        $('#s3inger_things--container')
            .on({
                'click': function(event) {
                    event
                        .preventDefault();
                    dissolveOverlay();

                }
            }, '.action-switch')
            .on({
                'click': function() {
                    dissolveOverlay();

                }
            }, '#particles-js-1, .overlay-header');

        $(window).on('load resize', function() {
            var wWidth = $(window).outerWidth();
            var $packImg = $('.pack-image');
            var packImg = $packImg.attr('src');
            if (wWidth <= 360) {

                if (window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2)')) {
                    if (!packImg.match('pack-medium')) {
                        $packImg.attr('src', 'res/imgs/casa3netflix/pack-medium.png');
                    }
                } else {
                    if (!packImg.match('pack-small')) {
                        $packImg.attr('src', 'res/imgs/casa3netflix/pack-small.png');
                    }
                }


            } else if (wWidth > 360 && wWidth <= 640 && window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2)')) {
                if (!packImg.match('pack-medium')) {
                    $packImg.attr('src', 'res/imgs/casa3netflix/pack-medium.png');
                }

            } else if (wWidth > 640) {
                if (!packImg.match('pack-large')) {
                    $packImg.attr('src', 'res/imgs/casa3netflix/pack-large.png');
                }
            }
        });
    });
