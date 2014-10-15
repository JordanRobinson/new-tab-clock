// ==UserScript==
// @name        about:newtab clock
// @namespace   http://jordanrobinson.co.uk
// @description A simple, dark themed clock to show on open of a new tab.
// @include     about:blank
// @exclude     http://*
// @version     0.5.0
// @grant       none
// ==/UserScript==

var body = document.getElementsByTagName('body')[0];
var container = document.createElement('div');
var clockHolder = document.createElement('div');
var currentTime = document.createElement('span');
var timeText = document.createTextNode(' ');

body.setAttribute('style', 'background-color:#272822');

container.setAttribute('style', //vertically centre that fool
	'position: absolute;' +
	'top: 50%;' +
	'margin-top: -200px;' +
	'left: 0;' +
	'width: 100%;');

clockHolder.setAttribute('style',
	'font-size: 10rem;' +
	'color: #dfdfdf;' +
	'width: 400px;' +
	'margin: auto;' +
	'height: 400px;' +
	'font-weight: lighter;' +
	'font-family: "Segoe UI","Trebuchet MS",Trebuchet,Verdana,Helvetica,Arial,sans-serif');

// currentTime.setAttribute('style',
// 	'float: left;' +
// 	'width: 600px;' + //fix this
// 	'border-bottom: 1px solid #FF4800;');

currentTime.appendChild(timeText);
clockHolder.appendChild(currentTime);
container.appendChild(clockHolder);
body.appendChild(container);

var update = function() {
	var date = new Date();
	var dateString = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
	var millis = date.getMilliseconds();

	currentTime.removeChild(timeText);
	timeText = document.createTextNode(dateString);
	currentTime.appendChild(timeText);

	window.setTimeout(update, 1000 - millis);
};

update();
