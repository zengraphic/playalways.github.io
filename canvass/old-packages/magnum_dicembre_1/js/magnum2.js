jQuery(function($) {

    $(window).load(function() {
        if (GetURLParameter('prov') == 'campagna_samsung') {
            $('.landing_magnum__showcase__item').addClass('half');
            $('.s7,.s7_edge')
                .parent()
                .css({
                    'display': 'none'
                });
             $('h2.phones')
                .css({
                    'display': 'none'
                });   
        } else {
            $('.s3_classic')
                .parent()
                .css({
                    'display': 'none'
                });
                $('h2.watches')
                .css({
                    'display': 'none'
                });   
        }
    });

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
});
