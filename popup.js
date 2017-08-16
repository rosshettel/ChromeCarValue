var console=(function(oldCons){
    return {
        log: function(msg){
          $("#log").append(msg + "<br/>");
          oldCons.log(msg);
        },
        info: function (msg) {
          $("#log").append(msg + "<br/>");
          oldCons.info(msg);
        },
        warn: function (msg) {
          $("#log").append("<span style='background-color: yellow;'>" + msg + "</span><br/>");
          oldCons.warn(msg);
        },
        error: function (msg) {
          $("#log").append("<span style='background-color: red;'>" + msg + "</span><br/>");
          oldCons.error(msg);
        }
    };
}(window.console));
window.console = console;
window.alert = function(msg) {
  //send alerts to console, the carquery api likes to use alert boxes
  console.warn(msg);
};
window.onerror = function(msg, url, line, col, error) {
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;
   console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
   return true;
};

$(document).ready(function () {
  var widget = new EDM.TMV('6v6dj6e2ca4gey83kbpyj9be', {root: 'tmvwidget', baseClass: 'tmvwidget'});
  widget.init({"includedMakes":"all","price":"tmv-invoice-msrp","showVehicles":"USED","zip":"60654"});
  widget.render();

  chrome.tabs.executeScript(null, {file: 'jquery-2.2.4.min.js'}, function () {
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
          chrome.tabs.executeScript(null, {file: domainScripts[domain]});
        } else {
          console.warn('No scraper for this domain!');
        }
    });
  });

  chrome.runtime.onMessage.addListener(function (msg) {
    console.log(JSON.stringify(msg));
    if (msg.extension == 'ChromeCarValue') {
      $('.tmvwidget-zip').val(msg.zip).trigger('change');

      widget.on('load:makes', function () {;
        $('.tmvwidget-make').val(msg.makeName.toLowerCase()).trigger('change');
      });

      widget.on('load:models', function (data) {
        for (model in data.models) {
          var modelstring = data.models[model].name.toLowerCase();
          if (msg.title.includes(modelstring)) {
            console.log('FOUND IT! ' + modelstring);
            $('.tmvwidget-model').val(model).trigger('change');
          }
        }
      });

      widget.on('change:model', function () {
        console.log('change model');
        var checkEnabled = setInterval(function() {
          if ($('.tmvwidget-year:enabled').length) {
            console.log("year field enabled! " + msg.year + "USED");
            clearInterval(checkEnabled);
            if ($('.tmvwidget-year:enabled option[value="' + msg.year + "USED" + '"]').length > 0) {
              $('.tmvwidget-year:enabled').val(msg.year + "USED").trigger('change');
            } else {
              console.log('year and model dont exist');
              $('.tmvwidget-model').val('').trigger('change');
            }
          }
        }, 100);
      });

      widget.on('change:style', function () {
        widget.trigger('calculate');
      });
    }
  });
});
