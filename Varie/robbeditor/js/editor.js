jQuery(document).ready(function($) {

    //stilizza i tag
    //toglie il binding a tutti i tasti di edit
    function unbindAll() {
        $('.edit_tool').unbind('click');
    }

    //splitta dopo il "-" e aggiunge area. (area-hero)
    function getBaseClass(elem) {
        var classTotal = $(elem).attr('class');
        var classTotal = classTotal.split('-')[1];
        var baseTarget = 'area-' + classTotal;
        return (baseTarget);
    }

    //prende la classe base dell'elemento, splitta dopo il "-" e aggiunge target_ (target_area-hero)    
    function getEndClass(elem) {
        var endTarget = getBaseClass(elem);
        var endTarget = 'target_' + endTarget;
        return (endTarget);
    }

    //prende la classe base dell'elemento, splitta dopo il "-" e aggiunge anchor_ (anchor_area-hero) 
    function getAnchor(elem) {
        var endTarget = getBaseClass(elem);
        var endTarget = 'anchor_' + endTarget;
        return (endTarget);
    }

    //binda il click al tool
    function bindEdit(element) {
        $(element).on("click", function(event) {
            var baseItem = "." + getBaseClass($(this));
            var endItem = "." + getEndClass($(this));
            var anchorItem = "." + getAnchor($(this));
            //console.log("base: " + baseItem + " end: " + endItem);
            $(endItem).slideToggle();
            toEdit = $(anchorItem).html();
            console.log(anchorItem);
            //toEdit = toEdit.replace(removeString($(this)),'');
            $(endItem).text(toEdit);
        });
    };

    $('.area_tool').bind("keyup", function() {
        var anchorItem = "." + getAnchor($(this));
        var newHtml = $(this).text();
        unbindAll();
        $(anchorItem).html(newHtml);
        bindEdit('.edit_tool');
    });

    bindEdit('.edit_tool');
});
