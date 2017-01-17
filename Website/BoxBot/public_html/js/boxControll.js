//http://stackoverflow.com/questions/8886248/add-image-to-page-onclick

var recordedDirections = "";
var speed = 25; //25 out of 100
var time = 500; //in ms
var internalDevider = '&';  // looks like "forward+25+500;left+25+500;"
var devider = ';';  //ends single direction command
var formattedDirection = "";    //direction after formatting
var recordedDirections = "";    //record of all direction commands given
var num = 0; //counts the amount of commands


function addDirection(direction) {
    console.log(direction);
    formattedDirection = direction + internalDevider + speed + internalDevider + time + devider; // so it will look like "forward+25+500;left+25+500;" or "direction+speed+time;"
    console.log(recordedDirections);
    num = num+1;

    var img = document.createElement("img");

    switch (direction) {
        case 'up':
            img.src = "resources/directions/up.png";
            break;
        case 'left':
            img.src = "resources/directions/left.png";
            break;
        case 'right':
            img.src = "resources/directions/right.png";
            break;
        case 'down':
            img.src = "resources/directions/down.png";
            break;
    }
    img.id = "directionImage" + num;
    img.height = 50;
    img.width = 50;
    document.getElementById("directionsField").appendChild(img);
    console.log(img.id);
}

function erase() {
    //command removal
    recordedDirections = recordedDirections - formattedDirection;
    
    //image removal
    $("#directionImage" + num).remove();// num causes the last added image to be removed instead of the first
    num = num -1; //prepare num to delete the second last image
    console.log(recordedDirections);
}

function go() {

}

function stop() {

}