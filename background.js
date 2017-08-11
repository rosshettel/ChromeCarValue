function isCarPage(url) {
  var urls = [
    /https?:\/\/(?:.*\.)?craigslist\.org\/(?:.*\/)?(?:ct.)\/d\//,
    /https?:\/\/(?:.*\.)?autotrader\.com\/cars-for-sale\/vehicledetails.xhtml/
  ];

  for (var i = 0; i < urls.length; i++) {
    regex = urls[i];
    if (url.match(regex)) {
      return true;
    }
  }
  return false;
}

function checkForValidUrl(tabId, changeInfo, tab) {
  if (isCarPage(tab.url)) {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
