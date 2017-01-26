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

function deduceCardTypeByNumber(number) {
    for (var i = 0; i < creditCardTypesRegEx.length; i++) {
        var regEx = creditCardTypesRegEx[i].reg;
        for (var j = 0; j < regEx.length; j++) {
            if (number.match(regEx[j]))
                return creditCardTypesRegEx[i].type
        }
    }

    return null
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

function retrieveCustomer() {
    if (window.location.href.match("abbandon=true")) {
        populateCustomer();
    }

    if (window.location.href.match("result=true")) {
        return false;
    } else {
        populateCustomer();
    }
    //  populateNumbers();
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
    var carte = '<div class="cont_item1 base__toggle" style="display: block;" id="listaCarteTable">' +
        '<input type="text" placeholder="Numero della Carta di Credito"  id="input_cc" name="" id="input_cc" class="base__input number_cc" onblur="checkCreditCard(this.value)" maxlength="19">' +
        '<span class="error_message">Controlla il campo</span>' +
        '<div class="clear"></div>' +
        ' <div class="container_select_cc">' +
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
        '  </div>' +
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
        '<input type="password" placeholder="CVV" name="" class="base__input security_cc " id="security_cc" onblur="isValidSecureCode()" maxlength="4" autocomplete="off">' +
        '<span class="error_message">Controlla il campo</span>' +
        '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<!--   <div class="base__checkbox checkbox checkbox-inline remember_check">' +
        '<input type="checkbox" class="styled" id="salvadati-checkbox" value="option1">' +
        '<label for="salvadati-checkbox">Ricorda la mia carta per i pagamenti successivi</label>' +
        '<img src="../../img/icons-interface/icon_answer.png" class="icon_tooltip security_cc base__tiporangecc modalCc" />' +
        '</div>' +
        '<! insert help comment in [data-original-title]  -->' +
        '</div>' +
        '</div>' +
        '<div class="base__checkbox checkbox checkbox-inline remember_check">' +
        ' <input type="checkbox" class="styled" id="salvadati-checkbox" value="option1">' +
        '<label for="salvadati-checkbox">Ricorda la mia carta per i pagamenti successivi</label>' +
        '<img src="/typo3conf/ext/wind_theme/Resources/Public/img/icons-interface/icon_answer.png" class="icon_tooltip security_cc base__tip--orangecc modalCc">' +
        '</div>';
    r$("#listaCarteTable")
      .html("");
    var checked = defaultVal ? ' checked="checked" ' : ""
    var predefinito = defaultVal ? 'predefinito' : "";
    var rbg = checked ? 'style="background-position: 0 -' + (25 * 2) + 'px"' : ""
    var row = '<div class="cont__item_cc2">' +
        '<div class="base__radio radio base__radio--small radio-inline">' +
        '<input type="hidden" name="selectedCard" value=""/>' +
        '<input type="radio" id="option_cc' + c.alias + '" value="' + c.alias + '" name="radioInline2" ' + checked + '  onclick="setDefaultCard(\'' + c.alias + '\')">' +
        '<label class="label_for_creditCard" for="option_cc' + c.alias + '">' +
        '<div class="detail-cc">' +
        '<div class="pull-left">' +
        '<span class="card-image"><img src="/typo3conf/ext/wind_theme/Resources/Public/img/credit-cards/' + c.tipo + '_icon.png"></span>' +
        '<span class="card-number-crypted"> • • • •</span>' +
        '<span class="card-number-clear paypal-email">' + c.tail + '</span>' +
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
        carte;
    r$("#listaCarteTable")
    	.append(row);
    populateYears();
    populateMonths();
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
            //correzione della riga del menù solo per ricarica
            r$('.mfp-bg, .mfp-wrap')
                .css('height', '100%');

            var lineSelect = r$('#select_numbert');
            var lineSelectContainer = lineSelect.closest('.select_numbert');
            var newLineContainer = lineSelectContainer.siblings('.action_numbert');

            lineSelect
                .find('option')
                .remove();

            console.log(res);
            console.log("Esito" + res.esito);

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
                r$(".btn_close")
                	.trigger("click");
            }
        })
        .fail(function() {
            console.log("ERRORE CHIAMATA");
            //alert("Si è verificato un errore, riprova più tardi");
            r$(".btn_close")
                .trigger("click");
        });


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
                rubricaErr(data.msg)
            }
        })
        .fail(function() {
            hideWaitBox();
            rubricaErr("Si &#232; verificato un errore.")
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

    var row = '<div class="base__radio small_radio radio radio-inline">' +
        '<div class="base__radio small_radio radio radio-inline">' +
        '<input type="radio" id="option_dct' + c.code + '" value="' + c.code + '" name="cdf" >' +
        '<label for="option_dct' + c.code + '">Addebito su conto telefonico ' + label + '</label>' +
        '</div>' +
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


/********************
 *
 *  Handlers
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

            console.log(res);
            populateResponse(content);
        })
        .fail(
            console.log("Fail Errore ricarica");
        );
}

function handleAbbandonoRicarica() {
    r$.ajax({
            type: "POST",
            url: '/nuovaAreaClienti/wind/pages/ricarica/abbandona.action',
            data: {},
            dataType: "json"
        })
        .done(function(res) {
            console.log("RICARICA ABBANDONATA");
            //populateResponse();
        })
        .fail(
            console.log("Fail Errore RICARICA ABBANDONATA");
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
                .fadeIn("fast");
            break;
        default:
            r$(".action_numbert")
                .fadeOut("fast");
    }
}

function handlePaymentChange(selectedPayment) {

    var selectedPaymentBox = selectedPayment.closest('.item-box');
    var otherPayments = paymentBox.siblings('.item-box');
    var expandablePayments = paymentBox.siblings('.item-box.expandable .cont_item1');

    // Requires to add expandable class to elements that have the expanding box

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

function mdpValueChecked(){
  var mdpInputValue = r$("input[name=mdp]:checked").val();
    if (mdpInputValue == null) {
      r$("#CXX")
          .click();
  } else {
      console.log("MDP " + mdpInputValue);
      r$("#" + mdpInputValue)
        .click();
      console.log("MDP " + mdpInputValue);
  }
}

var iconNames = ['visa', 'postepay', 'americane', 'maestro', 'masterc', 'diners', 'generic'];

function handleCreditCardIcon(creditCardvalue, creditCardInput) {

    var classToAdd = deduceCardTypeByNumber(creditCardvalue) + "_cc";

    iconNames
        .forEach(function(iconName) {
            var iconClassName = iconName + '_cc';
            if (iconClassName !== classToAdd) {
                creditCardInput
                    .removeClass(iconClassName + '_cc');
            }

        });

    if (!creditCardInput.hasClass(classToAdd)) {
        creditCardInput
            .addClass(classToAdd);
        r$('.' + classToAdd)
            .fadeIn(fast);
    }
}



/********************
 *
 *  Bindings
 *  
 ********************/

function bindNumberChange() {
    r$('body')
        .on('change', '#select_numbert', function() {
            var selectionValue = r$(this).val();
            handleNumberChange(selectionValue);
        });
}

function bindPaymentChange() {
    r$('body')
        .on('click', '.payment_radio', function() {
            // Requires to add common class to all radio buttons connected to primary payment options
            var selectedPayment = r$(this);
            handlePaymentChange(selectedPayment);
        });
}

function bindCreditCardNumberWithIcon() {
    r$('body')
        .on('keyup', '#input_cc', function() {
            var creditCardInput = r$(this);
            var creditCardvalue = creditCardInput.val();
            handleCreditCardIcon(creditCardvalue, creditCardInput);
        });
}

/********************
 *
 *  Init
 *  
 ********************/

function initRicarica() {

    handleOriginPath();
    handleTypoLogging();
    populateYears();
    bindNumberChange();
    bindPaymentChange();
    bindCreditCardNumberWithIcon();
    mdpValueChecked();

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