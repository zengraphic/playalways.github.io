(function(r$) {

    'use strict';

    r$(document)
        .ready(function() {
            var $coverageToolDomElement = r$('#coverage-tool');
            var COVERAGE = new COVERAGETOOL();
            COVERAGE
                .initTool($coverageToolDomElement);
        });



    function COVERAGETOOL() {

        this.initTool = function($coverageToolDomElement) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            var dataInit = deferred
                .then(function() {
                    console.log('Calling initData method');
                    return $TOOL.initData();
                })
                .done(function() {
                    console.log('initData method finished');
                });

            deferred
                .resolve();
        };

        this.initData = function() {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var continentsElaboration = deferred
                .then(function() {
                    console.log('Calling continentsElaboration method');
                    return $TOOL.getData('continents');
                })
                .done(function() {
                    console.log('continentsElaboration method finished');
                });

            var countriesElaboration = continentsElaboration
                .then(function() {
                    console.log('Calling countriesElaboration method');
                    return $TOOL.getData('countries');
                })
                .done(function() {
                    console.log('countriesElaboration method finished');
                });

            deferred
                .resolve();
        };


        this.getData = function(dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var dataFromSource = deferred
                .then(function() {
                    console.log('Calling requestData method for ' + dataType);
                    return $TOOL.requestData(dataType);
                })
                .done(function() {
                    console.log('requestData method for ' + dataType + ' finished');
                });


            deferred
                .resolve();
        };

        this.requestData = function(dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            var dataResponse = deferred
                .then(function() {

                    console.log('Getting ajax data for ' + dataType);
                    return r$.ajax({
                        method: "get",
                        url: "../../js/coverageTool/json/" + dataType + ".json"
                    });
                })
                .done(function(data) {
                    console.log('Ajax data for ' + dataType + ' received');

                });

            var dataInterpolation = dataResponse
                .then(function(data) {
                    console.log('Calling interpolateData method for ' + dataType);
                    return $TOOL.interpolateData(data, dataType);
                })
                .done(function() {
                    console.log('interpolateData method for ' + dataType + ' finished');
                });

            deferred
                .resolve();
        };

        this.interpolateData = function(data, dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var dataInterpolation = deferred
                .then(function() {
                    console.log('Calling specific interpolation for ' + dataType);

                    switch (dataType) {
                        case 'continents':

                            return $TOOL.interpolateContinents(data, dataType);

                        case 'countries':
                            return $TOOL.interpolateCountries(data);

                        default:
                            break;
                    }
                })
                .done(function() {
                    console.log('specific interpolation for ' + dataType + ' finished');
                });

            deferred
                .resolve();
        };

        this.configs = {

            projection: "merc",
            slickMenuTabsConfig: {
                centerMode: false,
                centerPadding: '0px',
                infinite: false,
                slidesToShow: 5,
                dots: false,
                variableWidth: false,
                focusOnSelect: true,
                arrows: false,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '60px',
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '80px',
                        slidesToShow: 1
                    }
                }]
            }
        };

        this.continentsData = {};

        this.interpolateContinents = function(data, dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var interpolateContinent = deferred
                .then(function() {
                    console.log('Interpolate continents method called');
                    r$
                        .each(data.continents, function(i, continent) {

                            $TOOL
                                .setContinent(continent);
                        });
                    r$('.slider_menu_tabs')
                        .slick($TOOL.configs.slickMenuTabsConfig);

                })
                .done(function() {
                    console.log('Interpolate continents method finished');
                });

            deferred
                .resolve();
        };

        this.setContinent = function(continent) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var settingContinent = deferred
                .then(function() {
                    var name = continent.name;
                    var lowerCaseName = continent.name.toLowerCase();
                    $TOOL.continentsData[lowerCaseName] = {
                        id: continent.id,
                        name: name,
                        continentName: lowerCaseName,
                        displayName: name,
                        mapCode: lowerCaseName,
                        mapName: lowerCaseName + "_" + $TOOL.configs.projection,
                        countries: []
                    };

                    r$('.slider_menu_tabs')
                        .append('<li class="strip_menu_tab__item item"><a data-code="' + continent.name.toLowerCase() + '" href="#' + continent.name.toLowerCase() + '">' + continent.name + '</a></li>');

                })
                .done(function() {});

            deferred
                .resolve();
        };

        this.interpolateCountries = function(data, dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var interpolateCountry = deferred
                .then(function() {
                    console.log('Interpolate countries method called');
                    r$
                        .each($TOOL.continentsData, function(i, continent) {
                            r$
                                .each(data.countries, function(i, country) {
                                    if (country.continent_id !== null) {
                                        $TOOL
                                            .setCountry(continent, country);
                                    }
                                });
                        });

                })
                .done(function() {
                    console.log('Interpolate countries method finished');
                });

            deferred
                .resolve();
        };

        this.setCountry = function(continent, country) {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var settingCountry = deferred
                .then(function() {
                    if (continent.id == country.continent_id) {
                        var countryNameFormatted = country.name.toLowerCase().replace(/\s/g, "_").replace(/&amp;/g, "and").replace(/[\.,]+/g, "");
                        $TOOL.continentsData[continent.name.toLowerCase().replace(" ", "_")]
                            .countries
                            .push(
                                [countryNameFormatted,
                                    country.name, {
                                        id: country.id,
                                        prefix: country.prefix,
                                        prefixItaly: country.prefix_italy,
                                        isSmsAvailable: country.is_sms_available,
                                        isMmsAvailable: country.is_mms_available,
                                        isDataAvailable: country.is_data_available,
                                        geoZone: country.geo_zone_id
                                    }
                                ]
                            );

                        var countryHtmlString = 
                            '<div class="country_offers_block__container__country" data-country-name="' + country.name + '" data-country-id="' + country.id + '">' +
                                '<div class="country_offers_block__container__country--flag col-xs-12 col-sm-2 col-md-2 col-lg-2">' +
                                    '<div class="country_offers_block__container-title">' + country.name + '</div>' +
                                    '<div class="country_offers_block__container-image">' +
                                        '<img src="../../img/flags/flag_'+country.name+'.png" />' +
                                    '</div>' +
                                '</div>' +
                                '<div class="country_offers_block__container__country--rates col-xs-12 col-sm-10 col-md-10 col-lg-10">'+
                                    '<div class="country_offers_block__rates_divider--left">'+
                                        '<div class="country_offers_block__rates--title">Zona<br>geografica</div>'+
                                        '<div class="country_offers_block__rates--price">'+country.name+'</div>'+
                                    '</div>'+
                                    '<div class="country_offers_block__rates_divider--left">'+
                                        '<div class="country_offers_block__rates--title">Prefisso<br/>internazionale</div>'+
                                        '<div class="country_offers_block__rates--price">'+country.prefix+'</div>'+
                                    '</div>'+
                                    '<div class="country_offers_block__rates_divider--left">'+
                                        '<div class="country_offers_block__rates--title">Prefisso<br/>per l&apos;Italia</div>'+
                                        '<div class="country_offers_block__rates--price">'+country.prefix_italy+'</div>'+
                                    '</div>'+
                                    '<div class="country_offers_block__rates_divider--left">'+
                                        '<div class="country_offers_block__rates--title"> Copertura <br/>satellitare </div>'+
                                        '<div class="country_offers_block__rates--price"> - </div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

                        r$('.country_offers_block')
                            .append(countryHtmlString);

                    }
                })
                .done(function() {});

            deferred
                .resolve();
        };


    }

})(jQuery);
