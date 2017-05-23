(function(r$) {

    'use strict';

    r$(window)
        .resize(function() {
            clearTimeout($HEADER.resizeTimer);
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
                        r$('#country--List').selectpicker('val', code);
                        COVERAGETOOL.toggleCountry(code);
                    }
                },
            },
        },
        toolContainer: false,
        continentsData: {},
        resizeTimer: false,
        projection: "merc",
        isWorldMap: true,
        map: {},
        continentsNav: {},
        activeSlickNav: {},
        activeSlickSlider: {},
        initTool: function($coverageToolDomElement) {
            var $TOOL = this;

            $TOOL
                .setToolElements($coverageToolDomElement)
                .bindEvents()
                .initData();

            return $TOOL;
        },

        setToolElements: function($coverageToolDomElement) {
            var $TOOL = this;

            $TOOL.toolContainer = $coverageToolDomElement;
            $TOOL.tabsContainer = $TOOL.toolContainer.find('.block_coverage_tool__tabs__container').find('.slider_menu_tabs');
            $TOOL.tabs = $TOOL.tabsContainer.find('.strip_menu_tab__item');
            $TOOL.countriesContainer = $TOOL.toolContainer.find('.block_coverage_tool__filter__container');
            $TOOL.countriesList = $TOOL.countriesContainer.find('#country--list');
            $TOOL.accordionOperators = $TOOL.countriesContainer.find('input.accordionBox');
            $TOOL.showcaseContainer = $TOOL.toolContainer.find('.block_coverage_tool__offers__container');

            return $TOOL;
        },
        bindEvents: function() {
            var $TOOL = this;

            $TOOL
                .toolContainer
                .on({
                    'data-ready': function() {
                        $TOOL
                            .initMap()
                            .initSlickNav();
                    }
                });

            $TOOL
                .tabsContainer
                .on({
                    'init': function(slick) {
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
        },
        initData: function() {
            var $TOOL = this;

            $TOOL
                .extractData("continents")
                .extractData("countries");
            $TOOL
                .toolContainer
                .trigger("data-ready");

            return $TOOL;
        },
        extractData: function(dataType) {
            var $TOOL = this;
            r$
                .ajax({
                    method: "get",
                    url: "../../js/coverageTool/json/" + dataType + ".json"
                })
                .done(function(res) {
                    $TOOL
                        .interpolateData(res, dataType);
                });
            return $TOOL;
        },
        interpolateData: function(dataObject, dataType) {
            var $TOOL = this;
            switch (dataType) {
                case "continents":
                    $TOOL
                        .interpolateContinents(dataObject);
                    break;
                case "countries":
                    $TOOL
                        .interpolateCountries(dataObject);
                    break;
            }
            return $TOOL;
        },
        interpolateContinents: function(continentsDataObject) {
            var $TOOL = this;
            r$
                .each(continentsDataObject.continents, function(i, continent) {
                    $TOOL.continentsData[continent.name.toLowerCase()] = {
                        id: continent.id,
                        name: continent.name,
                        continentName: continent.name.toLowerCase(),
                        displayName: continent.name,
                        mapCode: continent.name.toLowerCase(),
                        mapName: continent.name.toLowerCase() + "_" + $COVERAGETOOL.projection,
                        countries: []
                    };
                    console.log($TOOL.continentsData[continent.name.toLowerCase()]);

                });
            return $TOOL;
        },
        interpolateCountries: function(countriesDataObject) {
            var $TOOL = this;
            r$
                .each(countriesDataObject.countries, function(i, country) {
                    if (country.continent_id !== null) {
                        r$.each($TOOL.continentsData, function(i, continent) {
                            if (continent.id == country.continent_id) {
                                var countryNameFormatted = country.name.toLowerCase().replace(/\s/g, "_").replace(/&amp;/g, "and").replace(/[\.,]+/g, "");
                                $TOOL.continentsData[continent.name.toLowerCase().replace(" ", "_")]
                                    .countries
                                    .push([countryNameFormatted, country.name]);
                            }
                        });
                    }
                });
            return $TOOL;
        },
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
            var mapsToResize = this.map.maps;
            $.each(mapsToResize, function() {
                this.updateSize();
            });
        },
        slickToMap: function(code, clickedTab) {
            var regionCode, regionName;
            regionCode = clickedTab.find('a').data().code;
            regionName = continentsData[regionCode].mapName;
            !this.isWorldMap && this.map.goBack();

            setTimeout(function() {
                COVERAGETOOL.map.drillDown(regionName, regionCode);
            }, 400);
            this.isWorldMap = false;
            this.buildSelect(regionCode);
            clickedTab.addClass('slick-current');
        },
        mapToSlick: function(code) {
            var targetSlickLink = this.continentsNav.find('a[data-code="' + code + '"]');
            var targetSlickSlide = targetSlickLink.closest('.slick-slide');
            var currentSlick = r$(this.continentsNav.selector + ' .slick-current');
            if (!currentSlick) {
                targetSlickSlide.addClass('slick-current');
                this.buildSelect(code);
            } else if (currentSlick != targetSlickSlide) {
                r$('.slick-current').removeClass('slick-current');
                targetSlickSlide.addClass('slick-current');
                this.buildSelect(code);
            }
            this.isWorldMap = false;
        },
        buildSelect: function(regionCode) {
            var select = r$('#country--List');
            var selectOption = select.find('option');
            selectOption.remove();
            var optionDefault = '<option value="none">--Seleziona--</option>';
            select.append(optionDefault);
            $.each(continentsData[regionCode].countries, function(index, val) {
                var value = val[0];
                var text = val[1];
                var option = '<option value="' + value + '">' + text + '</option>';
                select.append(option);
            });
            select.selectpicker('refresh');
        },
        toggleCountry: function(clickedCountry) {
            var tool, chosenCountry, blocksToHide;
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
        }
    };


})(jQuery);
