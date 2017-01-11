jQuery(function($) {

    // OPEN SIDEBAR CONTENT DEFAULT CHECKED
    $('.open_sidebar_topUp').one('click', function() {
        var radioCC = $('.credit_card_main_radio input[type="radio"]');
        radioCC.prop('checked', true);
        checkNextStep();
    });
    // FINE OPEN SIDEBAR CONTENT

    //PHONE NUMBER SELECTION
    $(function() {
        $('#select_numbert').on('change', function() {
            if ($(this).find('option:selected').is(':last-child')) {
                $(".action_numbert").fadeIn("fast").addClass('entered');
                $('.top_up_button_final').prop("disabled", true);
            } else {
                $(".action_numbert").fadeOut("fast").removeClass('entered');
                checkNextStep();

            }
        });
    });
    //FINE NUMBER SELECTION

    //CHECK NEW NUMBER
    function checkNewNumber() {
        var mainNumber = $('.number_top_up').val();
        var confirmNumber = $('.number_top_up_confirm').val();
        if ((!$('.number_top_up_confirm').is(':focus')) && ((confirmNumber.length > 0) && (mainNumber.length > 0))) {
            if ((mainNumber.length >= 6) && (confirmNumber.length >= 6) && (mainNumber == confirmNumber)) {
                $('.number_top_up_confirm').removeClass('error');
                $('.number_top_up_confirm + span').removeClass('error');
                return (true);
            } else {
                $('.number_top_up_confirm').addClass('error');
                $('.number_top_up_confirm + span').addClass('error');
                $('.number_top_up_confirm + span').text('Controlla che i numeri siano uguali');
                return (false);
            }
        } else {
            return (false);
        }
    }
    //FINE CHECK NEW NUMBER

    //REMOVE ERROR ON FOCUS
    $('.number_top_up_confirm').focus(function() {
        // write your own rules if true
        $(this).removeClass('error');
        $('.number_top_up_confirm + span').removeClass('error');
    });
    //REMOVE ERROR ON FOCUS

    // SHOWMORE CONTENT
    $(".showMore").click(function() {
        $(".showMore_content").fadeIn("slow").css('display:static');
        $(".showMore").slideUp("fast");
        $(".showMore_content").getNiceScroll().resize();
    });
    //FINE SHOWMORE


    //SLIDE PAYMENT METHOD
    var timer = 500;
    $("#option_cc1").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").addClass("active");
        $("#action_c1").getNiceScroll().resize();
        $("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });
    $("#option_cc2").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").addClass("active");
        $("#action_c1").getNiceScroll().resize();
        $("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });
    $("#option_cc1b").click(function() {
        //$("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").addClass("active");
        $("#action_c1").getNiceScroll().resize();
        //$("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });
    $("#option_cc2b").click(function() {
        //$("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").addClass("active");
        $("#action_c1").getNiceScroll().resize();
        //$("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });

    $("#option1").click(function() {
        $("#action_c1 .cont_item1").slideDown(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").addClass("active");
        $("#action_c1").getNiceScroll().resize();
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });
    $("#option2").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideDown(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").removeClass("active");
        $("#action_c2").addClass("active");
        $("#action_c2").getNiceScroll().resize();
        $("#action_c3").removeClass("active");
        $("#action_c4").removeClass("active");
    });
    $("#option3").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideDown(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").addClass("active");
        $("#action_c3").getNiceScroll().resize();
        $("#action_c4").removeClass("active");
    });
    $("#option3").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideDown(timer);
        $("#action_c4 .cont_item1").slideUp(timer);
        $("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").addClass("active");
        $("#action_c3").getNiceScroll().resize();
        $("#action_c4").removeClass("active");
    });
    $("#option4").click(function() {
        $("#action_c1 .cont_item1").slideUp(timer);
        $("#action_c2 .cont_item1").slideUp(timer);
        $("#action_c3 .cont_item1").slideUp(timer);
        $("#action_c4 .cont_item1").slideDown(timer);
        $("#action_c1").removeClass("active");
        $("#action_c2").removeClass("active");
        $("#action_c3").removeClass("active");
        $("#action_c4").addClass("active");
        $("#action_c4").getNiceScroll().resize();
    });
    // FINE SLIDE PAYMENT METHOD


    //POPUP SETTINGS
    function callPopUp(title, description, button1, button2, labelBtn1, labelBtn2, function1, function2) {
        var popup = $('.popup');
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
        $('.popup').css('display', 'block');
    }
    //FINE POPUP SETTINGS


    //POPUP CONTRACT SETTINGS 
    function callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel, function1) {
        var popup = $('.popup--contract');
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
        $('.popup--contract').css('display', 'block');
    }
    //FINE POPUP CONTRACT SETTINGS 

    //POPUP DELETE CARD MESSAGE
    $(".btn_removeModal").click(function() {
        var cardToDelete = $(this).closest(".item-box");
        var radioToDisable = $(this).siblings('input[type="radio"]');
        var title = 'Stai per eliminare la carta che finisce per 6368';
        var description = 'Vuoi eliminare la carta predefinita?';
        callPopUp(title, description, true, true, 'rimuovi', 'annulla', removeCard(cardToDelete, radioToDisable), bindBtnClose());

    });
    //FINE DELETE CARD MESSAGE

    //POPUP PAYPAL MESSAGE
    $(".modalPaypal").click(function() {
        var title = 'Ricorda i dati di Paypal';
        var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire le credenziali sul sito di PayPal. Per ragioni di sicurezza Wind non salva le tue credenziali di accesso ma esclusivamente un codice identificativo fornito da PayPal. Potrai sempre modificare la tua scelta, deselezionando la voce Ricorda i miei dati.';
        callPopUp(title, description, false, true, '', 'chiudi', '', bindBtnClose());
    });
    //POPUP PAYPAL MESSAGE

    //POPUP REMEMBER CARD MESSAGE
    $(".modalCc").click(function() {
        var title = 'Ricorda i dati Carta di credito';
        var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire i dati della tua carta di credito. La carta utilizzata resterà disponibile per le successive ricariche. Per ragioni di sicurezza Wind non salva la tua carta ma esclusivamente un codice identificativo della stessa fornito dal sistema di pagamento. Per questo motivo saranno mostrati solo gli ultimi 4 numeri della carta. Potrai sempre modificarla, eliminarla o aggiungerne una nuova.';
        callPopUp(title, description, false, true, '', 'chiudi', '', bindBtnClose());
    });
    //POPUP REMEMBER CARD MESSAGE

    //POPUP CONTRACT MESSAGE
    $(".contract__popup").click(function() {
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
    //FINE POPUP REMEMBER CARD MESSAGE

    //REMOVE CARD    
    function removeCard(card, radio) {
        $(".popup-btn_1").click(function() {
            card.slideUp().addClass('deleted');
            radio.removeAttr('checked');
            checkNextStep();
        });
    }
    //REMOVE CARD

    //SHOWMORE ON DELETE AND CHECKED NEW CARD
    $(".closeModal").click(function() {
        if ($(".item-box").hasClass('credit_card_main_radio')) {
            $(".showMore_content").fadeIn("slow").css('display:static');
            $(".showMore").slideUp("fast");
            $(".showMore_content").getNiceScroll().resize();
        }
        if ($(".item-box").hasClass('deleted')) {
            $('.newCard_main_radio input[type="radio"]').prop('checked', true);
            $("#action_c1").addClass("active");
            $("#action_c1 .cont_item1").slideDown(timer);
            $("#action_c1").getNiceScroll().resize();
        }

    });
    //FINE SHOWMORE ON DELETE

    //CLOSE POPUP
    function bindBtnClose() {
        $(".closeModal").click(function() {
            $(".popup,.popup--contract").fadeOut("20");
        });
    }
    //CLOSE POPUP

    //ADD AND REMOVE SPACES
    $(function() {
        $('#input_cc').blur(function() {
            var value = $(this).val();
            if (value != "") {
            	 value = value.replace(/\s/g, '');
            value = value.match(/.{1,4}/g).join(" ");
            $(this).val(value);
            }
        })
        $('#input_cc').focus(function() {
            var value = $(this).val();
            var result = value.replace(/\s/g, '');
            $(this).val(result);
        })
    });
    //FINE ADD AND REMOVE SPACES

    //CHECK CARD NUMBER
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
    //FINE CHECK CARD NUMBER

    //CARD ERROR
    $('#input_cc').blur(function() {
        var carta = $('#input_cc').val().replace(/\s/g, '');
        var result = checkCard(carta);
        var value = $('#input_cc').val();
        if (value == "") {
            $('.number_cc').removeClass('error');
            $('.number_cc + span').removeClass('error');
        }else{
        	if (result == true) {
            $('.number_cc').removeClass('error');
            $('.number_cc + span').removeClass('error');
        } else {
            $('.number_cc').addClass('error');
            $('.number_cc + span').addClass('error');
            $('.number_cc + span').text('Numero di carta non valido');
        }
        }
    });
    //FINE CARD ERROR

    // REMOVE CARD ERROR ON FOCUS
    $('#input_cc').focus(function() {
        // write your own rules if true
        $('.number_cc').removeClass('error');
        $('.number_cc + span').removeClass('error');
        $('.select_cc').removeClass('error');
    });
    //FINE REMOVE CARD ERROR ON FOCUS

    //CARD ICONS
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
    //FINE CARD ICONS

    //CHECK DATE
    function checkDate() {
        var minMonth = new Date().getMonth() + 1;
        var minYear = new Date().getFullYear();
        var month = parseInt($('.select_cc[title="Mese"] option:selected').text(), 10);
        var year = parseInt($('.select_cc[title="Anno"] option:selected').text(), 10);


        console.log(year);
        console.log(minYear);
        if (year > minYear) {
            console.log('anno lontano');
            $('.select_mese .select_cc:first-child').removeClass('error');
            $('.select_anno .select_cc:first-child').removeClass('error');
            $('.select_cc + span').removeClass('error');
            return (true);


         } else if (year === minYear) {
            if (month > minMonth) {
                console.log('scadenza ok');
                $('.select_mese .select_cc:first-child').removeClass('error');
                $('.select_anno .select_cc:first-child').removeClass('error');
                $('.select_cc + span').removeClass('error');
                return (true);



            } else {
                console.log('data antecedente');
                $('.select_mese .select_cc:first-child').addClass('error');
                $('.select_mese .select_cc + span').addClass('error');
                $('.select_mese .select_cc + span').text('Dato non corretto');

                return (false);
            }
        }

    }

    //FINE CHECK DATE

    //CHECK CARD
    function checkNewCreditCard() {
        var radioCC, securityCC, value;
        radioCC = $('.newCard_main_radio input[type="radio"]');
        securityCC = $('#security_cc');
        value = $('#input_cc').val();
        value = value.replace(/\s/g, '');
        console.log(value);
        if ((value.length > 13) && (checkCard(value) == true) && (checkDate() == true) && (radioCC.is(':checked')) && (securityCC.val().length >= 3)) {
            return true;
        } else {
            return false;
        }
    }
    //FINE CHECK CARD

    //COMPLETE CHECK
    function checkNextStep() {
        var radioCC = $('.credit_card_main_radio input[type="radio"]'); // carta predefinita
        var subRadioCC = $('.optional_card input[type="radio"]'); // seconda carta inserita
        var radioPay = $('.paypal_main_radio input[type="radio"]'); //paypal
        var radioCharge = $('.charge_main_radio input[type="radio"]'); //addebito su conto radio apertura
        var radioBill = $('.bill_main_radio input[type="radio"]'); //addebito su conto telefonico radio apertur
        var subRadioBill = $('.item_bill input[type="radio"]'); // contratto
        var subRadioCharge = $('.item_charge input[type="radio"]'); // conto
        var subRadioNewCard = $('.newCard_main_radio input[type="radio"]'); // nuva carta
        var securityCC = $('#security_cc');

        $('.top_up_button_final').prop("disabled", true);

        if ($('.action_numbert').hasClass('entered')) {
            if (checkNewNumber()) {
                if (radioCC.is(':checked') ||
                    (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
                    (subRadioCC.is(':checked')) ||
                    (radioPay.is(':checked')) ||
                    (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
                    (subRadioBill.is(':checked') && radioBill.is(':checked'))) {
                    if (radioPay.is(':checked')) {
                        $('#paypal-checkbox').attr('checked', true); //CHECKED DEFAULT
                    }
                    $('.top_up_button_final').prop("disabled", false);
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
                    $('#paypal-checkbox').attr('checked', true);
                }
                $('.top_up_button_final').prop("disabled", false);
            }
        }
    }

    function controlMail() {
        var input = r$(".refill_notification input")
        if (!input.val() == '') {
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

    r$('.refill_notification input').keyup(function() {
        r$(this).val(r$(this).val().toLowerCase());

    });

    r$('.refill_notification input').blur(function() {
        controlMail();

    });

     r$('.refill_notification input').focus(function() {
        r$('.notificationMail').removeClass('error');
            r$('.refill_notification .notificationMail + span').removeClass('error');

    });

    $("#input_cc, #security_cc").blur(function() {
        checkNextStep();
    });

    $(".number_top_up_confirm").blur(function() {

        checkNextStep();
    });

    $(".number_top_up, .number_top_up_confirm").blur(function() {

        checkNextStep();

    });

    $('input[type="radio"]').change(function() {
        checkNextStep();
    });

    $('select.select_cc').change(function() {
        checkDate();
    });
});
