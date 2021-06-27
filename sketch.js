var ship;
var canvas;
var bad;
var laser, laserGroup;
var laserCounter = 500;
var b = 600;
var badArray = []
var length = 20;
var boss;
var gameState = "play";
var bossCounter = 350;
var badlaser, badlaserGroup;
var shipCounter = 1;
var shoot = "yes";
var bossHealthBar;
var bossLaser;
var bossLaserGroup;
var playerSpeed = 5;

//powerUp variables
var speedUp = 0;
var speedSprite;
var speedCounter = 200;
var sActive = "false";

var extraAmmo = 0;
var ammoSprite;
var ammoCounter = 300;
var aActive = "false";

var crazyFire = 0;
var crazySprite;
var crazyCounter = 300;
var cActive = "false";

var choose1, choose2;
var control = "true";

//images variable
var laserImg, laser2Img, explosionImg, destoryerImg, tieImg, xImg;

function preload(){
    laserImg = loadImage("Laser.png");
    explosionImg = loadImage("explosion.png");
    destoryerImg = loadImage("starDestroyer.png");
    tieImg = loadImage("tieFighter.png");
    xImg = loadImage("X-wing.png");
    laser2Img = loadImage("laser2.png");
}

function setup(){
    badGroup = new Group();
    laserGroup = new Group();
    badlaserGroup = new Group();
    bossLaserGroup = new Group();

    canvas = createCanvas(600, 800);

    ship = createSprite(300, 700, 20, 20);
    ship.addImage("x", xImg);
    ship.addImage("explosion", explosionImg);
    ship.scale = 0.1;

    boss = createSprite(-320, 120, 575, 100);
    boss.shapeColor = "white";
    boss.addImage("destoryer", destoryerImg);
    boss.addImage("explosion", explosionImg);
    boss.scale = 1.9;

    stroke("white");
    bossHealthBar = createSprite(300, 250, 350, 15);
    bossHealthBar.visible = false
    bossHealthBar.shapeColor = "red";

    

    createBad(b);
}

function draw(){
    background("black");
    //console.log(shipCounter);

    //text(mouseX + "," + mouseY, mouseX, mouseY);
    
    keyPressed();
    text("AMMO: " + laserCounter, 500, 700);
    
    if(gameState === "play"){
        for(var i = 0; i < 20; i += 1){
            if(laserGroup.isTouching(badArray[i])){
              
                badArray[i].destroy();
                badArray[i].x = 650;
                length -= 1;
                //console.log(badArray[i])
            }
        }
    
        if(length === 0 && b > 100){
            length = 20;
            b -= 550;

            if(b === 50){
                gameState = "boss"
            } else {
                createBad(b);
            }
            
        } 


        if(frameCount%25===0||frameCount%26===0||frameCount%27===0){
            var number = Math.round(random(0, 19));
            
            var x = badArray[number].x;
            var y = badArray[number].y;
           // console.log(badArray[number]);

            if(badArray[number].x != 650){
                
                badlaser = createSprite(x, y, 3, 10);
                badlaser.addImage(laserImg);
                badlaser.scale = 0.2;
               
                //badlaser.velocityY = 7;
                badlaser.lifetime = 100;
                badlaserGroup.add(badlaser);
                badlaser.depth = badArray[number].depth - 1;
            } else {
                number = Math.round(random(0, 19));
            }
            

        }
        
        if(badlaserGroup.isTouching(ship)){
            shipCounter -= 1
        }

        if(shipCounter === 0){
            ship.changeImage("explosion", explosionImg);
            ship.scale = 1;
            ship.lifetime = 30;
            //ship.destroy();
            gameState = "end"
        }


       /*if(b%100===0 && control === "true"){
            choose1 = Math.round(random(0, 20));
            choose2 = Math.round(random(1, 1));
            switch(choose2){
                case 1: speedUp = 1;
                break;

                case 2: extraAmmo = 1;
                break;

                case 3: crazyFire = 1;
                break;
            }
        }

        if(speedUp === 1){
            
            var x = badArray[choose1].x;
            var y = badArray[choose1].y;
            speedSprite = createSprite(x, y, 20, 12);
            speedSprite.shapeColor = "blue";

            //speedSprite.x = x;
            
            control = "false";

           // if(){
                console.log("yes")
                speedSprite.velocityY = 2;
            //}
            

            if(ship.isTouching(speedSprite)){
                //speedSprite.x = 700;
                playerSpeed = 15;
                sActive = "true";
            }

            if(sActive === "true"){
                speedCounter -= 1;
            }

            if(speedCounter === 0){
                playerSpeed = 5;
                sActive = "false";
                speedCounter = 200;
                control = "true";
            }
        } */
        
    }



    if(gameState === "boss"){
        shoot = "no";
       boss.velocityX = 5;
       playerSpeed = 15;

        if(boss.x === 300){
            boss.velocityX = 0;
            shoot = "yes";
            bossHealthBar.visible = true;
        }

        bossHealthBar.width = bossCounter;

        
       console.log(bossCounter)

        if(laserGroup.isTouching(boss) && bossCounter>0){
            bossCounter -= 1;
        }

        if(bossCounter <= 0){
            boss.changeImage("explosion", explosionImg);
            boss.scale = 3;
            boss.lifetime = 40;
            boss.y = boss.y + 30;
            bossHealthBar.destroy();
            console.log("yes");
            gameState = "end";
        }
        
        if(frameCount%16===0||frameCount%17===0||frameCount%18===0){
            
           
            if(shoot === "yes"){
                var h = Math.round(random(1, 600));
                console.log(h)
                bosslaser = createSprite(h, 100, 3, 10);
                bosslaser.addImage(laserImg);
                bosslaser.scale = 0.3;
               // bosslaser.velocityY = 22;
                bosslaser.lifetime = 100;
                bossLaserGroup.add(bosslaser);

                boss.depth = bosslaser.depth + 1;
            }
            
        }

        if(bossLaserGroup.isTouching(ship)){
            ship.changeImage("explosion", explosionImg);
            ship.scale = 1;
            ship.lifetime = 30;
            gameState = "end";
        }
    }
    
   

    drawSprites();
}


function createBad(a){
        var x = 10;
        for(var i = 0; i < 20; i += 1){
           
            badArray[i] = createSprite(x, a, 20, 20)
            badArray[i].addImage("tie", tieImg);

            badArray[i].scale = 0.13
            x += 30;
        }
    
}


function keyPressed(){
    if(keyIsDown(65) && gameState != "end"){
        ship.x  = ship.x - playerSpeed;
    }

    if(keyIsDown(68) && gameState != "end"){
        ship.x = ship.x + playerSpeed;
    }
}


function mouseClicked(){
        
        if(laserCounter > 0 && gameState != "end" && shoot === "yes"){
            laser = createSprite(ship.x, ship.y, 3, 10);
            laser.addImage(laser2Img);
            laser.scale = 0.15;
            laser.velocityY = -25;
            laserGroup.add(laser);
            laser.lifetime = 100;

            laserCounter -= 1;
        }
}


