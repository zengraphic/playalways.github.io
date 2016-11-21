jQuery(function($) {

    function GetURLParameter(sParam) {
        var sPageHash = window.location.hash;
        var urlMark = sPageHash.indexOf('?');
        var hashMark = sPageHash.indexOf('#')+1;
        var hashPart;
        if (hashMark < urlMark) {
            hashPart = sPageHash.substr(hashMark, urlMark);
        } else {
            hashPart = sPageHash.substr(hashMark, sPageHash.length - 1);
        }
        var sHashVariables = hashPart.split('&');

        for (var i = 0; i < sHashVariables.length; i++) {
            var sParameterName = sHashVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    $(document).ready(function() {
        if (GetURLParameter('phones') == 'samsung') {
            $('.landing_magnum__showcase__item');
            $('.landing_magnum__showcase__item:nth-child(3)')
                .css({
                    'display': 'none'
                });
        }
    });



});
