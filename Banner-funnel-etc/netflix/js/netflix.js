	jQuery(document).ready(function($) {
	    var stopAnim = 0;

	    function glitch() {
	        if (stopAnim != 1) {
	            if (!$('.hero_full_container').hasClass('upside_down')) {
	                upsideDown();
	            } else {
	                reverseUpside();
	            }
	        }
	    }

	    function pollen() {
	        $('body').append('<div class="pollen"></div>');
	    }

	    function upsideDown() {
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 50);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 100);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 150);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 200);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 250);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 300);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 350);
	    }

	    function reverseUpside() {
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 50);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 100);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 150);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 200);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 250);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 300);
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 350);
	    }

	    function overlayFadeInOut() {
	        $('body').append('<div class="netflix_overlay"></div><div class="close_upsidedown">CHIUDI</div>');
	        setInterval(glitch, 2500);
	    }
	    $('body').on("click", ".close_upsidedown", function(e) {
	    	stopAnim = 1;
	    	clearInterval(glitch);
	    	$('.netflix_overlay').remove();
	    	$('.pollen').remove();
	    	$(this).remove();
	    });

	    var kkeys = [],
	        konami = "38,38,40,40,37,39,37,39,66,65",
	        strange = "83,84,82,65,78,71,69",
	        netflix = "78,69,84,70,76,73,88",
	        sottosopra = "83,79,84,84,79,83,79,80,82,65";


	    $(document).keydown(function(e) {
	        kkeys.push(e.keyCode);

	        if (kkeys.toString().indexOf(sottosopra) >= 0) {

	            $(document).unbind('keydown', arguments.callee);

	            // do something awesome
	            pollen();
	            overlayFadeInOut();
	        }

	    });
	});
