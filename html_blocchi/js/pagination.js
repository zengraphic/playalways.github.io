jQuery(function($) {
    /**
     * jQuery pagination behaviour
     *
     * Cycles through all pagers in the document
     * and initalizes each one's behaviour
     */
    $('.pagination_block__content.pagination').each(function() {
        /**
         * [currentPagination description]
         * @type {[object]}
         * Fixed reference to pagination object
         * avoiding scope's issues
         */
        var currentPagination = $(this);
        /**
         * [pagItems description]
         * @type {[object]}
         * Reference to all paging items inside the pager
         */
        var pagItems = currentPagination.find('.pagination_item');
        /**
         * [pagLinks description]
         * @type {[object]}
         * Reference to all paging links inside paging items
         */
        var pagLinks = currentPagination.find('.pagination_link');
        /**
         * [pagPrev description]
         * @type {[object]}
         * Reference to pagination previous button
         */
        var pagPrev = currentPagination.find('.pagination_previous');

        /**
         * [pagNext description]
         * @type {[object]}
         * Reference to pagination next button
         */
        var pagNext = currentPagination.find('.pagination_next');

        //////////////////////////
        // Pager initialization //
        //////////////////////////

        checkNavButtons(1, 'same');

        /////////////////////////////////
        // Paging button click binding //
        /////////////////////////////////

        pagLinks.click(function(e) {
            e.preventDefault();
            currentIndex = $(this).parent().index();
            activateNav(currentIndex, 'same');
            checkNavButtons(currentIndex, 'same');
        });

        ///////////////////////////////////
        // Previous button click binding //
        ///////////////////////////////////

        pagPrev.click(function(e) {
            e.preventDefault();
            currentIndex = currentPagination.find('.active').index();
            if (currentIndex === 1) {
                return false;
            }
            activateNav(currentIndex, 'previous');
            checkNavButtons(currentIndex, 'previous');

        });

        ///////////////////////////////
        // Next button click binding //
        ///////////////////////////////

        pagNext.click(function(e) {
            e.preventDefault();
            currentIndex = currentPagination.find('.active').index();
            if (currentIndex === pagItems.length) {
                return false;
            }
            activateNav(currentIndex, 'next');
            checkNavButtons(currentIndex, 'next');

        });


        /**
         * [switchLogic takes in the current index and the shift to make returning the future index to use]
         * @param  {[integer]} currentIndex [Current active pager's index]
         * @param  {[string]}  shift        [Nature of the shift: previous / same / next]
         * @return {[integer]}              [Pager's index that will be set to active]
         */
        function switchLogic(currentIndex, shift) {
            var indexToActivate;
            switch (shift) {
                case 'previous':
                    indexToActivate = currentIndex - 1;
                    break;
                case 'next':
                    indexToActivate = currentIndex + 1;
                    break;
                case 'same':
                    indexToActivate = currentIndex;
                    break;
            }
            return indexToActivate;
        }

        /**
         * [checkNavButtons takes in currentIndex and shift, taking care of disabling prev/next buttons if needed, without returning anything]
         * @param  {[integer]} currentIndex [Current active pager's index]
         * @param  {[string]}  shift        [Nature of the shift: previous / same / next]
         */
        function checkNavButtons(currentIndex, shift) {
            var indexToActivate = switchLogic(currentIndex, shift);
            if (indexToActivate == 1) {
                pagPrev.addClass('disabled');
            } else if (indexToActivate == pagItems.length) {
                pagNext.addClass('disabled');
            } else {
                pagPrev.removeClass('disabled');
                pagNext.removeClass('disabled');
            }
        }

        /**
         * [activateNav takes in currentIndex and shift, taking care of removing active class from selected item and adding it to the right one, without returning anything]
         * @param  {[integer]} currentIndex [Current active pager's index]
         * @param  {[string]}  shift        [Nature of the shift: previous / same / next]
         */
        function activateNav(currentIndex, shift) {
            var indexToActivate = switchLogic(currentIndex, shift);
            currentPagination.find('.active').removeClass('active');
            currentPagination.find('.pagination_item').eq(indexToActivate - 1).addClass('active');
        }
    });

});
