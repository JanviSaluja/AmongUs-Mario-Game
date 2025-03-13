function drawGameOver(){
    fill(0);
    textSize(80);
    text("Game over",250,height/2-100);
    
    if(lives>0){
        text("You win!",300,height/2);   
    }else{
        text("You lose!",300,height/2); 
    }
}


function drawLifeTokens(){
    fill(231,84,128);
    for(var i=0;i<lives;i++){
        ellipse(40*i+900,20,25,25);   
    }
}

function drawFlagpole(){
    fill(125);
    rect(flagpole.x_pos,
         floorPos_y-flagpole.pole_height,
         30,
         flagpole.pole_height);
    fill(0,0,255);
    if(flagpole.isReached){
        rect(flagpole.x_pos,
         floorPos_y-flagpole.pole_height,
         flagpole.flag_width,
         flagpole.flag_height);
    }else{
         rect(flagpole.x_pos,
         floorPos_y-flagpole.flag_height,
         flagpole.flag_width,
         flagpole.flag_height);
    }
}

function drawTrees()
{
    for(var i in trees_x)
        {
            drawTree(trees_x[i]);
        }
}

function drawTree(t_tree)
{
    //drawing branches and the trunk
    fill(43, 29, 14);
    beginShape();
    vertex(t_tree,floorPos_y); //anchor point
    vertex(t_tree,floorPos_y-92);
    vertex(t_tree-50,floorPos_y-192);
    vertex(t_tree-30,floorPos_y-192);
    vertex(t_tree,floorPos_y-122);
    vertex(t_tree+30,floorPos_y-232);
    vertex(t_tree+50,floorPos_y-232);
    vertex(t_tree+30,floorPos_y-132);
    vertex(t_tree+70,floorPos_y-182);
    vertex(t_tree+70,floorPos_y-172);
    vertex(t_tree+30,floorPos_y-92);
    vertex(t_tree+50,floorPos_y);
    endShape();
    //drawing leaves
    stroke(0,40,0,50);
    fill(0,100,0);
    ellipse(t_tree-50,floorPos_y-202,100,100);
    ellipse(t_tree+10,floorPos_y-232,100,150);
    ellipse(t_tree+70,floorPos_y-212,100,100);
    ellipse(t_tree+70,floorPos_y-182,50,50);
    noStroke();
}

function drawMountains()
{
    for(var i in mountains)
        {
            drawMountain(mountains[i])
        }
}

function drawMountain(t_mountain)
{
    fill(60, 0, 50);
    beginShape();
    vertex(t_mountain.pos_x,t_mountain.pos_y);//anchor point
    vertex(t_mountain.pos_x+70,t_mountain.pos_y-150);
    vertex(t_mountain.pos_x+170,t_mountain.pos_y-200);
    vertex(t_mountain.pos_x+270,t_mountain.pos_y);
    endShape(); 
}

function drawClouds(){
    fill(186,186,186);
    for(var i in clouds){
        drawCloud(clouds[i]);
    }
}

function drawCloud(t_cloud){
    //this is the anchor point
    ellipse(t_cloud.pos_x,t_cloud.pos_y,t_cloud.scale,t_cloud.scale);//anchor point
    ellipse(t_cloud.pos_x-50,t_cloud.pos_y,t_cloud.scale, t_cloud.scale-20);
    ellipse(t_cloud.pos_x-90,t_cloud.pos_y,t_cloud.scale-30,t_cloud.scale-40);
    ellipse(t_cloud.pos_x+50,t_cloud.pos_y,t_cloud.scale-20,t_cloud.scale-30);
    
    //generating random values as the speed of the cloud
    cloudspeed= random(1,4);
    //animating the clouds
    t_cloud.pos_x += cloudspeed;
}

function drawCanyons(){
    for(var i=0;i<canyons.length;i++){
        var canyon = canyons[i];
        drawCanyon(canyon);
    }
}

function drawCanyon(t_Canyon){
    fill(100, 155, 255);//sky behind the canyon
    rect(t_Canyon.x_pos,floorPos_y,t_Canyon.width,height-floorPos_y);
    fill(204,255,255,200);//water
    rect(t_Canyon.x_pos,floorPos_y+40,t_Canyon.width,height-floorPos_y);
}

function drawCollectables()
{
    for(var i=0;i<collectables.length;i++){
        if(collectables[i].isFound==false){
            drawCollectable(collectables[i]);
        }
    }
}

function drawCollectable(t_Collectable)
{
    strokeWeight(2);
    stroke(166,154,89);
    fill(216,188,39);
    ellipse(t_Collectable.x_pos,t_Collectable.y_pos-30,22,22);
}

function drawGround(){
	fill(0, 140, 0);//draw some green grass
    rect(0,floorPos_y,width,20);
    fill(101, 68, 33);//draw some brown soil
    rect(0,floorPos_y+20,width,floorPos_y+20);
}

function drawSky(){
    background(100, 155, 255); // fill the sky blue
}

function createPlatform(x,y,length) 
{
    var p= {
        x:x,
        y:y,
        length:length,
        draw: function()
        {
            noStroke();
            fill(0, 140, 0);//green grass
            rect(this.x,this.y,this.length,10);
            fill(98,68,33)//brown soil
            rect(this.x,this.y+10,this.length,20);
        },
        checkContact: function(gc_x, gc_y) {
            //check for x-axis
            if(gc_x+20>this.x && gc_x<this.x +20 +this.length)
                {
                    //check for y-axis-game char is on platform
                    var d=this.y - gc_y;
                    if(d>=0 && d<1)
                        {
                            return true;
                        }
                }
            return false;
        }
    }
    return p;
}

function drawPlatforms()
{
    for(var i=0; i<platforms.length; i++)
        {
            platforms[i].draw();
        }
}
