/**
 * Custom scripts:
 * inputs, placeholder...
 */




/**
 * Ajax Spinner Handling
 */




/**
 * Page Href Handling
 */





function isValidSecureCode() {
    var regex = /^[0-9]{3,4}$/;
    var secure = r$("#security_cc").val();
    if (!regex.test(secure)) {
        r$(".base__input.security_cc")
            .addClass("error");
        r$(".cvv_container .error_message")
            .addClass("error");
    } else {
        r$(".base__input.security_cc")
            .removeClass("error");
        r$(".cvv_container .error_message")
            .removeClass("error");
    }
    checkSubmitForm();
}

function isValidPhoneNumber() {
    var regex = /^[03][0-9]{8,11}$/g;
    var secure = r$("#altro_numero").val();
    if (!isNumberWind(secure) && !regex.test(secure)) {
        r$(".base__input.number_top_up")
            .addClass("error");
        r$(".action_numbert .error_message")
            .addClass("error");
        r$("#ricaricaForm")
            .attr("disabled", true);
    } else {
        r$(".base__input.number_top_up")
            .removeClass("error");
        r$(".action_numbert .error_message")
            .removeClass("error");
        r$("#ricaricaForm")
            .attr("disabled", false);
    }
}

function checkNumber() {
    if (r$('#altro_numero').val() == r$('#ricarica_numero').val()) {
        r$(".base__input.number_top_up_confirm")
            .removeClass("error");
        r$(".action_numbert .error_message")
            .removeClass("error");
        r$("#ricaricaForm")
            .attr("disabled", false);
    } else {
        r$(".base__input.number_top_up_confirm")
            .addClass("error");
        r$(".action_numbert .error_message")
            .addClass("error");
        r$("#ricaricaForm")
            .attr("disabled", true);
    }
    checkSubmitForm();
}

function isNumberWind(number) {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/onLineRecharge/checkWindNumber.action',

            data: {
                msisdn: number
            },
            success: function(res) {
                if (res.esito == "KO") {
                    return false;
                } else {
                    return true;
                }
            },
            dataType: "json"
        })
        .fail(function() {
            verificaNumero = true;
        });
}

function checkNewNumber() {
    var mainNumber = r$('.number_top_up').val();
    var confirmNumber = r$('.number_top_up_confirm').val();
    if ((!r$('.number_top_up_confirm').is(':focus')) &&
        ((confirmNumber.length > 0) && (mainNumber.length > 0))) {

        if ((mainNumber.length >= 6) &&
            (confirmNumber.length >= 6) &&
            (mainNumber == confirmNumber)) {

            r$('.number_top_up_confirm')
                .removeClass('error');
            r$('.number_top_up_confirm + span')
                .removeClass('error');
            return (true);

        } else {

            r$('.number_top_up_confirm')
                .addClass('error');
            r$('.number_top_up_confirm + span')
                .addClass('error');
            r$('.number_top_up_confirm + span')
                .text('Controlla che i numeri siano uguali');
            return (false);

        }
    } else {

        return (false);

    }
}

function checkNewCreditCard() {
    var radioCC, securityCC, value;
    radioCC = r$('.newCard_main_radio input[type="radio"]');
    securityCC = r$('#security_cc');
    value = r$('#input_cc').val();
    value = value.replace(/\s/g, '');
    console.log(value);
    if (
        (value.length > 13) &&
        (checkCard(value) === true) &&
        (checkDate() === true) &&
        (radioCC.is(':checked')) &&
        (securityCC.val().length >= 3)) {
        return true;
    } else {
        return false;
    }
}

function checkCreditCard(elem) {
    r$('#input_cc')
        .focus(function() {
            // write your own rules if true
            r$('.number_cc').removeClass('error');
            r$('.number_cc + span').removeClass('error');
            r$('.select_cc').removeClass('error');
            var value = r$(this).val();
            var result = value.replace(/\s/g, '');
            r$(this).val(result);
        })
        .blur(function() {
            var carta = r$('#input_cc').val().replace(/\s/g, '');
            var result = checkCard(carta);
            var value = r$('#input_cc').val();
            if (value === "") {
                r$('.number_cc').removeClass('error');
                r$('.number_cc + span').removeClass('error');
            } else {

                if (result === true) {
                    r$('.number_cc').removeClass('error');
                    r$('.number_cc + span').removeClass('error');

                } else {
                    r$('.number_cc').addClass('error');
                    r$('.number_cc + span').addClass('error');
                    r$('.number_cc + span').text('Numero di carta non valido');

                }

                value = r$(this).val();
                if (value !== "") {
                    value = value.replace(/\s/g, '');

                    value = value.match(/.{1,4}/g).join(" ");

                    r$(this).val(value);
                }
            }
        });
    //FINE CARD ERROR
    checkSubmitForm();
}



// Enabled buttom Ricarica
r$('.name_cc, .number_cc, .security_cc')
    .keyup(function() {
        if (
            r$('.name_cc').val() !== '' &&
            r$('.number_cc').val() !== '' &&
            r$('.security_cc').val() !== '') {
            /*r$('.btn_refil')
                .removeAttr('disabled');*/
        } else {
            /*r$('.btn_refil')
                .attr('disabled');*/
        }
    });

//prepare submit form ricarica
r$('button#ricaricaForm')
    .click(function() {
        submitRicarica();
    });




function isValidCvv2(cvvSelector, ccSelector) {
    var cv = r$(cvvSelector)
    var cc = r$(ccSelector).val()
        // "#formrRecharge [name=codsicurezza_carata]"
    var l = cv.val().length
    var result = true;
    if (cv.val().match("^[0-9]+$") == null)
        result = false
    else {
        var tipo = deduceCardTypeByNumber(cc)

        if ((tipo == "amex" && l != 4) || (tipo != "amex" && l != 3)) {
            result = false
        } else
            result = true

    }
    if (!result)
        showErrorMsg(cvvSelector, "Il codice non &#232; corretto!")
    else
        clearErrorMsg(cvvSelector)

    return result
}






function submitRicarica() {
    //controllo del doppio click sul pulsante

    var numero = r$("#select_numbert").val();
    var taglio = r$("#select_taglio").val();
    var altro_numero = r$("#altro_numero").val();
    var mdp = r$("input[name=mdp]:checked").val();

    //Se loggato
    //
    //
    //parametro numero
    //IF CCX
    /*

     alias

     numero_carta
     mese_scadenza_carta
     anno_scadenza_carta   due valori
     titolare_carta
     codsicurezza_carata
     */
    var alias = r$("input[name=selectedCard]").val()
    var numeroCCX = r$("#input_cc").val().replace(/\s/g, '');
    //controlliamo che il numero carta sia compatibile [ controllo inserito per i load automatici del browser ]
    if (!checkCreditCard(numeroCCX)) {
        numeroCCX = '';
    }
    var mese = r$("#mese_carta").val()
    var anno = r$("#anno_carta").val()
    var cvv2 = r$("#security_cc").val()
        //controlliamo che il numero carta sia compatibile [ controllo inserito per i load automatici del browser ]
    if (!isValidSecureCode(numeroCCX)) {
        cvv2 = '';
    }
    var titolare = "da inserire" //r$("#titolare_carta").val() todo: fixme
    var ricorda_agreement = 'Y'
    if (!r$("#rememberp").is(':checked'))
        ricorda_agreement = 'N'
    var ricorda_carta = 'Y'
    if (!r$("#salvadati-checkbox").is(':checked'))
        ricorda_carta = 'N'

    var email = ""
    if (r$("#emailnotification").is(':checked'))
        email = r$("#input_email").val()

    var cdf = r$("input[name=cdf]:checked").val();

    var urlOK = 'http://' + document.location.hostname + document.location.pathname + "?result=true#refill_block"
    var urlAbbandona = 'http://' + document.location.hostname + document.location.pathname + "?abbandon=true#refill_block"


    //salvo il numero dell'utente per ricompilarlo
    setCookie("userNumber", altro_numero, 1)


    r$.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/ricarica/submit.action',
        data: {
            numero: numero,
            numero_ricarica: altro_numero,
            tipoPagamento: mdp,
            select_taglio: taglio,
            email_utente: email,
            ricorda_agreement: ricorda_agreement,
            ricorda_carta: ricorda_carta,
            numero_carta: numeroCCX,
            alias: alias,
            cdf: cdf,
            mese_scadenza_carta: mese,
            anno_scadenza_carta: anno,
            titolare_carta: titolare,
            codsicurezza_carata: cvv2,
            URL_OK_RICARICA_NEW: urlOK,
            URL_CANCEL_RICARICA_NEW: urlAbbandona,
        },
        success: function(res) {

            if (res.esito == "OK") {
                switch (res.tipo_nav) {
                    case 'NORMAL':
                        //CARICO ESITO DELLA RICARICA INVOCANDO LA RESULT AJAX
                        showEsitoRicarica(res.id);
                        break;
                    case 'REDIRECT':
                        //Faccio redirect
                        //Salvo l'idRicarcia
                        console.log(res.id)
                        window.location.href = res.url;
                        break;
                    default:
                        showEsitoRicarica(res.id);
                        break;

                }
            } else {
                console.log("Errore ricarica")
                console.log(res.error_description)
                    //alert("Si è verificato un errore, riprova più tardi");
                r$(".btn_close")
                    .trigger("click");
            }
        },
        dataType: "json"
    }).fail(function() {
        $("#ricaricaForm")
            .attr('submitricarica', '');
        console.log("Fail Errore ricarica");
    });
}




function showEsitoRicarica(id) {
    
}
//FINE METODI NAVIGAZIONE



var numeri = [];





function addNumero(numero) {
    if (numeri == null)
        numeri = []
    numeri.push(numero)
}





function popolanumeri() {

    r$.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/ricarica/linee.action',
        data: {},
        success: function(res) {
            r$('#select_numbert')
                .find('option')
                .remove()
            console.log("Esito" + res.esito)
            if (res.esito == "OK" && res.linee != null) {
                for (var i = 0; i < res.linee.length; i++) {
                    var tg = res.linee[i];
                    r$('#select_numbert').append(new Linee(tg.msisdn, tg.sme, tg.cdf, tg.msisdn).toOption());
                }

                console.log("Esito Scrivo linee")
                r$('#select_numbert')
                    .append(new Linee("new", false, '', 'Altro numero').toOption());
                r$(".select_numbert")
                    .fadeIn();
                r$(".action_numbert")
                    .fadeOut();
            } else {
                console.log("Esito altro numero")
                r$('#select_numbert')
                    .append(new Linee("new", false, '', 'Altro numero').toOption());
                r$(".action_numbert")
                    .fadeIn();
                console.log("Esito Scrivo linee")
                r$(".select_numbert")
                    .fadeOut();
                r$(".select_numbert")
                    .hide();
            }

        },
        dataType: "json"
    }).fail(
        errorPopolaNumeri()

    );

}

function errorPopolaNumeri() {
    r$('#select_numbert').find('option')
        .remove()
    r$('#select_taglio').append(new Linee("new", false, '', 'Altro numero').toOption())
    r$(".select_numbert").fadeOut("fast")
    r$(".action_numbert").fadeIn("fast")
}






function checkDataScadenza(live) {
    var dToday = new Date();

    var today = "" + dToday.getFullYear()
    if (dToday.getMonth() + 1 < 10)
        today += "0"
    today += dToday.getMonth() + 1;

    var m = r$("[name=mese_scadenza_carta]").val()
    var y = r$("[name=anno_scadenza_carta]").val()
    if (live && (y == "" || y == "Anno" || m == "" || m == "Mese")) {
        clearErrorMsg("[name=mese_scadenza_carta]")
        return
    }
    var scad = y + m
    if ("" + parseInt(scad) != scad) {
        showErrorMsg("[name=mese_scadenza_carta]", "La data non &#232; valida")
        return false
    }
    if (parseInt(today) > parseInt(scad)) {
        showErrorMsg("[name=mese_scadenza_carta]", "La data deve essere posteriore alla data attuale")
        return false
    }
    clearErrorMsg("[name=mese_scadenza_carta]")
    return true
}
var numCheck = 0;
var verificaNumero = true;

function checkNumberMain(value) {

    var check = isValidPhoneNumber(value);
    if (check)
        r$('#ricarica_numero').parent().parent().find('.error').fadeOut(200);
    else
        r$('#ricarica_numero').parent().parent().find('.error').fadeIn(200);

    if (!check) {
        verificaNumero = false;
        return check;
    }
    jQuery.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/onLineRecharge/checkWindNumber.action',

        data: {
            msisdn: value
        },
        success: function(res) {

            if (res.esito == "KO") {
                {
                    //$('#ricarica_numero').parent().parent().find('.error').fadeIn(200);
                    verificaNumero = false;
                    check = false;
                    return;
                }
            } else {
                {
                    // $('#ricarica_numero').parent().parent().find('.error').fadeOut(200);
                    verificaNumero = true;
                    check = true;
                    return;
                }
            }
        },
        dataType: "json"
    }).fail(function() {
        verificaNumero = true;
    });

    return check;
}

function retrieveTagli() {
    tagli = [];
    r$.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/ricarica/tagli.action',
        data: {},
        success: function(res) {

            if (res.esito == "OK" && res.tagli != null) {
                for (var i = 0; i < res.tagli.length; i++) {
                    var tg = res.tagli[i];
                    addTaglio(new Taglio(tg.id, tg.importo, tg.bonusDaVisualizzare, tg.type, null, tg.testoBonus));

                }
            }
            filterTagliByMdp(r$("input[name=mdp]:checked").val());

        },
        dataType: "json"
    }).fail();
}

function checkNumeroWind() {

    if (!verificaNumero) {
        r$('#ricarica_numero').parent().parent().find('.error').fadeIn(200);
        return verificaNumero;
    } else {
        verificaNumero = true;
        r$('#ricarica_numero').parent().parent().find('.error').fadeOut(200);
        return verificaNumero;
    }
}

function updateBillingCenters() {
    var cdf = getSmeNumberCdf()
    if (cdf != null) {
        if (r$("#mdp").val() == "CTL") {
            r$("#mdp").val("SME")
        }
    } else {
        if (r$("#mdp").val() == "SME")
            r$("#mdp").val("CTL")

    }
    filterTagliByMdp(r$("#mdp").val())
    r$('#select_taglio').trigger('change')
}

function getSmeNumberCdf() {
    var sel = r$("#select_numbert option:selected")
    if (r$(sel).val() == "new")
        return null
    var cdf = r$(sel).attr("smecdf")
    if (cdf == null || cdf == "")
        return null
    return cdf
}







function changeNumber() {
    r$("#ricaricaForm").attr("disabled", false);
}




///GESTIONE RUBRICA
function setDefaultCard(id) {
    //showWaitBox()
    //rubricaErr("")

    r$("input[name=selectedCard]").val(id);
    r$("#ricaricaForm").attr("disabled", false);

    r$.post("/nuovaAreaClienti/wind/ajax/rubricaCarte/default.action", {
            'alias': id
        },
        function(data) {
            //hideWaitBox()
            if (data.OK) {
                //$.fancybox.close()
                //updateParentPage(r$("#card" +id)[0]["card"])
            } else
                rubricaErr(data.msg)
        }).fail(function(aa) {
        hideWaitBox();
        rubricaErr("Si &#232; verificato un errore")
    })

}


function deleteCard(id) {
    //showWaitBox()
    rubricaErr("")
    var deletingDefaultCard = r$("[name=carta_modificata]:checked").val() == id
    r$.post("/nuovaAreaClienti/wind/ajax/rubricaCarte/delete.action", {
            'alias': id
        },
        function(data) {
            //hideWaitBox()
            //console.log(data + "/" + data['OK'] + "/" + data.OK)
            if (data.OK) {
                populateCards(deletingDefaultCard ? updateParentPage : null)
            } else
                rubricaErr(data.msg)
        }).fail(function(aa) {
        hideWaitBox();
        rubricaErr("Si &#232; verificato un errore")
    })

}



function saveCard() {
    //showWaitBox()
    rubClearErrors()
    rubclearTitles()
    if (checkCard()) {
        //hideWaitBox()
        rubsetTitles()
        return
    }
    //    $.post("#{(siteManager.isLocalhost() ? '' : initConfiguration.initParameterMap['HOME_WIND'])}/nuovaAreaClienti/wind/ajax/rubricaCarte/save.action",

    r$.post("/nuovaAreaClienti/wind/ajax/rubricaCarte/save.action",
        r$("#nuovacarta").serialize(),
        function(data) {
            //hideWaitBox()
            if (data.OK) {
                r$.fancybox.close()
                if (savedCardPostFunction != null) {
                    r$("#ins_ccx").hide()
                    r$("#aliasPresent").show()
                    if (data.card.img != null && data.card.img.indexOf("http") == -1)
                        data.card.img = "#{initConfiguration.initParameterMap['AC_IMG_PATH']}/ricarica/" + data.card.img
                    savedCardPostFunction(data.card)
                }

            } else {
                rubricaErr(data.msg)
                rubsetTitles()
            }
        },
        "json").fail(function(aa) {
        hideWaitBox();
        rubsetTitles();
    })

}

//GESTIONE CDF
//
//


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return true;
        }

    }
    return false
};

r$(document)
  .ready(function() {

    listenToNumberChange();

    r$('.open_sidebar_topUp')
      .one('click', function() {
        r$('.mfp-bg, .mfp-wrap')
          .css('height', '100%');
        r$('#action_c1')
          .addClass('active');
        r$('.newCard_main_radio input[type="radio"]')
          .prop('checked', true);
        r$('#action_c1 .cont_item1')
          .css('display', 'block');
      });


    r$('#input_cc')
      .blur(function() {
        var value = r$(this).val();
        if (value !== "") {
            value = value.replace(/\s/g, '');
            value = value.match(/.{1,4}/g).join(" ");
            r$(this).val(value);
        }

      });

    r$('#input_cc')
      .focus(function() {
        var value = r$(this).val();
        var result = value.replace(/\s/g, '');
        r$(this).val(result);
      });


    r$("#security_cc")
      .blur(function() {
        checkNextStep();
      });

    r$(".number_top_up_confirm")
      .blur(function() {
        checkNextStep();
      });

    r$(".number_top_up, .number_top_up_confirm")
      .blur(function() {
        checkNextStep();
    });

    r$('input[type="radio"]')
      .change(function() {
        checkNextStep();
     });

    r$('select.select_cc')
      .change(function() {
        checkNextStep();
      });

    r$('#select_numbert')
      .on('change', function() {
        if (r$(this).find('option:selected').is(':last-child')) {
          r$(".action_numbert")
            .fadeIn("fast")
            .addClass('entered');
          // r$('.top_up_button_final').prop("disabled", true);
        } else {
          r$(".action_numbert")
            .fadeOut("fast")
            .removeClass('entered');
          checkNextStep();
        }
      });
});





function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function newRecharge() {
    window.location.href = window.location.href;
}

function luhn(value) {
    var enabled = true
    if (!enabled)
        return true
            // accept only digits, dashes or spaces
    if (/[^0-9]+/.test(value))
        return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
        nDigit = 0,
        bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9)
                nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    //try {console.log('luhn ' + value + " " + nCheck)} catch(err) {}
    return (nCheck % 10) == 0;

}

function rubricaErr(val) {
    console.log(val);
}

function checkSubmitForm() {

    // controlliamo tutti i campi NUMERO DI TELEFONO
    if (!IsTypoLogged()) {
        var selectNumberNew = 'new';
        if (r$("#altro_numero").val() == '' || selectNumberNew == "" || r$("#refill_block .error").length > 0) {
            r$("#ricaricaForm").attr("disabled", true)
        } else {
            r$("#ricaricaForm").attr("disabled", false)
        }
    } else {
        var selectNumberNew = r$("#select_numbert").val();
        if ((r$("#altro_numero").val() == '' && selectNumberNew == "new") || r$("#refill_block .error").length > 0) {
            r$("#ricaricaForm").attr("disabled", true)
        } else {
            r$("#ricaricaForm").attr("disabled", false)
        }
    }

    // controlliamo tutti i campi di CARTA DI CREDITO
    if (r$("input[name=mdp]:checked").val() == 'CCX') {
        if (r$("#input_cc").val() == '') {
            r$("#ricaricaForm").attr("disabled", true);
        }
        if (r$("#mese_carta").val() == '') {
            r$("#ricaricaForm").attr("disabled", true);
        }
        if (r$("#anno_carta").val() == '') {
            r$("#ricaricaForm").attr("disabled", true);
        }
        if (r$("#security_cc").val() == '') {
            r$("#ricaricaForm").attr("disabled", true);
        }
    }


}



//merge file ricarica2

//controllo mail
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

r$('.refill_notification input')
  .keyup(function() {
    r$(this)
      .val(r$(this).val().toLowerCase());
  });

r$('.refill_notification input')
  .blur(function() {
    controlMail();
  });

r$('.refill_notification input')
  .focus(function() {
    r$('.notificationMail')
      .removeClass('error');
    r$('.refill_notification .notificationMail + span')
      .removeClass('error');
  });
//end


//REMOVE ERROR ON FOCUS
r$('.number_top_up_confirm')
  .focus(function() {
    r$(this)
        .removeClass('error');
    r$('.number_top_up_confirm + span')
        .removeClass('error');
  });
//REMOVE ERROR ON FOCUS


//REMOVE CARD
function removeCard(card, radio) {
    r$(".popup-btn_1")
      .click(function() {
        card
          .slideUp()
          .addClass('deleted');
        radio
          .removeAttr('checked');
        checkNextStep();
      });
}
//REMOVE CARD

//SHOWMORE ON DELETE AND CHECKED NEW CARD
r$(".closeModal")
  .click(function() {
    if (r$(".item-box").hasClass('credit_card_main_radio')) {
      r$(".showMore_content")
        .fadeIn("slow")
        .css('display:static');
      r$(".showMore")
        .slideUp("fast");
      r$(".showMore_content")
        .getNiceScroll()
        .resize();
    }
    if (r$(".item-box").hasClass('deleted')) {
      r$('.newCard_main_radio input[type="radio"]')
        .prop('checked', true);
      r$("#action_c1")
        .addClass("active");
      r$("#action_c1 .cont_item1")
        .slideDown(timer);
      r$("#action_c1")
        .getNiceScroll()
        .resize();
    }
});
//FINE SHOWMORE ON DELETE




//######################################################################################
//############### INCLUSIONE JS DEDICATI ALLA RICARICA DA CUSTOM #######################
//######################################################################################



function checkNextStep() {
    var radioCC = r$('.credit_card_main_radio input[type="radio"]'); // carta predefinita
    var subRadioCC = r$('.optional_card input[type="radio"]'); // seconda carta inserita
    var radioPay = r$('.paypal_main_radio input[type="radio"]'); //paypal
    var radioCharge = r$('.charge_main_radio input[type="radio"]'); //addebito su conto radio apertura
    var radioBill = r$('.bill_main_radio input[type="radio"]'); //addebito su conto telefonico radio apertur
    var subRadioBill = r$('.item_bill input[type="radio"]'); // contratto
    var subRadioCharge = r$('.item_charge input[type="radio"]'); // conto
    var subRadioNewCard = r$('.newCard_main_radio input[type="radio"]'); // nuva carta
    var securityCC = r$('#security_cc');

    //r$('.top_up_button_final').prop("disabled", true);

    if (r$('.action_numbert').hasClass('entered')) {
        if (checkNewNumber()) {
            if ((radioCC.is(':checked') ||
                    (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
                    (subRadioCC.is(':checked')) ||
                    (radioPay.is(':checked')) ||
                    (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
                    (subRadioBill.is(':checked') && radioBill.is(':checked'))) &&
                (controlMail())) {
                if (radioPay.is(':checked')) {
                    r$('#paypal-checkbox').attr('checked', true);
                }
                //r$('.top_up_button_final').prop("disabled", false);
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
                r$('#paypal-checkbox').attr('checked', true);
            }
            // r$('.top_up_button_final').prop("disabled", false);
        }
    }

}

r$(function() {
    
});
