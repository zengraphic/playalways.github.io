/*



*/

jQuery(function($){

   function set_bt_process(element) {
    var spinner_string = "";
    if (element.hasClass('base__bt--or')) {
        spinner_string = '<i class="base__icon icon_spinner--white spin-animate"></i>';
    } else {
        spinner_string = '<i class="base__icon icon_spinner--color spin-animate"></i>';
    }
      
      element.html(spinner_string);
  }

  function on_bt_feedback(element, flag, secs) {
    var confirm_string,cancel_string;
    if (element.hasClass('base__bt--or')) {
        confirm_string = '<i class="base__icon icon_confirm--white rotatey-animate"></i>';
        cancel_string = '<i class="base__icon icon_fail--white fadein-animate"></i>';
    } else {
        confirm_string = '<i class="base__icon icon_confirm--color rotatey-animate"></i>';
        cancel_string = '<i class="base__icon icon_fail--color fadein-animate"></i>';
    }
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

    var obj_datepicker_lite = {
        language: "it",
        weekStart: 1,
        minView: 2,
        autoclose: true,
        showMeridian: false,
        pickerPosition: "bottom-left"
    };

    var obj_datepicker_full = {
        language: "it",
        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        showMeridian: false,
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

        $wind.fn.datetimepicker.dates['en'] = {
            days: ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"],
            daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
            daysMin:["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
            months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            monthsShort:["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
            meridiem: '',
            today: "Oggi"
        }
        
        $wind('.base__datepicker--input.lite')
            .datetimepicker(obj_datepicker_lite);

        $wind('.base__datepicker--input.full')
            .datetimepicker(obj_datepicker_full);

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
