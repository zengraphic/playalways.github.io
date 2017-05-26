var r$ = jQuery.noConflict();

// end validate insert email
r$(document)
    .ready(function() {
        //HEADER.setSlider();

        //r$('.logo--wind a').attr('href', window.location.origin + '/' + window.location.pathname.split('/')[1] + '/');

        r$('body')
            .on({
                'keyup': function(event) {
                    var $input = $(this);
                    var value = $input.val();
                    var testCondition = new RegExp(/^[0-9]{1,10}$/);
                    if (!testCondition.test(value)) {
                        $input
                            .val(value.slice(0, -1));
                        return false;
                    } else {
                        return true;
                    }

                }
            }, 'input[type=tel]');
    });

/* end validate credentials */


r$(document)
    .ready(function() {


        //fixme: pulizia degli spazi bianchi creati da typo3 catalogo, correggere typo e rimuovere questa patch
        cleanWhiteSpaces(r$(".priceRow__price"));
        cleanWhiteSpaces(r$(".main_price"));
        cleanWhiteSpaces(r$(".image_block_display__price"));
    });
/* end Breadcrumbs mobile */

function clearCard(inputToClear, cvvToClear) {
    if (inputToClear) {
        r$(inputToClear)
            .removeClass('americane_cc diners_cc visa_cc maestro_cc masterc_cc general_cc aura_cc');

    }
    if (cvvToClear) {
        r$(cvvToClear)
            .removeClass('cvv_carta cvv_amex');
    }
}

function checkCard(card) {
    var c = card;
    var cl = parseInt(c.substr(c.length - 1));
    c = c.slice(0, -1);
    c = c.split("").reverse().join("");
    c = c.split("");
    var a = 2;
    var cm = [];
    for (var i = 0; i < c.length; i++) {
        if (a % 2 == 0) {
            var t = c[i] * 2;
            if (t > 9) {
                var t = (t - 9);
            }
            cm
                .push(t);
        } else {
            cm
                .push(parseInt(c[i]));
        }
        a++;
    }
    var f = 0;
    for (i = 0; i < cm.length; i++) {
        f += cm[i];
    }
    f = f + cl;
    if (f % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

function checkDate() {
    var minMonth = new Date().getMonth() + 1;
    var minYear = new Date().getFullYear();
    var month = parseInt(r$('.select_cc[title="Mese"] option:selected').text(), 10);
    var year = parseInt(r$('.select_cc[title="Anno"] option:selected').text(), 10);


    if (isNaN(month)) {
        console.log('seleziona anche il mese');
        r$('.select_mese .select_cc:first-child')
            .addClass('error');
        r$('.select_mese .select_cc + span')
            .addClass('error')
            .text('Seleziona il mese');
        return (false);


    } else {
        r$('.select_mese .select_cc:first-child')
            .removeClass('error');
        r$('.select_anno .select_cc:first-child')
            .removeClass('error');
        r$('.select_cc + span')
            .removeClass('error');

        if (year > minYear) {
            console.log('anno lontano');
            r$('.select_mese .select_cc:first-child')
                .removeClass('error');
            r$('.select_anno .select_cc:first-child')
                .removeClass('error');
            r$('.select_cc + span')
                .removeClass('error');
            return (true);


        } else if (year === minYear) {
            if (month > minMonth) {
                console.log('scadenza ok');
                r$('.select_mese .select_cc:first-child')
                    .removeClass('error');
                r$('.select_anno .select_cc:first-child')
                    .removeClass('error');
                r$('.select_cc + span')
                    .removeClass('error');
                return (true);


            } else {
                console.log('data antecedente');
                r$('.select_mese .select_cc:first-child')
                    .addClass('error');
                r$('.select_mese .select_cc + span')
                    .addClass('error')
                    .text('Il mese inserito non è corretto');

                return (false);
            }
        }
    }
}


//############################################################################
//############### INCLUSIONE JS DEI SINGOLI COMPONENTI #######################
//############################################################################

/**
 * DA QUI L'INIZIALIZZAZIONE CON LO SLICK CORRETTA PER  I COMPONENTI REALIZZATI
 */

r$(document)
    .ready(function() {
        if (r$('.slider__stripMenu').length) {
            r$('.slider__stripMenu')
                .slick({
                    centerMode: false,
                    dots: false,
                    arrows: false,
                    speed: 300,
                    swipeToSlide: true,
                    infinite: false,
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            centerMode: true,
                            centerPadding: '75px',
                            slidesToShow: 4,
                            initialSlide: 3,
                            slidesToScroll: 4,
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            centerMode: true,
                            centerPadding: '55px',
                            initialSlide: 1,
                            slidesToShow: 3,
                        }
                    }]
                });
        }
        if (r$('.slider__bundle').length) {
            r$('.slider__bundle')
                .slick({
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
        }
        if (r$('.slider__slidingNews').length) {
            r$('.slider__slidingNews')
                .slick({
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
        }
        if (r$('.slider__homeandlife').length) {
            r$('.slider__homeandlife')
                .slick({
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right_white.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left_white.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 979,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
        }
        if (r$('.service__bundle').length) {
            r$('.service__bundle')
                .slick({
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
        }
        if (r$('.slider__stripMenuText').length) {
            r$('.slider__stripMenuText')
                .slick({
                    centerMode: false,
                    dots: false,
                    arrows: false,
                    speed: 300,
                    swipeToSlide: true,
                    infinite: false,
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = $(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            centerMode: true,
                            centerPadding: '75px',
                            slidesToShow: 4,
                            initialSlide: 3,
                            slidesToScroll: 4,
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            centerMode: true,
                            centerPadding: '55px',
                            initialSlide: 1,
                            slidesToShow: 3,
                        }
                    }]
                });
        }
        if (r$('.blocco_visore.with_slider').length) {
            var visoreConSlider = r$('.blocco_visore.with_slider');
            var visori = visoreConSlider.find('.standard_block ');

            visoreConSlider
                .on({
                    'init': function() {
                        visori
                            .css({
                                'display': 'block'
                            });
                    }
                });

            visoreConSlider
                .slick({
                    dots: false,
                    arrows: false,
                    infinite: false,
                    speed: 100,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: false,
                    fade: true,
                    cssEase: 'ease',
                    adaptiveHeight: true
                });



            var menuPerVisore = visoreConSlider.next().find('.stripMenu');
            if (menuPerVisore.length == 1) {
                var emettitoreEvento = menuPerVisore.closest('.filter-showcase');
                emettitoreEvento
                    .on("combo-change", function(e, dataCombo) {
                        var activeTab = menuPerVisore.find('.tab_button.active');
                        var activeTabIndex = activeTab.index();
                        visoreConSlider
                            .slick('slickGoTo', activeTabIndex);
                        if (window.width < 768) {
                            debugger;
                            r$('html, body')
                                .animate({
                                    scrollTop: 0
                                }, 300);
                        }
                    });
            }
        }
        if (r$('.storeDetail_block .slider_menu_tabs').length) {
            r$('.storeDetail_block .slider_menu_tabs')
                .slick({
                    centerMode: false,
                    centerPadding: '0px',
                    slidesToShow: 4,
                    infinite: true,
                    dots: false,
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
                });
        }
        if (r$('.slider__bundle_ver2').length) {
            r$('.slider__bundle_ver2')
                .slick({
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                    prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                    dotsClass: 'slider__dots',
                    customPaging: function(slider, i) {
                        var thumb = r$(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    },
                    responsive: [{
                        breakpoint: 840,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    }, {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
        }
        if (r$('.slider__advantages').length) {
            r$('.slider__advantages')
                .slick({
                    responsive: [{
                        breakpoint: 9999,
                        settings: 'unslick'
                    }, {
                        breakpoint: 768,
                        settings: {
                            dots: true,
                            arrows: true,
                            infinite: false,
                            speed: 300,
                            adaptiveHeight: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                            prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                            dotsClass: 'slider__dots',
                            customPaging: function(slider, i) {
                                var thumb = r$(slider.$slides[i]).data('thumb');
                                return '<div class="slider__single"></div>';
                            }
                        }
                    }]
                });
        }
        if (r$('.dashboard_watch_block').length) {
            var $dashboardBlock = r$('.dashboard_watch_block');
            var $dashboardThumbs = $dashboardBlock.find('.phone_thumbs');
            var $dashboardGallery = $dashboardBlock.find('.phone_gallery');

            $dashboardThumbs
                .slick({
                    slidesToShow: 3,
                    variableHeight: false,
                    vertical: true,
                    slidesToScroll: 1,
                    asNavFor: '.phone_gallery',
                    dots: false,
                    arrows: false,

                    centerMode: false,
                    focusOnSelect: true,
                    responsive: [{
                        breakpoint: 480,
                        settings: {
                            vertical: false
                        }
                    }]
                });

            $dashboardGallery
                .slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    fade: false,
                    vertical: true,
                    swipe: false,
                    asNavFor: '.phone_thumbs'
                });
        }
    });



r$(document)
    .ready(function() {
        if (r$('.slider__offer').length) {

            r$(".offerBlock_slider__tabs--title")
                .on({
                    'click': offerBlockSwitchTab
                });

            r$(".offerBlock_slider__tabs--title.active")
                .trigger('click');
        }

        function offerBlockSwitchTab() {
            try {
                r$('.slider__offer')
                    .slick({
                        dots: true,
                        arrows: true,
                        infinite: false,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                        prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>",
                        dotsClass: 'slider__dots',
                        customPaging: function(slider, i) {
                            var thumb = r$(slider.$slides[i]).data('thumb');
                            return '<div class="slider__single"></div>';
                        },
                        responsive: [{
                            breakpoint: 840,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: true,
                                dots: true
                            }
                        }, {
                            breakpoint: 585,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }]
                    });

            } catch (e) {

                //se va la prima volta non è mai stato fatto
                //altrimenti non va la seconda volta (switch-tab)
            }

            var $tabOject = r$(this);
            var id = $tabOject.attr("id");
            r$(".offerBlock_slider__tabs--title")
                .removeClass("active");
            r$(".offerBlock_slider__container")
                .hide();
            r$(".offerBlock_slider__container." + id).show();
            $tabOject
                .addClass("active");
        }
    });



r$(document)
    .ready(function() {
        var windowsize = r$(window).width();
        var numberOfSingle;
        r$('.close_client_block')
            .click(function() {
                r$('.client_block__overlay')
                    .fadeOut();
                r$('.client_block__expand')
                    .animate({
                            top: '-50vw'
                        },
                        500,
                        function() {
                            r$('.client_block__expand--append')
                                .html('');
                            r$('.client_block__expand')
                                .hide();
                        });
            });
        r$('.client_block')
            .on({
                'click': function() {
                    var subContainer = r$(this).parents('.client_block__single__subContainer');
                    var textToShow = subContainer.html();
                    r$('.client_block__overlay')
                        .fadeIn();
                    r$('.client_block__expand--append')
                        .append(textToShow);
                    r$('html, body')
                        .animate({
                            scrollTop: r$("#scrollToTopClient").offset().top
                        }, 500);
                    r$('.client_block__expand')
                        .show()
                        .animate({
                            top: 0
                        }, 500);
                }
            }, '.client_block__single__readMore');
        r$('.client_block__single--vCard--description')
            .each(function(index) {
                var text = r$(this);
                textHeight = text.height();
                if (textHeight >= 79) {
                    text
                        .parents('.client_block__single__subContainer')
                        .append('<div class="client_block__single__readMore">Leggi tutto</div>');
                }
                text
                    .addClass('client_block__single--modifyHeight');
            });
    });

//r$(document).ready(function () {
//    r$("#ecommerce-shoulder-wind").click(function () {
//        r$('.mfp-bg, .mfp-wrap').css('height', '100%');
//        r$('base__popup.refill_block .container').css('height', '100%');
//    });
//});

r$(document)
    .ready(function() {
        var windowsize, fiveCardsContainers, singles, numberOfSingle, showMore;

        windowsize = r$(window).width();

        fiveCardsContainers = r$('.showcase_five_cards__container');

        if (fiveCardsContainers.length > 0) {
            fiveCardsContainers
                .each(function() {
                    singles = r$(this).find('.showcase_five_cards__single');

                    numberOfSingle = singles.length;

                    showMore = r$(this).find('.showcase_five_cards__showMore');

                    if ((numberOfSingle > 5) && (windowsize >= 768) ||
                        (numberOfSingle > 3) && (windowsize < 768)) {
                        showMore
                            .show();
                    }

                    showMore
                        .on({
                            'click': function() {
                                var clicked = r$(this);
                                clicked
                                    .hide()
                                    .parent()
                                    .find('.showcase_five_cards__single')
                                    .show();
                            }
                        });

                });
        }
    });

r$(document)
    .ready(function() {

        function openBlock(blockToMove, blockRight, blockLeft, blockButton) {
            placeholderPowermail();

            //$('.contactShow').removeClass('visibleShow');
            //$('.contactShow').addClass('visibleHidden');
            r$('.contact_info_block__overlay')
                .fadeIn();
            blockRight
                .addClass('visibleShow');
            blockToMove
                .animate({
                        "right": 0
                    },
                    "slow",
                    function() {
                        r$('.contactHide')
                            .addClass('visibleShow');
                        r$('.contactHide')
                            .removeClass('visibleHidden');
                    });
            blockButton
                .addClass('contact_open');
            blockToMove
                .addClass('contact_open');
        }

        function closeBlock(blockToMove, blockRight, blockLeft, blockButton) {
            r$('.contact_info_block__overlay')
                .fadeOut();
            r$('.contactHide')
                .addClass('visibleHidden');
            r$('.contactHide')
                .removeClass('visibleShow');
            blockToMove
                .animate({
                        "right": "-450px"
                    },
                    "slow",
                    function() {
                        blockToMove
                            .removeClass('contact_open');
                        blockButton
                            .removeClass('contact_open');
                        blockRight
                            .removeClass('visibleShow');
                        r$('.contactShow')
                            .addClass('visibleShow');
                        r$('.contactShow')
                            .removeClass('visibleHidden');
                        blockToMove
                            .animate({
                                "top": "20vh"
                            }, 300);
                    });
        }

        r$(".contact_info_block__item--contact")
            .click(function() {
                var blockToMove = r$(".contact_info_block__container");
                var blockRight = r$('.contact_info_block__container__right');
                var blockLeft = r$('.contact_info_block__container__left');
                var blockButton = r$('.contact_info_block__item--contact.contact_button');
                if (!blockToMove.hasClass('contact_open')) {
                    blockToMove
                        .animate({
                                "top": '122px',
                                "height": "calc(100vh - 122px)"
                            },
                            300,
                            function() {
                                openBlock(blockToMove, blockRight, blockLeft, blockButton);
                            });
                } else {
                    closeBlock(blockToMove, blockRight, blockLeft, blockButton);
                }
            });
    });

//strip menù text

//funzione per la gestione della ropz
function addRopz(obj) {
    var ropz = r$(obj).attr('data-ropz');

    if (ropz != "" && ropz != undefined) {
        var cookies = readCookies();
        Ember.instrument('ecommerce.add_to_cart', { 'productIds': [ropz], 'cookies': cookies });
        openShoulder();
    }
}

function isValidPhoneNumberBloccoRicarica() {
    var regex = /^[03][0-9]{8,11}$/g;
    var secure = r$("input[name=insert_number]").val();
    if (!isNumberWind(secure) && !regex.test(secure)) {
        r$(".base__input#insert_number")
            .addClass("error");
        r$("#error_messageBloccoInsert_number")
            .addClass("error");
        r$("#sendBloccoRicarica")
            .attr("disabled", true);
    } else {
        r$(".base__input#insert_number")
            .removeClass("error");
        r$("#error_messageBloccoInsert_number")
            .removeClass("error");
        r$("#sendBloccoRicarica")
            .attr("disabled", false);
    }

}

function checkNumberBloccoRicarica() {
    if ((r$('input[name=confirm_number]').val() == r$('input[name=insert_number]').val()) || r$('input[name=confirm_number]').val() == '') {
        r$(".base__input#confirm_number")
            .removeClass("error");
        r$("#error_messageBloccoConfirm_number")
            .removeClass("error");
        if (r$('input[name=confirm_number]').val() != '') {
            r$("#sendBloccoRicarica")
                .attr("disabled", false);
        } else {
            r$("#sendBloccoRicarica")
                .attr("disabled", true);
        }
    } else {
        r$(".base__input#confirm_number")
            .addClass("error");
        r$("#error_messageBloccoConfirm_number")
            .addClass("error");
        r$("#sendBloccoRicarica")
            .attr("disabled", true);
    }

}

r$(document)
    .ready(function() {
        function placeholderPowermail() {
            var $powermailFieldwrap = r$(".powermail_fieldwrap");
            $powermailFieldwrap
                .each(function() {
                    var current = r$(this);
                    var placeHolder = current.find('label').text();
                    current
                        .find('input,textarea')
                        .attr("placeholder", placeHolder);
                });

            r$('.powermail_input,.powermail_textarea')
                .focus(function() {
                    r$(this)
                        .removeAttr('placeholder');
                })
                .blur(function() {
                    if (r$(this).val() == '') {
                        var placeHolder = r$(this).closest('.powermail_fieldwrap').find('label').text();
                        r$(this)
                            .attr('placeholder', placeHolder);
                    }
                });
            r$(".powermail_reset")
                .click(function() {
                    $powermailFieldwrap
                        .each(function() {
                            var current = r$(this);
                            var placeHolder = current.find('label').text();
                            current.find('input, textarea')
                                .attr("placeholder", placeHolder);
                        });
                });
        }
        placeholderPowermail();
    });



r$(document)
    .ready(function() {
        r$('input.accordionBox')
            .on({
                'change': function() {
                    r$('input.accordionBox')
                        .not(this)
                        .prop('checked', true);
                }
            });
    });


//############################################################################
//############### INCLUSIONE JS DI CUSTOM2 #######################
//############################################################################

/**
 * Custom scri
 pts:
 * inputs, placeholder...
 */

r$(document)
    .ready(function() {
        r$('.base__input')
            .on({
                'focus': function() {
                    var $input = r$(this);
                    var placeholderText = $input.attr('placeholder');
                    $input
                        .data('placeholder', placeholderText)
                        .attr('placeholder', '');
                },
                'blur': function() {
                    var $input = r$(this);
                    var placeholderText = $input.data('placeholder');
                    $input
                        .attr('placeholder', placeholderText);
                }
            });

        var scrollableTimer;

        r$('html')
            .mouseover(function() {
                clearTimeout(scrollableTimer);
                scrollableTimer = setTimeout(function() {
                    r$(".base__scrollable")
                        .getNiceScroll()
                        .resize();
                }, 300);
            });
    });


r$(document)
    .ready(function() {
        r$('ul[data-role=accordion] li.title')
            .on({
                'click': function(e) {
                    if (r$(window).width() < 768) {
                        e.preventDefault();
                        var display = r$(this).siblings().eq(1).css('display');
                        r$('ul[data-role=accordion] li:not(.title)')
                            .slideUp();
                        if (display == 'none') {
                            r$(this)
                                .siblings()
                                .slideDown();
                        }
                    } else {
                        r$(this)
                            .siblings()
                            .slideDown();
                    }
                }
            });

        var resizeTimer;
        r$(window)
            .on({
                'resize': function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        if (r$(window).width() >= 768) {
                            r$('ul[data-role=accordion] li.title')
                                .siblings()
                                .show();
                        } else {
                            r$('ul[data-role=accordion] li.title')
                                .siblings()
                                .hide();
                        }
                    }, 300);

                }
            });

    });

/* Validation number (Ricarica) - not affect placeholder */
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/g;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
/* end validation number */

function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

/* validate credentials */

// validate insert phone
r$(document)
    .ready(function() {
        var input = r$("#shoulderBox input");
        var boton = r$("#shoulderBox button");
        input
            .on({
                'keyup': function() {
                    if (r$(this).val().length >= 7) {
                        boton
                            .removeAttr('disabled');
                    } else {
                        boton
                            .attr('disabled', '');
                    }
                }
            });
    });
// end validate insert phone

// validate insert email
r$(document)
    .ready(function() {
        var input = r$("#shoulderBox input");
        var boton = r$("#shoulderBox button");

        input
            .on({
                'keyup': function() {
                    if (!ValidateEmail(input.val())) {
                        console.log("Invalid email address.");
                        boton
                            .attr('disabled', '');
                    } else {
                        boton
                            .removeAttr('disabled');
                    }
                }
            });
    });


// validate insert code > 4 digit
r$(document)
    .ready(function() {
        var input = r$("#shoulderBox input");
        var boton = r$("#shoulderBox button");
        input
            .on({
                'keyup': function() {
                    var valLength = r$(this).val().length;
                    if (valLength >= 4) {
                        boton
                            .removeAttr('disabled');
                    } else {
                        boton
                            .attr('disabled', '');
                    }
                }
            });
    });
// end validate insert code > 4 digit

// validate inputs passwords
r$(document)
    .ready(function() {
        var winput = r$("#shoulderBox input.wPass");
        var cinput = r$("#shoulderBox input.cPass");
        var boton = r$("#shoulderBox button");
        cinput.on({
            'keyup': function() {
                if ((winput.val()) == cinput.val()) {
                    boton
                        .removeAttr('disabled');
                } else {
                    boton
                        .attr('disabled', '');
                }
            }
        });
    });
// end validate inputs passwords

/* end validate credentials */


r$(document)
    .ready(function() {
        /* Breadcrumbs mobile */
        var breadcums_action = function() {
            r$('.base__breadcrumbs')
                .each(function() {
                    var liItems = r$(this);
                    var Sum = 0;

                    if (liItems.children('li').length >= 1) {
                        r$(this)
                            .children('li')
                            .each(function(i, e) {
                                Sum += r$(e).outerWidth(true);
                            });
                        r$(this)
                            .width(Sum + 20);
                    }
                });
        };
        var scrollTimer;

        r$(window)
            .resize(function() {

                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function() {
                    if (r$(".base__scrollable2").length > 0) {
                        breadcums_action();
                        r$(".base__scrollable2")
                            .getNiceScroll(0)
                            .doScrollLeft(350, 500);
                    }
                }, 300);
            });

    });
/* end Breadcrumbs mobile */

/* Multiple actions with ready function dependece */
r$(document)
    .ready(function() {
        /*Configurazione*/
        r$('#action_c1')
            .click(function() {
                r$('.action_c1')
                    .fadeIn("slow");
            });
        r$('#action_1')
            .click(function() {
                r$('#action_1-1')
                    .fadeIn("slow");
            });

        /* if access in Mac, inject class to body to resolve bug safari */
        if (navigator.platform == "MacIntel") {
            r$("body")
                .addClass("mac");
        }
        /* end detect Mac */

        /* action map */
        r$('.check_cont_action, .close_checkcont')
            .click(function() {
                r$('.check_cont')
                    .slideToggle('fast');
            });

        /*sostenibilita*/
        r$('.sostebilita_list li a')
            .click(function() {
                r$('.sostebilita_list li a')
                    .removeClass('active_btn');
                r$(this)
                    .addClass('active_btn');
                r$(this)
                    .parent()
                    .find(".second_list")
                    .slideToggle("slow");
            });

        /* assitence */
        r$('.cont__answer ul a')
            .click(function() {
                r$(this)
                    .each(function() {
                        var destination = r$(this).attr("href");
                        r$(destination)
                            .fadeIn(800);
                        r$(this)
                            .parent()
                            .parent()
                            .parent()
                            .css('display', 'none');
                    });
            });

        /* cookies action */
        r$('.btn__close_c')
            .click(function() {
                r$('#cookies')
                    .fadeOut("slow");
            });

        /* checkbox confirmation email action*/
        r$('#emailnotification')
            .click(function() {
                r$('.email_confirmation')
                    .slideToggle(100);
            });

        /* slider products */
        r$('.bxslider')
            .bxSlider({
                pagerCustom: '#bx-pager'
            });
        r$('.base__scrollable')
            .css({
                'overflow': 'overlay'
            });
        r$('.detail li')
            .click(function() {
                r$(this)
                    .addClass("active_action")
                    .find(".cont_detail")
                    .fadeIn("slow")
                    .siblings()
                    .removeClass("active_action");
            });

        r$('.security_cc')
            .click(function() {
                r$(".tooltip")
                    .css({
                        "display": "none"
                    });
            });
        r$('.base__input')
            .click(function() {
                r$(".tooltip")
                    .css({
                        "display": "none"
                    });
            });
        r$('.btn-alert')
            .click(function() {
                r$(".box__alert")
                    .fadeIn("xslow");
            });
        r$('.btn-alert_out')
            .click(function() {
                r$(".box__alert")
                    .fadeOut("xslow");
            });
        r$('.tooltip100')
            .click(function() {
                r$(".tooltip")
                    .css({
                        "display": "none"
                    });
            });
        //close dialog squadra
        r$('.btn_close')
            .click(function() {
                r$(".tab-pane")
                    .fadeOut("slow");
                r$(".squadra__content-data")
                    .removeClass("active");
                r$(".squadra__content-data a")
                    .removeAttr('aria-expanded');
                r$(".sostebilita_dialog")
                    .fadeOut("xshow");
            });
        r$('#scopri_test')
            .click(function() {
                r$(".sostebilita_dialog")
                    .fadeIn("xshow");
            });
        r$('.btn_close')
            .click(function() {
                r$(".sostebilita_dialog")
                    .fadeOut("xshow");
            });

        //setTimeout(function(){
        r$('.responsive')
            .slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                adaptiveHeight: true,
                responsive: [{}, {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        r$('.responsive2')
            .slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });

        // Enabled buttom Ricarica
        // r$('.name_cc, .number_cc, .security_cc').keyup(function() {
        //     if (r$('.name_cc').val() != '' && r$('.number_cc').val() != '' && r$('.security_cc').val() != '') {
        //         r$('.btn_refil').removeAttr('disabled');
        //     } else {
        //         r$('.btn_refil').attr('disabled');
        //     }
        // });

        // Position Footer Bottom
        var window_height = r$(window).height();
        var page_height = r$('html').height();
        // If the content is small, the footer stays at the bottom
        if (page_height < window_height) {
            r$('#footer')
                .css({
                    'position': 'absolute',
                    'bottom': 53,
                    'z-index': 5
                });
        }

    });

// animation to load timiline in nostra storia
r$(document)
    .ready(function() {
        // var ScrollReveal;
        if (typeof ScrollReveal === 'undefined') {} else {
            window.sr = ScrollReveal();
            //config
            sr
                .reveal('.reveal-left', {
                    duration: 500,
                    origin: 'left',
                    distance: '20%',
                    delay: 0,
                    opacity: 0,
                    scale: 0,
                    easing: 'ease',
                    reset: true,
                    useDelay: 'always',
                    viewFactor: 0.2,
                    viewOffset: {
                        top: 200,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                })
                .reveal('.reveal-right', {
                    duration: 500,
                    origin: 'right',
                    distance: '20%',
                    delay: 0,
                    opacity: 0,
                    scale: 0,
                    easing: 'ease',
                    reset: true,
                    useDelay: 'always',
                    viewFactor: 0.2,
                    viewOffset: {
                        top: 200,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                })
                .reveal('.tl-circ, .tldate', {
                    duration: 500,
                    origin: 'bottom',
                    distance: '5px',
                    delay: 0,
                    opacity: 0,
                    scale: 0,
                    easing: 'ease',
                    reset: true,
                    useDelay: 'always',
                    viewFactor: 0.2,
                    viewOffset: {
                        top: 200,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                });
        }

    });

//nasconde serve aiuto per virtual agent
r$(document)
    .ready(function() {
        r$(".top a.btn_sa")
            .hide();
    });


//filter.js


//############### INCLUSIONE JS SEARCH #######################


;
(function(r$) {
    'use strict';

    var SEARCHBAR = {
        obj_nicescroll: {
            cursorcolor: "#f48135",
            cursorwidth: "10px",
            cursorborder: "0",
            background: "#e6e9ed",
            spacebarenabled: false,
            horizrailenabled: true,
            autohidemode: false,
            zindex: 1100
        },
        obj_slickslider: {
            centerMode: false,
            centerPadding: '0px',
            slidesToShow: 5,
            infinite: false,
            dots: false,
            arrows: false,
            variableWidth: true,
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
        obj_searchPopup: {
            type: 'inline',
            mainClass: 'mfp-fade mfp-search',
            // closeOnContentClick: true,
            midClick: true,
            alignTop: true,
            showCloseBtn: false,
            focus: '.block-search__search_bar__input',
            removalDelay: 350,
            callbacks: {

                open: function() {

                    if (window.outerWidth <= 768) {

                        r$('.mfp-bg,.mfp-wrap')
                            .css({
                                'height': 'calc(100% - 123px)',
                                'top': '123px',
                                'bottom': 0,
                                'position': 'fixed'
                            });
                        r$(document)
                            .scrollTop(150);

                    } else {
                        r$(document)
                            .scrollTop(0);
                    }


                    r$('html')
                        .css({
                            'overflow': 'hidden'
                        });
                    var $blockSearch = r$('.block-search');

                    $blockSearch
                        .on({
                            'keyup': function(e) {
                                var $self = r$(this);
                                if ($self.val() != "") {
                                    r$('.block-search__results__container')
                                        .removeClass('hidden');
                                    if (e.which == 13) {
                                        window.location.href = '/risultati_della_ricerca/?q=' + r$("#short_gsa_search_box").val();

                                    }
                                } else if ($self.val() == "") {
                                    r$('.block-search__results__container')
                                        .addClass('hidden');
                                }
                            }
                        }, '.block-search__search_bar__input')
                        .on({
                            'click': function() {
                                var $self = r$(this);
                                var $input = $self.prevAll('.block-search__search_bar__input');
                                var inputVal = $input.val();

                                if (inputVal != "") {
                                    window.location.href = '/risultati_della_ricerca/?q=' + r$("#short_gsa_search_box").val();
                                }
                            }
                        }, '.block-search__search_bar__hint')
                        .on({
                            'click': function() {
                                var $self = r$(this);
                                var $input = $self.prevAll('.block-search__search_bar__input');
                                $input
                                    .val("")
                                    .focus()
                                    .keyup();
                            }
                        }, '.block-search__search_bar__resetter');
                },
                beforeClose: function() {
                    r$('.block-search__search_bar__input')
                        .val('')
                        .change();
                    r$('.block-search__results__container')
                        .addClass('hidden');

                },
                close: function() {
                    r$('.mfp-bg,.mfp-wrap,.mfp-container')
                        .css({
                            'height': '',
                            'bottom': '',
                            'position': ''
                        });

                    r$(document)
                        .scrollTop(0);
                    r$('html').css({
                        'overflow': ''
                    });


                }
            }
        },
        initSearch: function() {
            r$('.block-full_search .slider_menu_tabs')
                .slick(SEARCHBAR.obj_slickslider);

            r$('.base__popup-link--search')
                .magnificPopup(SEARCHBAR.obj_searchPopup);
        }
    };

    r$(document)
        .ready(function() {
            SEARCHBAR
                .initSearch();
        });
})(jQuery);


//############### END INCLUSIONE JS SEARCH #######################


//############### END INCLUSIONE JS SCHEDA NEGOZIO #######################

r$(document)
    .ready(function() {

        r$('.strip_menu_tab__item a')
            .on({
                'click': function(event) {
                    event
                        .preventDefault();
                    var currentObject = r$(this);
                    var currentAttrValue = currentObject.attr('href');
                    var $targetTab = r$('.strip_menu_tab__targetTab');
                    // mostra/nascondi tabs
                    $targetTab
                        .fadeOut('fast');
                    $targetTab
                        .find(currentAttrValue)
                        .fadeIn('fast');

                    // cambia classe attiva
                    currentObject
                        .parent('li')
                        .addClass('tab_active')
                        .siblings()
                        .removeClass('tab_active');
                    r$(window)
                        .resize();

                }
            });

        var scrollTimer;

        r$(window)
            .on({
                'scroll': function() {
                    clearTimeout(scrollTimer);
                    scrollTimer = setTimeout(function() {
                        var $shopCanvas = r$('#shop_canvas');
                        var scrollTop = r$(window).scrollTop();
                        if (scrollTop > 30) {
                            $shopCanvas
                                .stop()
                                .animate({
                                    height: '0px'
                                }, 200);
                        } else {
                            $shopCanvas
                                .stop()
                                .animate({
                                    height: '300px'
                                }, 200);
                        }
                    }, 300);
                }
            });
    });
//############### END INCLUSIONE JS SCHEDA NEGOZIO #######################


// ########### funzioni utili a tutto il sito

function GetParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//JS VISORE PICCOLO

r$(document)
    .ready(function() {});

//JS CHECK COPERTURA

r$(document)
    .ready(function() {
        r$('.with_number')
            .click(function(event) {
                event
                    .preventDefault();
                var $additionalForm = r$(this).siblings('.coverage_form__additional_form');
                $additionalForm
                    .removeClass('covered')
                    .addClass('uncovered');
            });
        r$('.without_number')
            .click(function(event) {
                event
                    .preventDefault();
                var $additionalForm = r$(this).closest('.coverage_form__additional_form');
                $additionalForm
                    .removeClass('uncovered')
                    .addClass('covered');
            });
        r$('#verificaCopertura .bootstrap-select')
            .on('changed.bs.select', function(e) {
                document.getElementById('comune').placeholder = 'Comune';
                document.getElementById('indirizzoEsteso').placeholder = 'Indirizzo';
                document.getElementById('civico').placeholder = 'N.';
                activateIndirizzoComune('provincia');
            });
        r$('.coverage_form .grouptel')
            .on({
                'focus': function() {
                    if (this.value == this.title) {
                        this.value = '';
                    }
                },
                'blur': function() {
                    if (this.value == '') {
                        this.value = this.title;
                    }
                }
            });
    });


/*
 DOUBLEFILTER
 */

var filterDefault = '';

r$(document)
    .ready(function() {

        var filterLeft = GetParameterByName('fl');
        var filterRight = GetParameterByName('fr');

        filterDefault = ((filterLeft == null) ? "" : filterLeft) + " " + ((filterRight == null) ? "" : filterRight);
        filterDefault = filterDefault.trim();


        initDoubleFilter(".filter-showcase", filterDefault);

    });

var doubleFilterIstasnces = [];

function initDoubleFilter(className, filterDefault) {

    r$(className).each(function(index, value) {

        var filterActive = extractFilterActive(value);

        var dbfilter = new DOUBLEFILTER()

        if (filterActive == "") {
            dbfilter.initFilter(r$(value), filterDefault, true, true);
        } else {
            dbfilter.initFilter(r$(value), filterActive, true, true);
        }

        doubleFilterIstasnces
            .push(dbfilter);
    });

}

function extractFilterActive(filter) {

    //estrazione
    var filters = r$(filter).find(".tab_button.active");
    var filterString = "";

    //controlliamo il limite di 2 filtri
    for (i = 0;
        (i < filters.length && i < 2); i++) {
        filterString += r$(filters).attr('data-filter') + " ";
    }

    //pluiamo
    filterString = filterString.trim();

    //rimuovo l'attivo perchè gestsce tutto doublefilter
    r$(filters).removeClass('active');

    return filterString;
}


function DOUBLEFILTER() {

    this.container = false;
    this.cardContainers = false;
    this.activeCardContainer = false;
    this.showMore = false;
    this.tabs = false;
    this.cards = false;
    this.showMoreOn = false;
    this.isLocked = false;
    this.filters = [];
    this.resizeTimer = false;
    this.slickConfig = {
        responsive: [{
            breakpoint: 9999,
            settings: 'unslick'
        }, {
            breakpoint: 768,
            settings: {
                dots: false,
                arrows: true,
                infinite: false,
                speed: 300,
                adaptiveHeight: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: "<img class='slider__navigation right__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_right.png'>",
                prevArrow: "<img class='slider__navigation left__arrow' src='/fileadmin/Img/ContentElements/icons-interface/slider_arrow_left.png'>"
            }
        }]
    };
    this.initFilter = function($filterDOMObject, filters, isLocked, showMore) {
        var $FILTER = this;
        $FILTER
            .setFilterItems($filterDOMObject, isLocked, showMore)
            .bindFilters();

        if (!filters) {
            var $firstTabs = $FILTER.tabs.filter(':first-child');
            $firstTabs
                .each(function() {
                    var $currentTab = r$(this);
                    $currentTab
                        .click();
                });
        } else {
            var filtersArray = filters.split(' ');
            $FILTER
                .setInitialTabs(filtersArray);
        }

        return $FILTER;
    };
    this.setInitialTabs = function(filtersArray) {
        var $FILTER = this;

        r$.each(filtersArray, function(i, filterVal) {
            $FILTER
                .tabs
                .each(function() {
                    var cycledTab = r$(this);
                    var cycledTabFilter = cycledTab.data().filter;
                    if (cycledTabFilter == filterVal) {
                        cycledTab
                            .trigger('click');
                    }
                });
        });
        return $FILTER;
    };
    this.setFilterItems = function($filterDOMObject, isLocked, showMore) {
        var $FILTER = this;

        $FILTER.container = $filterDOMObject;
        $FILTER.showMore = $FILTER.container.find('div[class*="__showMore"]');
        if (showMore) {
            $FILTER.showMoreOn = showMore;

            $FILTER
                .showMore
                .each(function() {
                    var currentShowMore = r$(this);
                    if (currentShowMore.siblings().length < 4) {
                        currentShowMore
                            .hide();
                    }
                });
            $FILTER.cards = $FILTER.container.find('.card_item');
        } else {


        }
        $FILTER.tabs = $FILTER.container.find('.tab_button');

        $FILTER.cardContainers = $FILTER.container.find('.tab_cards__container');
        $FILTER.isLocked = (isLocked == undefined) ? false : isLocked;

        return $FILTER;
    };
    this.bindFilters = function() {
        var $FILTER = this;

        r$(window)
            .on({
                'resize': function() {
                    clearTimeout($FILTER.resizeTimer);
                    $FILTER.resizeTimer = setTimeout(function() {
                        if ($FILTER.showMoreOn) {
                            var activeSlick = r$('.tab_cards__container:visible');
                            if (window.width < 768) {
                                if (!activeSlick.hasClass('slick-initialized')) {
                                    activeSlick
                                        .slick($FILTER.slickConfig);
                                }
                            } else {
                                if (activeSlick[0].slick) {
                                    if (!activeSlick[0].slick.unslicked) {
                                        activeSlick
                                            .slick('unslick');
                                    }
                                }
                            }
                        }

                    }, 300);
                }
            });


        if ($FILTER.showMoreOn) {
            $FILTER
                .showMore
                .on({
                    'click': function() {

                        if (r$(this).find("a").length == 0) {
                            var $clickedShowMore = r$(this);

                            var $relatedCards = $clickedShowMore.parents('.tab_cards__container').find('.card_item');
                            $relatedCards
                                .filter(':hidden')
                                .show();
                            $clickedShowMore
                                .hide();
                        }
                    }
                });
        }
        $FILTER
            .tabs
            .on({
                'click': function(event) {
                    event
                        .preventDefault();
                    var $clickedTab = r$(this);
                    if (!$clickedTab.is('.disabled')) {
                        $FILTER
                            .handleClickedTab($clickedTab);
                    }

                }
            });

        return $FILTER;
    };
    this.handleClickedTab = function($clickedTab) {
        var $FILTER = this;


        $FILTER
            .handleCards($clickedTab);


        return $FILTER;
    };
    this.handleCards = function($cardFilterTab) {
        var $FILTER = this;

        if (!$cardFilterTab.hasClass('active')) {
            var $activeSibling = $cardFilterTab.siblings().filter('.active');
            var cardFilter = $cardFilterTab.data().filter;
            if ($activeSibling.length > 0) {
                $activeSibling
                    .removeClass('active');
                var filterToClean = $activeSibling.data().filter;
                /*$FILTER.filters = $.grep($FILTER.filters, function(currentFilter) {
                 return filterToClean != currentFilter;
                 });*/
                r$.each($FILTER.filters, function(i, filter) {
                    if (filter == filterToClean) {
                        $FILTER.filters[i] = cardFilter;
                    }
                });

            } else {
                $FILTER
                    .filters
                    .push(cardFilter);

            }
            $cardFilterTab
                .addClass('active');


            $FILTER
                .applyFilter();
        }
        return $FILTER;
    };
    this.applyFilter = function() {
        var $FILTER = this;

        r$.each($FILTER.cardContainers, function() {
            var $cardsContainer = r$(this);
            var cardsContainerData = $cardsContainer.data().combo;
            var filtersData = $FILTER.filters.join(' ');
            if (cardsContainerData == filtersData) {
                $cardsContainer
                    .show(function() {
                        if (window.width < 768) {
                            r$(this)
                                .slick($FILTER.slickConfig);
                        }
                    });

                $cardsContainer
                    .parent()
                    .trigger("combo-change", [filtersData]);

            } else {
                if ($cardsContainer.is(':visible')) {
                    var $relatedCards = $cardsContainer.find('.card_item');
                    if ($FILTER.showMoreOn) {

                        var $relatedShowMore = $cardsContainer.find('div[class*="__showMore"]');
                        $relatedCards
                            .each(function(i) {
                                var $relatedCard = r$(this);
                                if (i >= 3) {
                                    $relatedCard
                                        .hide();
                                }
                            });
                        if ($relatedShowMore.siblings().length > 3) {
                            $relatedShowMore
                                .show();
                        }

                    } else {

                    }

                }
                $cardsContainer
                    .hide(function() {
                        if ($cardsContainer.hasClass('.slick-initialized')) {
                            $cardsContainer
                                .slick('unslick');
                        }
                    });
            }
        });
        return $FILTER;
    };
}

function cleanWhiteSpaces($domElementCollection) {
    $domElementCollection
        .each(function() {
            var $currentElement = r$(this);
            var elementContent = $currentElement.text();
            elementContent = elementContent.replace(/\s+/g, '');
            if (elementContent == ' ') {
                elementContent = '';
            }
            $currentElement
                .text(elementContent);
        });

}


function trovaCookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;
    // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split('=');

        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}


/***
 * <!-- GESTIONE SCROLL
 */

var attachedToMenu = false;
var scollableEvent = true;

r$(window)
    .load(function() {
        var hash = window.location.hash;

        var stripObject = evalHashToScroll(hash);

        if (stripObject != null) {
            goToByScroll(stripObject);
            attachToMenu();
        }
    });

function evalHashToScroll(hash) {
    var stripObject = null;

    if (hash != "" && hash != null) {

        var hashValues = hash.split('-');
        var stripTab = null;

        //check se esiste il plugin
        var hashStripName = hashValues[0];
        hashStripName = clearNameStripHash(hashStripName);
        if (hashStripName != "" && hashStripName != undefined) {

            stripObject = findHashNameOnStrip(".grey_strip__block__title", hashStripName, null);

            if (stripObject != null) {

                hashStripName = null;
                stripObject = r$(stripObject).parent();

                for (var i = 1; i < hashValues.length; i++) {

                    hashStripName = clearNameStripHash(hashValues[i], stripObject);

                    if (hashStripName != null)
                        stripTab = findHashNameOnStrip(".grey_strip__block__tabs--title", hashStripName, stripObject);

                    if (stripTab != null)
                        r$(stripTab).trigger('click');
                }


            }
        }
    }

    return stripObject;
}

function findHashNameOnStrip(stripClass, hashStripName, parent) {

    var stripObject = null;

    if (parent != null && parent != undefined) {
        stripClass = r$(parent).find(stripClass);
    } else {
        stripClass = r$(stripClass);
    }

    stripClass.each(function(index, value) {
        var stripName = clearNameStripHash(r$(value).text());
        if (stripObject == null && (stripName === hashStripName)) {
            stripObject = r$(value);
        }
    });

    return stripObject;
}

function clearNameStripHash(name) {
    return name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '').trim().toLowerCase();
}

function goToByScroll(obj) {

    r$('html,body').animate({
            scrollTop: r$(obj).offset().top - r$(obj).height()
        },
        'slow');
}


function attachToMenu() {

    if (!attachedToMenu) {

        attachedToMenu = true;

        var currentUrl = window.location.href;
        currentUrl = currentUrl.replace(window.location.origin, "");

        if (currentUrl.indexOf("#") >= 0) {

            currentUrl = currentUrl.split("#")[0];

            var toAttachUrlArray = r$(".slideOpened a[href*='" + currentUrl + "']");
            r$(toAttachUrlArray).click(function() {

                if (scollableEvent) {
                    if (event != undefined) {
                        event.preventDefault();
                    } else if (e != undefined)
                        e.preventDefault();

                    var href = r$(this).attr('href');
                    if (href.indexOf("#") >= 0) {

                        var toHash = href.split("#")[1];
                        var toHashObj = evalHashToScroll(toHash);

                        if (toHashObj != null) {
                            closeShoulder();
                            goToByScroll(toHashObj);
                        }
                    }
                } else {
                    scollableEvent = true;
                }

            });

            var preventAttachUrlArray = r$(".slideOpened a[href*='" + currentUrl + "'] .menu_parent_icon");
            r$(preventAttachUrlArray).click(function() {

                scollableEvent = false;
                if (event != undefined) {
                    event.preventDefault();
                } else if (e != undefined)
                    e.preventDefault();

            });
        }
    }
}

/***
 * GESTIONE SCROLL -->
 */
