(function () {
  var metadata = $('[data-birf-role="dataisland"]').data('birfExtra').page,
    title = $('[data-qaid="cntnr-vehicle-title"]').text() + " " + $('[data-qaid="cntnr-vehicle-trim"]').text(),
    message = {
      extension: 'ChromeCarValue',
      'injected jquery version': jQuery.fn.jquery,
      title: title.toLowerCase(),
      zip: metadata.location.address,
      year: metadata.vehicle.car_year,
      mileage: metadata.vehicle.odometer,
      make: metadata.vehicle.make[0],
      makeName: metadata.vehicle.makeName[0],
      model: metadata.vehicle.model[0],
      modelName: metadata.vehicle.modelName[0],
      trim: metadata.vehicle.trim,
      color: metadata.vehicle.color[0],
      type: metadata.vehicle.Car_Type,
      vin: metadata.vehicle.vin
    };

  chrome.runtime.sendMessage(message);
})();
