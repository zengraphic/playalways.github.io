function storeOS() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        //WP
    } else if (/android/i.test(userAgent)) {
        //Android
        $('.appstore_button').css('display', 'none');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        //iOS
        $('.gplay_button').css('display', 'none');
    }
}

function fixFontIOS() {
    is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    is_safari = navigator.userAgent.indexOf("Safari") > -1;
    is_opera = navigator.userAgent.indexOf("Presto") > -1;
    is_mac = (navigator.userAgent.indexOf('Mac OS') != -1);
    is_windows = !is_mac;

    if (is_chrome && is_safari) {
        is_safari = false;
    }

    if (is_safari) {
        $('h1').css('-webkit-text-stroke', '0.5px');
        console.log('this');
    }
}


fixFontIOS();
storeOS();
