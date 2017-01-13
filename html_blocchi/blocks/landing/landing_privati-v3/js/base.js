function set_bt_process(bt) {
    bt.innerHTML = "<span class='fa fa-spinner spin-animate'></span>";
}

function on_bt_feedback(bt, flag, secs) {
    bt.innerHTML = (flag === 0) ? "<span class='fa fa-check rotatey-animate'></span>" : "<span class='fa fa-close fadein-animate'></span>";
    setTimeout(function() {
        bt.innerHTML = "<span class='fadein-animate'>" + bt.getAttribute("data-label") + "</span>";
    }, secs * 1000);
}

// prefixer helper function
var pfx = ["webkit", "moz", "MS", "o", ""];

function prefixedEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
}

!(function(jQuery, window) {
    "use strict";
    jQuery(document).ready(function($) {
        var obj_nicescroll = {
            cursorcolor: "#f48135",
            cursorwidth: "10px",
            cursorborder: "0",
            background: "#e6e9ed",
            spacebarenabled: false,
            horizrailenabled: true,
            autohidemode: false,
            zindex: 1100
        };
        var obj_nicescroll2 = {
            cursorcolor: "#f48135",
            cursorwidth: "0",
            cursorborder: "0",
            background: "#e6e9ed",
            spacebarenabled: false,
            horizrailenabled: true,
            autohidemode: false,
            opacity: 0,
            zindex: 1100
        };
        var obj_datepicker = {
            language: "it",
            weekStart: 1,
            todayBtn: true,
            autoclose: true,
            todayHighlight: true,
            startView: 2,
            showMeridian: true,
            minuteStep: 5,
            pickerPosition: "bottom-left"
        };
        //init ui

        var init_ui = function() {
            //buttons
            Waves.attach('.base__bt', [
                'waves-button', 'waves-float', "waves-light"
            ]);
            Waves.init({
                // How long Waves effect duration
                // when it's clicked (in milliseconds)
                duration: 450,
                // Delay showing Waves effect on touch
                // and hide the effect if user scrolls
                // (0 to disable delay) (in milliseconds)
                delay: 10
            });

            //accordions
            $('.base__accordion')
                .on('hidden.bs.collapse', function(e) {
                    $(e.target)
                        .prev('.panel-heading')
                        .removeClass("active");
                });
            $('.base__accordion')
                .on('shown.bs.collapse', function(e) {
                    $(e.target)
                        .prev('.panel-heading')
                        .addClass("active");
                });

            //checkbox
            $(".base__checkbox")
                .on("change", function(e) {
                    var $chk = $(e.target);
                    $chk.toggleClass("on");
                });

            //spinners
            $('.base__spinner--pm').TouchSpin({
                buttondown_class: "btn btn-pm--sx",
                buttonup_class: "btn btn-pm--dx"
            });
            $('.base__spinner--aw').TouchSpin({
                buttondown_class: "btn btn-arr--sx",
                buttonup_class: "btn btn-arr--dx"
            });

            //select
            $('.base__select')
                .on('hide.bs.select', function(e) {
                    // do something...
                })
                .on('show.bs.select', function(e) {
                    // do something...
                });

            //tooltip
            $('[data-toggle="tooltip"]').tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
            $('[data-toggle="tooltip_ccv"]').tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip tooltip--ccv" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--ccv"></div><div class="tooltip-inner"></div></div>'
            });
            $('[data-toggle="tooltip_input"]').tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip tooltip--input" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--input"></div><div class="tooltip-inner"></div></div>'
            });

            //scrollable
            if ($(".base__scrollable").length > 0) {
                $('.base__scrollable').niceScroll(obj_nicescroll);
            }
            if ($(".base__scrollable2").length > 0) {
                $('.base__scrollable2').niceScroll(obj_nicescroll2);
            }

            //datepicker
            $.fn.datetimepicker.dates.en.days = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
            $.fn.datetimepicker.dates.en.daysShort = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
            $.fn.datetimepicker.dates.en.daysMin = ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];
            $.fn.datetimepicker.dates.en.months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            $.fn.datetimepicker.dates.en.monthsShort = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
            $.fn.datetimepicker.dates.en.today = "Oggi";
            $('.base__datepicker--input')
                .datetimepicker(obj_datepicker);

            //semplice dialog (modal registrazione)
            $('.base__popup-link')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        beforeClose: function() {},
                        close: function() {
                            // reset position btn (conferma/avanti) of footer
                            $(".modalfooter").css("margin-top", 0);
                            $('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '');
                        },
                        open: function() {
                            // position btn conferma/avanti in bottom
                            resizeTargets();

                            function resizeTargets() {
                                $(".modalfooter").each(function() {
                                    var medscroll = $('.base__scrollable').prop('scrollHeight');
                                    var medcont = $('.box--register').height();
                                    var medheader = 100;
                                    var newheight = medscroll - medcont - medheader - 60;
                                    $(this).css("margin-top", newheight);
                                });
                            }
                            $("#menu-three .slidemenu .back__breadcrumbs--modal").css("left", "-133px");
                            $('.mfp-bg,.mfp-wrap,.mfp-container').css('height', 'calc(100% - 43px)');
                        }
                    }
                });


            //full height dialog (modal ricarica)


            $('.base__popup-link--ricarica')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        close: function() {
                            $('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '');
                        },
                        open: function() {
                            $('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '100%');
                        }
                    }
                });

            $('.base__popup-link--contract')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade-contract',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,

                });

            $('.base__gallery')
                .magnificPopup({
                    removalDelay: 350,
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading #%curr%...',
                    mainClass: 'mfp-fade',

                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [2, 2] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function(item) {
                            return item.el.attr('title');
                        }
                    }
                });

            $('.base__gallery-link')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        close: function() {
                            var $popup = $(this.content).find(".base__gallery--carousel");
                            $popup
                                .owlCarousel({
                                    navigation: true,
                                    slideSpeed: 1000,
                                    rewindSpeed: 1000,
                                    pagination: true,
                                    stopOnHover: false,
                                    singleItem: true,
                                    responsive: true,
                                    itemsScaleUp: true,
                                    responsiveRefreshRate: 17,
                                    navigationText: ["", ""],
                                    autoHeight: true,
                                    responsiveBaseWidth: ".base__popup > .container"
                                });
                        },

                        afterClose: function() {
                            //$(this.content).find(".base__gallery--carousel").destroy();
                        },

                        beforeOpen: function() {

                        },

                        open: function() {
                            var $popup = $(this.content).find(".base__gallery--carousel");
                            $popup
                                .owlCarousel({
                                    navigation: true,
                                    slideSpeed: 1000,
                                    rewindSpeed: 1000,
                                    pagination: true,
                                    stopOnHover: false,
                                    singleItem: true,
                                    responsive: true,
                                    itemsScaleUp: true,
                                    responsiveRefreshRate: 17,
                                    navigationText: ["", ""],
                                    autoHeight: true,
                                    responsiveBaseWidth: ".base__popup > .container"
                                });
                        }
                    }
                });
        };



        head(document, function() {
            // Copyright 2014-2015 Twitter, Inc.
            // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(
                    document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                    )
                );
                document.querySelector('head').appendChild(msViewportStyle);
            }

            if (typeof head.browser.ie !== "undefined" && head.browser.version <= 9) {
                classie.addClass(document.body, "old-ie");
                head.load(["https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.js", "css/base-style-ie.css"], init_ui);
            } else {
                init_ui();
            }
        });
    });



})(jQuery, window);
