/*
    The Game Project Part 7 
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var canyons;
var collectables;
var flagpole;
var isPlummeting;
var trees_x;
var treePos_y;
var clouds;
var cameraPosX = 0;
var mountains_x; 
var mountain; 

// Interaction code
var isLeft;
var isRight;
var isFalling;

var gameOver;
var levelComplete;
var gameScore = 0;

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    treePos_x = width / 2;        
    treePos_y = height / 2;

    flagpole = {
        x_pos: 1470,
        y_pos: floorPos_y,
        isReached: false
    };


    isLeft = false;  
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    gameOver = false;
    levelComplete = false;

    trees_x = [600, 900, 1200, 1500];


    clouds = [
        { x_pos: 100, y_pos: 50, size: 70 },
        { x_pos: 400, y_pos: 50, size: 70 },
        { x_pos: 700, y_pos: 50, size: 70 }
    ];


    mountains = [
        { x_pos: 450, y_pos: 165 },
        { x_pos: 800, y_pos: 165 },
        { x_pos: 1200, y_pos: 165 }
    ];

    canyons = [
        { x_pos: 600, width: 150 },
        { x_pos: 900, width: 150 },
        { x_pos: 1200, width: 150 },

    ];

    collectables = [
        { x_pos: 200, y_pos: 400, size: 50, isFound: false },
        { x_pos: 500, y_pos: 400, size: 50, isFound: false },
        { x_pos: 800, y_pos: 400, size: 50, isFound: false },

    ];


}


function draw() {

    ///////////DRAWING CODE//////////

    background(100, 155, 255);


    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y); 
    cameraPosX = gameChar_x - width / 2;
    push();
    translate(-cameraPosX, 0); 
    for (var i = 0; i < canyons.length; i++) {
        noStroke();
        fill(92, 40, 0);
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
    }

    for (var i = 0; i < mountains.length; i++) {
        strokeWeight(1);
        stroke(51);
        fill(140, 89, 22);
        triangle(mountains[i].x_pos - 298, mountains[i].y_pos + 270, mountains[i].x_pos, mountains[i].y_pos - 101, mountains[i].x_pos + 241, mountains[i].y_pos + 268); 
    }

    for (var i = 0; i < trees_x.length; i++) {
        stroke(51);
        fill(96, 69, 11);
        rect(trees_x[i] - 102, treePos_y + 145, 44, -170);

        noStroke();
        fill(0, 155, 0);
        ellipse(trees_x[i] - 137, treePos_y - 43, 110, 100);
        ellipse(trees_x[i] - 37, treePos_y - 43, 110, 100);
        ellipse(trees_x[i] - 87, treePos_y - 103, 110, 100);


    }

    for (var i = 0; i < clouds.length; i++) {
        clouds[i].x_pos += 0.1; 
        if (clouds[i].x_pos > width) {
            clouds[i].x_pos = -clouds[i].size; 
        }
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos + 180, clouds[i].y_pos, clouds[i].size, clouds[i].size);
        ellipse(clouds[i].x_pos + 230, clouds[i].y_pos, clouds[i].size, clouds[i].size);
        ellipse(clouds[i].x_pos + 280, clouds[i].y_pos, clouds[i].size, clouds[i].size);

    }

    for (var i = 0; i < collectables.length; i++) {

        if (collectables[i].isFound == false) {
            
            strokeWeight(1);
            stroke(51);
            fill(12, 124, 6);
            rect(collectables[i].x_pos + 346, collectables[i].y_pos + 5, 5, 30);
            fill(234, 230, 14);
            ellipse(collectables[i].x_pos + 364, collectables[i].y_pos, 20, 20);
            ellipse(collectables[i].x_pos + 347, collectables[i].y_pos + 12, 20, 20);
            ellipse(collectables[i].x_pos + 347, collectables[i].y_pos - 10, 20, 20);
            ellipse(collectables[i].x_pos + 335, collectables[i].y_pos, 20, 20);
            fill(2, 0, 0);
            ellipse(collectables[i].x_pos + 350, collectables[i].y_pos + 2, 15, 15);

            var distanceToCollectable = dist(gameChar_x, gameChar_y, collectables[i].x_pos + 350, collectables[i].y_pos + 10);

            if (distanceToCollectable < 30) {
                collectables[i].isFound = true;
                gameScore ++;


            }

        }
    }
    
    
    checkFlagpole();

  
    
    if (!flagpole.isReached) {
        stroke(0)
        strokeWeight(2)
        line(flagpole.x_pos, flagpole.y_pos, flagpole.x_pos, 288)
        noStroke()
        fill(242, 34, 19)
        rect(flagpole.x_pos + 1, flagpole.y_pos - 146, 50, 30)
        fill(39, 186, 31)
        rect(flagpole.x_pos + 1, flagpole.y_pos - 146, 50, 10)
        fill(255, 255, 255)
        rect(flagpole.x_pos + 1, flagpole.y_pos - 137, 50, 10)

    } else {
        stroke(0)
        strokeWeight(2)
        line(flagpole.x_pos, flagpole.y_pos, flagpole.x_pos, 288)
        noStroke()
        fill(235, 52, 195)
        rect(flagpole.x_pos + 1, flagpole.y_pos - 146, 50, 30)

    }





    //CANYON
    for (var i = 0; i < canyons.length; i++) {

       
        if (gameChar_x > canyons[i].x_pos && gameChar_x < canyons[i].x_pos + canyons[i].width && gameChar_y >= floorPos_y) {
            isPlummeting = true;
        } else {
            isPlummeting = false;
        }
        
        if (gameChar_y >= floorPos_y && isPlummeting) {
            gameChar_y += 3;
            gameOver = true;
        }
    }

   
    if (gameOver) {
        textAlign(CENTER, CENTER);
        textSize(50);
        fill(255, 0, 0);
        text("Game Over", gameChar_x, height / 2);
        isPlummeting = true;
    }

    if (levelComplete) {
        textAlign(CENTER, CENTER);
        textSize(50);
        fill(0, 255, 0);
        text("Level Complete", gameChar_x, height / 2);
    }

    
    fill(255);
    textSize(20);
    textAlign(RIGHT, TOP);
    text("Score: " + gameScore, gameChar_x, 10);



    //the game character
    if (isLeft && isFalling) {
        // add your jumping-left code
        fill(37, 234, 241);
        rect(gameChar_x - 10, gameChar_y - 52, 18, 30);  // Body
        rect(gameChar_x - 9.8, gameChar_y - 72, 13, 20); // Head
        fill(214, 234, 37);
        rect(gameChar_x + 3, gameChar_y - 72, 5, 20);  // Ear
        fill(214, 234, 37);
        rect(gameChar_x - 25, gameChar_y - 45, 25, 5); // Right hand
        quad(gameChar_x - 10, gameChar_y - 15, gameChar_x + 2, gameChar_y - 15, gameChar_x + 3, gameChar_y - 22, gameChar_x - 7, gameChar_y - 22); // Leg 
        quad(gameChar_x - 3, gameChar_y - 5, gameChar_x + 9, gameChar_y - 5, gameChar_x + 1, gameChar_y - 17, gameChar_x - 10, gameChar_y - 17); // Leg
        fill(224, 139, 232);
        rect(gameChar_x - 9, gameChar_y - 72, 5, 5); // Head line
        rect(gameChar_x - 6, gameChar_y - 7, 15, 5); // Shoes
        fill(224, 139, 232);
        fill(250, 250, 250);
        ellipse(gameChar_x - 5, gameChar_y - 62, 6, 6); // Eye
        fill(0, 0, 0);
        ellipse(gameChar_x - 5, gameChar_y - 62, 3, 3); // Eye
        rect(gameChar_x - 9, gameChar_y - 55, 4, 3); // Lips

    }
    else if (isRight && isFalling) {
        // add your jumping-right code
        fill(37, 234, 241);
        rect(gameChar_x - 10, gameChar_y - 52, 18, 30);  // Body
        rect(gameChar_x - 6, gameChar_y - 72, 13, 20); // Head
        fill(214, 234, 37);
        rect(gameChar_x - 10, gameChar_y - 72, 5, 20);  // Ear
        fill(214, 234, 37);
        rect(gameChar_x, gameChar_y - 45, 25, 5); // Right hand
        quad(gameChar_x, gameChar_y - 15, gameChar_x + 12, gameChar_y - 15, gameChar_x + 5, gameChar_y - 22, gameChar_x - 5, gameChar_y - 22); // Leg
        quad(gameChar_x - 3, gameChar_y - 5, gameChar_x + 9, gameChar_y - 5, gameChar_x + 11, gameChar_y - 17, gameChar_x, gameChar_y - 17); // Leg
        fill(224, 139, 232);
        rect(gameChar_x + 1, gameChar_y - 72, 5, 5); // Head line
        rect(gameChar_x - 3, gameChar_y - 7, 15, 5); // Shoes
        fill(250, 250, 250);
        ellipse(gameChar_x + 1, gameChar_y - 62, 6, 6); // Eye
        fill(0, 0, 0);
        ellipse(gameChar_x + 1, gameChar_y - 62, 3, 3); // Eye
        rect(gameChar_x + 1, gameChar_y - 55, 4, 3); // Lips

    }
    else if (isLeft) {
        // add your walking left code

       fill(37, 234, 241);
        rect(gameChar_x - 10, gameChar_y - 52, 18, 40);  // Body
        rect(gameChar_x - 9.8, gameChar_y - 72, 13, 20); // Head
        fill(214, 234, 37);
        rect(gameChar_x + 3, gameChar_y - 72, 5, 20);  // Ear
        fill(224, 139, 232);
        rect(gameChar_x - 9, gameChar_y - 72, 5, 5); // Head line
        fill(214, 234, 37);
        rect(gameChar_x - 7, gameChar_y - 45, 5, 25); // Right hand
        quad(gameChar_x - 13, gameChar_y, gameChar_x - 1, gameChar_y, gameChar_x + 2, gameChar_y - 12, gameChar_x - 8, gameChar_y - 12); // Leg
        quad(gameChar_x, gameChar_y, gameChar_x + 12, gameChar_y, gameChar_x + 5, gameChar_y - 12, gameChar_x - 5, gameChar_y - 12); // Leg
        fill(224, 139, 232);
        rect(gameChar_x - 17, gameChar_y, 15, 5); // Left shoes
        rect(gameChar_x + 0.5, gameChar_y, 15, 5); // Right shoes
        fill(250, 250, 250);
        ellipse(gameChar_x - 5, gameChar_y - 62, 6, 6); // Eye
        fill(0, 0, 0);
        ellipse(gameChar_x - 5, gameChar_y - 62, 3, 3); // Eye
        rect(gameChar_x - 9, gameChar_y - 55, 4, 3); // Lips

    }
    else if (isRight) {
        // add your walking right code
        fill(37, 234, 241);
        rect(gameChar_x - 10, gameChar_y - 52, 18, 40);  // Body
        rect(gameChar_x - 6, gameChar_y - 72, 13, 20); // Head
        fill(214, 234, 37);
        rect(gameChar_x - 10, gameChar_y - 72, 5, 20);  // Ear
        fill(224, 139, 232);
        rect(gameChar_x + 1, gameChar_y - 72, 5, 5); // Head line
        fill(214, 234, 37);
        rect(gameChar_x, gameChar_y - 45, 5, 25); // Right hand
        quad(gameChar_x, gameChar_y, gameChar_x + 12, gameChar_y, gameChar_x + 5, gameChar_y - 12, gameChar_x - 5, gameChar_y - 12); // Leg
        quad(gameChar_x - 13, gameChar_y, gameChar_x - 1, gameChar_y, gameChar_x + 2, gameChar_y - 12, gameChar_x - 8, gameChar_y - 12); // Leg
        fill(224, 139, 232);
        rect(gameChar_x - 17, gameChar_y, 15, 5); // Left shoes
        rect(gameChar_x + 0.5, gameChar_y, 15, 5); // Right shoes
        fill(250, 250, 250);
        ellipse(gameChar_x + 1, gameChar_y - 62, 6, 6); // Eye
        fill(0, 0, 0);
        ellipse(gameChar_x + 1, gameChar_y - 62, 3, 3); // Eye
        rect(gameChar_x + 1, gameChar_y - 55, 4, 3); // Lips

    }
    else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        fill(214, 234, 37);
        ellipse(gameChar_x - 10, gameChar_y - 63, 10, 20); // Left ear
        ellipse(gameChar_x + 7, gameChar_y - 63, 10, 20);  // Right ear
        fill(37, 234, 241);
        rect(gameChar_x - 16, gameChar_y - 52, 30, 30);  // Body
        rect(gameChar_x - 9.8, gameChar_y - 72, 17, 20); // Head
        fill(224, 139, 232);
        rect(gameChar_x - 6.8, gameChar_y - 72, 10, 5); // Head line
        fill(214, 234, 37);
        rect(gameChar_x - 21, gameChar_y - 45, 5, 25); // Left hand
        rect(gameChar_x + 14.3, gameChar_y - 45, 5, 25); // Right hand
        rect(gameChar_x - 10, gameChar_y - 24, 8, 13); // Left leg
        rect(gameChar_x + 2, gameChar_y - 24, 8, 13); // Right leg
        fill(224, 139, 232);
        rect(gameChar_x - 17, gameChar_y - 15, 15, 5); // Left shoes
        rect(gameChar_x + 0.5, gameChar_y - 15, 15, 5); // Right shoes
        fill(250, 250, 250);
        ellipse(gameChar_x - 5, gameChar_y - 62, 6, 6); // Left eye
        ellipse(gameChar_x + 2, gameChar_y - 62, 6, 6); // Right eye
        fill(0, 0, 0);
        ellipse(gameChar_x - 5, gameChar_y - 62, 3, 3); // Left eye
        ellipse(gameChar_x + 2, gameChar_y - 62, 3, 3); // Right eye
        rect(gameChar_x - 5, gameChar_y - 55, 8, 3); // Lips
        rect(gameChar_x - 2, gameChar_y - 6, 3, 16); // Middle black line
        rect(gameChar_x + 6, gameChar_y - 8.5, 3, 16); // Right black line
        rect(gameChar_x - 10, gameChar_y - 8.5, 3, 16); // Left black line

    }
    else {
        // add your standing front facing code
        fill(214, 234, 37);
        ellipse(gameChar_x - 10, gameChar_y - 63, 10, 20); // Left ear
        ellipse(gameChar_x + 7, gameChar_y - 63, 10, 20);  // Right ear
        fill(37, 234, 241);
        rect(gameChar_x - 16, gameChar_y - 52, 30, 40);  // Body
        rect(gameChar_x - 9.8, gameChar_y - 72, 17, 20); // Head
        fill(224, 139, 232);
        rect(gameChar_x - 6.8, gameChar_y - 72, 10, 5); // Head line
        fill(214, 234, 37);
        rect(gameChar_x - 21, gameChar_y - 45, 5, 25); // Left hand
        rect(gameChar_x + 14.3, gameChar_y - 45, 5, 25); // Right hand
        rect(gameChar_x - 10, gameChar_y - 12, 8, 16); // Left leg
        rect(gameChar_x + 2, gameChar_y - 12, 8, 16); // Right leg
        fill(224, 139, 232);
        rect(gameChar_x - 17, gameChar_y, 15, 5); // Left shoes
        rect(gameChar_x + 0.5, gameChar_y, 15, 5); // Right shoes
        fill(250, 250, 250);
        ellipse(gameChar_x - 5, gameChar_y - 62, 6, 6); // Left eye
        ellipse(gameChar_x + 2, gameChar_y - 62, 6, 6); // Right eye
        fill(0, 0, 0);
        ellipse(gameChar_x - 5, gameChar_y - 62, 3, 3); //left eye
        ellipse(gameChar_x + 2, gameChar_y - 62, 3, 3); //right eye
        rect(gameChar_x - 5, gameChar_y - 55, 8, 3); //lips

    }

   

    pop();


    ///////////INTERACTION CODE//////////
    
    if (isLeft == true) {              
        gameChar_x -= 2.5;            
    } else if (isRight == true) {
        gameChar_x += 2.5;
    }

    if (gameChar_y < floorPos_y) {      

        gameChar_y += 1;
        isFalling = true;
    } else {
        isFalling = false;
    }


}

function keyPressed() {
    
    if (key == "a" ) {
        isLeft = true;
    } else if (key == "d" ) {
        isRight = true;
    } else if (key == "w" && !isFalling && !isPlummeting) {
        gameChar_y -= 100;
        isFalling = true;
    }
}

function keyReleased() {
    if (key == "a") {
        isLeft = false;
    } else if (key == "d") {
        isRight = false;
    }
}
function checkPlayerDie() {
    if (gameChar_y > height) {
        gameOver = true;
    }
}

function restartGame() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    treePos_x = width / 2;
    treePos_y = height / 2;

    flagpole = {
        x_pos: 800,
        y_pos: floorPos_y,
        isReached: false
    };

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    gameOver = false;
    levelComplete = false;

    gameScore = 0;
}

function checkFlagpole() {
    var distanceToFlagpole = dist(gameChar_x, gameChar_y, flagpole.x_pos, flagpole.y_pos);

    if (distanceToFlagpole < 20) {
        flagpole.isReached = true;
        levelComplete = true;
    }
}