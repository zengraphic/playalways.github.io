<!DOCTYPE html>
<?php
    // INITIAL SETUP
    $pageTitle          = "Wind Netiquette";
    $analyticsAccount   = "UA-26021590-1";
    $fbAppId            = "368672056538841";
    $basePath           = "http://socialserver.it/windFB/netiquette/";
    if (isset($_REQUEST['signed_request']))
    {
        $signed_request = parsePageSignedRequest();
        $liked = (int) $signed_request->page->liked;
    }
    else
    {
        $liked = 1;
    }
    
    function parsePageSignedRequest()
    {
        if (isset($_REQUEST['signed_request']))
        {
            $encoded_sig = null;
            $payload = null;
            list($encoded_sig, $payload) = explode('.', $_REQUEST['signed_request'], 2);
            $sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
            $data = json_decode(base64_decode(strtr($payload, '-_', '+/'), true));
            return $data;
        }
        return false;
    }
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><?php echo $pageTitle ?></title>
        
        <link rel="stylesheet" type="text/css" media="all" href="./css/style-sprited.css" />
        <link rel="stylesheet" type="text/css" media="all" href="./css/all.css" />

        <script type="text/javascript" src="./js/jquery-1.6.2.min.js"></script>
        <!-- Analytics code -->
        <script type="text/javascript">

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', '<?php echo $analyticsAccount ?>']);
            _gaq.push(['_trackPageview']);

            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>
        <!-- End Analytics -->
    </head>
    <body>
        <div id="fb-root"></div>
        <script src="https://connect.facebook.net/en_US/all.js"></script>
        <script>
        FB.init({
            appId  : '<?php echo $fbAppId ?>',
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : false  // parse XFBML
          });
        window.setTimeout(function() {
            FB.Canvas.setAutoGrow();
        }, 250);
        </script>
        <div class="container">
            <div class="content">
                <?php include_once 'content.php'; ?>
            </div>
        </div>
    </body>
</html>
