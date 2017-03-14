function myCreateMarker() {
    
    google.maps.event.addListener(marker, 'click', function() {
        if (document.body.clientWidth < 640) {
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.close();
                var text = infowindow.getContent(InfoBox.content_);
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
