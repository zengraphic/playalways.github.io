RICARICA = {};

jQuery(document).ready(function($) {

    var popups = {
        paypal:{
            title='',
            description=''
        },
        cc:{
            title='',
            description=''
        },
        ct:{
            title='',
            description=''
        }
        
    }

RICARICA.setRicarica = function(){
	var timer = 500;

	$('#refill_block .item-box .radio input').click(function() {
		// if (!$(this).closest('.item-box').is('active')) {
		// 	$('.item-box.active').removeClass('active').find('.cont_item1').slideUp(timer);

		// }
		var elem = $(this);
		$(elem).addClass('active');

		$('.cont_item1').each(function(){
			if (!$(this).hasClass('active')) {
				$(this).slideUp(timer);
			}else{
				$(this).slideDown(timer);
			}
			
		});
	});

    // $("#option_cc1").click(function() {
    //     $("#action_c1 .cont_item1").slideUp(timer);
    //     $("#action_c2 .cont_item1").slideUp(timer);
    //     $("#action_c3 .cont_item1").slideUp(timer);
    //     $("#action_c4 .cont_item1").slideUp(timer);
    //     $("#action_c1").addClass("active");
    //     $("#action_c1").getNiceScroll().resize();
    //     $("#action_c1").removeClass("active");
    //     $("#action_c2").removeClass("active");
    //     $("#action_c3").removeClass("active");
    //     $("#action_c4").removeClass("active");
    // });
    // $("#option_cc2").click(function() {
    //     $("#action_c1 .cont_item1").slideUp(timer);
    //     $("#action_c2 .cont_item1").slideUp(timer);
    //     $("#action_c3 .cont_item1").slideUp(timer);
    //     $("#action_c4 .cont_item1").slideUp(timer);
    //     $("#action_c1").addClass("active");
    //     $("#action_c1").getNiceScroll().resize();
    //     $("#action_c1").removeClass("active");
    //     $("#action_c2").removeClass("active");
    //     $("#action_c3").removeClass("active");
    //     $("#action_c4").removeClass("active");
    // });

    // $("#option1").click(function() {
    //     $("#action_c1 .cont_item1").slideDown(timer);
    //     $("#action_c2 .cont_item1").slideUp(timer);
    //     $("#action_c3 .cont_item1").slideUp(timer);
    //     $("#action_c4 .cont_item1").slideUp(timer);
    //     $("#action_c1").addClass("active");
    //     $("#action_c1").getNiceScroll().resize();
    //     $("#action_c2").removeClass("active");
    //     $("#action_c3").removeClass("active");
    //     $("#action_c4").removeClass("active");
    // });
    // $("#option2").click(function() {
    //     $("#action_c1 .cont_item1").slideUp(timer);
    //     $("#action_c2 .cont_item1").slideDown(timer);
    //     $("#action_c3 .cont_item1").slideUp(timer);
    //     $("#action_c4 .cont_item1").slideUp(timer);
    //     $("#action_c1").removeClass("active");
    //     $("#action_c2").addClass("active");
    //     $("#action_c2").getNiceScroll().resize();
    //     $("#action_c3").removeClass("active");
    //     $("#action_c4").removeClass("active");
    // });
    // $("#option3").click(function() {
    //     $("#action_c1 .cont_item1").slideUp(timer);
    //     $("#action_c2 .cont_item1").slideUp(timer);
    //     $("#action_c3 .cont_item1").slideDown(timer);
    //     $("#action_c4 .cont_item1").slideUp(timer);
    //     $("#action_c1").removeClass("active");
    //     $("#action_c2").removeClass("active");
    //     $("#action_c3").addClass("active");
    //     $("#action_c3").getNiceScroll().resize();
    //     $("#action_c4").removeClass("active");
    // });
    // $("#option4").click(function() {
    //     $("#action_c1 .cont_item1").slideUp(timer);
    //     $("#action_c2 .cont_item1").slideUp(timer);
    //     $("#action_c3 .cont_item1").slideUp(timer);
    //     $("#action_c4 .cont_item1").slideDown(timer);
    //     $("#action_c1").removeClass("active");
    //     $("#action_c2").removeClass("active");
    //     $("#action_c3").removeClass("active");
    //     $("#action_c4").addClass("active");
    //     $("#action_c4").getNiceScroll().resize();
    // });

}

RICARICA.showPopup = function(){

}

RICARICA.checkNumber = function(){
	
}

RICARICA.checkPayment = function(){
	
}

RICARICA.checkNotification = function(){
	
}

RICARICA.activateButton = function(){
	
}


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



function ValidateEmailCC(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};
// end validate insert email


$(document).ready(function() {

    $('.refill_notification input').keyup(function() {
       $(this).val($(this).val().toLowerCase()) ;
            
    });

    function controlMail() {
        var input = $(".refill_notification input")
        if (!ValidateEmailCC(input.val())) {
            console.log("Invalid email address.");
            $('.notificationMail').addClass('error');
            $('.refill_notification .notificationMail + span').addClass('error');
            $('.refill_notification .notificationMail + span').text('Email non valida');
        } else {
            $('.notificationMail').removeClass('error');
            $('.refill_notification .notificationMail + span').removeClass('error');
        }
    }

});


function clearCard(inputToClear, cvvToClear) {
    if (inputToClear) {
        $(inputToClear).removeClass('americane_cc');
        $(inputToClear).removeClass('diners_cc');
        $(inputToClear).removeClass('visa_cc');
        $(inputToClear).removeClass('maestro_cc');
        $(inputToClear).removeClass('masterc_cc');
        $(inputToClear).removeClass('general_cc');
        $(inputToClear).removeClass('aura_cc');
    }
    if (cvvToClear) {
        console.log(cvvToClear);
        $(cvvToClear).removeClass('cvv_carta');
        $(cvvToClear).removeClass('cvv_amex');
    }
}

function checkCard(card) {
    var c = card;
    var cl = parseInt(c.substr(c.length - 1));
    var c = c.slice(0, -1)
    var c = c.split("").reverse().join("");
    var c = c.split("");
    var a = 2;
    var cm = [];
    for (var i = 0; i < c.length; i++) {
        if (a % 2 == 0) {
            var t = c[i] * 2;
            if (t > 9) {
                var t = (t - 9);
            }
            cm.push(t);
        } else { cm.push(parseInt(c[i])); }
        a++;
    }
    var f = 0;
    for (var i = 0; i < cm.length; i++) { f += cm[i]; }
    f = f + cl;
    if (f % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

function checkDate() {
    var minMonth = new Date().getMonth() + 1;
    var minYear = new Date().getFullYear();
    var month = parseInt($('.select_cc[title="Mese"] option:selected').text(), 10);
    var year = parseInt($('.select_cc[title="Anno"] option:selected').text(), 10);


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

 


    $('#input_cc').blur(function() {
        var carta = $('#input_cc').val().replace(/\s/g, '');
        var result = checkCard(carta);
        if (result == true) {
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

     $('#input_cc').focus(function() {
        
        
            // write your own rules if true
            $('.number_cc').removeClass('error');
            $('.number_cc + span').removeClass('error');
            $('.select_cc').removeClass('error');
        
    });


    // Four digits validation (RICARICA) to display simbol credit card
    $('#input_cc').on('change , keyup', function(e) {
        var value = $('#input_cc').val();
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
                    if (firstDigits2 == '507') { card = "aura_cc"; }
                    if ((firstDigits2 == '501') || (firstDigits2 == '502') || (firstDigits2 == '503')) {
                        card = "maestro_cc";
                    }
                    break;
                case '67':
                    card = "maestro_cc";
                    break;

            }

            if (card == 'americane_cc') {
                $('#security_cc').attr('maxlength', 4);

            } else {
                $('#security_cc').attr('maxLength', 3);
            }

            clearCard('#input_cc', false);
            $("#input_cc").addClass(card);
            $(".visa_cc").fadeIn(10);
            $(".tooltip").css("display", "none");
            if ($('#input_cc').hasClass('americane_cc')) {
                clearCard(false, '#security_cc');
                $('#security_cc').addClass('cvv_amex');
                $('.cvv_amex').fadeIn(10);
            } else {
                clearCard(false, '#security_cc');
                $('#security_cc').addClass('cvv_carta');

            }

        } else {
            clearCard('#input_cc', '#security_cc');
        }
        console.log("lunghezza:" + value.length);

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
            if (radioCC.is(':checked') ||
                (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
                (subRadioCC.is(':checked')) ||
                (radioPay.is(':checked')) ||
                (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
                (subRadioBill.is(':checked') && radioBill.is(':checked'))) {
                if (radioPay.is(':checked')) {
                    $wind('#paypal-checkbox').attr('checked',true);
                }
                $wind('.top_up_button_final').prop("disabled", false);
            }
        }
    } else {
        if (radioCC.is(':checked') ||
            (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
            (subRadioCC.is(':checked')) ||
            (radioPay.is(':checked')) ||
            (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
            (subRadioBill.is(':checked') && radioBill.is(':checked'))) {
            if (radioPay.is(':checked')) {
                    $wind('#paypal-checkbox').attr('checked',true);
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
    if ((value.length > 13) && (checkCard(value) == true) && (checkDate() == true) && (radioCC.is(':checked')) && (securityCC.val().length >= 3)) {
        return true;
    } else {
        return false;
    }
}

$(function() {
    $('#select_numbert').on('change', function() {
        if ($(this).find('option:selected').is(':last-child')) {
            $(".action_numbert").fadeIn("fast").addClass('entered');
            $('.top_up_button_final').prop("disabled", true);
        } else {
            $(".action_numbert").fadeOut("fast").removeClass('entered');
            checkNextStep();

        }
        // switch ($(this).val()) {
        //     case 'option1':
        //         //alert( 1 );
        //         $(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option2':
        //         //alert( 2 );
        //         $(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option3':
        //         //alert( 3 );
        //         $(".action_numbert").fadeOut("fast");
        //         break;
        //     case 'option4':
        //         //alert( 3 );
        //         $(".action_numbert").fadeIn("fast");
        //         $('.top_up_button_final').prop("disabled", true);
        //         break;
        // }
    });
});



    $wind(".closeModal").click(function() {
        if ($wind(".item-box").hasClass('credit_card_main_radio')) {
            $wind(".showMore_content").fadeIn("slow").css('display:static');
            $wind(".showMore").slideUp("fast");
            $wind(".showMore_content").getNiceScroll().resize();
        }
    });

    function bindBtnClose() {
        $wind(".closeModal").click(function() {
            $wind(".popup,.popup--contract").fadeOut("20");
        });
    }


    function callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel, function1) {
        var popup = $wind('.popup--contract');
        popup.find('.popup--contract-header').text(title);
        popup.find('.popup-body--description').text(description);
        popup.find('.first-label').text(firstLabel);
        popup.find('.second-label').text(secondLabel);
        popup.find('.third-label').text(thirdLabel);
        popup.find('.first-value').text(firstValue);
        popup.find('.second-value').text(secondValue);
        popup.find('.third-value').text(thirdValue);
        popup.find('.popup-btn_2').text(btnLabel);
        function1;
        $wind('.popup--contract').css('display', 'block');
    }

    function callPopUp(title, description, button1, button2, labelBtn1, labelBtn2, function1, function2) {
        var popup = $wind('.popup');
        popup.find('.popup-header').text(title);
        popup.find('.popup-body').text(description);
        popup.find('.popup-btn_1').text(labelBtn1);
        popup.find('.popup-btn_2').text(labelBtn2);
        if (button1) {
            popup.find('.popup-btn_1').show();
            popup.find('.popup-btn_1').text(labelBtn1);
        } else {
            popup.find('.popup-btn_1').hide();
        }
        if (button2) {
            popup.find('.popup-btn_2').show();
            popup.find('.popup-btn_2').text(labelBtn2);
        } else {
            popup.find('.popup-btn_2').hide();
        }
        function1;
        function2;
        $wind('.popup').css('display', 'block');
    }

    function removeCard(card, radio) {
        $wind(".popup-btn_1").click(function() {
            card.slideUp();
            radio.removeAttr('checked');
            checkNextStep();
        });


    }
    // MODAL PAYPAL ED ELIMINA
    $wind(".btn_removeModal").click(function() {
        var cardToDelete = $wind(this).closest(".item-box");
        var radioToDisable = $wind(this).siblings('input[type="radio"]');
        var title = 'Stai per eliminare la carta che finisce per 6368';
        var description = 'Vuoi eliminare la carta predefinita?';
        callPopUp(title, description, true, true, 'rimuovi', 'annulla', removeCard(cardToDelete, radioToDisable), bindBtnClose());

    });

    $wind(".modalPaypal").click(function() {
        var title = 'Ricorda i dati di Paypal';
        var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire le credenziali sul sito di PayPal. Per ragioni di sicurezza Wind non salva le tue credenziali di accesso ma esclusivamente un codice identificativo fornito da PayPal. Potrai sempre modificare la tua scelta, deselezionando la voce Ricorda i miei dati.';
        callPopUp(title, description, false, true, '', 'chiudi', '', bindBtnClose());
    });

    $wind(".modalCc").click(function() {
        var title = 'Ricorda i dati Carta di credito';
        var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire i dati della tua carta di credito. La carta utilizzata resterà disponibile per le successive ricariche. Per ragioni di sicurezza Wind non salva la tua carta ma esclusivamente un codice identificativo della stessa fornito dal sistema di pagamento. Per questo motivo saranno mostrati solo gli ultimi 4 numeri della carta. Potrai sempre modificarla, eliminarla o aggiungerne una nuova.';
        callPopUp(title, description, false, true, '', 'chiudi', '', bindBtnClose());
    });

    $wind(".contract__popup").click(function() {
        var title = 'Conto telefonico';
        var description = 'La ricarica online verrà addebitata sul Conto Telefonico a cui sono associate le seguenti linee/utenze:';
        var firstLabel = 'Linea/Utenza';
        var secondLabel = 'Offerta';
        var thirdLabel = 'Contratto';
        var firstValue = '0815792897';
        var secondValue = 'TuttoIncluso';
        var thirdValue = 'ECPRA0912394378';
        var btnLabel = 'Chiudi';
        callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel, bindBtnClose());
    });


    // FINE MODAL PAYPAL ED ELIMINA

    // SHOWMORE CONTENT
    $wind(".showMore").click(function() {
        $wind(".showMore_content").fadeIn("slow").css('display:static');
        $wind(".showMore").slideUp("fast");
        $wind(".showMore_content").getNiceScroll().resize();

    });
    // FINE SHOWMORE CONTENT

    // OPEN SIDEBAR CONTENT
    $wind('.open_sidebar_topUp').one('click',function() {


        var radioCC = $wind('.credit_card_main_radio input[type="radio"]');
        radioCC.prop('checked', true);
        $wind('.top_up_button_final').prop("disabled", false);

    });
    // FINE OPEN SIDEBAR CONTENT


    $wind(function() {

        $wind('#input_cc')
            .keyup(function() {
                var value = $wind(this).val();
                value = value.replace(/\s/g, '');
                value = value.match(/.{1,4}/g).join(" ");
                $wind(this).val(value);
            })
    });



    // $wind("#input_cc, #security_cc").keyup(function() {
    //     var subRadioNewCard = $wind('.newCard_main_radio input[type="radio"]');
    //     //var radioCC = $wind('.credit_card_main_radio input[type="radio"]');
    //     var securityCC = $wind('#security_cc');
    //     if (($wind('#input_cc').val().length > 8) && subRadioNewCard.is(':checked') && securityCC.val().length >= 3) {
    //         $wind('.top_up_button_final').prop("disabled", false);
    //     } else {
    //         $wind('.top_up_button_final').prop("disabled", true);
    //     }
    // });


    //inizio check


    $wind("#input_cc, #security_cc").keyup(function() {
        checkNextStep();
    });

    $wind(".number_top_up_confirm").blur(function() {

        checkNextStep();
    });

    $wind(".number_top_up, .number_top_up_confirm").keyup(function() {

        checkNextStep();

    });

    $wind('input[type="radio"]').change(function() {
        checkNextStep();
    });

    $wind('select.select_cc').change(function() {
        checkNextStep();
    });


    // $wind('input[type="radio"]').change(function() {
    //     var radioCC = $wind('.credit_card_main_radio input[type="radio"]'); // carta predefinita
    //     var radioPay = $wind('.paypal_main_radio input[type="radio"]'); //paypal
    //     var radioCharge = $wind('.charge_main_radio input[type="radio"]'); //addebito su conto radio apertura
    //     var radioBill = $wind('.bill_main_radio input[type="radio"]'); //addebito su conto telefonico radio apertura
    //     var subRadioBill = $wind('.item_bill input[type="radio"]');    // contratto
    //     var subRadioCharge = $wind('.item_charge input[type="radio"]'); // conto
    //     var subRadioCC = $wind('.optional_card input[type="radio"]'); // seconda carta inserita
    //     var subRadioNewCard = $wind('.newCard_main_radio input[type="radio"]');
    //     var securityCC = $wind('#security_cc');
    //     $wind('.top_up_button_final').prop("disabled", true);

    //     if (radioCC.is(':checked')) {


    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    //     if (subRadioCC.is(':checked')) {

    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    //     if (radioPay.is(':checked')) {

    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    //     if (subRadioCharge.is(':checked') && (radioCharge.is(':checked'))) {

    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    //     if (subRadioBill.is(':checked') && (radioBill.is(':checked'))) {

    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    //     if (($wind('#input_cc').val().length > 8) && subRadioNewCard.is(':checked') && securityCC.val().length >= 3) {
    //         $wind('.top_up_button_final').prop("disabled", false);
    //     }
    // });


