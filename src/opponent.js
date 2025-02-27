class Opponent {
  constructor(gameScreen, left, top, width, height) {
    //gameScreen div reference
    this.gameScreen = gameScreen;

    //Paddle position control
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    //Paddle movement control
    this.directionY = 0;
    this.directionX = 0;

    //Paddle image
    this.element = document.createElement("div");
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.backgroundColor = "white";
    this.element.style.marginLeft = "5px";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    //Adding paddle image to the gameScreen
    this.gameScreen.appendChild(this.element);
  }

  move() {
    //Update paddle position based on directionY
    this.top += this.directionY;
    this.left += this.directionX;

    //Ensure paddle stays wiithin the gameScreen:
    //Handle top of court
    if (this.top <= 5) {
      this.top = 0 + 5;
    }

    //Handle bottom of court
    if (this.top > this.gameScreen.offsetHeight - 90) {
      this.top = this.gameScreen.offsetHeight - 90;
    }

    //Handle left (centre) of court
    if (this.left <= 400) {
      this.left = 0 + 400;
    }

    //Handle right of court
    if (this.left >= 800) {
      this.left = 800;
    }

    //Update paddle position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  //Make compPLayer move by itself
  updateAI(ball) {
    //Identify the middle of compPlayer's paddle along the 'y' axis
    const paddleCentreY = this.top + this.height / 2;
    //Identify the middle of compPlayer's paddle along the 'x' axis
    const paddleCentreX = this.left + this.width / 2;
    //Identify the middle of the ball along the 'y' axis
    const ballCentreY = ball.top + ball.height / 2;
    //Identify the middle of the ball along the 'x' axis
    const ballCentreX = ball.left + ball.width / 2;

    //Check how far the ball is from the paddle:
    //If the distance is bigger than 10px as an absolute number (so the distance, be it positive or negative from 0), the robot moves towards it - Subtraction of the ball's centre position on the 'y' axis and the paddle's center position on the 'y' axis gives us the difference
    if (Math.abs(ballCentreY - paddleCentreY) > 10) {
      if (ballCentreY > paddleCentreY) {  //If the ball is below the paddle, it moves down at given speed
        this.directionY = 7;
      } else {                            //If the ball is above the paddle, it moves up at given speed
        this.directionY = -7;
      }
    } else {                              //If the ball is very close (within 10px), the robot stops moving as it's lined up for the shot
      this.directionY = 0; // Stop moving if close enough
    }

    //If the distance is bigger than 10px as an absolute number (so the distance, be it positive or negative from 0), the robot moves towards it - Subtraction of the ball's centre position on the 'x' axis and the paddle's center position on the 'x' axis gives us the difference
    if (Math.abs(ballCentreX - paddleCentreX) > 10) {
      //If the ball is left of the paddle, it moves right at given speed
      if (ballCentreX > paddleCentreX) {
        this.directionX = 7;
        //If the ball is right of the paddle, it moves left at given speed
      } else {
        this.directionX = -3;
      }
      //If the ball is very close (within 10px), the robot stops moving as it's lined up for the shot
    } else {
      this.directionX = 0; // Stop moving if close enough
    }

    //The ball moves accordingly
    this.move();
  }

  compCollide(ball) {
    //Checks if any part of the computer rectangle is contained inside the ball rectangle
    const compRect = this.element.getBoundingClientRect();
    const ballRect = ball.element.getBoundingClientRect();

    if (
      compRect.right > ballRect.left &&   // Ball's left edge is left of paddle's right edge
      compRect.bottom > ballRect.top &&   // Ball's right edge is right of paddle's left edge
      compRect.left < ballRect.right &&   // Ball's top edge is above paddle's bottom edge
      compRect.top < ballRect.bottom      // Ball's bottom edge is below paddle's top edge
    ) {
      // Determine collision side
      if (ballRect.right >= compRect.left && ball.speedX > 0) { //Ball’s rightside is touching paddle's left && ball is moving right
        return "side";
      }

      if (ballRect.bottom >= compRect.top && ball.speedY > 0) { //Ball’s bottom is touching paddle's top && ball is moving down
        return "top";
      }

      if (ballRect.top <= compRect.bottom && ball.speedY < 0) { //Ball’s top is touching paddle's bottom && ball is moving up
        return "bottom";
      }
    }
    return false;
  }
}
