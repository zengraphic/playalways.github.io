(function(r$) {

    'use strict';

    r$(document)
        .ready(function() {
            var $coverageToolDomElement = r$('#coverage-tool');
            COVERAGETOOL
                .initTool($coverageToolDomElement);
        });



    var COVERAGETOOL = {
        /*
        CONFIGURATIONS
        - is world map
        - projection type
        - slick
        - main map
        - sub maps
         */
        configs: {
            isWorldMap: true,
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
            },
            mainMapConfig: {
                map: 'continents_merc',
                regionsSelectable: true,
                zoomOnScroll: true,
                panOnDrag: true,
                regionsSelectableOne: true,
                backgroundColor: 'transparent',
                regionStyle: {
                    initial: {
                        'fill': '#d3d3d2'
                    },
                    hover: {
                        'fill': '#f4b083'
                    },
                    selected: {
                        'fill': '#f48135'
                    }
                },
                regionLabelStyle: {
                    initial: {
                        'fill': 'white',
                        'font-size': '10px'
                    },
                    hover: {
                        'fill': 'white'
                    }
                },
                labels: {
                    regions: {
                        render: function(code) {
                            //return COVERAGETOOL.apiData[code].displayName;
                        },
                        offsets: function(code) {
                            //return COVERAGETOOL.apiData[code].labelOffset;
                        }
                    }
                },
                onRegionTipShow: function(e, tip, code) {
                    return false;
                },
                onRegionSelected: function(e, code) {
                    COVERAGETOOL
                        .mapToSlick(code);

                }
            },
            subMapConfig: {
                regionsSelectable: true,
                zoomOnScroll: true,
                panOnDrag: true,
                regionsSelectableOne: true,
                backgroundColor: 'transparent',
                regionStyle: {
                    initial: {
                        'fill': '#d3d3d2'
                    },
                    hover: {
                        'fill': '#f4b083'
                    },
                    selected: {
                        'fill': '#f48135'
                    }
                },
                regionLabelStyle: {
                    initial: {
                        'fill': 'white',
                        'font-size': '10px'
                    },
                    hover: {
                        'fill': 'white'
                    }
                },
                onRegionSelected: function(e, code, isSelected) {
                    if (code && isSelected) {
                        COVERAGETOOL
                            .countriesList
                            .selectpicker('val', code);

                        COVERAGETOOL
                            .toggleCountry(code);

                    }
                },
            },
            geoZonesPopupConfig: {
                type: 'inline',
                mainClass: 'mfp-fade mfp-geozones',
                showCloseBtn: true,
                closeBtnInside: true,
                alignTop: false,
                midClick: true,
                removalDelay: 150,
                callbacks: {
                    beforeClose: function() {},
                    close: function() {

                    },
                    open: function() {

                    }
                }
            }
        },
        /*
        END CONFIGURATIONS
         */
        /*
        EMPTY API DATA OBJECT
         */
        apiData: {},
        /*
        EMPTY API DATA OBJECT
         */
        /*
        MAIN INIT FUNCTION
         */
        initTool: function($coverageToolDomElement) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var initDataFromApiPromise = starter
                .then(function() {
                    console.log('initDataFromApi method.....');
                    return $TOOL.initDataFromApi();
                })
                .done(function() {
                    console.log('initDataFromApi done');

                });
            var initPrimaryDomPromise = initDataFromApiPromise
                .then(function() {
                    console.log('initPrimaryDom method.....');
                    return $TOOL.initPrimaryDom($coverageToolDomElement);
                })
                .done(function() {
                    console.log('initPrimaryDom done');

                });
            var setDomElementsPromise = initPrimaryDomPromise
                .then(function() {
                    console.log('setDomElements method.....');
                    return $TOOL.setDomElements();
                })
                .done(function() {
                    console.log('setDomElements done');

                });

            var initNavigationPromise = setDomElementsPromise
                .then(function() {
                    console.log('initNavigation method.....');
                    return $TOOL.initNavigation();
                })
                .done(function() {
                    console.log('initNavigation done');

                });

            var initGeoZonesPopupPromise = initNavigationPromise
                .then(function() {
                    console.log('initGeoZonesPopup method.....');
                    return $TOOL.initGeoZonesPopup();
                })
                .done(function() {
                    console.log('initGeoZonesPopup done');

                });

            var bindDomElementsPromise = initGeoZonesPopupPromise
                .then(function() {
                    console.log('bindDomElements method.....');
                    return $TOOL.bindDomElements();
                })
                .done(function() {
                    console.log('bindDomElements done');

                });
            var initVectorMapPromise = bindDomElementsPromise
                .then(function() {
                    console.log('initVectorMap method.....');
                    return $TOOL.initVectorMap();
                })
                .done(function() {
                    console.log('initVectorMap done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        /*
        END MAIN INIT FUNCTION
         */

        /*
        BUILDING API DATA METHODS
         */

        initDataFromApi: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var getDataContinentsPromise = starter
                .then(function() {
                    console.log('getData continents method.....');
                    return $TOOL.getData('continents');
                })
                .done(function() {
                    console.log('getData continents done');

                });
            var getDataCountriesPromise = getDataContinentsPromise
                .then(function() {
                    console.log('getData countries method.....');
                    return $TOOL.getData('countries');
                })
                .done(function() {
                    console.log('getData countries done');

                });
            var getDataOperatorsPromise = getDataCountriesPromise
                .then(function() {
                    console.log('getData operatori method.....');
                    return $TOOL.getData('operatori');
                })
                .done(function() {
                    console.log('getData operatori done');

                });
            var getDataOptionsPromise = getDataOperatorsPromise
                .then(function() {
                    console.log('getData opzioni method.....');
                    return $TOOL.getData('opzioni');
                })
                .done(function() {
                    console.log('getData opzioni done');

                });
            var getDataRatesPromise = getDataOptionsPromise
                .then(function() {
                    console.log('getData tariffe method.....');
                    return $TOOL.getData('tariffe');
                })
                .done(function() {
                    console.log('getData tariffe done');

                });
            var getDataZonesPromise = getDataRatesPromise
                .then(function() {
                    console.log('getData zone method.....');
                    return $TOOL.getData('zone');
                })
                .done(function() {
                    console.log('getData zone done');

                });

            var getDataZonesRatesPromise = getDataZonesPromise
                .then(function() {
                    console.log('getData tariffe-zone method.....');
                    return $TOOL.getData('tariffe-zone');
                })
                .done(function() {
                    console.log('getData tariffe-zone done');

                });

            starter
                .resolve();

            return starter.promise();
        },

        getData: function(dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var requestDataPromise = starter
                .then(function() {
                    console.log('requestData ' + dataType + ' method.....');
                    return $TOOL.requestData(dataType);
                })
                .done(function(data) {
                    console.log('requestData ' + dataType + ' done');
                });

            var interpolateDataPromise = requestDataPromise
                .then(function(data) {
                    console.log('interpolateData ' + dataType + ' method.....');
                    return $TOOL.interpolateData(data, dataType);
                })
                .done(function() {
                    console.log('interpolateData ' + dataType + ' done');
                });

            starter
                .resolve();

            return starter.promise();
        },

        requestData: function(dataType) {

            return r$.ajax({
                method: "get",
                async: false,
                url: "../../js/coverageTool/json/" + dataType + ".json"
            });
        },

        interpolateData: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var dataInterpolationPromise = starter
                .then(function() {
                    console.log('interpolate ' + dataType + ' method.....');
                    switch (dataType) {
                        case 'continents':

                            return $TOOL.interpolateContinents(data, dataType);

                        case 'countries':
                            return $TOOL.interpolateCountries(data, dataType);

                        case 'operatori':
                            return $TOOL.interpolateOperators(data, dataType);

                        case 'opzioni':
                            return $TOOL.interpolateOptions(data, dataType);

                        case 'tariffe':
                            return $TOOL.interpolateRates(data, dataType);

                        case 'zone':
                            return $TOOL.interpolateGeoZones(data, dataType);

                        case 'tariffe-zone':
                            return $TOOL.interpolateGeoZonesRates(data, dataType);

                    }
                })
                .done(function() {
                    console.log('interpolate ' + dataType + ' done');
                });

            starter
                .resolve();

            return starter.promise();
        },

        interpolateContinents: function(data, dataType) {
            var $TOOL = this;

            var continentsPromises = [];

            r$.each(data.continents, function(i, continent) {
                var starter = new r$.Deferred();
                var setContinentPromise = $TOOL
                    .setContinent(continent);

                setContinentPromise
                    .then(function() {
                        continentsPromises
                            .push(starter);
                    });

            });


            return r$.when.apply(undefined, continentsPromises).promise();
        },

        setContinent: function(continent) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var name = continent.name;
            var lowercaseName = name.toLowerCase();

            continent.mapCode = continent.id;
            continent.mapName = lowercaseName + "_" + $TOOL.configs.projection;
            continent.displayName = name;
            continent.continentName = lowercaseName;
            continent.countries = {};
            $TOOL.apiData[lowercaseName] = continent;

            starter
                .resolve();

            return starter.promise();
        },

        interpolateCountries: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(data.countries, function(countryIndex, country) {
                    if (country.continent_id !== null && continent.id == country.continent_id) {
                        $TOOL
                            .setCountry(continentId, country);
                    }
                });
            });

            starter
                .resolve();

            return starter.promise();
        },

        setCountry: function(continentId, country) {
            var $TOOL = this;
            var starter = new r$.Deferred();
            var regExes = [
                [/\s/g, "_"],
                [/&/g, "and"],
                [/[\.,]+/g, ""],
                [/_/g, '-']
            ];
            var countryNameFormatted = country.name.toLowerCase();
            var flagNameFormatted = country.flag_name.toLowerCase();

            r$.each(regExes, function(i, regEx) {
                if (i < 3) {
                    countryNameFormatted = countryNameFormatted.replace(regEx[0], regEx[1]);
                }
            });

            r$.each(regExes, function(i, regEx) {
                flagNameFormatted = flagNameFormatted.replace(regEx[0], regEx[1]);
            });

            country.flag_name = flagNameFormatted;
            country.name_formatted = countryNameFormatted;

            $TOOL.apiData[continentId].countries[country.flag_name] = country;

            starter
                .resolve();

            return starter.promise();
        },

        interpolateOperators: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    if (continent.id == country.continent_id) {
                        r$.each(data.telecom_operators, function(operatorIndex, operator) {
                            if (country.id == operator.country_id) {
                                $TOOL
                                    .setOperator(continentId, countryId, operator);
                            }
                        });
                    }
                });
            });

            starter
                .resolve();

            return starter.promise();
        },

        setOperator: function(continentId, countryId, operator) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            if (typeof $TOOL.apiData[continentId].countries[countryId].operators === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].operators = {};
            }
            $TOOL.apiData[continentId].countries[countryId].operators[operator.id] = operator;
            var displayValues = $TOOL.apiData[continentId].countries[countryId].operators[operator.id].display;
            displayValues = displayValues.split('; ');
            $TOOL.apiData[continentId].countries[countryId].operators[operator.id].display = displayValues;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateOptions: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    r$.each(country.operators, function(operatorId, operator) {
                        r$.each(data.available_options, function(optionIndex, option) {
                            if (operatorId == option.telecom_operator_id) {
                                $TOOL
                                    .setOption(continentId, countryId, operatorId, option);
                            }
                        });
                    });
                });
            });

            starter
                .resolve();

            return starter.promise();
        },

        setOption: function(continentId, countryId, operatorId, option) {
            var $TOOL = this;
            var starter = new r$.Deferred();
            if (typeof $TOOL.apiData[continentId].countries[countryId].operators[operatorId].options === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].operators[operatorId].options = {};
            }
            $TOOL.apiData[continentId].countries[countryId].operators[operatorId].options[option.id] = option;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateRates: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    r$.each(data.options, function(rateIndex, rate) {
                        r$.each(rate.country_rates, function(countryRateIndex, countryRate) {
                            if (countryId == countryRate.country_id) {
                                $TOOL
                                    .setRate(continentId, countryId, rate, countryRate);
                            }
                        });
                    });
                });
            });

            starter
                .resolve();

            return starter.promise();
        },

        setRate: function(continentId, countryId, rate, countryRate) {
            var $TOOL = this;
            var starter = new r$.Deferred();
            if (typeof $TOOL.apiData[continentId].countries[countryId].rates === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].rates = {};
            }
            if (typeof $TOOL.apiData[continentId].countries[countryId].rates[rate.id] === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].rates[rate.id] = {};
                $TOOL.apiData[continentId].countries[countryId].rates[rate.id].name = rate.name;
            }
            if (typeof $TOOL.apiData[continentId].countries[countryId].rates[rate.id].countryRates === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].rates[rate.id].countryRates = {};
            }
            $TOOL.apiData[continentId].countries[countryId].rates[rate.id].countryRates[countryRate.id] = countryRate;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateGeoZones: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    r$.each(data.geo_zones, function(geoZoneIndex, geoZone) {
                        if (country.geo_zone_id == geoZone.id) {
                            $TOOL
                                .setGeoZones(continentId, countryId, geoZone);
                        }
                    });
                });
            });

            starter
                .resolve();

            return starter.promise();

        },

        setGeoZones: function(continentId, countryId, geozone) {
            var $TOOL = this;

            $TOOL.apiData[continentId].countries[countryId].geozone = geozone;
        },

        interpolateGeoZonesRates: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    r$.each(data.geo_zone_rates, function(geoZoneRateIndex, geoZoneRate) {
                        if (country.geo_zone_id == geoZoneRate.from_geo_zone_id) {
                            $TOOL
                                .setGeoZonesRates(continentId, countryId, geoZoneRate);
                        }
                    });
                });
            });

            starter
                .resolve();

            return starter.promise();

        },

        setGeoZonesRates: function(continentId, countryId, geoZoneRate) {
            var $TOOL = this;
            if (typeof $TOOL.apiData[continentId].countries[countryId].geozone.callRate === typeof undefined) {
                $TOOL.apiData[continentId].countries[countryId].geozone.callRate = {};
            }
            $TOOL.apiData[continentId].countries[countryId].geozone.callRate[$TOOL.mapGeoZoneIdToName(geoZoneRate.to_geo_zone_id)] = geoZoneRate;
        },

        /*
        END BUILDING API DATA METHODS
         */

        /*
        VECTOR MAP INITIALIZATION
         */
        initVectorMap: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            $TOOL.map = new jvm.MultiMap({
                container: $TOOL.mapContainer,
                maxLevel: 1,
                main: $TOOL.configs.mainMapConfig,
                subMapsOptions: $TOOL.configs.subMapConfig,
                mapNameByCode: function(code, multiMap) {
                    
                    return code + '_' + multiMap.defaultProjection;
                },
                mapUrlByCode: function(code, multiMap) {
                    
                    return '../../js/coverageTool/jquery-jvectormap-' + code + '-' + multiMap.defaultProjection + '.js';
                }
            });
            starter
                .resolve();

            return starter.promise();
        },
        /*
        END VECTOR MAP INITIALIZATION
         */
        /*
        DOM ELEMENTS SETTINGS
         */
        initPrimaryDom: function($coverageToolDomElement) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            $TOOL.toolContainer = $coverageToolDomElement;
            $TOOL.mapContainer = $TOOL.toolContainer.find('#world-map');
            $TOOL.tabsContainer = $TOOL.toolContainer.find('.block_coverage_tool__tabs__container').find('.slider_menu_tabs');
            $TOOL.countriesContainer = $TOOL.toolContainer.find('.country_offers_block');
            $TOOL.countriesList = $TOOL.countriesContainer.find('#country--List');
            $TOOL.accordionOperators = $TOOL.countriesContainer.find('input.accordionBox');

            starter
                .resolve();

            return starter.promise();
        },
        setDomElements: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var buildContinentsDomPromise = starter
                .then(function() {
                    console.log('buildContinentsDom method.....');
                    return $TOOL.buildContinentsDom();
                })
                .done(function() {
                    console.log('buildContinentsDom done');

                });
            var buildCountriesDomPromise = buildContinentsDomPromise
                .then(function() {
                    console.log('buildCountriesDom method.....');
                    return $TOOL.buildCountriesDom();
                })
                .done(function() {
                    console.log('buildCountriesDom done');

                });

            var buildCountryServicesDomPromise = buildCountriesDomPromise
                .then(function() {
                    console.log('buildServicesDom method.....');
                    return $TOOL.buildServicesDom();
                })
                .done(function() {
                    console.log('buildServicesDom done');

                });

            var buildCountryRatesDomPromise = buildCountryServicesDomPromise
                .then(function() {
                    console.log('buildRatesDom method.....');
                    return $TOOL.buildRatesDom();
                })
                .done(function() {
                    console.log('buildRatesDom done');

                });

            var buildOperatorsDomPromise = buildCountryRatesDomPromise
                .then(function() {
                    console.log('buildOperatorsDom method.....');
                    return $TOOL.buildOperatorsDom();
                })
                .done(function() {
                    console.log('buildOperatorsDom done');

                });

            var buildGeoZonesPopupDomPromise = buildCountryRatesDomPromise
                .then(function() {
                    console.log('buildGeoZonesPopupDom method.....');
                    return $TOOL.buildGeoZonesPopupDom();
                })
                .done(function() {
                    console.log('buildGeoZonesPopupDom done');

                });



            starter
                .resolve();

            return starter.promise();
        },
        /*
        END DOM ELEMENTS SETTINGS
         */
        /*
        DOM BUILDING
         */
        buildContinentsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setContinentsDomPromise = starter
                .then(function() {
                    console.log('setContinentsDom method.....');
                    return $TOOL.setContinentsDom();
                })
                .done(function() {
                    console.log('setContinentsDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setContinentsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.apiData, function(continentId, continent) {
                $TOOL
                    .setContinentDom(continentId,continent);
            });

            starter
                .resolve();

            return starter.promise();
        },
        setContinentDom: function(continentId,continent) {
            var $TOOL = this;

            var tabHtmlString =
                '<li class="strip_menu_tab__item item">' +
                '<a data-continent="' + continentId + '" href="#' + continent.id + '">' + continent.name + '</a>' +
                '</li>';

            $TOOL
                .tabsContainer
                .append(tabHtmlString);
        },


        buildCountriesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setCountriesDomPromise = starter
                .then(function() {
                    console.log('setCountriesDom method.....');
                    return $TOOL.setCountriesDom();
                })
                .done(function() {
                    console.log('setCountriesDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setCountriesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    $TOOL
                        .setCountryDom(countryId,country);
                });
            });

            starter
                .resolve();

            return starter.promise();
        },
        setCountryDom: function(countryId,country) {
            var $TOOL = this;
            //var correctFlagName = country.flag_name.replace(/_/g, '-').toLowerCase();
            var countryHtmlString =
                '<div class="country_offers_block__container__country" data-country-id="' + countryId + '">' +
                '<div class="country_offers_block__container__country--flag col-xs-12 col-sm-2 col-md-2 col-lg-2">' +
                '<div class="country_offers_block__container-title">' + country.name + '</div>' +
                '<div class="country_offers_block__container-image">' +
                '<img src="../../img/flags/flag-' + country.flag_name + '.png" />' +
                '</div>' +
                '</div>' +
                '<div class="country_offers_block__container__country--rates col-xs-12 col-sm-10 col-md-10 col-lg-10">' +
                '<div class="country_offers_block__rates_divider--left">' +
                '<div class="country_offers_block__rates--title">Zona<br>tariffaria</div>' +
                '<div class="country_offers_block__rates--price">' + $TOOL.mapGeoZoneIdToName(country.geozone.id) + '</div>' +
                '</div>' +
                '<div class="country_offers_block__rates_divider--left">' +
                '<div class="country_offers_block__rates--title">Prefisso<br/>internazionale</div>' +
                '<div class="country_offers_block__rates--price">' + country.prefix + '</div>' +
                '</div>' +
                '<div class="country_offers_block__rates_divider--left">' +
                '<div class="country_offers_block__rates--title">Prefisso<br/>per l&apos;Italia</div>' +
                '<div class="country_offers_block__rates--price">' + country.prefix_italy + '</div>' +
                '</div>' +
                '<div class="country_offers_block__rates_divider--left">' +
                '<div class="country_offers_block__rates--title"> Copertura <br/>satellitare </div>' +
                '<div class="country_offers_block__rates--price">';
            var satelliteCounter = 0;
            r$.each(country.operators, function(operatorIndex, operator) {
                if (operator.frequency == 'satellitare') {
                    satelliteCounter++;
                }
            });
            if (satelliteCounter > 0) {
                countryHtmlString += '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">';
            } else {
                countryHtmlString += '-';
            }


            var roamingLikeAtHomeHtml = 
            '<div class="clear"></div>'+
            '<div class="standard_block fullBand mobile fullImage light invertedDisplay transparent">'+
                '<div class="standard_block__mainContainer">'+
                    '<div class="standard_block__half_block image_block">'+
                        '<div class="image_block--container">'+
                            '<img class="testimonial" src="../../img/backgrounds/roaming-like-at-home.jpg" />'+
                        '</div>'+
                    '</div>'+
                    '<div class="standard_block__half_block offer_block">'+
                        '<div class="standard_block__title">Easy Europe</div>'+
                        '<div class="standard_block__text">Il roaming in Europa<br>diventa più semplice.</div>'+
                        '<div class="standard_block__singleButton">'+
                            '<a href="https://www.wind.it/landing/promoeasy-europe/" class="btn base__bt base__bt--or">Scopri</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';



            countryHtmlString += '</div>' +
                '</div>' +
                '</div>' +
                (country.geo_zone_id == 7?roamingLikeAtHomeHtml:'') +
                '</div>';

            $TOOL
                .countriesContainer
                .append(countryHtmlString);
        },


        buildServicesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setServicesDomPromise = starter
                .then(function() {
                    console.log('setServicesDom method.....');
                    return $TOOL.setServicesDom();
                })
                .done(function() {
                    console.log('setServicesDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setServicesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    var countryServices = {
                        callSubscriptionService: false,
                        callDirectService: false,
                        call124Service: false,
                        smsService: false,
                        gprsService: false,
                        umtsService: false,
                        lteService: false,
                    };

                    r$.each(country.operators, function(operatorId, operator) {
                        if (operator.roaming_subscription) {
                            countryServices.callSubscriptionService = true;
                        }
                        if (operator.roaming_direct) {
                            countryServices.callDirectService = true;
                        }
                        if (operator.roaming_124) {
                            countryServices.call124Service = true;
                        }
                        if (operator.sms_available) {
                            countryServices.smsService = true;
                        }
                        if (operator.gprs_available) {
                            countryServices.gprsService = true;
                        }
                        if (operator.umts_available) {
                            countryServices.umtsService = true;
                        }
                        if (operator.lte_available) {
                            countryServices.lteService = true;
                        }
                    });
                    $TOOL.setServiceDom(countryId, countryServices);

                });
            });

            starter
                .resolve();

            return starter.promise();
        },
        setServiceDom: function(countryId, countryServices) {
            var $TOOL = this;

            var servicesHtmlString =
                '<div class="country_offers_block__container__country--services col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                '<div class="accordion_description_block__container col-xs-12">' +
                '<div class="accordion_description_block__feature col-xs-12 col-sm-12 col-md-12 col-lg-12">Servizi</div>' +
                '<div class="accordion_description_block__left col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Abbonamento</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.callSubscriptionService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Ricaricabile</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.callDirectService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Ricaricabile con Roaming *124*</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.call124Service ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">SMS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.smsService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="accordion_description_block__right col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Dati 2G - GPRS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.gprsService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Dati 3G - UMTS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.umtsService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Dati 4G - LTE</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (countryServices.lteService ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>';

            $TOOL
                .countriesContainer
                .find('[data-country-id="' + countryId + '"]')
                .append(servicesHtmlString);
        },


        buildRatesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setRatesDomPromise = starter
                .then(function() {
                    console.log('setRatesDom method.....');
                    return $TOOL.setRatesDom();
                })
                .done(function() {
                    console.log('setRatesDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setRatesDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    $TOOL
                        .setRateDom(countryId, country.geozone);
                });
            });

            starter
                .resolve();

            return starter.promise();
        },
        mapGeoZoneIdToName: function(geoZoneId) {
            switch (geoZoneId) {
                case 1:
                    return 4;
                case 2:
                    return 2;
                case 3:
                    return 3;
                case 7:
                    return 'UE';
                case 5:
                    return 'SM';
                default:
                    break;
            }
        },
        setRateDom: function(countryId, geoZone) {
            var $TOOL = this;

            var ratesHtmlString =
                '<div class="accordion_description_block__container col-xs-12">' +
                '<div class="accordion_description_block__left col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__featureContent strong">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 "><a href="#geo-zones-popup" class="base__popup-link--geo-zones">Chiamate effettuate &gt;</a></div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>' +
                '<div class="clear"></div>' +
                '</div>';

            r$.each(geoZone.callRate, function(callRateIndex, callRate) {
                if ($TOOL.mapGeoZoneIdToName(geoZone.id) == "UE" && callRateIndex == "SM") {
                    ratesHtmlString +=
                        '<div class="accordion_description_block__featureContent">' +
                        '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">A zona UE</div>' +
                        '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6"> - </div>' +
                        '<div class="clear"></div>' +
                        '</div>';

                }
                ratesHtmlString +=
                    '<div class="accordion_description_block__featureContent">' +
                    '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">A zona ' + callRateIndex + '</div>' +
                    '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + callRate.rate + '€/min</div>' +
                    '<div class="clear"></div>' +
                    '</div>';
            });

            ratesHtmlString +=
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">Chiamate ricevute</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + geoZone.receive_rate + '€/min</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="accordion_description_block__right col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">&nbsp;</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">SMS</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + geoZone.sms_rate + '€</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">MMS</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + geoZone.mms_rate + '€</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">DATI</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + geoZone.data_rate + 'cent/Kb</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="clear"></div>';


            $TOOL
                .countriesContainer
                .find('[data-country-id="' + countryId + '"]')
                .append(ratesHtmlString);
        },


        buildOperatorsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setOperatorsDomPromise = starter
                .then(function() {
                    console.log('setOperatorsDom method.....');
                    return $TOOL.setOperatorsDom();
                })
                .done(function() {
                    console.log('setOperatorsDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setOperatorsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    var operatorsHtmlString = '';
                    var operatorsSatHtmlString = '';

                    operatorsHtmlString +=
                        '<div class="block_coverage_tool__operators__container col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                        '<div class="showcase_accordions_block">' +
                        '<ul>' +
                        '<li class="showcase_accordions_block__single">' +
                        '<input type="checkbox" checked class="accordionBox"><i></i>' +
                        '<h2>Visualizza gli operatori disponibili</h2>' +
                        '<div class="showcase_accordions_block__container">';

                    r$.each(country.operators, function(operatorId, operator) {
                        if (operator.frequency == "satellitare") {
                            operatorsSatHtmlString += $TOOL.setOperatorDom(operator);
                        } else {
                            operatorsHtmlString += $TOOL.setOperatorDom(operator);
                        }
                    });
                    operatorsHtmlString += operatorsSatHtmlString;
                    operatorsHtmlString +=
                        '</div>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '<div class="clear"></div>';

                    $TOOL
                        .countriesContainer
                        .find('[data-country-id="' + countryId + '"]')
                        .append(operatorsHtmlString);
                });
            });

            starter
                .resolve();

            return starter.promise();
        },
        setOperatorDom: function(operator) {

            return '<div class="accordion_description_block__container col-xs-12">' +
                '<div class="accordion_description_block__left col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__feature col-xs-12 col-sm-12 col-md-12 col-lg-12">Dati Operatore</div>' +
                '<div class="clear"></div>' +
                '<div class="accordion_description_block__featureContent strong">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">Nome Operatore</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + operator.name + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">Display</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + operator.display.join(';') + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-6 col-sm-6 col-md-6 col-lg-6 ">Frequenza</div>' +
                '<div class="accordion_description_block__featureContent--description col-xs-6 col-sm-6 col-md-6 col-lg-6">' + operator.frequency + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="accordion_description_block__right col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
                '<div class="accordion_description_block__feature col-xs-12 col-sm-12 col-md-12 col-lg-12">Servizi</div>' +
                '<div class="clear"></div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Abbonamento</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.roaming_subscription ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Ricaricabile</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.roaming_direct ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">Chiamate voce per Ricaricabile con Roaming *124*</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.roaming_124 ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">SMS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.sms_available ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">2G - GPRS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.gprs_available ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">3G - UMTS</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.umts_available ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="accordion_description_block__featureContent">' +
                '<div class="accordion_description_block__featureContent--detail col-xs-10 col-sm-10 col-md-10 col-lg-10 ">4G - LTE</div>' +
                '<div class="accordion_description_block__featureContent--availability col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                (operator.lte_available ? '<img class="service--available" src="../../img/icons-interface/check-available.png" alt="">' : '') +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>';

        },


        buildGeoZonesPopupDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setGeoZonesPopupDomPromise = starter
                .then(function() {
                    console.log('setGeoZonesPopupDom method.....');
                    return $TOOL.setGeoZonesPopupDom();
                })
                .done(function() {
                    console.log('setGeoZonesPopupDom done');

                });

            starter
                .resolve();

            return starter.promise();
        },
        setGeoZonesPopupDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var geoZonesPopupHtmlString = '';
            geoZonesPopupHtmlString +=
                '<div id="geo-zones-popup" class="mfp-hide container_testo_generico colored_text--white">' +
                '<div class="base_popup">' +
                '<div class="popup_title">' +
                '<h3>ZONE TARIFFARIE</h3>' +
                '</div>' +
                '<div class="popup_content ">';

            var geoZoneCountries = {};

            r$.each($TOOL.apiData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    var mappedGeoZone = $TOOL.mapGeoZoneIdToName(country.geo_zone_id);
                    if (typeof geoZoneCountries[mappedGeoZone] === typeof undefined) {
                        geoZoneCountries[mappedGeoZone] = {};
                        geoZoneCountries[mappedGeoZone].callRate = country.geozone.callRate;
                    }
                    if (typeof geoZoneCountries[mappedGeoZone].countries === typeof undefined) {
                        geoZoneCountries[mappedGeoZone].countries = [];
                    }

                    geoZoneCountries[mappedGeoZone].countries.push(country.name);
                });
            });


            var geoZonesRatesHtmlTable =
                '<table class="table table-bordered">' +
                '<thead>' +
                '<th></th>';

            r$.each(geoZoneCountries, function(geoZoneIndex, geoZone) {
                geoZonesRatesHtmlTable +=
                    '<th>Zona ' + geoZoneIndex + '</th>';
            });
            geoZonesRatesHtmlTable +=
                '</thead>' +
                '<tbody>';
            r$.each(geoZoneCountries, function(geoZoneIndex, geoZone) {
                geoZonesRatesHtmlTable +=
                    '<tr><td>Zona ' + geoZoneIndex + '</td>';
                r$.each(geoZone.callRate, function(callRateIndex, callRate) {
                    if (geoZoneIndex == "UE" && callRateIndex == "SM") {
                        geoZonesRatesHtmlTable += '<td> - </td>';
                    }
                    geoZonesRatesHtmlTable +=
                        '<td>' + callRate.rate + '<small>&euro;</small></td>';
                });

                geoZonesRatesHtmlTable +=
                    '</tr>';
            });
            geoZonesRatesHtmlTable +=
                '</tbody>' +
                '</table>';


            geoZonesPopupHtmlString += geoZonesRatesHtmlTable;


            r$.each(geoZoneCountries, function(geoZoneIndex, geoZone) {
                geoZonesPopupHtmlString +=
                    '<hr>' +
                    '<div class="geo-zone-container ">' +
                    '<div class="geo-zone-title">' +
                    '<h4>Zona ' + geoZoneIndex + '</h4>' +
                    '<div class="container">' + geoZone.countries.join(', ') + '</div>' +
                    '</div>' +
                    '</div>';
            });

            geoZonesPopupHtmlString +=
                '</div>' +
                '</div>' +
                '</div>';

            $TOOL
                .toolContainer
                .append(geoZonesPopupHtmlString);

            starter
                .resolve();

            return starter.promise();
        },

        /*
        END DOM BUILDING
         */

        initNavigation: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            $TOOL
                .tabsContainer
                .slick($TOOL.configs.slickMenuTabsConfig);
            $TOOL
                .tabsContainer
                .find('.slick-current')
                .removeClass('slick-current');

            starter
                .resolve();

            return starter.promise();
        },
        initGeoZonesPopup: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var $popup = $TOOL
                .toolContainer
                .find('.base__popup-link--geo-zones');
            $popup
                .magnificPopup($TOOL.configs.geoZonesPopupConfig);

            starter
                .resolve();

            return starter.promise();
        },
        bindDomElements: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            $TOOL
                .tabsContainer
                .on({
                    'click': function() {
                        var clickedTab = r$(this);
                        $TOOL
                            .slickToMap(clickedTab);
                    }
                }, '.strip_menu_tab__item');

            $TOOL
                .countriesList
                .on({
                    'changed.bs.select': function(e, clickedIndex) {
                        var clickedCountry = $TOOL.countriesList.find('option').eq(clickedIndex).val();
                        var previousMap = $TOOL.map.history[$TOOL.map.history.length - 1];

                        previousMap
                            .clearSelectedRegions();

                        if (clickedIndex != 0) {
                            previousMap
                                .setSelectedRegions(clickedCountry);

                        } else if (clickedIndex == 0) {
                            $TOOL
                                .clearActiveCountry();
                        }
                    }
                });

            $TOOL
                .accordionOperators
                .on({
                    'change': function() {
                        $TOOL
                            .accordionOperators
                            .not(this)
                            .prop('checked', true);
                    }
                });

            $TOOL
                .mapContainer
                .on({
                    'click': function() {
                        $TOOL
                            .map
                            .history[0]
                            .clearSelectedRegions();
                        $TOOL
                            .clearContinentsTab();
                        $TOOL
                            .clearCountriesSelect();
                        $TOOL.configs.isWorldMap = true;

                    }
                }, '.jvectormap-goback');

            starter
                .resolve();

            return starter.promise();
        },
        clearActiveCountry: function() {
            var $TOOL = this;
            var $activeCountry = $TOOL.countriesContainer.find('.activeCountry');
            $activeCountry
                .slideUp("slow", $TOOL.toggleActiveCountryClass);
        },
        clearContinentsTab: function() {
            var $TOOL = this;

            $TOOL
                .tabsContainer
                .find('.slick-current')
                .removeClass('slick-current');

            $TOOL
                .clearActiveCountry();
        },
        clearCountriesSelect: function() {
            var $TOOL = this;

            var selectElementOptions = $TOOL.countriesList.find('option');
            var defaultOptionHtmlString = '<option value="none">--Seleziona--</option>';

            selectElementOptions
                .remove();

            $TOOL
                .countriesList
                .append(defaultOptionHtmlString);

            $TOOL
                .countriesList
                .selectpicker('refresh');
        },
        toggleActiveCountryClass: function() {
            var $activeCountry = r$(this);
            $activeCountry
                .toggleClass('activeCountry');
        },
        slickToMap: function(clickedTab) {
            var $TOOL = this;

            var continentCode = clickedTab.find('a').data().continent;
            var continentName = $TOOL.apiData[continentCode].mapName;

            if (!$TOOL.configs.isWorldMap) {

                $TOOL
                    .map
                    .goBack();

                $TOOL
                    .mapContainer
                    .animate({
                        'opacity': 0
                    });

                $TOOL
                    .clearContinentsTab();
                $TOOL
                    .clearCountriesSelect();
                $TOOL.configs.isWorldMap = true;
            }

            $TOOL
                .map
                .drillDown(continentName, continentCode);

            $TOOL
                .mapContainer
                .animate({
                    'opacity': 1
                });


            $TOOL.configs.isWorldMap = false;
            $TOOL
                .buildSelect(continentCode);
            clickedTab
                .addClass('slick-current');
        },
        mapToSlick: function(continentId) {
            var $TOOL = this;
            var targetSlickLink = $TOOL.tabsContainer.find('a').filter(function(i, el) {
                return r$(el).data().continent == continentId;
            });
            var targetSlickSlide = targetSlickLink.closest('.slick-slide');
            var currentSlick = $TOOL.tabsContainer.find('.slick-current');
            if (currentSlick.length == 0) {
                targetSlickSlide
                    .addClass('slick-current');
                $TOOL
                    .buildSelect(continentId);
            } else if (currentSlick.length > 0 && currentSlick != targetSlickSlide) {
                currentSlick
                    .removeClass('slick-current');
                targetSlickSlide
                    .addClass('slick-current');
                $TOOL
                    .buildSelect(continentId);
            }
            $TOOL.configs.isWorldMap = false;
        },
        buildSelect: function(continentCode) {
            var $TOOL = this;
            var selectOptions = $TOOL.countriesList.find('option');
            var defaultOptionHtmlString = '<option value="none">--Seleziona--</option>';
            selectOptions
                .remove();
            $TOOL
                .countriesList
                .append(defaultOptionHtmlString);

            r$.each($TOOL.apiData[continentCode].countries, function(countryIndex, country) {
                var currentOptionHtmlString = '<option value="' + countryIndex + '">' + country.name + '</option>';
                $TOOL
                    .countriesList
                    .append(currentOptionHtmlString);
            });
            $TOOL
                .countriesList
                .selectpicker('refresh');
        },
        toggleCountry: function(countryCode) {
            var $TOOL = this;

            var $chosenCountry = $TOOL.countriesContainer.find('[data-country-id="' + countryCode + '"]');
            $TOOL
                .countriesContainer
                .find('.activeCountry')
                .slideUp("slow", function() {
                    r$(this)
                        .removeClass('activeCountry');
                });

            if (countryCode != "none") {
                $chosenCountry
                    .slideDown("slow", function() {
                        r$(this)
                            .addClass('activeCountry');
                        r$('html, body')
                            .animate({
                                scrollTop: r$(this).offset().top
                            }, 800);
                    });
            }
        }

    };

})(jQuery);
