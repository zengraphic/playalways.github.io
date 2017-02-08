/********************
 *
 *  noConflict
 *  
 ********************/

var r$ = jQuery.noConflict();

/********************
 *
 *  Evaluations
 *  
 ********************/

var creditCardTypesRegEx = [{
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
    "type": "generic",
    'reg': ["^[0-9]*$"]
}];

function checkIfNumberWind(number) {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/onLineRecharge/checkWindNumber.action',

            data: {
                msisdn: number
            },
            dataType: "json"
        })
        .done(function(res) {
            res.esito === "KO" ? return false: return true
        })
        .fail(function() {
            return false

        });
}

function checkPrimaryNumber(primaryNumberInput) {

    var regex = /^[03][0-9]{8,11}$/g;
    var primaryNumberInputVal = primaryNumberInput.val();

    var regexTestResult = regex.test(primaryNumberInputVal);
    var checkIfNumberWindResult = checkIfNumberWind(primaryNumberInputVal);

    if (!regexTestResult &&
        !checkIfNumberWindResult) {

        return false

    } else {

        return true

    }
}

function checkConfirmNumber(primaryNumberInput, confirmNumberInput) {

    var primaryNumberInputVal = primaryNumberInput.val();
    var confirmNumberInputVal = confirmNumberInput.val();

    if (primaryNumberInputVal === confirmNumberInputVal) {

        return true

    } else {

        return false

    }

}

function checkNewNumber(){
    var primaryNumberInput = r$('.number_top_up');
    var confirmNumberInput = r$('.number_top_up_confirm');

    var checkConfirmNumberResult = checkConfirmNumber(primaryNumberInput, confirmNumberInput);

    return checkConfirmNumberResult
}

function checkCreditCardNumberType(number) {
    for (var i = 0; i < creditCardTypesRegEx.length; i++) {
        var regEx = creditCardTypesRegEx[i].reg;
        for (var j = 0; j < regEx.length; j++) {
            if (number.match(regEx[j]))
                return creditCardTypesRegEx[i].type
        }
    }

    return null
}

function checkCreditCardNumber(creditCardNumber) {
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
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9)
                nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    // try {console.log('luhn ' + value + " " + nCheck)} catch(err) {}
    return (nCheck % 10) == 0;

}

function checkDataScadenza(live) {
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


    if (live && (yearInputFieldVal == "" || yearInputFieldVal == "Anno" || monthInputFieldVal == "" || monthInputFieldVal == "Mese")) {
        removeError(monthInputField);
        removeError(yearInputField);
        return
    }
    var scad = yearInputFieldVal + monthInputFieldVal;

    if ("" + parseInt(scad) != scad) {
        addError(monthInputField, "La data non &#232; valida");
        return false
    }
    if (parseInt(today) > parseInt(scad)) {
        addError(monthInputField, "La data deve essere posteriore alla data attuale");
        return false
    }
    removeError(monthInputField);
    return true
}

function checkCvv(cvvNumber) {

    var regex = /^[0-9]{3,4}$/;

    regex.test(cvvNumber) ? true : false;

}

function checkCvvNumber(cvvNumerInput, ccNumberInput) {
    var cvvNumerInputVal = cvvNumerInput.val();
    var ccNumberInputVal = ccNumberInput.val();

    // "#formRecharge [name=codsicurezza_carta]"

    var l = cvvNumerInputVal.length;
    var result = true;

    if (cvvNumerInputVal.match("^[0-9]+$") == null) {

        result = false;

    } else {
        var tipo = checkCreditCardNumberType(ccNumberInputVal);

        if ((tipo == "amex" && l != 4) ||
            (tipo != "amex" && l != 3)) {

            result = false;

        } else {

            result = true;

        }

    }

    return result
}

function checkNewCreditCard(){
    
    var radioCC = $wind('.newCard_main_radio input[type="radio"]');
    var numberCC = $wind('#input_cc').val();
    var monthCC = $wind('#mese_carta');
    var yearCC = $wind('#anno_carta');
    var securityCC = $wind('#security_cc');
    
    numberCC = numberCC.replace(/\s/g, '');
    console.log(numberCC);
    if ((numberCC.length > 13) &&
        checkCreditCardNumber(numberCC) && 
        checkDataScadenza() && 
        (securityCC.val().length >= 3)) {
        return true;
    } else {
        return false;
    }
}

function checkMailAddress(mailNotificationInput) {

    var mailNotificationInputValue = mailNotificationInput.val();

    if (!mailNotificationInputValue == '') {

        if (!ValidateEmail(mailNotificationInputValue)) {

            logWarning("Invalid email address.");

            return false

        } else {

            return true

        }
    } else {

        return true

    }

}

function checkSubmitForm() {

    // controlliamo tutti i campi NUMERO DI TELEFONO
    if (!IsTypoLogged()) {

        var selectNumberNew = 'new';
        if (r$("#altro_numero").val() == '' ||
            selectNumberNew == "" ||
            r$("#refill_block .error").length > 0) {

            r$("#ricaricaForm")
                .attr("disabled", true);

        } else {

            r$("#ricaricaForm")
                .attr("disabled", false);
        }

    } else {

        var selectNumberNew = r$("#select_numbert").val();

        if ((r$("#altro_numero").val() == '' && selectNumberNew == "new") ||
            r$("#refill_block .error").length > 0) {

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
        (subRadioNewCard.is(':checked') && checkNewCreditCard()) ||
        (subRadioCC.is(':checked')) ||
        (radioPay.is(':checked')) ||
        (subRadioCharge.is(':checked') && radioCharge.is(':checked')) ||
        (subRadioBill.is(':checked') && radioBill.is(':checked'))) &&
        (checkMailAddress(mailNotificationInput))) {
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

/********************
 *
 *  Data Finding
 *  
 ********************/

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

function retrieveCustomer() {
    if (window.location.href.match("abbandon=true") || !window.location.href.match("result=true")) {
        populateCustomer();
    } else {
        return false;
    }
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
    return false
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

/********************
 *
 *  Data Prototypes
 *  
 ********************/

function Linee(linea, sme, billing, label) {
    this.linea = linea;
    this.sme = sme;
    this.billing = billing;
    this.label = label;
}

var numeri = [];

Linee
    .prototype
    .toOption = function() {
        var bill = this.billing;
        if (!this.sme)
            bill = '';

        var billingRow = '<' + 'option value="' + this.linea + '" ' +
            'smecdf="' + bill + '">' +
            this.label + '</option>';

        return billingRow
    }

function Taglio(id, importo, bonus, mdp, p3x2, testoBonus) {
    this.importo = importo;
    this.bonus = bonus;
    this.mdp = mdp;
    this.p3x2 = p3x2;
    this.id = id;
    this.testoBonus = testoBonus;
    this.testoGA = '';
}

var tagli = [];

Taglio
    .prototype
    .toOption = function() {
        var b = "";
        if (this.bonus != "0") {
            b = this.testoBonus;
            if (b == null) {
                b = this.importo + ' euro' + " + " + this.bonus + ' omaggio!';
            }
        } else {
            b = this.importo;
            if (this.testoGA != "")
                b = b + this.testoGA;
        }

        var topUpImportRow = '<' + 'option value="' + this.id + '" ' +
            'data-bonus="' + this.bonus + '" data-taglio="' + this.importo + '" ' +
            'data-content="' + b + '<span class=\'euro\'>€</span>"' +
            'data-p3x2="' + this.p3x2 + '">' +
            b + '</option>';

        return topUpImportRow
    }

function addTaglio(taglio) {
    if (tagli[taglio.mdp] == null) {
        tagli[taglio.mdp] = [];
    }
    tagli[taglio.mdp]
        .push(taglio);
}

function addCard(c, defaultVal) {
    var carte =
        '<div class="cont_item1" style="display: block;" id="listaCarteTable">' +
            '<input type="text" placeholder="Numero della Carta di Credito"  id="input_cc" name="" id="input_cc" class="base__input number_cc" onblur="checkCreditCard(this.value)" maxlength="19">' +
            '<span class="error_message">Controlla il campo</span>' +
            '<div class="clear"></div>' +
            '<div class="container_select_cc">' +
                '<div class="select_mese">' +
                    '<select class="base__select selectpicker select_cc" id="mese_carta" title="Mese" data-size="6">' +
                        '<option>01</option>' +
                        '<option>02</option>' +
                        '<option>03</option>' +
                        '<option>04</option>' +
                        '<option>05</option>' +
                        '<option>06</option>' +
                        '<option>07</option>' +
                        '<option>08</option>' +
                        '<option>09</option>' +
                        '<option>10</option>' +
                        '<option>11</option>' +
                        '<option>12</option>' +
                    '</select>' +
                    '<span class="error_message">Controlla il campo</span>' +
                    '<div class="clear"></div>' +
                '</div>' +
                '<div class="select_anno">' +
                    '<select id="anno_carta" class="base__select selectpicker select_cc" title="Anno" data-size="6">' +
                        '<option>2016</option>' +
                        '<option>2017</option>' +
                        '<option>2018</option>' +
                        '<option>2019</option>' +
                        '<option>2020</option>' +
                        '<option>2021</option>' +
                        '<option>2022</option>' +
                        '<option>2023</option>' +
                        '<option>2024</option>' +
                        '<option>2025</option>' +
                        '<option>2026</option>' +
                    '</select>' +
                    '<span class="error_message">Controlla il campo</span>' +
                    '<div class="clear"></div>' +
                '</div>' +
                '<div class="cvv_container">' +
                    '<input type="password" placeholder="CVV" name="" class="base__input security_cc " id="security_cc" onblur="checkCvv()" maxlength="4" autocomplete="off">' +
                    '<span class="error_message">Controlla il campo</span>' +
                '</div>' +
                '<div class="clear"></div>' +
            '</div>' +
            '<div class="base__checkbox checkbox checkbox-inline remember_check">' +
                '<input type="checkbox" class="styled" id="salvadati-checkbox" value="option1">' +
                '<label for="salvadati-checkbox">Ricorda la mia carta per i pagamenti successivi</label>' +
                '<img src="/typo3conf/ext/wind_theme/Resources/Public/img/icons-interface/icon_answer.png" class="icon_tooltip security_cc base__tip--orangecc modalCc" data-original-title="CVV LOREM TIPSUM"/>' +
            '</div>' +
        '</div>';

    r$("#listaCarteTable")
        .html("");

    var checked = defaultVal ? ' checked="checked" ' : "";
    var predefinito = defaultVal ? 'predefinito' : "";
    var rbg = checked ? 'style="background-position: 0 -' + (25 * 2) + 'px"' : "";

    var row = 
        '<div class="cont__item_cc2">' +
            '<div class="base__radio radio base__radio--small radio-inline">' +
                '<input type="hidden" name="selectedCard" value=""/>' +
                '<input type="radio" id="option_cc' + c.alias + '" value="' + c.alias + '" name="radioInline2" ' + checked + '  onclick="setDefaultCard(\'' + c.alias + '\')">' +
                '<label class="label_for_creditCard" for="option_cc' + c.alias + '">' +
                    '<div class="detail-cc">' +
                        '<div class="pull-left">' +
                            '<span class="card-image"><img src="/typo3conf/ext/wind_theme/Resources/Public/img/credit-cards/' + c.tipo + '_icon.png"></span>' +
                            '<span class="card-number-crypted"> • • • •</span>' +
                            '<span class="card-number-clear">' + c.tail + '</span>' +
                        '</div>' +
                        '<div class="pull-left expiration">' +
                            '<span class="expiration-label">Scad. </span>' +
                            '<span class="expiration-date">' + c.month + '/' + c.year + '</span>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                    '</div>' +
                '</label>' +
                '<a class="btn top_up_remove_btn" data-toggle="modal" href="javascript:void(0)" onclick="deleteCard(\'' + c.alias + '\')" data-target="#removeModal">RIMUOVI</a>' +
            '</div>' +
            '<button onclick="r$(\'#addNewCard\').show()" class="btn btn_refil btn_icc  top_up_newCard" id="action_cc1">inserisci nuova carta</button>' +
            '<div class="cont__action-cc1" id="addNewCard" >' +
                '<div class="base__radio small_radio radio radio-inline newCard_main_radio">' +
                    '<input type="radio" id="option5" value="option5" name="radioInline2">' +
                    '<label for="option5"> Inserisci nuova carta</label>' +
                '</div>' +
                carte +
            '</div>' +
        '</div>';

    r$("#listaCarteTable")
        .append(row);

    populateYears();
    populateMonths();
}

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

function deleteCard(id) {
    //showWaitBox()
    //
    logWarning("");

    var deletingDefaultCard = r$("[name=carta_modificata]:checked").val() == id;

    r$.post("/nuovaAreaClienti/wind/ajax/rubricaCarte/delete.action", {
            'alias': id
        },
        function(data) {
            //hideWaitBox()
            //console.log(data + "/" + data['OK'] + "/" + data.OK)
            if (data.OK) {
                populateCards(deletingDefaultCard ? updateParentPage : null)
            } else
                logWarning(data.msg)
        }).fail(function(aa) {
        hideWaitBox();
        logWarning("Si &#232; verificato un errore")
    })

}

function saveCard() {
    //showWaitBox()
    rubClearErrors();
    rubclearTitles();

    if (checkCreditCardNumber()) {
        //hideWaitBox()
        rubsetTitles();
        return
    }
    //    $.post("#{(siteManager.isLocalhost() ? '' : initConfiguration.initParameterMap['HOME_WIND'])}/nuovaAreaClienti/wind/ajax/rubricaCarte/save.action",


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
            r$.fancybox.close();
            if (savedCardPostFunction != null) {
                r$("#ins_ccx").hide()
                r$("#aliasPresent").show()
                if (data.card.img != null && data.card.img.indexOf("http") == -1){
                    data.card.img = "#{initConfiguration.initParameterMap['AC_IMG_PATH']}/ricarica/" + data.card.img;
                }
                savedCardPostFunction(data.card);
            }

        } else {
            logWarning(data.msg);
            rubsetTitles();
        }
    })
    .fail(function(data) {
        hideWaitBox();
        rubsetTitles();
    });

}

function setDefaultCard(id) {
    //showWaitBox()
    //logWarning("")

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
            logWarning(data.msg);
        }
    })
    .fail(function(data) {
        hideWaitBox();
        logWarning("Si &#232; verificato un errore");
    });
        
}

function addNumero(numero) {

    if (numeri == null) {
        numeri = [];
    }

    numeri
        .push(numero);
}


/********************
 *
 *  Data Filtering
 *  
 ********************/

function filterTagliByMdp(mdp) {
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
        elTaglio
            .selectpicker('refresh');
    }
    checkSubmitForm();
}

/********************
 *
 *  Data Population
 *  
 ********************/

function populateCustomer() {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/start.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            if (IsTypoLogged()) {
                populateCards();
            }
            // correzione della riga del menù solo per ricarica
            // this bug should be alredy fixed by a previous correction
            /*r$('.mfp-bg, .mfp-wrap')
                .css('height', '100%');*/


            var closeButton = r$('#refill_block .top .mfp-close')
            var lineSelect = r$('#select_numbert');
            var lineSelectContainer = lineSelect.closest('.select_numbert');
            var newLineContainer = lineSelectContainer.siblings('.action_numbert');

            lineSelect
                .find('option')
                .remove();

            logInfo(res);
            logInfo("Esito" + res.esito);

            if (res.esito == "OK") {
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
                        .addClass('.entered')
                        .selectpicker('refresh');
                    newLineContainer
                        .fadeIn();
                    lineSelectContainer
                        .fadeOut()
                        .hide();
                }

                tagli = [];

                if (res.tagli != null && res.tagli.length > 0) {
                    for (var i = 0; i < res.tagli.length; i++) {
                        var tg = res.tagli[i];
                        addTaglio(new Taglio(tg.id, tg.importo, tg.bonusDaVisualizzare, tg.type, null, tg.testoBonus));
                    }
                }

                filterTagliByMdp(r$("input[name=mdp]:checked").val());

                if (res.cdf != null && res.cdf.length > 0) {
                    r$("#action_c4")
                        .html("");

                    for (var i = 0; i < res.cdf.length; i++) {
                        var tg = res.cdf[i];
                        populateCdf(tg);
                    }
                    r$("#action_c3")
                        .show();
                } else {
                    r$("#action_c4")
                        .fadeOut()
                }

                filterTagliByMdp(r$("input[name=mdp]:checked").val());
            } else {
                //alert("Si è verificato un errore, riprova più tardi");
                closeButton
                    .trigger("click");
            }
        })
        .fail(function() {
            logWarning("ERRORE CHIAMATA");
            //alert("Si è verificato un errore, riprova più tardi");
            closeButton
                .trigger("click");
        });


}

function populateNumbers() {

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

            logInfo("Esito" + res.esito);

            if (res.esito == "OK" && res.linee != null) {

                for (var i = 0; i < res.linee.length; i++) {
                    var tg = res.linee[i];

                    select
                        .append(new Linee(tg.msisdn, tg.sme, tg.cdf, tg.msisdn).toOption());

                    var info = "Aggiungo Linea " + (i + 1);

                    logInfo(info);
                }

                select
                    .append(new Linee("new", false, '', 'Altro numero').toOption())
                    .fadeIn();

                form
                    .fadeOut();

            } else {
                logWarning("Esito altro numero - Nessun numero trovato");
                populateEmptyNumbers();
            }
        })
        .fail(function() {

            logWarning("Esito altro numero - Errore ajax");

            populateEmptyNumbers();

        });

    select
        .selectpicker('refresh');

}

function populateTagli() {
    tagli = [];
    r$.ajax({
        type: "POST",
        url: '/nuovaAreaClienti/wind/pages/ricarica/tagli.action',
        data: {},
        dataType: "json"
    })
    .done(function(res) {
        if (res.esito == "OK" && res.tagli != null) {
            for (var i = 0; i < res.tagli.length; i++) {
                var tg = res.tagli[i];
                addTaglio(new Taglio(tg.id, tg.importo, tg.bonusDaVisualizzare, tg.type, null, tg.testoBonus));
            }
        }
        filterTagliByMdp(r$("input[name=mdp]:checked").val());
    })
    .fail();
}

function populateEmptyNumbers() {

    r$('#select_taglio')
        .append(new Linee("new", false, '', 'Altro numero').toOption());

    r$(".select_numbert")
        .fadeOut("fast");

    r$(".action_numbert")
        .fadeIn("fast");
}

function populateCookieNumbers(userNumber) {
    r$("#altro_numero")
        .val(userNumber);
    r$("#ricarica_numero")
        .val(userNumber);
}

function populateCards(onFinish) {
    //r$("#listaCarteTable").html();
    // showWaitBox()
    // clearCardForm()

    r$.ajax({
            type: "GET",
            url: '/nuovaAreaClienti/wind/ajax/rubricaCarte/list.action',
            data: {},
            dataType: "json"
        })
        .done(function(data) {
            //hideWaitBox();
            r$("#ricaricaForm")
                .attr("disabled", false);
            if (data.OK) {
                if (data.cards == 0) {
                    r$("#listaCarteTable .base__radio.radio.base__radio--small.radio-inline")
                        .remove();
                    r$('#addNewCard')
                        .show();
                } else {
                    for (var i = 0; i < data.cards.length; i++) {
                        addCard(data.cards[i], i == 0);
                    }
                    if (onFinish != null)
                        onFinish();
                }
            } else {
                logWarning(data.msg);
            }
        })
        .fail(function() {
            hideWaitBox();
            logWarning("Si &#232; verificato un errore.")
        })
}

function populateCdf(c) {
    var label = "";
    if (c.mode.match("ADDEBITO SU C/C BANCARIO|ADDEBITO SU C/C POSTALE"))
        label = "&#160;con addebito su conto corrente n&#176; " + c.CCNumebr
    else if (c.mode == 'CARTA DI CREDITO')
        label = "&#160;con addebito su carta di credito"
    else if (c.mode == 'BOLLETTINO POSTALE')
        label = "&#160;con addebito su bollettino postale"
    else
        label = c.mode

    var row =
        '<div class="base__radio small_radio radio radio-inline">' +
        '<input type="radio" id="option_dct' + c.code + '" value="' + c.code + '" name="cdf" >' +
        '<label for="option_dct' + c.code + '">Addebito su conto telefonico ' + label + '</label>' +
        '</div>';

    r$("#action_c4")
        .append(row);
}

function populateYears() {

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

function populateMonths() {

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

function populateResponse(content) {

    var esitoRecharge = '/typo3conf/ext/wind_theme/Resources/Public/htmlContent/shoulder/recharge/esitoRecharge.html'
    var response_block = r$("#refill_block");

    /**
     * Il template viene caricato scorrettamente,
     * andrebbe inserito solo il contenuto,
     * invece viene inizializzato un altro popup
     * innestato nella ricarica.
     */

    response_block
        .load(esitoRecharge, function() {
            response_block
                .fadeIn("slow", function() {
                    //inizializziamo tutti i valori
                    r$("#esitoricarica")
                        .html(content);
                });
        });
}


function callPopUp(title, description, button1, button2, labelBtn1, labelBtn2, function1) {
    var ricaricaContainer = r$('#refill_block .container');

    var popup = 
    '<div class="popup">'+
        '<div class="popup-dialog">'+
            '<div class="popup-header">'+title+'</div>'+
            '<div class="popup-body">'+description+'</div>'+
            '<div class="popup-footer ">'+
                (button1 ?'<button class="btn popup-btn_1 btn_refil  base__bt  popup-btn top_up_newCard closeModal waves-effect waves-button waves-float waves-light">'+labelBtn1+'</button>':'')+
                (button2 ?'<button class="popup-btn_2 btn_refil base__bt popup-btn closeModal waves-effect waves-button waves-float waves-light">'+labelBtn2+'</button>':'')+
            '</div>'+
        '</div>'+
    '</div>';

    if(funciton1 != null){
        function1();
    }

    ricaricaContainer
        .append(popup);

}


function callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel) {
    var ricaricaContainer = r$('#refill_block .container');

    var popup = 
    '<div class="popup--contract">'+
        '<div class="popup--contract-dialog">'+
            '<div class="popup--contract-header">'+title+'</div>'+
            '<div class="popup--contract-body">'+
                '<div class="popup-body--description">'+description+'</div>'+
                '<div class="popup_row first_row">'+
                    '<div class="first-label popup-body--label pull-left">'+firstLabel+'</div>'+
                    '<div class="first-value popup-body--value pull-right">'+firstValue+'</div>'+
                    '<div class="clear"></div>'+
                '</div>'+
                '<div class="divider"></div>'+
                '<div class="popup_row second_row">'+
                    '<div class="second-label popup-body--label pull-left">'+secondLabel+'</div>'+
                    '<div class="second-value popup-body--value pull-right">'+secondValue+'</div>'+
                    '<div class="clear"></div>'+
                '</div>'+
                '<div class="divider"></div>'+
                '<div class="popup_row third_row">'+
                    '<div class="third-label popup-body--label pull-left">'+thirdLabel+'</div>'+
                    '<div class="third-value popup-body--value pull-right">'+thirdValue+'</div>'+
                    '<div class="clear"></div>'+
                '</div>'+
            '</div>'+
            '<div class="popup--contract-footer ">'+
                '<button class="btn popup-btn_2 btn_refil  base__bt popup-btn  closeModal waves-effect waves-button waves-float waves-light">'+btnLabel+'</button>'+
            '</div>'+
        '</div>'+
    '</div>';


    ricaricaContainer
        .append(r$(popup));

}


/********************
 *
 *  Data Handlers
 *  
 ********************/

function handleOriginPath() {
    if (window.location.href.match("#refill_block")) {
        r$("#ricaricaButton")
            .trigger("click");
    }
    if (window.location.href.match("result=true")) {
        handleShowEsitoRicarica();
    }
    if (window.location.href.match("abbandon=true")) {
        handleAbbandonoRicarica();
    }
}

function handleEsitoRicarica(id) {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/result.action',
            data: {
                //    id:id
            },
            dataType: "json"
        })
        .done(function(res) {
            var content = '<p>' + res.TITLE + '</p>' +
                '<p>IMPORTO: ' + res.IMPORTO + '</p>' +
                '<p>' + res.SUB_TITLE + '</p>' +
                '<p>ID RICARICA: ' + res.ID + '</p>' +
                '<p>NUMERO: ' + res.CLI + '</p>' +
                '<p>DATA: ' + res.DATA + '</p>' +
                '<p>METODO UTILIZZATO: ' + res.MODALITA + '</p>' +
                '<p>TAGLIO: ' + res.TAGLIO + '</p>' +
                '<p>' + res.EMAIL + '</p>';

            logInfo(res);
            populateResponse(content);
        })
        .fail(
            logWarning("Fail Errore ricarica");
        );
}

function handleNewRicarica() {

    // Name must be changed also in ricarica response html template
    window.location.href = window.location.href;
     // This function should reset the href but it doesn't,
     //  it takes the same href as the response, including the parameter result=true
}

function handleAbbandonoRicarica() {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/abbandona.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            logInfo("RICARICA ABBANDONATA");
            //populateResponse();
        })
        .fail(
            logWarning("Fail Errore RICARICA ABBANDONATA");
        );
}

function handleTypoLogging() {
    if (!IsTypoLogged()) {
        var userNumber = getCookie('userNumber');
        if (userNumber) {
            populateCookieNumbers(userNumber);
        }


    }
}

function handleNumberChange(selectionValue) {
    switch (selectionValue) {
        case 'new':
            r$(".action_numbert")
                .fadeIn("fast")
                .addClass('entered');
            break;
        default:
            r$(".action_numbert")
                .fadeOut("fast")
                .removeClass('entered');

            checkNextStep();
    }
}

function handlePaymentChange(selectedPayment) {

    var selectedPaymentBox = selectedPayment.closest('.item-box');
    var otherPayments = paymentBox.siblings('.item-box');
    var expandablePayments = paymentBox.siblings('.item-box.expandable .cont_item1');

    /***************************************************************************
     *
     * !!!IMPORTANT!!!!!
     * 
     * Required to add expandable class to elements that have the expanding box
     * 
     ***************************************************************************/

    if (!paymentBox.hasClass('active')) {

        otherPayments
            .each(function() {
                var currentCycledPayment = r$(this);
                if (currentCycledPayment.hasClass('active')) {
                    currentCycledPayment.removeClass('active');
                    if (currentCycledPayment.hasClass('expandable')) {
                        currentCycledPayment
                            .find('.cont_item1')
                            .slideUp(slow);
                    }
                }
            });

        if (selectedPaymentBox.hasClass('expandable')) {
            selectedPaymentBox
                .find('.cont_item1')
                .slideDown(slow, function() {
                    selectedPaymentBox
                        .addClass('active')
                        .getNiceScroll()
                        .resize();
                });
        }

    }
}

function mdpValueChecked() {
    var mdpInputValue = r$("input[name=mdp]:checked").val();
    if (mdpInputValue == null) {
        r$("#CXX")
            .click();
    } else {
        logInfo("MDP " + mdpInputValue);
        r$("#" + mdpInputValue)
            .click();
        logInfo("MDP " + mdpInputValue);
    }
}

var iconNames = ['visa', 'postepay', 'americane', 'maestro', 'masterc', 'diners', 'generic'];

function handleCreditCardIcon(creditCardvalue, creditCardInput, cvvNumerInput) {

    var classToAdd = checkCreditCardNumberType(creditCardvalue) + "_cc";


    $.each(iconNames, function(index, iconName) {
        var iconClassName = iconName + '_cc';
        if (iconClassName !== classToAdd) {
            creditCardInput
                .removeClass(iconClassName + '_cc');
            cvvNumerInput
                .removeClass('cvv_amex')
                .removeClass('cvv_carta');
        }

    });

    if (!creditCardInput.hasClass(classToAdd)) {
        creditCardInput
            .addClass(classToAdd);
        if (classToAdd == "americane_cc") {
            cvvNumerInput
                .attr('maxlength', 4)
                .addClass('cvv_amex');
        } else {
            cvvNumerInput
                .attr('maxlength', 3)
                .addClass('cvv_carta');
        }
    }
}

/********************
 *
 *  Error Handlers
 *  
 ********************/

function addError(inputElement, messageText) {

    var errorSpan = inputElement.next(span);

    inputElement
        .addClass('error');
    errorSpan
        .addClass('error');
    messageText ? errorSpan.text(messageText);

}

function removeError(inputElement) {

    var errorSpan = inputElement.next(span);

    inputElement.
    removeClass('error');
    errorSpan
        .addClass('error');

}

function logWarning(val) {
    console.warn(val);
}

function logInfo(val) {
    console.log(val);
}

/********************
 *
 *  Bindings
 *  
 ********************/

function bindInputFields() {
    r$('#refill_block')

    .on({
        'changed.bs.select': function(clickedIndex, selectionValue) {

            handleNumberChange(selectionValue);

        }
    }, '#select_numbert')

    .on({
        'focus': function() {

        },
        'blur': function() {

            var primaryNumberInput = $(this);
            var checkPrimaryNumberResult = checkPrimaryNumber(primaryNumberInput);

            if (!checkPrimaryNumberResult) {
                addError(primaryNumberInput, false);
            } else {
                checkNextStep();
            }

        }
    }, '.number_top_up')

    .on({
        'blur': function() {

            var primaryNumberInput = $('.number_top_up');
            var confirmNumberInput = $(this);

            var checkConfirmNumberResult = checkConfirmNumber(primaryNumberInput, confirmNumberInput);

            if (!checkConfirmNumberResult) {
                addError(confirmNumberInput, false);
            } else {
                checkNextStep();
            }


        }
    }, '.number_top_up_confirm')

    .on({
        'click': function() {
            var showMoreLink = $(this);
            var showMoreContent = showMoreLink.next();

            showMoreLink
                .slideUp("fast");

            showMoreContent
                .fadeIn("slow")
                .css('display:static')
                .getNiceScroll()
                .resize();

        }

    }, '.showMore')

    .on({
        'click': function() {
            var selectedPayment = r$(this);
            handlePaymentChange(selectedPayment);
        }
    }, 'input[name="mdp"]')

    .on({
        'focus': function() {

            var creditCardElement = r$(this);

            var dirtyCreditCardValue = creditCardElement.val();

            var cleanCreditCardValue = creditCardValue.replace(/\s/g, '');

            creditCardElement
                .val(result);

            removeError(creditCardElement);
        },

        'keyup': function() {
            var creditCardElement = r$(this);
            var creditCardvalue = creditCardElement.val();

            handleCreditCardIcon(creditCardvalue, creditCardElement);

        },
        'blur': function() {

            var creditCardElement = r$(this);

            var cleanCreditCardvalue = creditCardElement.val();


            if (cleanCreditCardvalue !== "") {

                var checkCreditCardNumberResult = checkCreditCardNumber(cleanCreditCardvalue);

                if (!checkCreditCardNumberResult) {

                    addError(creditCardElement, 'Numero di carta non valido');

                } else {

                    checkNextStep();

                }

                var dirtyCreditCardValue = value.match(/.{1,4}/g).join(" ");

                creditCardElement
                    .val(dirtyCreditCardValue);
            }

        }
    }, '#input_cc')

    .on({
        'focus': function() {

            var cvvElement = r$(this);

            removeError(cvvElement);

        },
        'keydown': function(e) {

            var cvvElement = r$(this);
            var cvvNumber = cvvElement.val();

            !checkCvv(cvvNumber); ? e.preventDefault();
        },
        'blur': function() {

            var cvvElement = r$(this);
            var ccElement = r$('#input_cc');
            var cvvNumber = cvvElement.val();
            var checkCvvNumberResult = checkCvvNumber(cvvElement, ccElement);

            if (!checkCvvNumberResult) {

                addError(cvvElement, "Il codice non &#232; corretto!");

            } else {

                checkNextStep();
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

            var title = 'Stai per eliminare la carta che finisce per ' + ccLastFourNumbers;
            var description = 'Vuoi eliminare la carta predefinita?';
            callPopUp(title, description, true, true, 'rimuovi', 'annulla', removeCard(cardToDelete, radioToDisable));
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
            var title = 'Conto telefonico';
            var description = 'La ricarica online verrà addebitata sul Conto Telefonico a cui sono associate le seguenti linee/utenze:';
            var firstLabel = 'Linea/Utenza';
            var secondLabel = 'Offerta';
            var thirdLabel = 'Contratto';
            var firstValue = '0815792897';
            var secondValue = 'TuttoIncluso';
            var thirdValue = 'ECPRA0912394378';
            var btnLabel = 'Chiudi';
            callPopUpContract(title, description, firstLabel, firstValue, secondLabel, secondValue, thirdLabel, thirdValue, btnLabel);
        }
    }, '.contract__popup')

    .on({
        'focus': function() {

            var mailNotificationInput = r$(this);

            removeError(mailNotificationInput);

        },
        'keyup': function() {

            var mailNotificationInput = r$(this);
            var mailNotificationInputValue = mailNotificationInput.val();

            mailNotificationInput.val() = mailNotificationInputValue.toLowerCase();

        },
        'blur': function() {

            var mailNotificationInput = r$(this);

            var checkMailAddressResult = checkMailAddress(mailNotificationInput);

            if (!checkMailAddressResult) {

                addError(mailNotificationInput, 'Email non valida');

            }

        }

    }, '.notificationMail')

    .on({
        'click': function() {

            var ricaricaContainer = r$('#refill_block');
            var popup = ricaricaContainer.find('.popup');

            popup
                .fadeOut(100, function() {
                    r$(this)
                        .remove();
                });
            .remove();


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
    }, '.closeModal');


}

/********************
 *
 *  Init
 *  
 ********************/

function initRicarica() {

    handleOriginPath();
    handleTypoLogging();
    retrieveCustomer();
    bindInputFields();
    mdpValueChecked();

}

/*********************
 * 
 * Submit
 * 
 ********************/

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
    var mdp = r$("input[name=mdp]:checked").val();
    var alias = r$("input[name=selectedCard]").val();
    var numeroCCX = r$("#input_cc").val().replace(/\s/g, '');
    var mese = r$("#mese_carta").val();
    var anno = r$("#anno_carta").val();
    var cvv2 = r$("#security_cc").val();
    var titolare = "da inserire";
    //r$("#titolare_carta").val() todo: fixme

    var ricorda_agreement = r$("#rememberp").is(':checked') ? 'Y' : 'N';
    var ricorda_carta = r$("#salvadati-checkbox").is(':checked') ? 'Y' : 'N';
    var email = r$("#emailnotification").is(':checked') ? r$("#input_email").val();: "";
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
            dataType: "json"
        })
        .done(function(res) {

            if (res.esito == "OK") {

                switch (res.tipo_nav) {

                    case 'NORMAL':
                        //CARICO ESITO DELLA RICARICA INVOCANDO LA RESULT AJAX
                        handleEsitoRicarica(res.id);
                        break;
                    case 'REDIRECT':
                        //Faccio redirect
                        //Salvo l'idRicarcia
                        logInfo(res.id)
                        window.location.href = res.url;
                        break;
                    default:
                        handleEsitoRicarica(res.id);
                        break;

                }

            } else {

                logWarning("Errore ricarica")
                logWarning(res.error_description)
                    //alert("Si è verificato un errore, riprova più tardi");
                r$(".btn_close")
                    .trigger("click");
            }
        })
        .fail(function() {
            $("#ricaricaForm")
                .attr('submitricarica', '');
            logWarning("Fail Errore ricarica");
        });
}

/********************
 *
 *  Ajax Spinner
 *  
 ********************/

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
    });



/********************
 *
 *  Doc Ready
 *  
 ********************/

r$(document)
    .on('click', '#ricaricaButton', function() {
        initRicarica();
    })
    .on('click', '#ricaricaForm', function() {
        submitRicarica();
    });



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
