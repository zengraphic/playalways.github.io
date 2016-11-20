jQuery(function($) {

    $(document).ready(function() {
        tabSwitch();
    });
    $(window).resize(function() {
        tabSwitch();
    });

    function tabSwitch() {

        $('.offer_tab_nav_link a').click(function(event) {

            event.preventDefault();
            link = $(this);
            tab = $(this).parent();
            tabContent = $(link.attr('href'));
            if (tab.not('.active')) {
                $('.offer_tab_nav_link.active').removeClass('active');
                $('.offer_tab_content .offer.active').removeClass('active');
                tab.addClass('active');
                tabContent.addClass('active');
            }

        });
    }
});
