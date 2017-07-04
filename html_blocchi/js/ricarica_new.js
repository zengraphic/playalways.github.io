(function(r$) {

    'use strict';

    /**
     * DOC READY BEHAVIOUR
     */

    r$(document)
        .ready(function() {
            var $topUpDomObject = r$('#refill_block');

            TOPUPTOOL
                .initTopUpTool($topUpDomObject);

        });


    /**
     * TOPUP TOOL OBJECT
     */

    var TOPUPTOOL = {
        /**
         * OGGETTO CONFIGURAZIONI
         */
        configs: {
            mfpShoulderConfig: {
                type: 'inline',
                mainClass: 'mfp-fade mfp-ricarica',
                midClick: true,
                alignTop: false,
                removalDelay: 500,
                key: 'topup',
                callbacks: {
                    open: function() {
                        TOPUPTOOL
                            .handleShoulderOpening();

                        r$.magnificPopup.instance.close = function(reset) {
                            if (this.st.key == 'topup') {
                                TOPUPTOOL
                                    .handleShoulderClosing();

                                /*if (reset) {
                                    TOPUPTOOL
                                        .handleShoulderClosing();
                                } else {
                                    TOPUPTOOL.callPopUp({
                                        title: "Abbandona ricarica",
                                        description: "Sei sicuro di voler abbandonare il processo di ricarica?<br>I dati non salvati andranno persi.",
                                        button1: true,
                                        button2: true,
                                        labelBtn1: 'Continua',
                                        labelBtn2: 'Abbandona',
                                        function2: function() {
                                            TOPUPTOOL.closeTopUpShoulder(true);
                                        }
                                    });
                                    return;
                                }*/
                            }

                            r$.magnificPopup.proto.close.call(this, reset);
                        };
                    }
                }
            },
            connectionErrorPopup: {
                title: "errore",
                description: "Gentile cliente, si è verificato un errore, ti preghiamo di riprovare tra qualche ora",
                button2: true,
                labelBtn2: 'chiudi',
                function2: function() {
                    TOPUPTOOL.closeTopUpShoulder(true);
                }
            },
            iconNames: ['visa', 'postepay', 'americane', 'maestro', 'masterc', 'diners', 'general', 'null'],
            creditCardTypes: [{
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
            }],
            numeri: [],
            tagli: [],
            default: false,
            homepageBlockInput: false,
            homepageBlockConfirm: false,
            homepageBlockTaglio: false,
            topUpState: {
                number: false,
                newNumber: {
                    input: false,
                    confirm: false
                },
                newCard: {
                    number: false,
                    date: false,
                    cvv: false
                },
                payment: false,
                email: true
            },
            isResult: false
        },
        /**
         * COOKIES/DATALAYER
         */
        getCookie: function(cookieName) {
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
        },
        setCookie: function(cname, cvalue, exdays) {
            var $TOPUP = this;
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            return $TOPUP;
        },
        pushDatalayer: function(type, idRicarica, transactionProducts) {
            var $TOPUP = this;
            var logged = (IsLogged()) ? 'logged' : 'not-logged';
            var arrDatalayer = [];

            switch (type) {
                case 1:
                    arrDatalayer = transactionProducts;
                    break;
                case 2:
                    arrDatalayer = transactionProducts;
                    break;
                case 3:
                    arrDatalayer = {
                        pagetype: 'Ricarica',
                        pageContent: 'exit - ' + logged,
                        event: 'TopUp',
                        originUrl: window.location.href
                    };
                    break;
            }

            try {
                dataLayer
                    .push(arrDatalayer);
            } catch (e) {
                console.warn("RICARICA:", e);
            }
            return $TOPUP;
        },
        parseDataLayer: function(res) {
            var $TOPUP = this;
            var dataLayerObject = {};
            var resDataLayer = res.dataLayer;
            if (res.success) {
                dataLayerObject = {
                    pagetype: 'Ricarica',
                    pageContent: resDataLayer.pageContent,
                    transactionId: resDataLayer.trackId,
                    step: '2',
                    event: 'TopUp',
                    hpnuc: resDataLayer.hpnuc,
                    cuspid: resDataLayer.cuspid,
                    transactionAffiliation: resDataLayer.affiliation,
                    transactionTotal: parseInt(resDataLayer.total),
                    transactionTax: (parseInt(resDataLayer.tax) == NaN) ? 0 : parseInt(resDataLayer.tax),
                    transactionShipping: (parseInt(resDataLayer.shipping) == NaN) ? 0 : parseInt(resDataLayer.shipping),
                    transactionProducts: {
                        sku: resDataLayer.sku,
                        name: resDataLayer.product,
                        category: resDataLayer.category,
                        price: parseInt(resDataLayer.total),
                        quantity: parseInt(resDataLayer.qty),
                    },
                };
            } else {
                dataLayerObject = {
                    pagetype: 'Ricarica',
                    pageContent: resDataLayer.pageContent,
                    step: '2',
                    event: 'TopUp',
                    hpnuc: resDataLayer.hpnuc,
                    cuspid: resDataLayer.cuspid
                };

            }
            $TOPUP
                .pushDatalayer(2, resDataLayer.trackId, dataLayerObject);
            return $TOPUP;
        },
        /**
         * SHOULDER OPEN/CLOSE
         */
        openTopUpShoulder: function() {
            var $TOPUP = this;
            $TOPUP
                .headerTopUpLink
                .magnificPopup('open');
            return $TOPUP;
        },
        closeTopUpShoulder: function(reset) {
            var $TOPUP = this;
            $TOPUP
                .headerTopUpLink
                .magnificPopup('close', reset);
            return $TOPUP;
        },
        loadFromBlockRecharge: function() {
            var $TOPUP = this;

            if ($TOPUP.topUpHomePageBlockInput.val() == $TOPUP.topUpHomePageBlockConfirm.val()) {
                $TOPUP.configs.homepageBlockInput = $TOPUP.topUpHomePageBlockInput.val();
                $TOPUP.configs.homepageBlockConfirm = $TOPUP.topUpHomePageBlockConfirm.val();
                $TOPUP.configs.homepageBlockTaglio = $TOPUP.topUpHomePageBlockTaglio.val();

                $TOPUP
                    .openTopUpShoulder();
            }
            return $TOPUP;
        },
        /**
         * SPINNER SHOW/HIDE
         */
        showSpinner: function() {
            var $TOPUP = this;

            $TOPUP
                .spinner
                .show();
            $TOPUP
                .container
                .append('<span class="fa fa-spinner spin-animate"></span>');
            return $TOPUP;
        },
        hideSpinner: function() {
            var $TOPUP = this;

            $TOPUP
                .spinner
                .hide();
            $TOPUP
                .container
                .find("span.fa.fa-spinner.spin-animate")
                .remove();
            return $TOPUP;
        },
        /**
         * SCROLL BAR
         */
        updateScrollBar: function() {
            var $TOPUP = this;
            $TOPUP
                .container
                .find('.base__scrollable')
                .getNiceScroll()
                .resize();
            return $TOPUP;
        },
        /**
         * NEW NUMBER SHOW/HIDE
         */
        showNewNumberForm: function() {
            var $TOPUP = this;

            $TOPUP
                .newNumberContainer
                .fadeIn('fast')
                .addClass('entered');

            return $TOPUP;
        },
        hideNewNumberForm: function() {
            var $TOPUP = this;

            $TOPUP
                .newNumberContainer
                .fadeOut('fast')
                .removeClass('entered');

            return $TOPUP;
        },
        /**
         * SUBMIT TOPUP ENABLE/DISABLE
         */
        enableTopUpSubmit: function() {
            var $TOPUP = this;

            $TOPUP
                .topUpSubmitButton
                .prop('disabled', false);

            return $TOPUP;
        },
        disableTopUpSubmit: function() {
            var $TOPUP = this;

            $TOPUP
                .topUpSubmitButton
                .prop('disabled', true);

            return $TOPUP;
        },
        /**
         * ERROR ADD/REMOVE
         */
        addError: function(inputElement, messageText) {
            var $TOPUP = this;
            var errorSpan;
            if (inputElement.is('select')) {
                errorSpan = inputElement.parent().next('span');
                inputElement = inputElement.parent();
            } else {
                errorSpan = inputElement.next('span');
            }

            if (messageText) {
                errorSpan
                    .text(messageText);
            }

            inputElement
                .addClass('error');
            errorSpan
                .addClass('error');
            return $TOPUP;
        },
        removeError: function(inputElement) {
            var $TOPUP = this;
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
                .removeClass('error');
            return $TOPUP;
        },
        /**
         * OTHER PAYMENTS SHOW/HIDE
         */
        showOtherMethodsOfPayment: function() {
            var $TOPUP = this;
            $TOPUP
                .showMoreLink
                .slideUp("fast");
            $TOPUP
                .showMoreContent
                .fadeIn("slow")
                .css('display:static');
            return $TOPUP;
        },
        hideOtherMethodsOfPayment: function() {
            var $TOPUP = this;
            $TOPUP
                .showMoreLink
                .slideDown("fast");
            $TOPUP
                .showMoreContent
                .fadeOut("slow")
                .css('display:none');
            return $TOPUP;
        },
        /**
         * PAYMENT OPEN/CLOSE
         */
        openMethodOfPayment: function(selectedMethodBox) {
            var $TOPUP = this;
            selectedMethodBox
                .addClass('active');
            if (selectedMethodBox.hasClass('expandable')) {
                selectedMethodBox
                    .find('.cont_item1')
                    .slideDown("slow");
            }
            return $TOPUP;
        },
        closeMethodOfPayment: function(selectedMethodBox) {
            var $TOPUP = this;
            selectedMethodBox
                .removeClass('active');
            if (selectedMethodBox.hasClass('expandable')) {
                selectedMethodBox
                    .find('.cont_item1')
                    .slideUp("slow");
            }
            return $TOPUP;
        },
        /**
         * NEW CREDIT CARD SHOW
         *
         */
        showNewCreditCardForm: function(isLogged) {
            var $TOPUP = this;

            $TOPUP
                .showMoreContent
                .find('#action_c1')
                .find('#option1')
                .prop('checked', true);
            $TOPUP
                .handlePaymentChange();
            return $TOPUP;
        },
        hideNewCreditCardForm: function(isLogged) {
            var $TOPUP = this;

            $TOPUP
                .showMoreContent
                .find('#action_c1')
                .find('#option1')
                .prop('checked', false);
            $TOPUP
                .handlePaymentChange();
            return $TOPUP;
        },
        /**
         * AJAX REQUESTS
         */
        startActionRequest: function() {
            var $TOPUP = this;
            return r$.ajax({
                type: "POST",
                url: '/nuovaAreaClienti/wind/pages/ricarica/start.action',
                data: {},
                global: false,
                dataType: "json",
                beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }
            });
        },
        numberWindRequest: function(number) {
            var $TOPUP = this;
            return r$.ajax({
                type: "POST",
                url: '/nuovaAreaClienti/wind/pages/onLineRecharge/checkWindNumber.action',
                global: false,
                data: {
                    msisdn: number
                },
                dataType: "json",
                /*beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }*/
            });
        },
        cardDeleteRequest: function(id) {
            var $TOPUP = this;
            return r$.ajax({
                url: "/nuovaAreaClienti/wind/ajax/rubricaCarte/delete.action",
                method: 'POST',
                data: {
                    'alias': id
                },
                beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }
            });
        },
        topUpSumitRequest: function(topUpSubmitData) {
            var $TOPUP = this;
            return r$.ajax({
                type: "POST",
                url: '/nuovaAreaClienti/wind/pages/ricarica/submit.action',
                data: topUpSubmitData,
                dataType: "json",
                beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }
            });
        },
        topUpResultRequest: function(id) {
            var $TOPUP = this;
            return r$.ajax({
                type: "POST",
                url: '/nuovaAreaClienti/wind/pages/ricarica/result.action',
                data: {
                    // id:id
                },
                global: false,
                dataType: "json",
                beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }
            });

        },
        topUpAbbandonRequest: function() {
            var $TOPUP = this;
            return r$.ajax({
                type: "POST",
                url: '/nuovaAreaClienti/wind/pages/ricarica/abbandona.action',
                data: {},
                dataType: "json",
                global: false,
                beforeSend: function() {
                    $TOPUP.showSpinner();
                },
                complete: function() {
                    $TOPUP.hideSpinner();
                }
            });
        },
        /**
         * POPOLA CHECKBOX RICORDA I DATI
         */
        populateRememberCard: function() {
            var $TOPUP = this;
            var remembercardCheckbox = r$('#checkCreditcard');
            if (remembercardCheckbox.length == 0) {
                var ccxContent = '<div id="checkCreditcard" class="base__checkbox checkbox checkbox-inline remember_check">' +
                    '<input type="checkbox" class="styled" id="salvadati-checkbox" value="option1" checked="checked">' +
                    '<label for="salvadati-checkbox">Ricorda la mia carta per i pagamenti successivi</label>' +
                    '<div class="base__icon icon_help--color modalCc"></div>' +
                    '</div>';

                r$('#refill_block')
                    .find('.container_select_cc')
                    .append(ccxContent);
            }
            return $TOPUP;
        },
        populateRememberPaypal: function(wasSaved) {
            var $TOPUP = this;
            var payPalContent = $TOPUP.container.find('#action_c2').find('.cont_item1');
            payPalContent
                .html('');
            var message = wasSaved ? 'Clicca su RICARICA per effettuare subito il pagamento' : 'Verrai reindirizzato sul sito di <a href="https://www.paypal.com">PayPal</a> dove potrai effettuare il pagamento';
            var paypalContent =
                '<h4 class="text_p">' + message + '</h4>' +
                '<div id="checkPaypal" class="base__checkbox checkbox checkbox-inline remember_check">' +
                '<input type="checkbox" class="styled" id="paypal-checkbox" value="option1" checked="checked">' +
                '<label for="paypal-checkbox">Ricorda i miei dati</label>' +
                '<div class="base__icon icon_help--color modalPaypal"></div>' +
                '</div>';
            payPalContent
                .html(paypalContent);
            return $TOPUP;
        },
        /**
         * SUBMIT LOGOUT
         */
        submitLogout: function() {
            r$("#LogoutForm")
                .submit();
        },
        /**
         * INIT FUNCTION
         */
        initTopUpTool: function($topUpDomObject) {
            var $TOPUP = this;

            $TOPUP
                .setTopUpDom($topUpDomObject)
                .bindTopUpEvents()
                .initTopUpLink();

            return $TOPUP;
        },
        /**
         * TOPUP DOM OBJECT CACHING
         */
        setTopUpDom: function($topUpDomObject) {
            var $TOPUP = this;

            $TOPUP.headerTopUpLink = r$('.base__popup-link--ricarica', '#header');
            $TOPUP.container = $topUpDomObject;
            $TOPUP.spinner = $TOPUP.container.find('#spinner');
            $TOPUP.topUpForm = $TOPUP.container.find('.ricarica_wrapper');
            $TOPUP.topUpBox = $TOPUP.container.find('#refill_block_box');
            $TOPUP.numberSelect = $TOPUP.topUpBox.find('#select_numbert');
            $TOPUP.newNumberContainer = $TOPUP.topUpBox.find('.action_numbert');
            $TOPUP.newNumberInput = $TOPUP.newNumberContainer.find('#altro_numero');
            $TOPUP.newNumberConfirm = $TOPUP.newNumberContainer.find('#ricarica_numero');
            $TOPUP.topUpAmountSelect = $TOPUP.topUpBox.find('#select_taglio');
            $TOPUP.showMoreLink = $TOPUP.container.find('.showMore');
            $TOPUP.showMoreContent = $TOPUP.container.find('.showMore_content');
            $TOPUP.paymentMethods = $TOPUP.container.find('input[name="mdp"]');
            $TOPUP.newCreditCardContainer = $TOPUP.showMoreContent.find('#action_c1');
            $TOPUP.newCreditCardRadio = $TOPUP.newCreditCardContainer.find('#option1');
            $TOPUP.newCreditCardForm = $TOPUP.newCreditCardContainer.find('#listaCarteTable');
            $TOPUP.newCreditCardNumber = $TOPUP.newCreditCardForm.find('#input_cc');
            $TOPUP.newCreditCardExpDate = $TOPUP.newCreditCardForm.find('#mese_carta,#anno_carta');
            $TOPUP.newCreditCardExpDateMonth = $TOPUP.newCreditCardForm.find('#mese_carta');
            $TOPUP.newCreditCardExpDateYear = $TOPUP.newCreditCardForm.find('#anno_carta');
            $TOPUP.newCreditCardCvv = $TOPUP.newCreditCardForm.find('#security_cc');
            $TOPUP.payPal = $TOPUP.container.find('#action_c2');
            $TOPUP.accountCharge = $TOPUP.showMoreContent.find('#action_c3');
            $TOPUP.topUpSubmitButton = $TOPUP.container.find('#ricaricaForm');
            $TOPUP.emailNotification = $TOPUP.container.find('#emailricarica');
            $TOPUP.logoutForm = r$('#LogoutForm');
            $TOPUP.resultWrapper = $TOPUP.container.find('.esito_ricarica_wrapper');
            $TOPUP.resultContainer = $TOPUP.container.find('#esitoricarica');
            $TOPUP.resultMessage = $TOPUP.resultContainer.find('#pko');
            if (r$('.blocco_ricarica').length > 0) {
                $TOPUP.topUpHomePageBlock = r$('.blocco_ricarica');
                $TOPUP.topUpHomePageBlockInput = $TOPUP.topUpHomePageBlock.find('input[name=insert_number]');
                $TOPUP.topUpHomePageBlockConfirm = $TOPUP.topUpHomePageBlock.find('input[name=confirm_number]');
                $TOPUP.topUpHomePageBlockTaglio = $TOPUP.topUpHomePageBlock.find('select');
            }

            return $TOPUP;
        },
        /**
         * TOPUP DOM BINDINGS
         */
        bindTopUpEvents: function() {
            var $TOPUP = this;

            $TOPUP
                .resultContainer
                .on({
                    'click': function(event) {
                        $TOPUP
                            .newRecharge();
                    }
                }, 'button.btn');

            $TOPUP
                .container
                .on({
                    'changed.bs.select': function() {
                        $TOPUP
                            .handleSelectNumberChange();
                    }
                }, '#select_numbert')
                .on({
                    'focus': function() {
                        $TOPUP
                            .removeError($TOPUP.newNumberInput);
                    },
                    'blur': function() {
                        $TOPUP
                            .handleNewNumberInput()
                            .checkNextStep();
                    }
                }, '#altro_numero')
                .on({
                    'focus': function() {
                        $TOPUP
                            .removeError($TOPUP.newNumberConfirm);
                    },
                    'paste':function(event){
                        event.preventDefault();
                        return false;
                    },
                    'blur': function() {
                        $TOPUP
                            .handleNewNumberConfirm()
                            .checkNextStep();
                    }
                }, '#ricarica_numero')
                .on({
                    'change': function() {
                        $TOPUP
                            .handleChangeTagli();
                    }
                }, '#select_taglio')
                .on({
                    'click': function() {
                        $TOPUP
                            .showOtherMethodsOfPayment();
                    }
                }, '.showMore')
                .on({
                    'change': function() {
                        $TOPUP
                            .handlePaymentChange();
                    }
                }, 'input[name="mdp"]')
                .on({
                    'focus': function() {
                        $TOPUP
                            .removeError($TOPUP.newCreditCardNumber);
                    },
                    'keydown': function(event) {
                        $TOPUP
                            .handleNewCreditCardNumberKey(event);
                    },
                    'keyup': function() {
                        $TOPUP
                            .handleCreditCardIcons();
                    },
                    'blur': function() {
                        $TOPUP
                            .handleNewCreditCardNumber();
                    }
                }, '#input_cc')
                .on({
                    'changed.bs.select': function() {
                        $TOPUP
                            .checkDataScadenza();
                    }
                }, '#mese_carta,#anno_carta')
                .on({
                    'focus': function() {
                        $TOPUP
                            .removeError($TOPUP.newCreditCardCvv);
                    },
                    'keyup': function(e) {
                        return !$TOPUP.isValidSecureCode();
                    },
                    'blur': function() {
                        $TOPUP
                            .handleNewCreditCardCvv();
                    }
                }, '#security_cc')
                .on({
                    'click': function() {
                        $TOPUP
                            .callPopUp({
                                title: 'Ricorda i dati Carta di Credito',
                                description: 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire i dati della tua carta di credito. La carta utilizzata resterà disponibile per le successive ricariche. Per ragioni di sicurezza Wind non salva la tua carta ma esclusivamente un codice identificativo della stessa fornito dal sistema di pagamento. Per questo motivo saranno mostrati solo gli ultimi 4 numeri della carta. Potrai sempre modificarla, eliminarla o aggiungerne una nuova.',
                                button2: true,
                                labelBtn2: 'chiudi'
                            });
                    }
                }, '.modalCc')
                .on({
                    'click': function() {
                        var clickedRemoveButton = r$(this);
                        $TOPUP
                            .removeCreditCard(clickedRemoveButton);
                    }
                }, '.btn_removeModal')
                .on({
                    'click': function() {
                        $TOPUP
                            .callPopUp({
                                title: 'Ricorda i dati di Paypal',
                                description: 'Questo servizio ti permetterà di effettuare i pagamenti successivi senza dover più inserire le credenziali sul sito di PayPal. Per ragioni di sicurezza Wind non salva le tue credenziali di accesso ma esclusivamente un codice identificativo fornito da PayPal. Potrai sempre modificare la tua scelta, deselezionando la voce Ricorda i miei dati.',
                                button2: true,
                                labelBtn2: 'chiudi'
                            });
                    }
                }, '.modalPaypal')
                .on({
                    'click': function() {
                        $TOPUP
                            .callPopUpContract({
                                title: 'Conto telefonico',
                                description: 'La ricarica online verrà addebitata sul Conto Telefonico a cui sono associate le seguenti linee/utenze:',
                                firstLabel: 'Linea/Utenza',
                                firstValue: r$(this).data().contract,
                                secondLabel: 'Offerta',
                                secondValue: r$(this).data().offer,
                                thirdLabel: 'Contratto',
                                thirdValue: r$(this).data().line,
                                btnLabel: 'Chiudi'
                            });
                    }
                }, '.contract__popup')
                .on({
                    'focus': function() {
                        $TOPUP
                            .removeError($TOPUP.emailNotification);
                    },
                    'blur': function() {
                        $TOPUP
                            .handleEmailNotification();
                    }
                }, '#emailricarica')
                .on({
                    'click': function() {
                        $TOPUP
                            .closePopup();
                    }
                }, '.closeModal')
                .on({
                    'click': function() {
                        $TOPUP
                            .submitRicarica();
                    }
                }, '#ricaricaForm')
                .on({
                    'topup.ready': function() {
                        $TOPUP
                            .handleOriginPath();
                    }
                });
            r$('body')
                .on({
                    'click': function() {
                        $TOPUP
                            .loadFromBlockRecharge();
                    }
                }, '#sendBloccoRicarica');


            return $TOPUP;
        },
        /**
         * INIT MAGNIFIC TOPUP SHOULDER
         */
        initTopUpLink: function() {
            var $TOPUP = this;

            $TOPUP
                .headerTopUpLink
                .magnificPopup($TOPUP.configs.mfpShoulderConfig);

            $TOPUP
                .container
                .trigger('topup.ready');

            return $TOPUP;
        },
        /**
         * SHOULDER OPEN/CLOSE HANDLERS
         */
        handleShoulderOpening: function() {
            var $TOPUP = this;
            if(!$TOPUP.configs.isResult){
                $TOPUP
                    .initTopUpProcess();
            }
            
            return $TOPUP;
        },
        handleShoulderClosing: function() {
            var $TOPUP = this;

            $TOPUP
                .topUpForm
                .hide("fast");

            $TOPUP
                .resultWrapper
                .hide("fast");

            $TOPUP
                .resetTopUpForm()
                .setCookie("taglioDft", null)
                .pushDatalayer(3);

            var requestAbbandonoRicarica = $TOPUP.topUpAbbandonRequest();
            requestAbbandonoRicarica
                .then(function(res) {
                    console.log("RICARICA ABBANDONATA CORRETTAMENTE", res);
                }, function(err) {
                    console.warn("ERRORE DURANTE ABBANDONO RICARICA", err);
                });
            return $TOPUP;
        },
        resetTopUpForm: function() {
            var $TOPUP = this;

            $TOPUP.configs.topUpState = {
                number: false,
                newNumber: {
                    input: false,
                    confirm: false
                },
                newCard: {
                    number: false,
                    date: false,
                    cvv: false
                },
                payment: false,
                email: false
            };

            $TOPUP.configs.tagli = [];
            $TOPUP.configs.numeri = [];

            $TOPUP.numberSelect.find('option').remove();
            $TOPUP.numberSelect.selectpicker('refresh');

            $TOPUP.newNumberInput.val('');
            $TOPUP.removeError($TOPUP.newNumberInput);

            $TOPUP.newNumberConfirm.val('');
            $TOPUP.removeError($TOPUP.newNumberConfirm);

            $TOPUP.hideNewNumberForm();
            $TOPUP.numberSelect.hide();

            $TOPUP.topUpAmountSelect.find('option').remove();
            $TOPUP.topUpAmountSelect.selectpicker('refresh');

            $TOPUP.newCreditCardNumber.val('');
            $TOPUP.removeError($TOPUP.newCreditCardNumber);

            $TOPUP.newCreditCardNumber.keyup();

            $TOPUP.newCreditCardExpDateMonth.find('option').remove();
            $TOPUP.newCreditCardExpDateMonth.selectpicker('refresh');
            $TOPUP.removeError($TOPUP.newCreditCardExpDateMonth);


            $TOPUP.newCreditCardExpDateYear.find('option').remove();
            $TOPUP.newCreditCardExpDateYear.selectpicker('refresh');
            $TOPUP.removeError($TOPUP.newCreditCardExpDateYear);

            $TOPUP.newCreditCardCvv.val('');
            $TOPUP.removeError($TOPUP.newCreditCardCvv);

            $TOPUP
                .topUpForm
                .find('#creditCard-logged')
                .remove();

            $TOPUP
                .topUpForm
                .find('.item-box.ak-item-credit-card-logged')
                .remove();

            $TOPUP
                .topUpForm
                .find('#action_c2')
                .detach()
                .insertAfter($TOPUP.topUpForm.find('#action_c1'));

            $TOPUP
                .hideNewCreditCardForm()
                .hideOtherMethodsOfPayment();

            $TOPUP
                .newCreditCardRadio
                .prop('checked', true);

            if (r$("#checkPaypal").length > 0) { r$("#checkPaypal").remove(); }
            if (r$("#checkCreditcard").length > 0) { r$("#checkCreditcard").remove(); }

            if (r$(".blocco_ricarica").length > 0) {
                $TOPUP.topUpHomePageBlockInput.val('');
                $TOPUP.topUpHomePageBlockConfirm.val('');
            }

            return $TOPUP;
        },
        /**
         * HANDLE NAVIGATION PATH
         */
        handleOriginPath: function() {
            var $TOPUP = this;

            var originPathMatchesTopUp = window.location.hash.match("#refill_block");
            var originPathMatchesResult = GetParameterByName('result') == "true";

            if (originPathMatchesTopUp) {
                if (originPathMatchesResult) {
                    $TOPUP.configs.isResult = true;
                    $TOPUP
                        .showEsitoRicarica()
                        .openTopUpShoulder();
                } else {
                    $TOPUP
                        .openTopUpShoulder();
                }
            }

            return $TOPUP;
        },
        /**
         * POPUP CALLS
         */

        callPopUp: function(options) {
            var $TOPUP = this;

            var defaults = {
                titl: '',
                description: '',
                button1: false,
                button2: false,
                labelBtn1: '',
                labelBtn2: '',
                function1: r$.noop(),
                function2: r$.noop()
            };

            var settings = r$.extend(defaults, options);

            var ricaricaContainer = $TOPUP.container.find('.container');
            var btnCommonClasses = 'btn btn_refil base__bt popup-btn closeModal waves-effect waves-button waves-float waves-light';
            var popupHtmlString =
                '<div class="popup">' +
                '<div class="popup-dialog">' +
                '<div class="popup-header">' + settings.title + '</div>' +
                '<div class="popup-body">' + settings.description + '</div>' +
                '<div class="popup-footer ">' +
                (settings.button1 ? '<button id="confirmButton" class="popup-btn_1 top_up_newCard ' + btnCommonClasses + '">' + settings.labelBtn1 + '</button>' : '') +
                (settings.button2 ? '<button id="confirmButton2" class="popup-btn_2 ' + btnCommonClasses + '">' + settings.labelBtn2 + '</button>' : '') +
                '</div>' +
                '</div>' +
                '</div>';

            var $popup = r$(popupHtmlString);


            $TOPUP
                .container
                .find('.container')
                .append($popup.show());

            $TOPUP
                .container
                .find('#confirmButton,#confirmButton2')
                .show();

            if (typeof settings.function1 == 'function') {
                r$("#confirmButton")
                    .one('click', settings.function1);
            }

            if (typeof settings.function2 == 'function') {
                r$("#confirmButton2")
                    .one('click', settings.function2);
            }
            return $TOPUP;
        },
        callPopUpContract: function(options) {
            var $TOPUP = this;

            var defaults = {
                title: '',
                description: '',
                firstLabel: '',
                secondLabel: '',
                thirdLabel: '',
                firstValue: '',
                secondValue: '',
                thirdValue: '',
                btnLabel: ''
            };

            var settings = r$.extend(defaults, options);

            var popupHtmlString =
                '<div class="popup--contract">' +
                '<div class="popup--contract-dialog">' +
                '<div class="popup--contract-header">' + settings.title + '</div>' +
                '<div class="popup--contract-body">' +
                '<div class="popup-body--description">' + settings.description + '</div>' +
                '<div class="popup_row first_row">' +
                '<div class="first-label popup-body--label pull-left">' + settings.firstLabel + '</div>' +
                '<div class="first-value popup-body--value pull-right">' + settings.firstValue + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="divider"></div>' +
                '<div class="popup_row second_row">' +
                '<div class="second-label popup-body--label pull-left">' + settings.secondLabel + '</div>' +
                '<div class="second-value popup-body--value pull-right">' + settings.secondValue + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="divider"></div>' +
                '<div class="popup_row third_row">' +
                '<div class="third-label popup-body--label pull-left">' + settings.thirdLabel + '</div>' +
                '<div class="third-value popup-body--value pull-right">' + settings.thirdValue + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="popup--contract-footer ">' +
                '<button class="btn popup-btn_2 btn_refil  base__bt popup-btn  closeModal waves-effect waves-button waves-float waves-light">' + settings.btnLabel + '</button>' +
                '</div>' +
                '</div>' +
                '</div>';

            $TOPUP
                .container
                .find('.container')
                .append(r$(popupHtmlString).show());

            return $TOPUP;
        },
        closePopup: function() {
            var $TOPUP = this;
            var popup = $TOPUP.container.find('.popup--contract,.popup');
            popup
                .fadeOut(100, function() {
                    r$(this)
                        .remove();
                });
            return $TOPUP;
        },
        /**
         * INIT TOPUP PROCESS
         */
        initTopUpProcess: function() {
            var $TOPUP = this;
            if (window.location.href.match("abbandon=true")) {
                var requestAbbandonoRicarica = $TOPUP.topUpAbbandonRequest();
                requestAbbandonoRicarica
                    .then(function(res) {
                        console.log("RICARICA ABBANDONATA CORRETTAMENTE", res);
                        $TOPUP
                            .initTopUpForm();
                    }, function(err) {
                        console.warn("ERRORE DURANTE ABBANDONO RICARICA", err);
                        $TOPUP
                            .initTopUpForm();
                    });
            } else {
                $TOPUP
                    .initTopUpForm();
            }

            return $TOPUP;
        },
        initTopUpForm: function() {
            var $TOPUP = this;
            if (IsLogged()) {
                $TOPUP
                    .initCustomer(true);
            } else {
                $TOPUP
                    .initCustomer();
            }

            return $TOPUP;
        },
        /**
         * INIT CUSTOMER
         */
        initCustomer: function(isCustomerLogged) {
            var $TOPUP = this;

            var startRequestPromise = $TOPUP.startActionRequest();

            startRequestPromise
                .then(function(res) {
                    $TOPUP
                        .handleStartActionResponse(res);
                }, function(err) {
                    console.warn("ERRORE CHIAMATA", err);
                    $TOPUP
                        .callPopUp($TOPUP.configs.connectionErrorPopup);
                });

            return $TOPUP;
        },
        handleStartActionResponse: function(customerData) {
            var $TOPUP = this;
            if (customerData.esito == "OK") {
                $TOPUP
                    .topUpAmountSelect
                    .selectpicker();
                $TOPUP
                    .populateTagli(customerData.tagli);

                if (IsLogged() && customerData.logged) {
                    if (customerData.cards.length > 0) {
                        $TOPUP
                            .handleLoggedCustomer(customerData, true);
                    } else {
                        $TOPUP
                            .handleLoggedCustomer(customerData, false);
                    }

                } else if (IsLogged() && !customerData.logged) {
                    $TOPUP
                        .callPopUp({
                            title: "Sessione scaduta",
                            description: 'Effettua di nuovo il login.',
                            button2: true,
                            labelBtn2: 'continua',
                            function2: function() {
                                $TOPUP
                                    .submitLogout();
                            }
                        });
                    console.warn(data.msg);
                } else {
                    $TOPUP
                        .handleCleanCustomer();
                }
                $TOPUP
                    .filterTagliByMdp()
                    .checkNextStep();
            } else if (customerData.esito == "CLOSED") {
                $TOPUP
                    .callPopUp({
                        title: 'Ricarica in manutenzione',
                        description: customerData.error_description,
                        button2: true,
                        labelBtn2: 'chiudi',
                        function2: function() {
                            TOPUPTOOL.closeTopUpShoulder(true);
                        }
                    });
                console.warn(data.msg);
            }
            return $TOPUP;
        },
        /**
         * HANDLE CUSTOMER TYPE
         */
        handleLoggedCustomer: function(customerData, hasCards) {
            var $TOPUP = this;
            try {
                var dataLayerGoogle = {
                    pagetype: 'Ricarica',
                    pageContent: customerData.dataLayer.pageContent,
                    step: '1',
                    event: 'TopUp',
                    hpnuc: customerData.dataLayer.hpnuc,
                    cuspid: customerData.dataLayer.cuspid,
                };
                $TOPUP
                    .pushDatalayer(1, null, dataLayerGoogle);

            } catch (err) {
                console.warn("RICARICA:", "TopUp Datalayer Error " + err);
            }

            $TOPUP
                .populateLines(customerData.linee)
                .populateRememberCard();
            if (hasCards) {
                $TOPUP.configs.topUpState.payment = true;
                $TOPUP
                    .populateCreditCards(customerData.cards, null, customerData.ricordaPAYPAL);
                if (customerData.ricordaPAYPAL) {

                    $TOPUP
                        .populateRememberPaypal(true);
                } else {
                    $TOPUP
                        .populateRememberPaypal(false);
                }

            } else if (customerData.ricordaPAYPAL) {
                $TOPUP.configs.topUpState.payment = true;
                $TOPUP
                    .populateRememberPaypal(true);
                $TOPUP
                    .topUpForm
                    .find('#action_c2')
                    .detach()
                    .insertBefore($TOPUP.showMoreLink);

                $TOPUP
                    .topUpForm
                    .find('#action_c2')
                    .find('input')
                    .prop('checked', true);
                $TOPUP
                    .handlePaymentChange();
            } else {
                $TOPUP
                    .showNewCreditCardForm()
                    .populateRememberPaypal(false)
                    .showOtherMethodsOfPayment();
            }
            $TOPUP
                .populateAccounts(customerData);

            if (customerData.useremail) {
                $TOPUP.configs.topUpState.email = true;
                $TOPUP
                    .emailNotification
                    .val(customerData.useremail);
            }
            $TOPUP
                .topUpForm
                .show('fast', function() {
                    if ($TOPUP.newNumberInput.is(':visible')) {
                        $TOPUP.newNumberInput.focus();
                    }
                });
            return $TOPUP;
        },
        handleCleanCustomer: function() {
            var $TOPUP = this;
            $TOPUP
                .populateLines()
                .showOtherMethodsOfPayment()
                .showNewCreditCardForm();

            $TOPUP
                .topUpForm
                .show('fast', function() {
                    if ($TOPUP.newNumberInput.is(':visible')) {
                        $TOPUP.newNumberInput.focus();
                    }
                });
            return $TOPUP;
        },
        /**
         * POPOLA NUMERI DI TELEFONO
         */
        populateLines: function(lines) {
            var $TOPUP = this;

            if (lines && lines.length > 0) {
                $TOPUP.configs.topUpState.number = true;
                $TOPUP
                    .populateLinesSelect(lines);
                if ($TOPUP.configs.homepageBlockInput) {
                    if ($TOPUP.numberSelect.find('option[value="' + $TOPUP.configs.homepageBlockInput + '"]').length > 0) {
                        $TOPUP
                            .numberSelect
                            .selectpicker('val', $TOPUP.configs.homepageBlockInput);

                    } else {
                        $TOPUP.configs.topUpState.number = false;
                        $TOPUP
                            .numberSelect
                            .selectpicker('val', 'new');
                        $TOPUP
                            .populateLinesFromHomePage()
                            .showNewNumberForm();

                    }
                    $TOPUP
                        .topUpBox
                        .find('.bootstrap-select')
                        .show();
                } else {
                    $TOPUP
                        .topUpBox
                        .find('.bootstrap-select')
                        .show();
                }

            } else {
                $TOPUP.configs.topUpState.number = false;
                if ($TOPUP.configs.homepageBlockInput) {
                    $TOPUP
                        .populateLinesFromHomePage();
                }
                $TOPUP
                    .showNewNumberForm();

            }

            return $TOPUP;
        },
        populateLinesSelect: function(lines) {
            var $TOPUP = this;

            r$.each(lines, function(lineIndex, line) {
                $TOPUP
                    .numberSelect
                    .append(new Linee(line.msisdn, line.sme, line.cdf, line.msisdn).toOption());
            });
            $TOPUP
                .numberSelect
                .append(new Linee("new", false, '', 'Altro numero').toOption());
            $TOPUP
                .numberSelect
                .selectpicker('refresh');

            return $TOPUP;
        },
        populateLinesFromHomePage: function() {
            var $TOPUP = this;
            $TOPUP
                .newNumberInput
                .val($TOPUP.configs.homepageBlockInput);
            $TOPUP
                .newNumberConfirm
                .val($TOPUP.configs.homepageBlockConfirm);
            return $TOPUP;
        },
        /**
         * POPOLA TAGLI
         */
        populateTagli: function(tagli) {
            var $TOPUP = this;
            if (tagli != null) {
                r$.each(tagli, function(indexTaglio, taglio) {
                    $TOPUP
                        .addTaglio(new Taglio(taglio.id, taglio.importo, taglio.bonusDaVisualizzare, taglio.type, null, taglio.testoBonus, taglio.dft));
                });
            }
            return $TOPUP;
        },
        addTaglio: function(taglio) {
            var $TOPUP = this;
            var tipoTaglio = $TOPUP.configs.tagli[taglio.mdp];
            if ($TOPUP.configs.tagli[taglio.mdp] == null) {
                $TOPUP.configs.tagli[taglio.mdp] = [];
            }
            $TOPUP
                .configs
                .tagli[taglio.mdp]
                .push(taglio);
            return $TOPUP;
        },
        /**
         * HANDLE CAMBIO TAGLI
         */
        handleChangeTagli: function() {
            var $TOPUP = this;
            var dataTaglio = $TOPUP.topUpAmountSelect.children("option:selected").prop("data-taglio");
            $TOPUP
                .setCookie("taglioDft", dataTaglio);
            return $TOPUP;
        },
        /**
         * POPOLA PAGAMENTI
         */
        populateCreditCards: function(cardListData) {
            var $TOPUP = this;

            for (var i = 0; i < cardListData.length; i++) {
                $TOPUP
                    .addCard(cardListData[i], i == cardListData.length - 1);
            }

            r$("#creditCard-logged input")
                .prop('checked', true);

            return $TOPUP;
        },
        addCard: function(card, isDefault) {
            var $TOPUP = this;
            var row = '';

            switch (isDefault) {
                case true:
                    row = '<div class="item-box credit_card_main_radio ak-item-credit-card-logged" id="creditCard-logged" >' +
                        '<div class="cont__item_cc">' +
                        '<div class="base__radio radio radio-inline">' +
                        '<input type="radio" id="option_cc' + card.alias + '" value="' + card.alias + '"  name="mdp" data-type="aliascc" class="savedCard" >' +
                        '<label class="label_for_creditCard" for="option_cc' + card.alias + '" >' +
                        '<div class="detail-cc">' +
                        '<div class="pull-left">' +
                        '<span class="card-image"><i class="base__icon icon_' + card.tipo.toLowerCase() + '"></i></span>' +
                        '<span class="card-number-crypted"> • • • • </span>' +
                        '<span class="card-number-clear paypal-email">' + card.tail + '</span>' +
                        '</div>' +
                        '<div class="pull-left expiration">' +
                        '<span class="expiration-label">Scad.</span>' +
                        '<span class="expiration-date">' + card.month + '/' + card.year + '</span>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '</div>' +
                        '</label>' +
                        '<a class="btn top_up_remove_btn btn_removeModal" href="javascript:void(0)" data-alias="' + card.alias + '">RIMUOVI</a>' +
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
                        '<input type="radio" id="option_cc' + card.alias + '" value="' + card.alias + '" data-type="aliascc" name="mdp" class="savedCard">' +
                        '<label class="label_for_creditCard" for="option_cc' + card.alias + '" >' +
                        '<div class="detail-cc">' +
                        '<div class="pull-left">' +
                        '<span class="card-image"><i class="base__icon icon_' + card.tipo.toLowerCase() + '"></i></span>' +
                        '<span class="card-number-crypted"> • • • • </span>' +
                        '<span class="card-number-clear paypal-email">' + card.tail + '</span>' +
                        '</div>' +
                        '<div class="pull-left expiration">' +
                        '<span class="expiration-label">Scad.</span>' +
                        '<span class="expiration-date">' + card.month + '/' + card.year + '</span>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '</div>' +
                        '</label>' +
                        '<a class="btn top_up_remove_btn btn_removeModal" href="javascript:void(0)" data-alias="' + card.alias + '">RIMUOVI</a>' +
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

            if (isDefault) {
                r$(row).insertBefore("#refill_block .showMore");
            } else {
                r$("#refill_block .showMore_content").prepend(row);
            }
            return $TOPUP;
        },
        loadNewCreditCardYear: function() {
            var $TOPUP = this;
            $TOPUP
                .newCreditCardExpDateYear
                .find('option')
                .remove();
            var thisYear = new Date().getFullYear();
            for (var i = 0; i <= 11; i++) {
                var year = thisYear + i;
                r$('<option>', {
                        value: year,
                        text: year
                    })
                    .appendTo($TOPUP.newCreditCardExpDateYear);
            }
            $TOPUP
                .newCreditCardExpDateYear
                .selectpicker('refresh');
            return $TOPUP;
        },
        loadNewCreditCardMonth: function() {
            var $TOPUP = this;
            $TOPUP
                .newCreditCardExpDateMonth
                .find('option')
                .remove();
            for (var i = 0; i < 12; i++) {
                var month = i + 1;
                r$('<option>', {
                        value: (month >= 10 ? month : "0" + month),
                        text: month
                    })
                    .appendTo($TOPUP.newCreditCardExpDateMonth);
            }
            $TOPUP
                .newCreditCardExpDateMonth
                .selectpicker('refresh');
            return $TOPUP;
        },
        populateAccounts: function(customerData) {
            var $TOPUP = this;
            if (customerData.cdf != null && customerData.cdf.length > 0) {

                r$.each(customerData.cdf, function(accountIndex, account) {
                    $TOPUP
                        .addCdf(account, accountIndex);
                });
                $TOPUP
                    .showMoreContent
                    .find('#action_c3')
                    .show();
            }
            return $TOPUP;
        },
        addCdf: function(account, accountIndex) {
            var $TOPUP = this;
            var label = "";
            if (account.mode.match("ADDEBITO SU C/C BANCARIO|ADDEBITO SU C/C POSTALE")) {
                label = "&#160;con addebito su conto corrente n&#176; " + account.CCNumebr;
            } else if (account.mode == 'CARTA DI CREDITO') {
                label = "&#160;con addebito su carta di credito";
            } else if (account.mode == 'BOLLETTINO POSTALE') {
                label = "&#160;con addebito su bollettino postale";
            } else {
                label = account.mode;
            }
            var row =
                '<div class="base__radio base__radio--small radio radio-inline">' +
                '<input type="radio" id="option_dct' + account.code + '"value="' + account.code + '" name="cdf" ' + (accountIndex == 0 ? 'checked' : '') + '>' +
                '<label for="option_dct' + account.code + '">' +
                '<span class="contract__popup" data-contract="' + account.CCNumebr + '" data-line="' + account.code + '" data-offer="' + account.mode + '" name="mdp">Conto telefonico</span>' +
                '<span>' + label + '</span>' +
                '</label>' +
                '</div>';
            $TOPUP
                .showMoreContent
                .find("#action_c4")
                .append(row);
            return $TOPUP;
        },
        /**
         * CONTROLLI NUMERI TELEFONICI
         */
        handleSelectNumberChange: function() {
            var $TOPUP = this;
            var selectedNumberValue = $TOPUP.numberSelect.find('option:selected').val();
            switch (selectedNumberValue) {
                case 'new':
                    $TOPUP.configs.topUpState.number = false;
                    $TOPUP
                        .showNewNumberForm()
                        .checkNextStep();

                    break;
                default:
                    $TOPUP.configs.topUpState.number = false;
                    $TOPUP
                        .hideNewNumberForm()
                        .checkNextStep();

            }
            return $TOPUP;
        },
        handleNewNumberInput: function() {
            var $TOPUP = this;
            var newNumberInputVal = $TOPUP.newNumberInput.val();

            if (newNumberInputVal != "") {
                var regex = /^[03][0-9]{8,11}$/g;

                var regexTestResult = regex.test(newNumberInputVal);
                var numberWindRequest = $TOPUP.numberWindRequest(newNumberInputVal);

                numberWindRequest
                    .done(function(res) {
                        if ($TOPUP.handleIsNumberWindResponse(res, regexTestResult)) {
                            $TOPUP.configs.topUpState.newNumber.input = true;
                        } else {
                            $TOPUP.configs.topUpState.newNumber.input = false;
                        }
                        if (!$TOPUP.newNumberConfirm.is(':focus')) {
                            $TOPUP
                                .handleNewNumberConfirm();
                        }

                    })
                    .fail(function(err) {
                        $TOPUP.configs.topUpState.newNumber.input = false;
                        console.warn('Non può essere verificato se il numero è Wind', err);
                    });
            } else {
                $TOPUP.configs.topUpState.newNumber.input = false;
            }
            return $TOPUP;
        },
        handleIsNumberWindResponse: function(res, regexTestResult) {
            var $TOPUP = this;
            if (regexTestResult) {
                if (res.esito == "KO") {
                    $TOPUP
                        .addError($TOPUP.newNumberInput, 'Il numero non è corretto');
                    return false;

                } else {
                    $TOPUP
                        .removeError($TOPUP.newNumberInput, true);
                    return true;
                }
            } else {
                $TOPUP
                    .addError($TOPUP.newNumberInput, 'Il numero non è corretto');
                return false;
            }
        },
        handleNewNumberConfirm: function() {
            var $TOPUP = this;

            if ($TOPUP.newNumberConfirm.val() != "") {
                if ($TOPUP.newNumberInput.val() == $TOPUP.newNumberConfirm.val()) {
                    $TOPUP.configs.topUpState.newNumber.confirm = true;
                } else {
                    $TOPUP.configs.topUpState.newNumber.confirm = false;
                    $TOPUP
                        .addError($TOPUP.newNumberConfirm, 'Il numero non è corretto');
                }
            } else {
                $TOPUP.configs.topUpState.newNumber.confirm = false;
                $TOPUP
                    .disableTopUpSubmit();
            }
            return $TOPUP;
        },
        /**
         * CONTROLLI TAGLIO
         */
        filterTagliByMdp: function() {
            var $TOPUP = this;
            var mdp = $TOPUP.paymentMethods.filter(':checked').val();
            if (mdp == null) {
                mdp = "CCX";
            }
            var tagli = $TOPUP.configs.tagli[mdp];
            if (tagli != null) {
                var elTaglio = r$("#select_taglio");
                var importoSelezionato = $TOPUP.topUpAmountSelect.children("option:selected").prop("data-taglio");
                $TOPUP
                    .topUpAmountSelect
                    .find('option')
                    .remove();

                var primoTaglio = tagli[0];
                r$.each(tagli, function(indexTaglio, taglio) {
                    $TOPUP
                        .topUpAmountSelect
                        .append(taglio.toOption());
                    if (taglio.importo == importoSelezionato) {
                        primoTaglio = taglio;
                    }
                });
                if (primoTaglio != null) {
                    $TOPUP
                        .topUpAmountSelect
                        .selectpicker('val', primoTaglio.id);
                }
                if ($TOPUP.getCookie("taglioDft")) {
                    $TOPUP
                        .topUpAmountSelect
                        .children()
                        .each(function() {
                            if (r$(this).prop("data-taglio") == $TOPUP.getCookie("taglioDft")) {
                                $TOPUP.configs.default = r$(this).val();
                            }
                        });
                }
                if ($TOPUP.configs.homepageBlockTaglio) {
                    $TOPUP
                        .topUpAmountSelect
                        .selectpicker('val', $TOPUP.configs.homepageBlockTaglio);
                } else if ($TOPUP.configs.default) {
                    $TOPUP
                        .topUpAmountSelect
                        .selectpicker('val', $TOPUP.configs.default);
                } else {
                    $TOPUP
                        .topUpAmountSelect
                        .selectpicker('refresh');
                }
                $TOPUP
                    .topUpAmountSelect
                    .selectpicker('refresh');
            }
            return $TOPUP;
        },
        /**
         * CONTROLLI CARTA
         */
        handleNewCreditCardNumberKey: function(event) {
            var eventKeyCode = event.keyCode;
            var shiftKey = event.shiftKey;
            var ctrlKey = event.ctrlKey;
            var metaKey = event.metaKey;
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(eventKeyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (eventKeyCode === 65 && (ctrlKey === true || metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (eventKeyCode >= 35 && eventKeyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((shiftKey || (eventKeyCode < 48 || eventKeyCode > 57)) && (eventKeyCode < 96 || eventKeyCode > 105)) {
                event.preventDefault();
            }
        },
        handleCreditCardIcons: function() {
            var $TOPUP = this;
            var creditCardInput = $TOPUP.newCreditCardNumber;
            var creditCardvalue = creditCardInput.val();
            var cvvInput = $TOPUP.newCreditCardCvv;

            var classToAdd = $TOPUP.deduceCardTypeByNumber(creditCardvalue) + "_cc";

            if (classToAdd !== undefined) {
                $.each($TOPUP.configs.iconNames, function(index, iconName) {
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
                        cvvInput
                            .prop('maxlength', 4)
                            .addClass('cvv_amex')
                            .removeClass('cvv_carta');
                    } else if (classToAdd == "null_cc") {
                        cvvInput
                            .prop('maxlength', 3)
                            .removeClass('cvv_amex')
                            .removeClass('cvv_carta');
                    } else {
                        cvvInput
                            .prop('maxlength', 3)
                            .removeClass('cvv_amex')
                            .addClass('cvv_carta');
                    }
                }
            } else {
                $.each($TOPUP.configs.iconNames, function(index, iconName) {
                    var iconClassName = iconName + '_cc';
                    creditCardInput
                        .removeClass(iconClassName);

                });
                cvvInput
                    .removeClass('cvv_amex cvv_carta');
            }
            return $TOPUP;
        },
        checkCard: function() {
            var $TOPUP = this;
            var creditCardValue = $TOPUP.newCreditCardNumber.val();
            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0,
                nDigit = 0,
                bEven = false;
            creditCardValue = creditCardValue.replace(/\D/g, "");
            for (var n = creditCardValue.length - 1; n >= 0; n--) {
                var cDigit = creditCardValue.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9)
                        nDigit -= 9;
                }
                nCheck += nDigit;
                bEven = !bEven;
            }
            return (nCheck % 10) == 0;
        },
        checkCreditCard: function() {
            var $TOPUP = this;
            if (($TOPUP.newCreditCardNumber.val().length > 13) &&
                $TOPUP.checkCard() &&
                $TOPUP.checkDataScadenza() &&
                ($TOPUP.newCreditCardCvv.val().length >= 3)) {

                $TOPUP.configs.topUpState.payment = true;
            } else {
                $TOPUP.configs.topUpState.payment = false;
            }
            return $TOPUP;
        },
        deduceCardTypeByNumber: function() {
            var $TOPUP = this;
            var number = $TOPUP.newCreditCardNumber.val();
            for (var i = 0; i < $TOPUP.configs.creditCardTypes.length; i++) {
                var regEx = $TOPUP.configs.creditCardTypes[i].reg;
                for (var j = 0; j < regEx.length; j++) {
                    if (number.match(regEx[j]))
                        return $TOPUP.configs.creditCardTypes[i].type;
                }
            }
            return null;
        },
        handleNewCreditCardNumber: function() {
            var $TOPUP = this;
            var newCreditCardNumber = $TOPUP.newCreditCardNumber.val();
            if (newCreditCardNumber !== "") {
                var checkCardResult = $TOPUP.checkCard(newCreditCardNumber);
                if (!checkCardResult) {
                    $TOPUP.configs.topUpState.newCard.number = false;
                    $TOPUP
                        .addError($TOPUP.newCreditCardNumber, 'Numero di carta non valido');
                } else {
                    $TOPUP.configs.topUpState.newCard.number = true;
                    $TOPUP
                        .checkNextStep();
                }
            }
            return $TOPUP;
        },
        isValidSecureCode: function() {
            var $TOPUP = this;
            var regex = /^[0-9]{3,4}$/;

            return regex.test($TOPUP.newCreditCardCvv.val()) ? true : false;
        },
        handleNewCreditCardCvv: function() {
            var $TOPUP = this;
            var cvvValue = $TOPUP.newCreditCardCvv.val();
            if (cvvValue != "") {
                var isValidCvv = $TOPUP.isValidCvv();
                if (isValidCvv) {
                    $TOPUP.configs.topUpState.newCard.cvv = true;
                    $TOPUP
                        .checkNextStep();
                } else {
                    $TOPUP.configs.topUpState.newCard.cvv = false;
                    $TOPUP
                        .addError($TOPUP.newCreditCardCvv, "Il codice non è corretto!");

                }
            }
            return $TOPUP;
        },
        isValidCvv: function() {
            var $TOPUP = this;
            var cvvNumerInputVal = $TOPUP.newCreditCardCvv.val();
            var ccNumberInputVal = $TOPUP.newCreditCardNumber.val();
            ccNumberInputVal = ccNumberInputVal.replace(/\s+/g, '');
            // "#formRecharge [name=codsicurezza_carta]"
            var cvvLength = cvvNumerInputVal.length;
            var result = true;
            if (cvvNumerInputVal.match("^[0-9]+$") == null) {
                result = false;
            } else {
                var tipo = $TOPUP.deduceCardTypeByNumber(ccNumberInputVal);
                if ((tipo == "americane" && cvvLength != 4) ||
                    (tipo != "americane" && cvvLength != 3)) {
                    result = false;
                } else {
                    result = true;
                }
            }
            return result;
        },
        checkDataScadenza: function() {
            var $TOPUP = this;
            var dToday = new Date();

            var today = "" + dToday.getFullYear();

            if (dToday.getMonth() + 1 < 10) {
                today += "0";
            }
            today += dToday.getMonth() + 1;

            var monthInputFieldVal = $TOPUP.newCreditCardExpDateMonth.val();
            var yearInputFieldVal = $TOPUP.newCreditCardExpDateYear.val();

            if (yearInputFieldVal == "" || yearInputFieldVal == "Anno" || monthInputFieldVal == "" || monthInputFieldVal == "Mese") {
                $TOPUP.configs.topUpState.newCard.date = false;
                $TOPUP
                    .removeError($TOPUP.newCreditCardExpDateMonth);
                $TOPUP
                    .removeError($TOPUP.newCreditCardExpDateYear);
            }
            var scad = yearInputFieldVal + monthInputFieldVal;

            if ("" + parseInt(scad) != scad) {
                $TOPUP.configs.topUpState.newCard.date = false;
                $TOPUP
                    .addError($TOPUP.newCreditCardExpDateMonth, "La data non è valida");
            }
            if (parseInt(today) > parseInt(scad)) {
                $TOPUP.configs.topUpState.newCard.date = false;
                $TOPUP
                    .addError($TOPUP.newCreditCardExpDateMonth, "La data deve essere posteriore alla data attuale");
            }
            $TOPUP.configs.topUpState.newCard.date = true;
            $TOPUP
                .removeError($TOPUP.newCreditCardExpDateMonth);
            return $TOPUP;
        },
        /**
         * CONTROLLO CAMBIO PAGAMENTO
         */
        handlePaymentChange: function() {
            var $TOPUP = this;
            var selectedMethod = $TOPUP.topUpForm.find('input[name="mdp"]:checked');
            var selectedMethodBox = selectedMethod.closest('.item-box');
            var otherMethods = $TOPUP.topUpForm.find('.item-box').not(selectedMethodBox);

            if (!selectedMethodBox.hasClass('active')) {
                otherMethods
                    .each(function() {
                        var currentCycledMethod = r$(this);
                        var isActiveMethod = currentCycledMethod.hasClass('active');
                        if (isActiveMethod) {
                            $TOPUP
                                .closeMethodOfPayment(currentCycledMethod);
                        }
                    });

                if (selectedMethodBox.is('#action_c1')) {
                    $TOPUP.configs.topUpState.payment = false;
                    $TOPUP
                        .loadNewCreditCardYear()
                        .loadNewCreditCardMonth();
                } else {
                    $TOPUP.configs.topUpState.payment = true;
                }
                $TOPUP
                    .openMethodOfPayment(selectedMethodBox);
            }

            $TOPUP
                .filterTagliByMdp(selectedMethod.val())
                .checkNextStep();
            return $TOPUP;
        },
        /**
         * CONTROLLO NOTIFICA MAIL
         */
        handleEmailNotification: function() {
            var $TOPUP = this;
            var controlMailResult = $TOPUP.controlMail();
            if (!controlMailResult) {
                $TOPUP.configs.topUpState.email = false;
                $TOPUP
                    .addError($TOPUP.emailNotification, 'Email non valida');
            } else {
                $TOPUP.configs.topUpState.email = true;
            }
            return $TOPUP;
        },
        controlMail: function() {
            var $TOPUP = this;
            var mailNotificationInputValue = $TOPUP.emailNotification.val();
            if (mailNotificationInputValue != '') {
                var isMailValid = ValidateEmail(mailNotificationInputValue);
                if (!isMailValid) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        /**
         * CONTROLLI GLOBALI
         */
        checkNextStep: function() {
            var $TOPUP = this;
            if ($TOPUP.newNumberContainer.hasClass('entered')) {
                if ($TOPUP.configs.topUpState.newNumber.input && $TOPUP.configs.topUpState.newNumber.confirm) {
                    $TOPUP
                        .checkPayments();
                } else {
                    $TOPUP
                        .disableTopUpSubmit();
                }
            } else {
                if ($TOPUP.configs.topUpState.number) {
                    $TOPUP
                        .checkPayments();
                }

            }
            return $TOPUP;
        },
        checkPayments: function() {
            var $TOPUP = this;

            if ($TOPUP.configs.topUpState.payment) {
                if ($TOPUP.configs.topUpState.email) {
                    $TOPUP
                        .enableTopUpSubmit();
                } else {
                    $TOPUP
                        .disableTopUpSubmit();
                }
            } else if ($TOPUP.configs.topUpState.newCard.number && $TOPUP.configs.topUpState.newCard.date && $TOPUP.configs.topUpState.newCard.cvv) {
                if ($TOPUP.configs.topUpState.email) {
                    $TOPUP
                        .enableTopUpSubmit();
                } else {
                    $TOPUP
                        .disableTopUpSubmit();
                }
            } else {
                $TOPUP
                    .disableTopUpSubmit();
            }

            return $TOPUP;
        },
        /**
         * CANCELLAMENTO CARTA
         */
        removeCreditCard: function(removeButton) {
            var $TOPUP = this;
            var clickedButton = removeButton;
            var cardToDelete = removeButton.closest('.item-box');
            var radioToDisable = removeButton.siblings('input[type="radio"]');
            var ccLastFourNumbers = removeButton.siblings('.label_for_creditCard').find('.card-number-clear').html();
            var alias = removeButton.data().alias;

            $TOPUP
                .callPopUp({
                    title: 'Stai per eliminare la carta che finisce per ' + ccLastFourNumbers,
                    button1: true,
                    button2: true,
                    labelBtn1: 'rimuovi',
                    labelBtn2: 'annulla',
                    function1: function() {
                        $TOPUP.removeCard(cardToDelete, radioToDisable, alias);
                    }
                });

            return $TOPUP;
        },
        removeCard: function(card, radio, alias) {
            var $TOPUP = this;
            $TOPUP
                .closePopup()
                .deleteCard(alias, card, radio);

            return $TOPUP;
        },
        deleteCard: function(alias, card, radio) {
            var $TOPUP = this;
            var deleteCardPromise = $TOPUP.cardDeleteRequest(alias);

            deleteCardPromise
                .then(function(data) {
                    $TOPUP
                        .handleDeleteResponse(data, card, radio);
                }, function(err) {
                    console.warn("Si è verificato un errore", err);
                });
            return $TOPUP;
        },
        handleDeleteResponse: function(data, card, radio) {
            var $TOPUP = this;

            if (data.OK) {
                card
                    .addClass('deleted')
                    .slideUp('fast', function() {
                        radio
                            .removeAttr('checked');
                        if ($TOPUP.showMoreContent.is(':hidden')) {
                            $TOPUP
                                .showOtherMethodsOfPayment();
                        }
                        $TOPUP
                            .showNewCreditCardForm()
                            .handlePaymentChange();
                    });

            } else
                $TOPUP
                .callPopUp({
                    title: "Errore",
                    description: "Gentile cliente, si è verificato un errore. Non è stato possibile rimuovere la carta.",
                    button2: true,
                    labelBtn2: 'chiudi',
                    function2: function() {
                        TOPUPTOOL
                            .closeTopUpShoulder(true);
                    }
                });
            console.warn(data.msg);
            return $TOPUP;
        },
        /**
         * INVIO RICHIESTA RICARICA
         */
        submitRicarica: function() {

            var $TOPUP = this;
            var mdp = ($TOPUP.topUpForm.find('input[name="mdp"]:checked').val().length > 8) ? 'CCX' : $TOPUP.topUpForm.find('input[name="mdp"]:checked').val();

            var topUpSubmitData = {
                numero: $TOPUP.numberSelect.val(),
                numero_ricarica: $TOPUP.newNumberConfirm.val(),
                tipoPagamento: mdp,
                select_taglio: $TOPUP.topUpAmountSelect.val(),
                email_utente: $TOPUP.emailNotification.val(),
                ricorda_agreement: r$("#paypal-checkbox").is(':checked') ? 'Y' : 'N',
                ricorda_carta: r$("#salvadati-checkbox").is(':checked') ? 'Y' : 'N',
                numero_carta: $TOPUP.newCreditCardNumber.val(),
                alias: r$("#creditCard-logged").find('input[name=mdp]:checked').val(),
                cdf: $TOPUP.showMoreContent.find("input[name=cdf]:checked").val(),
                mese_scadenza_carta: $TOPUP.newCreditCardExpDateMonth.val(),
                anno_scadenza_carta: $TOPUP.newCreditCardExpDateYear.val(),
                titolare_carta: 'da inserire', // TODO: FIX ME
                codsicurezza_carata: $TOPUP.newCreditCardCvv.val(),
                URL_OK_RICARICA_NEW: 'https://' + document.location.hostname + document.location.pathname + '?result=true#refill_block',
                URL_CANCEL_RICARICA_NEW: 'https://' + document.location.hostname + document.location.pathname + '?abbandon=true#refill_block'
            };

            var submitTopUpPromise = $TOPUP.topUpSumitRequest(topUpSubmitData);

            submitTopUpPromise
                .done(function(res) {
                    $TOPUP.handleTopUpResolve(res, mdp);
                })
                .fail(function(err) {
                    $TOPUP.handleTopUpFail(err);
                });

            return $TOPUP;
        },
        handleTopUpResolve: function(res, mdp) {
            var $TOPUP = this;

            $TOPUP
                .setCookie("taglioDft", null);

            if (res.esito == "OK") {
                if (res.tipo_nav == 'REDIRECT') {
                    if (mdp != "CTL" && mdp != "SME") {
                        window.location.href = res.url;
                    } else {
                        $TOPUP.showEsitoRicarica(res.id);
                    }

                } else {
                    $TOPUP.showEsitoRicarica(res.id);
                }
            } else {
                console.warn("Errore ricarica", 'RES == KO');
                $TOPUP
                    .callPopUp({
                        title: "Errore di ricarica",
                        description: 'Gentile cliente, si è verificato un errore. Ti preghiamo di riprovare tra qualche minuto.',
                        button1: true,
                        button2: true,
                        labelBtn1: 'Chiudi',
                        labelBtn2: 'Annulla',
                        function2: function() {
                            TOPUPTOOL.closeTopUpShoulder(true);
                        }
                    });
            }
            return $TOPUP;
        },
        handleTopUpFail: function(err) {
            var $TOPUP = this;

            console.warn("Fail Errore ricarica", err);
            $TOPUP
                .topUpSubmitButton
                .prop('submitricarica', '');

            return $TOPUP;
        },
        showEsitoRicarica: function(id) {
            var $TOPUP = this;

            var resultRequest = $TOPUP.topUpResultRequest(id);

            resultRequest
                .then(function(res) {
                    $TOPUP.handleResultResponse(res);
                }, function(err) {
                    $TOPUP.handleResponseFail(err);
                });
            return $TOPUP;
        },
        handleResultResponse: function(res) {
            var $TOPUP = this;

            try {
                $TOPUP
                    .parseDataLayer(res);
            } catch (e) {
                console.warn(e);
            }

            if (res.error_code == "-99") {
                $TOPUP
                    .callPopUp($TOPUP.configs.connectionErrorPopup);
            } else {

                $TOPUP
                    .loadEsito(res);
            }
            return $TOPUP;
        },
        handleResponseFail: function(e) {
            var $TOPUP = this;

            console.warn("Fail Errore ricarica", e);
            $TOPUP
                .callPopUp($TOPUP.configs.connectionErrorPopup);
            return $TOPUP;
        },
        loadEsito: function(res) {
            var $TOPUP = this;

            $TOPUP
                .topUpForm
                .hide();

            var topUpResultHtmlString = $TOPUP.parseTopUpResponse(res);

            if (res.success == false) {
                $TOPUP
                    .resultMessage
                    .hide();
            }

            $TOPUP
                .resultContainer
                /*.html('')*/
                .prepend(topUpResultHtmlString);

            $TOPUP
                .resultWrapper
                .show('fast', function() {
                    $TOPUP.updateScrollBar();
                });
            return $TOPUP;
        },
        parseTopUpResponse: function(res) {
            var $TOPUP = this;
            var topUpResultHtmlString =
                '<div class="box">' +
                (res.success ? '<i class="left rotatey-animate base__icon icon_confirm--color"></i>' : '') +
                '<h3 id="TITLE" class="colored_text--orange">' + res.TITLE + (!res.success ? '<br><small id="SUB_TITLE">' + res.SUB_TITLE + '</small>' : '') + '</h3>' +
                '<div class="clear"></div>' +
                '<hr>' +
                '<h3 class="text strong">Riepilogo</h3>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Codice ricarica: </span>' +
                '<span class="right" id="ID">' + res.ID + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Numero indicato: </span>' +
                '<span class="right" id="CLI">' + res.CLI + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Data operazione: </span>' +
                '<span class="right" id="DATA">' + res.DATA + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Modalità di pagamento: </span>' +
                '<span class="right" id="MODALITA">' + res.MODALITA + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Taglio di ricarica richiesto: </span>' +
                '<span class="right" id="TAGLIO">' + res.TAGLIO + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                '<span class="left"> Importo pagato: </span>' +
                '<span class="right" id="IMPORTO">' + res.IMPORTO + '</span>' +
                '</div>' +
                '<div class="item-box">' +
                (res.EMAIL != "" ? '<span class="left"> Indirizzo e-mail: </span> <span class="right" id="EMAIL">' + res.EMAIL + '</span>' : '') +
                '</div>'
                /* +
                                '<div class="item-box">' +
                                '<span class="left">Effettua una nuova ricarica</span>' +
                                '<button class="btn base__bt base__bt--or base__bt--sm right waves-effect waves-button waves-float waves-light">Ricarica</button>' +
                                '</div>'*/
            ;
            return topUpResultHtmlString;
        },
        /**
         * INVIO RICHIESTA NUOVA RICARICA
         */
        newRecharge: function() {
            var $TOPUP = this;
            $TOPUP
                .resultContainer
                .val(1);
            $TOPUP
                .closeTopUpShoulder(true);

            window.location.href = window.location.origin + window.location.pathname + "?val=" + Math.floor(Date.now() / 1000) + "#refill_block";
            return $TOPUP;
        },
    };



    function Taglio(id, importo, bonus, mdp, p3x2, testoBonus, dft) {
        this.id = id;
        this.importo = importo;
        this.bonus = bonus;
        this.mdp = mdp;
        this.p3x2 = p3x2;
        this.testoBonus = testoBonus;
        this.dft = dft;
        this.toOption = function() {
            var dataContent = this.importo + '<span class=\'euro\'>€</span>' + (this.bonus == "0" ? "" : '<span class=\'textl\'> (+' + Number(this.bonus).toFixed(2) + ' in omaggio)</span>');
            var topUpImportRow =
                '<option ' +
                'value="' + this.id + '" ' +
                (this.dft == 'Y' ? 'selected ' : '') +
                'data-p3x2="' + this.p3x2 + '" ' +
                'data-content="' + dataContent + '">' +
                this.importo + '€' + (this.bonus != "0" ? ' (+' + Number(this.bonus).toFixed(2) + ' in omaggio)' : '') +
                '</option>';

            return topUpImportRow;
        };
    }

    function Linee(linea, sme, billing, label) {
        this.linea = linea;
        this.sme = sme;
        this.billing = billing;
        this.label = label;
        this.toOption = function() {
            var billingRow =
                '<option ' +
                'value="' + this.linea + '" ' +
                (this.sme ? 'smecdf="' + this.billing + '" ' : '') + '>' +
                this.label +
                '</option>';
            return billingRow;
        };
    }

})(jQuery);
