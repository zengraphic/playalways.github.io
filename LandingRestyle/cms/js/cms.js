var magnum, headTag, header, path1, path2;


jQuery(document).ready(function($) {
    console.log(path1);
    new Clipboard('.clip_btn');
    var divContainer = '<div class="landing__subContainer"/>'
    var mainContainer = '.landing__mainContainer';
    var copyStep = 0;
    // ============================== //
    // ============ HEADER ========== //
    // ============================== //
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

    // $('.buttonCss').click(function(e) {
    //     e.preventDefault(); //stop the browser from following
    //     window.location.href = '/fileadmin/css-landing/landing.css';
    // });
});
