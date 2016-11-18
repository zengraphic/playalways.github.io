<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    // INITIAL SETUP
    include_once 'config.php';
    if (isset($_REQUEST['signed_request']))
    {
        //$signed_request = parsePageSignedRequest();
    }
    else
    {
    	// Result è settata quando viene ricaricata perché viene postata una domanda nel form
		if(!isset($_REQUEST['result'])) {
        	header("location:https://www.facebook.com/Wind/app_$fbAppId");
		}
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
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><?php echo $pageTitle ?></title>
		<link media="all" rel="stylesheet" type="text/css" href="css/all.css?v=4" />
		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.main.js"></script>
		<!--[if lt IE 8]><link rel="stylesheet" type="text/css" href="css/ie.css" /><![endif]-->
    <link media="all" rel="stylesheet" type="text/css" href="css/modal.min.css" />
    <script type="text/javascript" src="js/modal.min.js"></script>
        <?php /*<script type="text/javascript" src="./js/jquery-1.6.2.min.js"></script>*/ ?>
        <?php if (isset($analyticsAccount)): ?>
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
        <?php endif; ?>
    </head>
    <body>
        <div id="fb-root"></div>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '<?php echo $fbAppId ?>', // App ID
//		      channelUrl : '//socialserver.it/channel.html', // Channel File
		      status     : true, // check login status
		      cookie     : true, // enable cookies to allow the server to access the session
		      xfbml      : true  // parse XFBML
		    });
			window.setTimeout(function() {
            	FB.Canvas.setAutoGrow();
        	}, 250);
		    // Additional initialization code here
		  };
		
		  // Load the SDK Asynchronously
		  (function(d){
		     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		     js = d.createElement('script'); js.id = id; js.async = true;
		     js.src = "//connect.facebook.net/it_IT/all.js";
		     d.getElementsByTagName('head')[0].appendChild(js);
		   }(document));
		</script>
        <div class="page">
            <?php include_once 'content.php'; ?>
        </div>
    </body>
</html>