jQuery(document).ready(function($) {
    $('.offer_tab_nav_link a').click(function(event) {
        event.preventDefault();
        var tab = $(this).parent();
        var tabContent = $($(this).attr('href'));
        if (tab.not('.active')) {
            $('.offer_tab_nav_link.active,.offer_tab_content .offer.active').removeClass('active');
            tab.addClass('active');
            tabContent.addClass('active');
        }
    });
});
