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

    $(".btn_3").click(function() {
        $('#offer1').hide();
        $('.btn_1').hide();
        $('.btn_2').addClass('active').show();
        $('.btn_4').show();
        $('.btn_3').hide();
    });

    $(".btn_4").click(function() {
        $(this).addClass('active');
        $('.btn_2').hide();
        $('.btn_3').show();
        $(this).hide();
        $('.btn_1').show();
    });
});
