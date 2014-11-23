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
container = document.createElement('time');

body.style.backgroundColor = '#262626';
container.setAttribute('style',
  'color: #DFDFDF;' +
  // 'font-family: "Segoe UI","Trebuchet MS",Trebuchet,Verdana,Helvetica,Arial,sans-serif;' +
  'font-family: Consolas, "Lucida Console", "Lucida Sans Typewriter", "Liberation Mono", "Courier New", Courier, monospace;' +
  'font-size: 10rem;' +
  'font-weight: lighter;' +
  // Vertically centre that fool!
  'position: absolute;' +
  'top: 50%;' +
  'left: 50%;' +
  'transform: translate(-50%,-50%);'
  );

var update = function () {
  var date = new Date(),
  dateString = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
  millis = date.getMilliseconds(),
  hour = (date.getHours() <= 9) ? '0' + date.getHours() : date.getHours(),
  mins = (date.getMinutes() <= 9) ? '0' + date.getMinutes() : date.getMinutes(),
  seconds = (date.getSeconds() <= 9) ? '0' + date.getSeconds() : date.getSeconds(),
  hex = '#' + hour + mins + seconds;

  body.style.backgroundColor = hex;
  container.innerHTML = dateString;

  window.setTimeout(update, 1000 - millis);
};

var inIFrame = function () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

if (!inIFrame()) {
  body.appendChild(container);
  update();
}
