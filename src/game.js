class Game {
  constructor(difficulty) {
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
    this.compPlayer = new Opponent(
      this.gameScreen,
      780,
      250,
      10,
      75,
      difficulty
    );
    // create empty array of balls to be added to later
    this.ball = null;

    //Game difficulty (default)
    this.difficulty = difficulty;

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
    this.ballRespawning = false;

    //game audio controls
    this.playerHit = new Audio();
    this.playerHit.src = "assets/Player.mp3";
    this.playerHit.volume = 0.5;
    this.compHit = new Audio();
    this.compHit.src = "assets/Comp.mp3"
    this.compHit.volume = 0.5;
    this.cheer = new Audio();
    this.cheer.src = "assets/QuietPlease.mp3";
    this.cheer.volume = 0.5
    this.applause = new Audio();
    this.applause.src = "assets/applause.mp3";
    this.applause.volume = 0.3;
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

    //Difficulty setting for the ball and opponent
    this.ball = new Ball(this.gameScreen, this.difficulty);
    // this.Opponent = new Opponent (this.gameScreen, 800, 200, 20, 100, this.difficulty);

    //Starting game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    // if the game is over, stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    } else {
      this.update();
    }
  }

  setDifficulty(level) {
    this.difficulty = level;
  }

  resetPaddles() {
    this.player.left = 0;
    this.player.top = 250;
    this.player.updatePosition();

    this.compPlayer.left = 780;
    this.compPlayer.top = 250;
    this.compPlayer.updatePosition();
  }

  update() {
    //move the player
    this.player.move();

    // Make the ball move if it isn't respawning
    if (!this.ballRespawning) {
      this.ball.move();
    }

    // Make compPlayer chase the ball if it isn't respawning
    if (!this.ballRespawning) {
      this.compPlayer.updateAI(this.ball);
    }

    // Handle player collision
    const playerCollision = this.player.playerCollide(this.ball);
    if (playerCollision) {
      if (playerCollision === "side") {
        this.ball.speedX *= -1;
        this.playerHit.play();
      } else {
        this.ball.speedY *= -1;
        this.playerHit.play();
      }
    }

    // Handle computer collision
    const compCollision = this.compPlayer.compCollide(this.ball);
    if (compCollision) {
      if (compCollision === "side") {
        this.ball.speedX *= -1;
        this.compHit.play();
      } else {
        this.ball.speedY *= -1;
        this.compHit.play();
      }
    }

    //Scoring:
    //If the ball goes past the left baseline of the court
    if (this.ball.left <= -20 && !this.ballRespawning) {
      //Increase compScore
      this.compScore++;
      //Change the compScore value on the DOM
      this.compScoreHTML.innerText = this.compScore;
      //Stop ball moving
      this.ballRespawning = true;
      //Start countdown
      this.countdown();
      //Reset paddle positions
      this.resetPaddles();

      this.cheer.play();

      //Make ball serve towards point winner after 3 seconds
      setTimeout(() => {
        this.ball.resetBall("right");
        this.ballRespawning = false;
      }, 3000);
    }

    //If the ball goes past the right baseline of the court
    if (this.ball.left >= this.width && !this.ballRespawning) {
      //Increase compScore
      this.playerScore++;
      //Change the compScore value on the DOM
      this.playerScoreHTML.innerText = `${this.playerName}: ${this.playerScore}`;
      //Stop ball moving
      this.ballRespawning = true;
      //Start countdown
      this.countdown();
      //Reset paddle positions
      this.resetPaddles();

      this.cheer.play();

      //Make ball serve towards point winner after 3 seconds
      setTimeout(() => {
        this.ball.resetBall("left");
        this.ballRespawning = false;
      }, 3000);
    }

    // If score = 11 for someone, end the game
    if (this.playerScore === 11 || this.compScore === 11) {
      this.cheer.pause();
      this.applause.play();
      this.endGame();
    }
  }

  countdown() {
    //set counter
    let count = 3;
    //timer image
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.fontSize = "120px";
    this.element.style.color = "white";
    this.element.style.padding = "20px";
    this.element.style.top = "50%";
    this.element.style.left = "50%";
    this.element.style.transform = "translate(-50%, -50%)";

    //add to gameScreen
    this.gameScreen.appendChild(this.element);
    //make timer image print counter
    this.element.textContent = count;

    //create countdown
    const countdownInterval = setInterval(() => {
      //every second decrease - stop with "1"
      count--;
      if (count > 0) {
        this.element.textContent = count;
      } else {
        clearInterval(countdownInterval);
        this.element.remove();
      }
    }, 1000);
  }

  endGame() {
    // Remove players and ball elements from DOM
    this.player.element.remove();
    this.compPlayer.element.remove();
    this.ball.element.remove();

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
