//The extension I added fro the game project is to add platforms. I tried to add the sound files but as it was taking a lot of time to load I had to remove it. I felt that even though drawing platforms is easy but I found out that making the character stay on the platform is very difficult. I made a lot of mistakes while making the project and got stuck at several places like when the character needs to fall in the canyon, the character always walked on top of the canyon. It took a lot of time but I was able to make it work at the end. I felt that the more time I spent on my project I was able to understand more and more concepts and started getting comfortable with everything I was working with. Even though I was not able to add as many details I wanted to add I am still happy with how my project turned out to be.


var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight
var isFalling;
var isPlummeting;

var collectables;
var canyons;
var clouds;
var scrollPos;
var trees_x;
var mountains;

var gameChar_world_x;

var game_score;

var flagpole;

var platforms;
//used to detect if the fame char is on the platform
var onPlatform;

var lives;

function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    
    lives = 3;
    startGame();
}

function startGame(){
    //init the game 
    gameChar_x = 50;
    gameChar_y = floorPos_y;
    gameChar_width = 50;

    game_score = 0;
    
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    scrollPos = 0;
    
    onPlatform=false;

    gameChar_world_x = gameChar_x - scrollPos;
    
    flagpole = {x_pos: 3500, 
                pole_height:400, 
                flag_height:50, 
                flag_width:100, 
                isReached:false};
    
    canyons = [{x_pos: 250, width: 100},
               {x_pos: 970, width: 100},
               {x_pos: 1500, width: 100},
               {x_pos: 2000, width: 100},
               {x_pos: 2700, width: 100},
               {x_pos: 3200, width: 100}
              ];
    collectables = [
        {x_pos: 10, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 200, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 320, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 360, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 3120, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 450, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 2456, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 568, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 1456, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 678, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 980, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 1000, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 1500, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 2700, y_pos:floorPos_y, size: 40, isFound: false},
        {x_pos: 3000, y_pos:floorPos_y, size: 40, isFound: false}
    ];
                    
    clouds = [{pos_x:200  , pos_y:160 , scale:90},
        {pos_x:500  , pos_y:130 , scale:70},
        {pos_x:900  , pos_y:100 , scale:68},
        {pos_x:1500 , pos_y:170 , scale:80}]
    
    trees_x = [800, 1290, 1600, 2100, 3120];
    
    mountains=[
    {pos_x:480  , pos_y:432},
    {pos_x:1100 , pos_y:432},
    {pos_x:1680 , pos_y:432},
    {pos_x:2769 , pos_y:432},
    {pos_x:3567 , pos_y:432},
    {pos_x:2300 , pos_y:432}
    ]
    
    platforms=[];
    platforms.push(createPlatform(400,floorPos_y-100,100));
    platforms.push(createPlatform(600,floorPos_y-200,100));
    platforms.push(createPlatform(1400,floorPos_y-100,100));
    platforms.push(createPlatform(2800,floorPos_y-200,100));
}

function draw()
{
    ///////////DRAWING CODE//////////
    drawSky();
    drawGround();
   
    push();
    translate(scrollPos,0);
    drawClouds();
    drawMountains();
    drawTrees();
    drawCanyons();
    drawCollectables();
    collectCollectables();
    checkIfGameCharFallIntoCanyon();
    drawFlagpole();
    checkFlagpole();
    drawPlatforms();
    pop();
    
    drawLifeTokens();
    drawGameScore();
    
    //the game character
    drawGameChar();
    
    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here
    var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        drawGameOver();
        return;
    }
    
    if(isPlummeting==true)
    {
        gameChar_y += 10;
        checkPlayerDie();
        return;
    }

    if(gameChar_y<floorPos_y){
        isFalling = true;
    }else{
        isFalling = false;
    }

    if(isLeft==true){
        if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
        else
        {
            scrollPos += 5;
        }
    }
    else if(isRight==true){
        if(gameChar_x < width * 0.8)
        {
            gameChar_x  += 5;
        }
        else
        {   //negative for moving against the background
            scrollPos -= 5; 
        }
    }
    
    checkIfCharacterIsUnderAnyPlatforms();
    
    //Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;
}

//drawing the game character
function drawGameChar(){
    if(onPlatform && isLeft) 
    {
        drawWalkingLeft();
    }
    else if(onPlatform && isRight) 
    {
        drawWalkingRight();
    }
    else if(isLeft && isFalling)
    {
        drawJumpingLeft();
    }
    else if(isRight && isFalling)
    {
        drawJumpingRight();
    }
    else if(isLeft)
    {
        drawWalkingLeft();
    }
    else if(isRight)
    {
        drawWalkingRight();
    }
    else if(onPlatform)
    {
        drawStandingFrontFacing();
    }
    else if(isFalling || isPlummeting)
    {
        drawJumpingFacingForwards();
    }
    else
    {
        drawStandingFrontFacing();
    }
}

//check if the game is over or not
function checkIsGameOver(){
    var gameOver = false;
    
    if(flagpole.isReached || lives<1){
        gameOver = true;   
    }
    return gameOver;
}

//check if the player still has lives left or not
function checkPlayerDie(){
    if(gameChar_y>height){
        if(lives>0){
            startGame();
        }
    }
}

//check if the player reached the flagpole or not
function checkFlagpole(){
    if(flagpole.isReached==false){
        var d = dist(gameChar_world_x,gameChar_y,
                     flagpole.x_pos,floorPos_y);
        if(d<10){
            flagpole.isReached = true;   
        }
    }
}

//interaction to collect the collectables
function collectCollectables(){
    for(var i=0;i<collectables.length;i++){
        if(collectables[i].isFound==false){
            //check if game character is in the range of the collectable
            if(dist(gameChar_world_x,gameChar_y,
                collectables[i].x_pos+15,collectables[i].y_pos)<20){
                collectables[i].isFound=true;
                game_score++;
                console.log("Game score:"+game_score);
            }
        }
    }
}

//writting the game score
function drawGameScore(){
    fill(0);
    textSize(30);
    text("Score:"+game_score,10,30);
}

//check if the character is near the canyon or not
function checkIfGameCharFallIntoCanyon(){
    for(var i=0;i<canyons.length;i++){
        var canyon = canyons[i];
        //check if game character is over the canyon
        if((gameChar_world_x>canyon.x_pos+gameChar_width/2 && gameChar_y== floorPos_y) 
           &&
           (gameChar_world_x<canyon.x_pos+canyon.width-gameChar_width/2 && gameChar_y== floorPos_y))
        {
            isPlummeting=true;
            lives--;
        } 
    }
}

function checkIfCharacterIsUnderAnyPlatforms()
{
    //check if charcater is under the platform
    if(isFalling)
        {
            var isContact = false;
            onPlatform=false;
            for(var i=0; i<platforms.length; i++)
                {
                    isContact=platforms[i].checkContact(gameChar_world_x,gameChar_y);
                    if(isContact)
                        {
                            onPlatform=true;
                            break;
                        }
                }
            if(!isContact) 
            {
                gameChar_y += 1;
            }
        }
}

function keyPressed()
{
    var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        return;
    }
    // if statements to control the animation of the character when
    // keys are pressed.


    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if(keyCode == 37){
        //console.log("left arrow");
        isLeft = true;
    }
    else if(keyCode == 39){
        //console.log("right arrow");
        isRight = true;
    }
    else if(keyCode == 38){
        //ensure that the character only jump when it is touching the ground
        if(gameChar_y>=floorPos_y || onPlatform){
            //console.log("up arrow");
            gameChar_y -= 150;
        }
    }
}

function keyReleased()
{
    var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        return;
    }

    if(keyCode == 37){
        //console.log("left arrow");
        isLeft = false;
    }else if(keyCode == 39){
        //console.log("right arrow");
        isRight = false;
    }
}
