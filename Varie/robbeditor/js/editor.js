jQuery(document).ready(function($) {

    function getBaseClass(elem) {
        var classTotal = $(elem).attr('class');
        var classTotal = classTotal.split('-')[1];
        var baseTarget ='area-' + classTotal;
        return(baseTarget);
    }

    function getEndClass(elem) {
        var endTarget = getBaseClass(elem);
        var endTarget = 'target_' + endTarget;
        return(endTarget);
    }    

    function removeString(elem){
        var stringtoRemove =  '<div class="edit_tool '+getBaseClass($(elem))+'"></div>';
        console.log(stringtoRemove);
        return(stringtoRemove);
    }

    $('.edit_tool').click(function() {
        var baseItem = "." + getBaseClass($(this));
        var endItem = "." + getEndClass($(this));
        $(endItem).slideToggle();
        toEdit = $(this).parents('.anchor_tool').html();
        //toEdit = toEdit.replace(removeString($(this)),'');
        $(endItem).val(toEdit);        
    });

    $('.area_tool').bind("keyup", function() {
        var classTotal = "." + $(this).attr('class').split('target_')[1];
        console.log(classTotal);
        var newHtml = $(this).val();
        $(classTotal).parents('.anchor_tool').html(newHtml);        
    });
});
