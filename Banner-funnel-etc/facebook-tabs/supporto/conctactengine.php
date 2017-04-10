<?php
// PARSE VALUES
$name		= Trim(stripslashes($_GET['name']));
$nickname	= Trim(stripslashes($_GET['nickname']));
$email		= Trim(stripslashes($_GET['email']));
$msg		= Trim(stripslashes($_GET['message']));
$priv		= Trim(stripslashes($_GET['privacy']));
$phone		= Trim(stripslashes($_GET['telefono']));
// VALIDATION:
$errors = 0;
$errorsCauses = '';
// Validation accettazione privacy
if (!isset($_GET['privacy']))
{
	$errors = 1;
	$errorsCauses .= "&privacy";
//	print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&privacy&mail=".$email."&name=".$name."&msg=".$msg." \">";
//    exit;
}
// Validation nome compilato
if ($name=='')
{
	$errors = 1;
	$errorsCauses .= "&name";
//	print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&nome&mail=".$email."&name=".$name."&msg=".$msg." \">";
//    exit;
}
// Validation nickname compilato
if ($nickname=='')
{
	$errors = 1;
	$errorsCauses .= "&nickname";
//	print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&nome&mail=".$email."&name=".$name."&msg=".$msg." \">";
//    exit;
}
/* 
SE IL TELEFONO È OBBLIGATORIO
if ($phone == '')
{
  $errors = 1;
  $errorsCauses .= "&phone";
}
*/
// validation email
$validationOK=eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email);
//print_r($email);
if (!$validationOK) 
{
	$errors = 1;
	$errorsCauses .= "&email";
//    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&email&mail=".$email."&name=".$name."&msg=".$msg." \">";
//    exit;
}
// Validation messaggio inserito
if ($msg=='')
{
	$errors = 1;
	$errorsCauses .= "&msg";
//	print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&messaggio&mail=".$email."&name=".$name."&msg=".$msg." \">";
//    exit;
}
if ($errors)
{
	print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error".$errorsCauses."&mail=".$email."&nome=".$name."&messaggio=".$msg."&telefono=".$phone."&nick=".$nickname." \">";
    exit;
}

$emailTo = 'communitymanagerwind@libero.it';
$Subject = "[Richiesta di supporto Wind] $name - $phone";

// prepare email body text
$Body  = $msg."\n"."[".$email."]";
// log to file
$time = date("j-n-Y H:m:s");
$filename = 'log/log-new.csv';
$content = $name.",".$nickname.",".$email.",".$time."\n";

// Let's make sure the file exists and is writable first.
if (is_writable($filename)) {

    // In our example we're opening $filename in append mode.
    // The file pointer is at the bottom of the file hence
    // that's where $somecontent will go when we fwrite() it.
    if (!$handle = fopen($filename, 'a')) {
         print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result&error \">";
    }

    // Write $somecontent to our opened file.
    if (fwrite($handle, $content) === FALSE) {
        print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result&error \">";
    }

    fclose($handle);

} else {
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result&error \">";
}
// send email -

	// Versione CORRETTA
	$header = "From: ".$name." <wind@ogilvy.it>\n";

	// Versione Originale a RISCHIO SPAM
	// $header = "From: ".$name." <$email>\n";
	$header .= "X-Mailer: Wind Tab Supporto\n";
	
	// costruiamo le intestazioni specifiche per il formato HTML
	$header .= "MIME-Version: 1.0\n";
	$header .= "Content-Type: text/html; charset=\"utf-8\"\n";
	$header .= "Content-Transfer-Encoding: 7bit\n\n";
	

//$success = mail($emailTo, $Subject, $Body, "From: $name <$email>");
$success	 = mail($emailTo, $Subject, $Body, $header);

//$backup  = mail($emailbkp, $Subject, $Body, "From: $name <$email>");
// redirect to success page 
if ($success /*&& $backup*/)
{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=success&value=$success \">";
    exit;
}
else
{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.php?result=error&mail=".$email."&nome=".$name."&messaggio=".$msg."&telefono=".$phone."&nick=".$nickname." \">";
    exit;
}

?>
