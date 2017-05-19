/***************************************************************************
 *
 * !!!IMPORTANT!!!!!
 *
 * Required to add "expandable" class to elements that have the expanding box
 *provaprova4de
 ***************************************************************************/


var r$ = jQuery.noConflict();

r$(document)
    .ajaxStart(function() {
        r$("#spinner")
            .show();
        r$("#refill_block")
            .append('<span class="fa fa-spinner spin-animate"></span>');
    })
    .ajaxStop(function() {
        r$("#spinner")
            .hide();
        r$("span.fa.fa-spinner.spin-animate")
            .remove();
    })
    .ajaxError(function() {
        r$("#spinner")
            .hide();
        r$("span.fa.fa-spinner.spin-animate")
            .remove();
    })
    .ready(function() {
        //per blocco ricarica
        r$("#sendBloccoRicarica")
            .click(function() {
                loadFromBlockRecharge();
            });

        handleOriginPath();
        bindInputFields();

        //full height dialog (modal ricarica)
        r$('.base__popup-link--ricarica, .base__popup-link-carrello')
            .magnificPopup({
                type: 'inline',
                mainClass: 'mfp-fade mfp-ricarica',
                // closeOnContentClick: true,
                midClick: true,
                alignTop: false,
                removalDelay: 350,
                callbacks: {
                    close: function() {
                        initCreditCardInput();
                        r$("#checkPaypal").remove();
                        r$("#checkCreditcard").remove();
                        setCookie("taglioDft", null);
                    },
                    open: function() {
                        handleTypoLogging();
                        initRic();
                        r$("#ricaricaForm")
                            .attr("disabled", false);
                    }
                }
            });
    });

function isValidSecureCode(cvvNumber) {

    var regex = /^[0-9]{3,4}$/;

    return regex.test(cvvNumber) ? true : false;

}

function isValidPhoneNumber(primaryNumberInput) {

    var regex = /^[03][0-9]{8,11}$/g;
    var primaryNumberInputVal = primaryNumberInput.val();

    var regexTestResult = regex.test(primaryNumberInputVal);
    var isNumberWindResult = isNumberWind(primaryNumberInputVal);

    var isValid = isNumberWindResult.done(function(esito) {
        if (regexTestResult) {
            if (esito.esito == "KO") {
                addError(primaryNumberInput, 'Il numero non è corretto');
            } else {
                removeError(primaryNumberInput, true);
                checkNextStep();
            }
        } else {
            addError(primaryNumberInput, 'Il numero non è corretto');
            return false
        }
    })
}


function checkNumber(primaryNumberInput, confirmNumberInput) {

    var primaryNumberInputVal = primaryNumberInput.val();
    var confirmNumberInputVal = confirmNumberInput.val();

    if (primaryNumberInputVal != "" && primaryNumberInputVal === confirmNumberInputVal) {
        return true;
    } else {
        return false;
    }
}

function isNumberWind(number) {
    return r$.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/onLineRecharge/checkWindNumber.action',
        global: false,
        data: {
            msisdn: number
        },
        dataType: "json"
    });

}

function checkNewNumber() {
    var primaryNumberInput = r$('.number_top_up');
    var confirmNumberInput = r$('.number_top_up_confirm');

    var checkNumberResult = checkNumber(primaryNumberInput, confirmNumberInput);

    return checkNumberResult;
}

function handlePaymentChange(selectedPayment) {
    var selectedPaymentBox = selectedPayment.closest('.item-box');
    var otherPayments, expandablePayments;
    if (selectedPaymentBox.is('.credit_card_main_radio')) {
        var otherPaymentsContainer = selectedPaymentBox.nextAll('.showMore_content');
        otherPayments = otherPaymentsContainer.children('.item-box');
        expandablePayments = otherPaymentsContainer.children('.item-box.expandable .cont_item1');
    } else {
        otherPayments = selectedPaymentBox.siblings('.item-box');
        expandablePayments = selectedPaymentBox.siblings('.item-box.expandable .cont_item1');
    }

    if (!selectedPaymentBox.hasClass('active')) {
        otherPayments
            .each(function() {
                var currentCycledPayment = r$(this);
                if (currentCycledPayment.hasClass('active')) {
                    currentCycledPayment.removeClass('active');
                    if (currentCycledPayment.hasClass('expandable')) {
                        currentCycledPayment
                            .find('.cont_item1')
                            .slideUp("slow");
                    }
                }
            });
        if (selectedPaymentBox.hasClass('expandable')) {
            selectedPaymentBox
                .find('.cont_item1')
                .slideDown("slow", function() {
                    selectedPaymentBox
                        .addClass('active')
                        .getNiceScroll()
                        .resize();
                });
        }
    }
    checkNextStep();
}

function checkCard(value) {
    var enabled = true;
    if (!enabled) {
        return true;
    }
    if (/[^0-9]+/.test(value)) {
        // accept only digits, dashes or spaces
        return false;
    }
    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
        nDigit = 0,
        bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);
        if (bEven) {
            if ((nDigit *= 2) > 9)
                nDigit -= 9;
        }
        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10) == 0;

}

//############################################################################
//############### Created by Giovanni on 09/11/16. ###########################
//############################################################################
/*

 --LISTA CARTE
 /wind/ajax/rubricaCarte/list.action
 --MODIFICA CARTA
 /wind/ajax/rubricaCarte/save.action
 --ELIMINA
 input ALIAS
 /wind/ajax/rubricaCarte/delete.action
 --SETTA ALIAS DEFAULT
 input ALIAS
 /wind/ajax/rubricaCarte/default.action



 submit ricarica
 numero
 altro numero select val new

 <input type="hidden" name="numero" id="mio_numero" value="new"/>


 numero_ricarica


 if CCX
 alias

 numero_carta
 mese_scadenza_carta
 anno_scadenza_carta   due valori
 titolare_carta
 codsicurezza_carata


 PAYPAL


 BANCOPOSTA

 CTL
 cdf

 SME CTL su linea SME solo CDF Linea

 */
//############################################################################
//############### Created by Giovanni on 09/11/16. ###########################
//############################################################################

function initRic() {

    if (window.location.href.match("abbandon=true")) {
        abbandonoRicarica();
    }

    retrieveCustomer();
    mdpValueChecked();

}

function submitRicarica() {
    /**
     *  Se Loggato
     *
     *  parametro numero
     *  IF CCX
     *
     */

    /**
     *  alias
     *
     *  numero_carta
     *  mese_scadenza_carta
     *  anno_scadenza_carta (due valori)
     *  titolare_carta
     *  codsicurezza_carta
     */

    var numero = r$("#select_numbert").val();
    var taglio = r$("#select_taglio").val();
    var altro_numero = r$("#altro_numero").val();
    var mdp = (r$("input[name=mdp]:checked").val().length > 8) ? 'CCX' : r$("input[name=mdp]:checked").val();
    var alias = r$("#creditCard-logged input[name=mdp]:checked").val();
    var numeroCCX = r$("#input_cc").val().replace(/\s/g, '');
    var mese = r$("#mese_carta").val();
    var anno = r$("#anno_carta").val();
    var cvv2 = r$("#security_cc").val();
    var titolare = "da inserire";
    //r$("#titolare_carta").val() todo: fixme

    var ricorda_agreement = r$("#paypal-checkbox").is(':checked') ? 'Y' : 'N';
    var ricorda_carta = r$("#salvadati-checkbox").is(':checked') ? 'Y' : 'N';
    var email = r$("input[type=email].base__input.notificationMail").val();
    var cdf = r$("input[name=cdf]:checked").val();
    var urlOK = 'https://' + document.location.hostname + document.location.pathname + "?result=true#refill_block";
    var urlAbbandona = 'https://' + document.location.hostname + document.location.pathname + "?abbandon=true#refill_block";

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
            dataType: "json"
        })
        .done(function(res) {
            setCookie("taglioDft", null);
            if (res.esito == "OK") {
                switch (res.tipo_nav) {
                    case 'NORMAL':
                        //CARICO ESITO DELLA RICARICA INVOCANDO LA RESULT AJAX
                        showEsitoRicarica(res.id);
                        break;
                    case 'REDIRECT':
                        //Faccio redirect
                        //Salvo l'idRicarcia
                        if (mdp == "CTL" || mdp == "SME") {
                            showEsitoRicarica(res.id);
                        } else {
                            window.location.href = res.url;
                        }
                        break;
                    default:
                        showEsitoRicarica(res.id);
                        break;
                }
            } else {
                console.warn("Errore ricarica", res.error_description);
                callPopUp("errore", "Gentile cliente, si è verificato un errrore, ti preghiamo di riprovare tra qualche ora", false, true, '', 'chiudi', '');
                //alert("Si è verificato un errore, riprova più tardi");
            }
        })
        .fail(function(e) {
            $("#ricaricaForm")
                .attr('submitricarica', '');
            console.warn("Fail Errore ricarica", e);
        });
}

function abbandonoRicarica() {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/abbandona.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            console.log("RICARICA ABBANDONATA", res);
            //loadEsito();
        })
        .fail(function(e) {
            console.warn("Fail Errore RICARICA ABBANDONATA", e);
        });
}

function showEsitoRicarica(id) {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/result.action',
            data: {
                //    id:id
            },
            dataType: "json"
        })
        .done(function(res) {
            if (res.error_code == "-99") {
                var funzClose = function() {
                    r$('#refill_block .top .mfp-close')
                        .trigger("click");
                };
                callPopUp("errore", "Gentile cliente, si è verificato un errrore, ti preghiamo di riprovare tra qualche ora", false, true, '', 'chiudi', false, funzClose);
            } else {


                var emailRes = (res.EMAIL != "") ? '<span class="left"> Indirizzo e-mail: </span> <span class="right" id="EMAIL">' + res.EMAIL + '</span>' : '';

                var content = '<div class="box"><i class="left rotatey-animate base__icon icon_confirm--color"></i>' + '<h3 id="TITLE" class="colored_text--orange">' + res.TITLE + '<br><small id="SUB_TITLE">' + res.SUB_TITLE + '</small>' + '</h3>' + '<div class="clear"></div>' + '<hr>' + '<h3 class="text strong">Riepilogo</h3>' + '</div>' + '<div class="item-box">' + '<span class="left"> Codice ricarica: </span>' + '<span class="right" id="ID">' + res.ID + '</span>' + '</div>' + '<div class="item-box">' + '<span class="left"> Numero indicato: </span>' + '<span class="right" id="CLI">' + res.CLI + '</span>' + '</div>' + '<div class="item-box">' + '<span class="left"> Data operazione: </span>' + '<span class="right" id="DATA">' + res.DATA + '</span>' + '</div>' + '<div class="item-box">' + '<span class="left"> Modalità di pagamento: </span>' + '<span class="right" id="MODALITA">' + res.MODALITA + '</span>' + '</div>' + '<div class="item-box">' + '<span class="left"> Taglio di ricarica richiesto: </span>' + '<span class="right" id="TAGLIO">' + res.TAGLIO + '</span>' + '</div>' + '<div class="item-box">' + '<span class="left"> Importo pagato: </span>' + '<span class="right" id="IMPORTO">' + res.IMPORTO + '</span>' + '</div>' + '<div class="item-box">' + emailRes + '</div>';

                loadEsito(content);
                if (res.success == false) {
                    r$("#pko").hide();
                }
                r$("#refill_block .base__scrollable")
                    .getNiceScroll()
                    .resize();
            }
        })
        .fail(function(e) {
            console.warn("Fail Errore ricarica", e);
        });
}

var tagli = [];

function Taglio(id, importo, bonus, mdp, p3x2, testoBonus, dft) {
    this.dft = dft;
    this.importo = importo;
    this.bonus = bonus;
    this.mdp = mdp;
    this.p3x2 = p3x2;
    this.id = id;
    this.testoBonus = testoBonus;
    this.testoGA = '';
}

Taglio
    .prototype
    .toOption = function() {
        var b = "";
        var topUpImportRow = "";
        if (this.bonus != "0") {
            b = this.testoBonus;
            if (b == null) {
                b = this.importo + " + " + this.bonus + ' omaggio!';
            }
        } else {
            b = this.importo;
            if (this.testoGA != "")
                b = b + this.testoGA;
        }

        if (this.dft == 'Y') {
            topUpImportRow = '<option selected ' + 'option value="' + this.id + '" ';
        } else {
            topUpImportRow = '<' + 'option value="' + this.id + '" ';
        }

        topUpImportRow += 'data-bonus="' + this.bonus + '" data-taglio="' + this.importo + '" ' +
            'data-content="' + b + '<span class=\'euro\'>&euro;</span>"' +
            'data-p3x2="' + this.p3x2 + '">' +
            b + '</option>';

        return topUpImportRow;
    };

var numeri = [];

function Linee(linea, sme, billing, label) {
    this.linea = linea;
    this.sme = sme;
    this.billing = billing;
    this.label = label;
}

Linee
    .prototype
    .toOption = function() {
        var bill = this.billing;
        if (!this.sme)
            bill = '';

        var billingRow = '<' + 'option value="' + this.linea + '" ' +
            'smecdf="' + bill + '">' +
            this.label + '</option>';
        return billingRow;
    };

function addTaglio(taglio) {
    if (tagli[taglio.mdp] == null) {
        tagli[taglio.mdp] = [];
    }
    tagli[taglio.mdp]
        .push(taglio);
}

function addNumero(numero) {
    if (numeri == null) {
        numeri = [];
    }
    numeri
        .push(numero);
}

function retrieveCustomer() {
    popolaCliente();

    //popolaNumeri();
}

function popolaCliente() {

    var funzClose = function() {
        r$('#refill_block .top .mfp-close')
            .trigger("click");
    };

    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/start.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            if (IsTypoLogged()) {
                listCarte(null, res.ricordaPAYPAL);
            }
            var closeButton = r$('#refill_block .top .mfp-close');
            var lineSelect = r$('#select_numbert');
            var lineSelectContainer = lineSelect.parents('.select_numbert');
            var newLineContainer = lineSelectContainer.siblings('.action_numbert');

            lineSelect
                .find('option')
                .remove();

            if (res.esito == "OK") {

                r$("#emailricarica").val(res.useremail);

                if (res.linee != null && res.linee.length > 0) {
                    for (var i = 0; i < res.linee.length; i++) {
                        var tg = res.linee[i];
                        lineSelect
                            .append(new Linee(tg.msisdn, tg.sme, tg.cdf, tg.msisdn).toOption());
                    }
                    lineSelect
                        .append(new Linee("new", false, '', 'Altro numero').toOption())
                        .selectpicker('refresh');
                    lineSelectContainer
                        .fadeIn();
                    newLineContainer
                        .fadeOut();
                } else {
                    lineSelect
                        .append(new Linee("new", false, '', 'Altro numero').toOption());
                    lineSelect
                        .selectpicker('refresh');
                    newLineContainer
                        .addClass('entered')
                        .fadeIn();
                    lineSelectContainer
                        .fadeOut()
                        .hide();
                }
                tagli = [];

                if (res.cdf != null && res.cdf.length > 0) {
                    r$("#action_c4")
                        .html("");

                    for (var i = 0; i < res.cdf.length; i++) {
                        var tg = res.cdf[i];
                        addCdf(tg, i);
                    }
                    r$("#action_c3")
                        .show();
                } else {
                    r$("#action_c4")
                        .fadeOut();
                }

            } else {
                callPopUp("errore", "Gentile cliente, si è verificato un errrore, ti preghiamo di riprovare tra qualche ora", false, true, '', 'chiudi', false, funzClose);
            }
        })
        .fail(function(e) {
            console.warn("ERRORE CHIAMATA", e);
            callPopUp("errore", "Gentile cliente, si è verificato un errrore, ti preghiamo di riprovare tra qualche ora", false, true, '', 'chiudi', false, funzClose);

        });
}

function popolaNumeri() {
    var select = r$('#select_numbert');
    var form = r$(".action_numbert");
    select
        .find('option')
        .remove();
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/linee.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            if (res.esito == "OK" && res.linee != null) {
                for (var i = 0; i < res.linee.length; i++) {
                    var tg = res.linee[i];
                    select
                        .append(new Linee(tg.msisdn, tg.sme, tg.cdf, tg.msisdn).toOption());
                    var info = "Aggiungo Linea " + (i + 1);
                }
                select
                    .append(new Linee("new", false, '', 'Altro numero').toOption())
                    .fadeIn();
                form
                    .fadeOut();
            } else {
                console.warn("Esito altro numero - Nessun numero trovato");
                errorPopolaNumeri();
            }
        })
        .fail(function() {
            console.warn("Esito altro numero - Errore ajax");
            errorPopolaNumeri();
        });
    select
        .selectpicker('refresh');
}

function errorPopolaNumeri() {

    r$('#select_taglio')
        .append(new Linee("new", false, '', 'Altro numero').toOption());

    r$(".select_numbert")
        .fadeOut("fast");

    r$(".action_numbert")
        .fadeIn("fast");
}

function filterTagliByMdp(mdp, dft) {

    if (mdp == null) {
        mdp = "CCX";
    }
    var newt = tagli[mdp];
    if (newt != null) {
        var elTaglio = r$("#select_taglio");
        var importo = elTaglio.children("option:selected").attr("data-taglio");
        elTaglio
            .find('option')
            .remove();
        var t = newt[0];
        for (var i = 0; i < newt.length; i++) {
            elTaglio
                .append(newt[i].toOption());
            if (newt[i].importo == importo) {
                t = newt[i];
            }
        }
        if (t != null) {
            elTaglio
                .val(t.id)
                .trigger('change');
        }

        var taglioDtf = getCookie("taglioDft");
        r$("#select_taglio").children()
            .each(function() {
                if (r$(this).attr("data-taglio") == taglioDtf) {
                    dft = r$(this).val();
                }
            });

        if (dft) {
            elTaglio
                .selectpicker('refresh').val(dft);
        } else {
            elTaglio
                .selectpicker('refresh');
        }
        elTaglio.selectpicker('refresh');
    }
    checkSubmitForm();
}

function checkDataScadenza() {
    var dToday = new Date();

    var today = "" + dToday.getFullYear();

    if (dToday.getMonth() + 1 < 10) {
        today += "0";
    }
    today += dToday.getMonth() + 1;

    var monthInputField = r$('#mese_carta');
    var yearInputField = r$('#anno_carta');
    var monthInputFieldVal = monthInputField.val();
    var yearInputFieldVal = yearInputField.val();


    if (yearInputFieldVal == "" || yearInputFieldVal == "Anno" || monthInputFieldVal == "" || monthInputFieldVal == "Mese") {
        removeError(monthInputField);
        removeError(yearInputField);
        return true;
    }
    var scad = yearInputFieldVal + monthInputFieldVal;

    if ("" + parseInt(scad) != scad) {
        addError(monthInputField, "La data non è valida");
        return false;
    }
    if (parseInt(today) > parseInt(scad)) {
        addError(monthInputField, "La data deve essere posteriore alla data attuale");
        return false;
    }
    removeError(monthInputField);
    return true;
}

var numCheck = 0;
var verificaNumero = true;

function retrieveTagli() {
    tagli = [];
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/tagli.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            var dft;
            if (res.esito == "OK" && res.tagli != null) {
                for (var i = 0; i < res.tagli.length; i++) {
                    var tg = res.tagli[i];
                    addTaglio(new Taglio(tg.id, tg.importo, tg.bonusDaVisualizzare, tg.type, null, tg.testoBonus, tg.dft));
                    if (r$("input[name=mdp]:checked").val() == tg.type && tg.dft == 'Y') {
                        dft = tg.id;
                    }
                }
            }

            filterTagliByMdp(r$("input[name=mdp]:checked").val(), dft);

            r$('#select_taglio').on({
                'change': function(event) {
                    setCookie("taglioDft", r$("#select_taglio").children("option:selected").attr("data-taglio"));
                }
            });
            setCookie("taglioDft", null);
        })
        .fail();
}

/*function updateBillingCenters() {
    var cdf = getSmeNumberCdf();
    if (cdf != null) {
        if (r$("#mdp").val() == "CTL") {
            r$("#mdp").val("SME");
        }
    } else {
        if (r$("#mdp").val() == "SME")
            r$("#mdp").val("CTL");
    }
    filterTagliByMdp(r$("#mdp").val());
    r$('#select_taglio').trigger('change');
}*/

function getSmeNumberCdf() {
    var sel = r$("#select_numbert option:selected");
    if (r$(sel).val() == "new")
        return null;
    var cdf = r$(sel).attr("smecdf");
    if (cdf == null || cdf == "") {
        return null;
    }
    return cdf;
}

function loadYear() {
    var select = r$("#anno_carta");
    select
        .find('option')
        .remove();
    var thisYear = new Date().getFullYear();
    for (var i = 0; i <= 11; i++) {
        var year = thisYear + i;
        r$('<option>', {
                value: year,
                text: year
            })
            .appendTo(select);
    }
    select
        .selectpicker('refresh');
}

function loadMonth() {
    var select = r$("#mese_carta");
    select
        .find('option')
        .remove();
    for (var i = 0; i <= 11; i++) {
        var month = i + 1;
        if (month >= 10) {
            month = month;
        } else {
            month = "0" + month;
        }
        r$('<option>', {
                value: month,
                text: month
            })
            .appendTo(select);
    }
    select
        .selectpicker('refresh');
}

var types = [{
    "type": "postepay",
    'reg': ["^(402360|402361|403035|417631|529948|531346|536414)[0-9]*"]
}, {
    "type": "visa",
    'reg': ["^4([0-9]*)$"]
}, {
    "type": "americane",
    'reg': ["^3(4|7)[0-9]*$"]
}, {
    "type": "maestro",
    'reg': ["^(50|67)[0-9]*"]
}, {
    "type": "masterc",
    'reg': ["^5(1|5|2|3)[0-9]*$"]
}, {
    "type": "diners",
    'reg': ["^(36|38)[0-9]*$", "^(300|301|302|303|304|305)[0-9]*$"]
}, {
    "type": "general",
    'reg': ["^[0-9]/g"]
}];

function deduceCardTypeByNumber(number) {
    for (var i = 0; i < types.length; i++) {
        var regEx = types[i].reg;
        for (var j = 0; j < regEx.length; j++) {
            if (number.match(regEx[j]))
                return types[i].type;
        }
    }
    return null;
}

function isValidCvv(cvvNumerInput, ccNumberInput) {
    var cvvNumerInputVal = cvvNumerInput.val();
    var ccNumberInputVal = ccNumberInput.val();
    ccNumberInputVal = ccNumberInputVal.replace(/\s+/g, '');
    // "#formRecharge [name=codsicurezza_carta]"
    var l = cvvNumerInputVal.length;
    var result = true;
    if (cvvNumerInputVal.match("^[0-9]+$") == null) {
        result = false;
    } else {
        var tipo = deduceCardTypeByNumber(ccNumberInputVal);
        if ((tipo == "americane" && l != 4) ||
            (tipo != "americane" && l != 3)) {
            result = false;
        } else {
            result = true;
        }
    }
    return result;
}

var iconNames = ['visa', 'postepay', 'americane', 'maestro', 'masterc', 'diners', 'general', 'null'];

function showCcxType(creditCardvalue, creditCardInput, cvvNumerInput) {

    var classToAdd = deduceCardTypeByNumber(creditCardvalue) + "_cc";
    if (classToAdd !== undefined) {
        $.each(iconNames, function(index, iconName) {
            var iconClassName = iconName + '_cc';
            if (iconClassName !== classToAdd) {
                creditCardInput
                    .removeClass(iconClassName);
            }
        });
        if (!creditCardInput.hasClass(classToAdd)) {
            creditCardInput
                .addClass(classToAdd);
            if (classToAdd == "americane_cc") {
                cvvNumerInput
                    .attr('maxlength', 4)
                    .addClass('cvv_amex')
                    .removeClass('cvv_carta');
            } else if (classToAdd == "null_cc") {
                cvvNumerInput
                    .attr('maxlength', 3)
                    .removeClass('cvv_amex')
                    .removeClass('cvv_carta');
            } else {
                cvvNumerInput
                    .attr('maxlength', 3)
                    .removeClass('cvv_amex')
                    .addClass('cvv_carta');
            }
        }
    } else {
        $.each(iconNames, function(index, iconName) {
            var iconClassName = iconName + '_cc';
            creditCardInput
                .removeClass(iconClassName);

        });
        cvvNumerInput
            .removeClass('cvv_amex')
            .removeClass('cvv_carta');
    }

}

function setDefaultCard(id) {
    //showWaitBox()

    r$("input[name=selectedCard]")
        .val(id);
    r$("#ricaricaForm")
        .attr("disabled", false);
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/ajax/rubricaCarte/default.action',
            data: {
                'alias': id
            },
            dataType: "json"
        })
        .done(function(data) {
            //hideWaitBox()
            if (data.OK) {
                //$.fancybox.close()
                //updateParentPage(r$("#card" +id)[0]["card"])
            } else {
                console.warn("error", data.msg);
            }
        })
        .fail(function(e) {
            console.warn("Si è verificato un errore:", e);
        });
}

function addCard(c, defaultVal, k) {

    var row = '';

    switch (k) {
        case 0:
            row = '<div class="item-box credit_card_main_radio ak-item-credit-card-logged" id="creditCard-logged" >' +
                '<div class="cont__item_cc">' +
                '<div class="base__radio radio radio-inline">' +
                '<input type="radio" id="option_cc' + c.alias + '" value="' + c.alias + '"  name="mdp" data-type="aliascc" class="savedCard" checked>' +
                '<label class="label_for_creditCard" for="option_cc' + c.alias + '" >' +
                '<div class="detail-cc">' +
                '<div class="pull-left">' +
                '<span class="card-image"><i class="base__icon icon_' + c.tipo.toLowerCase() + '"></i></span>' +
                '<span class="card-number-crypted"> • • • • </span>' +
                '<span class="card-number-clear paypal-email">' + c.tail + '</span>' +
                '</div>' +
                '<div class="pull-left expiration">' +
                '<span class="expiration-label">Scad.</span>' +
                '<span class="expiration-date">' + c.month + '/' + c.year + '</span>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</label>' +
                '<a class="btn top_up_remove_btn btn_removeModal" href="javascript:void(0)" data-alias="' + c.alias + '">RIMUOVI</a>' +
                '</div>' +
                '<div class="clear"></div>' +
                '<!--  <h4>predefinito</h4>' +
                '<a class="btn">MODIFICA</a>' +
                '<a class="btn top_up_remove_btn">RIMUOVI</a> -->' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>';

            break;
        default:
            row = '<div class="item-box ak-item-credit-card-logged">' +
                '<div class="cont__item_cc">' +
                '<div class="base__radio radio radio-inline optional_card">' +
                '<input type="radio" id="option_cc' + c.alias + '" value="' + c.alias + '" data-type="aliascc" name="mdp" class="savedCard">' +
                '<label class="label_for_creditCard" for="option_cc' + c.alias + '" >' +
                '<div class="detail-cc">' +
                '<div class="pull-left">' +
                '<span class="card-image"><i class="base__icon icon_' + c.tipo.toLowerCase() + '"></i></span>' +
                '<span class="card-number-crypted"> • • • • </span>' +
                '<span class="card-number-clear paypal-email">' + c.tail + '</span>' +
                '</div>' +
                '<div class="pull-left expiration">' +
                '<span class="expiration-label">Scad.</span>' +
                '<span class="expiration-date">' + c.month + '/' + c.year + '</span>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</label>' +
                '<a class="btn top_up_remove_btn btn_removeModal" href="javascript:void(0)" data-alias="' + c.alias + '">RIMUOVI</a>' +
                '</div>' +
                '<div class="clear"></div>' +
                '<!--  <h4>predefinito</h4>' +
                '<a class="btn">MODIFICA</a>' +
                '<a class="btn top_up_remove_btn">RIMUOVI</a> -->' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>';
            break;
    }

    if (k == 0) {
        r$(row).insertBefore("#refill_block .showMore");
    } else {
        r$("#refill_block .showMore_content").prepend(row);
    }

    loadYear();
    loadMonth();
}

function deleteCard(id) {
    //showWaitBox()
    //
    var deletingDefaultCard = r$("[name=carta_modificata]:checked").val() == id;
    r$.post("/nuovaAreaClienti/wind/ajax/rubricaCarte/delete.action", {
            'alias': id
        },
        function(data) {
            if (data.OK) {
                listCarte(deletingDefaultCard ? updateParentPage : null);
            } else
                console.warn(data.msg);
        }).fail(function(e) {
        console.warn("Si è verificato un errore", e);
    });

}

function listCarte(onFinish, paypal) {
    // showWaitBox()
    // clearCardForm()

    if (r$("#refill_block_box:visible").html()) {
        r$.ajax({
                type: "GET",
                url: '/nuovaAreaClienti/wind/ajax/rubricaCarte/list.action',
                data: {},
                dataType: "json"
            })
            .done(function(data) {
                if (data.OK) {
                    if (data.cards == 0) {
                        r$('#refill_block .showMore')
                            .trigger("click");
                        if (paypal == true) {
                            r$('#refill_block #option2')
                                .trigger("click");
                            /*r$("#ricaricaForm")
                                .attr("disabled", false);*/
                            r$("#action_c2 .text_p").html("clicca su RICARICA per effettuare subito il pagamento");
                            //todo implementare la parte legata a paylpal
                        } else {
                            r$('#refill_block #option1')
                                .trigger("click");
                            r$("#listaCarteTable .base__radio.radio.base__radio--small.radio-inline")
                                .remove();
                            r$("#ricaricaForm")
                                .attr("disabled", true);
                        }
                    } else {
                        r$(".ak-item-credit-card-logged")
                            .remove();
                        r$("#ricaricaForm")
                            .attr("disabled", false);
                        for (var i = 0; i < data.cards.length; i++) {
                            addCard(data.cards[i], i == 0, i);
                        }
                        if (onFinish != null)
                            onFinish();
                    }



                } else {
                    var submitLogout = function() {
                        r$("#LogoutForm").submit();
                    };
                    callPopUp("errore", data.msg, false, true, '', 'chiudi', false, submitLogout);
                    console.warn(data.msg);
                }
            })
            .fail(function(e) {
                console.warn("Si è verificato un errore.", e);
            });
    }


}

function saveCard() {
    if (checkCard()) {
        return;
    }
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/ajax/rubricaCarte/save.action',
            data: {},
            dataType: "json"
        })
        .done(function(data) {
            r$("#nuovacarta")
                .serialize();
            //hideWaitBox()
            if (data.OK) {
                /* if (savedCardPostFunction != null) {
                 r$("#ins_ccx").hide();
                 r$("#aliasPresent").show();
                 if (data.card.img != null && data.card.img.indexOf("http") == -1) {
                 data.card.img = "#{initConfiguration.initParameterMap['AC_IMG_PATH']}/ricarica/" + data.card.img;
                 }
                 savedCardPostFunction(data.card); */
            } else {
                console.error("Errore salvataggio Carta");
            }

        })
        .fail(function(data) {
            console.error("Errore salvataggio CCX");
        });
}

function addCdf(c, i) {
    var label = "";
    if (c.mode.match("ADDEBITO SU C/C BANCARIO|ADDEBITO SU C/C POSTALE"))
        label = "&#160;con addebito su conto corrente n&#176; " + c.CCNumebr;
    else if (c.mode == 'CARTA DI CREDITO')
        label = "&#160;con addebito su carta di credito";
    else if (c.mode == 'BOLLETTINO POSTALE')
        label = "&#160;con addebito su bollettino postale";
    else
        label = c.mode;
    var row =
        '<div class="base__radio base__radio--small radio radio-inline">' +
        '<input type="radio" id="option_dct' + c.code + '"value="' + c.code + '" name="cdf" ' + (i == 0 ? 'checked' : '') + '>' +
        '<label for="option_dct' + c.code + '">' +
        '<span class="contract__popup" data-contract="' + c.CCNumebr + '" data-line="' + c.code + '" data-offer="' + c.mode + '" name="mdp">Conto telefonico</span>' +
        '<span>' + label + '</span>' +
        '</label>' +
        '</div>';
    r$("#action_c4")
        .append(r$(row));
}

function getUrlParameter(sParam) {
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
    return false;
}

function bindInputFields() {
    r$('#refill_block')
        .on({
            'change': function(event) {
                var selectionValue = r$(this).val();
                handleNumberChange(selectionValue);
            }
        }, '#select_numbert')
        .on({
            'focus': function() {
                var primaryNumberInput = r$(this);
                removeError(primaryNumberInput);
            },
            'blur': function() {
                var primaryNumberInput = r$(this);
                if (primaryNumberInput.val() != "") {
                    isValidPhoneNumber(primaryNumberInput);
                }
            }
        }, '.number_top_up')
        .on({
            'focus': function() {
                var confirmNumberInput = r$(this);
                removeError(confirmNumberInput);
            },
            'blur': function() {
                var primaryNumberInput = r$('.number_top_up');
                var confirmNumberInput = r$(this);
                if (confirmNumberInput.val() != "") {
                    var checkNumberResult = checkNumber(primaryNumberInput, confirmNumberInput);
                    if (!checkNumberResult) {
                        addError(confirmNumberInput, 'Il numero non è corretto');
                    } else {
                        checkNextStep();
                    }
                }

            }
        }, '.number_top_up_confirm')
        .on({
            'click': function() {
                var showMoreLink = r$(this);
                var showMoreContent = showMoreLink.next();
                showMoreLink
                    .slideUp("fast");
                showMoreContent
                    .fadeIn("slow")
                    .css('display:static');
            }
        }, '.showMore')
        .on({
            'click': function() {
                var selectedPayment = r$(this);
                handlePaymentChange(selectedPayment);
                retrieveTagli();
                checkNextStep();
            }
        }, 'input[name="mdp"]')
        .on({
            'focus': function() {
                var creditCardElement = r$(this);
                var dirtyCreditCardValue = creditCardElement.val();
                var cleanCreditCardValue = dirtyCreditCardValue.replace(/\s/g, '');
                creditCardElement
                    .val(cleanCreditCardValue);
                removeError(creditCardElement);
            },
            'keydown': function(e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            },
            'keyup': function(e) {
                var creditCardElement = r$(this);
                var creditCardvalue = creditCardElement.val();
                var cvvNumerInput = r$('#security_cc');
                showCcxType(creditCardvalue, creditCardElement, cvvNumerInput);
            },
            'blur': function() {
                var creditCardElement = r$(this);
                var cleanCreditCardValue = creditCardElement.val();
                if (cleanCreditCardValue !== "") {
                    var checkCardResult = checkCard(cleanCreditCardValue);
                    if (!checkCardResult) {
                        addError(creditCardElement, 'Numero di carta non valido');
                    } else {
                        checkNextStep();
                    }

                    var value = cleanCreditCardValue;
                    var dirtyCreditCardValue = value.match(/.{1,4}/g).join(" ");
                    creditCardElement
                        .val(dirtyCreditCardValue);
                }
            }
        }, '#input_cc')
        .on({
            'changed.bs.select': function(event, clickedIndex, selectionValue) {
                checkDataScadenza();
            }
        }, '#mese_carta, #anno_carta')
        .on({
            'focus': function() {
                var cvvElement = r$(this);
                removeError(cvvElement);
            },
            'keyup': function(e) {
                var cvvElement = r$(this);
                var cvvNumber = cvvElement.val();
                return !isValidSecureCode(cvvNumber);
            },
            'blur': function() {
                var cvvElement = r$(this);
                var ccElement = r$('#input_cc');
                if (cvvElement.val() != "") {
                    var isValidCvvResult = isValidCvv(cvvElement, ccElement);
                    if (!isValidCvvResult) {
                        addError(cvvElement, "Il codice non è corretto!");
                    } else {
                        checkNextStep();
                    }
                }
            }
        }, '#security_cc')
        .on({
            'click': function() {
                var title = 'Ricorda i dati Carta di credito';
                var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire i dati della tua carta di credito. La carta utilizzata resterà disponibile per le successive ricariche. Per ragioni di sicurezza Wind non salva la tua carta ma esclusivamente un codice identificativo della stessa fornito dal sistema di pagamento. Per questo motivo saranno mostrati solo gli ultimi 4 numeri della carta. Potrai sempre modificarla, eliminarla o aggiungerne una nuova.';
                callPopUp(title, description, false, true, '', 'chiudi', '');
            }
        }, '.modalCc')
        .on({
            'click': function() {
                var clickedButton = r$(this);
                var cardToDelete = clickedButton.closest('.item-box');
                var radioToDisable = clickedButton.siblings('input[type="radio"]');
                var ccLastFourNumbers = clickedButton.siblings('.label_for_creditCard').find('.card-number-clear');

                var title = 'Stai per eliminare la carta che finisce per ' + ccLastFourNumbers.html();
                var description = '';
                var alias = clickedButton.attr("data-alias");

                var removeCardFunc = function() {
                    removeCard(cardToDelete, radioToDisable, alias);
                };
                callPopUp(title, description, true, true, 'rimuovi', 'annulla', removeCardFunc);

            }
        }, '.btn_removeModal')
        .on({
            'click': function() {
                var title = 'Ricorda i dati di Paypal';
                var description = 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire le credenziali sul sito di PayPal. Per ragioni di sicurezza Wind non salva le tue credenziali di accesso ma esclusivamente un codice identificativo fornito da PayPal. Potrai sempre modificare la tua scelta, deselezionando la voce Ricorda i miei dati.';
                callPopUp(title, description, false, true, '', 'chiudi', '');
            }
        }, '.modalPaypal')
        .on({
            'click': function() {
                var $self = r$(this);

                var title = 'Conto telefonico';
                var description = 'La ricarica online verrà addebitata sul Conto Telefonico a cui sono associate le seguenti linee/utenze:';
                var firstLabel = 'Linea/Utenza';
                var firstValue = $self.data().contract;
                var secondLabel = 'Offerta';
                var secondValue = $self.data().offer;
                var thirdLabel = 'Contratto';
                var thirdValue = $self.data().line;
                var btnLabel = 'Chiudi';
                callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel);
            }
        }, '.contract__popup')
        .on({
            'focus': function() {
                var mailNotificationInput = r$(this);
                removeError(mailNotificationInput);
            },
            'blur': function() {
                var mailNotificationInput = r$(this);
                var controlMailResult = controlMail(mailNotificationInput);
                if (!controlMailResult) {
                    addError(mailNotificationInput, 'Email non valida');
                }
            }
        }, '.notificationMail')
        .on({
            'click': function() {
                var $closeModalBtn = r$(this);

                var popup = $closeModalBtn.parents('.popup--contract,.popup');
                popup
                    .fadeOut(100, function() {
                        r$(this)
                            .remove();
                    });
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
            }
        }, '.closeModal')
        .on({
            'click': function() {
                submitRicarica();
            }
        }, '#ricaricaForm');
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function handleOriginPath() {
    if (window.location.href.match("#refill_block")) {
        r$.magnificPopup.open({
            items: {
                src: $('#refill_block')
            },
            type: 'inline',
            callbacks: {
                close: function() {
                    initCreditCardInput();
                    r$("#checkPaypal").remove();
                    r$("#checkCreditcard").remove();
                    r$(".esito_ricarica_wrapper").hide();
                    r$("#refill_block .box.refill_notification").show();
                    r$("#refill_block .box.box_2").show();
                    r$("#refill_block_box").show();
                    r$("#refill_block .showMore").show();
                },
                open: function() {
                    r$("#refill_block").css("opacity", 0);
                    r$('.esito_ricarica_wrapper')
                        .hide();
                    setTimeout(function() {
                        if (r$("#refill_block_box:visible").html()) {
                            handleTypoLogging();
                            initRic();
                        }
                        r$("#refill_block").css("opacity", 100);
                    }, 500);
                }
            }
        }, 0);
    }
    if (GetParameterByName('result') == "true" && window.location.hash.match("#refill_block")) {
        r$("#refill_block #refill_block_box").hide();
        showEsitoRicarica();
    }
}

function handleTypoLogging() {

    /*

    r$(".box.refill_notification").show();

    r$(".box.box_2").show();

    */
    r$(".esito_ricarica_wrapper")
        .hide();

    //r$("#refill_block .box.refill_notification").hide();
    //r$("#refill_block .box.box_2").hide();

    if (IsLogged()) {

        var payPalCheckbox = r$('#checkPaypal');
        var remembercardCheckbox = r$('#checkCreditcard');
        if (payPalCheckbox.length == 0) {
            var paypalContent = '<div id="checkPaypal" class="base__checkbox checkbox checkbox-inline remember_check">' +
                '<input type="checkbox" class="styled" id="paypal-checkbox" value="option1" checked="checked">' +
                '<label for="paypal-checkbox">Ricorda i miei dati</label>' +
                '<div class="base__icon icon_help--color modalPaypal"></div>' +
                '</div>';
            r$(paypalContent).insertAfter("#action_c2 .cont_item1 .text_p");
        }
        if (remembercardCheckbox.length == 0) {
            var ccxContent = '<div id="checkCreditcard" class="base__checkbox checkbox checkbox-inline remember_check">' +
                '<input type="checkbox" class="styled" id="salvadati-checkbox" value="option1" checked="checked">' +
                '<label for="salvadati-checkbox">Ricorda la mia carta per i pagamenti successivi</label>' +
                '<div class="base__icon icon_help--color modalCc"></div>' +
                '</div>';

            r$("#refill_block .container_select_cc")
                .append(ccxContent);
        }
    } else {
        r$('#refill_block .showMore')
            .hide();
        r$('#refill_block .showMore_content')
            .show();
        r$("#refill_block_box")
            .show();
        r$('#refill_block #option1')
            .trigger("click");
        r$(".box.refill_notification")
            .show();
        r$(".box.box_2")
            .show();
        r$(".action_numbert")
            .show();
    }
}

function newRecharge() {
    r$("#esitoRicarica").val(1);
    r$(".btn_close").trigger("click");
    window.location.href = window.location.origin + window.location.pathname + "?val=" + Math.floor(Date.now() / 1000) + "#refill_block";
}

function checkSubmitForm() {
    var selectNumberNew;
    // controlliamo tutti i campi NUMERO DI TELEFONO
    if (!IsTypoLogged()) {
        selectNumberNew = 'new';
        if (r$("#altro_numero").val() == '' ||
            selectNumberNew == "") {
            r$("#ricaricaForm")
                .attr("disabled", true);
        } else {
            r$("#ricaricaForm")
                .attr("disabled", false);
        }
    } else {
        selectNumberNew = r$("#select_numbert").val();
        if ((r$("#altro_numero").val() == '') && selectNumberNew == "new") {
            r$("#ricaricaForm")
                .attr("disabled", true);
        } else {
            r$("#ricaricaForm")
                .attr("disabled", false);
        }
    }

    // controlliamo tutti i campi di CARTA DI CREDITO
    if (r$("input[name=mdp]:checked").val() == 'CCX') {
        if (r$("#input_cc").val() == '' ||
            r$("#mese_carta").val() == '' ||
            r$("#anno_carta").val() == '' ||
            r$("#security_cc").val() == '') {
            r$("#ricaricaForm")
                .attr("disabled", true);
        }
    }
}

function loadEsito(content) {
    r$("#esitoricarica").prepend(content);
    r$(".esito_ricarica_wrapper").show();
    r$("#refill_block .box.refill_notification").hide();
    r$("#refill_block .box.box_2").hide();
    r$("#refill_block .showMore").hide();
    r$("#refill_block_box").hide();
    r$(".showMore_content").hide();
    r$(".ak-item-credit-card-logged").hide();

}

function controlMail(mailNotificationInput) {
    var mailNotificationInputValue = mailNotificationInput.val();
    if (mailNotificationInputValue != '') {
        if (!ValidateEmail(mailNotificationInputValue)) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function removeCard(card, radio, alias) {
    card.slideUp().addClass('deleted');
    radio.removeAttr('checked');
    deleteCard(alias);
    checkNextStep();
}

function checkCreditCard() {

    var radioCC = r$('.newCard_main_radio input[type="radio"]');
    var numberCC = r$('#input_cc').val();
    var monthCC = r$('#mese_carta');
    var yearCC = r$('#anno_carta');
    var securityCC = r$('#security_cc');

    numberCC = numberCC.replace(/\s/g, '');
    if ((numberCC.length > 13) &&
        checkCard(numberCC) &&
        checkDataScadenza() &&
        (securityCC.val().length >= 3)) {
        return true;
    } else {
        return false;
    }
}

function checkPayments() {
    var radioCC = r$('.credit_card_main_radio input[type="radio"]'); // carta predefinita
    var subRadioCC = r$('.optional_card input[type="radio"]'); // seconda carta inserita
    var radioPay = r$('.paypal_main_radio input[type="radio"]'); //paypal
    var radioCharge = r$('.charge_main_radio input[type="radio"]'); //addebito su conto radio apertura
    var radioBill = r$('.bill_main_radio input[type="radio"]'); //addebito su conto telefonico radio apertur
    var subRadioBill = r$('.item_bill input[type="radio"]'); // contratto
    var subRadioCharge = r$('.item_charge input[type="radio"]'); // conto
    var subRadioNewCard = r$('.newCard_main_radio input[type="radio"]'); // nuova carta
    var securityCC = r$('#security_cc');
    var mailNotificationInput = r$('.notificationMail');

    if ((radioCC.is(':checked') ||
            (subRadioNewCard.is(':checked') && checkCreditCard()) ||
            (subRadioCC.is(':checked')) ||
            (radioPay.is(':checked')) ||
            (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
            (subRadioBill.is(':checked') && radioBill.is(':checked'))) &&
        (controlMail(mailNotificationInput))) {
        if (radioPay.is(':checked')) {
            r$('#paypal-checkbox')
                .attr('checked', true);
        }
        r$('.top_up_button_final')
            .prop("disabled", false);
    }
}

function checkNextStep() {
    var newNumberContainer = r$('.action_numbert');
    if (newNumberContainer.hasClass('entered')) {
        if (checkNewNumber()) {
            checkPayments();
        }
    } else {
        checkPayments();
    }
}

function callPopUp(title, description, button1, button2, labelBtn1, labelBtn2, function1, function2) {
    var ricaricaContainer = r$('#refill_block .container');

    var popup =
        '<div class="popup">' +
        '<div class="popup-dialog">' +
        '<div class="popup-header">' + title + '</div>' +
        '<div class="popup-body">' + description + '</div>' +
        '<div class="popup-footer ">' +
        (button1 ? '<button id="confirmButton" class="btn popup-btn_1 btn_refil  base__bt  popup-btn top_up_newCard closeModal waves-effect waves-button waves-float waves-light">' + labelBtn1 + '</button>' : '') +
        (button2 ? '<button id="confirmButton2" class="popup-btn_2 btn_refil base__bt popup-btn closeModal waves-effect waves-button waves-float waves-light">' + labelBtn2 + '</button>' : '') +
        '</div>' +
        '</div>' +
        '</div>';


    ricaricaContainer
        .append(r$(popup).show());
    ricaricaContainer
        .find('.popup-btn')
        .show();

    if (function1) {
        r$("#confirmButton")
            .unbind();
        r$("#confirmButton")
            .on('click', function() {
                function1();
            });
    }

    if (function2) {
        r$("#confirmButton2")
            .unbind();
        r$("#confirmButton2")
            .on('click', function() {
                function2();
            });
    }
}

function callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel) {
    var ricaricaContainer = r$('#refill_block .container');

    var popup =
        '<div class="popup--contract">' +
        '<div class="popup--contract-dialog">' +
        '<div class="popup--contract-header">' + title + '</div>' +
        '<div class="popup--contract-body">' +
        '<div class="popup-body--description">' + description + '</div>' +
        '<div class="popup_row first_row">' +
        '<div class="first-label popup-body--label pull-left">' + firstLabel + '</div>' +
        '<div class="first-value popup-body--value pull-right">' + firstValue + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="divider"></div>' +
        '<div class="popup_row second_row">' +
        '<div class="second-label popup-body--label pull-left">' + secondLabel + '</div>' +
        '<div class="second-value popup-body--value pull-right">' + secondValue + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="divider"></div>' +
        '<div class="popup_row third_row">' +
        '<div class="third-label popup-body--label pull-left">' + thirdLabel + '</div>' +
        '<div class="third-value popup-body--value pull-right">' + thirdValue + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '</div>' +
        '<div class="popup--contract-footer ">' +
        '<button class="btn popup-btn_2 btn_refil  base__bt popup-btn  closeModal waves-effect waves-button waves-float waves-light">' + btnLabel + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    ricaricaContainer
        .append(r$(popup).show());
}

function handleNumberChange(selectionValue) {
    switch (selectionValue) {
        case 'new':
            r$(".action_numbert")
                .fadeIn("fast")
                .addClass('entered');
            r$('#ricaricaForm')
                .attr('disabled', true);
            break;
        default:
            r$(".action_numbert")
                .fadeOut("fast")
                .removeClass('entered');
            checkNextStep();
    }
}

function mdpValueChecked() {
    var mdpInputValue = r$("input[name=mdp]:checked").val();
    if (mdpInputValue == null) {
        r$("#CXX")
            .click();
    } else {
        r$("#" + mdpInputValue)
            .click();
    }
    loadYear();
}

function addError(inputElement, messageText) {
    var errorSpan;
    if (inputElement.is('select')) {
        errorSpan = inputElement.parent().next('span');
        inputElement = inputElement.parent();
    } else {
        errorSpan = inputElement.next('span');
    }

    inputElement
        .addClass('error');
    errorSpan
        .addClass('error');
    if (messageText) {
        errorSpan
            .text(messageText);
    }
}

function removeError(inputElement) {
    var errorSpan;
    if (inputElement.is('select')) {
        errorSpan = inputElement.parent().next('span');
        inputElement = inputElement.parent();
    } else {
        errorSpan = inputElement.next('span');
    }

    inputElement
        .removeClass('error');
    errorSpan
        .addClass('error');
}

function controlMail() {
    var input = r$(".refill_notification input");
    if (input.val() != '') {
        if (!ValidateEmail(input.val())) {
            r$('.notificationMail')
                .addClass('error');
            r$('.refill_notification .notificationMail + span')
                .addClass('error');
            r$('.refill_notification .notificationMail + span')
                .text('Email non valida');
            return false;
        } else {
            r$('.notificationMail')
                .removeClass('error');
            r$('.refill_notification .notificationMail + span')
                .removeClass('error');
            return true;
        }
    } else {
        r$('.notificationMail')
            .removeClass('error');
        r$('.refill_notification .notificationMail + span')
            .removeClass('error');
        return true;
    }
}

function initCreditCardInput() {
    r$("#input_cc:hidden")
        .val("");
    removeError(r$('#input_cc:hidden'));
    r$('#mese_carta:hidden')
        .val($("#mese_carta:hidden option:first").val());
    r$('#mese_carta:hidden')
        .selectpicker('refresh');
    removeError(r$('#mese_carta:hidden'));
    r$('#anno_carta:hidden')
        .val($("#anno_carta:hidden option:first").val());
    r$('#anno_carta:hidden')
        .selectpicker('refresh');
    removeError(r$('#anno_carta:hidden'));
    r$('#security_cc:hidden')
        .val("");
    removeError(r$('#security_cc:hidden'));
    r$("#altro_numero:hidden")
        .val("");
    removeError(r$('#altro_numero'));
    r$("#ricarica_numero:hidden")
        .val("");
    removeError(r$('#ricarica_numero'));
}

function loadFromBlockRecharge() {

    if (r$(".blocco_ricarica input[name=insert_number]").val() == r$(".blocco_ricarica input[name=confirm_number]").val()) {
        r$('.base__popup-link--ricarica').click();
        var numBloccoRicarica = r$(".topUp_block__input--number input[name=insert_number]").val();
        if (numBloccoRicarica != '') {
            r$("#altro_numero")
                .val(numBloccoRicarica);
            r$("#ricarica_numero")
                .val(numBloccoRicarica);
            setTimeout(function() {
                retrieveTagli();
                r$("#select_taglio")
                    .selectpicker('val', r$("#pIDTaglio").val());

            }, 1000);
            isValidPhoneNumber(r$("#altro_numero"));
        } else {
            return false;
        }
    }

    if (IsLogged()) {
        setTimeout(function() {
            r$("#select_numbert")
                .val("new")
                .selectpicker('refresh');
            var selectionValue = r$("#select_numbert").val();
            handleNumberChange(selectionValue);
        }, 1000);
    }

    return false;
}
