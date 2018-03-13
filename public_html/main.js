var long = 43.2362657216;
var lat = -79.8847431277;
var markerList = [];
var markerList1 = [];
var map;
var marker = new google.maps.Marker();
//initialize the map with the user's location
/**
 * 
 * @returns {undefined}
 */
function intMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var userAddress = "";
    var center = {lat: 43.2362657216, lng: -79.8847431277};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center
    });
    
    directionsDisplay.setMap(map);
    var change = function () {
        for (var a = 0; a < markerList.length; a++) {
            markerList[a].setMap(null);
        }
        var mode = $("#mode").val();
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        getRoute(directionsService, directionsDisplay, mode);
    };

    document.getElementById("getDirections").addEventListener('click', change);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            /////getting the address from the coordinates
            geocoder.geocode({'location': pos}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(13);
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: map,
                            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        });
                        userAddress = results[0].formatted_address;
                        infowindow.setContent("<strong>Current Location<strong>");
                        infowindow.open(map, marker);
                        marker.setAnimation(google.maps.Animation.DROP);
                        marker.setMap(map);
                        $("#end").append('<option value="Mohawk College">Mohawk College</option>');
                        $("#end").append('<option id="current" value="' + userAddress + '">Your Location</option>');

                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });



            for (var i = 0; i < listLibrary.length; i++) {
                var libPos = {lat: listLibrary[i].LATITUDE, lng: listLibrary[i].LONGITUDE};
                //console.log(libPos);
                markerList.push(new google.maps.Marker({
                    position: libPos
                }));
                markerList[i].setMap(map);
                //console.log(listLibrary[i].NAME);
                $("#start").append('<option value="' + listLibrary[i].NAME + ' Hamilton">' + listLibrary[i].NAME + '</option>');
                if (i <= 7)
                    $("#names1").append("<p>" + listLibrary[i].NAME + "</p>");
                else if (i > 7 && i <= 14)
                    $("#names2").append("<p>" + listLibrary[i].NAME + "</p>");
                else if (i > 14)
                    $("#names3").append("<p>" + listLibrary[i].NAME + "</p>");
            }
        });
    }
}

/**
 * 
 * @param {type} directionsService
 * @param {type} directionsDisplay
 * @param {type} mode
 * @returns {undefined}
 */
function getRoute(directionsService, directionsDisplay, mode) {
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: mode
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

/**
 * 
 * @returns {undefined}
 */
function getLibrary() {
    var name = document.getElementById("libName").value;
    name = name.toLowerCase();
    var infowindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder;

    //console.log(name);
    for (var i = 0; i < listLibrary.length; i++) {
        var lib = listLibrary[i].NAME.toLowerCase();
        if (lib === name) {
            if (markerList1.length > 0) {
                marker.setMap(null);
            }
            console.log(name);
            for (var a = 0; a < markerList.length; a++) {
                markerList[a].setMap(null);
            }
            var mark = {lat: listLibrary[i].LATITUDE, lng: listLibrary[i].LONGITUDE};

            geocoder.geocode({'location': mark}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(13);
                        marker = new google.maps.Marker({
                            position: mark,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        marker.setMap(map);
                        markerList1.push(marker);
                    }
                }
            });

        }
    }
}
