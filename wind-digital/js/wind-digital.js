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
        parsedData = $.parseJSON(data);
        console.log(parsedData);
        console.log(parsedData[0].id);
        for (i = 0; i < parsedData.length; i++) {
            var name = parsedData[i].link_title;
            var link = parsedData[i].link_url;
            var color = parsedData[i].link_color;
            var id = parsedData[i].id;
            console.log(color + " " + link + " " + name);
            attachTo.append(
                '<div class="container_single" data-index="' + id + '">' +
                '<div class="box_wd ' + color + '">' +
                '<a href=" ' + link + '" target="_blank">' +
                '<div class="content_wd">' +
                '<p class="title">' + name + '</p>' +
                '</div>' +
                '</a>' +
                '</div>' +
                '<div class="wd_edit">Remove</div>' +
                '</div>'
            );
        }
    }

    function getDataFromJson() {
        console.log('getDataFromJson');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://95.85.60.126:8080/WDlinks",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
        }

        $.ajax(settings).done(function(response) {
            console.log("CAZZO " + response);
            populateLinks(response);
        });
    }


    //========= INIT PAGE ==========//
    console.log('start');
    initPage();


        $('.container_boxes').on('click', '.wd_edit', function() {
        console.log('CAOASDAS');
        var idToDelete = $(this).parents(".container_single").data('index');
        console.log(idToDelete);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://95.85.60.126:8080/WDlinks",
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "f9fcecbd-b322-7190-150f-5539839369f9"
            },
            "processData": false,
            "data": "{\"id\":" + idToDelete + "}"
        }

        $.ajax(settings).done(function(response) {
            console.log(response);
        });
    });

    $('.save_wd').click(function(e) {

        var title = $('.input_title').val();
        var link = $('.input_link').val();
        var color = $('.color_picker.active').data('color');

        var data = {};
        data.link_title = title;
        data.link_url = link;
        data.link_color = color;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://95.85.60.126:8080/WDlinks",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function(response) {
            console.log(response);
        });
    });
});
