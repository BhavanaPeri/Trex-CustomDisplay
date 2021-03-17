var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var gameOver,restart,gameoverImage,restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  canvas =createCanvas(displayWidth,displayHeight-200);
  
  trex = createSprite((displayWidth/2)-150,(displayHeight/2)-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
 //trex.debug=true;
 trex.setCollider("circle",0,0,20); 
  ground = createSprite(displayWidth/2,displayHeight/2 -20,displayWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 // ground.velocityX = -4;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight/2 -20,displayWidth,10);
  invisibleGround.visible = false;
//  visible
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  ground.velocityX = -(6+3*score/100);
  //place gameOver and restart icon on the screen
 gameOver = createSprite((displayWidth/2)-200,(displayHeight/2)-100);
 restart = createSprite((displayWidth/2)-200,(displayHeight/2)-50);
gameOver.addImage("gameOver",gameoverImage);
gameOver.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
restart.depth = obstaclesGroup.depth +1;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  trex.collide(invisibleGround);
  camera.position.x=trex.x;
  camera.position.y=displayHeight/2 -100;
  if(gameState==PLAY){

  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space")&& trex.y>= displayWidth/5 +50) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
    spawnObstacles();
    spawnClouds();
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    //change thde trex animation
    trex.changeAnimation("collided",trex_collided);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite((displayWidth/2) +200 ,(displayHeight/2)-100,40,10);
    cloud.y = Math.round(random(displayHeight/2-150,displayHeight/2-250));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    console.log("MAD HAHAHAHA");
     //assign lifetime to the variable
    cloud.lifetime = 400;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 40 === 0) {
    var obstacle = createSprite(displayWidth/2+450,displayHeight/2-40,10,40);
    //obstacle.velocityX = -4;
  //  if(score % 100=== 0)
//obstacle.velocityX= obstacle.velocityX - 0.5;
    //generate random obstacles
    obstacle.velocityX = -(6+3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //obstacle.debug=true;
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    obstacle.depth= trex.depth+1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
} 
