var playlvl1;
var end;
var playlvl2;
var playlvl3;
var gameState = "playlvl1";
var pigeon, pigeon_flying;
var crane, crane_flying;
var parrot, parrot_flying;
var beach, beachImg;
var forest, forestImg;
var jungle, jungleImg;
var bean, beanImg;
var fire, fireImg;
var iceberg, icebergImg;
var rock, rockImg;
var beanGrp, fireGrp, icebergGrp, rockGrp;
var foodCollected;

function preload() {
  pigeon_flying = loadAnimation("pigeon1.png", "pigeon2.png", "pigeon3.png", "pigeon4.png", "pigeon5.png", "pigeon6.png", "pigeon7.png", "pigeon8.png", "pigeon9.png");

  crane_flying = loadAnimation("crane1.png", "crane2.png", "crane3.png", "crane4.png", "crane5.png", "crane6.png", "crane7.png", "crane8.png");

  parrot_flying = loadAnimation("parrot1.png", "parrot2.png", "parrot3.png", "parrot4.png", "parrot5.png", "parrot6.png", "parrot7.png", "parrot8.png", "parrot9.png");

  beachImg = loadImage("beachbg.jpg");

  forestImg = loadImage("forest.bg.jpg");

  jungleImg = loadImage("j.jpg");

  beanImg = loadImage("beans.png");

  fireImg = loadImage("fire.png");

  icebergImg = loadImage("iceberg.png");

  rockImg = loadImage("rock.png");

  beanGrp = new Group();
  fireGrp = new Group();
  icebergGrp = new Group();
  rockGrp = new Group();

  foodCollected = 0;

}

function setup() {
  createCanvas(625, 600);

  beach = createSprite(325, 300, 1, 1);
  beach.addImage(beachImg);

  forest = createSprite(325, 300, 1, 1);
  forest.addImage(forestImg);

  jungle = createSprite(325, 300, 1, 1);
  jungle.addImage(jungleImg);
  jungle.scale = 0.6;

  parrot = createSprite(100, 300, 1, 1);
  parrot.addAnimation("parrot_fly", parrot_flying);
  parrot.scale = 0.5;

  crane = createSprite(100, 200, 1, 1);
  crane.addAnimation("crane_fly", crane_flying);
  crane.scale = 0.8;

  pigeon = createSprite(100, 290, 1, 1);
  pigeon.addAnimation("pigeon_fly", pigeon_flying);
  pigeon.scale = 0.5;

}

function draw() {

  background(0);

  if (gameState === "playlvl1") {
    forest.visible = true;
    pigeon.visible = true;

    beach.visible = false;
    crane.visible = false;
    parrot.visible = false;
    jungle.visible = false;

    forest.velocityX = -2;

    if (forest.x < 0 && gameState === "playlvl1") {
      forest.x = 300;
    }

    spawnFire();
    spawnBean();

    if (keyDown("space") && gameState === "playlvl1") {
      pigeon.velocityY = -10;
    }

    pigeon.velocityY = pigeon.velocityY + 0.8;

    if (keyDown("LEFT_ARROW") && gameState === "playlvl1") {
      pigeon.x = pigeon.x - 4;
    }

    if (keyDown("RIGHT_ARROW") && gameState === "playlvl1") {
      pigeon.x = pigeon.x + 4;
    }

    if (pigeon.isTouching(beanGrp) && gameState === "playlvl1") {
      foodCollected = foodCollected + 1;
      beanGrp.destroyEach();
    }

    if (foodCollected === 5 && gameState === "playlvl1") {
      gameState = "win";
    }

    if ((pigeon.isTouching(fireGrp) || pigeon.y > 610) && gameState === "playlvl1") {
      pigeon.destroy();
      fireGrp.destroyEach();
      beanGrp.destroyEach();
      beanGrp.setVelocityXEach(0);
      fireGrp.setVelocityXEach(0);
      forest.velocityX = 0;
      gameState = "end";
    }

  }

  drawSprites();

  textSize(20);
  fill("blue");
  text("Food Collected: " + foodCollected, 50, 50);

  if (gameState === "end") {
    background(0);
    fill("yellow");
    textSize(30);
    text("GAME OVER", 230, 300);
  }

  if (gameState === "win") {
    background(0);
    fill("yellow");
    textSize(30);
    text("YOU WON", 230, 300);
  }
}

function spawnFire() {
  if (frameCount % 550 === 0) {
    fire = createSprite(width, 480, 1, 1);
    fire.addImage(fireImg);
    fire.scale = 0.35;
    fire.velocityX = -4;
    fireGrp.add(fire);

  }

}

function spawnBean() {
  if (frameCount % 160 === 0) {
    bean = createSprite(width, 400, 1, 1);
    bean.addImage(beanImg);
    bean.scale = 0.1;
    bean.y = Math.round(random(200, 580));
    bean.velocityX = -4;
    beanGrp.add(bean);

  }
}

function spawnIceberg() {
  if (frameCount % 550 === 0) {
    iceberg = createSprite(width, 600, 1, 1);
    iceberg.addImage(icebergImg);
    iceberg.scale = 1;
    iceberg.velocityX = -4;
    icebergGrp.add(iceberg);

  }
}

function spawnRock() {
  if (frameCount % 550) {
    rock = createSprite(width, 465, 1, 1);
    rock.addImage(rockImg);
    rock.scale = 0.6;
    rock.velocityX = -4;
    rockGrp.add(rock);

  }
}