class Opponent {
  constructor(gameScreen, left, top, width, height, difficulty) {
    //gameScreen div reference
    this.gameScreen = gameScreen;

    //Paddle position control
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    // Difficulty for reference
    this.difficulty = difficulty;

    // Difficulty settings
    const speeds = {
      easy: { directionY: 5, directionX: 5 },
      medium: { directionY: 6, directionX: 6 },
      hard: { directionY: 7, directionX: 7 },
    };

    // Set the speed of movement based on difficulty
    this.directionY = speeds[difficulty].directionY;
    this.directionX = speeds[difficulty].directionX;

    //Paddle image
    this.element = document.createElement("div");
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.backgroundColor = "white";
    this.element.style.marginLeft = "5px";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    // Add paddle image to the gameScreen
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update paddle's position
    this.top += this.directionY;
    this.left += this.directionX;

    // Ensure paddle stays within the gameScreen:
    //Handle top of court
    if (this.top <= 5) this.top = 5;
    //Handle bottom of court
    if (this.top > this.gameScreen.offsetHeight - this.height - 5)
      this.top = this.gameScreen.offsetHeight - this.height - 5;
    //Handle left (centre) of court
    if (this.left <= 400) this.left = 400;
    //Handle right of court
    if (this.left >= 800 - this.width) this.left = 800 - this.width;

    // Update paddle position on screen
    this.updatePosition();
  }

  //Make compPLayer move by itself
  updateAI(ball) {
    // Get the center of the paddle
    const paddleCentreY = this.top + this.height / 2;
    const paddleCentreX = this.left + this.width / 2;

    // Get the center of the ball
    const ballCentreY = ball.top + ball.height / 2;
    const ballCentreX = ball.left + ball.width / 2;

    // Vertical movement based on the ball's position
    if (Math.abs(ballCentreY - paddleCentreY) > 10) {
      if (ballCentreY > paddleCentreY) {
        // Move down
        if (this.difficulty === "easy") {
          this.directionY = 2;
        } else if (this.difficulty === "medium") {
          this.directionY = 4;
        } else {
          this.directionY = 7;
        }
      } else {
        // Move up
        if (this.difficulty === "easy") {
          this.directionY = -2;
        } else if (this.difficulty === "medium") {
          this.directionY = -4;
        } else {
          this.directionY = -7;
        }
      }
      // Stop moving if close enough
    } else {
      this.directionY = 0;
    }

    // Horiztonal movement based on the ball's position
    if (Math.abs(ballCentreX - paddleCentreX) > 10) {
      if (ballCentreX > paddleCentreX) {
        // Move right
        if (this.difficulty === "easy") {
          this.directionX = 2;
        } else if (this.difficulty === "medium") {
          this.directionX = 4;
        } else {
          this.directionX = 7;
        }
      } else {
        // Move left
        if (this.difficulty === "easy") {
          this.directionX = -2;
        } else if (this.difficulty === "medium") {
          this.directionX = -4;
        } else {
          this.directionX = -7;
        }
      }
      // Stop moving if close enough
    } else {
      this.directionX = 0;
    }

    this.move();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  compCollide(ball) {
    //Checks if any part of the computer rectangle is contained inside the ball rectangle
    const compRect = this.element.getBoundingClientRect();
    const ballRect = ball.element.getBoundingClientRect();

    if (
      // Ball's left edge is left of paddle's right edge
      compRect.right > ballRect.left &&
      // Ball's right edge is right of paddle's left edge
      compRect.bottom > ballRect.top &&
      // Ball's top edge is above paddle's bottom edge
      compRect.left < ballRect.right &&
      // Ball's bottom edge is below paddle's top edge
      compRect.top < ballRect.bottom
    ) {
      // Determine collision side:
      //Ball’s rightside is touching paddle's left && ball is moving right
      if (ballRect.right >= compRect.left && ball.speedX > 0) {
        return "side";
      }
      //Ball’s bottom is touching paddle's top && ball is moving down
      if (ballRect.bottom >= compRect.top && ball.speedY > 0) {
        return "top";
      }
      //Ball’s top is touching paddle's bottom && ball is moving up
      if (ballRect.top <= compRect.bottom && ball.speedY < 0) {
        return "bottom";
      }
    }
    return false;
  }
}
