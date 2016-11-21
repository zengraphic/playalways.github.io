jQuery(function($) {

    function GetURLParameter(sParam) {
        var sPageURL = window.location.hash;
        var sPageHash = sPageURL.substr(0, sPageURL.indexOf('?'))
        var sURLVariables = sPageHash.split('&');
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
