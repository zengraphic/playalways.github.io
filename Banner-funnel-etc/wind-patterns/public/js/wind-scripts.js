var w$ = jQuery.noConflict();
w$(document)
    .ready(function() {

        Waves
            .attach('.btn', [
                'waves-button', 'waves-float', "waves-light"
            ]);
        Waves
            .init({
                // How long Waves effect duration
                // when it's clicked (in milliseconds)
                duration: 450,
                // Delay showing Waves effect on touch
                // and hide the effect if user scrolls
                // (0 to disable delay) (in milliseconds)
                delay: 10
            });

        w$('.selectpicker').selectpicker({
            'size': 6,
            'dropupAuto': false
        });
    });
