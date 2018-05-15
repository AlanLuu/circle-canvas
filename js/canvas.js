/* global $ */
/* global navigator */

"use strict";

const canvas = document.getElementById("canvas"); 
const context = canvas.getContext("2d"); 
const log = console.log, print = console.log;

/*
 Sets the canvas's width to fill the screen width, with 20px margins on each edge, and the canvas's height to take up
 half of the screen's height, rounded up.
 
 The default canvas width and height are both 500px.
*/
canvas.width = screen.width - 20;
canvas.height = Math.round(screen.height / 2); 

var x = Math.round(canvas.width / 2); //X position of the circle.
var y = Math.round(canvas.height / 2); //Y position of the circle.
var mouseX = detectMob() ? null : Math.round(canvas.width / 2); //X position of the user's mouse.
var mouseY = detectMob() ? null : Math.round(canvas.height / 2); //Y position of the user's mouse.
var touchX = detectMob() ? Math.round(canvas.width / 2) : null; //If the user is using a mobile device, this represents the x value of where the user touched the canvas.
var touchY = detectMob() ? Math.round(canvas.height / 2) : null; //If the user is using a mobile device, this represents the y value of where the user touched the canvas.
var velocity = 2; //The speed the circle moves at.
var circleRadius = detectMob() ? 20 : 40;
const pi = Math.PI; //Pi = π
var randomColor = getRandomColor();
var interval;

$(document).ready(function() {
    $("#velocityCounter").html(`Circle speed: ${velocity}`);
    interval = setInterval(function(){$("#circlePos").html(`Circle position: (${Math.floor(x)}, ${Math.floor(y)})`)}, 1000/30);
    $("#colorCode").html(`Color HEX code: ${randomColor}`);
    $("#mobileCounter").html(`Mobile device: ${detectMob() ? "Yes" : "No"}`);
    $("#screenWidth").html(`Screen width: ${screen.width}`);
    $("#screenHeight").html(`Screen height: ${screen.height}`);
    $("#canvasWidth").html(`Canvas width: ${canvas.width}`);
    $("#canvasHeight").html(`Canvas height: ${canvas.height}`);
    $("#userAgent").html(navigator.userAgent);
    $("#debugData").hide();
    
    //This function stops the circle and resets its position to the center of the canvas.
    $("#button1").click(function() {
        velocity = 0, x = Math.round(canvas.width / 2), y = Math.round(canvas.height / 2);
        clearInterval(interval);
        document.getElementById("velocityCounter").innerHTML = `Circle speed: ${velocity}`;
        document.getElementById("circlePos").innerHTML = `Circle position: (${Math.floor(x)}, ${Math.floor(y)})`;
    });
    
    //This function enables the user to enter a custom value for the circle's speed.
    $("#button2").click(function() {
        var userInput = window.prompt("Enter a speed value.");
        if (userInput == parseFloat(userInput, 10)) {
            userInput = parseFloat(userInput, 10);
            velocity = userInput;
            interval = setInterval(function(){document.getElementById("circlePos").innerHTML = `Circle position: 
            (${Math.floor(x)}, ${Math.floor(y)})`}, 1000/30);
            document.getElementById("velocityCounter").innerHTML = `Circle speed: ${velocity}`;
        }
    });
    
    $("#button3").click(function(event) {
        event.preventDefault();
        $("#debugData").show();
    });   
    
    $("#button4").click(function(event) {
        event.preventDefault();
        $("#debugData").hide();
    });
    
    //Changes the circle's color every four seconds.
    setInterval(function() {
        randomColor = getRandomColor();
        $("#colorCode").html(`Color HEX code: ${randomColor}`);
    }, 4000);
    
});

canvas.addEventListener(detectMob() ? "click" : "mousemove", detectMob() ? touchMoved : mouseMoved);

//Detects if the user is using a mobile device or not.
function detectMob() {
    var check = false;
    (function (a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

//Function for drawing circles on the canvas.
function drawCircle(circleX, circleY, radius, color, stroke = false) {
    context.beginPath(); 
    context.arc(circleX, circleY, radius, 0, 2 * pi); 
    if (stroke) {
        context.strokeStyle = color; 
        context.stroke();
    } else {
        context.fillStyle = color; 
        context.fill(); 
    }
}

/*
 mouse is an object that contains two variables that we care about: clientX and clientY. These represent, 
 respectively, the x and y coordinates of the mouse cursor in relation to the canvas.
*/
function mouseMoved(mouse) {
    mouseX = mouse.clientX;
    mouseY = mouse.clientY;
}

//This function handles when the user visits this website on a mobile browser and touches the canvas.
function touchMoved(touch) {
    touchX = touch.clientX;
    touchY = touch.clientY;
}

//This function gets called first when the webpage loads.
(function drawScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    calculatePosition();
    //drawCircle(x, y, circleRadius, "rgb(0, 150, 255)"); 
    drawCircle(x, y, circleRadius, randomColor); 
    requestAnimationFrame(drawScreen);
})(); 

//This function generates a random HEX color code.
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

//This function handles the circle following the mouse cursor or going to where the user touches on the screen.
function calculatePosition() {
    if (mouseX > x || touchX > x) { 
        x += velocity;
    } else if (mouseX < x || touchX < x) { 
        x -= velocity;
    } 
    
    if (mouseY > y || touchY > y) {  
        y += velocity;
    } else if (mouseY < y || touchY < y) { 
        y -= velocity;
    } 
}
