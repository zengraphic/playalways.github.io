function myCreateMarker() {
    
    google.maps.event.addListener(marker, 'click', function() {
        if (document.body.clientWidth < 768) {
            console.log(document.body.clientWidth);
                infowindow.close();
                jQuery('#external_infoBox').html(infowindow.content_).hide().show('slow');

        }else{
        	/// funzione normale
        }
    });
};



myCreateMarker();