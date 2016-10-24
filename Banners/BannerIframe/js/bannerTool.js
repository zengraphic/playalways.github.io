BANNER = {};

jQuery(document).ready(function($) {

    function clearColors(elem) {
        $(elem).removeClass('text_color_blue');
        $(elem).removeClass('text_color_white');
        $(elem).removeClass('text_color_orange');
    }

    function clearAlign(elem) {
        $(elem).removeClass('text_align_left');
        $(elem).removeClass('text_align_center');
        $(elem).removeClass('text_align_right');
    }

    function clearSizes(elem) {
        $(elem).removeClass('text_size_12');
        $(elem).removeClass('text_size_14');
        $(elem).removeClass('text_size_16');
        $(elem).removeClass('text_size_18');
        $(elem).removeClass('text_size_20');
        $(elem).removeClass('text_size_25');
        $(elem).removeClass('text_size_30');
    }

    function clearMarginTop(elem) {
        $(elem).removeClass('margin_top_neg5');
        $(elem).removeClass('margin_top_neg10');                
        $(elem).removeClass('margin_top_neg15');
        $(elem).removeClass('margin_top_5');
        $(elem).removeClass('margin_top_8');
        $(elem).removeClass('margin_top_10');
        $(elem).removeClass('margin_top_15');
        $(elem).removeClass('margin_top_25');
    }

    function clearLine(elem) {
        $(elem).removeClass('line_height_12');
        $(elem).removeClass('line_height_14');
        $(elem).removeClass('line_height_16');
        $(elem).removeClass('line_height_18');
        $(elem).removeClass('line_height_20');
        $(elem).removeClass('line_height_25');
        $(elem).removeClass('line_height_30');
    }

    $('.generateHTML').bind("click", function() {
        var html = $('.container_banner').html();
        $('.html_order').slideDown();
        $('.overlay_html').slideDown();        
        $('.html_order').val(html);
    });
    $('.overlay_html').bind("click",function(){
         $('.html_order').slideUp();
        $('.overlay_html').slideUp();        
    });

    $('.color_select').change(function() {
        var color = $(this).find(':selected').data('color');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        clearColors(referral);
        $(referral).addClass(color);
    });
    $('.size_select').change(function() {
        var size = $(this).find(':selected').data('size');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        clearSizes(referral);
        $(referral).addClass(size);
    });
    $('.line_select').change(function() {
        var line = $(this).find(':selected').data('line');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        clearLine(referral);
        $(referral).addClass(line);
    });
    $('.margin_top_select').change(function() {
        var marginTop = $(this).find(':selected').data('margin-top');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        clearMarginTop(referral);
        $(referral).addClass(marginTop);
    });
    $('.align_select').change(function() {
        var alignment = $(this).find(':selected').data('align');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        clearAlign(referral);
        $(referral).addClass(alignment);
    });
    $('.hide_select').change(function() {
        var hide = $(this).find(':selected').data('hide');
        var referral = $(this).parents('.elemento_creatore').data('referral');
        referral = "." + referral;
        $(referral).removeClass('hidden');
        $(referral).addClass(hide);
    });
    $('.barred_select').change(function() {
        var barred = $(this).find(':selected').data('barred');
        console.log(barred);
        if (barred == 'no') {
            $('.container_prezzo_barrato').slideUp();
            $('.price_barred').addClass('hidden');
        } else {
            $('.container_prezzo_barrato').slideDown();
            $('.price_barred').removeClass('hidden');
        }
    });

    //============== BIND INPUTS ==============
    var titleLeft = $('.title_left').html();
    titleLeft = titleLeft.replace(/ +(?= )/g, '');
    $('.titolo_sinistra').val(titleLeft);
    $('.titolo_sinistra').bind("keyup", function() {
        titleText = $(this).val();
        $('.title_left').html(titleText);
    });

    var subtitleLeft = $('.subtitle_left').html();
    subtitleLeft = subtitleLeft.replace(/ +(?= )/g, '');
    $('.sottotitolo_sinistra').val(subtitleLeft);
    $('.sottotitolo_sinistra').bind("keyup", function() {
        titleText = $(this).val();
        $('.subtitle_left').html(titleText);
    });

    var titleRight = $('.title_right').html();
    titleRight = titleRight.replace(/ +(?= )/g, '');
    $('.titolo_destra').val(titleRight);
    $('.titolo_destra').bind("keyup", function() {
        titleRight = $(this).val();
        $('.title_right').html(titleRight);
    });
    var price_big = $('.price_big').html();
    price_big = price_big.replace(/ +(?= )/g, '');
    $('.prezzo_grande').val(price_big);
    $('.prezzo_grande').bind("keyup", function() {
        price_big = $(this).val();
        $('.price_big').html(price_big);
    });
    var price_small = $('.price_small').html();
    price_small = price_small.replace(/ +(?= )/g, '');
    $('.prezzo_piccolo').val(price_small);
    $('.prezzo_piccolo').bind("keyup", function() {
        price_small = $(this).val();
        $('.price_small').html(price_small);
    });
    var price_barred_small = $('.price_barred').html();
    price_barred_small = price_barred_small.replace(/ +(?= )/g, '');
    $('.prezzo_barrato').val(price_barred_small);
    $('.prezzo_barrato').bind("keyup", function() {
        price_barred_small = $(this).val();
        $('.price_barred').html(price_barred_small);
    });
    var underprice_text = $('.underprice_text').html();
    underprice_text = underprice_text.replace(/ +(?= )/g, '');
    $('.titolo_sotto_prezzo').val(underprice_text);
    $('.titolo_sotto_prezzo').bind("keyup", function() {
        underprice_text = $(this).val();
        $('.underprice_text').html(underprice_text);
    });
    var cta_text = $('.cta_text').html();
    cta_text = cta_text.replace(/ +(?= )/g, '');
    $('.testo_vantaggi').val(cta_text);
    $('.testo_vantaggi').bind("keyup", function() {
        cta_text = $(this).val();
        $('.cta_text').html(cta_text);
    });
});
