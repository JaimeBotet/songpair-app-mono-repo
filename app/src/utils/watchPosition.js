
export const positionWatcher = (point, updatePosition) => {
    var watcherId, options;

    function success(pos) {
      var crd = pos.coords;

      if(measure(crd.latitude, crd.longitude, point.lat, point.long) >= 10){ //established to 10 meters
        updatePosition({lat: crd.latitude, long: crd.longitude});
        navigator.geolocation.clearWatch(watcherId);
      }
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    return watcherId = navigator.geolocation.watchPosition(success, error, options);
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

