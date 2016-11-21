jQuery(function($) {

    function GetURLParameter(sParam) {
        var sPageHash = window.location.hash;
        var urlMark = sPageURL.indexOf('?');
        var hashMark = sPageURL.indexOf('#');
        var hashPart;
        if (hashMark < urlMark) {
            hashPart = sPageHash.substr(hashMark, urlMark);
        } else {
            hashPart = sPageHash.substr(hashMark, sPageURL.length - 1);
        }
        var sURLVariables = hashPart.split('&');

        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    $(document).ready(function() {
        if (GetURLParameter('#phones') == 'samsung') {
            $('.landing_magnum__showcase__item');
            $('.landing_magnum__showcase__item:nth-child(3)')
                .css({
                    'display': 'none'
                });
        }
    });



});
