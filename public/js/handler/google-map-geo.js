var previousPosition = null,
    marker,
    editeur;

function initialize() {
    map = new google.maps.Map(document.getElementById("actuel-map"), {
        zoom: 15,
        center: new google.maps.LatLng(48.858565, 2.347198),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function successCallback(position) {
    $('#longitude').val(position.coords.longitude);
    $('#laltitude').val(position.coords.latitude);
    if (previousPosition === null) {
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            map: map,
            draggable: true
        });
    } else {
        marker.setMap(null);
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            map: map,
            draggable: true
        });
    }
    google.maps.event.addListener(marker, 'dragend', function() {
        // console.dir(marker.getPosition());
        document.querySelector('#laltitude').value = marker.getPosition().D;
        document.querySelector('#longitude').value = marker.getPosition().k;
    });
    previousPosition = position;
}
$(document).ready(function(e) {
    initialize();
    if (navigator.geolocation) {
        var watchId = navigator.geolocation.watchPosition(successCallback, null, {
            enableHighAccuracy: true
        });
    } else {
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
    }

});