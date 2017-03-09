jQuery(document).ready(function($) {
    // ================== CARICAMENTO DATI ===================
    $('.calendar__shortcut--link').click(function(e) {
        var dataToScroll = $(this).data('scroll');
        $('html,body').animate({
                scrollTop: $(".anchor_" + dataToScroll).offset().top
            },
            'slow');
    });
    $('.calendar__scrollTop').click(function(e) {
        $('html,body').animate({
                scrollTop: $(".calendar__shortcut").offset().top
            },
            'slow');
    });
    $('.calendar__shortcut--showMore').click(function(e) {
        $(this).hide();
        $('.calendar__shortcut--showLess').show();
        $('.calendar__shortcut.more_links').show();
    });
    $('.calendar__shortcut--showLess').click(function(e) {
        $(this).slideUp();
        $('.calendar__shortcut--showMore').slideDown();
        $('.calendar__shortcut.more_links').slideUp();
    });
    /*https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1yhZTKp_VeR0EaaitSXnax2JMdBusqe3lZf8OQ9YuKmY&sheet=Form Responses 1*/
});
