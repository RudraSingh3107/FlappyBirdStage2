var flappyBird;
var flappyImg, flappyImgUp;
var ground;
var obstacleUp,obstacleUpImg, obstacleDown,obstacleDownImg;
var groundImg, backgroundImg;


function preload(){

  flappyImg = loadImage("sprites/bluebird-downflap.png");
  flappyImgUp = loadImage("sprites/bluebird-upflap.png")

  obstacleUpImg = loadImage("images/obstacle_top.png");
  obstacleDownImg = loadImage("images/obstacle_bottom.png");

  backgroundImg = loadImage("sprites/FlappyBackDrop.png");

  groundImg = loadAnimation("sprites/base.png")

}
 
function setup() {
  createCanvas(600,600);
  
    
  flappyBird = createSprite(100,300,30,30);
  flappyBird.shapeColor = "blue";
  flappyBird.addImage("flappy",flappyImg);
  flappyBird.addImage("flappyUp", flappyImgUp);
  flappyBird.debug = true;
  flappyBird.setCollider("circle",0,0,50);

  ground = createSprite(400,height - 20,1200,10);
  ground.x = ground.width/2;
  ground.shapeColor = "blue";
  ground.addAnimation("base", groundImg);
  
}

function draw() {
  background(backgroundImg);
 
  //flappyBird.velocityX = 3;

  if(keyDown("space") || keyDown("up_arrow")){

      flappyBird.velocityY = -5;
      flappyBird.changeImage("flappyUp");
      flappyBird.scale = 2.;
  }else{

    flappyBird.velocityY = 5;
    flappyBird.changeImage("flappy");
    flappyBird.scale = 1.5;
  }

  if(flappyBird.collide(ground)){
    flappyBird.velocityY = 0;
  }

  ground.velocityX = -10;
  if(ground.x < 0){

    ground.x = ground.width/2;
  }
  
  //ground.visible = false;

  obstaclesSummon();
  drawSprites();
  }

  function obstaclesSummon(){

    if(frameCount % 30 === 0){

      obstacleDown = createSprite(width-10,random(700,450), 50, 20);
      obstacleDown.addImage("pillarBottom", obstacleDownImg);
      obstacleDown.velocityX = -10;
      obstacleDown.lifetime = 300;
      obstacleDown.depth = flappyBird.depth;
      obstacleDown.depth = ground.depth;

      obstacleUp = createSprite(width-10,random(-100, height-550), 50, 20);
      obstacleUp.addImage("pillarUp", obstacleUpImg);
      obstacleUp.velocityX = -10;
      obstacleUp.lifetime = 300;
      obstacleUp.depth = flappyBird.depth;
      obstacleUp.depth = ground.depth;

      flappyBird.depth = flappyBird.depth+1;
      ground.depth = ground.depth+1;
    }

  }