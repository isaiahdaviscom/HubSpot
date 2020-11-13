$('#storeLocator .hs-button')
  .on('click', function (e) {
    e.preventDefault();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': $('#storeLocator .hs-input')
        .val()
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        point = results[0].geometry.location;
        var zipCode = $('#desiredZipCode')
          .val();
        window.location = "//{{request.domain}}/find-a-store?locationLat=" + point.lat() + "&locationLng=" + point.lng() + "&zipcode=" + zipCode;
      } else {
        console.log("nope");
      }
    });
  });
window.MapHelper = window.MapHelper || {};
(function () {
  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }
  var geocoder = new google.maps.Geocoder();
  var map;
  //var gHtml;
  window.MapHelper.gmarkers = [];
  window.MapHelper.htmls = [];
  window.MapHelper.i = 0;
  window.MapHelper.infowindow = [];
  window.MapHelper.initalPin = 0;
  window.MapHelper.bounds = new google.maps.LatLngBounds();
  MapHelper.mapCreated = false;
  MapHelper.initIGAMap = function () {
    if (document.documentElement.clientWidth < 768) {
      function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
          el.addEventListener(eventName, handler);
        } else {
          el.attachEvent('on' + eventName, function () {
            handler.call(el);
          });
        }
      }

      addEventListener(window, 'resize', MapHelper.loadMapOnWide);
    } else {
      MapHelper.LoadIGAGoogleMap();
    }
  };
  MapHelper.loadMapOnWide = function () {
    if (document.documentElement.clientWidth >= 768) {
      MapHelper.mapCreated = true;

      function removeEventListener(el, eventName, handler) {
        if (el.removeEventListener) {
          el.removeEventListener(eventName, handler);
        } else {
          el.detachEvent('on' + eventName, handler);
        }
      }

      removeEventListener(window, 'resize', MapHelper.loadMapOnWide);
      MapHelper.LoadIGAGoogleMap();
    }
  };

  MapHelper.LoadIGAGoogleMap = function () {
    var mapOptions = {
      center: new google.maps.LatLng(39.5, -95.35),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE]
      }
    };

    map = new google.maps.Map(document.getElementById("map_canvas1"), mapOptions);
    var myArray = [];

    locations = $('.store-location');

    for (var k = 0; k < locations.length; k++) {
      showAddress(locations[k].getAttribute("data-address"), locations[k].getAttribute("data-lat"), locations[k].getAttribute("data-long"), k);
    }

    setTimeout(function () {
      map.fitBounds(window.MapHelper.bounds);
      //map.panToBounds(window.MapHelper.bounds); 
      map.setCenter(window.MapHelper.bounds.getCenter());
      //map.setZoom(zoom);
      if (window.MapHelper.gmarkers.length == 1 && map.getZoom() > 13) {
        map.setZoom(15);
      } else if (window.MapHelper.gmarkers.length > 1 && map.getZoom() > 8) {
        map.setZoom(8);
      }
    }, 1000);
  }

  // A function to create the marker and set up the event window
  function createMarker(point, address, index, i) {
    var markerOptions = {
      position: point,
      map: map
    };

    //                      if (index != undefined) {
    //                       // Create a lettered icon for this point using our icon class
    //                       var letter = String.fromCharCode("A".charCodeAt(0) + index);
    //                       markerOptions.icon = {
    //                         url: "http://www.google.com/mapfiles/marker" + letter + ".png"
    //                       };
    //                     }

    window.MapHelper.gmarkers[i] = new google.maps.Marker(markerOptions);
    var IsLong = (address.length > 44) ? true : false;
    window.MapHelper.htmls[i] = '<div style="width: 250px; height: ' + ((IsLong) ? '85' : '70') + 'px;"><div style="font-size: 12px;"><strong>Address: </strong><br>' + address;
    window.MapHelper.infowindow[i] = new google.maps.InfoWindow({
      disableAutoPan: false
    });
  }

  function showAddress(address, lat, lng, index) {
    var markerObj;
    var point;
    if (lat != 0 && lng != 0) {
      (function (i) {
        point = new google.maps.LatLng(lat, lng);
        window.MapHelper.bounds.extend(point);
        createMarker(point, address.trim(), index, i);
        //                     if (index == 0) {
        //                      // window.MapHelper.infowindow[i].setContent('<div >' + window.MapHelper.htmls[i] + '</div>');
        //                      // window.MapHelper.infowindow[i].open(map, window.MapHelper.gmarkers[i]);
        //                     }

        //                     google.maps.event.addListener(window.MapHelper.gmarkers[i], "click", function () {
        //                       for(var k = 0; k < window.MapHelper.infowindow.length; k++)
        //                       {
        //                         window.MapHelper.infowindow[k].close();
        //                       }

        //                       window.MapHelper.infowindow[i].setContent(window.MapHelper.htmls[i]);
        //                       window.MapHelper.infowindow[i].open(map, window.MapHelper.gmarkers[i]);
        //                     })
      })(window.MapHelper.i);
    } else if (geocoder) {

      (function (i) {
        geocoder.geocode({
          'address': address
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            point = results[0].geometry.location;

            window.MapHelper.bounds.extend(point);
            createMarker(point, address.trim(), index, i);

            if (index == 0) {
              window.MapHelper.infowindow[i].setContent('<div >' + window.MapHelper.htmls[i] + '</div>');
              window.MapHelper.initalPin = i;
            }
          }

          google.maps.event.addListener(window.MapHelper.gmarkers[i], "click", function () {
            for (var k = 0; k < window.MapHelper.infowindow.length; k++) {
              window.MapHelper.infowindow[k].close();
            }

            window.MapHelper.infowindow[i].setContent(window.MapHelper.htmls[i]);
            window.MapHelper.infowindow[i].open(map, window.MapHelper.gmarkers[i]);
          });
        });
      })(window.MapHelper.i);
    }
    window.MapHelper.i++;
  }
})();
$(document)
  .ready(function () {
    MapHelper.LoadIGAGoogleMap();
  });