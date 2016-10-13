jQuery(document).ready(function($) {
    // Returns true if the specified element has been scrolled into the viewport.
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
        var $elem = $('.to_animate_left');

        // If the animation has already been started
        if ($elem.hasClass('fadeInLeftBig')) return;

        if (isElementInViewport($elem)) {
            // Start the animation
            $elem.addClass('animated');            
            $elem.addClass('fadeInLeftBig');
        }
    }

    function checkAnimation_right() {
        var $elem = $('.to_animate_right');

        // If the animation has already been started
        if ($elem.hasClass('fadeInRightBig')) return;

        if (isElementInViewport($elem)) {
            // Start the animation
            $elem.addClass('animated');            
            $elem.addClass('fadeInRightBig');
        }
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
});
