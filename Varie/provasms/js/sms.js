jQuery(function($) {

    function sms() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
     if (/android/i.test(userAgent)) {
            //Android
            $('.android').css('display', 'block');
            $('.iphone').css('display', 'none');
            $('.smsDesk').css('display', 'none');
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //iOS
            $('.iphone').css('display', 'block');
            $('.android').css('display', 'none');
            $('.smsDesk').css('display', 'none');
        }
    }

    sms();
});