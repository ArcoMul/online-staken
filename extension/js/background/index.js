if (!window.browser) {
  window.browser = chrome;
}

var PING_URL = "https://datavakbond.nl/online-staken/ping.php";
var COUNT_URL = "https://datavakbond.nl/online-staken/count.php";
var REDIRECT_URL = "https://datavakbond.nl/?page_id=2508";

// The next strike
var nextStrike = new Date("2019-3-1");
var now = new Date();

// Whether to block facebook or not.
var block =
  nextStrike < now &&
  now < new Date(new Date(nextStrike).setDate(nextStrike.getDate() + 1));

// List of urls to block, gets looped through onBeforeRequest.
var urls_to_block = ["facebook.com"];

// Which urls trigger the onBeforeRequest callback
var filter = { urls: ["*://*.facebook.com/*"] };

/**
 * Gets called before every single request browser makes. If the global
 * variable block is set to true, blocks all request with urls that contain
 * an (url) string found in the urls_to_block array.
 *
 * @param {object} req - Browser request
 * @return {object} - If it contains 'cancel: true', request will be canceled
 */
function onBeforeRequest(req) {
  // Whether to block the current request, by default its false. Gets set to
  // true if a request its url matches a string found in urls_to_block.
  var cancel_req = false;

  // if (!block) {
  //   return;
  // }

  // Loop through urls_to_block and set cancel_req to true if the current
  // request its url matches a string found in urls_to_block.
  urls_to_block.forEach(function(url_to_block) {
    if (req.url.indexOf(url_to_block) !== -1) {
      cancel_req = true;
    }
  });

  if (cancel_req) {
    return {
      redirectUrl: REDIRECT_URL
    };
  }

  return {
    cancel: cancel_req
  };
}

function generateHash() {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var hash = "";
  for (var i = 0; i < 10; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function init() {
  // Bind the onBeforeRequest function to the browser onBeforeRequest event
  // using the filter and extras defined at the top of this file.
  browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, [
    "blocking"
  ]);

  // Ping the server that this browser is striking
  browser.storage.sync.get(function(storage) {
    var hash = storage.hash;
    if (!hash) {
      hash = generateHash();
      browser.storage.sync.set({
        hash: hash
      });
    }
    fetch(PING_URL + "?hash=" + hash);
  });
}

init();
