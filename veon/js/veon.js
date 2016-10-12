jQuery(document).ready(function($) {
	$('.show_more_faq').click(function(){
		$('.more_faq_container').slideDown();
		$('.show_less_faq').slideDown();
		$(this).slideUp();		
	});
	$('.show_less_faq').click(function(){
		$('.more_faq_container').slideUp();
		$(this).slideUp();		
		$('.show_more_faq').slideDown();		
	});	
});
