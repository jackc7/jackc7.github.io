var lat = 42.2248;
var lon = -71.1589;

var mountains = [
    ["Berkshire East", 42.62114, -72.87713, "./assets/maps/berk.jpg"],
    ["Blandford", 42.19584, -72.91661, "./assets/maps/blan.jpg"],
    ["Blue Hills", 42.21596, -71.11905, "./assets/maps/blue.jpg"],
    ["Bousquet", 42.41922, -73.27707, "./assets/maps/bous.jpg"],
    ["Bradford", 42.74472, -71.05581, "./assets/maps/brad.jpg"],
    ["Butternut", 42.18365, -73.32015, "./assets/maps/butt.jpg"],
    ["Catamount", 42.16909, -73.47692, "./assets/maps/cata.jpg"],
    ["Jiminy Peak", 42.5552, -73.2922, "./assets/maps/grey.gif"],
    ["Mount Greylock", 42.63758, -73.16621, "./assets/maps/jimi.jpg"],
    ["Nashoba Valley", 42.54256, -71.44503, "./assets/maps/nash.png"],
    ["Otis Ridge", 42.19638, -73.09833, "./assets/maps/otis.png"],
    ["Wachusett Mountain", 42.50294, -71.88625, "./assets/maps/wach.jpg"],
    ["Ward Hill", 42.30148, -71.68297, "./assets/maps/ward.jpg"]
];

function findNearestMountain() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(UserLocation);
    }
    else {
        NearestCity(lat, lon);
    }
}

function UserLocation(position) {
    NearestCity(position.coords.latitude, position.coords.longitude);
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371;
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

function NearestCity(latitude, longitude) {
    var minDif = 99999;
    var closest;

    for (index = 0; index < mountains.length; ++index) {
        var dif = PythagorasEquirectangular(latitude, longitude, mountains[index][1], mountains[index][2]);
        if (dif < minDif) {
            closest = index;
            minDif = dif;
        }
    }
    activeNearestMountain(mountains[closest][0]);
}

function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function activeNearestMountain(mountainName) {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        if (coll[i].textContent == mountainName) {
            coll[i].classList.toggle("active");
            var content = coll[i].nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    }
}