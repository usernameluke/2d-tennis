class Game {
  constructor() {
    //Screen controls
    this.startScreen = document.getElementById("intro");
    this.gameContainer = document.getElementById("game-container");
    this.scoreboard = document.getElementById("scoreboard");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    //game assets:
    // player paddle starting position
    this.player = new Player(this.gameScreen, 0, 250, 10, 75);
    // compPlayer paddle starting position
    this.compPlayer = new Opponent(this.gameScreen, 780, 250, 10, 75);
    // create empty array of balls to be added to later
    this.ball = [];

    //game screen width and height
    this.height = 500;
    this.width = 800;

    //Player's name
    this.playerName = document.getElementById("name").value;

    //game score
    this.playerScore = 0;
    this.playerScoreHTML = document.getElementById("player-score");
    this.compScore = 0;
    this.compScoreHTML = document.getElementById("computer-score");

    //player's name + player's score
    this.playerScoreboard = `${this.playerName}: ${this.playerScore}`;

    //game control settings
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = 1000 / 60;
  }

  start() {
    //hiding startScreen and showing gameScreen
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameContainer.style.flexDirection = "column";
    this.gameContainer.style.alignItems = "center";
    this.gameScreen.style.display = "flex";
    this.scoreboard.style.display = "flex";
    this.scoreboard.style.gap = "50px";
    this.playerScoreHTML.innerText = `${this.playerName}: ` + this.playerScore;

    //Starting game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // running the update function on every frame
    this.update();

    // if the game is over, stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    //move the player
    this.player.move();

    //Based on a random threshold and when there are no balls in play, create a new ball
    if (Math.random() > 0.85 && this.ball.length === 0) {
      this.ball.push(new Ball(this.gameScreen));
    }

    // Loop through the ball array to check for collisions
    for (let i = 0; i < this.ball.length; i++) {
      const ball = this.ball[i];

      // Make the ball move
      ball.move();

      // Make compPlayer chase the ball
      this.compPlayer.updateAI(ball);

      // Handle player collision
      const playerCollision = this.player.playerCollide(ball);
      if (playerCollision) {
        if (playerCollision === "side") {
          ball.speedX *= -1;
        } else {
          ball.speedY *= -1;
        }
      }

      // Handle computer collision
      const compCollision = this.compPlayer.compCollide(ball);
      if (compCollision) {
        if (compCollision === "side") {
          ball.speedX *= -1;
        } else {
          ball.speedY *= -1;
        }
      }

      //Scoring:
      //If the ball goes past the left baseline of the court
      if (ball.left <= 0) {
        //Increase compScore
        this.compScore++;
        //Change the compScore value on the DOM
        this.compScoreHTML.innerText = this.compScore;
        //Make ball serve towards point winner
        ball.resetBall("right");
      }

      //If the ball goes past the right baseline of the court
      if (ball.left >= this.width) {
        //Increase playerScore
        this.playerScore++;
        //Change the playerScore value on the DOM
        this.playerScoreHTML.innerText =
          `${this.playerName}:` + this.playerScore;
        //Make ball serve towards point winner
        ball.resetBall("left");
      }
    }

    // If score = 11 for someone, end the game
    if (this.playerScore === 11 || this.compScore === 11) {
      this.endGame();
    }
  }

  endGame() {
    // Remove players and ball elements from DOM
    this.player.element.remove();
    this.compPlayer.element.remove();
    this.ball.forEach((ball) => ball.element.remove());

    // Set flag to true, so the loop stops
    this.gameIsOver = true;

    // Hide gameScreen
    this.gameScreen.style.display = "none";

    // Show gameEndScreen
    this.gameEndScreen.style.display = "block";

    // Show who won
    this.winner();
  }

  winner() {
    let winner;
    if (this.playerScore === 11) {
      winner = `${this.playerName}`;
    } else {
      winner = "The Comp";
    }

    document.getElementById("winner").innerText = `${winner} wins! 🎾🎉🎾`;
  }
}
