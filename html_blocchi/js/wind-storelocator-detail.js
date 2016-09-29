    /*
     *   WIND   
     *
     *   filename: wind-storelocator-detail.js
     *
     */

    var apiKey = "AIzaSyANesmGotlD9zxrcbKHEi0N40YBawkHuBs"; // API KEY PUBBLICA
    //var apiKey = "AIzaSyCEioPDfzMbW_kplDEjXg5TPHaoE8yB9eg"; // API KEY WIND

    var lang = "it"; //LINGUA PREDEFINITA - Usata per i giorni settimanali (lasciare vuoto per l'inglese)*/
    var n_results = 2;

    function placeDetails() {
        if (pId != "") {
            var service = new google.maps.places.PlacesService(pDetails);
            service.getDetails({
                placeId: pId
            }, function(place, status) {
                var nome_negozio = place.name;
                if (nome_negozio != "") {
                    if (pId != "" || activityid == "") {
                        document.getElementById("nome_negozio").innerHTML = nome_negozio;
                        document.title = nome_negozio;
                        $('meta[property="og:title"]').remove();
                        $('head').append('<meta property="og:title" content="' + nome_negozio + '">');
                    }
                    document.getElementById("nome_negozio").innerHTML = nome_negozio;
                }

                var indirizzo = place.formatted_address;
                if (indirizzo != undefined) {
                    document.getElementById("indirizzo").innerHTML = indirizzo;
                }

                var telefono_int = place.international_phone_number;
                if (telefono_int != undefined) {
                    document.getElementById("telefono_int").innerHTML = telefono_int;
                }

                //var telefono = place.formatted_phone_number;
                //if (telefono != undefined){
                //  document.getElementById("telefono").innerHTML = telefono;
                //} 

                var orariapertura = place.opening_hours;
                if (orariapertura != undefined) {
                    var orari = place.opening_hours.weekday_text;
                    var orari = orari.toString().replace(/,/gi, "</br>");
                    if (lang == "it") {
                        var orari = orari.replace(/Monday/gi, "Lunedì").replace(/Tuesday/gi, "Martedì").replace(/Wednesday/gi, "Mercoledì").replace(/Thursday/gi, "Giovedì").replace(/Friday/gi, "Venerdì").replace(/Saturday/gi, "Sabato").replace(/Sunday/gi, "Domenica");
                        if (indirizzo != undefined) {
                            var indirizzo = indirizzo.replace(/Italy/gi, "Italia");
                        }
                    }
                    document.getElementById("orari").innerHTML = orari;
                }
            });
        }
    }
    // VERSIONE PRECEDENTE "placeDetails" 
    /*function placeDetails() {

        var service = new google.maps.places.PlacesService(pDetails);
        service.getDetails({
            placeId: pId
        }, function(place, status) {

            var indirizzo = place.formatted_address;
            var telefono_int = place.international_phone_number;
            var telefono = place.formatted_phone_number;
            var orari = place.opening_hours.weekday_text;
            var orari = orari.toString().replace(/,/gi, "</br>");

            if (lang == "it") {
                var orari = orari.replace(/Monday/gi, "Lunedì").replace(/Tuesday/gi, "Martedì").replace(/Wednesday/gi, "Mercoledì").replace(/Thursday/gi, "Giovedì").replace(/Friday/gi, "Venerdì").replace(/Saturday/gi, "Sabato").replace(/Sunday/gi, "Domenica");
                var indirizzo = indirizzo.replace(/Italy/gi, "Italia");
            }

            var nome_negozio = place.name;

            document.getElementById("nome_negozio").innerHTML = nome_negozio;
            document.getElementById("indirizzo").innerHTML = indirizzo;
            document.getElementById("orari").innerHTML = orari;
            document.getElementById("telefono_int").innerHTML = telefono_int;
            //document.getElementById("telefono").innerHTML = telefono;

        });
    }*/


    jQuery(document)
        .ready(function($) {
            /** bind da querystring
            var hash = window.location.hash;
            var url = window.location.href;

            //activity id = 21 caratteri?
            if (typeof location.hash !== "undefined" & url.indexOf("activityid") !== -1) {
                activityid = url.substr(url.indexOf("activityid") + 11, 21);
            }

            //place id = 27 caratteri?
            if (typeof location.hash !== "undefined" & url.indexOf("pId") !== -1) {
                pId = url.substr(url.indexOf("pId") + 4, 27);
            }*/
            function toDate(string) {
                var from = string.split("-");
                var parsedDate;
                var day = from[2];
                var month = from[1] - 1;
                var year = from[0];
                var today = new Date();
                var thisMonth = today.getMonth() + 1;
                var thisDay = today.getDate();
                var thisYear = today.getFullYear();
                //console.log("questoGiorno " + thisDay +" questAnno " + thisYear +" questoMese " + thisMonth + " today " + today + " day " + day + " month " + month + " year " + year)
                var diffYear = thisYear - year;
                var diffMonth = thisMonth - month;
                var diffDay = thisDay - day;
                //calcola se è dell'anno scorso
                if ((diffYear) >= 1) {
                    parsedDate = 'Più di un anno fa';
                } else {
                    if (diffMonth == 0) {
                        if (diffDay == 0) { //se il giorno coincide con oggi
                            parsedDate = 'oggi';
                        }
                        if (diffDay == 1) { //se è ieri
                            parsedDate = 'ieri';
                        }
                        if (diffDay > 1) { //se la differenza è superiore a 1
                            parsedDate = diffDay + " giorni fa";
                        }
                    } else {
                        parsedDate = diffMonth + " mese fa";
                        if (diffMonth > 1) { parsedDate = diffMonth + " mesi fa"; }
                    }
                }
                return parsedDate;
            }

            if (activityid !== "") {
                $.ajax({
                    url: "https://www.googleapis.com/plus/v1/people/" + activityid + "?key=" + apiKey,
                    success: function(data) {
                        var url_cover = data.cover.coverPhoto.url;
                        if (url_cover != undefined) {
                            var url_cover = url_cover.replace(/s630/, "s1084");
                            $('#cover_gplus').append("<img src='" + url_cover + "' />");
                        }

                        var chi_siamo = data.aboutMe;
                        if (chi_siamo != undefined) {
                            // var chi_siamo = chi_siamo.split(" ").splice(0,26).toString().replace(/,/gi, " ");
                            // var chi_siamo = chi_siamo.replace(/\u003cdiv dir=\"ltr\"\u003e/gi,"").replace(/\u003cp\u003e/gi,"").replace(/\u003c\/p\u003e/gi,"").replace(/\u003c\/div\u003e/gi,"")+"...";                             
                            //$('meta[property="og:description"]').remove();
                            //$('head').append('<meta property="og:description" content="'+chi_siamo+'">');                         
                            $('#chi-siamo').append(chi_siamo);
                        }

                        var titolo_negozio = data.displayName;
                        if (titolo_negozio != undefined) {
                            if (pId == "") {
                                document.getElementById("nome_negozio").innerHTML = titolo_negozio;
                                document.title = titolo_negozio;
                                $('meta[property="og:title"]').remove();
                                $('head').append('<meta property="og:title" content="' + titolo_negozio + '">');
                            }
                            $('#title_gplus').append("<a href='" + data.url + "' target='blank'>" + titolo_negozio + "</a>");
                        }

                        var avatar_negozio = data.image.url;
                        if (avatar_negozio != undefined) {
                            $('#avatar_gplus').append("<a href='" + data.url + "' target='blank'><img src='" + avatar_negozio + "' /></a>");
                        }
                    },
                    error: function() {
                        //
                    }
                });

                $.ajax({
                    url: "https://www.googleapis.com/plus/v1/people/" + activityid + "/activities/public?maxResults=" + n_results + "&key=" + apiKey,
                    success: function(data) {
                        var k = 0,
                            riga = 0;
                        $.each(data.items, function(i, item) {
                            console.log(item);
                            if (k % 4 == 0) {
                                riga++;
                                $('#container_posts_gplus').append("<ul id='posts_gplus" + riga + "' class='posts_gplus'></ul>");
                            }
                            var substrDate = item.published.substring(0, 10);
                            substrDate = toDate(substrDate);
                            $('#posts_gplus' + riga + '')
                                //.append("<li class='post_gplus'><div id='post_container_gplus'><p><a class='link_title_post_gplus' href='" + item.object.url + "' target='blank'><img class='avatar_post_gplus' src='" + item.actor.image.url + "'/>" + item.actor.displayName + "</a></p>" + item.object.content + "<br><a href='" + item.object.url + "' target='blank'><img class='post_img_gplus' src='" + item.object.attachments[0].image.url + "' /></a></div></li>");
                                .append(
                                    "<li class='post_gplus " + (i % 2 === 0 ? "sx" : "") + "'>" +
                                    "<div class='logo_image_gplus'><img src='" + item.actor.image.url + "' /></div>" +
                                    "<p class='pageName_gplus'>" + item.actor.displayName + "</div>" +
                                    "<div class='published_gplus'> Condivisione pubblica - " + substrDate + "</div>" +
                                    "<div class='clear'></div>" +
                                    "<p class='content_gplus'>" + item.object.content + "</p>" +

                                    "<div class='post_img_gplus'><img class='' src='" + item.object.attachments[0].image.url + "' /></div>" +

                                    "<div class='r'><a class='link_title_post_gplus' href='" + item.object.url + "' target='blank'>Leggi tutto<i class='fa fa-chevron-right' aria-hidden='true'></i></a></div>" +

                                    "</li>"); //+ item.actor.displayName + "</a></p>" + item.object.content + "<br/><a href='" + item.object.url + "' target='blank'><img class='post_img_gplus' src='" + item.object.attachments[0].image.url + "' /></a></div></li>");

                            k++;
                        });
                    }
                });
            }
            //VERSIONE PRECEDENTE GPLUS 
            /*if (pId !== "" && activityid !== "") {

                $.ajax({
                    url: "https://www.googleapis.com/plus/v1/people/" + activityid + "?key=" + apiKey,

                    success: function(data) {

                        var url_cover = data.cover.coverPhoto.url;
                        var url_cover = url_cover.replace(/s630/, "s1084");
                        var chi_siamo = data.aboutMe;
                        //var chi_siamo = chi_siamo.split(" ").splice(0, 26).toString().replace(/,/gi, " ");
                        //var chisamo = chi_siamo.replace(/\u003cdiv dir=\"ltr\"\u003e/gi, "").replace(/\u003cp\u003e/gi, "").replace(/\u003c\/p\u003e/gi, "").replace(/\u003c\/div\u003e/gi, "") + "...";

                        //document.title = data.displayName;
                        //$('meta[property="og:title"]').remove();
                        //$('meta[property="og:description"]').remove();
                        //$('head').append('<meta property="og:title" content="' + data.displayName + '">');
                        //$('head').append('<meta property="og:description" content="' + chi_siamo + '">');

                        $('#cover_gplus').append("<img src='" + data.cover.coverPhoto.url + "' />");
                        $('#title_gplus').append("<a href='" + data.url + "' target='blank'>" + data.displayName + "</a>");
                        $('#avatar_gplus').append("<a href='" + data.url + "' target='blank'><img src='" + data.image.url + "' /></a>");
                        $('#chi-siamo').append(chi_siamo);

                    },
                    error: function() {
                        //
                    }
                });

                $.ajax({
                    url: "https://www.googleapis.com/plus/v1/people/" + activityid + "/activities/public?maxResults=" + n_results + "&key=" + apiKey,
                    success: function(data) {
                        var k = 0,
                            riga = 0;
                        $.each(data.items, function(i, item) {

                            if (k % 4 == 0) {
                                riga++;
                                $('#container_posts_gplus').append("<ul id='posts_gplus" + riga + "' class='posts_gplus'></ul>");
                            }

                            $('#posts_gplus' + riga + '')
                                //.append("<li class='post_gplus'><div id='post_container_gplus'><p><a class='link_title_post_gplus' href='" + item.object.url + "' target='blank'><img class='avatar_post_gplus' src='" + item.actor.image.url + "'/>" + item.actor.displayName + "</a></p>" + item.object.content + "<br><a href='" + item.object.url + "' target='blank'><img class='post_img_gplus' src='" + item.object.attachments[0].image.url + "' /></a></div></li>");
                                .append("<li class='post_gplus " + (i % 2 === 0 ? "sx" : "") + "'>" +

                                    "<div class='post_img_gplus'><img class='' src='" + item.object.attachments[0].image.url + "' /></div>" +

                                    "<p>" + item.object.content + "</p>" +

                                    "<div class='r'><a class='link_title_post_gplus' href='" + item.object.url + "' target='blank'>Leggi tutto<i class='fa fa-chevron-right' aria-hidden='true'></i></a></div>" +

                                    "</li>"); //+ item.actor.displayName + "</a></p>" + item.object.content + "<br/><a href='" + item.object.url + "' target='blank'><img class='post_img_gplus' src='" + item.object.attachments[0].image.url + "' /></a></div></li>");

                            k++;
                        });
                    }
                });
           }*/

            // enquire
            //     .register("screen and (max-width: 45.11em)", {
            //         deferSetup: true,
            //         setup: function() {

            //         },
            //         match: function() {

            //             if (is_mobile()) {

            //                 $(".storelocator--detai")
            //                     .find(".href")
            //                     .each(function(i, el) {
            //                         var href = $oot(el).attr("data-msite-url");
            //                         if (typeof href !== "undefined") {
            //                             $oot(el).attr("href", href);
            //                         }
            //                     });
            //             }

            //         }
            //     }, false)

            //         .register("screen and (min-width: 55em)", {

            //             deferSetup: true,
            //             setup: function() {

            //             },
            //             match: function() {
            // ;

            //                  $(".storelocator--detai")
            //                     .find(".href")
            //                     .each(function(i, el) {
            //                         var href = $oot(el).attr("data-desk-url");
            //                         if (typeof href === "undefined") {
            //                             $oot(el).attr("data-desk-url", $oot(el).attr("href"))
            //                         } else {
            //                             $oot(el).attr("href", href);
            //                         }
            //                     });
            //             }
            //         }, false);

        });
