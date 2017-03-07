

        var first_sap = '';

        if (first_sap == '' || first_sap == '0') {
            first_sap = '000000000000008451';
        }

        var last_sap = first_sap;
        var bxSliders = [];

        console.log(first_sap);

        r$(document).ready(function () {
            //initProductSap();

            r$(".items a").each(function (index, value) {

                var sapOfThis = r$(value).attr("data-sap");

                if (sapOfThis.indexOf(first_sap) >= 0) {
                    r$(value).trigger('click');
                }
            });

        });

        function initProductSap() {

            //il first sap mi viene dato dall'utente (db)
            //ma può essere cambiato da un parametro (tbd)
            var color = r$(".colori a")[0];
            r$(color).trigger('click');

            var firstActive = null;
            r$(".memorie a").each(function (index, value) {
                if (!r$(value).attr('inactive')) {
                    if (firstActive == null)
                        firstActive = value;
                }
            });

            r$(firstActive).trigger('click');

        }

        function changeImageset(idsap) {

            console.log("changeImageset");
        }

        function setSap(context, obj) {

            if (!r$(obj).hasClass('inactive')) {

                var invertContext = context;

                if (context == "memorie")
                    invertContext = "colori";
                else
                    invertContext = "memorie"


                //aggiunstamento per jquery
                context = "." + context;
                invertContext = "." + invertContext;

                //ho attivato o un colore o una memoria quindi devo lavorare sul context
                //r$(context + " .data-sap").css('color', '');
                r$(context + " .data-sap").css('border-color', '');
                r$(context + " .data-sap").removeClass('active');

                var sapOfThis = r$(obj).attr('data-sap');
                sapOfThis = sapOfThis.split(' ');

                //setto le immagini
                if (context == ".colori") {
                    changeImageset(sapOfThis[0]);
                }

                r$(obj).css('border-color', 'red');
                r$(obj).addClass('active');

                //se ho cliccato su contesto lavoro sull'altro perle lavorazioni
                r$(invertContext + " .data-sap").each(function (index, value) {

                    var sapPresent = false;
                    var sapsOfOther = r$(value).attr('data-sap');
                    //sapsOfOther = sapsOfOther.split(' ');

                    //verifica i sap
                    r$(sapOfThis).each(function (index, sap) {

                        if (sap != "") {
                            if (sapsOfOther.indexOf(sap) >= 0) {
                                sapPresent = true;
                            }
                        }

                    });

                    if (sapPresent) {
                        r$(value).css('color', '');
                        r$(value).removeClass('inactive');

                    } else {
                        r$(value).css('color', 'gray');
                        r$(value).addClass('inactive');
                    }


                });

                checkAcquire();
            }
        }

        function checkAcquire() {

            r$(".action-acquista").unbind();

            var countMemorie = r$(".memorie a.active").length;
            var countColori = r$(".colori a.active").length;

            if (countMemorie >= 1 && countColori >= 1) {
                activateSapProduct();
                r$(".action-acquista").click(addProduct);
            }
            else {
                r$(".action-acquista").click(function () {

                    if (countColori == 0)
                        alert("Seleziona un colore associato al prodotto");
                    else {
                        if (countMemorie == 0)
                            alert("Seleziona una memoria associata al prodotto");
                    }

                });
            }
        }

        function activateSapProduct() {
            var sapMemoria = r$(".memorie a.active").attr('data-sap');
            var sapColori = r$(".colori a.active").attr('data-sap');

            sapMemoria = sapMemoria.split(' ');
            sapColori = sapColori.split(' ');

            r$(sapMemoria).each(function (index, sapmem) {
                r$(sapColori).each(function (index, sapcol) {
                    if (sapmem != "" && sapcol != "")
                        if (sapmem == sapcol) {
                            last_sap = sapmem;
                            r$(".action-acquista").attr("data-sap", last_sap);
                            changePrice();
                        }
                });

            });
        }

        function changePrice() {
            r$(".data-sap-price").hide();
            r$(".data-sap-price[data-sap='" + last_sap + "']").show();
        }

    