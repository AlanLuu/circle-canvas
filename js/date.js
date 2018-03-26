"use strict";

var currentTime = new Date().getHours();
var isNight = (currentTime >= 0 && currentTime < 7) || (currentTime >= 19);

document.write(isNight ? "<link href='css/night.css' rel='stylesheet' type='text/css' />" : 
"<link href='css/day.css' rel='stylesheet' type='text/css' />");

//For Google Chrome on Android
document.write(isNight ? "<meta name='theme-color' content='#1d0a96'>" : 
"<meta name='theme-color' content='#00d7f5'>");
