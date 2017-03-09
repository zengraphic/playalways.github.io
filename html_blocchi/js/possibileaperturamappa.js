function myCreateMarker() {
    
    google.maps.event.addListener(marker, 'click', function() {
        if (document.body.clientWidth < 640) {
            google.maps.event.addListener(marker, 'click', function() {
                marker.infoWindow.close();
                var text = marker.infoWindow.getContent();
                showInDiv(text);
            });
        }else{
        	/// funzione normale
        }
    });
};

function showInDiv(text) {
    var sidediv = document.getElementById('contentWindow');
    sidediv.innerHTML = text;
};
