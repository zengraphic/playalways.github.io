!(function($) {
    linesTable = {
        "labels": [{
            "name": "Linea/Utenza",
            "class": "h-linea"
        }, {
            "name": "Tipo",
            "class": "h-tipo"
        }, {
            "name": "Offerta",
            "class": "h-offerta"
        }, {
            "name": "Contratto",
            "class": "h-contratto"
        }, {
            "name": "Ricarica",
            "class": "h-ricarica"
        }],
        "contracts": [{
            "number": {
                "data": "3807915805",
                "class": "c-linea"
            },
            "type": {
                "data": "Mobile",
                "class": "c-tipo"
            },
            "offer": {
                "data": "Wind1",
                "class": "c-offerta"
            },
            "contractID": {
                "data": "1145812443243",
                "class": "c-contratto"
            },
            "topUpLink": {
                "data": "&nbsp;",
                "class": "c-ricarica"
            },
            "class": "my_traffic__contracts_accordion__row"
        }, {
            "number": {
                "data": "3807915806",
                "class": "c-linea"
            },
            "type": {
                "data": "Mobile",
                "class": "c-tipo"
            },
            "offer": {
                "data": "Wind1",
                "class": "c-offerta"
            },
            "contractID": {
                "data": "1145812443243",
                "class": "c-contratto"
            },
            "topUpLink": {
                "data": "&nbsp;",
                "class": "c-ricarica"
            },
            "class": "my_traffic__contracts_accordion__row"
        }, {
            "number": {
                "data": "3807915807",
                "class": "c-linea"
            },
            "type": {
                "data": "Mobile",
                "class": "c-tipo"
            },
            "offer": {
                "data": "Wind1",
                "class": "c-offerta"
            },
            "contractID": {
                "data": "1145812443243",
                "class": "c-contratto"
            },
            "topUpLink": {
                "data": "&nbsp;",
                "class": "c-ricarica"
            },
            "class": "my_traffic__contracts_accordion__row",
        }],
        "contractsTotals": {
            "3807915805": {
                "voce": {
                    "amount": {
                        "ore": "9",
                        "minuti": "50",
                        "secondi": "10"
                    },
                    "cost": "14,58€"
                },
                "sms": {
                    "amount": {
                        "total": "500"
                    },
                    "cost": "24,98€"
                },
                "internet": {
                    "amount": {
                        "totalGb": "5"
                    },
                    "cost": "4,98€"
                },
                "altri_dati": {
                    "cost": "4,98€"
                }

            },
            "3807915806": {
                "voce": {
                    "amount": {
                        "ore": "9",
                        "minuti": "50",
                        "secondi": "10"
                    },
                    "cost": "14,58€"
                },
                "sms": {
                    "amount": {
                        "total": "500"
                    },
                    "cost": "24,98€"
                },
                "internet": {
                    "amount": {
                        "totalGb": "5"
                    },
                    "cost": "4,98€"
                },
                "altri_dati": {
                    "cost": "4,98€"
                }

            },
            "3807915807": {
                "voce": {
                    "amount": {
                        "ore": "9",
                        "minuti": "50",
                        "secondi": "10"
                    },
                    "cost": "14,58€"
                },
                "sms": {
                    "amount": {
                        "total": "500"
                    },
                    "cost": "24,98€"
                },
                "internet": {
                    "amount": {
                        "totalGb": "5"
                    },
                    "cost": "4,98€"
                },
                "altri_dati": {
                    "cost": "4,98€"
                }

            }
        }

        
    };

    function populateHeadings() {
        var contracts_summary_container = $('.my_traffic__contracts_accordion__container');
        var headingsContainerStr = "<div class='my_traffic__contracts_accordion__col_headings'></div>";

        contracts_summary_container
            .append(headingsContainerStr);

        $.each(linesTable.labels, function(index, labelObj) {
            $('.my_traffic__contracts_accordion__col_headings')
                .append("<label class='col_heading " + labelObj.class + "'>" + labelObj.name + "</label>");
        });

    }

    function populateRows() {
        var contracts_summary_container = $('.my_traffic__contracts_accordion__container');
        $.each(linesTable.contracts, function(index, contractDataObj) {

            var contractRowStr = "<div id='row-" + contractDataObj.number.data + "' class='" + contractDataObj.class + "'></div>";

            contracts_summary_container
                .append(contractRowStr);

            var contractObj = $('#row-' + contractDataObj.number.data);

            var number = contractDataObj.number.data;

            var contractDataStr = "";

            $.each(contractDataObj, function(dataPart, dataContent) {
                switch (dataPart) {
                    case ("number"):
                        contractDataStr += "<label class='row_content " + dataContent.class + "'><a data-contract='" + number + "' href='#" + number + "' class='linea_link'>" + dataContent.data + "</a></label>";
                        break;
                    case ("offer"):
                        contractDataStr += "<label class='row_content " + dataContent.class + "'><a data-contract='" + number + "' href='#" + number + "' class='offerta_link'>" + dataContent.data + "</a></label>";
                        break;
                    case ("topUpLink"):
                        contractDataStr += "<label class='row_content " + dataContent.class + "'><i class='icon_ricarica'>€</i></label>";
                        break;
                    case ("class"):
                        break;
                    default:
                        contractDataStr += "<label class='row_content " + dataContent.class + "'>" + dataContent.data + "</label>";
                        break;
                }
            });
            contractObj
                .append(contractDataStr);
        });
    }

    function populateSummary() {

        populateHeadings();
        populateRows();

    }

    function createIconString(iconName){
    	var iconStr = '<i class="tab_icon fa fa-'+iconName+' fa-2x fa-fw" aria-hidden="true"></i>';
    	return iconStr;
    };

    function createTitleString(titleText){
    	var titleStr = '<span class="title">'+titleText+'</span>';
    	return titleStr;
    };


    function populateTotals() {
        var contracts_details_container = $('.my_traffic__contracts_details');

        $.each(linesTable.contractsTotals, function(contractNumber, contractData) {

        	var contractTabsStr = '<div id="'+contractNumber+'" class="my_traffic__contracts_details__tabs">';
            contracts_details_container.append(contractTabsStr);

            var contractTabsObj = $('#'+contractNumber);
            var contractTabsBorderStr = '<div class="my_traffic__contracts_details__tabs__borders "></div>';

            contractTabsObj
            	.append(contractTabsBorderStr);

            var contractTabsBorderObj = $(contractTabsObj).find('.my_traffic__contracts_details__tabs__borders');
            var contractTabsContainerStr = '<div class="my_traffic__contracts_details__tabs__container "></div>';
            var contractTabsViewAllStr = '<div class="my_traffic__contracts_details__tabs__view_all"></div>';

            contractTabsBorderObj
            	.append(contractTabsContainerStr)
            	.append(contractTabsViewAllStr);

            var contractTabsContainerObj = contractTabsBorderObj.find('.my_traffic__contracts_details__tabs__container');
            var contractTabsViewAllObj = contractTabsBorderObj.find('.my_traffic__contracts_details__tabs__view_all');
            var contractTabsTabColumnStr = '<div class="my_traffic__contracts_details__column_tabs"></div>';
            var contractTabsContentColumnStr = '<div class="my_traffic__contracts_details__column_content"></div>';

            contractTabsContainerObj
            	.append(contractTabsTabColumnStr)
            	.append(contractTabsContentColumnStr);

            var contractTabsTabColumnObj = contractTabsBorderObj.find('.my_traffic__contracts_details__column_tabs');
            var contractTabsContentColumnObj = contractTabsBorderObj.find('.my_traffic__contracts_details__column_content');
            

            $.each(contractData,function(dataType,dataContent){

            	var singleTabStr ='<div class="'+dataType+' my_traffic__contracts_details__single_tab"></div>';

            	contractTabsTabColumnObj
            		.append(singleTabStr);
            	contractTabsContentColumnObj
            		.append(singleTabStr);

            	var cycledTabObj = contractTabsTabColumnObj.find('.'+dataType);
            	var cycledContentObj = contractTabsContentColumnObj.find('.'+dataType);
            	var tabTitleStr = '<div class="tab_title"></div>';
            	var tabTotalStr = '<div class="tab_totals"></div>';
            	var tabTotalDurationStr = '<div class="tab_totals_duration"></div>';
            	var tabTotalImportStr = '<div class="tab_totals_import"></div>';
            	var tabTotalIconStr = '<i class="tab_icon_expand"></i>';
            	var tabTotalContentStr = '<span class="tab_totals_content"></div>';
            	var tabTotalImportLabelStr= '<span class="tab_totals_label">Importo</span>';

            	switch(dataType){
            		case("voce"):
            			var iconStr = createIconString("phone");
            			var titleStr = createTitleString(dataType);

            			cycledTabObj
            				.append(tabTitleStr);

            			var tabTitleObj = cycledTabObj.find('.tab_title');

            			tabTitleObj
            				.append(iconStr)
            				.append(titleStr);

            			cycledContentObj
            				.append(tabTotalStr);

            			var tabTotalObj = cycledContentObj.find('.tab_totals');

            			tabTotalObj
            				.append(tabTotalDurationStr)
            				.append(tabTotalImportStr)
            				.append(tabTotalIconStr);

            			var tabTotalDurationObj = tabTotalObj.find('.tab_totals_duration');            			
            			var tabTotalDurationLabelStr = '<span class="tab_totals_label">Durata totale</span>';

            			tabTotalDurationObj
            				.append(tabTotalDurationLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalDurationContentObj = tabTotalDurationObj.find('.tab_totals_content');

        				$.each(dataContent.amount,function(time,amount){

        					var tabTotalDurationTimeStr = '<span class="number">'+amount+'</span>'+time+' ';
        					tabTotalDurationContentObj
        						.append(tabTotalDurationTimeStr);

        				});

            			var tabTotalImportObj = tabTotalObj.find('.tab_totals_import');

            			tabTotalImportObj
            				.append(tabTotalImportLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalImportContentObj = tabTotalImportObj.find('.tab_totals_content');

            			var tabTotalImportContentStr='<span class="number">'+dataContent.cost+'</span>';

            			tabTotalImportContentObj
            				.append(tabTotalImportContentStr);

            		break;
            		case("sms"):
            			var iconStr = createIconString("envelope-o");
            			var titleStr = createTitleString(dataType);

            			cycledTabObj
            				.append(tabTitleStr);

            			var tabTitleObj = cycledTabObj.find('.tab_title');

            			tabTitleObj
            				.append(iconStr)
            				.append(titleStr);

            			cycledContentObj
            				.append(tabTotalStr);

            			var tabTotalObj = cycledContentObj.find('.tab_totals');

            			tabTotalObj
            				.append(tabTotalDurationStr)
            				.append(tabTotalImportStr)
            				.append(tabTotalIconStr);

            			var tabTotalDurationObj = tabTotalObj.find('.tab_totals_duration');            			
            			var tabTotalDurationLabelStr = '<span class="tab_totals_label">Numero totale</span>';

            			tabTotalDurationObj
            				.append(tabTotalDurationLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalDurationContentObj = tabTotalDurationObj.find('.tab_totals_content');

        				$.each(dataContent.amount,function(sms,amount){

        					var tabTotalDurationTimeStr = '<span class="number">'+amount+'</span>SMS ';
        					tabTotalDurationContentObj
        						.append(tabTotalDurationTimeStr);

        				});

        				var tabTotalImportObj = tabTotalObj.find('.tab_totals_import');

            			tabTotalImportObj
            				.append(tabTotalImportLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalImportContentObj = tabTotalImportObj.find('.tab_totals_content');

            			var tabTotalImportContentStr='<span class="number">'+dataContent.cost+'</span>';

            			tabTotalImportContentObj
            				.append(tabTotalImportContentStr);

            		break;
            		case("internet"):
            			var iconStr = createIconString("globe");
            			var titleStr = createTitleString(dataType);

            			cycledTabObj
            				.append(tabTitleStr);

            			var tabTitleObj = cycledTabObj.find('.tab_title');

            			tabTitleObj
            				.append(iconStr)
            				.append(titleStr);

            			cycledContentObj
            				.append(tabTotalStr);

            			var tabTotalObj = cycledContentObj.find('.tab_totals');

            			tabTotalObj
            				.append(tabTotalDurationStr)
            				.append(tabTotalImportStr)
            				.append(tabTotalIconStr);

            			var tabTotalDurationObj = tabTotalObj.find('.tab_totals_duration');            			
            			var tabTotalDurationLabelStr = '<span class="tab_totals_label">Numero totale</span>';

            			tabTotalDurationObj
            				.append(tabTotalDurationLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalDurationContentObj = tabTotalDurationObj.find('.tab_totals_content');

        				$.each(dataContent.amount,function(gb,amount){

        					var tabTotalDurationTimeStr = '<span class="number">'+amount+'</span>GB ';
        					tabTotalDurationContentObj
        						.append(tabTotalDurationTimeStr);

        				});

        				var tabTotalImportObj = tabTotalObj.find('.tab_totals_import');

            			tabTotalImportObj
            				.append(tabTotalImportLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalImportContentObj = tabTotalImportObj.find('.tab_totals_content');

            			var tabTotalImportContentStr='<span class="number">'+dataContent.cost+'</span>';

            			tabTotalImportContentObj
            				.append(tabTotalImportContentStr);


            		break;
            		case("altri_dati"):
            			var iconStr = createIconString("bookmark-o");
            			var titleStr = createTitleString(dataType);

            			cycledTabObj
            				.append(tabTitleStr);

            			var tabTitleObj = cycledTabObj.find('.tab_title');

            			tabTitleObj
            				.append(iconStr)
            				.append(titleStr);

            			cycledContentObj
            				.append(tabTotalStr);

            			var tabTotalObj = cycledContentObj.find('.tab_totals');

            			tabTotalObj
            				.append(tabTotalDurationStr)
            				.append(tabTotalImportStr)
            				.append(tabTotalIconStr);

            			var tabTotalImportObj = tabTotalObj.find('.tab_totals_import');

            			tabTotalImportObj
            				.append(tabTotalImportLabelStr)
            				.append(tabTotalContentStr);

            			var tabTotalImportContentObj = tabTotalImportObj.find('.tab_totals_content');

            			var tabTotalImportContentStr='<span class="number">'+dataContent.cost+'</span>';

            			tabTotalImportContentObj
            				.append(tabTotalImportContentStr);

            		break;
            		default:
            		break;
            	}

            });

            contractTabsViewAllFillerStr = '<span class="view_all_filler"></span>';
            contractTabsViewAllContentStr = '<span class="view_all"></span>';
            
            contractTabsViewAllObj
            	.append(contractTabsViewAllFillerStr)
            	.append(contractTabsViewAllContentStr);

            var contractTabsViewAllContentObj = contractTabsViewAllObj.find('.view_all');

            contractTabsViewAllLinkStr = '<a href="#" class="view_all_link">Visualizza tutti i dati</a>';

            contractTabsViewAllContentObj
            	.append(contractTabsViewAllLinkStr);


            
            
            /*var contractDetails = "<div class='" + dataType + " my_traffic__contracts_details__single_tab'></div>";
            console.log(el);
            $('.my_traffic__contracts_details__column_content')
                .append(contractDetails);
            $('#' + contract)
                .find('.' + dataType)
                .append('<div class="tab_totals"></div>');
            switch (dataType) {
                case ("voce"):
                    var container = $('#' + contract + ' .' + dataType);
                    console.log(container);
                    $.each(el[contract], function(i, el) {
                        if (dataType == "amount") {
                            $('#' + contract + ' .tab_totals')
                                .append("<div class='tab_totals_duration'></div>");
                            $('#' + contract + ' .tab_totals_duration')
                                .append('<span class="tab_totals_label">Durata totale</span>')
                                .append('<span class="tab_totals_content"></span>');
                            var timeString = '';
                            $.each(el, function(i, el) {
                                timeString += '<span class="number">' + el + '</span>' + i + ' ';
                            });
                            $('#' + contract + ' .tab_totals_duration .tab_totals_content')
                                .append(timeString);
                        } else if (i == "cost") {
                            $('#' + contract + ' .tab_totals')
                                .append("<div class='tab_totals_import'></div>");
                            $('#' + contract + ' .tab_totals_import')
                                .append('<span class="tab_totals_label">Importo</span>')
                                .append('<span class="tab_totals_content"></span>');
                            $('#' + contract + ' .tab_totals_import .tab_totals_content')
                                .append('<span class="number">' + el + '</span>');

                        }
                    });
                    $('#' + contract + ' .tab_totals').append('<i class="tab_icon_expand"></i>');
                    break;
                case ("sms"):
                    $.each(el[contract], function(i, el) {
                        if (i == "amount") {
                            $('#' + contract + ' .tab_totals')
                                .append("<div class='tab_totals_duration'></div>");
                            $('#' + contract + ' .tab_totals_duration')
                                .append('<span class="tab_totals_label">Durata totale</span>')
                                .append('<span class="tab_totals_content"></span>');
                        } else if (i == "cost") {
                            $('#' + contract + ' .tab_totals')
                                .append("<div class='tab_totals_import'></div>");
                            $('#' + contract + ' .tab_totals_import')
                                .append('<span class="tab_totals_label">Importo</span>')
                                .append('<span class="tab_totals_content"></span>');
                            $('#' + contract + ' .tab_totals_import .tab_totals_content')
                                .append('<span class="number">' + el + '</span>');
                        }
                    });
                    break;
                case ("internet"):
                    break;
            }*/
        });
    }

    function populateTab() {
        // body... 
    }


    function populateContracts() {

        populateTotals();
        populateTab();

    }


    $('.linea_link').click(function(event) {

        event
            .preventDefault();


    });




    $('.linea_link').click(function(event) {

        $('.my_traffic__contracts_details__column_content')
            .addClass('text-center')
            .append("<i class='fa fa-spinner fa-spin'></i>");

        var link = $(this);
        var contract = link.data().contract;
        var target = $(link.attr('href'));


        if (link.hasClass('active')) {
            target
                .removeClass('traffic-selected');
            link
                .removeClass('active');
        } else {
            target
                .addClass('traffic-selected');
            link
                .addClass('active');
        }
        setTimeout(function() {
            $("i.fa-spinner")
                .remove();

        }, 1000);
    });


    $(document).ready(function() {
    	var obj_nicescroll = {
            cursorcolor: "#f48135",
            cursorwidth: "5px",
            cursorborder: "0",
            background: "#f5f5f5",
            spacebarenabled: false,
            horizrailenabled: false,
            autohidemode: false,
            zindex: 1100
        };

        if ($(".my_traffic__contracts_details__data .my_traffic__contracts_details__data__content, .my_traffic__contracts_details__column_view_all .my_traffic__contracts_details__data__content").length > 0) {
            $('.my_traffic__contracts_details__data .my_traffic__contracts_details__data__content, .my_traffic__contracts_details__column_view_all .my_traffic__contracts_details__data__content')
            	.niceScroll(obj_nicescroll);
        }

        //populateSummary();
        //populateContracts();

    });



})(jQuery)
