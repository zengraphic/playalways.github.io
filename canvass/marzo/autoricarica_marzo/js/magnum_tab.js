jQuery(document).ready(function($) {
    $('.magnum_nav_link a').click(function(event) {
        event.preventDefault();
        var tab = $(this).parent();
        var tabContent = $($(this).attr('href'));
        var tabHero = "." + $(this).attr('data-hero');
        console.log(tabHero);
        if (tab.not('.active')) {
            $('.magnum_nav_link.active,.magnum_content .offer.active,.landing_magnum__hero.active').removeClass('active');
            tab.addClass('active');
            tabContent.addClass('active');
            $(tabHero).addClass('active');
        }
    });
});
