(function(r$) {

    'use strict';

    r$(document)
        .ready(function() {
            var $coverageToolDomElement = r$('#coverage-tool');
            COVERAGETOOL
                .initTool($coverageToolDomElement);
        });



    var COVERAGETOOL = {

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
                            //return COVERAGETOOL.countriesData[code].displayName;
                        },
                        offsets: function(code) {
                            //return COVERAGETOOL.countriesData[code].labelOffset;
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
        },
        countriesData: {},

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
            var setDomElementsPromise = initDataFromApiPromise
                .then(function() {
                    console.log('setDomElements method.....');
                    return $TOOL.setDomElements($coverageToolDomElement);
                })
                .done(function() {
                    console.log('setDomElements done');

                });

            var bindDomElementsPromise = setDomElementsPromise
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
                    console.log(data);
                });

            var interpolateDataPromise = requestDataPromise
                .then(function(data) {
                    console.log('interpolateData ' + dataType + ' method.....');
                    console.log(data);
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
            $TOOL.countriesData[continent.id] = continent;

            starter
                .resolve();

            return starter.promise();
        },

        interpolateCountries: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.countriesData, function(continentId, continent) {
                r$.each(data.countries, function(countryIndex, country) {
                    if (country.continent_id !== null && continent.id == country.continent_id) {
                        $TOOL
                            .setCountry(continent, country);
                    }
                });
            });

            starter
                .resolve();

            return starter.promise();
        },

        setCountry: function(continent, country) {
            var $TOOL = this;
            var starter = new r$.Deferred();
            var regExes = [
                [/\s/g, "_"],
                [/&amp;/g, "and"],
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

            $TOOL.countriesData[country.continent_id].countries[country.id] = country;

            starter
                .resolve();

            return starter.promise();
        },

        interpolateOperators: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.countriesData, function(continentId, continent) {
                r$.each(continent.countries, function(countryId, country) {
                    if (continentId == country.continent_id) {
                        r$.each(data.telecom_operators, function(operatorIndex, operator) {
                            if (countryId == operator.country_id) {
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

            if (typeof $TOOL.countriesData[continentId].countries[countryId].operators === typeof undefined) {
                $TOOL.countriesData[continentId].countries[countryId].operators = {};
            }
            $TOOL.countriesData[continentId].countries[countryId].operators[operator.id] = operator;
            var displayValues = $TOOL.countriesData[continentId].countries[countryId].operators[operator.id].display;
            displayValues = displayValues.split('; ');
            $TOOL.countriesData[continentId].countries[countryId].operators[operator.id].display = displayValues;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateOptions: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.countriesData, function(continentId, continent) {
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
            if (typeof $TOOL.countriesData[continentId].countries[countryId].operators[operatorId].options === typeof undefined) {
                $TOOL.countriesData[continentId].countries[countryId].operators[operatorId].options = {};
            }
            $TOOL.countriesData[continentId].countries[countryId].operators[operatorId].options[option.id] = option;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateRates: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.countriesData, function(continentId, continent) {
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
            if (typeof $TOOL.countriesData[continentId].countries[countryId].rates === typeof undefined) {
                $TOOL.countriesData[continentId].countries[countryId].rates = {};
            }
            if (typeof $TOOL.countriesData[continentId].countries[countryId].rates[rate.id] === typeof undefined) {
                $TOOL.countriesData[continentId].countries[countryId].rates[rate.id] = {};
                $TOOL.countriesData[continentId].countries[countryId].rates[rate.id].name = rate.name;
            }
            if (typeof $TOOL.countriesData[continentId].countries[countryId].rates[rate.id].countryRates === typeof undefined) {
                $TOOL.countriesData[continentId].countries[countryId].rates[rate.id].countryRates = {};
            }
            $TOOL.countriesData[continentId].countries[countryId].rates[rate.id].countryRates[countryRate.id] = countryRate;
            starter
                .resolve();

            return starter.promise();
        },

        interpolateGeoZones: function(data, dataType) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            r$.each($TOOL.countriesData, function(continentId, continent) {
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

            $TOOL.countriesData[continentId].countries[countryId].geozone = geozone;
        },

        initVectorMap: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            $TOOL.map = new jvm.MultiMap({
                container: $TOOL.mapContainer,
                maxLevel: 1,
                main: $TOOL.configs.mainMapConfig,
                subMapsOptions: $TOOL.configs.subMapConfig,
                mapNameByCode: function(code, multiMap) {
                    code = $TOOL.countriesData[code].continentName;
                    return code + '_' + multiMap.defaultProjection;
                },
                mapUrlByCode: function(code, multiMap) {
                    code = $TOOL.countriesData[code].continentName;
                    return '../../js/coverageTool/jquery-jvectormap-' + code + '-' + multiMap.defaultProjection + '.js';
                }
            });
            starter
                .resolve();

            return starter.promise();
        },

        setDomElements: function($coverageToolDomElement) {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var initPrimaryDomPromise = starter
                .then(function() {
                    console.log('initPrimaryDom method.....');
                    return $TOOL.initPrimaryDom($coverageToolDomElement);
                })
                .done(function() {
                    console.log('initPrimaryDom done');

                });
            var buildContinentsDomPromise = initPrimaryDomPromise
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

            starter
                .resolve();

            return starter.promise();

        },
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

        buildContinentsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();

            var setContinentsDomPromise = starter
                .then(function() {
                    console.log('buildCountriesDom method.....');
                    return $TOOL.setContinentsDom();
                })
                .done(function() {
                    console.log('buildCountriesDom done');

                });
            var initNavigationPromise = setContinentsDomPromise
                .then(function() {
                    console.log('initNavigation method.....');
                    return $TOOL.initNavigation();
                })
                .done(function() {
                    console.log('initNavigation done');

                });

            starter
                .resolve();

            return starter.promise();
        },

        setContinentsDom: function() {
            var $TOOL = this;
            var starter = new r$.Deferred();
            r$.each($TOOL.countriesData, function(continentId, continent) {
                $TOOL
                    .setContinentDom(continent);
            });

            starter
                .resolve();

            return starter.promise();

        },

        setContinentDom: function(continent) {
            var $TOOL = this;

            var tabHtmlString =
                '<li class="strip_menu_tab__item item">' +
                '<a data-continent="' + continent.id + '" href="#' + continent.id + '">' + continent.name + '</a>' +
                '</li>';

            $TOOL
                .tabsContainer
                .append(tabHtmlString);
        },

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

        buildCountriesDom: function() {},

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
            var continentName = $TOOL.countriesData[continentCode].mapName;

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

            r$.each($TOOL.countriesData[continentCode].countries, function(index, country) {
                var currentOptionHtmlString = '<option value="' + country.id + '">' + country.name + '</option>';
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

            var $chosenCountry = r$("#" + countryCode);
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
                    });
            }
        },


        /*setDomCountry: function(country) {
            var $TOOL = this;


            var correctFlagName = country.flag_name.replace(/_/g, '-').toLowerCase();

            var countryHtmlString =
                '<div class="country_offers_block__container__country" data-country-id="' + country.id + '">' +
                '<div class="country_offers_block__container__country--flag col-xs-12 col-sm-2 col-md-2 col-lg-2">' +
                '<div class="country_offers_block__container-title">' + country.name + '</div>' +
                '<div class="country_offers_block__container-image">' +
                '<img src="../../img/flags/flag-' + correctFlagName + '.png" />' +
                '</div>' +
                '</div>' +
                '<div class="country_offers_block__container__country--rates col-xs-12 col-sm-10 col-md-10 col-lg-10">' +
                '<div class="country_offers_block__rates_divider--left">' +
                '<div class="country_offers_block__rates--title">Zona<br>geografica</div>' +
                '<div class="country_offers_block__rates--price">' + country.name + '</div>' +
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
                '<div class="country_offers_block__rates--price"> - </div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $TOOL
                .countriesContainer
                .append(countryHtmlString);
        }*/
    };

})(jQuery);
