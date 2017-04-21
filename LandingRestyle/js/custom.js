/**
 * Custom scripts:
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

/* validate credentials */

// validate insert phone
r$(document).ready(function() {
    var input = r$("#pecuperoCredenziali input");
    var boton = r$("#pecuperoCredenziali button");
    input.keyup(function() {
        if (r$(this).val().length >= 7) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 7) {
            boton.attr('disabled', '');
        }
    });
});
// end validate insert phone

// validate insert email
r$(document).ready(function() {
    var input = r$("#recuperoCredenziali input");
    var boton = r$("#recuperoCredenziali button");
    input.keyup(function() {
        console.log();
        if (!ValidateEmail(input.val())) {
            console.log("Invalid email address.");
            boton.attr('disabled', '');
        } else {
            boton.removeAttr('disabled');
        }
    });
});


function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}
// end validate insert email


function controlMail() {
    var input = r$(".refill_notification input");
    if (input.val() !== '') {
        if (!ValidateEmail(input.val())) {
            console.log("Invalid email address.");
            r$('.notificationMail').addClass('error');
            r$('.refill_notification .notificationMail + span').addClass('error');
            r$('.refill_notification .notificationMail + span').text('Email non valida');
            return false;
        } else {
            r$('.notificationMail').removeClass('error');
            r$('.refill_notification .notificationMail + span').removeClass('error');
            return true;
        }
    } else {
        r$('.notificationMail').removeClass('error');
        r$('.refill_notification .notificationMail + span').removeClass('error');
        return true;
    }

}
r$(document).ready(function() {


    //on keyup, start the countdown
    r$('.refill_notification input').keyup(function() {
        r$(this).val(r$(this).val().toLowerCase());

    });

    r$('.refill_notification input').blur(function() {
        checkNextStep();

    });

    r$('.refill_notification input').focus(function() {
        r$('.notificationMail').removeClass('error');
        r$('.refill_notification .notificationMail + span').removeClass('error');

    });

});
// validate insert code > 4 digit
r$(document).ready(function() {
    var input = r$("#CodiceDiSicurezza input");
    var boton = r$("#CodiceDiSicurezza button");
    input.keyup(function() {
        if (r$(this).val().length >= 4) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 4) {
            boton.attr('disabled', '');
        }
    });
});
// end validate insert code > 4 digit

// validate inputs passwords
r$(document).ready(function() {
    var winput = r$("#NuovaPassword input.wPass");
    var cinput = r$("#NuovaPassword input.cPass");
    var boton = r$("#NuovaPassword button");
    cinput.keyup(function() {
        if ((winput.val()) == cinput.val()) {
            boton.removeAttr('disabled');
        } else {
            boton.attr('disabled', '');
        }
    });
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

function clearCard(inputToClear, cvvToClear) {
    if (inputToClear) {
        r$(inputToClear).removeClass('americane_cc');
        r$(inputToClear).removeClass('diners_cc');
        r$(inputToClear).removeClass('visa_cc');
        r$(inputToClear).removeClass('maestro_cc');
        r$(inputToClear).removeClass('masterc_cc');
        r$(inputToClear).removeClass('general_cc');
        r$(inputToClear).removeClass('aura_cc');
    }
    if (cvvToClear) {
        console.log(cvvToClear);
        r$(cvvToClear).removeClass('cvv_carta');
        r$(cvvToClear).removeClass('cvv_amex');
    }
}

function checkCard(card) {
    var c = card;
    var cl = parseInt(c.substr(c.length - 1));
    c = c.slice(0, -1);
    c = c.split("").reverse().join("");
    c = c.split("");
    var a = 2;
    var cm = [];
    for (i = 0; i < c.length; i++) {
        if (a % 2 === 0) {
            var t = c[i] * 2;
            if (t > 9) {
                t = (t - 9);
            }
            cm.push(t);
        } else {
            cm.push(parseInt(c[i]));
        }
        a++;
    }
    var f = 0;
    for (i = 0; i < cm.length; i++) {
        f += cm[i];
    }
    f = f + cl;
    if (f % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

function checkDate() {
    var minMonth = new Date().getMonth() + 1;
    var minYear = new Date().getFullYear();
    var month = parseInt(r$('.select_cc[title="Mese"] option:selected').text(), 10);
    var year = parseInt(r$('.select_cc[title="Anno"] option:selected').text(), 10);


    if (isNaN(month)) {
        console.log('seleziona anche il mese');
        $wind('.select_mese .select_cc:first-child').addClass('error');
        $wind('.select_mese .select_cc + span').addClass('error');
        $wind('.select_mese .select_cc + span').text('Seleziona il mese');
        return (false);


    } else {
        $wind('.select_mese .select_cc:first-child').removeClass('error');
        $wind('.select_anno .select_cc:first-child').removeClass('error');
        $wind('.select_cc + span').removeClass('error');

        if (year > minYear) {
            console.log('anno lontano');
            $wind('.select_mese .select_cc:first-child').removeClass('error');
            $wind('.select_anno .select_cc:first-child').removeClass('error');
            $wind('.select_cc + span').removeClass('error');
            return (true);


        } else if (year === minYear) {
            if (month > minMonth) {
                console.log('scadenza ok');
                $wind('.select_mese .select_cc:first-child').removeClass('error');
                $wind('.select_anno .select_cc:first-child').removeClass('error');
                $wind('.select_cc + span').removeClass('error');
                return (true);



            } else {
                console.log('data antecedente');
                $wind('.select_mese .select_cc:first-child').addClass('error');
                $wind('.select_mese .select_cc + span').addClass('error');
                $wind('.select_mese .select_cc + span').text('Il mese inserito non è corretto');

                return (false);
            }
        }
    }
}



/* Multiple actions with ready function dependece */
r$(document).ready(function() {
    /*Configurazione*/
    r$('#action_c1').click(function() {
        r$('.action_c1').fadeIn("slow");
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
        r$(this).parent().find(".second_list").slideToggle("slow");
    });

    /* assitence */
    r$('.cont__answer ul a').click(function() {
        r$(this).each(function() {
            var destination = r$(this).attr("href");
            r$(destination).fadeIn(800);
            r$(this).parent().parent().parent().css('display', 'none');
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
    //r$('.base__scrollable').css('overflow', 'overlay');
    r$('.detail li').click(function() {
        r$('.detail li').removeClass("active_action");
        r$(this).addClass("active_action");
        r$(this).find(".cont_detail").fadeIn("slow");
    });
    r$("#action_cc1").click(function() {
        r$(".cont__action-cc1").fadeIn("slow");
        r$("#action_cc1").css('display', 'none');
    });
    var timer = 500;
    r$("#option_cc1").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").addClass("active");
        r$("#action_c1").getNiceScroll().resize();
        r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });
    r$("#option_cc2").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").addClass("active");
        r$("#action_c1").getNiceScroll().resize();
        r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });
    r$("#option_cc1b").click(function() {
        //r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").addClass("active");
        r$("#action_c1").getNiceScroll().resize();
        //r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });
    r$("#option_cc2b").click(function() {
        //r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").addClass("active");
        r$("#action_c1").getNiceScroll().resize();
        //r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });

    r$("#option1").click(function() {
        r$("#action_c1 .cont_item1").slideDown(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").addClass("active");
        r$("#action_c1").getNiceScroll().resize();
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });
    r$("#option2").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideDown(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").removeClass("active");
        r$("#action_c2").addClass("active");
        r$("#action_c2").getNiceScroll().resize();
        r$("#action_c3").removeClass("active");
        r$("#action_c4").removeClass("active");
    });
    r$("#option3").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideDown(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").addClass("active");
        r$("#action_c3").getNiceScroll().resize();
        r$("#action_c4").removeClass("active");
    });
    r$("#option3").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideDown(timer);
        r$("#action_c4 .cont_item1").slideUp(timer);
        r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").addClass("active");
        r$("#action_c3").getNiceScroll().resize();
        r$("#action_c4").removeClass("active");
    });
    r$("#option4").click(function() {
        r$("#action_c1 .cont_item1").slideUp(timer);
        r$("#action_c2 .cont_item1").slideUp(timer);
        r$("#action_c3 .cont_item1").slideUp(timer);
        r$("#action_c4 .cont_item1").slideDown(timer);
        r$("#action_c1").removeClass("active");
        r$("#action_c2").removeClass("active");
        r$("#action_c3").removeClass("active");
        r$("#action_c4").addClass("active");
        r$("#action_c4").getNiceScroll().resize();
    });



    r$('#input_cc').blur(function() {
        var carta = r$('#input_cc').val().replace(/\s/g, '');
        var result = checkCard(carta);
        if (result) {
            // write your own rules if true
            $wind('.number_cc').removeClass('error');
            $wind('.number_cc + span').removeClass('error');
        } else {
            // write your own rules if false
            $wind('.number_cc').addClass('error');
            $wind('.number_cc + span').addClass('error');
            $wind('.number_cc + span').text('Numero di carta non valido');
        }
    });

    r$('#input_cc').focus(function() {


        // write your own rules if true
        r$('.number_cc').removeClass('error');
        r$('.number_cc + span').removeClass('error');
        r$('.select_cc').removeClass('error');

    });


    // Four digits validation (RICARICA) to display simbol credit card
    r$('#input_cc').on('change , keyup', function(e) {
        var value = r$('#input_cc').val();
        var card = 'general_cc';
        //american express -> 37
        //aura -> 5078
        //diners -> 30 -> 38
        //maestro -> 6759 -> 6761 -> 5038
        //mastercard -> 55 -> 51
        //visa -> 41 -> 40
        if (value.length >= 2) {
            var firstDigits = value.substr(0, 2);
            var firstDigits2 = value.substr(0, 3);
            console.log(firstDigits);
            switch (firstDigits) {
                case '37':
                case '34':
                    card = 'americane_cc';
                    break;
                case '30':
                case '38':
                    card = 'diners_cc';
                    break;
                case '55':
                case '51':
                    card = 'masterc_cc';
                    break;
                case '40':
                case '41':
                case '42':
                case '43':
                case '44':
                case '45':
                case '46':
                case '47':
                case '48':
                case '49':
                    card = 'visa_cc';
                    break;
                case '50':
                    if (firstDigits2 == '507') {
                        card = "aura_cc";
                    }
                    if ((firstDigits2 == '501') || (firstDigits2 == '502') || (firstDigits2 == '503')) {
                        card = "maestro_cc";
                    }
                    break;
                case '67':
                    card = "maestro_cc";
                    break;

            }

            if (card == 'americane_cc') {
                r$('#security_cc').attr('maxlength', 4);

            } else {
                r$('#security_cc').attr('maxLength', 3);
            }

            clearCard('#input_cc', false);
            r$("#input_cc").addClass(card);
            r$(".visa_cc").fadeIn(10);
            r$(".tooltip").css("display", "none");
            if (r$('#input_cc').hasClass('americane_cc')) {
                clearCard(false, '#security_cc');
                r$('#security_cc').addClass('cvv_amex');
                r$('.cvv_amex').fadeIn(10);
            } else {
                clearCard(false, '#security_cc');
                r$('#security_cc').addClass('cvv_carta');

            }

        } else {
            clearCard('#input_cc', '#security_cc');
        }
        console.log("lunghezza:" + value.length);

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
        //r$('#footer').css('margin-top', 28);
    }

});


r$(function() {
    r$('#select-prueba').on('change', function() {
        var timer = 500;
        switch (r$(this).val()) {
            case 'option1':
                r$("#action_c1").slideDown(timer);
                r$("#action_c2").slideUp(timer);
                r$("#action_c3").slideUp(timer);
                r$("#action_c4").slideUp(timer);
                break;
            case 'option2':
                //alert( 2 );
                r$("#action_c1").slideUp(timer);
                r$("#action_c2").slideDown(timer);
                r$("#action_c3").slideUp(timer);
                r$("#action_c4").slideUp(timer);
                break;
            case 'option3':
                //alert( 3 );
                r$("#action_c1 ").slideUp(timer);
                r$("#action_c2").slideUp(timer);
                r$("#action_c3").slideDown(timer);
                r$("#action_c4").slideUp(timer);
                break;
            case 'option4':
                //alert( 3 );
                r$("#action_c1 ").slideUp(timer);
                r$("#action_c2").slideUp(timer);
                r$("#action_c3").slideUp(timer);
                r$("#action_c4").slideDown(timer);
                break;
        }
    });
});

function checkNextStep() {
    var radioCC = $wind('.credit_card_main_radio input[type="radio"]'); // carta predefinita
    var subRadioCC = $wind('.optional_card input[type="radio"]'); // seconda carta inserita
    var radioPay = $wind('.paypal_main_radio input[type="radio"]'); //paypal
    var radioCharge = $wind('.charge_main_radio input[type="radio"]'); //addebito su conto radio apertura
    var radioBill = $wind('.bill_main_radio input[type="radio"]'); //addebito su conto telefonico radio apertur
    var subRadioBill = $wind('.item_bill input[type="radio"]'); // contratto
    var subRadioCharge = $wind('.item_charge input[type="radio"]'); // conto
    var subRadioNewCard = $wind('.newCard_main_radio input[type="radio"]'); // nuva carta
    var securityCC = $wind('#security_cc');

    $wind('.top_up_button_final').prop("disabled", true);

    if ($wind('.action_numbert').hasClass('entered')) {
        if (checkNewNumber()) {
            if ((radioCC.is(':checked') ||
                    (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
                    (subRadioCC.is(':checked')) ||
                    (radioPay.is(':checked')) ||
                    (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
                    (subRadioBill.is(':checked') && radioBill.is(':checked'))) &&
                (controlMail())) {
                if (radioPay.is(':checked')) {
                    $wind('#paypal-checkbox').attr('checked', true);
                }
                $wind('.top_up_button_final').prop("disabled", false);
            }
        }
    } else {
        if ((radioCC.is(':checked') ||
                (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
                (subRadioCC.is(':checked')) ||
                (radioPay.is(':checked')) ||
                (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
                (subRadioBill.is(':checked') && radioBill.is(':checked'))) &&
            (controlMail())) {
            if (radioPay.is(':checked')) {
                $wind('#paypal-checkbox').attr('checked', true);
            }
            $wind('.top_up_button_final').prop("disabled", false);
        }
    }


    // if ((checkNewNumber() == true)) {
    //     if (radioPay.is(':checked')) {
    //         console.log('paypal checked');
    //         $wind('.top_up_button_final').prop("disabled", false);
    //         alert('b');
    //     }

    //     // if (subRadioCharge.is(':checked') && (radioCharge.is(':checked'))) {
    //     //     console.log('addebito checked');
    //     //     $wind('.top_up_button_final').prop("disabled", false);

    //     // }
    //     // if (subRadioBill.is(':checked') && (radioBill.is(':checked'))) {
    //     //     console.log('addebito conto tel checked');
    //     //     $wind('.top_up_button_final').prop("disabled", false);

    //     // }
    //     // if (($wind('#input_cc').val().length > 8) && subRadioNewCard.is(':checked') && radioCC.is(':checked') && securityCC.val().length >= 3) {
    //     //     $wind('.top_up_button_final').prop("disabled", false);
    //     // }
    // }
}

function checkNewNumber() {
    var mainNumber = $wind('.number_top_up').val();
    var confirmNumber = $wind('.number_top_up_confirm').val();
    if ((!$wind('.number_top_up_confirm').is(':focus')) && ((confirmNumber.length > 0) && (mainNumber.length > 0))) {
        if ((mainNumber.length >= 6) && (confirmNumber.length >= 6) && (mainNumber == confirmNumber)) {
            $wind('.number_top_up_confirm').removeClass('error');
            $wind('.number_top_up_confirm + span').removeClass('error');
            return (true);
        } else {
            $wind('.number_top_up_confirm').addClass('error');
            $wind('.number_top_up_confirm + span').addClass('error');
            $wind('.number_top_up_confirm + span').text('Controlla che i numeri siano uguali');
            return (false);
        }
    } else {
        return (false);
    }
}

function checkNewCreditCard() {
    var radioCC, securityCC, value;
    radioCC = $wind('.newCard_main_radio input[type="radio"]');
    securityCC = $wind('#security_cc');
    value = $wind('#input_cc').val();
    value = value.replace(/\s/g, '');
    console.log(value);
    if ((value.length > 13) && (checkCard(value)) && (checkDate()) && (radioCC.is(':checked')) && (securityCC.val().length >= 3)) {
        return true;
    } else {
        return false;
    }
}

r$(function() {
    r$('#select_numbert').on('change', function() {
        if (r$(this).find('option:selected').is(':last-child')) {
            r$(".action_numbert").fadeIn("fast").addClass('entered');
            r$('.top_up_button_final').prop("disabled", true);
        } else {
            r$(".action_numbert").fadeOut("fast").removeClass('entered');
            checkNextStep();

        }
        // switch (r$(this).val()) {
        //     case 'option1':
        //         //alert( 1 );
        //         r$(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option2':
        //         //alert( 2 );
        //         r$(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option3':
        //         //alert( 3 );
        //         r$(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option4':
        //         //alert( 3 );
        //         r$(".action_numbert").fadeIn("fast");
        //         r$('.top_up_button_final').prop("disabled", true);
        //         break;
        // }
    });
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
