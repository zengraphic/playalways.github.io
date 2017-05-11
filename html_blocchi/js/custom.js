var r$ = jQuery.noConflict();

// end validate insert email
r$(document).ready(function() {
    HEADER.setSlider();

    r$('.logo--wind a').attr('href', window.location.origin + '/' + window.location.pathname.split('/')[1] + '/');

    r$('body').on('keyup', 'input[type=tel]', function(event) {
        var self = $(this);
        var value = $(this).val();
        var testCondition = new RegExp(/^[0-9]{1,10}$/);
        if (!testCondition.test(value)) {
            $(this).val(value.slice(0, -1));
            return false;
        } else {
            return true;
        }

    });
});

/* end validate credentials */


r$(document).ready(function() {
    /* Breadcrumbs mobile */
    var breadcums_action = (function() {
        r$('.base__breadcrumbs').each(function() {
            var liItems = r$(this);
            var Sum = 0;

            if (liItems.children('li').length >= 1) {
                r$(this).children('li').each(function(i, e) {
                    Sum += r$(e).outerWidth(true);
                });
                r$(this).width(Sum + 20);
            }
        });
    });
    breadcums_action();
    r$(window).resize(function() {
        if (r$(".base__scrollable2").length > 0) {
            breadcums_action();
            r$(".base__scrollable2").getNiceScroll(0).doScrollLeft(350, 500);
        }
    });

});
/* end Breadcrumbs mobile */

function clearCard(inputToClear, cvvToClear) {
    if (inputToClear) {
        r$(inputToClear).removeClass('americane_cc');
        r$(inputToClear).removeClass('diners_cc');
        r$(inputToClear).removeClass('visa_cc');
        r$(inputToClear).removeClass('maestro_cc');
        r$(inputToClear).removeClass('masterc_cc');
        r$(inputToClear).removeClass('general_cc');
        r$(inputToClear).removeClass('aura_cc');
    }
    if (cvvToClear) {
        console.log(cvvToClear);
        r$(cvvToClear).removeClass('cvv_carta');
        r$(cvvToClear).removeClass('cvv_amex');
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
                t = (t - 9);
            }
            cm.push(t);
        } else {
            cm.push(parseInt(c[i]));
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
        $wind('.select_mese .select_cc:first-child').addClass('error');
        $wind('.select_mese .select_cc + span').addClass('error');
        $wind('.select_mese .select_cc + span').text('Seleziona il mese');
        return (false);


    } else {
        $wind('.select_mese .select_cc:first-child').removeClass('error');
        $wind('.select_anno .select_cc:first-child').removeClass('error');
        $wind('.select_cc + span').removeClass('error');

        if (year > minYear) {
            console.log('anno lontano');
            $wind('.select_mese .select_cc:first-child').removeClass('error');
            $wind('.select_anno .select_cc:first-child').removeClass('error');
            $wind('.select_cc + span').removeClass('error');
            return (true);


        } else if (year === minYear) {
            if (month > minMonth) {
                console.log('scadenza ok');
                $wind('.select_mese .select_cc:first-child').removeClass('error');
                $wind('.select_anno .select_cc:first-child').removeClass('error');
                $wind('.select_cc + span').removeClass('error');
                return (true);


            } else {
                console.log('data antecedente');
                $wind('.select_mese .select_cc:first-child').addClass('error');
                $wind('.select_mese .select_cc + span').addClass('error');
                $wind('.select_mese .select_cc + span').text('Il mese inserito non è corretto');

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
r$(document).ready(function() {


    if (r$('.slider__stripMenu').length) {
        r$('.slider__stripMenu').slick({
            centerMode: false,
            dots: false,
            arrows: false,
            speed: 300,
            swipeToSlide: true,
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: "<img class='slider__navigation right__arrow' src='/img/icons-interface/slider_arrow_right.png'>",
            prevArrow: "<img class='slider__navigation left__arrow' src='/img/icons-interface/slider_arrow_left.png'>",
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

});

r$(document).ready(function() {


    if (r$('.slider__bundle').length) {
        r$('.slider__bundle').slick({
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
});

r$(document).ready(function() {

    if (r$('.slider__slidingNews').length) {
        r$('.slider__slidingNews').slick({

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
                var thumb = $(slider.$slides[i]).data('thumb');
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
});


r$(document).ready(function() {


    if (r$('.slider__offer').length) {

        var slickConfig = {

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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        };

        function offerBlockSwitchTab() {

            try {
                r$('.slider__offer').slick(slickConfig);
            } catch (e) {

                //se va la prima volta non è mai stato fatto
                //altrimenti non va la seconda volta (switch-tab)
            }


            var id = r$(this).attr("id");
            r$(".offerBlock_slider__tabs--title").removeClass("active");
            r$(".offerBlock_slider__container").hide();
            r$(".offerBlock_slider__container." + id).show();
            r$(this).addClass("active");


        }

        r$(".offerBlock_slider__tabs--title").click(offerBlockSwitchTab);
        r$(".offerBlock_slider__tabs--title.active").trigger('click');


    }
});

r$(document).ready(function() {

    if (r$('.slider__homeandlife').length) {
        r$('.slider__homeandlife').slick({
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
});


r$(document).ready(function($) {

    if ($('.service__bundle').length) {

        $('.service__bundle').slick({
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
                var thumb = $(slider.$slides[i]).data('thumb');
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
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

    }

});

r$(document).ready(function($) {
    var windowsize = $(window).width();
    var numberOfSingle;
    $('.close_client_block').click(function() {
        $('.client_block__overlay').fadeOut();
        $('.client_block__expand').animate({
            top: '-50vw'
        }, 500, function() {
            $('.client_block__expand--append').html('');
            $('.client_block__expand').hide();
        });
    });
    $('.client_block').on('click', '.client_block__single__readMore', function() {
        var subContainer = $(this).parents('.client_block__single__subContainer');
        var textToShow = $(subContainer).html();
        $('.client_block__overlay').fadeIn();
        $('.client_block__expand--append').append(textToShow);
        console.log($(".client_block__expand--append").offset().top)
        $('html, body').animate({
            scrollTop: $("#scrollToTopClient").offset().top
        }, 500);
        $('.client_block__expand').show().animate({
            top: 0
        }, 500);
    });
    $('.client_block__single--vCard--description').each(function(index) {
        textHeight = $(this).height();
        if (textHeight >= 79) {
            $(this).parents('.client_block__single__subContainer').append('<div class="client_block__single__readMore">Leggi tutto</div>');
        }
        $(this).addClass('client_block__single--modifyHeight');
    });

});

//r$(document).ready(function () {
//    r$("#ecommerce-shoulder-wind").click(function () {
//        r$('.mfp-bg, .mfp-wrap').css('height', '100%');
//        r$('base__popup.refill_block .container').css('height', '100%');
//    });
//});

r$(document).ready(function($) {
    var windowsize, numberOfSingle;

    windowsize = $(window).width();

    $('.showcase_five_cards__single').each(function(index) {
        numberOfSingle = index;
    });

    if ((numberOfSingle > 4) && (windowsize >= 768)) {
        $('.showcase_five_cards__showMore').show();
    }
    if ((numberOfSingle > 3) && (windowsize < 768)) {
        $('.showcase_five_cards__showMore').show();
    }

    $('.showcase_five_cards__showMore').click(function() {
        $('.showcase_five_cards__single').each(function(index) {
            if ($(this).css('display', 'none')) {
                $(this).show();
                $('.showcase_five_cards__showMore').hide();
            }
        });
    });

});

r$(document).ready(function($) {

    function openBlock(blockToMove, blockRight, blockLeft, blockButton) {

        $.each($(".powermail_fieldwrap"), function() {
            var placeHolder = $(this).find($("label")).text();
            $(this).find($("input, textarea")).attr("placeholder", placeHolder);
        });

        $('.powermail_input,.powermail_textarea')
            .focus(function() {
                $(this).removeAttr('placeholder');
            })
            .blur(function() {
                if ($(this).val() == '') {
                    var placeHolder = $(this).closest('.powermail_fieldwrap').find($('label')).text();
                    $(this).attr('placeholder', placeHolder);
                }
            });

        //$('.contactShow').removeClass('visibleShow');
        //$('.contactShow').addClass('visibleHidden');
        $('.contact_info_block__overlay').fadeIn();
        blockRight.addClass('visibleShow');
        blockToMove.animate({
            "right": 0
        }, "slow", function() {
            $('.contactHide').addClass('visibleShow');
            $('.contactHide').removeClass('visibleHidden');
        });
        blockButton.addClass('contact_open');
        blockToMove.addClass('contact_open');
    }

    function closeBlock(blockToMove, blockRight, blockLeft, blockButton) {
        $('.contact_info_block__overlay').fadeOut();
        $('.contactHide').addClass('visibleHidden');
        $('.contactHide').removeClass('visibleShow');
        blockToMove.animate({
            "right": "-450px"
        }, "slow", function() {
            blockToMove.removeClass('contact_open');
            blockButton.removeClass('contact_open');
            blockRight.removeClass('visibleShow');
            $('.contactShow').addClass('visibleShow');
            $('.contactShow').removeClass('visibleHidden');
            blockToMove.animate({
                "top": "20vh"
            }, 300);
        });
    }

    $(".contact_info_block__item--contact").click(function() {
        var blockToMove = $(".contact_info_block__container");
        var blockRight = $('.contact_info_block__container__right');
        var blockLeft = $('.contact_info_block__container__left');
        var blockButton = $('.contact_info_block__item--contact.contact_button');
        if (!blockToMove.hasClass('contact_open')) {
            blockToMove.animate({
                "top": '122px',
                "height": "calc(100vh - 122px)"
            }, 300, function() {
                openBlock(blockToMove, blockRight, blockLeft, blockButton);
            });
        } else {
            closeBlock(blockToMove, blockRight, blockLeft, blockButton);
        }
    });

    $(".powermail_reset").click(function() {
        $.each($(".powermail_fieldwrap"), function() {
            var placeHolder = $(this).find($("label")).text();
            $(this).find($("input, textarea")).attr("placeholder", placeHolder);
        });
    });
});

//strip menù text
jQuery(document).ready(function($) {

    $('.slider__stripMenuText').slick({
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
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

});
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
        r$(".base__input#insert_number").addClass("error");
        r$("#error_messageBloccoInsert_number").addClass("error");
        r$("#sendBloccoRicarica").attr("disabled", true);
    } else {
        r$(".base__input#insert_number").removeClass("error");
        r$("#error_messageBloccoInsert_number").removeClass("error");
        r$("#sendBloccoRicarica").attr("disabled", false);
    }

}

function checkNumberBloccoRicarica() {
    if ((r$('input[name=confirm_number]').val() == r$('input[name=insert_number]').val()) || r$('input[name=confirm_number]').val() == '') {
        r$(".base__input#confirm_number").removeClass("error");
        r$("#error_messageBloccoConfirm_number").removeClass("error");
        if (r$('input[name=confirm_number]').val() != '') {
            r$("#sendBloccoRicarica").attr("disabled", false);
        } else {
            r$("#sendBloccoRicarica").attr("disabled", true);
        }
    } else {
        r$(".base__input#confirm_number").addClass("error");
        r$("#error_messageBloccoConfirm_number").addClass("error");
        r$("#sendBloccoRicarica").attr("disabled", true);
    }

}

jQuery(document).ready(function($) {

    $.each($(".powermail_fieldwrap"), function() {
        var placeHolder = $(this).find($("label")).text();
        $(this).find($("input, textarea")).attr("placeholder", placeHolder);
    });

    $('.powermail_input,.powermail_textarea')
        .focus(function() {
            $(this).removeAttr('placeholder');
        })
        .blur(function() {
            if ($(this).val() == '') {
                var placeHolder = $(this).closest('.powermail_fieldwrap').find($('label')).text();
                $(this).attr('placeholder', placeHolder);
            }
        });

    $(".powermail_reset").click(function() {
        $.each($(".powermail_fieldwrap"), function() {
            var placeHolder = $(this).find($("label")).text();
            $(this).find($("input, textarea")).attr("placeholder", placeHolder);
        });
    });

});


jQuery(document).ready(function($) {
    initializeSlide();
});


function initializeSlide() {
    r$('.slider__bundle_ver2').slick({
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
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}


r$(document).ready(function($) {
    $('input.accordionBox').on('change', function() {
        $('input.accordionBox').not(this).prop('checked', true);
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

var r$ = jQuery.noConflict();
r$(function() {
    r$('.base__input').focus(function() {
        r$(this).data('placeholder', r$(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function() {
        r$(this).attr('placeholder', r$(this).data('placeholder'));
    });
});

r$("html").mouseover(function() {
    r$(".base__scrollable").getNiceScroll().resize();
});

r$(function() {
    r$('ul[data-role=accordion] li.title').on('click', function(e) {
        if (r$(window).width() < 768) {
            e.preventDefault();
            var display = r$(r$(this).siblings()[1]).css('display');
            r$('ul[data-role=accordion] li:not(.title)').slideUp();
            if (display == 'none') {
                r$(r$(this).siblings()).slideDown();
            }
        } else {
            r$(r$(this).siblings()).slideDown();
        }
    });

    r$(window).on('resize', function() {
        if (r$(window).width() >= 768) {
            r$(r$('ul[data-role=accordion] li.title').siblings()).show();
        } else {
            r$(r$('ul[data-role=accordion] li.title').siblings()).hide();
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
};

/* validate credentials */

// validate insert phone
r$(document).ready(function() {
    var input = r$("#shoulderBox input")
    var boton = r$("#shoulderBox button")
    input.keyup(function() {
        if (r$(this).val().length >= 7) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 7) {
            boton.attr('disabled', '');
        }
    })
});
// end validate insert phone

// validate insert email
r$(document).ready(function() {
    var input = r$("#shoulderBox input")
    var boton = r$("#shoulderBox button")
    input.keyup(function() {
        console.log()
        if (!ValidateEmail(input.val())) {
            console.log("Invalid email address.");
            boton.attr('disabled', '');
        } else {
            boton.removeAttr('disabled');
        }
    })
});


// validate insert code > 4 digit
r$(document).ready(function() {
    var input = r$("#shoulderBox input")
    var boton = r$("#shoulderBox button")
    input.keyup(function() {
        if (r$(this).val().length >= 4) {
            boton.removeAttr('disabled');
        }
        if (r$(this).val().length < 4) {
            boton.attr('disabled', '');
        }
    })
});
// end validate insert code > 4 digit

// validate inputs passwords
r$(document).ready(function() {
    var winput = r$("#shoulderBox input.wPass")
    var cinput = r$("#shoulderBox input.cPass")
    var boton = r$("#shoulderBox button")
    cinput.keyup(function() {
        if ((winput.val()) == cinput.val()) {
            boton.removeAttr('disabled');
        } else {
            boton.attr('disabled', '');
        }
    })
});
// end validate inputs passwords

/* end validate credentials */


r$(document).ready(function() {
    /* Breadcrumbs mobile */
    var breadcums_action = (function() {
        r$('.base__breadcrumbs').each(function() {
            var liItems = r$(this);
            var Sum = 0;

            if (liItems.children('li').length >= 1) {
                r$(this).children('li').each(function(i, e) {
                    Sum += r$(e).outerWidth(true);
                });
                r$(this).width(Sum + 20);
            }
        });
    });
    breadcums_action();
    r$(window).resize(function() {
        if (r$(".base__scrollable2").length > 0) {
            breadcums_action();
            r$(".base__scrollable2").getNiceScroll(0).doScrollLeft(350, 500);
        }
    });

});
/* end Breadcrumbs mobile */

/* Multiple actions with ready function dependece */
r$(document).ready(function() {
    /*Configurazione*/
    r$('#action_c1').click(function() {
        r$('.action_c1').fadeIn("slow")
    });
    r$('#action_1').click(function() {
        r$('#action_1-1').fadeIn("slow");
    });

    /* if access in Mac, inject class to body to resolve bug safari */
    if (navigator.platform == "MacIntel") {
        r$("body").addClass("mac");
    }
    /* end detect Mac */

    /* action map */
    r$('.check_cont_action, .close_checkcont').click(function() {
        r$('.check_cont').slideToggle('fast');
    });

    /*sostenibilita*/
    r$('.sostebilita_list li a').click(function() {
        r$('.sostebilita_list li a').removeClass('active_btn');
        r$(this).addClass('active_btn');
        r$(this).parent().find(".second_list").slideToggle("slow")
    });

    /* assitence */
    r$('.cont__answer ul a').click(function() {
        r$(this).each(function() {
            var destination = r$(this).attr("href");
            r$(destination).fadeIn(800);
            r$(this).parent().parent().parent().css('display', 'none')
        });
    });

    /* cookies action */
    r$('.btn__close_c').click(function() {
        r$('#cookies').fadeOut("slow");
    });

    /* checkbox confirmation email action*/
    r$('#emailnotification').click(function() {
        r$('.email_confirmation').slideToggle(100);
    });

    /* slider products */
    r$('.bxslider').bxSlider({
        pagerCustom: '#bx-pager'
    });
    r$('.base__scrollable').css('overflow', 'overlay');
    r$('.detail li').click(function() {
        r$('.detail li').removeClass("active_action");
        r$(this).addClass("active_action");
        r$(this).find(".cont_detail").fadeIn("slow");
    });

    r$('.security_cc').click(function() {
        r$(".tooltip").css("display", "none");
    });
    r$('.base__input').click(function() {
        r$(".tooltip").css("display", "none");
    });
    r$('.btn-alert').click(function() {
        r$(".box__alert").fadeIn("xslow");
    });
    r$('.btn-alert_out').click(function() {
        r$(".box__alert").fadeOut("xslow");
    });
    r$('.tooltip100').click(function() {
        r$(".tooltip").css("display", "none");
    });
    //close dialog squadra
    r$('.btn_close').click(function() {
        r$(".tab-pane").fadeOut("slow");
        r$(".squadra__content-data").removeClass("active");
        r$(".squadra__content-data a").removeAttr('aria-expanded');
        r$(".sostebilita_dialog").fadeOut("xshow");
    });
    r$('#scopri_test').click(function() {
        r$(".sostebilita_dialog").fadeIn("xshow");
    });
    r$('.btn_close').click(function() {
        r$(".sostebilita_dialog").fadeOut("xshow");
    });

    //setTimeout(function(){
    r$('.responsive').slick({
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
    r$('.responsive2').slick({
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
        r$('#footer').css('position', 'absolute');
        r$('#footer').css('bottom', 53);
        r$('#footer').css('z-index', 5);
    }

});

// animation to load timiline in nostra storia
r$(function() {
    // var ScrollReveal;
    if (typeof ScrollReveal === 'undefined') {} else {
        window.sr = ScrollReveal();
        //config
        sr.reveal('.reveal-left', {
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
        });
        sr.reveal('.reveal-right', {
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
        });
        sr.reveal('.tl-circ, .tldate', {
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
r$(document).ready(function() {
    r$(".top a.btn_sa").hide();
})

jQuery(document).ready(function($) {
    $('.bundle_block__showMore').click(function() {
        var thisItem = $(this);
        $(this).parents('.showcase_bundle_block').find('.showcase_bundle_block__single').each(function(index) {
            if ($(this).css('display', 'none')) {
                $(this).show();
                thisItem.hide();
            }
        });
    });

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
                                        window.location.href = '/risultati_della_ricerca/?q=' + r$("#short_gsa_search_box").val()

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
                                    window.location.href = '/risultati_della_ricerca/?q=' + r$("#short_gsa_search_box").val()
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
    }

    r$(document)
        .ready(function() {
            SEARCHBAR
                .initSearch();
        });
})(jQuery);


//############### END INCLUSIONE JS SEARCH #######################


//############### END INCLUSIONE JS SCHEDA NEGOZIO #######################


r$(document).ready(function() {

    r$('.storeDetail_block .slider_menu_tabs').slick({
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

    r$('.strip_menu_tab__item a').click(function(e) {
        var currentAttrValue = r$(this).attr('href');
        // mostra/nascondi tabs
        r$('.strip_menu_tab__targetTab').fadeOut("fast");
        r$('.strip_menu_tab__targetTab' + currentAttrValue).fadeIn("fast");

        // cambia classe attiva
        r$(this).parent('li').addClass('tab_active').siblings().removeClass('tab_active');
        r$(window).resize();
        e.preventDefault();
    });

    r$(window).on('scroll', function() {
        var scrollTop = r$(window).scrollTop();
        if (scrollTop > 30) {
            r$('#shop_canvas').stop().animate({
                height: "0px"
            }, 200);
        } else {
            r$('#shop_canvas').stop().animate({
                height: "300px"
            }, 200);
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

jQuery(document).ready(function($) {
    $('.slider__advantages').slick({
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
                        var thumb = $(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    }
                }
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

});

//JS VISORE GRANDE

jQuery(function($) {
    $(document)
        .ready(function() {
            var visoreConSlider = $('.blocco_visore').filter('.with_slider');
            visoreConSlider
                .slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'slider__dots',
                    adaptiveHeight: true,
                    customPaging: function(slider, i) {
                        var thumb = $(slider.$slides[i]).data('thumb');
                        return '<div class="slider__single"></div>';
                    }
                });
            $(".with_number")
                .click(function(event) {
                    event
                        .preventDefault();
                    var $additionalForm = $(this).siblings(".coverage_form__additional_form");
                    $additionalForm
                        .removeClass('covered')
                        .addClass('uncovered');
                });
            $(".without_number")
                .click(function(event) {
                    event
                        .preventDefault();
                    var $additionalForm = $(this).closest(".coverage_form__additional_form");
                    $additionalForm
                        .removeClass('uncovered')
                        .addClass('covered');
                });
            $('#verificaCopertura .bootstrap-select')
                .on('changed.bs.select', function(e) {
                    document.getElementById('comune').placeholder = 'Comune';
                    document.getElementById('indirizzoEsteso').placeholder = 'Indirizzo';
                    document.getElementById('civico').placeholder = 'N.';
                    activateIndirizzoComune('provincia');
                });
            $('.coverage_form .grouptel')
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
});


/*
 DOUBLEFILTER
 */

var filterDefault = "";

jQuery(document).ready(function() {

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

        doubleFilterIstasnces.push(dbfilter);
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
        if (showMore) {
            $FILTER.showMoreOn = showMore;
            $FILTER.showMore = $FILTER.container.find('div[class*="__showMore"]');
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
        }
        $FILTER.tabs = $FILTER.container.find('.tab_button');

        $FILTER.cardContainers = $FILTER.container.find('.tab_cards__container');
        $FILTER.isLocked = (isLocked == undefined) ? false : isLocked;

        return $FILTER;
    };
    this.bindFilters = function() {
        var $FILTER = this;

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
                    .show();
                $cardsContainer
                    .parent()
                    .trigger("combo-change", [filtersData]);

            } else {
                if ($cardsContainer.is(':visible')) {
                    if ($FILTER.showMoreOn) {
                        var $relatedCards = $cardsContainer.find('.card_item');
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

                    }

                }
                $cardsContainer
                    .hide();
            }

        });
        return $FILTER;
    };
    this.handlePlans = function($planFilterTab, operation) {
        var $FILTER = this;
        return $FILTER;
    };
}
