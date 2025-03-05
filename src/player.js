class Player {
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
    //Update paddle position based on directionY/directionX
    this.top += this.directionY;
    this.left += this.directionX;

    //Ensure paddle stays within the gameScreen:
    //Handle top of court
    if (this.top <= 5) {
      this.top = 0 + 5;
    }

    //Handle bottom of court
    if (this.top > this.gameScreen.offsetHeight - 90) {
      this.top = this.gameScreen.offsetHeight - 90;
    }

    //Handle left of court
    if (this.left <= 5) {
      this.left = 0 + 5;
    }

    //Handle right (centre) of court
    if (this.left >= 380) {
      this.left = 380;
    }

    //Update paddle position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  playerCollide(ball) {
    //Checks if any part of the player Rectangle is contained inside the ball rectangle
    const playerRect = this.element.getBoundingClientRect();
    const ballRect = ball.element.getBoundingClientRect();

    if (
      playerRect.right > ballRect.left && // Ball's left edge is left of paddle's right edge
      playerRect.left < ballRect.right && // Ball's right edge is right of paddle's left edge
      playerRect.bottom > ballRect.top && // Ball's top edge is above paddle's bottom edge
      playerRect.top < ballRect.bottom // Ball's bottom edge is below paddle's top edge
    ) {
      // Determine collision area
      if (ballRect.left <= playerRect.right && ball.speedX < 0) {
        //Ball’s leftside is touching paddle's right && ball is moving left
        return "side";
      }

      if (ballRect.bottom >= playerRect.top && ball.speedY > 0) {
        //Ball’s bottom is touching paddle's top && ball is moving down
        return "top";
      }

      if (ballRect.top <= playerRect.bottom && ball.speedY < 0) {
        //Ball’s top is touching paddle's bottom && ball is moving up
        return "bottom";
      }
    }

    return false;
  }
}
