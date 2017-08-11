window.alert = function(msg) {
  //send alerts to console, the carquery api likes to use alert boxes
  console.warn(msg);
};

$(document).ready(function () {
  chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);
  });

  var carquery = new CarQuery();
  carquery.init();
  carquery.setFilters({sold_in_us: true});
  carquery.initYearMakeModelTrim('car-year', 'car-make', 'car-model', 'car-trim');


$('#cq-show-data').click(  function(){ carquery.populateCarData('car-model-data'); } );
  //figure out what domain were on, load parser for each
  //create new car object, load values into there
  //
});
