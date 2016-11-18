<!-- wrapper -->
	<div id="wrapper">
		<!-- header -->
		<div id="header">
			<div class="holder">
				<div class="frame">
					<h1 class="abbiamo">Abbiamo una risposta a tutto!</h1>
				</div>
			</div>
		</div>
		<!-- content -->
		<div id="content">
		  <p>Consulta le nostre <strong>F.A.Q.</strong> (Frequently Asked Questions), potresti trovare subito la risposta che stavi cercando. Scegli la tipologia di servizio per cui hai bisogno e clicca sulla domanda.</p>
			<!-- tabs area -->
			<div class="tabs-area">
				<!-- tabset -->
				<ul class="tabset">
					<li class="active"><a href="#tab-1" class="tab">Ricaricabile</a></li>
					<li><a href="#tab-2" class="tab">Abbonamento</a></li>
					<li><a href="#tab-3" class="tab">Internet Mobile</a></li>
					<li><a href="#tab-4" class="tab">Infostrada</a></li>
				</ul>
				<!-- tab content -->
				<div class="tab-content" id="tab-1">
					<!-- faq list -->
					<?php include_once 'faq.windricaricabile.php'; ?>
				</div>
				<!-- tab content -->
				<div class="tab-content ui-tabs-hide" id="tab-2">
					<!-- faq list-->
					<?php include_once 'faq.windabbonamento.php'; ?>
				</div>
				<!-- tab content -->
				<div class="tab-content ui-tabs-hide" id="tab-3">
					<!-- faq list -->
					<?php include_once 'faq.windinternet.php'; ?>
				</div>
				<!-- tab content -->
				<div class="tab-content ui-tabs-hide" id="tab-4">
					<!-- faq list-->
					<?php include_once 'faq.windinfostrada.php'; ?>
				</div>
			</div>
		</div>
		<div class="promo-info">
			<h2 class="hai">hai un'altra domanada</h2>
		</div>
		<!-- footer -->
		<div id="footer">
			<p>Hai una richiesta specifica o non hai trovato la risposta che stavi cercando? Usa il canale che preferisci per ricevere assistenza!</p>
			<!-- social networks -->
			<ul class="social-networks">
				<!-- facebook item-->
				<li class="active"><a href="#block1" class="facebook open-close"><span>Facebook</span></a></li>
				<!-- twitter item-->
				<li><a href="#block2" class="twitter open-close"><span>Twitter</span></a></li>
				<!-- App item -->
				<li><a href="#block3" class="app open-close"><span>MyWind App</span></a></li>
				<!-- wind.it item-->
				<li><a href="#block4" class="wind open-close"><span>WEBSITE</span></a></li>
				<!-- area clienti item-->
				<li><a href="#block5" class="client open-close"><span>AREA CLIENTI</span></a></li>
			</ul>
			
            <div class="social-blocks">
				<!-- block facebook -->				
				<?php include_once 'footertab.facebookform.ogilvy.php'; ?>
				<!-- block twitter -->
				<?php include_once 'footertab.twitter.php'; ?>
				<!-- block support app -->
				<?php include_once 'footertab.app.php'; ?>
				<!-- block wind.it -->
				<?php include_once 'footertab.windit.php'; ?>
				<!-- block area clienti -->
				<?php include_once 'footertab.windsupportoclienti.php'; ?>
			</div>
			<?php include_once 'footertab.modalprivacy.php'; ?>
		</div>
	</div>