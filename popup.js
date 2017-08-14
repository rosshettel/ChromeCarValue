window.alert = function(msg) {
  //send alerts to console, the carquery api likes to use alert boxes
  console.warn(msg);
  console.log(msg);
};
var old = console.log;
console.log = function(msg){
  old(msg);
  $("#log").append(msg + "<br/>");
}

//global variables
var carquery = new CarQuery();
//todo - init with scraped data
carquery.init();
carquery.setFilters({sold_in_us: true});
carquery.initYearMakeModelTrim('car-year', 'car-make', 'car-model', 'car-trim');

chrome.tabs.executeScript(null, {file: 'libs/jquery-2.2.4.min.js'}, function () {
  chrome.tabs.getSelected(null, function (tab) {
    var domainScripts = {
        'autotrader.com': 'scraper-autotrader.js',
        'craigslist.org': 'scraper-craigslist.js'
      },
      domain = (new URL(tab.url)).hostname;

      //remove subdomain. this won't work on 4 letter TLDs or multiple subdomains
      domain = domain.split('.');
      domain.shift();
      domain = domain.join('.');

      if (domainScripts[domain]) {
        console.log('injecting ' + domainScripts[domain]);
        chrome.tabs.executeScript(null, {file: domainScripts[domain]}, function () {
          console.log('injected scripts');
        });
      } else {
        console.log('No scraper for this domain!');
      }
  });
});

function updateCar(callback) {
  $.getJSON(carquery.base_url+"?callback=?", {cmd:"getModel", model:carquery.cur_trim}, function (data) {
    if (typeof data.error != 'undefined' && data.error != '') {
      alert(data.error);
    }
    var selectedCar = data[0];

    $("#hp").text(selectedCar.model_engine_power_hp);
    $("#torque").text(selectedCar.model_engine_torque_lbft);

    //todo - now go query edmunds api
  });
}

$(document).ready(function () {
  chrome.runtime.onMessage.addListener(function (msg) {
    console.log(JSON.stringify(msg));
  });


  //todo - make this query API when we load popup first time

  $("[id^=car-]").on('change', function () {
    updateCar();
  });
  $("[id^=car-]").on('input', function () {
    updateCar();
  });
});
