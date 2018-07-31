Overview
------------------------------------------------------------------------
This is a simple canvas with a circle that follows the user's mouse cursor. 
The website's background colors are different depending on the time of day the user visits this website.
The circle also changes to a random color every four seconds. 
<br/><br/>
These things are all accomplished using JavaScript, jQuery, and CSS keyframes, which are being
used to switch between two slightly different background colors.
<br/><br/>
Note that the canvas and the background colors showing are dependent on having JavaScript enabled. 
Thus, if one has it disabled, the canvas **_will not_** work, and the background colors won't
show, since they are being loaded in via an external JavaScript file using the ```document.write()``` method.



[Link to website](https://alanluu.github.io/circle-canvas/)

Random color generation
------------------------------------------------------------------------
To generate a random HEX color code, use the following code below.
```javascript
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    
    /*
    Joins random characters from the string "letters" onto the string
    "colors" to form a randomized HEX code.
    */
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    
    return color;
}
```

Browser support
------------------------------------------------------------------------
 - Chrome
 - Firefox
 - Microsoft Edge
 - Safari 
 - Chrome/Firefox/Safari/Edge for various mobile devices
 
Internet Explorer is **NOT** supported!
