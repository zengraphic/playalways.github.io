r$(document).ready(function() {

    r$(".action-acquista").click(addProduct);

    injectCaratteristiche();

});

/**
 * funzione per la gestione delle caratteristiche in accordion
 * per poter funzionare deve essere inserito in pagina il componente html libero
 * placeholder così costruito
 *  <div id="ak-inject-caratteristiche"></div>
 *
 */
function injectCaratteristiche() {

    var bloccoDescrizione = r$(".blocco_accordion_descrizione").remove();
    var injectAccodion = r$("#ak-inject-caratteristiche");
    if (bloccoDescrizione != null && bloccoDescrizione != undefined) {
        if (injectAccodion != null && injectAccodion != undefined) {
            r$(injectAccodion).append(bloccoDescrizione);
            r$(".blocco_accordion_descrizione .accordion_description_block__title").remove();
            r$(".blocco_accordion_descrizione").show();
        }
    }

}

function addProduct() {

    var cookies = readCookies();
    var sap = r$(this).attr('data-sap');

    if (sap == undefined || sap == "") {
        console.log("sap non presente");
        return;
    }

    var sapArray = [sap];

    Ember.instrument('ecommerce.add_to_cart', {
        productIds: sapArray,
        cookies: cookies
    });

    //TODO: integrare in un posto unico le definizioni di ecommerce
    openShoulder();


}

function reorderDiv(elementClass, orderAttribute, OrderValue) {

    r$('device-orderable').sort(function(a, b) {

        var contentA = parseInt(r$(a).attr('device-orderable'));
        var contentB = parseInt(r$(b).attr('device-orderable'));
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    })

}


/**
 * sezione codice blocco vetrina device
 */
r$(document).ready(function() {


    //ci sono più componente in pagina quindi è necessario usare .find() e .parent() quando
    //gli eventi sono determinati da elementi comuni dello stesso componente (usato più volte)

    //questo inizializza i prodotti all'interno di un componente
    initProductSapDevice();

    //questo inizializza i filtri del componente
    initDeviceFilters();

    //questo inizializza i tabs del componente e i comportamenti di visualizzazione
    initTabsAdvancedEvents();

});

/**
 * qui potrebbe sorgere un problema
 * todo: bisogna sistemare il fatto che non si identifica il componente specifico ma solo la classe del comportamento a tab
 */
function initTabsAdvancedEvents() {

    var emettitoreEvento = r$('.filter-showcase');

    r$(emettitoreEvento).on("combo-change", function() {
        loadBrandOnSelect(this);
    });

    r$('.filter-showcase').each(function(index, value) {

        loadBrandOnSelect(value);

    });

}

function loadBrandOnSelect(object) {


    var brandsInActiveTabs = r$(object).find(".brand");
    var filterOption = r$(object).find("select.ak-tab-brand");
    var optionTemplate = "<option></option>";
    var brandsArray = [];

    r$(brandsInActiveTabs).each(function(index, value) {

        var brand = r$(value).val();
        if (brandsArray.indexOf(brand) < 0)
            brandsArray.push(brand);
    });

    brandsArray.sort();
    r$(filterOption).html("");

    var optionObj = r$(optionTemplate).clone();

    r$(optionObj).val("tutte");
    r$(optionObj).html("Marca");

    r$(filterOption).append(optionObj).trigger('change');

    r$(brandsArray).each(function(index, brand) {

        var optionObj = r$(optionTemplate).clone();

        r$(optionObj).val(brand);
        r$(optionObj).html(brand);

        r$(filterOption).append(optionObj);

    });

    r$(filterOption).selectpicker('refresh');


}

function initProductSapDevice() {

    r$(".ak-device").each(function(index, value) {

        var colorSelect = r$(value).find('.colori');
        var memorieSelect = r$(value).find('.memorie');
        setSapDevice('colori', colorSelect);


        r$(value).find('.colori option').each(function(index, value) {
            if (!r$(value).prop('disabled')) {
                setSapDevice('memorie', memorieSelect);
                return;
            }
        });


    });

}


function initDeviceFilters() {

    r$(".ak-tab-brand").each(function(index, obj) {
        changeFilterBrand(obj)
    });

}

function changeFilterBrand(obj) {

    /*
     var mainWrapper = r$(obj).parents(".ak-main-wrapper");
     var devices = r$(mainWrapper).find(".ak-device");

     var brandList = [];
     r$(devices).each(function (index, value) {

     var brand = r$(value).find('.ak-device-brand').val();

     if (brandList.indexOf(brand) == -1) {
     brandList.push(brand);
     }
     });

     r$(obj).empty();

     //valore di default della marca
     var brandOption = r$("<option value='tutte'>Marca</option>");
     r$(brandOption).prop('selected', true);
     r$(obj).append(brandOption);

     r$(brandList).each(function (index, value) {

     var brandOption = r$("<option value=''></option>");
     r$(brandOption).val(value);
     r$(brandOption).html(value);
     r$(obj).append(brandOption);

     });

     r$(obj).selectpicker('refresh');
     */
}


function setSapDevice(context, obj) {

    //se clicco su una disabilitata non posso prosegurie
    var disabled = r$(obj).prop('disabled');

    //quindi deve essere abilitata
    if (!disabled && obj != null && obj != undefined) {

        //a differenza del codice per la vetrina
        //sono costretto ad istanziare un oggetto e lavorare in find su qello, altrimenti
        //recupero più oggetti
        var device = r$(obj).parents(".ak-device");

        //recupreo queste due proprietà del device che mi permettarenno di proseguire dopo
        var withMemorie = r$(device).find(".withMemorie").val();
        var withTaglie = r$(device).find(".withTaglie").val();

        //il contesto opposto (memorie taglie, non è detto che esista)
        var invertContext = false;

        if (context == "memorie" || context == "taglie")
            invertContext = "colori";
        else {

            if (withMemorie)
                invertContext = "memorie";
            else if (withTaglie)
                invertContext = "taglie";
            else {
                invertContext = false;
            }
        }

        //se esiste un invert context
        //allora ha senso fare dei ragionamenti di disabilitazione
        //...
        if (invertContext) {

            context = "." + context;
            invertContext = "." + invertContext;

            contextObj = r$(device).find(context);
            invertContextObj = r$(device).find(invertContext);

            //recupero tutti sap dell'elemento che ho cliccato
            var sapOfThis = r$(obj).val();

            if (sapOfThis != undefined && sapOfThis != null)
                sapOfThis = sapOfThis.split(' ');

            //setto le immagini
            if (context == ".colori") {
                //changeImageset(sapOfThis[0]);
            }


            //devo disabilitare tuttle "altre" option della select opposta a quella premuta
            r$(invertContextObj).find("option").prop('disabled', true);
            r$(invertContextObj).find("option").each(function(index, value) {

                var sapsOfOther = r$(value).val();

                //verifica i sap
                r$(sapOfThis).each(function(index, sap) {

                    if (sap != "") {
                        if (sapsOfOther.indexOf(sap) >= 0) {
                            r$(value).prop('disabled', false);
                        }
                    }

                });

            });


        } else {
            //se non ho contesti l'opzione cliccata è sicuramente valida
            r$(obj).prop('disabled', false);
        }

        //reinizializzo le select per un discorso di rendering grafico
        r$(invertContext).find(".selectpicker").selectpicker('refresh');


        activateSap(device);
    }
}


/**
 * funzione che mi serve per mostrare gli elementi reltivi ad uno specifico device/sap
 * @param device arriva da .ak-device ma passo come parametro esterno
 */
function activateSap(device) {

    var sapColori = r$(device).find(".colori option:selected").attr('data-sap');
    sapColori = (sapColori != undefined && sapColori != null) ? sapColori.split(' ') : [];

    var sapPorpertyValues = ['memorie', 'taglie'];

    var found = false;
    if (sapColori.length > 0) {

        r$(sapPorpertyValues).each(function(index, value) {

            var sapProperty = r$(device).find("." + value + " option:selected").attr('data-sap');
            sapProperty = (sapProperty != undefined && sapProperty != null) ? sapProperty.split(' ') : [];

            if (sapProperty.length > 0) {

                r$(sapColori).each(function(index, sapcol) {

                    r$(sapProperty).each(function(index, sapmem) {

                        if (sapmem != "" && sapcol != "")
                            if ((sapmem == sapcol) && !found) {
                                changePrice(device, sapmem);
                                changeUrl(device, sapmem);
                                found = true;
                            }
                    });


                });

            } else {

                if (!found) {
                    changePrice(device, sapColori[0]);
                    changeUrl(device, sapColori[0]);
                    found = true;
                }
            }

        });
    }

}

function changePrice(device, sap) {

    r$(device).find(".data-sap-price").hide();
    r$(device).find(".data-sap-price[data-sap='" + sap + "']").show();

}

function changeUrl(device, sap) {

    var mainWrapper = r$(device).find('.ak-main-wrapper');

}

//FUNZIONI DI ORDINAMNETO

function applyFilter(obj, filterType) {


    var currentComponent = r$(obj).parents(".ak-main-wrapper");
    var contentTarget = r$(currentComponent).find(".ak-content-target:visible");

    var filterPrice = r$(currentComponent).find(".ak-tab-orderby option:selected").val();
    var filterBrand = r$(currentComponent).find(".ak-tab-brand option:selected").val();


    r$(".base__select.memorie").selectpicker("destroy")
    r$(".base__select.memorie").addClass("selectpicker")

    r$(".base__select.colori").selectpicker("destroy")
    r$(".base__select.colori").addClass("selectpicker")

    switch (filterType) {
        case 'sort':

            var sorted = r$(contentTarget).find(".ak-device").sort(function(a, b) {

                var filterOption = filterPrice.split('#');
                var filterField = filterOption[0];
                var filterOrder = filterOption[1];


                switch (filterField) {

                    case "prezzo":

                        if (filterOrder == "asc") {
                            return r$(a).find(".ak-order-price:visible").text() > r$(b).find(".ak-order-price:visible").text();
                        } else {
                            return r$(a).find(".ak-order-price:visible").text() < r$(b).find(".ak-order-price:visible").text();
                        }


                        break;

                    case "marca":

                        if (filterOrder == "asc") {
                            return r$(a).find(".ak-device-brand:visible").val() > r$(b).find(".ak-device-brand:visible").val();
                        } else {
                            return r$(a).find(".ak-device-brand:visible").val() < r$(b).find(".ak-device-brand:visible").val();
                        }

                        break;
                }


            });

            r$(contentTarget).html(sorted);

            break;

        case 'brand':

            if (filterBrand != "tutte" && filterBrand != "") {
                r$(currentComponent).find(".ak-device").hide();
                r$(currentComponent).find(".ak-device-" + filterBrand).show();

            } else {
                r$(currentComponent).find(".ak-device").hide();
                r$(currentComponent).find(".ak-device:nth-child(-n+3)").show();

            }

            break;
    }


    r$(".base__select.memorie").selectpicker("refresh")
    r$(".base__select.colori").selectpicker("refresh")


}
