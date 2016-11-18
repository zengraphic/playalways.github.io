<div class="block" id="block1" style="display:block">
  <div class="holder">
	  <div class="inner">
		<h3>Vuoi farci una segnalazione o chiederci qualcosa? </h3>
		<?php
		if (isset($_REQUEST['result']) && ($_REQUEST['result']=='error'))
		{ 
		?>
		<p class="feedback error">C'è stato un errore controlla i campi evidenziati in rosso.</p>
		<?php
		}
		elseif (isset($_REQUEST['result']) && ($_REQUEST['result']=='success'))
		{
		?>
		<p class="feedback success">Il tuo messaggio è stato inviato con successo, verrai contattato direttamente al più presto.</p>
		<?php
		}
		else 
		{
		?>
		<p>Lasciaci un messaggio e i tuoi dettagli, verrai contattato direttamente!</p>
		<?php
		} 
		?>
		<!-- proposal-form -->
		<form action="conctactengine.php" class="proposal-form">
		 <fieldset>
			<?php
			$nome 		= (isset($_REQUEST['nome'])) ? $_REQUEST['nome'] : '';
			$mail		= (isset($_REQUEST['mail'])) ? $_REQUEST['mail'] : '';
			$messaggio  = (isset($_REQUEST['messaggio'])) ? $_REQUEST['messaggio'] : '';
			$telefono = (isset($_REQUEST['telefono'])) ? $_REQUEST['telefono'] : '';
			$checkprivacy = 'checked ';
			// IF result is error check which field has raised it
			if (isset($_REQUEST['result']) && ($_REQUEST['result']=='error'))
			{
				$privacy 	= (isset($_REQUEST['privacy'])) ? 'error' : '';
				// IF privacy error do not auto check it
				$checkprivacy = (isset($_REQUEST['privacy'])) ? ' ' : ' ';
				$name		= (isset($_REQUEST['name'])) 	? 'error' : '';
				$email		= (isset($_REQUEST['email'])) 	? 'error' : '';
				$msg		= (isset($_REQUEST['msg'])) 	? 'error' : '';
			}
			?>
			<!-- row NAME -->
			<div class="row <?= $name; ?>">
				<label for="name">Nome e cognome*</label>
				<!-- text input -->
				<div class="text-holder">
				  <input type="text" class="text-input" id="name" name="name" value="<?= $nome; ?>" />
				</div>
			</div>
			<!-- row EMAIL -->
			<div class="row <?= $email; ?>">
				<label for="email">E-mail*</label>
				<!-- text input -->
				<div class="text-holder">
				  <input type="text" class="text-input" id="email" name="email" value="<?= $mail; ?>" />
				</div>
			</div>
			
			<div class="row">
				<label for="telefono">Telefono</label>
				<!-- text input -->
				<div class="text-holder">
				  <input type="text" class="text-input" id="telefono" name="telefono" value="<?= $telefono; ?>" />
				</div>
			</div>
			<p class="info"><a id="fbconnect" href="#" class="link">Compila i campi utilizzando Facebook Connect </a></p>
			<!-- field MSG -->
			<div class="field <?= $msg; ?>">
				<div class="wrap">
					<label for="message">Scrivi qui il tuo messaggio*</label>
				</div>
				<div class="wrap text">
					<!-- textarea -->
					<div class="holder">
					  <textarea id="message" cols="3" rows="2" name="message"><?= $messaggio; ?></textarea>
					</div>
				</div>
			</div>
			<!-- container PRIVACY -->
			<div class="container">
				<div class="holder <?= $privacy; ?>">
					<!-- checkbox -->
					<input type="checkbox" class="check" id="accept" name="privacy"/>
					<label for="accept">Ho letto e accettato le <a href="#modal-privacy" data-toggle="modal" class="link">condizioni per la privacy</a>*</label>
				</div>
			</div>
			<!-- row -->
			<div class="row">
			  <span class="required">*campi obbligatori</span>
				<!-- button submit -->
				<div class="submit-holder">
				  <input type="submit" class="btn-submit" value="INVIA" />
				</div>
			</div>
		 </fieldset>
		</form>
	</div>
	</div>
</div>