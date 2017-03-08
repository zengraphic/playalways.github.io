;
(function(r$) {
    'use strict';

    var SEARCHBAR = {
        obj_nicescroll: {
            cursorcolor: "#f48135",
            cursorwidth: "10px",
            cursorborder: "0",
            background: "#e6e9ed",
            spacebarenabled: false,
            horizrailenabled: true,
            autohidemode: false,
            zindex: 1100
        },
        obj_slickslider: {
            centerMode: false,
            centerPadding: '0px',
            slidesToShow: 5,
            infinite: false,
            dots: false,
            arrows: false,
            variableWidth: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '80px',
                    slidesToShow: 1
                }
            }]
        },
        obj_searchPopup: {
            type: 'inline',
            mainClass: 'mfp-fade mfp-search',
            // closeOnContentClick: true,
            midClick: true,
            alignTop: true,
            showCloseBtn: false,
            focus: '.block-search__search_bar__input',
            removalDelay: 350,
            callbacks: {

                open: function() {

                    if (window.outerWidth <= 768) {
                        r$(document).scrollTop(150);
                        r$('.mfp-bg,.mfp-wrap')
                            .css('height', 'calc(100% - 123px)')
                            .niceScroll(SEARCHBAR.obj_nicescroll);

                    } else {
                        r$(document).scrollTop(0);
                        console.log('ok');
                    }



                    r$('.base')
                        .css({
                            'overflow': 'hidden'
                        });
                    var $blockSearch = r$('.block-search');

                    $blockSearch
                        .on({
                            'keyup': function(e) {
                                var $self = r$(this);
                                if ($self.val() != "") {
                                    r$('.block-search__results__container')
                                        .removeClass('hidden');
                                    if (e.which == 13) {
                                        console.log('submit search enter');

                                    }
                                } else if ($self.val() == "") {
                                    r$('.block-search__results__container')
                                        .addClass('hidden');
                                }
                            }
                        }, '.block-search__search_bar__input')
                        .on({
                            'click': function() {
                                var $self = r$(this);
                                var $input = $self.prevAll('.block-search__search_bar__input');
                                var inputVal = $input.val();

                                if (inputVal != "") {
                                    console.log('submit search click');
                                }
                            }
                        }, '.block-search__search_bar__hint')
                        .on({
                            'click': function() {
                                var $self = r$(this);
                                var $input = $self.prevAll('.block-search__search_bar__input');
                                $input
                                    .val("")
                                    .focus()
                                    .keyup();
                            }
                        }, '.block-search__search_bar__resetter');
                },
                beforeClose: function() {
                    r$('.block-search__search_bar__input')
                        .val('')
                        .change();
                    r$('.block-search__results__container')
                        .addClass('hidden');
                },
                close: function() {
                    r$('.mfp-bg,.mfp-wrap,.mfp-container')
                        .css('height', '');
                    r$('.base.base__scrollable')
                        .niceScroll(SEARCHBAR.obj_nicescroll);
                }
            }
        },
        initSearch: function() {
            r$('.slider_menu_tabs')
                .slick(SEARCHBAR.obj_slickslider);

            r$('.base__popup-link--search')
                .magnificPopup(SEARCHBAR.obj_searchPopup);
        }
    }

    r$(document)
        .ready(function() {
            SEARCHBAR
                .initSearch();
        });
})(jQuery);
