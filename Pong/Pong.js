function setup() {
    createCanvas(800, 800);
  }
  
  function resetSketch(){
  //player position
  playerX = 325;
  //AI position
  AIX = 325;
  // ball position
  ballX = 400;
  ballY = 400;
  ballMoveX = 0;
  ballMoveY = 0;
  //start
  start = 1;
  }
  
  
  
  
  //player position
  var playerX = 325;
  //AI position
  var AIX = 325;
  // ball position
  var ballX = 400;
  var ballY = 400;
  var ballMoveX = 0;
  var ballMoveY = 0;
  //start
  var start = 0;
  //score variables
  var playerScore = 0;
  var AIScore = 0;
  //AI speed
  var AISpeed = 5;
  var TwoPlayer = 0;
  
  
  
  function player() {
    fill(255, 255, 255);
    rect(playerX, 750, 150, 25);
  }
  
  function AI(){
    fill(255, 255, 255);
    rect(AIX, 25, 150, 25);
  }
  
  function ball(){
    fill(255, 255, 255);
    ellipse(ballX, ballY, 20, 20);
  }
  
  
  
  function draw() {
    background(0);
    fill(0);
    strokeWeight(2);
    stroke(255, 255, 255);
    ellipse(400, 400, 150, 150);
    line(0, 400, 800, 400);
    player();
    AI();
    ball();
    
   //AI difficulty 
    
    
    //2 player mode
    if(keyIsPressed && keyCode === 50 && start === 0){
      TwoPlayer = 1;
    }
    
    
    //start
    if(start === 0){
      textSize(50);
      text('Welcome to Pong', 75, 120);
      text('Arrows to Move', 75, 170);
      text('Press any Key to Begin 1 player', 75, 220);
      text('Press 2 to start 2 player', 75, 270);
      text('Player 2 Uses Mouse', 75, 320);
    }
    if(keyIsPressed && start === 1){
      ballMoveY = 10;
      ballMoveX = random(-4, 4);
      start = 2;
    }
    if(keyIsPressed && start === 0){
      ballMoveY = 10;
      ballMoveX = random(-4, 4);
      start = 2;
    }
    
    //left and right for the player
    if(keyIsPressed && keyCode === 37 && playerX > 0){
      playerX -= 5;
    }
    if(keyIsPressed && keyCode === 39 && playerX < 650){
      playerX += 5;
    }
    
    
    //ball movement
    ballX = ballX + ballMoveX;
    ballY = ballY + ballMoveY;
    //ball bouncing off sides
    if(ballX <= 10){
      ballMoveX = ballMoveX * -1;
    }
    if(ballX >= 790){
      ballMoveX = ballMoveX * -1;
    }
    
  //ball bouncing off AI's paddle
    if(ballY === 50 && ballX > AIX - 10 && ballX < AIX + 160){
      ballMoveY = ballMoveY * -1;
    }
  //ball going left off AI's paddle
    if(ballY === 50 && ballX > AIX - 10 && ballX < AIX + 10){
      ballMoveX -= 3;
    }
    if(ballY === 50 && ballX > AIX + 10 && ballX < AIX + 30){
      ballMoveX -= 2;
    }
    if(ballY === 50 && ballX > AIX + 30 && ballX < AIX + 50){
      ballMoveX -= 1;
    }
  //ball going right off player's paddle
    if(ballY === 50 && ballX > AIX + 140 && ballX < AIX + 160){
      ballMoveX += 3;
    }
    if(ballY === 50 && ballX > AIX + 120 && ballX < AIX + 140){
      ballMoveX += 2;
    }
    if(ballY === 50 && ballX > AIX + 100 && ballX < AIX + 120){
      ballMoveX += 1;
    }
    
  //AI movement
    if(ballX < AIX + 75 && TwoPlayer === 0){
      AIX -= AISpeed;
    }
    if(ballX > AIX + 75 && TwoPlayer === 0){
      AIX += AISpeed;
    }
    
    //player 2 movement
    if(mouseX <= AIX + 25 && TwoPlayer === 1){
      AIX -= AISpeed;
    }
    if(mouseX >= AIX + 125 && TwoPlayer === 1){
      AIX += AISpeed;
    }
    
  //so AI doesn't go half out
    if(AIX < 0){
      AIX  = 0;
    }
    if(AIX + 150 > 800){
      AIX = 650;
    }
    
    
  //ball bouncing off player's paddle
    if(ballY === 740 && ballX > playerX - 10 && ballX < playerX + 160){
      ballMoveY = ballMoveY * -1;
    }
  //ball going left off player's paddle
    if(ballY === 740 && ballX > playerX - 10 && ballX < playerX + 10){
      ballMoveX -= 3;
    }
    if(ballY === 740 && ballX > playerX + 10 && ballX < playerX + 30){
      ballMoveX -= 2;
    }
    if(ballY === 740 && ballX > playerX + 30 && ballX < playerX + 50){
      ballMoveX -= 1;
    }
  //ball going right off player's paddle
    if(ballY === 740 && ballX > playerX + 140 && ballX < playerX + 160){
      ballMoveX += 3;
    }
    if(ballY === 740 && ballX > playerX + 120 && ballX < playerX + 140){
      ballMoveX += 2;
    }
    if(ballY === 740 && ballX > playerX + 100 && ballX < playerX + 120){
      ballMoveX += 1;
    }
    
        //reset when R is pressed
    if(keyIsPressed && keyCode === 82){
      resetSketch();
      //score variables
      playerScore = 0;
      AIScore = 0;
      start = 0;
      TwoPlayer = 0;
    
    }
    
    
    //player score
    textSize(20);
    text('PLAYER SCORE', 10, 420);
    text(playerScore, 200, 420);
    if(ballY <= -10){
      playerScore += 1;
      resetSketch();
    }
    //player win
    if(playerScore === 11){
      textSize(50);
      text('You Win!', 300, 200);
      text('R to restart', 300, 260);
      ballX = 400
      ballY = 400
      VSAI = 0;
      VSPLAYER = 0;
    }
    
    //AI score
    if(TwoPlayer === 0){
    textSize(20);
    text('AI SCORE', 550, 420);
    text(AIScore, 680, 420);}
    if(ballY >= 810){
      AIScore += 1;
      resetSketch();
    }
    //AI win
    if(AIScore === 11 && TwoPlayer === 0){
      textSize(50);
      text('You Lose', 300, 200);
      text('R to restart', 300, 260);
      ballX = 400
      ballY = 400
      VSAI = 0;
      VSPLAYER = 0;
    }
    
      //2 player score
    if(TwoPlayer === 1){
    textSize(20);
    text('Player 2 SCORE', 500, 420);
    text(AIScore, 680, 420);}
    if(ballY >= 810){
      AIScore += 1;
      resetSketch();
    }
    //2 player win
    if(AIScore === 11 && TwoPlayer === 1){
      textSize(50);
      text('Player 2 Wins', 300, 200);
      text('R to restart', 300, 260);
      ballX = 400
      ballY = 400
      VSAI = 0;
      VSPLAYER = 0;
    }
    
  }









  function openNav() {
    document.getElementById("navBar").style.width = "250px";
}


function closeNav() {
    document.getElementById("navBar").style.width = "0px";
}