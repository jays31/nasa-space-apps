// Author: Jay Sharma (B00824331)

//https://developers.google.com/maps/documentation/javascript/places-autocomplete
function autocompleteAddress() {
    var address = new google.maps.places.Autocomplete(
        (document.getElementById('searchLocation')),
        { types: ['geocode'] });
}

var map, infoWindow;
function initializeMaps() {
    autocompleteAddress();
    initMap();

}
//https://developers.google.com/maps/documentation/javascript/geocoding
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 17
    });
    infoWindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var geocoder = new google.maps.Geocoder;

            geocode(geocoder, map, infoWindow, pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    document.getElementById('btnSearchDonor').addEventListener('click', function () {
        geocodeAddress(geocoder, map, infoWindow);
    });

}
//https://developers.google.com/maps/documentation/javascript/geocoding
function geocode(geocoder, map, infowindow, pos) {

    var latlng = { lat: parseFloat(pos.lat), lng: parseFloat(pos.lng) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                $("#searchLocation").val(results[0].formatted_address);
            } else {
                window.alert('Unable to find location');
            }
        } else {
            window.alert('An error occurred ' + status);
        }
    });
}
//https://developers.google.com/maps/documentation/javascript/geocoding
function geocodeAddress(geocoder, resultsMap, infoWindow) {
    var address = document.getElementById('searchLocation').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            infoWindow.setContent('Location found');
        } else {
            alert('An error occurred ' + status);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Unable to find current location. Please check your browser settings for accessing location' :
        'Error: Unsupported browser');
    infoWindow.open(map);
}