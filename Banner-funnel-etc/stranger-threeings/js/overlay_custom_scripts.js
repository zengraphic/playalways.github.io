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

                    var particlesPromise =
                        $('#particles-js-1,#particles-js-2,#particles-js-3')
                        .fadeOut(1000);
                    var overlayHeaderPromise =
                        $('.overlay-header')
                        .fadeOut(1000);


                    $.when(particlesPromise, overlayHeaderPromise)
                        .then(function() {
                            $('.particles-background')
                                .fadeOut(1000)
                                .css({
                                    'cursor': 'default'
                                });
                        });
                }
            }, '.action-switch');


    });
