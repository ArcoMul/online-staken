if (!window.browser) {
  window.browser = chrome;
}

// Extension background page
var bg = browser.extension.getBackgroundPage();

/**
 * Extension popup DOM els namespace.
 * @namespace
 */
var els = {
  blocking_text: document.getElementById("blocking-text"),
  not_blocking_text: document.getElementById("not-blocking-text"),
  blocking_count_text: document.getElementById("blocking-count-text"),
  not_blocking_count_text: document.getElementById("not-blocking-count-text"),
  count: document.getElementById("stikers-count"),
  block_btn: document.getElementById("block_btn"),
  total_blocks_el: document.getElementById("total_blocks"),
  session_blocks_el: document.getElementById("session_blocks"),
  reset_total_btn: document.getElementById("reset_total_btn"),
  reset_session_btn: document.getElementById("reset_session_btn")
};

function init() {
  if (bg.block) {
    els.blocking_text.style.display = "block";
    els.blocking_count_text.style.display = "block";
    els.not_blocking_text.style.display = "none";
    els.not_blocking_count_text.style.display = "none";
  } else {
    els.blocking_text.style.display = "none";
    els.blocking_count_text.style.display = "none";
    els.not_blocking_text.style.display = "block";
    els.not_blocking_count_text.style.display = "block";
  }

  Array.from(document.getElementsByClassName("strike-date")).forEach(function(
    elm
  ) {
    console.log(bg.strikeDate);
    elm.innerHTML = moment(bg.strikeDate).format("D MMMM");
  });

  fetch(bg.COUNT_URL)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      els.count.innerHTML = text;
    })
    .catch(err => console.error);
}

init();
