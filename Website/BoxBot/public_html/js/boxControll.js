//http://stackoverflow.com/questions/8886248/add-image-to-page-onclick

var recordedDirections = "";
var speed = 25; //25 out of 100
var time = 500; //in ms
var internalDevider = '_';  // looks like "forward+25+500;left+25+500;"
var devider = ';';  //ends a single direction command
var formattedDirection = "";    //direction after formatting
var num = 0; //is used for the commands array, gives the images a unique id for removal
var recordedDirections = "";
var directionArray = new Array();


function addDirection(direction) {
    console.log(direction);
    formattedDirection = direction + internalDevider + speed + internalDevider + time + devider; // so it will look like "forward+25+500;left+25+500;" or "direction+speed+time;"
    directionArray[num] = formattedDirection;
    console.log(directionArray);

    //num + 1 after everything is done
    num = num + 1;

    //add image
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
    img.id = "directionImage" + num; //give the image an unique id for removal
    img.height = 50;
    img.width = 50;
    document.getElementById("directionsField").appendChild(img); //append image to div
}

function erase() {
    if (num > 0) {//prevents num from going negative, otherwise the array will be negative
        //command removal
        delete directionArray[num - 1]; //minus 1 becaus the array is incremented after filling an element

        //image removal
        $("#directionImage" + num).remove();// num causes the last added image to be removed instead of the first

        num = num - 1; //prepare num to delete the second last image

        console.log(directionArray);
    }
}

function go() {
    var recordedDirections = "";
    for (var i = 0; i <= num; i++) {//add all the array entries together into one string to be sent
        if (directionArray[i] != null) {//prevents adding empty array entries
            recordedDirections = recordedDirections + directionArray[i];
        }
    }
    console.log(recordedDirections);

    if (directionArray[0] != null) {//if the first enry is not empty
        //post recordedDirections to wilco's api and then to the nodeMCU
        url = "http://thingscon16.futuretechnologies.nl/api.php?t=sdc&d=FF6E&td=FF6E&c=&m=" + recordedDirections;
        $.ajax({
            type: "POST",
            url: url,
            data: recordedDirections,
            success: console.log("go post success")
        });

        //change button to stop button
        document.getElementById("goButton").className = 'btn btn-danger controllerButton'; //change class to change color
        document.getElementById("goButton").setAttribute("onClick", "stop();"); //change onclick event to stop to run stop at the next click
        document.getElementById("goButton").id = 'stopButton'; //change id to use js on the stop button instead of the go button
        document.getElementById("goButtonGlyphicon").className = 'glyphicon glyphicon-stop'; //change glypicon to stop
    }
}

function stop() {
    //to stop the bot
    $.ajax({
        type: "POST",
        url: "http://thingscon16.futuretechnologies.nl/api.php?t=sdc&d=FF6E&td=FF6E&c=&m=stop",
        data: stop,
        success: console.log("stop post success")
    });
    
    //change button to goButton
    document.getElementById("stopButton").className = 'btn btn-success controllerButton'; //change class to change color
    document.getElementById("stopButton").setAttribute("onClick", "go();"); //change onclick event to go to run go at the next click
    document.getElementById("stopButton").id = 'goButton'; //change id to use js on the go button instead of the stop button
    document.getElementById("goButtonGlyphicon").className = 'glyphicon glyphicon-play-circle'; //change glypicon to go

}