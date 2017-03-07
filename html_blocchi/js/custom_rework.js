var r$ = jQuery.noConflict();

// end validate insert email


r$(document).ready(function() {


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

    r$('body').on({
        'keypress': function(event) {
            var $input = r$(this);
            if (event.which == 13) {
                $input
                    .closest('form')
                    .submit();
                return false; //<---- Add this line
            }
        }
    }, '.base__input' );

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

r$(document).ready(function() {
    r$("#ecommerce-shoulder-wind").click(function() {
        r$('.mfp-bg, .mfp-wrap').css('height', '100%');
        r$('base__popup.refill_block .container').css('height', '100%');
    });
});

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
    if (r$('input[name=confirm_number]').val() == r$('input[name=insert_number]').val()) {
        r$(".base__input#confirm_number").removeClass("error");
        r$("#error_messageBloccoConfirm_number").removeClass("error");
        r$("#sendBloccoRicarica").attr("disabled", false);
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
r$('.result_item').hide();


r$(document).ready(function($) {
    $('input.accordionBox').on('change', function() {
        $('input.accordionBox').not(this).prop('checked', true);
    });

});

//############### INCLUSIONE JS SEARCH #######################

r$(window).load(function() {
    HEADER.setSlider();
});

r$(document).ready(function($) {

    r$('.slider_menu_tabs')
        .slick({
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
        });

    r$(".search-link").click(function(event) {
        event.preventDefault();

        if (r$("body").hasClass('no_scroll')) {
            r$("body").removeClass('no_scroll');
            r$(".block-search").addClass('ghost_block').removeClass('scroll');
            r$(".block-search__overlay").addClass('ghost_overlay');
            r$(".block-search__results__container").addClass('ghost_block');
            r$(this).removeClass('active_search');


        } else {
            var posY = r$(".header").height();
            r$("body").addClass('no_scroll');
            r$(".block-search").removeClass('ghost_block').addClass('scroll').animate({
                'top': posY
            });
            r$(".block-search__overlay").removeClass('ghost_overlay');
            r$(this).addClass('active_search');

        }
    });

    r$('.result_item').hide();

    r$(".block-search__search_bar__input").keypress(function() {
        if (!r$(this).val()) {
            r$(".block-search__results__container").addClass('ghost_block');
        } else {
            r$(".block-search__results__container").removeClass('ghost_block');
            r$('.result_item').show();
        }
    });

    r$(".block-search__search_bar__input").blur(function() {
        if (!r$(this).val()) {
            r$('.result_item').hide();
            r$("body").removeClass('no_scroll');
            r$(".block-search").addClass('ghost_block').removeClass('scroll');
            r$(".block-search__results__container").addClass('ghost_block');
            r$(".block-search__overlay").addClass('ghost_overlay');
            r$(".search-link").removeClass('active_search');

        }

    });

    r$(".block-search__search_bar__resetter .resetter").click(function() {
        r$(".block-search__search_bar__input").val("").blur();
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
    r$('ul[data-role=acordeon] li.title').on('click', function(e) {
        if (r$(window).width() < 768) {
            e.preventDefault();
            var display = r$(r$(this).siblings()[1]).css('display');
            r$('ul[data-role=acordeon] li:not(.title)').slideUp();
            if (display == 'none') {
                r$(r$(this).siblings()).slideDown();
            }
        } else {
            r$(r$(this).siblings()).slideDown();
        }
    });

    r$(window).on('resize', function() {
        if (r$(window).width() >= 768) {
            r$(r$('ul[data-role=acordeon] li.title').siblings()).show();
        } else {
            r$(r$('ul[data-role=acordeon] li.title').siblings()).hide();
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
        responsive: [{

        }, {
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
