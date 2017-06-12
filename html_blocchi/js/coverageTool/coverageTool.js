/***************************
DUMMY DATA OBJECT END
***************************/

jQuery(function(r$) {
    "use strict";

    /*******************************************************
DUMMY DATA OBJECT
contains json objects
relative to continents
.mapName string used to compose map url
.mapCode ISO Code used to link map
.continentName lowercase name used to map code
.displayName name to be displayed in continents' label
.labelOffset offset coords for continents' label
*******************************************************/

    var continentsData = {
        africa: {
            mapName: 'africa_merc',
            mapCode: 'africa',
            continentName: 'africa',
            displayName: 'Africa',
            labelOffset: [0, -30],
            countries: [
                ['ZW', 'Zimbabwe'],
                ['MG', 'Madagascar'],
                ['NG', 'Nigeria']
            ]
        },
        americhe: {
            mapName: 'americhe_merc',
            mapCode: 'americhe',
            continentName: 'americhe',
            displayName: 'Americhe',
            labelOffset: [-290, 60],
            countries: [
                ['CA', 'Canada'],
                ['GL', 'Greenland'],
                ['usa', 'United States']
            ]
        },
        oceania: {
            mapName: 'oceania_merc',
            mapCode: 'oceania',
            continentName: 'oceania',
            displayName: 'Oceania',
            labelOffset: [-30, -5],
            countries: [
                ['AU', 'Australia'],
                ['NZ', 'New Zealand'],
                ['FJ', 'Fiji Islands'],
                ['PF', 'French Polynesia'],
                ['WS', 'Samoa'],
                ['PG', 'Papua New Guinea']
            ]
        },
        asia: {
            mapName: 'asia_merc',
            mapCode: 'asia',
            continentName: 'asia',
            displayName: 'Asia',
            labelOffset: [0, -30],
            countries: [
                ['CN', 'Cina'],
                ['VN', 'Vietnam'],
                ['IN', 'India'],
                ['JP', 'Japan']
            ]
        },
        europa: {
            mapName: 'europa_merc',
            mapCode: 'europa',
            continentName: 'europa',
            displayName: 'Europa',
            labelOffset: [0, 0],
            countries: [
                ['FR', 'France'],
                ['DE', 'Germany'],
                ['ES', 'Spain'],
                ['IT', 'Italy']
            ]
        }
    };


    r$(window)
        .resize(function() {
            COVERAGETOOL
                .updateMapSize();
        });
    r$(document)
        .ready(function() {
            COVERAGETOOL
                .initTool();
        });
    var COVERAGETOOL = {
        slickMenuTabsConfig: {
            centerMode: false,
            centerPadding: '0px',
            infinite: false,
            slidesToShow: 6,
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
                        return continentsData[code].displayName;
                    },
                    offsets: function(code) {
                        return continentsData[code].labelOffset;
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
                    r$('#country--List')
                        .selectpicker('val', code);
                    COVERAGETOOL
                        .toggleCountry(code);
                }
            },
        },
        isWorldMap: true,
        map: {},
        continentsNav: {},
        activeSlickNav: {},
        activeSlickSlider: {},
        initContinentsNavigation: function() {
            var continentsNavBlock = r$('.block_coverage_tool__tabs__container .slider_menu_tabs');
            continentsNavBlock.on('init', function(slick) {
                r$(this).find('.slick-current').removeClass('slick-current');
            });
            this.continentsNav = continentsNavBlock.slick(this.slickMenuTabsConfig);
        },
        initMap: function() {
            this.map = new jvm.MultiMap({
                container: r$('#world-map'),
                maxLevel: 1,
                main: this.mainMapConfig,
                subMapsOptions: this.subMapConfig,
                mapNameByCode: function(code, multiMap) {
                    code = continentsData[code].continentName;
                    return code.toLowerCase() + '_' + multiMap.defaultProjection;
                },
                mapUrlByCode: function(code, multiMap) {
                    code = continentsData[code].continentName;
                    return '../../js/coverageTool/jquery-jvectormap-' + code.toLowerCase() + '-' + multiMap.defaultProjection + '.js';
                },
            });
        },
        initTool: function() {
            this
                .initMap();
            this
                .initContinentsNavigation();
            this
                .bindContinentsNavigation();
            this
                .bindCountriesSelect();
            this
                .bindOperatorsAccordion();
        },
        updateMapSize: function() {
            var mapsToResize = this.map.maps;
            r$.each(mapsToResize, function() {
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
            r$.each(continentsData[regionCode].countries, function(index, val) {
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
        },
        bindContinentsNavigation: function() {
            var tool = this;
            r$('.strip_menu_tab__item').click(tool, function(e, code) {
                var clickedTab = r$(this);
                tool.slickToMap(code, clickedTab);
            });
        },
        bindCountriesSelect: function() {
            var tool = this;
            var countryList = r$('#country--List');
            countryList.on('changed.bs.select', [tool, countryList], function(e, clickedIndex) {
                var clickedCountry = countryList.find('option').eq(clickedIndex).val();
                var theMap = tool.map.history[tool.map.history.length - 1];
                if (clickedIndex != 0) {

                    theMap.clearSelectedRegions();
                    theMap.setSelectedRegions(clickedCountry);
                } else if (clickedIndex == 0) {
                    theMap.clearSelectedRegions();
                    tool.clearActiveCountry();
                }
            });
        },
        bindOperatorsAccordion: function() {
            r$('input.accordionBox').on('change', function() {
                r$('input.accordionBox').not(this).prop('checked', true);
            });
        }
    }
});
