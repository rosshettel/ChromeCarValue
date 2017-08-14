(function () {
  var message = {
    extension: 'CarValue',
    'injected jquery version': jQuery.fn.jquery
  };

  var metadata = $('[data-birf-role="dataisland"]').data('birfExtra').page;
  message.zip = metadata.location.address;
  message.year = metadata.vehicle.car_year;
  message.mileage = metadata.vehicle.odometer;
  message.make = metadata.vehicle.make[0];
  message.makeName = metadata.vehicle.makeName[0];
  message.model = metadata.vehicle.model[0];
  message.modelName = metadata.vehicle.modelName[0];
  message.trim = metadata.vehicle.trim;
  message.color = metadata.vehicle.color[0];
  message.type = metadata.vehicle.Car_Type;
  message.vin = metadata.vehicle.vin;

  chrome.runtime.sendMessage(message);
})();
