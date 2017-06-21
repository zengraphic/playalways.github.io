CREATELANDING = {};

var magnum, headTag, header, path1, path2;

function appendArrows(nSlider) {
    nSlider.append("<img class='slider_arrows slider_right_arrow' src='/fileadmin/img-landing/icons-interface/slider_arrow_right.png'>");
    nSlider.append("<img class='slider_arrows slider_left_arrow' src='/fileadmin/img-landing/icons-interface/slider_arrow_left.png'>");
}

function initSlider() {
    var slideWidthTotal = 0;
    var nSlider;
    var slide;
    var slideWidth;
    var counter = 0;
    var currentSlide;
    // cicla tutti gli slider
    $('.container_slider').each(function() {
        nSlider = $(this);
        // cicla ogni slide
        nSlider.find('.slide_single').each(function() {
            // aumenta il counter per vedere qual è la prima
            counter = counter + 1;
            slide = $(this);
            slideWidth = slide.width();
            //somma le larghezze delle slide
            slideWidthTotal = slideWidth + slideWidthTotal;
            //console.log('slide singola: ' + slideWidth + ' | larghezza slide totale:' + slideWidthTotal);
            // setta il data
            slide.attr('data-slide', counter);
            if (counter == 1) {
                slide.addClass('active');
            }
        });
        appendArrows(nSlider);
        currentSlide = nSlider.find('.slide_single.active');
        nSlider.css('height', currentSlide.height());
        slideWidthTotal = slideWidthTotal + 5;
        nSlider.css('width', slideWidthTotal + 'px');
        //nSlider.css('position','absolute');
        //resetta i counter
        slideWidthTotal = 0;
        counter = 0;
    });

}

jQuery(document).ready(function($) {

    console.log(path1);
    new Clipboard('.clip_btn');
    var divContainer = '<div class="landing__subContainer"/>'
    var mainContainer = '.landing__mainContainer';
    var copyStep = 0;
    var update = 0;
    // ============================== //
    // ============ HEADER ========== //
    // ============================== //

    function callMsgError(item, message) {
        if (update == 0) {
            update = 1;
            $('body').append('<div class="container_message"><img src="cms/img/ale_msg.png" class="update_ale" /><div class="message_generated">prova prova prova</div></div>');
            $('.container_message').fadeIn();
            $('.message_generated').text(message);
            $(".container_message").animate({
                top: "+=30%",
            }, 1000, function() {
                $(".container_message").animate({
                    top: "+=0%",
                }, 2000, function() {
                    $('.container_message').fadeOut("slow", function() {
                        $('.container_message').remove();
                    });
                    update = 0;
                });
            });
        }
    }
    var keyupTimer;

    $(".search_field_cms").keyup(function(e) {
        var textToCheck = $(this).val().toLowerCase();
        clearTimeout(keyupTimer);
        keyupTimer = setTimeout(function() {
            $('.mainTitle').each(function() {
                var cycleText = $(this).text().toLowerCase();
                var elementToShow = $(this);
                if (cycleText.indexOf(textToCheck) !== -1) {
                    $(elementToShow).parents('.cms_container_table').slideDown();
                } else {
                    $(elementToShow).parents('.cms_container_table').slideUp();
                }
            });
        }, 300);


    });

    $(".new_file").click(function(e) {
        e.preventDefault();
        var message = $(this).data('message');
        var item = $(this);
        $(this).addClass("hover_active");
        callMsgError(item, message);
    });

    $('.clip_btn').click(function() {
        var position = $(this).parents('.html_row');
        if (copyStep == 0) {
            copyStep = 1;
            $(position).append('<img src="cms/img/copy1.png" class="hokkaido" />');
            $(".hokkaido").animate({
                right: "+=50%",
            }, 1000, function() {
                $(".hokkaido").animate({
                    right: "+=0%",
                }, 1000, function() {
                    $(".hokkaido").animate({
                        right: "+=100%",
                    }, 1000, function() {
                        $('.hokkaido').css('right', '-300px');
                        copyStep = 0;
                        $('.hokkaido').remove();
                    });
                });
            });
        }
    });

    function download_to_textbox(url, el) {
        $.get(url, null, function(data) {
            el.val(data);
        }, "text");
    }

    function loadFooter(targetPre) {
        var pageToLoad = 'html/partials/footer.html';
        $.get(pageToLoad, function(my_var) {
            page = page + my_var;
        }, 'html').promise().done(function() {
            if ((path1 != "") && (path2 != "")) {
                var mergePath = '/fileadmin/' + path1 + "/" + path2 + "/";
                mergePath = mergePath.replace(/ /g, "");
                page = page.replace(/([.][.][/])/g, mergePath);
            }
            $(targetPre).text(page);
        });
    }

    function loadAccordion(currentPage, targetPre) {
        var pageToLoad = 'html/partials/accordions/accordion_' + currentPage + '.html';
        $.get(pageToLoad, function(my_var) {
            page = page + my_var;
        }, 'html').promise().done(function() {
            loadFooter(targetPre);
        });
    }

    function loadOfferDetail(currentPage, targetPre) {
        var pageToLoad = 'html/partials/offer_details/offer_details_' + currentPage + '.html';
        $.get(pageToLoad, function(my_var) {
            page = page + my_var;
        }, 'html').promise().done(function() {
            loadAccordion(currentPage, targetPre);
        });
    }

    function loadHero(currentPage, targetPre) {
        var pageToLoad = 'html/partials/hero/hero_' + currentPage + '.html';
        $.get(pageToLoad, function(my_var) {
            page = page + my_var;
        }, 'html').promise().done(function() {
            loadOfferDetail(currentPage, targetPre);
        });
    }

    function loadHeader(currentPage, targetPre) {
        var headerToLoad = 'html/partials/header/header_' + currentPage + '.html';
        $.get(headerToLoad, function(my_var) {
            page = page + my_var;
        }, 'html').promise().done(function() {
            loadHero(currentPage, targetPre);
        });
    }

    function loadHead(currentPage, targetPre) {
        $.get("html/partials/headTag.html", function(my_var) {
            page = my_var;
        }, 'html').promise().done(function() {
            loadHeader(currentPage, targetPre);
        });
    }

    $('.generateHtml').click(function() {
        var targetpage = $(this).data('pagetarget')
        var targetPre = $(this).parents('.cms_container_table').find('.textareaHTML');
        if (!$(this).hasClass('active')) {
            $('.generateHtml').removeClass('active');
            $(this).addClass('active');
            $('.html_row').slideUp();
            $(this).parents('.cms_container_table').find('.html_row').slideDown();
            path1 = $('.firstPath').val();
            path2 = $('.secondPath').val();
            console.log(path1 + " " + path2);
            loadHead(targetpage, targetPre);
        } else {
            $(this).removeClass('active');
            $('.html_row').slideUp();
        }
    });

    $('body').on('click', '.slider_arrows', function() {
        if ($(this).hasClass('slider_left_arrow')) {
            var container = $(this).parents('.container_slider');
            var subcontainer = $(this).parents('.container_slider').find('.slider_cms');
            var activeSlide = subcontainer.find('.slide_single.active').data('slide');
            var nextactiveSlide = subcontainer.find('.slide_single[data-slide="' + (activeSlide + 1) + '"]').data('slide');
            console.log('==> activeslide: ' + activeSlide);            
            var firstSlide = subcontainer.find("[data-slide='1']"); 
            var initialHeight = firstSlide.css('height');           
            if (typeof nextactiveSlide != 'undefined') {
                // prendi la slide attuale
                var currSlide = subcontainer.find("[data-slide=" + activeSlide + "]");
                console.log('currSlide: ' + currSlide);
                // prendi la slide successiva
                var activeplus = activeSlide +1;
                var nextSlide = subcontainer.find("[data-slide='" + activeplus + "']");
                console.log('nextSlide: ' + nextSlide);
                // rimuovi activa dalla corrente e mettilo alla successiva
                currSlide.removeClass('active');
                nextSlide.addClass('active');
                container.css('height', nextSlide.css('height'));
                var itemWidth = (subcontainer.width() / 2) + 5;
                console.log('larghezzaNext: ' + itemWidth);
                subcontainer.animate({
                    left: "-=1029"
                });
            } else {
                activeSlide = 1;
                container.css('height',initialHeight);
                subcontainer.find(".slide_single").removeClass('active');
                subcontainer.find(".slide_single[data-slide=" + activeSlide + "]").addClass('active');
                console.log('==============FINE SLIDER==============');
                subcontainer.animate({
                    left: "0"
                });
            }
        }
    });
    $(window).load(function() {
        initSlider();
    });
});
