jQuery(function($) {

    function GetURLParameter(sParam) {
        var sPageURL = window.location.hash;
        var sURLVariables = sPageURL.split('&');
        console.log(sPageURL);
        console.log(sURLVariables);
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    $(document).ready(function() {
        if (GetURLParameter('#phones') == 'samsung') {
            $('.landing_magnum__showcase__item')
                .css({
                    'width': '35%'
                });
            $('.landing_magnum__showcase__item:nth-child(3)')
                .css({
                    'display': 'none'
                });
        }
    });



});
