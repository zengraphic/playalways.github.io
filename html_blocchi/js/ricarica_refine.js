/**
 * Custom scripts:
 * inputs, placeholder...
 */

var r$ = jQuery.noConflict();


/**
 * Ajax Spinner Handling
 */

r$()
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


/**
* Page Href Handling
*/

r$()
  .ready(function() {
    if (window.location.href.match("#refill_block")) {
      r$("#ricaricaButton")
        .trigger("click");
    }
    if (window.location.href.match("result=true")) {
      showEsitoRicarica();
    }
  });



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

/* Multiple actions with ready function dependece */
/*r$("#action_cc1")
  .click(function() {
    r$(".cont__action-cc1")
      .fadeIn("slow");
    r$("#action_cc1")
      .css('display', 'none');*/

/*r$("#CCX")
  .click(function() {
    r$("#action_c1 .cont_item1")
      .fadeIn("slow");
    r$("#action_c2 .cont_item1")
      .fadeOut("slow");
    r$("#action_c3 .cont_item1")
      .fadeOut("slow");
    r$("#action_c4 .cont_item1")
      .fadeOut("slow");
    r$("#action_c1")
      .addClass("active");
    r$("#action_c2")
      .removeClass("active");
    r$("#action_c3")
      .removeClass("active");
    r$("#action_c4")
      .removeClass("active");
});
r$("#PAYPAL")
  .click(function() {
    r$("#action_c1 .cont_item1")
      .fadeOut("slow");
    r$("#action_c2 .cont_item1")
      .fadeIn("slow");
    r$("#action_c3 .cont_item1")
      .fadeOut("slow");
    r$("#action_c4 .cont_item1")
      .fadeOut("slow");
    r$("#action_c1")
      .removeClass("active");
    r$("#action_c2")
      .addClass("active");
    r$("#action_c3")
      .removeClass("active");
    r$("#action_c4")
      .removeClass("active");
});
r$("#BANCOPOSTA").click(function() {
    r$("#action_c1 .cont_item1").fadeOut("slow");
    r$("#action_c2 .cont_item1").fadeOut("slow");
    r$("#action_c3 .cont_item1").fadeIn("slow");
    r$("#action_c4 .cont_item1").fadeOut("slow");
    r$("#action_c1").removeClass("active");
    r$("#action_c2").removeClass("active");
    r$("#action_c3").addClass("active");
    r$("#action_c4").removeClass("active");
});

r$("#CTL").click(function() {
    r$("#action_c1 .cont_item1").fadeOut("slow");
    r$("#action_c2 .cont_item1").fadeOut("slow");
    r$("#action_c3 .cont_item1").fadeOut("slow");
    r$("#action_c4 .cont_item1").fadeIn("slow");
    r$("#action_c1").removeClass("active");
    r$("#action_c2").removeClass("active");
    r$("#action_c3").removeClass("active");
    r$("#action_c4").addClass("active");
});*/

// Four digits validation (RICARICA) to display simbol credit card
r$('#input_cc')
  .on('change , keyup', function(e) {
    var value = r$('#input_cc').val();
    showCcxType(value);
    /*if ( value.length > 3 ) {
     r$("#input_cc").addClass("visa_cc");
     r$(".visa_cc").fadeIn(10);
     r$(".tooltip").css("display", "none");
     }*/
  });

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
r$("button#ricaricaForm")
  .click(function() {
    submitRicarica();
  });
});

function showCcxType(val) {

  r$("#input_cc")
    .removeClass("visa_cc");
  r$("#input_cc")
    .removeClass("postepay_cc");
  r$("#input_cc")
    .removeClass("americane_cc");
  r$("#input_cc")
    .removeClass("maestro_cc");
  r$("#input_cc")
    .removeClass("masterc_cc");
  r$("#input_cc")
    .removeClass("diners_cc");
  r$("#input_cc")
    .removeClass("generic_cc");
  /*r$(".numeric-card")
    .parent()
      .children("img")
        .hide();*/
  var className = deduceCardTypeByNumber(val) + "_cc";
  r$("#input_cc")
    .addClass(className);
  r$("." + className)
    .fadeIn(10);
  r$(".tooltip")
    .css("display", "none");
}

/*r$(function() {
    r$('#select-prueba').on('change', function() {
        switch (r$(this).val()) {
            case 'CCX':
                r$("#action_c1").fadeIn("slow");
                r$("#action_c2").fadeOut("fast");
                r$("#action_c3").fadeOut("fast");
                r$("#action_c4").fadeOut("fast");
                break;
            case 'PAYPAL':
                //alert( 2 );
                r$("#action_c1").fadeOut("slow");
                r$("#action_c2").fadeIn("fast");
                r$("#action_c3").fadeOut("fast");
                r$("#action_c4").fadeOut("fast");
                break;
            case 'BANCOPOSTA':
                //alert( 3 );
                r$("#action_c1 ").fadeOut("fast");
                r$("#action_c2").fadeOut("fast");
                r$("#action_c3").fadeIn("slow");
                r$("#action_c4").fadeOut("fast");
                break;
            case 'CTL':
                //alert( 3 );
                r$("#action_c1 ").fadeOut("fast");
                r$("#action_c2").fadeOut("fast");
                r$("#action_c3").fadeOut("slow");
                r$("#action_c4").fadeIn("fast");
                break;
        }
    });
});*/

r$(function() {
  r$('#select_numbert')
    .on('change', function() {
      var self = r$(this);
      var numberSelected = self.val();

      switch (numberSelected) {
        case 'new':
          r$(".action_numbert")
            .fadeIn("fast");
          break;
        default:
          r$(".action_numbert")
            .fadeOut("fast");
      }
    });
});



/**
 *
 */
/*


 //############################################################################
 //############### Created by Giovanni on 09/11/16. #######################
 //############################################################################


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

 function abbandonoRicarica() {
   r$.ajax({
     type: "POST",
     url: '/nuovaAreaClienti/wind/pages/ricarica/abbandona.action',
     data: {},
     success: function(res) {
       console.log("RICARICA ABBANDONATA")
       //loadEsito();
     },
     dataType: "json"
   }).fail(
     console.log("Fail Errore RICARICA ABBANDONATA"));
 }

 function getCookie(cname) {
   var name = cname + "=";
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

 function loadYear() {
   r$('#anno_carta')
     .find('option')
     .remove();
   var select = r$("#anno_carta");
   var thisYear = new Date().getFullYear();
   for (var i = 0; i <= 11; i++) {
     var year = thisYear + i;
     r$('<option>', {
       value: year,
       text: year
     }).appendTo(select);
   }
   r$('#anno_carta')
    .selectpicker('refresh');
 }

 function retrieveCustomer() {
   if (window.location.href.match("abbandon=true")) {
     popolaCliente();
   }

   if (window.location.href.match("result=true")) {
     return false;
   } else {
     popolaCliente();
   }


   //  popolanumeri();
 }

//METODI NAVIGAZIONE
function initRic() {

  //prima di iniziare una nuova instanza verifichiamo che il cliente non abbia abbandonato la sua ricarica

  if (window.location.href.match("abbandon=true")) {
    abbandonoRicarica();
  }

  //se è stato salvato il numero nel coockie userNumber recuperiamolo
  // solo per utenti NON LOGGATI

  if (!IsTypoLogged()) {
    var userNumber = getCookie('userNumber');
    if (userNumber) {
      r$("#altro_numero")
        .val(userNumber);
      r$("#ricarica_numero")
        .val(userNumber);
    }
  }

  loadYear();

  retrieveCustomer();


  // retrieveTagli();
  console.log("MDP " + r$("input[name=mdp]:checked").val());
  if (r$("input[name=mdp]:checked").val() == null) {
    r$("#CXX")
      .click();
  } else {
    console.log("MDP " + r$("input[name=mdp]:checked").val())
    var but = r$("input[name=mdp]:checked").val()
    r$("#" + but).click();
    console.log("MDP " + r$("input[name=mdp]:checked").val())
  }
}

function submitRicarica() {
  //controllo del doppio click sul pulsante

  var numero = r$("#select_numbert").val();
  var taglio = r$("#select_taglio").val();
  var altro_numero = r$("#altro_numero").val();
  var mdp = r$("input[name=mdp]:checked").val();

  //Se loggato
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
  r$.ajax({
    type: "POST",
    url: '/nuovaAreaClienti/wind/pages/ricarica/result.action',
    data: {
      //    id:id
    },
    success: function(res) {


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

      loadEsito(content);
    },
    dataType: "json"
  }).fail(
    console.log("Fail Errore ricarica"));
}
//FINE METODI NAVIGAZIONE

var tagli = [];

function Taglio(id, importo, bonus, mdp, p3x2, testoBonus) {
  this.importo = importo
  this.bonus = bonus
  this.mdp = mdp
  this.p3x2 = p3x2
  this.id = id
  this.testoBonus = testoBonus
  this.testoGA = '';
}

Taglio.prototype.toOption = function() {
  var b = ""
  if (this.bonus != "0") {
    b = this.testoBonus
    if (b == null){
      b = this.importo + ' euro' + " + " + this.bonus + ' omaggio!';
    }
  } else {
    b = this.importo
    if (this.testoGA != "")
      b = b + this.testoGA;
  }

  var r = '<' + 'option value="' + this.id + '" ' +
    'data-bonus="' + this.bonus + '" data-taglio="' + this.importo + '" ' +
    'data-content="' + b + '<span class=\'euro\'>€</span>"' +
    'data-p3x2="' + this.p3x2 + '">' +
    b + '</option>'

  return r
}

var numeri = [];

function Linee(linea, sme, billing, label) {
  this.linea = linea
  this.sme = sme
  this.billing = billing
  this.label = label

}

Linee.prototype.toOption = function() {
  var bill = this.billing;
  if (!this.sme)
    bill = '';

  var r = '<' + 'option value="' + this.linea + '" ' +
    'smecdf="' + bill + '">' +
    this.label + '</option>'

  return r
}

function addTaglio(taglio) {
  if (tagli[taglio.mdp] == null)
    tagli[taglio.mdp] = []
  tagli[taglio.mdp].push(taglio)
}

function addNumero(numero) {
  if (numeri == null)
    numeri = []
  numeri.push(numero)
}



function popolaCliente() {
  r$.ajax({
      type: "POST",
      url: '/nuovaAreaClienti/wind/pages/ricarica/start.action',
      data: {},
      success: function(res) {

        //correzione della riga del menù solo per ricarica
        r$('.mfp-bg, .mfp-wrap')
          .css('height', '100%');

        r$('#select_numbert')
          .find('option')
          .remove();

        console.log(res);
        console.log("Esito" + res.esito);

        if (res.esito == "OK") {
          if (res.linee != null && res.linee.length > 0) {
            for (var i = 0; i < res.linee.length; i++) {
              var tg = res.linee[i];
              r$('#select_numbert').append(new Linee(tg.msisdn, tg.sme, tg.cdf, tg.msisdn).toOption());
            }

            r$('#select_numbert').append(new Linee("new", false, '', 'Altro numero').toOption());
            r$('#select_numbert').selectpicker('refresh');
            r$(".select_numbert").fadeIn();
            r$(".action_numbert").fadeOut();
          } else {
            r$('#select_numbert').append(new Linee("new", false, '', 'Altro numero').toOption());
            r$('#select_numbert').selectpicker('refresh');
            r$(".action_numbert").fadeIn();
            r$(".select_numbert").fadeOut();
            r$(".select_numbert").hide();
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
            r$("#action_c4").html("");

            for (var i = 0; i < res.cdf.length; i++) {
              var tg = res.cdf[i];
              addCdf(tg);
            }
            r$("#action_c3").show();
          } else {
            r$("#action_c4").fadeOut()
          }

          filterTagliByMdp(r$("input[name=mdp]:checked").val());
        } else {
          //alert("Si è verificato un errore, riprova più tardi");
          r$(".btn_close").trigger("click");
        }
      },
      dataType: "json"
    }).fail(function() {
      console.log("ERRORE CHIAMATA");
      //alert("Si è verificato un errore, riprova più tardi");
      r$(".btn_close").trigger("click");
    })
    .done(function() {
      if (IsTypoLogged()) {
        listCarte();
      }
    });


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


function filterTagliByMdp(mdp) {
  if (mdp == null){
    mdp = "CCX";
  }

  var newt = tagli[mdp];

  if (newt != null) {

    var importo = r$("#select_taglio").children("option:selected").attr("data-taglio");

    r$('#select_taglio')
      .find('option')
      .remove();

    var t = newt[0];

    for (var i = 0; i < newt.length; i++) {
      r$('#select_taglio').append(newt[i].toOption())
      if (newt[i].importo == importo) {
        t = newt[i];
      }
    }

    if (t != null) {
      r$('#select_taglio')
        .val(t.id)
        .trigger('change');
    }

    r$('#select_taglio')
      .selectpicker('refresh');
  }

  checkSubmitForm();

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




function loadMonth() {
  r$('#mese_carta')
    .find('option')
    .remove()
  var select = r$("#mese_carta");
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
    }).appendTo(select);
  }

  r$('#mese_carta').selectpicker('refresh');

}


function changeNumber() {
  r$("#ricaricaForm").attr("disabled", false);
}


var types = [{
    "type": "postepay",
    'reg': ["^(402360|402361|403035|417631|529948|531346|536414)[0-9]*"]
  },
  {
    "type": "visa",
    'reg': ["^4([0-9]*)$"]
  },
  {
    "type": "americane",
    'reg': ["^3(4|7)[0-9]*$"]
  },
  {
    "type": "maestro",
    'reg': ["^(50|67)[0-9]*"]
  },
  {
    "type": "masterc",
    'reg': ["^5(1|5|2|3)[0-9]*$"]
  },
  {
    "type": "diners",
    'reg': ["^(36|38)[0-9]*$", "^(300|301|302|303|304|305)[0-9]*$"]
  },
  {
    "type": "generic",
    'reg': ["^[0-9]*$"]
  }
]

function deduceCardTypeByNumber(number) {
  for (var i = 0; i < types.length; i++) {
    var r = types[i].reg
    for (var j = 0; j < r.length; j++) {
      if (number.match(r[j]))
        return types[i].type
    }
  }

  return null
}

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

  r$("#listaCarteTable").html("");
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

  r$("#listaCarteTable").append(row);
  loadYear();
  loadMonth();
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
        listCarte(deletingDefaultCard ? updateParentPage : null)
      } else
        rubricaErr(data.msg)
    }).fail(function(aa) {
    hideWaitBox();
    rubricaErr("Si &#232; verificato un errore")
  })

}

function listCarte(onFinish) {
  r$("#listaCarteTable").html();
  // showWaitBox()
  // clearCardForm()

  r$.get("/nuovaAreaClienti/wind/ajax/rubricaCarte/list.action", {},
    function(data) {
      //hideWaitBox();

      r$("#ricaricaForm").attr("disabled", false);

      if (data.OK) {
        if (data.cards == 0) {
          r$("#listaCarteTable .base__radio.radio.base__radio--small.radio-inline").remove();
          r$('#addNewCard').show();
        } else {
          for (var i = 0; i < data.cards.length; i++) {
            addCard(data.cards[i], i == 0)
          }
          if (onFinish != null)
            onFinish()
        }
      } else {
        rubricaErr(data.msg)
      }
    },
    "json").fail(function() {
    hideWaitBox();
    rubricaErr("Si &#232; verificato un errore.")
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
function addCdf(c) {
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

  r$("#action_c4").append(row)
}

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


var r$ = jQuery.noConflict();
r$(window).load(function() {
  HEADER.setSlider();
});


r$(document).ready(function() {

  r$('.open_sidebar_topUp').one('click', function() {
    r$('.mfp-bg, .mfp-wrap').css('height', '100%');
    r$('#action_c1').addClass('active');
    r$('.newCard_main_radio input[type="radio"]').prop('checked', true);
    r$('#action_c1 .cont_item1').css('display', 'block');

  });


  r$('#input_cc').blur(function() {
       var value = r$(this).val();
       if (value !== ""){
           value = value.replace(/\s/g, '');
           value = value.match(/.{1,4}/g).join(" ");
           r$(this).val(value);
       }
   });

   r$('#input_cc').focus(function() {
       var value = r$(this).val();
       var result = value.replace(/\s/g, '');
       r$(this).val(result);
   });


   r$("#security_cc").blur(function() {
       checkNextStep();
   });

  r$(".number_top_up_confirm").blur(function() {

    checkNextStep();
  });

  r$(".number_top_up, .number_top_up_confirm").blur(function() {

    checkNextStep();

  });

  r$('input[type="radio"]').change(function() {
    checkNextStep();
  });

  r$('select.select_cc').change(function() {
    checkNextStep();
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

function loadEsito(content) {
  var esitoRecharge = '/typo3conf/ext/wind_theme/Resources/Public/htmlContent/shoulder/recharge/esitoRecharge.html'
  /* Il template viene caricato scorrettamente, andrebbe inserito solo il contenuto invece viene inizializzato un altro popup innestato nella ricarica*/
  r$("#refill_block")
    .load(esitoRecharge, function() {
    r$("#refill_block")
      .fadeIn("slow", function() {
      //inizializziamo tutti i valori
      r$("#esitoricarica")
        .html(content);
      });
    });

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
//end


//REMOVE ERROR ON FOCUS
r$('.number_top_up_confirm')
  .focus(function() {
  // write your own rules if true
    r$(this)
      .removeClass('error');
    r$('.number_top_up_confirm + span')
      .removeClass('error');
  });
//REMOVE ERROR ON FOCUS


//REMOVE CARD
function removeCard(card, radio) {
  r$(".popup-btn_1").click(function() {
    card.slideUp().addClass('deleted');
    radio.removeAttr('checked');
    checkNextStep();
  });
}
//REMOVE CARD

//SHOWMORE ON DELETE AND CHECKED NEW CARD
r$(".closeModal").click(function() {
  if (r$(".item-box").hasClass('credit_card_main_radio')) {
    r$(".showMore_content").fadeIn("slow").css('display:static');
    r$(".showMore").slideUp("fast");
    r$(".showMore_content").getNiceScroll().resize();
  }
  if (r$(".item-box").hasClass('deleted')) {
    r$('.newCard_main_radio input[type="radio"]').prop('checked', true);
    r$("#action_c1").addClass("active");
    r$("#action_c1 .cont_item1").slideDown(timer);
    r$("#action_c1").getNiceScroll().resize();
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
  r$('#select_numbert').on('change', function() {
    if (r$(this).find('option:selected').is(':last-child')) {
      r$(".action_numbert").fadeIn("fast").addClass('entered');
      // r$('.top_up_button_final').prop("disabled", true);
    } else {
      r$(".action_numbert").fadeOut("fast").removeClass('entered');
      checkNextStep();

    }
  });
});
