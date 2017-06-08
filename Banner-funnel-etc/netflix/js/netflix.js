	jQuery(document).ready(function($) {
	    function glitch() {
	        if ($('.hero_full_container').hasClass('upside_down')) {
	            upsideDown();
	            setTimeout(upsideDown, 500);
	        } else {
	            reverseUpside();
	        }
	    }

	    function pollen() {
	        $('body').append('<div class="pollen"></div>');
	    }

	    function upsideDown() {
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').addClass('upside_down');
	        }, 500);
	        reverseUpside();
	    }

	    function reverseUpside() {
	        setTimeout(function() {
	            $('.hero_full_container, .offer_full_container').removeClass('upside_down');
	        }, 500);
	        upsideDown();
	    }

	    function overlayFadeInOut() {
	        $('body').append('<div class="netflix_overlay"></div>');
	        setInterval(glitch,2500);
	    }

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
