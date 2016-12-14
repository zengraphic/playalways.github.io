jQuery(document).ready(function($) {
    function sms() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            //WP
        } else if (/android/i.test(userAgent)) {
            //Android
            $('.iphone').css('display', 'none');
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //iOS
            $('.android').css('display', 'none');
        }
    }
});