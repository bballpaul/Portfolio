const canvasWidth = 600;
const canvasHeight = 600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  createGrid();
}

const gameScale = 5;
const gameWidth = canvasWidth / gameScale;
const gameHeight = canvasHeight / gameScale;

let timer = 0;
var p1IsDead = false;
var p2IsDead = false;

var p1Won = false;
var p2Won = false;
var pDrawed = false;

var p1x = gameWidth / 5 - 2;
var p1y = gameHeight / 2;
//direction of player: 0 = up, 1 is right, 2 is down, 3 is left
var p1Dir = 1;
var p1Score = 0;

var p2x = gameWidth - gameWidth / 5;
var p2y = gameHeight / 2;
//direction of player: 0 = up, 1 is right, 2 is down, 3 is left
var p2Dir = 3;
var p2Score = 0;

var grid = []
//0 equals empty
//1 equals border
//2 equals player 1
//3 equals player 2

var scene = 0;
// 0 = main menu
// 1 = game scene
// 2 = player 1 won the whole game
// 3 = player 2 won the whole game

var paused = false;



//creates a grid from 0-38 by 2s in each axis
//if the square is a border, the value of that square is 1
//if the square is player 1, the value 2
//if the square is player 2, the value 3
//if the square is empty, the value is 0
//this function runs in setup so it will only run once to setup the grid
function createGrid(){
  for (let x = 0; x <= gameWidth - 2; x += 2){
    grid[x] = [];
    for (let y = 0; y <= gameHeight - 2; y += 2){
      if(x == 0 || x == gameWidth - 2 || y == 0 || y == gameHeight - 2){
        grid[x][y] = 1;
      }
      else if(x == p1x && y == p1y){
        grid[x][y] = 2;
      }
      else if(x == p2x && y == p2y){
        grid[x][y] = 3;
      }
      else{
        grid[x][y] = 0;
      }
    }
  }
}

function p1Movement(){
  //w - 87
  if(keyIsDown(87) && p1Dir != 2){
    p1Dir = 0;
  }
  //d - 68
  if(keyIsDown(68) && p1Dir != 3){
    p1Dir = 1;
  }
  //s - 83
  if(keyIsDown(83) && p1Dir != 0){
    p1Dir = 2; 
  }
  //a - 65
  if(keyIsDown(65) && p1Dir != 1){
    p1Dir = 3;
  }
  
  if(p1Dir == 0){
    p1y -= 2;
  }
  else if(p1Dir == 1){
    p1x += 2;
  }
  else if(p1Dir == 2){
    p1y += 2;
  }
  else if(p1Dir == 3){
    p1x -= 2;
  }
  
  //check for death
  if(grid[p1x][p1y] != 0){
    p1IsDead = true;
  }
  else{
    grid[p1x][p1y] = 2;
  }
  

}

function p2Movement(){
  //up - 38
  if(keyIsDown(38) && p2Dir != 2){
    p2Dir = 0;
  }
  //right - 39
  if(keyIsDown(39) && p2Dir != 3){
    p2Dir = 1;
  }
  //down - 40
  if(keyIsDown(40) && p2Dir != 0){
    p2Dir = 2;
  }
  //left - 37
  if(keyIsDown(37) && p2Dir != 1){
    p2Dir = 3;
  }
  
  if(p2Dir == 0){
    p2y -= 2;
  }
  else if(p2Dir == 1){
    p2x += 2;
  }
  else if(p2Dir == 2){
    p2y += 2;
  }
  else if(p2Dir == 3){
    p2x -= 2;
  }
  
  //check for death
  if(grid[p2x][p2y] != 0){
    p2IsDead = true;
  }
  else{
    grid[p2x][p2y] = 3;
  }
  
  
}

function p1Death(){
  p2Score += 1;
  if(p2Score < 5){
    p2Won = true;
    paused = true;
    //scene = 1;
  }
  else if(p2Score >= 5){
    scene = 3;
  }
}

function p2Death(){
  p1Score += 1;
  if(p1Score < 5){
    p1Won = true;
    
    paused = true;
    //scene = 1;
  }
  else if(p1Score >= 5){
    scene = 2;
  }
}

function pDraw(){
  pDrawed = true;
  paused = true;
  //scene = 1;
}


function draw() {
  //frameRate(4);

  //in game
  if(scene == 1 && paused == false){
    scale(5);
    background(220);
    noStroke()
  
    //score text
    textSize(gameScale);
    textFont("Verdana");
    fill(255, 0, 0);
    text(p1Score, 3, gameScale + 2);
    
    fill(0, 0, 255);
    text(p2Score, gameWidth - gameScale - 1, gameScale + 2);
    
    
    if(millis() >= 50 + timer){
      p1Movement();
      p2Movement();
      timer = millis();
      
      //checks for who won
      if(p1IsDead && !p2IsDead){
        console.log("player 1 died");
        p1Death();
      }
      else if(p2IsDead && !p1IsDead){
        console.log("player 2 died");
        p2Death();
      }
      else if(p1IsDead && p2IsDead){
        console.log("draw")
        pDraw();
      }
    }
 
    //draws the grid and all the types of ways the squares can be
    for (let x = 0; x <= gameWidth - 2; x += 2){
      for (let y = 0; y <= gameHeight - 2; y += 2){
        if(grid[x][y] == 1){
          fill(0, 0, 0);
          rect(x, y, 2, 2);
        }
        else if(grid[x][y] == 2){
          fill(256, 0, 0);
          rect(x, y, 2, 2);
        }
        else if(grid[x][y] == 3){
          fill(0, 0, 256);
          rect(x, y, 2, 2);
        }
      }
    }
 
  }
  if(scene == 1 && paused == true){
    //draw the stuff on the screen
    scale(5);
    background(220);
    noStroke();
    //put some text about how to start the round/game
    
    //score text
    textSize(gameScale);
    textFont("Verdana");
    fill(255, 0, 0);
    text(p1Score, 3, gameScale + 2);
    
    fill(0, 0, 255);
    text(p2Score, gameWidth - gameScale - 1, gameScale + 2);
    
    fill(0, 0, 0);
    text("Space to Start", 30, 32);
    //text depending on who won the last round
    if(p1Won == true){
      fill(255, 0, 0);
      text("Player 1 Won The Round", 30, 25);
    }
    if(p2Won == true){
      fill(0, 0, 255);
      text("Player 2 Won The Round", 30, 25);
    }
    if(pDrawed == true){
      fill(0, 255, 0);
      text("Round Was a Draw", 30, 25);
    }
    
    //draws the grid and all the types of ways the squares can be
    for (let x = 0; x <= gameWidth - 2; x += 2){
      for (let y = 0; y <= gameHeight - 2; y += 2){
        if(grid[x][y] == 1){
          fill(0, 0, 0);
          rect(x, y, 2, 2);
        }
        else if(grid[x][y] == 2){
          fill(256, 0, 0);
          rect(x, y, 2, 2);
        }
        else if(grid[x][y] == 3){
          fill(0, 0, 256);
          rect(x, y, 2, 2);
        }
      }
    }

    //press space to play & reset the booleans about who won last
    if(keyIsDown(32)){
      p1Won = false;
      p2Won = false;
      pDrawed = false;
      p1IsDead = false;
      p2IsDead = false;
      p1x = gameWidth / 5 - 2;
      p1y = gameHeight / 2;
      p1Dir = 1;
      p2x = gameWidth - gameWidth / 5;
      p2y = gameHeight / 2;
      p2Dir = 3;
      createGrid();
      paused = false;
      //scene = 1;
    }
  }
  //end of game scene

  //main menu
  if(scene == 0){
    background(20, 20, 20);
    noStroke();

    //title
    textSize(100);
    fill(0, 200, 0);
    text("Blockade", 100, 150);
    
    //instructions
    textSize(30);
    fill(200, 0, 0);
    text("Player 1: wasd", 40, 250);
    
    fill(0, 0, 200);
    text("Player 2: arrows", 290, 250);
    
    //start
    fill(200, 0, 200);
    text("Space to start - first to 5 wins", 100, 350);
    
    if(keyIsDown(32)){
      p1Score = 0;
      p2Score = 0;
      scene = 1;
      paused = true;
    }
  }
  //player 1 won game
  if(scene == 2){
    background(20, 20, 20);
    noStroke();
    
    fill(255, 0, 0);
    textSize(50);
    text("PLAYER 1 WINS WOOO!", 15, 250);
    
    fill(0, 255, 0);
    textSize(25);
    text("Space to Menu", 200, 300);
    
    if(keyIsDown(32)){
      scene = 0;
    }
  }
  if(scene == 3){
    background(20, 20, 20);
    noStroke();
    
    fill(0, 0, 255);
    textSize(50);
    text("PLAYER 2 WINS WOOO!", 15, 250);
    
    fill(0, 255, 0);
    textSize(25);
    text("Space to Menu", 200, 300);
    if(keyIsDown(32)){
      scene = 0;
    }
  }

}