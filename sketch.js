var bgImg,balloonImg,topGround,bottomGround,balloon
var obsTop1,obsTop2,obsBottom1,obsBottom2,obsBottom3
var obsTop,obsBottom
var gameState="play"
var score=0
function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsTop1=loadImage("assets/obsTop1.png")
obsTop2=loadImage("assets/obsTop2.png")
obsBottom1=loadImage("assets/obsBottom1.png")
obsBottom2=loadImage("assets/obsBottom2.png")
obsBottom3=loadImage("assets/obsBottom3.png")
gameOverImage=loadImage("assets/gameOver.png")
restartImage=loadImage("assets/restart.png")
}

function setup(){

//background image
createCanvas(800,400)


//creating top and bottom grounds
topGround=createSprite(400,10,800,20)
bottomGround=createSprite(400,390,800,20)
topGround.visible=false
bottomGround.visible=false

      
//creating balloon     
balloon=createSprite(200,200,20,20)
balloon.addAnimation("balloonAni",balloonImg)
balloon.scale=0.2
//balloon.debug=true
balloon.setCollider("rectangle",0,0,30,30)
topObstaclesGroup=new Group();
bottomObstaclesGroup=new Group();
barGroup=new Group();

gameOver=createSprite(400,200,20,20)
gameOver.addImage(gameOverImage)
gameOver.scale=0.5
restart=createSprite(400,230,20,20)
restart.addImage(restartImage)
restart.scale=0.5
}

function draw() {
  
  background(bgImg);
      
       if (gameState==="play"){
         gameOver.visible=false
         restart.visible=false
        if(keyDown("space")){
          balloon.velocityY=-6
        }
        balloon.velocityY+=1
        spawnObstaclesTop();
        spawnBars();
        spawnObstaclesBottom();
        
        if (balloon.isTouching(bottomObstaclesGroup)|| balloon.isTouching(topObstaclesGroup)|| balloon.y>400){
          gameState="end"
        }

       }
       if (gameState==="end"){
         balloon.velocityY=0
         gameOver.visible=true
         restart.visible=true
         bottomObstaclesGroup.setVelocityXEach(0)
         barGroup.setVelocityXEach(0)
         barGroup.setLifetimeEach(-1)
         topObstaclesGroup.setVelocityXEach(0)
         topObstaclesGroup.setLifetimeEach(-1)
         bottomObstaclesGroup.setLifetimeEach(-1)
         if(mousePressedOver(restart)){
           reset();

         }
       }
       
       drawSprites() ;
       Score();
      // balloon.collide(bottomGround)
          //making the hot air balloon jump
       
}
function Score(){
  if(balloon.isTouching(barGroup)){
    score+= 3
  }
   textSize(25);
   fill("black")
   text("Score: "+score,650,30 )
}
function spawnBars(){
  if (frameCount%100===0){
    bar = createSprite(800,200,20,800)
    bar .velocityX=-3
    bar.lifeTime=300
    balloon.depth=bar.depth+1
    barGroup.add(bar) 
  }
}
function spawnObstaclesTop(){
  if (frameCount%80===0){
    obsTop=createSprite(800,Math.round(random(10,100)),20,20)
    obsTop.velocityX=-3
    obsTop.scale=0.1
    rand=Math.round(random(1,2))
    switch(rand){
      case 1:
        obsTop.addImage(obsTop1);
        break;
        case 2:
        obsTop.addImage(obsTop2);
        break;
        default :break

        

    }
    obsTop.lifeTime=300
    balloon.depth+=1
    topObstaclesGroup.add(obsTop)
  }
}
function spawnObstaclesBottom(){
  if (frameCount%120===0){
    obsBottom=createSprite(800,310,20,20)
    obsBottom.velocityX=-3
    obsBottom.scale=0.1
    rand=Math.round(random(1,3))
    switch(rand){
      case 1:
        obsBottom.addImage(obsBottom1);
        break;
        case 2:
        obsBottom.addImage(obsBottom2);
        break;
        case 3:
          obsBottom.addImage(obsBottom3);
          break;
        default :break

        

    }
    obsBottom.lifeTime=300
    balloon.depth+=1
    bottomObstaclesGroup.add(obsBottom)
  }
}
function reset(){
  gameState="play"
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  barGroup.destroyEach();
  score=0
}