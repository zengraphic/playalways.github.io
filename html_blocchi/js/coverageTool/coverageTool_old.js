(function(r$) {

    'use strict';

    r$(window)
        .resize(function() {
            clearTimeout($COVERAGETOOL.resizeTimer);
            $COVERAGETOOL.resizeTimer = setTimeout(function() {
                $COVERAGETOOL
                    .updateMapSize();

            }, 250);

        });

    r$(document)
        .ready(function() {
            var $coverageToolDomElement = r$('#coverage-tool');
            $COVERAGETOOL
                .initTool($coverageToolDomElement);
        });



    var $COVERAGETOOL = {
        configs: {
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
                            //return $COVERAGETOOL.continentsData[code].displayName;
                        },
                        offsets: function(code) {
                            return $COVERAGETOOL.continentsData[code].labelOffset;
                        }
                    }
                },
                onRegionTipShow: function(e, tip, code) {
                    return false;
                },
                onRegionSelected: function(e, code) {
                    $COVERAGETOOL.mapToSlick(code);
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
                        $COVERAGETOOL
                            .countriesList
                            .selectpicker('val', code);
                        $COVERAGETOOL
                            .toggleCountry(code);
                    }
                },
            },
        },
        toolContainer: false,
        tabsContainer: false,
        tabs: false,
        countriesContainer: false,
        countriesList: false,
        countries: false,
        accordionOperators: false,
        showcaseContainer: false,
        continentsData: {},
        resizeTimer: false,
        isWorldMap: true,
        map: {},
        initTool: function($coverageToolDomElement) {
            var $TOOL = this;

            var dataReady = $TOOL.initData();
            var elementsSet = $TOOL.setToolElements($coverageToolDomElement);

            r$
                .when(elementsSet,dataReady)
                .then(function() {
                    console.log();
                    r$
                        .each($TOOL.continentsData, function(i, continent) {
                            console.log(continent);
                        });
                });
            return $TOOL;
        },
        initData: function() {
            var $TOOL = this;
            var deferred = r$.Deferred();

            var interpolatedContinents = $TOOL.extractData("continents");
            var interpolatedCountries = $TOOL.extractData("countries");


            r$.when(interpolatedContinents, interpolatedCountries)
                .done(deferred.resolve());

            return deferred.promise();
        },
        extractData: function(dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            var dataFromSource = r$
                .ajax({
                    method: "get",
                    url: "../../js/coverageTool/json/" + dataType + ".json"
                });
            dataFromSource
                .done(function(dataObject) {
                    var interpolatedData = $TOOL.interpolateData(dataObject, dataType);
                    interpolatedData
                        .done(deferred.resolve());
                });
            return deferred.promise();
        },
        interpolateData: function(dataObject, dataType) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            switch (dataType) {
                case "continents":
                    var interpolatedContinents = $TOOL.interpolateContinents(dataObject);
                    interpolatedContinents
                        .done(deferred.resolve());
                    break;
                case "countries":
                    var interpolatedCountries = $TOOL.interpolateCountries(dataObject);
                    interpolatedCountries
                        .done(deferred.resolve());
                    break;
            }

            return deferred.promise();
        },
        interpolateContinents: function(continentsDataObject) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            r$
                .each(continentsDataObject.continents, function(i, continent) {
                    $TOOL.continentsData[continent.name.toLowerCase()] = {
                        id: continent.id,
                        name: continent.name,
                        continentName: continent.name.toLowerCase(),
                        displayName: continent.name,
                        mapCode: continent.name.toLowerCase(),
                        mapName: continent.name.toLowerCase() + "_" + $TOOL.configs.projection,
                        countries: []
                    };

                });

            deferred
                .resolve();
            return deferred.promise();
        },
        interpolateCountries: function(countriesDataObject) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            r$
                .each(countriesDataObject.countries, function(i, country) {
                    if (country.continent_id !== null) {
                        r$
                            .each($TOOL.continentsData, function(i, continent) {
                                if (continent.id == country.continent_id) {
                                    var countryNameFormatted = country.name.toLowerCase().replace(/\s/g, "_").replace(/&amp;/g, "and").replace(/[\.,]+/g, "");
                                    $TOOL.continentsData[continent.name.toLowerCase().replace(" ", "_")]
                                        .countries
                                        .push(
                                            [countryNameFormatted,
                                                country.name, {
                                                    prefix: country.prefix,
                                                    prefixItaly: country.prefix_italy,
                                                    isSmsAvailable: country.is_sms_available,
                                                    isMmsAvailable: country.is_mms_available,
                                                    isDataAvailable: country.is_data_available,
                                                    geoZone: country.geo_zone_id
                                                }
                                            ]
                                        );
                                }
                            });
                    }
                });

            deferred
                .resolve();
            return deferred.promise();
        },
        setToolElements: function($coverageToolDomElement) {
            var $TOOL = this;
            var deferred = r$.Deferred();
            $TOOL.toolContainer = $coverageToolDomElement;
            $TOOL.tabsContainer = $TOOL.toolContainer.find('.block_coverage_tool__tabs__container').find('.slider_menu_tabs');
            $TOOL.tabs = $TOOL.tabsContainer.find('.strip_menu_tab__item');
            $TOOL.countriesContainer = $TOOL.toolContainer.find('.block_coverage_tool__filter__container');
            $TOOL.countriesList = $TOOL.countriesContainer.find('#country--list');
            $TOOL.countries = $TOOL.countriesList.find('option');
            $TOOL.accordionOperators = $TOOL.countriesContainer.find('input.accordionBox');
            $TOOL.showcaseContainer = $TOOL.toolContainer.find('.block_coverage_tool__offers__container');
            deferred
                .resolve();

            return deferred.promise();
        },
        bindEvents: function() {
                var $TOOL = this;

                $TOOL
                    .tabsContainer
                    .on({
                        'init': function(slick) {
                            console.log(slick);
                            r$(this)
                                .find('.slick-current')
                                .removeClass('slick-current');
                        }
                    });

                $TOOL
                    .tabs
                    .on({
                        'click': function(e, code) {
                            var clickedTab = r$(this);
                            $TOOL
                                .slickToMap(code, clickedTab);
                        }
                    });

                $TOOL
                    .countriesList
                    .on({
                        'changed.bs.select': function(e, clickedIndex) {
                            var clickedCountry = $TOOL.countriesList.find('option').eq(clickedIndex).val();
                            var previousMap = $TOOL.map.history[$TOOL.map.history.length - 1];
                            if (clickedIndex != 0) {
                                previousMap
                                    .clearSelectedRegions()
                                    .setSelectedRegions(clickedCountry);

                            } else if (clickedIndex == 0) {
                                previousMap
                                    .clearSelectedRegions();
                                $TOOL
                                    .clearActiveCountry();
                            }
                        }
                    });

                $TOOL
                    .accordionOperators
                    .on({
                        'change': function() {
                            r$('input.accordionBox')
                                .not(this)
                                .prop('checked', true);
                        }
                    });

                return $TOOL;
            }
            /*
            ,
            initMap: function() {
                var $TOOL = this;
                $TOOL.map = new jvm.MultiMap({
                    container: r$('#world-map'),
                    maxLevel: 1,
                    main: $TOOL.configs.mainMapConfig,
                    subMapsOptions: $TOOL.configs.subMapConfig,
                    mapNameByCode: function(code, multiMap) {
                        code = $TOOL.continentsData[code].continentName;
                        return code + '_' + multiMap.defaultProjection;
                    },
                    mapUrlByCode: function(code, multiMap) {
                        code = $TOOL.continentsData[code].continentName;
                        return '../../js/coverageTool/jquery-jvectormap-' + code + '-' + multiMap.defaultProjection + '.js';
                    },
                });
                return $TOOL;
            },
            initSlickNav: function() {
                var $TOOL = this;

                $TOOL
                    .tabsContainer
                    .slick($TOOL.configs.slickMenuTabsConfig);

                return $TOOL;
            },
            updateMapSize: function() {
                var $TOOL = this;
                var mapsToResize = $TOOL.map.maps;
                r$
                    .each(mapsToResize, function() {
                        this
                            .updateSize();
                    });
                return $TOOL;
            },
            slickToMap: function(code, clickedTab) {
                var $TOOL = this;
                var regionCode, regionName;
                regionCode = clickedTab.find('a').data().code;
                regionName = $TOOL.continentsData[regionCode].mapName;
                !$TOOL.isWorldMap && $TOOL.map.goBack();

                setTimeout(function() {
                    $TOOL.map.drillDown(regionName, regionCode);
                }, 400);
                $TOOL.isWorldMap = false;
                $TOOL
                    .buildSelect(regionCode);
                clickedTab
                    .addClass('slick-current');
                return $TOOL;
            },
            mapToSlick: function(code) {
                var $TOOL = this;
                var targetSlickLink = $TOOL.tabs.find('a').filter(function() {
                    return r$(this).data().code == code;
                });

                var targetSlickSlide = targetSlickLink.closest('.slick-slide');
                var currentSlick = r$($TOOL.continentsNav.selector + ' .slick-current');
                if (!currentSlick) {
                    targetSlickSlide
                        .addClass('slick-current');
                    $TOOL
                        .buildSelect(code);
                } else if (currentSlick != targetSlickSlide) {
                    r$('.slick-current')
                        .removeClass('slick-current');
                    targetSlickSlide
                        .addClass('slick-current');
                    $TOOL
                        .buildSelect(code);
                }
                $TOOL.isWorldMap = false;
                return $TOOL;
            },
            buildSelect: function(regionCode) {
                var $TOOL = this;
                $TOOL
                    .countries
                    .remove();

                var countriesHtml = '<option value="none">--Seleziona--</option>';
                r$.each($TOOL.continentsData[regionCode].countries, function(index, val) {
                    countriesHtml += '<option value="' + val[0] + '">' + val[1] + '</option>';

                });
                $TOOL
                    .countriesList
                    .append(countriesHtml)
                    .selectpicker('refresh');
                return $TOOL;
            },
            toggleCountry: function(clickedCountry) {
                var $TOOL = this;
                var chosenCountry, blocksToHide;
                tool = this;
                chosenCountry = r$("#" + clickedCountry);
                r$('.activeCountry').slideUp("slow", function() {
                    r$(this).removeClass('activeCountry');
                });
                r$('.container_secondColumn.slick-slider').slick('unslick');
                r$('.showcase_bundle_block__slides.slick-slider').slick('unslick');
                if (clickedCountry != "none") {
                    tool.activeSlickNav = chosenCountry.find('.container_secondColumn');
                    tool.activeSlickSlider = chosenCountry.find('.showcase_bundle_block__slides');
                    chosenCountry.slideDown("slow", function() {
                        tool.activeSlickNav.slick(tool.slickOfferTabsConfig).slick('slickSetOption', 'asNavFor', tool.activeSlickSlider, true);
                        tool.activeSlickSlider.slick(tool.slickOfferSlideConfig).slick('slickSetOption', 'asNavFor', tool.activeSlickNav, true);
                        r$(this).addClass('activeCountry');
                    });
                }
                return $TOOL;
            },
            clearActiveCountry: function() {
                r$('.activeCountry').slideUp("slow", function() {
                    r$(this).removeClass('activeCountry');
                });
            },
            clearContinentsTab: function() {
                r$('.slick-current').removeClass('slick-current');
                this.clearActiveCountry();
            },
            clearCountriesSelect: function() {
                var select = r$('#country--List');
                var selectOption = select.find('option');
                selectOption.remove();
                var optionDefault = '<option value="none">--Seleziona--</option>';
                select.append(optionDefault);
                select.selectpicker('refresh');
            }*/
    };


})(jQuery);
