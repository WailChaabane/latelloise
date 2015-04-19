var map;
var chlef = new google.maps.LatLng(laltitude, longitude);

var MY_MAPTYPE_ID = 'map-canvas';

function initialize() {

    var featureOpts = [{
        stylers: [{
            hue: '#263238'
        }, {
            visibility: 'simplified'
        }, {
            gamma: 0.5
        }, {
            weight: 1
        }]
    }, {
        featureType: 'water',
        stylers: [{
            color: '#bbdefb'
        }]
    }];
    var mapOptions = {
        zoom: 15,
        center: chlef,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById(MY_MAPTYPE_ID),
        mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    marker = new google.maps.Marker({
        position: chlef,
        animation: google.maps.Animation.BOUNCE,
        map: map
    });

    iw1 = new google.maps.InfoWindow({
        content: "<h6 class='deep-orange-text'><i class='mdi-communication-business small '></i>LA TELLOISE</h3>"
    });

    return google.maps.event.addListener(marker, "click", function(e) {
        return iw1.open(map, this);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);