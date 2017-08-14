(function () {
  var message = {
    extension: 'CarValue',
    'injected jquery version': jQuery.fn.jquery
  };

//get lat/lon from data-latitude/data-longitude, query that for zip code
//get request to: http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452
//year is always first 4 digits in title, may be extra emjoi beforehand
$('span:contains("odometer")').text()
$('span:contains("VIN")').text()
$('span:contains("paint color")').text()

  chrome.runtime.sendMessage(message);
})();
