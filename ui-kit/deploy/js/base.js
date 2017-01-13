/*



*/

jQuery(function($){

   function set_bt_process(element) {
     var spinner_string = '<i class="btn_icon"><img class="spin-animate" src="img/spinner_white.svg"></i>';
      element.html(spinner_string);
  }

  function on_bt_feedback(element, flag, secs) {
    var confirm_string = '<i class="btn_icon"><img class="rotatey-animate" src="img/confirm_white.svg"></i>';
    var cancel_string = '<i class="btn_icon"><img class="fadein-animate" src="img/cancel_white.svg"></i>';
    if(flag === 0) {
      element.html(confirm_string);
    } else {
      element.html(cancel_string);
    }
    setTimeout(function() {
      var result_string = "<span class='fadein-animate'>" + element.data().label + "</span>";
      element.html(result_string);
      element.removeClass('base__bt--icon');
    }, secs * 1000);
  }

  function simulazione_click(element){
    element.addClass('base__bt--icon');
    set_bt_process(element);
    setTimeout(function() {
        on_bt_feedback(element, 0, 1.5);
    }, 3000);
  }

  $('.base__bt--process').click(function(event){
    event.preventDefault();
    var element = $(this);
    simulazione_click(element);
  });

});





// prefixer helper function
var pfx = ["webkit", "moz", "MS", "o", ""];

function prefixedEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
}


/**

// new event listener function
var monkey = document.querySelector("#monkey");
prefixedEventListener(monkey,"AnimationStart",function(e){
    console.log("log at beginning of monkey animation");
});

*/

(function(jQuery, window) {

    "use strict";

    var $wind = jQuery.noConflict();

    var obj_nicescroll = {
        cursorcolor: "#f48135",
        cursorwidth: "10px",
        cursorborder: "0px",
        background: "#e6e9ed",
        spacebarenabled: false,
        horizrailenabled: true,
        autohidemode: false,
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
            //fontAwesome: true

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
        $wind('.base__accordion')
            .on('hidden.bs.collapse', function(e) {
                $wind(e.target)
                    .prev('.panel-heading')
                    .removeClass("active");
            });
        $wind('.base__accordion')
            .on('shown.bs.collapse', function(e) {
                $wind(e.target)
                    .prev('.panel-heading')
                    .addClass("active");
            });

        //checkbox
        $wind(".base__checkbox")
            .on("change", function(e) {
                var $chk = $wind(e.target);
                $chk
                    .toggleClass("on");
            });

        //spinners
        $wind('.base__spinner--pm')
            .TouchSpin({
                buttondown_class: "btn btn-pm--sx",
                buttonup_class: "btn btn-pm--dx"
            });
        $wind('.base__spinner--aw')
            .TouchSpin({
                buttondown_class: "btn btn-arr--sx",
                buttonup_class: "btn btn-arr--dx"
            });

        //select
        $wind('.base__select')
            .on('hide.bs.select', function(e) {
                // do something...

            })
            .on('show.bs.select', function(e) {
                // do something...
            });

        //tooltip
        $wind('[data-toggle="tooltip"]')
            .tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
        $wind('[data-toggle="tooltip_ccv"]')
            .tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip tooltip--ccv" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--ccv"></div><div class="tooltip-inner"></div></div>'
            });
        $wind('[data-toggle="tooltip_input"]')
            .tooltip({
                placement: 'bottom',
                delay: 100,
                template: '<div class="tooltip tooltip--input" id="tooltip--ccv" role="tooltip"><div class="tooltip-arrow tooltip-arrow--input"></div><div class="tooltip-inner"></div></div>'
            });

        //scrollable

        if ($wind(".base__scrollable").length > 0) {
            $wind('.base__scrollable')
                .niceScroll(obj_nicescroll);
        }


        //datepicker

        $wind.fn.datetimepicker.dates.en.days = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"];
        $wind.fn.datetimepicker.dates.en.daysShort = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
        $wind.fn.datetimepicker.dates.en.daysMin = ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];
        $wind.fn.datetimepicker.dates.en.months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        $wind.fn.datetimepicker.dates.en.monthsShort = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
        $wind.fn.datetimepicker.dates.en.today = "Oggi";

        $wind('.base__datepicker--input')
            .datetimepicker(obj_datepicker);

        //semplice dialog
        $wind('.base__popup-link')
            .magnificPopup({
                type: 'inline',
                mainClass: 'mfp-fade',
                // closeOnContentClick: true,
                midClick: true,
                alignTop: false,
                removalDelay: 350,
                callbacks: {
                    beforeClose: function() {

                    },
                    close: function() {

                    },
                    open: function() {
                        resizeTargets();
                        function resizeTargets() {
                            $wind(".modalfooter")
                                .each(function() {
                                    var medscroll = $wind('.base__scrollable').prop('scrollHeight');
                                    var medcont = $wind('.box--register').height();
                                    var medheader = 100;
                                    var newheight = medscroll - medcont - medheader;
                                    $wind(this)
                                        .css("margin-top", newheight);
                                });
                        }
                    }
                }
            });


        $wind('.base__gallery')
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


        /**$wind('.base__gallery-link')
            .magnificPopup({

                    type: 'inline',
                    mainClass: 'mfp-fade',
                    midClick: true,
                    alignTop: false,
                    removalDelay: 350,
                    callbacks: {
                        close: function() {
                            var $popup = $wind(this.content).find(".base__gallery--carousel");
                            $popup
                                .owlCarousel({
                                            navigation: true,
                                            slideSpeed: 1000,
                                            rewindSpeed: 1000,
                                            pagination: true,
                                            stopOnHover: false,
                                            singleItem : true,
                                            responsive: true,
                                            itemsScaleUp: true,
                                            responsiveRefreshRate: 17,
                                            navigationText: ["", ""],
                                            autoHeight : true,
                                            responsiveBaseWidth : ".base__popup > .container"
                                            //touchDrag: is_device_mobile,
                                            //mouseDrag: !is_device_mobile,
                                });
                        },

                        afterClose: function(){
                            //$wind(this.content).find(".base__gallery--carousel").destroy();
                        },

                        beforeOpen: function(){

                        },

                        open: function() {
                            var $popup = $wind(this.content).find(".base__gallery--carousel");
                            $popup
                                .owlCarousel({
                                            navigation: true,
                                            slideSpeed: 1000,
                                            rewindSpeed: 1000,
                                            pagination: true,
                                            stopOnHover: false,
                                            singleItem : true,
                                            responsive: true,
                                            itemsScaleUp: true,
                                            responsiveRefreshRate: 17,
                                            navigationText: ["", ""],
                                            autoHeight : true,
                                            responsiveBaseWidth : ".base__popup > .container"
                                            //touchDrag: is_device_mobile,
                                            //mouseDrag: !is_device_mobile,
                                });
                        }
                    }
               });*/
    };

    head(document, function() {

        // Copyright 2014-2015 Twitter, Inc.
        // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle
                .appendChild(
                    document
                    .createTextNode(
                        '@-ms-viewport{width:auto!important}'
                    )
                );
            document
                .querySelector('head')
                .appendChild(msViewportStyle);
        }

        if (typeof head.browser.ie !== "undefined" && head.browser.version <= 9) {
            classie
                .addClass(document.body, "old-ie");
            head
                .load(["https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.js", "css/base-style-ie.css"], init_ui);
        } else {
            init_ui();
        }
    });

})(jQuery, window);
