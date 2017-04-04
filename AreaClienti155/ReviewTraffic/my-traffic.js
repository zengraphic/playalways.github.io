(function($, window) {

    'use strict';

    var obj_newscroll, mobileActiveAccordion, mobileActiveTables;

    obj_newscroll = {
        axys: "y",
        theme:"wind-theme",
        updateOnContentResize:true,
        documentTouchScroll:false
    };

    mobileActiveAccordion = window.innerWidth <= 480 ? true : false;
    mobileActiveTables = window.innerWidth <= 600 ? true : false;

    function setMobileAccordion(isMobile) {
        var headingsObj, rowObj;
        headingsObj = $('.my_traffic__contracts_accordion__col_headings');
        rowObj = $('.my_traffic__contracts_accordion__row');
        headingsObj
            .remove();
        if (isMobile) {
            headingsObj
                .insertBefore(rowObj);
        } else {
            headingsObj
                .first()
                .insertBefore(rowObj[0]);
        }
        mobileActiveAccordion = isMobile;
    }

    function setMobileTables(isMobile) {
    	var tables,table,headings,content,rows;

    	tables = $('.my_traffic__contracts_details__data');
    	if (tables.length > 0) {
    		$.each(tables,function(index,element){
    			table = $(element);

    			headings = table.find('.my_traffic__contracts_details__data__col_headings');
                content = table.find('.my_traffic__contracts_details__data__content');
    			rows = table.find('.my_traffic__contracts_details__data__row');
    			headings
            		.remove();
            	if (isMobile) {
		            headings
		                .insertBefore(rows);
		        } else {
		            headings
		                .first()
		                .insertBefore(content);
		        }
		        mobileActiveTables = isMobile;
	    	});
            content.mCustomScrollbar("update");
    	}
    }

    function setActive(contract, link, icon) {

        link
            .addClass('active');
        contract
            .addClass('active');
        icon
            .addClass('active');
    }

    function unSetActive(link, contract, icon) {
        link
            .removeClass('active');
        contract
            .removeClass('active');
        icon
            .removeClass('active');
    }

    function showContractSummary(contractSummaryObj) {
        contractSummaryObj
            .show();
    }

    function hideContractSummary(contractSummaryObj) {
        contractSummaryObj
            .hide();
    }

    function showContractDetail(contractDetailContainer, detailToActivate) {
        var contractDetailTab, contractDetailContent, contractDetailContentScrollable;
        contractDetailTab = contractDetailContainer.find('.my_traffic__contracts_details__column_tabs ' + '.data_' + detailToActivate);
        contractDetailContent = contractDetailContainer.find('.my_traffic__contracts_details__data' + '.data_' + detailToActivate);
        contractDetailContentScrollable = contractDetailContent.find('.my_traffic__contracts_details__data__content');

        contractDetailContainer
            .addClass('active');

        if(detailToActivate!=='all'){
            contractDetailTab
                .addClass('active');
        }


        contractDetailContent
            .show()
            .addClass('active');

        contractDetailContentScrollable
            .mCustomScrollbar(obj_newscroll);
    }

    function hideContractDetail(contractDetailContainer) {
        var contractDetailTab, contractDetailContent, contractDetailContentScrollable;

        contractDetailTab = contractDetailContainer.find('.my_traffic__contracts_details__single_tab.active');
        contractDetailContent = contractDetailContainer.find('.my_traffic__contracts_details__data.active');
        contractDetailContentScrollable = contractDetailContent.find('.my_traffic__contracts_details__data__content');

        if (contractDetailContent.length > 0) {
            contractDetailContainer
                .removeClass('active');
            contractDetailTab
                .removeClass('active');
            contractDetailContent
                .hide()
                .removeClass('active');
            contractDetailContentScrollable
                .mCustomScrollbar("destroy");
        }

    }

    function bindContracts() {
        $('.my_traffic__contracts_accordion__row').on("click", ".linea_link,.tab_expand_link", function(event) {
            var clicked,
                currentContract,
                currentLink,
                currentIcon,
                currentTarget,
                alreadyActiveContract,
                alreadyActiveLink,
                alreadyActiveIcon,
                alreadyActiveTarget;

            event
                .preventDefault();
            clicked = $(this);
            currentContract = clicked.parents('.my_traffic__contracts_accordion__row');
            currentLink = currentContract.find('.linea_link');
            currentIcon = currentContract.find('.tab_expand_link');
            currentTarget = $(currentLink.attr('href'));
            if (!clicked.hasClass('active')) {
                alreadyActiveContract = $('.my_traffic__contracts_accordion__row.active');
                if (alreadyActiveContract.length > 0) {
                    alreadyActiveLink = alreadyActiveContract.find('.linea_link');
                    alreadyActiveIcon = alreadyActiveContract.find('.tab_expand_link');
                    alreadyActiveTarget = $(alreadyActiveLink.attr('href'));
                    unSetActive(alreadyActiveContract, alreadyActiveLink, alreadyActiveIcon);

                    hideContractSummary(alreadyActiveTarget);
                    hideContractDetail(alreadyActiveTarget);
                }
                setActive(currentContract, currentLink, currentIcon);
                showContractSummary(currentTarget);
            } else {
                unSetActive(currentContract, currentLink, currentIcon);

                hideContractSummary(currentTarget);
                hideContractDetail(currentTarget);
            }
        });
    }

    function bindBackDetailBtn(){
        $('.back_button').click(function(event){
            var clickedLink,
                activeParent;

            event
                .preventDefault();

            clickedLink = $(this);
            activeParent = clickedLink.closest('.my_traffic__contracts_details__tabs');
            hideContractDetail(activeParent);
        });
    }

    function bindAllDetailsBtn(){
        $('.view_all_link').click(function(event){
            var clickedLink,
                contractDetailContainer,
                contractDetailTab;

            event
                .preventDefault();

            clickedLink = $(this);
            contractDetailContainer = clickedLink.closest('.my_traffic__contracts_details__tabs');

            showContractDetail(contractDetailContainer, 'all');
        });
    }

    function bindContractDetails() {
        $('.my_traffic__contracts_details__tabs').on("click", ".my_traffic__contracts_details__column_tabs .my_traffic__contracts_details__single_tab,.my_traffic__contracts_details__column_content .tab_icon_expand_link", function(event) {
            var currentContractContainer,
                currentDetailClicked,
                currentDetailTarget;

            currentDetailClicked = $(this);
            currentContractContainer = currentDetailClicked.parents('.my_traffic__contracts_details__tabs');
            currentDetailTarget = currentDetailClicked.data().detail;

            if (!$(this).hasClass('active')) {
                hideContractDetail(currentContractContainer);
                showContractDetail(currentContractContainer, currentDetailTarget);
            } else {
                hideContractDetail(currentContractContainer);
            }
        });
    }

    function hideAll(objectsToHide) {
        $.each(objectsToHide, function() {
            $(this).hide();
        });
    }

    function hideAllContracts() {
        var initialContractTabs,
            initialContractTabDetails;

        initialContractTabs = $('.my_traffic__contracts_details__tabs');
        initialContractTabDetails = $('.my_traffic__contracts_details__data');

        if (initialContractTabs.length > 0) {
            hideAll(initialContractTabs);
        }
        if (initialContractTabs.length > 0) {
            hideAll(initialContractTabDetails);
        }
    }

    $(document).ready(function() {

        setMobileAccordion(mobileActiveAccordion);
        setMobileTables(mobileActiveTables);
        hideAllContracts();
        bindContracts();
        bindContractDetails();
        bindBackDetailBtn();
        bindAllDetailsBtn();

        //$('body').niceScroll(obj_nicescroll);



    });

    $(window)
        .resize(function() {
            if (window.innerWidth <= 480 && !mobileActiveAccordion) {
                setMobileAccordion(true);
            } else if (window.innerWidth > 480 && mobileActiveAccordion) {
                setMobileAccordion(false);
            }
            if (window.innerWidth <= 600 && !mobileActiveTables) {
                setMobileTables(true);
            } else if (window.innerWidth > 600 && mobileActiveTables) {
                setMobileTables(false);
            }

        });
		
		


	 
		
		
		
})(jQuery, window);
jQuery(".box").scroll(function() {
    if(jQuery(this).scrollTop() + jQuery(this).innerHeight() >= $(this)[0].scrollHeight) {
        jQuery(".box").append(jQuery(".box").html())
        jQuery("span").show();
    } else {
        jQuery("span").hide();
    }
    //  $("span").css( "display", "inline" ).fadeOut( "slow" );
});

//<![CDATA[
var addimg = '<img src="/nuovaAreaClienti/common/traffic/loading.gif" title="Loading.." alt="Loading.." />';
var spinner = '<div class="overlay_spinner"></div><div class="wind_spinner"></div>';
// ]]>

function getresult(url) {
    jQuery.ajax({
        url: url,
        type: "POST",
        data:  {rowcount:$("#rowcount").val()},
        beforeSend: function(){
            jQuery(".box").append(addimg);
        },
        complete: function(){
            $(".box img:last-child").remove();
        },
        success: function(data){
            $(".box ").append(data);
        },
        error: function(){}
    });
}


<!-- ================ FUNZIONI DELLO SPINNER ============== -->
<!-- ================ FUNZIONI DELLO SPINNER ============== -->
<!-- ================ FUNZIONI DELLO SPINNER ============== -->
function showSpinner() {
    jQuery('.my_traffic__contracts_details__tabs').append(spinner);
    jQuery('.overlay_spinner').fadeIn();
    jQuery('.wind_spinner').fadeIn();
}
//FUNZIONE DA FAR PARTIRE QUANDO SERVE VA RIMOSSO LO SPINNER
function hideSpinner() {
    jQuery('.wind_spinner').fadeOut("slow", function() {
        jQuery(this).remove();
    });
    jQuery(".overlay_spinner").fadeOut("slow", function() {
        jQuery(this).remove();
    });
}

<!-- ================ CSS DELLO SPINNER ============== -->
<!-- ================ CSS DELLO SPINNER ============== -->
<!-- ================ CSS DELLO SPINNER ============== -->


