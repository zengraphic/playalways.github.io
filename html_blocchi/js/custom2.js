/**
 * Custom scri
pts:
 * inputs, placeholder...
 */



var r$ = jQuery.noConflict();
r$(function() {
    r$('.base__input').focus(function() {
        r$(this).data('placeholder', r$(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function() {
        r$(this).attr('placeholder', r$(this).data('placeholder'));
    });
});

r$("html").mouseover(function() {
    r$(".base__scrollable").getNiceScroll().resize();
});

r$(function() {
    r$('ul[data-role=acordeon] li.title').on('click', function(e) {
        if (r$(window).width() < 768) {
            e.preventDefault();
            var display = r$(r$(this).siblings()[1]).css('display');
            r$('ul[data-role=acordeon] li:not(.title)').slideUp();
            if (display == 'none') {
                r$(r$(this).siblings()).slideDown();
            }
        } else {
            r$(r$(this).siblings()).slideDown();
        }
    });

    r$(window).on('resize', function() {
        if (r$(window).width() >= 768) {
            r$(r$('ul[data-role=acordeon] li.title').siblings()).show();
        } else {
            r$(r$('ul[data-role=acordeon] li.title').siblings()).hide();
        }
    });

});



/* Validation number (Ricarica) - not affect placeholder */
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9.\t\r\b]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
/* end validation number */

function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};

/* validate credentials */

// validate insert phone
r$(document).ready(function() {
    var input = r$("#pecuperoCredenziali input")
    var boton = r$("#pecuperoCredenziali button")
    input.keyup(function() {
        if (r$(this).val().length >= 7) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 7) {
            boton.attr('disabled', '');
        }
    })
});
// end validate insert phone

// validate insert email
r$(document).ready(function() {
    var input = r$("#recuperoCredenziali input")
    var boton = r$("#recuperoCredenziali button")
    input.keyup(function() {
        console.log()
        if (!ValidateEmail(input.val())) {
            console.log("Invalid email address.");
            boton.attr('disabled', '');
        } else {
            boton.removeAttr('disabled');
        }
    })
});



// validate insert code > 4 digit
r$(document).ready(function() {
    var input = r$("#CodiceDiSicurezza input")
    var boton = r$("#CodiceDiSicurezza button")
    input.keyup(function() {
        if (r$(this).val().length >= 4) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 4) {
            boton.attr('disabled', '');
        }
    })
});
// end validate insert code > 4 digit

// validate inputs passwords
r$(document).ready(function() {
    var winput = r$("#NuovaPassword input.wPass")
    var cinput = r$("#NuovaPassword input.cPass")
    var boton = r$("#NuovaPassword button")
    cinput.keyup(function() {
        if ((winput.val()) == cinput.val()) {
            boton.removeAttr('disabled');
        } else {
            boton.attr('disabled', '');
        }
    })
});
// end validate inputs passwords

/* end validate credentials */


r$(document).ready(function() {
    /* Breadcrumbs mobile */
    var breadcums_action = (function() {
        r$('.base__breadcrumbs').each(function() {
            var liItems = r$(this);
            var Sum = 0;

            if (liItems.children('li').length >= 1) {
                r$(this).children('li').each(function(i, e) {
                    Sum += r$(e).outerWidth(true);
                });
                r$(this).width(Sum + 20);
            }
        });
    });
    breadcums_action();
    r$(window).resize(function() {
        if (r$(".base__scrollable2").length > 0) {
            breadcums_action();
            r$(".base__scrollable2").getNiceScroll(0).doScrollLeft(350, 500);
        }
    });

});
/* end Breadcrumbs mobile */

/* Multiple actions with ready function dependece */
r$(document).ready(function() {
    /*Configurazione*/
    r$('#action_c1').click(function() {
        r$('.action_c1').fadeIn("slow")
    });
    r$('#action_1').click(function() {
        r$('#action_1-1').fadeIn("slow");
    });

    /* if access in Mac, inject class to body to resolve bug safari */
    if (navigator.platform == "MacIntel") {
        r$("body").addClass("mac");
    }
    /* end detect Mac */

    /* action map */
    r$('.check_cont_action, .close_checkcont').click(function() {
        r$('.check_cont').slideToggle('fast');
    });

    /*sostenibilita*/
    r$('.sostebilita_list li a').click(function() {
        r$('.sostebilita_list li a').removeClass('active_btn');
        r$(this).addClass('active_btn');
        r$(this).parent().find(".second_list").slideToggle("slow")
    });

    /* assitence */
    r$('.cont__answer ul a').click(function() {
        r$(this).each(function() {
            var destination = r$(this).attr("href");
            r$(destination).fadeIn(800);
            r$(this).parent().parent().parent().css('display', 'none')
        });
    });

    /* cookies action */
    r$('.btn__close_c').click(function() {
        r$('#cookies').fadeOut("slow");
    });

    /* checkbox confirmation email action*/
    r$('#emailnotification').click(function() {
        r$('.email_confirmation').slideToggle(100);
    });

    /* slider products */
    r$('.bxslider').bxSlider({
        pagerCustom: '#bx-pager'
    });
    r$('.base__scrollable').css('overflow', 'overlay');
    r$('.detail li').click(function() {
        r$('.detail li').removeClass("active_action");
        r$(this).addClass("active_action");
        r$(this).find(".cont_detail").fadeIn("slow");
    });

    r$('.security_cc').click(function() {
        r$(".tooltip").css("display", "none");
    });
    r$('.base__input').click(function() {
        r$(".tooltip").css("display", "none");
    });
    r$('.btn-alert').click(function() {
        r$(".box__alert").fadeIn("xslow");
    });
    r$('.btn-alert_out').click(function() {
        r$(".box__alert").fadeOut("xslow");
    });

    //close dialog squadra
    r$('.btn_close').click(function() {
        r$(".tab-pane").fadeOut("slow");
        r$(".squadra__content-data").removeClass("active");
        r$(".squadra__content-data a").removeAttr('aria-expanded');
        r$(".sostebilita_dialog").fadeOut("xshow");
    });
    r$('#scopri_test').click(function() {
        r$(".sostebilita_dialog").fadeIn("xshow");
    });
    r$('.btn_close').click(function() {
        r$(".sostebilita_dialog").fadeOut("xshow");
    });

    //setTimeout(function(){
    r$('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        responsive: [{

        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 680,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    r$('.responsive2').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    // Enabled buttom Ricarica
    // r$('.name_cc, .number_cc, .security_cc').keyup(function() {
    //     if (r$('.name_cc').val() != '' && r$('.number_cc').val() != '' && r$('.security_cc').val() != '') {
    //         r$('.btn_refil').removeAttr('disabled');
    //     } else {
    //         r$('.btn_refil').attr('disabled');
    //     }
    // });

    // Position Footer Bottom
    var window_height = r$(window).height();
    var page_height = r$('html').height() + 53;
    // If the content is small, the footer stays at the bottom
    if (page_height < window_height) {
        r$('#footer').css('position', 'absolute');
        r$('#footer').css('bottom', 53);
        r$('#footer').css('z-index', 5);
    }
    // If the content is large, the footer follows the end and separated 2rem
    else {
        r$('#footer').css('margin-top', 28);
    }

});

// animation to load timiline in nostra storia
r$(function() {
    // var ScrollReveal;
    if (typeof ScrollReveal === 'undefined') {} else {
        window.sr = ScrollReveal();
        //config
        sr.reveal('.reveal-left', {
            duration: 500,
            origin: 'left',
            distance: '20%',
            delay: 0,
            opacity: 0,
            scale: 0,
            easing: 'ease',
            reset: true,
            useDelay: 'always',
            viewFactor: 0.2,
            viewOffset: {
                top: 200,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        sr.reveal('.reveal-right', {
            duration: 500,
            origin: 'right',
            distance: '20%',
            delay: 0,
            opacity: 0,
            scale: 0,
            easing: 'ease',
            reset: true,
            useDelay: 'always',
            viewFactor: 0.2,
            viewOffset: {
                top: 200,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        sr.reveal('.tl-circ, .tldate', {
            duration: 500,
            origin: 'bottom',
            distance: '5px',
            delay: 0,
            opacity: 0,
            scale: 0,
            easing: 'ease',
            reset: true,
            useDelay: 'always',
            viewFactor: 0.2,
            viewOffset: {
                top: 200,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
    }

});
