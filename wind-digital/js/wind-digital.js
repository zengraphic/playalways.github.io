jQuery(document).ready(function($) {
    // ================== CARICAMENTO DATI ===================
    var attachTo = $('.container_toAttach');

    function initPage() {
        getDataFromJson();
    }

    $('.add_box_wd').click(function() {
        $('.ghost_box').slideDown();
        var attachTo = $('.container_toAttach');
        var color = "red";
        var link = "ciao";
        var name = "prova";
    });

    $('.color_picker').click(function() {
        var parentColor = $(this).parents('.content_wd');
        var thisColor = $(this).data('color');
        parentColor.removeClass('red');
        parentColor.removeClass('orange');
        parentColor.removeClass('blue');
        parentColor.removeClass('green');
        parentColor.addClass(thisColor);
        $('.color_picker').removeClass('active');
        $(this).addClass('active');
    });

    $('.confirm_box').click(function() {
        //confermo e appendo
        var title = $('.input_title').val();
        var link = $('.input_link').val();
        var color = $('.color_picker.active').data('color');
        console.log(color);
        attachTo.append(
            '<div class="container_single">' +
            '<div class="box_wd ' + color + '">' +
            '<a href=" ' + link + '" target="_blank">' +
            '<div class="content_wd">' +
            '<p class="title">' + title + '</p>' +
            '</div>' +
            '</a>' +
            '</div>' +
            '<div class="wd_edit">Edit</div>' +
            '</div>'
        );
        $('.ghost_box').hide();
    });


    function populateLinks(data) {
        var linksDim = Object.keys(data.links).length;
        console.log(data);
        console.log(linksDim);
        //ciclo nel json
        $.each(data, function(index, jsonObject) {
            $.each(jsonObject, function(key, val) {
                //assegno le variabili all'oggetto attuale -> key
                var newObject = jsonObject[key][0];
                var name = newObject.name;
                var link = newObject.link;
                var color = newObject.color;
                attachTo.append(
                    '<div class="container_single">' +
                    '<div class="box_wd ' + color + '">' +
                    '<a href=" ' + link + '" target="_blank">' +
                    '<div class="content_wd">' +
                    '<p class="title">' + name + '</p>' +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '<div class="wd_edit">Edit</div>' +
                    '</div>'
                );
            });
        });
    }


    var url = "../js/links.json";

    function getDataFromJson() {
        console.log('getDataFromJson');
        $.getJSON(url).done(function(data) {
            populateLinks(data);
        });
    }


    //========= INIT PAGE ==========//
    console.log('start');
    initPage();


    $('.diocelamandibuona').click(function(e){
                    e.preventDefault();
                    console.log('select_link clicked');
                    

                    var data = {};
                    data.title = "prova";
                    data.link = "provalink";
                    data.color = "color";                    
                    $.ajax({
                        type: 'POST',
                        crossDomain: true,
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://95.85.60.126:8080/WDlinks',                      
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });

                });             
});
