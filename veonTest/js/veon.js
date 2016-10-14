jQuery(document).ready(function($) {
    // ================== CARICAMENTO DATI ===================

    function initPage() {
        getDataFromJson();
    }

    function unbindAll() {
        $('.tool_edit').fadeOut();
        $('.choose_subtitle').unbind("keyup");
        $('.choose_title').unbind("keyup");
        $('.choose_pretitle').unbind("keyup");
    }

    function bindEditSlide(elem, event) {
        var etop = event.pageY;
        var eleft = event.pageX;
        if ($(elem).parents('.column_right').length) {
            eleft = '30px';
        }
        $(".tool_edit").css({
            top: etop,
            left: eleft
        });
        $('.tool_edit').fadeIn();
        populateEdit(elem);
    }

    function attachEdit(data) {
        $('.wrapper .slide_single .container_text').each(function(index) {
            $(this).append('<span class="edit_slide ' + index + '"><img src="../img/edit_slide.png"/></span>');
            $(this).find('.edit_slide').on("click", function(event) {
                bindEditSlide($(this), event);
            });
        });

    }

    function populateEdit(elem) {
        var titleText = $(elem).parents('.container_text').find('h1');
        var pretitleText = $(elem).parents('.container_text').find('h4');
        var subtitleText = $(elem).parents('.container_text').find('h6');
        $('.tool_edit .choose_title').val(titleText.html());
        $('.choose_title').bind("keyup", function() {
            titleText = $(elem).parents('.container_text').find('h1');
            $(titleText).html($(this).val());
        });
        $('.tool_edit .choose_pretitle').val(pretitleText.html());
        $('.choose_pretitle').bind("keyup", function() {
            pretitleText = $(elem).parents('.container_text').find('h4')
            $(pretitleText).html($(this).val());
        });
        $('.tool_edit .choose_subtitle').val(subtitleText.html());
        $('.choose_subtitle').bind("keyup", function() {
            subtitleText = $(elem).parents('.container_text').find('h6');
            $(subtitleText).html($(this).val());
        });
    }


    function getText(data) {
        var slidesDim = Object.keys(data.slides.slide1).length;
        var slideIndex = 0;
        var title, pretitle, subtitle;
        $('.wrapper.two .slide_single').each(function(index) {
            slideIndex = slideIndex + 1;
            console.log("valide: " + slideIndex);
            title = data.slides.slide1[slideIndex][0].title.replace(/\n/g, '<br/>');;
            pretitle = data.slides.slide1[slideIndex][0].pretitle.replace(/\n/g, '<br/>');;
            subtitle = data.slides.slide1[slideIndex][0].subtitle.replace(/\n/g, '<br/>');;
            $(this).find('h1').html(title);
            $(this).find('h4').html(pretitle);
            $(this).find('h6').html(subtitle);
        });
        console.log('---1-end of cycle-1---');
        slideIndex = 0;
        $('.wrapper.three .slide_single').each(function(index) {
            slideIndex = slideIndex + 1;
            console.log("valide: " + slideIndex);
            title = data.slides.slide2[slideIndex][0].title.replace(/\n/g, '<br/>');;
            pretitle = data.slides.slide2[slideIndex][0].pretitle.replace(/\n/g, '<br/>');;
            subtitle = data.slides.slide2[slideIndex][0].subtitle.replace(/\n/g, '<br/>');;
            $(this).find('h1').html(title);
            $(this).find('h4').html(pretitle);
            $(this).find('h6').html(subtitle);
        });
        console.log('---2-end of cycle-2---');
        initSlider();
    }


    function populateJson(data) {
        var htmlHeadTitle = $('.wrapper.one h1');
        var htmlHeadSubTitle = $('.wrapper.one h6');
        console.log(data);
        htmlHeadTitle.html(data.slides.header.title);
        htmlHeadSubTitle.html(data.slides.header.subtitle);
        getText(data);
        attachEdit(data);
    }

    function getDataFromJson() {
        //console.log(htmlHeadTitle.text());
        $.getJSON("testi.json", populateJson);
    }

    function isElementInViewport(elem) {
        var $elem = $(elem);

        // Get the scroll position of the page.
        var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
        var viewportTop = $(scrollElem).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // Get the position of the element on the page.
        var elemTop = Math.round($elem.offset().top);
        var elemBottom = elemTop + $elem.height();

        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
    }

    // Check if it's time to start the animation.
    function checkAnimation_left() {
        var count = 0;
        $('.to_animate_left').each(function() {
            var $elem = $(this);

            // If the animation has already been started
            if ($elem.hasClass('fadeInLeftBig')) return;

            if (isElementInViewport($elem)) {
                // Start the animation
                $elem.addClass('animated');
                $elem.addClass('fadeInLeftBig');
            }
            // count = count + 1;
            // console.log(count);
        });
    }

    function checkAnimation_right() {
        $('.to_animate_right').each(function() {
            var $elem = $(this);

            // If the animation has already been started
            if ($elem.hasClass('fadeInRightBig')) return;

            if (isElementInViewport($elem)) {
                // Start the animation
                $elem.addClass('animated');
                $elem.addClass('fadeInRightBig');
            }
        });
    }

    // Capture scroll events
    $(window).scroll(function() {
        checkAnimation_left();
        checkAnimation_right();
    });

    $('.show_more_faq').click(function() {
        $('.more_faq_container').slideDown();
        $('.show_less_faq').slideDown();
        $(this).slideUp();
    });
    $('.show_less_faq').click(function() {
        $('.more_faq_container').slideUp();
        $(this).slideUp();
        $('.show_more_faq').slideDown();
    });
    $('.close_edit').click(function() {
        unbindAll();
    });

    function initSlider() {
        $('.slider_1').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='../img/ic_arrow_right.png'>",
            prevArrow: "<img class='slider_navigation left_arrow' src='../img/ic_arrow_left.png'>",
            dotsClass: 'slider_dots',
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="slide_single"></div>';
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    appendDots: $('#dotsTop_one')
                }
            }]
        });

        $('.slider_2').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            autoplay: false,
            autoplaySpeed: 5000,
            nextArrow: "<img class='slider_navigation right_arrow' src='../img/ic_arrow_right.png'>",
            prevArrow: "<img class='slider_navigation left_arrow' src='../img/ic_arrow_left.png'>",
            dotsClass: 'slider_dots',
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return '<div class="slide_single"></div>';
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    appendDots: $('#dotsTop_two')
                }
            }]
        });
        $('.slider_navigation').click(function() {
            unbindAll();
        });
    }

    initPage();
});
