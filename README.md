# PING-PONG

## [Play the Game!](https://usernameluke.github.io/2d-tennis/)

# Description

Ping-Pong is a game where the player must try to get the ball past the opponent's baseline, while trying to stop it from crossing their own baseline. The winner is the first one to get 11 points.

# MVPs

- The player's paddle can move horiztonally along their baseline by pressing the up and down arrow keys.
- The computer's paddle can move up and down its baseline by analysing whether it's close enough to hit the ball or too far away.
- The ball spawns in the middle of the court and moves towards the previous point winner in a random diagonal direction (45-degree angle from an x/y axis perspective) across the court, bouncing off surfaces at 90-degree angles.
- The ball must bounce off the sidelines, as well as the paddles.
- The score is tallied up in real time and visible throughout the match.
- The winner and match score are shown once the game is over.

# Backlog Functionalities

- Add a name input for the player on the intro screen, which will be shown next to their score during and after the match.
- Ensure the player's paddle can move anywhere within the player's half of the court by pressing the arrow keys, allowing for horizontal, vertical, and diagonal movement.
- Ensure the computer's paddle can move anywhere within its half of the court by analysing whether it's close enough to hit the ball or too far away, allowing for horizontal, vertical, and diagonal movement.
- Add 3 different difficulties, where the ball and opponent's paddle move at predefined speeds.
- Add a 3 second delay between each play after a point is scored.
- Reset the paddles to their starting positions after each point.
- Add audio clips for both the match and afterwards.

# Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Classes
- JS Audio()

# States

- Start Screen
- Game Screen
- Game Over Screen

# Data Structure

## game.js

- Game (difficulty)
    this.startScreen;
    this.gameContainer;
    this.scoreboard;
    this.gameScreen;
    this.gameEndScreen;

    this.player;
    this.compPlayer;

    this.ball;

    this.difficulty;

    this.height;
    this.width;

    this.playerName;

    this.playerScore;
    this.playerScoreHTML;
    this.compScore;
    this.compScoreHTML;

    this.playerScoreboard;

    this.gameIsOver;
    this.gameIntervalId;
    this.gameLoopFrequency;;
    this.ballRespawning;;

    this.playerHit;
    this.compHit;
    this.cheer;
    this.applause;


- start()
- gameLoop()
- setDifficulty(level)
- resetPaddles()
- update()
- countdown()
- endGame()
- winner()

## ball.js 
- Ball (gameScreen, difficulty)
    - this.gameScreen;

    - this.difficulty;

    - this.top;
    - this.left;

    - this.width;
    - this.height;

    - this.speedX;
    - this.speedY;

    - this.element;

- move()
- resetBall(direction)
- updatePosition()

## player.js 
- Player (gameScreen, left, top, width, height)
    - this.gameScreen;

    - this.left;
    - this.top;
    - this.width;
    - this.height;

    - this.directionY;
    - this.directionX;

    - this.element;

- move()
- updatePosition()
- playerCollide(ball)

## opponent.js 
- Opponent (gameScreen, left, top, width, height)
    - this.gameScreen;

    - this.left;
    - this.top;
    - this.width;
    - this.height;

    - this.directionY;
    - this.directionX;

    - this.element;

- move()
- updateAI(ball)
- updatePosition()
- compCollide(ball)

# Links

## Deploy
[Link](https://github.com/usernameluke/2d-tennis)