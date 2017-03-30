;
(function(r$) {

    'use strict';

    r$(document)
        .ready(function() {

            var $sliderBlock = r$('.dashboard_block');
            var $tabsBlock = r$('.grey_strip__block__mainWrapper');
            var $plansBlock = r$('.blocco_strip_plans');


            PRODUCTSLIDER
                .initSlider($sliderBlock, $tabsBlock, $plansBlock, true, '000000000000008451');
        });

    var PRODUCTSLIDER = {
        deviceMode: true,
        container: false,
        tabsContainer: false,
        plansContainer: false,
        models: false,
        prices: false,
        colorsList: false,
        colorsListItems: false,
        memoriesList: false,
        memoriesListItems: false,
        plans: false,
        paymentRates: false,
        paymentRatesCombo: false,
        activePlan: false,
        activePaymentRate: false,
        activeModel: false,
        activePrice: false,
        activeColor: false,
        activeMemory: false,
        activePhoneGallery: false,
        activePhoneThumbs: false,
        acquireButton: false,
        /**
         * [initSlider - init function that sets slider dom objects
         * and optional default product from sap code]
         * @param  {[obj]} $sliderDomObject         [jQuery dom object for slider initialization]
         * @param  {[string]} defaultSelectedSap    [optional sap code to set default active product]
         * @return {[obj]}                          [jQuery slider object for chaining]
         */
        initSlider: function($sliderDomObject, $tabsDomObject, $plansDomObject, deviceMode, defaultSelectedSap) {
            var $SLIDER = this;

            $SLIDER
                .setSliderItems($sliderDomObject, $tabsDomObject, $plansDomObject, deviceMode);

            if (!defaultSelectedSap) {
                defaultSelectedSap = $SLIDER.setDefaultSelectedSap();
            }
            $SLIDER
                .setBySapCode(defaultSelectedSap);

            $SLIDER
                .bindTabs();

            return $SLIDER;
        },
        /**
         * [setDefaultSelectedSap - selects first 
         * available product and returns its sap code]
         *
         * @return {[string]}                          [sapCode]
         */
        setDefaultSelectedSap: function() {
            var $SLIDER = this;
            var firstSelectableProduct = $SLIDER.models[0];
            var defaultSelectedSap = r$(firstSelectableProduct).data().sap;

            return defaultSelectedSap;
        },
        /**
         * [getTabBySap - function that filters attribute tabs
         * based on sap code and return matching tab]
         * @param  {[string]} attribute                [name of the attribute to scan]
         * @param  {[string]} sapCode                  [sap code to match]
         * @return {[obj]}                             [DOM Object attribute tab matching sap code]
         */
        getTabBySap: function(attribute, sapCode) {
            var $SLIDER = this;
            return $SLIDER[attribute + 'ListItems'].filter(function() {
                var sapCodes = r$(this).data().sap.split(' ');
                return r$.inArray(sapCode, sapCodes) > -1;
            });
        },
        /**
         * [setBySapCode - Once obtained a default value
         * scans for attribute tabs related to the product
         * activating them]
         * @param {[string]} defaultSelectedSap [sap code to initialize]
         *
         * @return {[obj]}                      [Slider obj for chaining]
         */
        setBySapCode: function(defaultSelectedSap) {
            var $SLIDER = this;
            var $colorTab = $SLIDER.getTabBySap('colors', defaultSelectedSap);
            var $memoryTab = $SLIDER.getTabBySap('memories', defaultSelectedSap);

            $SLIDER
                .setSap('colors', $colorTab)
                .setSap('memories', $memoryTab);

            return $SLIDER;
        },
        /**
         * [setSliderItems - Caches slider internal dom objects
         * for future manipulation according to provided container]
         * @param {[obj]} $sliderDomObject  [Slider DOM Container]
         *
         * @return {[obj]}                  [Slider obj for chaining]
         */
        setSliderItems: function($sliderDomObject, $tabsDomObject, $plansDomObject, deviceMode) {
            var $SLIDER = this;

            $SLIDER.deviceMode = deviceMode;
            $SLIDER.container = $sliderDomObject;
            $SLIDER.plansContainer = $plansDomObject;
            $SLIDER.tabsContainer = $tabsDomObject;
            $SLIDER.tabs = $tabsDomObject.find('.tab_button');
            $SLIDER.plans = $SLIDER.plansContainer.find('.strip_plans');
            $SLIDER.models = $SLIDER.container.find('.phone_model');
            $SLIDER.prices = $SLIDER.container.find('.data-sap-price');
            $SLIDER.paymentRatesCombo = $SLIDER.container.find('.dashboard_block__paymentRow__container');
            $SLIDER.paymentRates = $SLIDER.container.find('.data-sap-payment');
            $SLIDER.colorsList = $SLIDER.container.find('.item_color');
            $SLIDER.colorsListItems = $SLIDER.colorsList.find('.dashboard_block__item');
            $SLIDER.memoriesList = $SLIDER.container.find('.item_memory');
            $SLIDER.memoriesListItems = $SLIDER.memoriesList.find('.dashboard_block__item');
            $SLIDER.acquireButton = $SLIDER.container.find('.action-acquista,.action-abbina');

            return $SLIDER;
        },
        /**
         * [setSap - Handler taking care of
         * setting the sap product from the provided
         * attribute tab object and context name]
         * @param {[string]} attribute  [attribute context name]
         * @param {[obj]} $thisTab      [tab dom object]
         *
         * @return {[obj]}              [Slider obj for chaining]
         */
        setSap: function(attribute, $thisTab) {
            var $SLIDER = this;

            if (!$thisTab.hasClass('inactive')) {
                var otherAttribute = '';
                var $attributeObjects = $SLIDER[attribute + 'ListItems'];
                if (attribute == 'colors') {
                    otherAttribute = 'memories';
                } else {
                    otherAttribute = 'colors';
                }
                var $otherAttributeObjects = $SLIDER[otherAttribute + 'ListItems'];

                if (!$thisTab.hasClass('active')) {
                    $SLIDER
                        .resetActiveTabs(attribute);

                    $thisTab
                        .addClass('active');

                    var attributeSaps = $thisTab.data().sap.split(' ');

                    $otherAttributeObjects
                        .each(function(i, cycledObject) {
                            var $cycledObject = r$(cycledObject);
                            var isSapPresent = false;
                            var otherSapCodes = $cycledObject.data().sap.split(' ');

                            r$.each(otherSapCodes, function(i, otherSapCode) {
                                if (otherSapCode != "") {
                                    r$.each(attributeSaps, function(i, sapCode) {
                                        if (sapCode == otherSapCode) {
                                            isSapPresent = true;
                                        }
                                        if (isSapPresent) {
                                            $cycledObject
                                                .removeClass('inactive');
                                        } else {
                                            $cycledObject
                                                .addClass('inactive');
                                        }
                                    });
                                }
                            });
                        });
                    if ($otherAttributeObjects.filter('.active').length == 0) {

                        $otherAttributeObjects
                            .not('.inactive')
                            .eq(0)
                            .addClass('active');
                    }
                    $SLIDER
                        .removeSlickGalleries()
                        .setAndInitActive();

                }
            }
            return $SLIDER;
        },
        /**
         * [resetActiveTabs description]
         * @param  {[string]} attribute [attribute context for tab reset]
         * 
         * @return {[obj]}              [Slider obj for chaining]
         */
        resetActiveTabs: function(attribute) {
            var $SLIDER = this;
            $SLIDER[attribute + 'ListItems']
                .filter('.active')
                .removeClass('active');

            return $SLIDER;
        },
        /**
         * [removeSlickGalleries description]
         * 
         * @return {[obj]}           [Slider obj for chaining]
         */
        removeSlickGalleries: function() {
            var $SLIDER = this;

            if ($SLIDER.activePhoneGallery && $SLIDER.activePhoneThumbs) {
                $SLIDER
                    .activePhoneThumbs
                    .slick('unslick');
                $SLIDER
                    .activePhoneGallery
                    .slick('unslick');
            }

            return $SLIDER;
        },
        /**
         * [setAndInitActive description]
         *
         * @return {[obj]}           [Slider obj for chaining]
         */
        setAndInitActive: function() {
            var $SLIDER = this;
            $SLIDER
                .setActiveTab()
                .setActiveModel()
                .setActiveModelGalleries()
                .initializeSlickGalleries()
                .setActivePrice($SLIDER.deviceMode);

            return $SLIDER;
        },
        /**
         * [setActiveTab description]
         *
         * @return {[obj]}           [Slider obj for chaining]
         */
        setActiveTab: function() {
            var $SLIDER = this;
            $SLIDER.activeColor = $SLIDER.colorsListItems.filter('.active');
            $SLIDER.activeMemory = $SLIDER.memoriesListItems.filter('.active');

            return $SLIDER;
        },
        /**
         * [setActiveModel description]
         *
         * @return {[obj]}           [Slider obj for chaining]
         */
        setActiveModel: function() {
            var $SLIDER = this;
            var colorSap = $SLIDER.activeColor.data().sap.split(' ');
            var memorySap = $SLIDER.activeMemory.data().sap.split(' ');
            var activeSap;

            r$.each(colorSap, function(i, colorSapCode) {
                if (colorSapCode != '') {
                    r$.each(memorySap, function(i, memorySapCode) {
                        if (colorSapCode == memorySapCode) {
                            activeSap = colorSapCode;
                        }
                    });
                }
            });

            var candidateModel = $SLIDER.models.filter(function() {
                var currentModelSap = r$(this).data().sap;
                return currentModelSap == activeSap;
            });

            var candidateGalleryContent = candidateModel.find('li');
            if (candidateGalleryContent.length == 0) {
                r$.each(colorSap, function(i, colorSapCode) {
                    var filteredModel = $SLIDER.models.filter(function() {
                        return r$(this).data().sap == colorSapCode;
                    });
                    candidateGalleryContent = filteredModel.find('li');
                    if (candidateGalleryContent.length > 0) {
                        $SLIDER.activeModel = filteredModel;
                        return false;
                    } else {

                        $SLIDER
                            .models
                            .each(function(i, model) {
                                var modelHasGallery = r$(model).find('li');
                                if (modelHasGallery.length > 0) {
                                    $SLIDER.activeModel = r$(model);
                                    return false;

                                }
                            });
                    }
                });
            } else {
                $SLIDER.activeModel = candidateModel;
            }

            $SLIDER
                .hideAndShowRelated('models');

            return $SLIDER;
        },
        /**
         * [hideAndShowRelated description]
         * @param  {[type]} category [description]
         */
        hideAndShowRelated: function(category) {
            var $SLIDER = this;
            var singularizedCategory = category.charAt(0).toUpperCase() + category.slice(1, category.length - 1);
            $SLIDER[category]
                .not($SLIDER['active' + singularizedCategory])
                .hide();
            $SLIDER['active' + singularizedCategory]
                .show();
            return $SLIDER;
        },
        /**
         * [setActiveModelGalleries description]
         *
         * @return {[obj]}           [Slider obj for chaining]
         */
        setActiveModelGalleries: function() {
            var $SLIDER = this;
            $SLIDER.activePhoneGallery = $SLIDER.activeModel.find('.phone_gallery');
            $SLIDER.activePhoneThumbs = $SLIDER.activeModel.find('.phone_thumbs');
            return $SLIDER;
        },
        /**
         * [setActivePrice description]
         *
         * @return {[obj]}           [Slider obj for chaining]
         */
        setActivePrice: function(deviceMode) {
            var $SLIDER = this;
            var colorSap = $SLIDER.activeColor.data().sap.split(' ');
            var memorySap = $SLIDER.activeMemory.data().sap.split(' ');

            var activeSap;
            r$.each(colorSap, function(i, colorSapCode) {
                if (colorSapCode != '') {
                    r$.each(memorySap, function(i, memorySapCode) {
                        if (colorSapCode == memorySapCode) {
                            activeSap = colorSapCode;
                        }
                    });
                }
            });

            if (deviceMode) {
                $SLIDER.activePaymentRate = $SLIDER.paymentRates.filter(function() {
                    var currentModelSap = r$(this).data().sap;
                    return currentModelSap == activeSap;
                });
                $SLIDER
                    .hideAndShowRelated('paymentRates');
            } else {
                $SLIDER.activePrice = $SLIDER.prices.filter(function() {
                    var currentModelSap = r$(this).data().sap;
                    return currentModelSap == activeSap;
                });
                $SLIDER
                    .hideAndShowRelated('prices');
            }

            $SLIDER.activePlan = $SLIDER.plans.filter(function() {
                var currentModelSap = r$(this).data().sap;
                return currentModelSap == activeSap;
            });

            $SLIDER
                .hideAndShowRelated('plans');

            $SLIDER
                .acquireButton
                .attr('data-sap', activeSap);

            return $SLIDER;
        },
        /**
         * [initializeSlickGalleries description]
         * 
         * @return {[obj]}           [Slider obj for chaining]
         */
        initializeSlickGalleries: function() {
            var $SLIDER = this;
            $SLIDER
                .activePhoneGallery
                .slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    fade: false,
                    asNavFor: $SLIDER.activePhoneThumbs
                });
            $SLIDER
                .activePhoneThumbs
                .slick({
                    slidesToShow: 4,
                    vertical: true,
                    slidesToScroll: 1,
                    asNavFor: $SLIDER.activePhoneGallery,
                    dots: false,
                    centerMode: false,
                    focusOnSelect: true,
                    responsive: [{
                        breakpoint: 480,
                        settings: {
                            vertical: false
                        }
                    }]
                });

            return $SLIDER;
        },
        /**
         * [bindTabs description]
         * 
         * @return {[obj]}           [Slider obj for chaining]
         */
        handleCombo: function(dataCombo) {
            var $SLIDER = this;
            if ($SLIDER.deviceMode) {
                $SLIDER
                    .paymentRatesCombo
                    .each(function() {
                        var currentRate = r$(this);
                        var currentRateData = currentRate.data().combo;
                        console.log(currentRateData);
                        console.log(dataCombo);
                        if (currentRateData == dataCombo) {
                            currentRate
                                .show();
                        } else {
                            currentRate
                                .hide();
                        }
                    });
            } else {
                
            }

            return $SLIDER;
        },
        /**
         * [bindTabs description]
         * 
         * @return {[obj]}           [Slider obj for chaining]
         */
        bindTabs: function() {
            var $SLIDER = this;
            $SLIDER
                .colorsListItems
                .click(function(e) {
                    e.preventDefault();
                    var $clickedTab = r$(this);

                    $SLIDER
                        .setSap('colors', $clickedTab);

                });

            $SLIDER
                .memoriesListItems
                .click(function(e) {
                    e.preventDefault();
                    var $clickedTab = r$(this);

                    $SLIDER
                        .setSap('memories', $clickedTab);

                });

            $SLIDER
                .tabsContainer
                .parent()
                .on("combo-change", function(e,dataCombo) {
                    
                    $SLIDER
                        .handleCombo(dataCombo);

                });

            $SLIDER
                .acquireButton
                .click(function(e) {
                    e.preventDefault();

                    addProduct();

                });

            return $SLIDER;
        }
    };

})(jQuery);
