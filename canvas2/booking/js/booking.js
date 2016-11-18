jQuery(document).ready(function($) {

    $(".offer_tab_nav_link a").click(function(event) {
        event.preventDefault();

        var tab = $(this).attr("href");
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        if (tab == '#offer1') {
            $('#offer1').show();
            $('#offer2').hide();
        } else {
            $('#offer2').show();
            $('#offer1').hide();
        }

    });
});
