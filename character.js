function drawJumpingLeft(){
    fill(179,0,0);//making the body
    ellipse(gameChar_x,gameChar_y-38,30,50);
    rect(gameChar_x+15,gameChar_y-48,5,20);
    rect(gameChar_x-20,gameChar_y-32,10,18);
    rect(gameChar_x-15,gameChar_y-24,10,15);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-43,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x-7,gameChar_y-48,20,10);
    noStroke();
}

function drawJumpingRight(){  
    fill(179,0,0);//making the body
    ellipse(gameChar_x,gameChar_y-38,30,50);
    rect(gameChar_x-20,gameChar_y-48,5,20);
    rect(gameChar_x+10,gameChar_y-32,10,18);
    rect(gameChar_x+5,gameChar_y-24,10,15);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-43,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x+7,gameChar_y-48,20,10);
    noStroke();
}

function drawWalkingLeft(){
    fill(179,0,0);//making the body
    rect(gameChar_x-15,gameChar_y-38,30,28);
    quad(gameChar_x-15,gameChar_y-10,gameChar_x-18, gameChar_y+2, gameChar_x-8,gameChar_y+2, gameChar_x-3,gameChar_y-10);
    rect(gameChar_x+3,gameChar_y-15,18,10);
    rect(gameChar_x+15,gameChar_y-38,5,20);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-33,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x-7,gameChar_y-38,20,10);
    noStroke();
}

function drawWalkingRight(){
    fill(179,0,0);//making the body
    rect(gameChar_x-15,gameChar_y-38,30,28);
    rect(gameChar_x-20,gameChar_y-38,5,20);
    rect(gameChar_x-22,gameChar_y-15,18,10);
    quad(gameChar_x+5,gameChar_y-10,gameChar_x+8,gameChar_y+2, gameChar_x+18,gameChar_y+2,gameChar_x+15,gameChar_y-10);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-33,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x+7,gameChar_y-38,20,10);
    noStroke();
}

function drawJumpingFacingForwards(){
    fill(179,0,0);//making the body
    rect(gameChar_x-15,gameChar_y-45,30,28);
    rect(gameChar_x-15,gameChar_y-17,10,9);
    rect(gameChar_x+5,gameChar_y-17,10,9);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-40,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x,gameChar_y-48,20,10);
    noStroke();
}

function drawStandingFrontFacing(){
    fill(179,0,0);//making the body
    rect(gameChar_x-15,gameChar_y-38,30,28);
    rect(gameChar_x-15,gameChar_y-10,10,12);
    rect(gameChar_x+5,gameChar_y-10,10,12);
    fill(255,0,0);//making the head
    ellipse(gameChar_x,gameChar_y-33,30,40);
    stroke(0);
    fill(98, 216, 255);//making the helmet screen
    ellipse(gameChar_x,gameChar_y-38,20,10);
    noStroke();
}
