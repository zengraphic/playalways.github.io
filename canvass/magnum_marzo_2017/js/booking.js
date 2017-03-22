jQuery(document).ready(function($) {
    // $('.magnum_nav_link a').click(function(event) {
    //     event.preventDefault();
    //     var tab = $(this).parent(); //mshnum_nav_link
    //     var tabContent = $($(this).attr('href')); //href dell'a dove ho cliccato (#offer2)
    //     if (tab.not('.active')) {
    //         $('.active').removeClass('active');
    //         tab.addClass('active');
    //         tabContent.addClass('active');
    //     }
    // });
    $('.cta_btn_1').click(function(e) {
        e.preventDefault();
        $('.btn_1').addClass('active');
        $('.btn_2').removeClass('active');
        $('.btn_3').removeClass('active');
        $('.offer1').addClass('active');
        $('.offer2').removeClass('active');
        $('.offer3').removeClass('active');
        $('.hero_1').addClass('active');
        $('.hero_2').removeClass('active');
        $('.hero_3').removeClass('active');

    });
    $('.cta_btn_2').click(function(e) {
e.preventDefault();
        $('.btn_2').addClass('active');
        $('.btn_1').removeClass('active');
        $('.btn_3').removeClass('active');
        $('.offer2').addClass('active');
        $('.offer1').removeClass('active');
        $('.offer3').removeClass('active');
        $('.hero_2').addClass('active');
        $('.hero_1').removeClass('active');
        $('.hero_3').removeClass('active');
    });
    $('.cta_btn_3').click(function(e) {
        e.preventDefault();
        $('.btn_3').addClass('active');
        $('.btn_1').removeClass('active');
        $('.btn_2').removeClass('active');
        $('.offer3').addClass('active');
        $('.offer1').removeClass('active');
        $('.offer2').removeClass('active');
        $('.hero_3').addClass('active');
        $('.hero_1').removeClass('active');
        $('.hero_2').removeClass('active');
    });
});
