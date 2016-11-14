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

continentsData = {
    AF: {
        mapName: 'africa_merc',
        mapCode: 'AF',
        continentName: 'africa',
        displayName: 'Africa',
        labelOffset: [0, -30],
        countries: [
            ['ZW', 'Zimbabwe'],
            ['MG', 'Madagascar'],
            ['NG', 'Nigeria']
        ]
    },
    NA: {
        mapName: 'north_america_merc',
        mapCode: 'NA',
        continentName: 'north_america',
        displayName: 'North America',
        labelOffset: [-290, 60],
        countries: [
            ['CA', 'Canada'],
            ['GL', 'Greenland'],
            ['US', 'USA']
        ]
    },
    OC: {
        mapName: 'oceania_merc',
        mapCode: 'OC',
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
    AS: {
        mapName: 'asia_merc',
        mapCode: 'AS',
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
    EU: {
        mapName: 'europe_merc',
        mapCode: 'EU',
        continentName: 'europe',
        displayName: 'Europe',
        labelOffset: [0, 0],
        countries: [
            ['FR', 'France'],
            ['DE', 'Germany'],
            ['ES', 'Spain'],
            ['IT', 'Italy']
        ]
    },
    SA: {
        mapName: 'south_america_merc',
        mapCode: 'SA',
        continentName: 'south_america',
        displayName: 'South America',
        labelOffset: [0, -50],
        countries: [
            ['VE', 'Venezuela'],
            ['AR', 'Argentina'],
            ['BR', 'Brazil']
        ]
    }
};


/***************************
DUMMY DATA OBJECT END
***************************/
jQuery(function($) {
    COVERAGETOOL = {
        slickMenuTabsConfig: {
            centerMode: false,
            centerPadding: '0px',
            infinite: false,
            slidesToShow: 6,
            dots: false,
            variableWidth: true,
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
        slickOfferTabsConfig: {
            centerMode: false,
            centerPadding: '0px',
            infinite: false,
            initialSlide: 0,
            slidesToShow: 10,
            dots: false,
            draggable: false,
            variableWidth: true,
            focusOnSelect: true,
            arrows: false,
        },
        slickOfferSlideConfig: {
            centerMode: false,
            centerPadding: '0px',
            infinite: false,
            slidesToShow: 1,
            initialSlide: 0,
            dots: false,
            variableWidth: false,
            focusOnSelect: false,
            arrows: false,
            draggable: false,
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
                COVERAGETOOL.mapToSlick(code);
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
                    $('#country--List').selectpicker('val', code);
                    COVERAGETOOL.toggleCountry(code);
                }
            },
        },
        isWorldMap: true,
        map: {},
        continentsNav: {},
        activeSlickNav: {},
        activeSlickSlider: {},
        initContinentsNavigation: function() {
            var continentsNavBlock = $('.block_coverage_tool__tabs__container .slider_menu_tabs');
            continentsNavBlock.on('init', function(slick) {
                $(this).find('.slick-current').removeClass('slick-current');
            });
            this.continentsNav = continentsNavBlock.slick(this.slickMenuTabsConfig);
        },
        initMap: function() {
            this.map = new jvm.MultiMap({
                container: $('#world-map'),
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
            this.initMap();
            this.initContinentsNavigation();
            this.bindContinentsNavigation();
            this.bindCountriesSelect();
            this.bindOperatorsAccordion();
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
            var currentSlick = $(this.continentsNav.selector + ' .slick-current');
            if (!currentSlick) {
                targetSlickSlide.addClass('slick-current');
                this.buildSelect(code);
            } else if (currentSlick != targetSlickSlide) {
                $('.slick-current').removeClass('slick-current');
                targetSlickSlide.addClass('slick-current');
                this.buildSelect(code);
            }
            this.isWorldMap = false;
        },
        buildSelect: function(regionCode) {
            var select = $('#country--List');
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
            chosenCountry = $("#" + clickedCountry);
            $('.activeCountry').slideUp("slow", function() {
                $(this).removeClass('activeCountry');
            });
            $('.container_secondColumn.slick-slider').slick('unslick');
            $('.showcase_bundle_block__slides.slick-slider').slick('unslick');
            if (clickedCountry != "none") {
                tool.activeSlickNav = chosenCountry.find('.container_secondColumn');
                tool.activeSlickSlider = chosenCountry.find('.showcase_bundle_block__slides');
                chosenCountry.slideDown("slow", function() {
                    tool.activeSlickNav.slick(tool.slickOfferTabsConfig).slick('slickSetOption', 'asNavFor', tool.activeSlickSlider, true);
                    tool.activeSlickSlider.slick(tool.slickOfferSlideConfig).slick('slickSetOption', 'asNavFor', tool.activeSlickNav, true);
                    $(this).addClass('activeCountry');
                });
            }
        },
        clearActiveCountry: function() {
            $('.activeCountry').slideUp("slow", function() {
                $(this).removeClass('activeCountry');
            });
        },
        clearContinentsTab: function() {
            $('.slick-current').removeClass('slick-current');
            this.clearActiveCountry();
        },
        clearCountriesSelect: function() {
            var select = $('#country--List');
            var selectOption = select.find('option');
            selectOption.remove();
            var optionDefault = '<option value="none">--Seleziona--</option>';
            select.append(optionDefault);
            select.selectpicker('refresh');
        },
        bindContinentsNavigation: function() {
            var tool = this;
            $('.strip_menu_tab__item').click(tool, function(e, code) {
                var clickedTab = $(this);
                tool.slickToMap(code, clickedTab);
            });
        },
        bindCountriesSelect: function() {
            var tool = this;
            var countryList = $('#country--List');
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
            $('input.accordionBox').on('change', function() {
                $('input.accordionBox').not(this).prop('checked', true);
            });
        }
    }
});
