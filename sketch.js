var hypnotic_ball;
var database, position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    hypnotic_ball = createSprite(250,250,10,10);
    hypnotic_ball.shapeColor = "red";

    var hypnotic_ballposition = database.ref('ball/position');// for reference tofirebase database
//creating a listeneer to see the changes happening in database
    hypnotic_ballposition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
// read --> read the new values in the variable
//write--> change to new values in database
function writePosition(x,y){
    database.ref('ball/position').set(
{ 'x': position.x + x ,
  'y': position.y + y
}


    )
    
}

function readPosition(data){

    position=data.val();
    console.log(position.x);
    hypnotic_ball.x = position.x;
    hypnotic_ball.y = position.y;
}
// optional
function showError(){
    console.log("Error in writing to the database");
  }
