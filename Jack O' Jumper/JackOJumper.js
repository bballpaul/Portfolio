var jumpSound;
var fail;
let runner;
let barrierImg;
let sky;
let moon;
let witch;

function preload(){
  runner = loadImage('jackolantern.png');
  barrierImg = loadImage('candycorn.png');
  sky = loadImage('spookysky.jpg');
  moon = loadImage('halloweenmoon.png');
  jumpSound = loadSound('jump.mp3');
  fail = loadSound('sadTrombone.mp3');
  witch = loadImage('witch.png');
}

function setup() {
  createCanvas(800, 400);
  var button = createButton("reset");
  button.mousePressed(resetSketch);
}

function resetSketch(){
  //jumping variables
playerY = 360;
jump = 0;
gravity = 0;
playerJump = 0;
playerHeight = 0;
//grass variables
GrassPosA = 100;
GrassPosB = 400;
GrassPosC = 700;
//rock variables
RockPosA = 250;
RockPosB = 550;
//barrier variables
BarPosA = 800;
BarPosB = 820;
//speed
speed = 3;
//score
score = 0;
score2 = 0;
start = 0;
//so trombone sound isn't broken
playing = 0;
//random thing
check = 0;
Rand = 0;
//image height
pHeight = 100;
crouch = 0;
barH = 325;
}

//jumping variables
var playerY = 360;
var jump = 0;
var gravity = 0;
var playerJump = 0;
var playerHeight = 0;
//grass variables
var GrassPosA = 100;
var GrassPosB = 400;
var GrassPosC = 700;
//rock variables
var RockPosA = 250;
var RockPosB = 550;
//barrier variables
var BarPosA = 800;
var BarPosB = 820;
//speed
var speed = 3;
//score
var score = 0;
var highscore = 0;
var score2 = 0;
var start = 0;
var playing = 0;
//random object
var check = 0;
var Rand = 0;
//image height
var pHeight = 100;
var crouch = 0;
var barH = 325;


function player(){
  fill(62, 62, 222);
  image(runner, 150, playerY - 75, 80, pHeight);
}

function grass(X){
    strokeWeight(3);
    stroke(57, 57, 57);
    this.X = X;
    line(X, 380, X + 7, 372);
    line(X, 380, X + 3, 365);
    line(X, 380, X - 2, 369);
    line(X, 380, X - 6 , 373);
}


function rock(HX, Height, Width){
    fill(133, 143, 132);
    noStroke();
    this.HX = HX;
    this.Height = Height;
    this.Width = Width;
    ellipse(HX, 382, this.Width, this.Height);
}


function barrier(y){
    this.y = y;
    image(barrierImg, BarPosA, y, 40, 60);
}



function draw() {
  // background(sky);
  background(0);
  noStroke();
  //moon
  image(moon, 25, 25, 150, 150);
  //ground
  fill(107, 107, 107);
  rect(-1, 380, 802, 30);
  
  
//speed slowly increasing
speed += 0.002

  
//the grass
var G1 = new grass(GrassPosA);
var G2 = new grass(GrassPosB);
var G3 = new grass(GrassPosC);
//the rocks
var R1 = new rock(RockPosA, 10, 13);
var R2 = new rock(RockPosB, 12, 16);
//the stuff minus speed so they move
GrassPosA = GrassPosA - speed;
GrassPosB = GrassPosB - speed;
GrassPosC = GrassPosC - speed;
  
RockPosA = RockPosA - speed;
RockPosB = RockPosB - speed;
  
BarPosA = BarPosA - speed;
BarPosB = BarPosB - speed;
  
//making the stuff come back around once off the screen
  if(GrassPosA <= -20){
  GrassPosA = 820;
}
  if(GrassPosB <= -20){
  GrassPosB = 820;
}
  if(GrassPosC <= -20){
  GrassPosC = 820;
}
  if(RockPosA <= -20){
  RockPosA = 820;
}
  if(RockPosB <= -20){
  RockPosB = 820;
}
  
  
//Barrier Physics
var B1 = new barrier(barH);
  
  
if(BarPosA <= -20){
    BarPosA = 820;
  check = 0;
  }
//second barrier
if(score >= 1050){
check ++;
   }
if(check === 1){
Rand = ceil(random(0,4))
}
  

  
if(Rand === 2){
      image(barrierImg, BarPosA + 35, 305, 45, 80);
}
  
if(Rand === 3){
      image(barrierImg, BarPosA + 35, 305, 45, 80);
      image(barrierImg, BarPosA + 75, 325, 40, 60);
}
if(Rand === 4){
      barH = 500;
      image(witch, BarPosA, 230, 100, 80);
}else{barH = 325;}
  
  
  
//the player
player();
  
/* jumping */
//math that makes the jumping work
playerY = playerY - jump;
jump = jump - gravity;  
  
//so player doesn't fall through the floor
  if(playerY >= 360){
    jump = 0;
    playerJump = 0;
    playerHeight = 0;
  }
  
//jump when space is pressed
  if(keyIsPressed && keyCode === 32 && playerY >= 360){
    gravity = 0.5;
    jump = 10;
    playerJump = 1;
    jumpSound.play();
}
/* jumping */
//crouching
  if(keyIsPressed && keyCode === 67 && playerY >= 360){
    pHeight = 50;
    playerY = 410;
    crouch = 1;
  }else if(keyIsPressed === false && crouch === 1){
     pHeight = 100;
     playerY = 360;
     crouch = 0;
      }

  
//score
    score = score + score2;
    score2 = 1;
    fill(107, 107, 107);
    textSize(12);
    text("SCORE:", 30, 10);
    text(score, 84, 10);
//highscore
  if(score >= highscore){
    highscore = score;
  }
  text("HIGHSCORE:", 180, 10);
  text(highscore, 264, 10);
  
//losing
  if(playerY <= 255){
    playerJump = -1;
  }
  if(BarPosA >= 140 && BarPosA <= 220 && playerHeight <= 4 && Rand <= 3){
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", 100, 100);
    fill(107, 107, 107);
    text("SCORE " + score, 100, 150);
    text("Press R to Reset", 100, 200);
    speed = 0;
    jump = 0;
    score2 = 0;
    playing ++;
}
//second candy corn lose
  if(BarPosA >= 105 && BarPosA <= 185 && playerHeight <= 7 && Rand >= 2 && Rand <= 3){
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", 100, 100);
    fill(107, 107, 107);
    text("SCORE " + score, 100, 150);
    text("Press R to Reset", 100, 200);
    speed = 0;
    jump = 0;
    score2 = 0;
    playing ++;
  }
//third candy corn lose
  if(BarPosA >= 65 && BarPosA <= 145 && playerHeight <= 4 && Rand === 3){
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", 100, 100);
    fill(107, 107, 107);
    text("SCORE " + score, 100, 150);
    text("Press R to Reset", 100, 200);
    speed = 0;
    jump = 0;
    score2 = 0;
    playing ++;
  }
//hanging candy corn lose
if(BarPosA >= 140 && BarPosA <= 180 && Rand === 4 && crouch === 0){
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", 100, 100);
    fill(107, 107, 107);
    text("SCORE " + score, 100, 150);
    text("Press R to Reset", 100, 200);
    speed = 0;
    jump = 0;
    score2 = 0;
    playing ++;
}
  
  if(playing === 1){
    fail.play();
  }
  
  if(keyIsPressed && keyCode === 82){
  resetSketch();
}
  playerHeight = playerHeight + playerJump;
  

  
//starting screen
  if(start === 0){
    textSize(50);
    fill(107, 107, 107);
    text("Welcome To:", 100, 150);
    fill(255, 153, 0);
    text("Jack O' Jumper!", 100, 200);
    textSize(25);
    fill(107, 107, 107);
    text("(press space to start)", 125, 250);
    resetSketch();
  }
  if(start === 0 && keyIsPressed && keyCode === 32){
    start = 1;
  }
  

//end of draw function
}


window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });


  function openNav() {
    document.getElementById("navBar").style.width = "250px";
}


function closeNav() {
    document.getElementById("navBar").style.width = "0px";
}