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
var currentTime = document.createTextNode(' ');

clockHolder.setAttribute('style', 
	'font-size: 10rem;' +
	'color: #dfdfdf;' + 
	'width: 400px;' +
	'margin: auto;' +
	'height: 400px;' +
	'font-weight: lighter;' +
	'font-family: "Segoe UI","Trebuchet MS",Trebuchet,Verdana,Helvetica,Arial,sans-serif');

container.setAttribute('style', //vertically centre that fool
	'position: absolute;' +
	'top: 50%;' + 
	'margin-top: -200px;' +
	'left: 0;' +
	'width: 100%;');

clockHolder.appendChild(currentTime);

container.appendChild(clockHolder);

body.setAttribute('style', 'background-color:#272822');
body.appendChild(container);

var update = function() {
	var date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");;

	clockHolder.removeChild(currentTime);
	currentTime = document.createTextNode(date);
	clockHolder.appendChild(currentTime);
	window.setTimeout(update, 1000);
}

update();
