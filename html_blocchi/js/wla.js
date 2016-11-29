!(function($){
 WLA = {
	wlaSelect: function(isSelect){
        $(".confirmation-number").click(function() {
            $('.block_wla__stepForm--step').eq(0).find('.animated').addClass('bounceIn');
            $('.block_wla__stepForm--step').eq(1).find('.disabled').removeClass('disabled');
            if (isSelect) {
                $('.block_wla__stepForm__inputField--full').hide();
                $('.block_wla__stepForm__inputField').eq(0).removeClass('hidden').addClass('fadeInLeft');
            } else {
                $('.block_wla__stepForm__inputField').eq(0).hide();
     $('.block_wla__stepForm__inputField').eq(1).removeClass('hidden').addClass('fadeInLeft');

            }
        });

        $(".confirmation-code").click(function() {
            $('.block_wla__stepForm--step').find('.animated').addClass('bounceIn');
            $('.block_wla__stepForm--step').eq(2).find('.disabled').removeClass('disabled');
            if (isSelect) {
                $('.block_wla__stepForm__inputField').eq(0).hide();
                $('.block_wla__stepForm__inputField').eq(1).removeClass('hidden').addClass('bounceIn');
            } else {

                $('.block_wla__stepForm__inputField').eq(1).hide();
                $('.block_wla__stepForm__inputField').eq(2).removeClass('hidden').addClass('bounceIn');
            }
        });
    }
}; 
})(jQuery);

