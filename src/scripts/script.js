// ==UserScript==
// @name        about:newtab clock
// @namespace   http://jordanrobinson.co.uk
// @description A simple, dark themed clock to show on open of a new tab.
// @include     about:blank
// @exclude     http://*
// @version     0.5.0
// @grant       none
// ==/UserScript==

var body = document.getElementsByTagName('body')[0],
container = document.createElement('div'),
currentTime = document.createElement('span'),
timeText = document.createTextNode(' ');

body.setAttribute('style', 'background-color:#262626');

container.setAttribute('style',
  'color: #DFDFDF;' +
  'font-family: "Segoe UI","Trebuchet MS",Trebuchet,Verdana,Helvetica,Arial,sans-serif;' +
  'font-size: 10rem;' +
  'font-weight: lighter;' +
  // Vertically centre that fool!
  'position: absolute;' +
  'top: 50%;' +
  'left: 50%;' +
  'transform: translate(-50%,-50%);'
  );

currentTime.appendChild(timeText);
container.appendChild(currentTime);
body.appendChild(container);

var update = function () {
  var date = new Date(),
  dateString = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
  millis = date.getMilliseconds();

  currentTime.removeChild(timeText);
  timeText = document.createTextNode(dateString);
  currentTime.appendChild(timeText);

  window.setTimeout(update, 1000 - millis);
};

update();
