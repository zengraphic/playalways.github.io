function set_bt_process(bt) {
    bt.innerHTML = "<span class='fa fa-spinner spin-animate'></span>";
}

function on_bt_feedback(bt, flag, secs) {
    bt.innerHTML = (flag === 0) ? '<span class="fa fa-check rotatey-animate"></span>' : '<span class="fa fa-close fadein-animate"></span>';
    setTimeout(function() {
        bt.innerHTML = '<span class="fadein-animate">' + bt.getAttribute('data-label') + '</span>';
    }, secs * 1000);
}

// prefixer helper function
var pfx = ["webkit", "moz", "MS", "o", ""];

function prefixedEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element
            .addEventListener(pfx[p] + type, callback, false);
    }
}

var r$ = jQuery.noConflict();
r$
    .ready(function() {
        var obj_nicescroll = {
            cursorcolor: "#f48135",
            cursorwidth: "10px",
            cursorborder: "0",
            mousescrollstep: 80,
            background: "#e6e9ed",
            spacebarenabled: false,
            horizrailenabled: false,
            autohidemode: false,
            zindex: 998
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
            zindex: 998
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
            r$('.base__accordion')
                .on('hidden.bs.collapse', function(e) {
                    r$(e.target)
                        .prev('.panel-heading')
                        .removeClass("active");
                });
            r$('.base__accordion')
                .on('shown.bs.collapse', function(e) {
                    r$(e.target)
                        .prev('.panel-heading')
                        .addClass("active");
                });

            //checkbox
            r$(".base__checkbox")
                .on("change", function(e) {
                    var $chk = r$(e.target);
                    $chk.toggleClass("on");
                });

            //spinners
            r$('.base__spinner--pm')
                .TouchSpin({
                    buttondown_class: "btn btn-pm--sx",
                    buttonup_class: "btn btn-pm--dx"
                });
            r$('.base__spinner--aw')
                .TouchSpin({
                    buttondown_class: "btn btn-arr--sx",
                    buttonup_class: "btn btn-arr--dx"
                });

            //select
            r$('.base__select')
                .on('hide.bs.select', function(e) {
                    // do something...
                })
                .on('show.bs.select', function(e) {
                    // do something...
                })
                .on('loaded.bs.select', function(e) {
                    r$(this).selectpicker({
                        'size': 6,
                        'dropupAuto': false
                    });
                });

            //tooltip
            r$('[data-toggle="tooltip"]')
                .tooltip({
                    placement: 'bottom',
                    delay: 100,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            r$('[data-toggle="tooltip_ccv"]')
                .tooltip({
                    placement: 'bottom',
                    delay: 100,
                    template: '<div class="tooltip tooltip--ccv" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--ccv"></div><div class="tooltip-inner"></div></div>'
                });
            r$('[data-toggle="tooltip_input"]')
                .tooltip({
                    placement: 'bottom',
                    delay: 100,
                    template: '<div class="tooltip tooltip--input" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--input"></div><div class="tooltip-inner"></div></div>'
                });

            //scrollable
            if (r$(".base__scrollable").length > 0) {
                r$('.base__scrollable').niceScroll(obj_nicescroll);
            }
            if (r$(".base__scrollable2").length > 0) {
                r$('.base__scrollable2').niceScroll(obj_nicescroll2);
            }

            //datepicker
            r$.fn.datetimepicker.dates.en.days = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
            r$.fn.datetimepicker.dates.en.daysShort = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
            r$.fn.datetimepicker.dates.en.daysMin = ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];
            r$.fn.datetimepicker.dates.en.months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
            r$.fn.datetimepicker.dates.en.monthsShort = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
            r$.fn.datetimepicker.dates.en.today = "Oggi";
            r$('.base__datepicker--input')
                .datetimepicker(obj_datepicker);

            //semplice dialog (modal registrazione)
            r$('.base__popup-link')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade mfp-standard',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        beforeClose: function() {},
                        close: function() {
                            // reset position btn (conferma/avanti) of footer
                            r$(".modalfooter").css("margin-top", 0);
                            //r$('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '');
                            r$('html,body')
                                .css({
                                    'overflow': ''
                                });

                        },
                        open: function() {
                            // position btn conferma/avanti in bottom

                            r$('html,body')
                                .css({
                                    'overflow': 'hidden'
                                });

                            if (window.outerWidth <= 768) {
                                r$('.mfp-bg,.mfp-wrap')
                                    .css({
                                        'height': 'calc(100% - 43px)'
                                    });

                            } else {
                                resizeTargets();


                                r$("#menu-three .slidemenu .back__breadcrumbs--modal").css("left", "-133px");

                                //r$('.mfp-bg,.mfp-wrap,.mfp-container').css('height', 'calc(100% - 43px)');
                            }
                        }
                    }
                });

            //full height dialog (modal ricarica)

            r$('.base__popup-link--ricarica')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade mfp-ricarica',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        close: function() {
                            //r$('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '');
                            r$('html,body')
                                .css({
                                    'overflow': ''
                                });
                        },
                        open: function() {
                            //r$('.mfp-bg,.mfp-wrap,.mfp-container').css('height', '100%');
                            r$('html,body')
                                .css({
                                    'overflow': 'hidden'
                                });
                        }
                    }
                });


            r$('.base__popup-link--contract')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade-contract',
                    // closeOnContentClick: true,
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350
                });

            r$('.base__gallery')
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

            r$('.base__gallery-link')
                .magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        close: function() {
                            var $popup = r$(this.content).find(".base__gallery--carousel");
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
                            //r$(this.content).find(".base__gallery--carousel").destroy();
                        },

                        beforeOpen: function() {

                        },

                        open: function() {
                            var $popup = r$(this.content).find(".base__gallery--carousel");
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

function eCommerceLogin(action, channel, callback) {

    var v = {
        action: action,
        chanel: channel,
        callback: callback,
        url: document.location.href
    };

    this.init = function(obj) {
        //inizializzo il metodo

        r$(obj).attr("href", action);

        switch (action) {
            case '#recoveryCredential':

        }

        r$(obj)
            .magnificPopup({
                type: 'inline',
                mainClass: 'mfp-fade mfp-ricarica',
                // closeOnContentClick: true,
                midClick: true,
                alignTop: false,
                removalDelay: 350,
                callbacks: {
                    close: function() {
                        // reset position btn (conferma/avanti) of footer
                        r$(".modalfooter").css("margin-top", 0);
                        r$('html,body')
                            .css({
                                'overflow': ''
                            });

                    },
                    open: function() {
                        // position btn conferma/avanti in bottom
                        resizeTargets();

                        r$("#menu-three .slidemenu .back__breadcrumbs--modal").css("left", "-133px");
                        r$('html,body')
                            .css({
                                'overflow': 'hidden'
                            });

                    }
                }
            });
    };

}

function resizeTargets() {
    r$(".modalfooter")
        .each(function() {
            var medscroll = r$('.base__scrollable').prop('scrollHeight');
            var medcont = r$('.box--register').height();
            var medheader = 100;
            var newheight = medscroll - medcont - medheader - 60;
            r$(this)
                .css("margin-top", newheight);
        });
}
