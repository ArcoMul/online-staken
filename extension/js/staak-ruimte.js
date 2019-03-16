var COUNT_URL = "https://datavakbond.nl/online-staken/count.php";
var groupEl = document.getElementById("strike-group");

function init() {
  fetch(COUNT_URL)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      console.log("strikers", text);
      document.getElementById("strikers-count").innerHTML = text;
      drawGroup(Number(text));
    })
    .catch(err => console.error);
}

function drawGroup(n) {
  var html = "";

  var totalWidth = groupEl.offsetWidth;
  var totalHeight = groupEl.offsetHeight;
  var personWidth = 70;
  var personMargin = 10;
  var startX = totalWidth / 2;
  var startY = totalHeight / 2 - personWidth;

  var color;
  var circleNumber = 1;
  var circleSize = 4;
  var offsetX;
  var offsetY;
  var currentCircleCount = 0;
  var defaultZ = 500;
  var defaultColor = 255 / 2;
  var offset = personWidth * 0.8;
  for (var i = 0; i < n; i++) {
    color = (i / n) * 200;
    offsetX =
      Math.cos((360 / circleSize) * currentCircleCount * (Math.PI / 180)) *
      (offset * circleNumber);
    offsetY =
      Math.sin((360 / circleSize) * currentCircleCount * (Math.PI / 180)) *
      (offset * circleNumber);
    html +=
      '<div class="person" style="width: ' +
      personWidth +
      "px; " +
      "left: " +
      (startX + offsetX) +
      "px; " +
      "bottom: " +
      (startY + offsetY) +
      "px; " +
      "z-index: " +
      (defaultZ + (offsetY > 0 ? -1 : 1) * i) +
      "; " +
      '"><img src="style/img/persons/person' +
      Math.ceil(Math.random() * 7) +
      '.png" style="width: 100%"' +
      ">" +
      "<" +
      "/" +
      "div" +
      ">";

    // TODO: only increase every circle, not every loop
    currentCircleCount++;
    if (currentCircleCount == circleSize) {
      circleNumber++;
      circleSize = Math.round(circleSize * 1.25);
      currentCircleCount = 0;
    }
  }

  groupEl.innerHTML = html;
}

init();
