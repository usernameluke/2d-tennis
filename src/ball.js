class Ball {
  constructor(gameScreen) {
    //gameScreen div reference
    this.gameScreen = gameScreen;

    //Ball starting point:
    //Randomise where on the 'y' axis it spawns
    this.top = Math.floor(Math.random() * 400 + 10);
    //Make sure it spawns centre court
    this.left = 400;


    //Ball size
    this.width = 20;
    this.height = 20;

    //Ball speed
    this.speedX = 8;
    this.speedY = 8;

    //Ball image
    this.element = document.createElement("div");
    this.element.style.backgroundColor = "white";
    this.element.style.borderRadius = "50%";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    //Adding ball image to the gameScreen
    this.gameScreen.appendChild(this.element);
  }

  move() {
    //Make ball go diagonally at predefined speed
    this.left += this.speedX;
    this.top += this.speedY;
  
    // Bounce off top and bottom walls
    if (this.top <= 0 || this.top + this.height >= this.gameScreen.offsetHeight) {
      this.speedY *= -1;
    }
  
    //Update the ball's position on the screen
    this.updatePosition();
  }  

  //Alternate serve direction
  resetBall(direction) {

    // Place ball in the center of the court
    this.left = this.gameScreen.offsetWidth / 2;
    this.top = this.gameScreen.offsetHeight / 2;
  
    // Set horizontal speed based on direction:
    // If 'resetBall(left)' **CHECK game.js --> update() --> Scoring**
    if (direction === "left") {
      //Go at this speed towards the left
      this.speedX = -8;
    // If 'resetBall(right)' **CHECK game.js --> update() --> Scoring**
    } else {
      //Go at this speed towards the right
      this.speedX = 8;
    }
  
    // Say whether the ball should go up or down based on randomisation:
    // If randomiser is above 0.5
    if (Math.random() > 0.5) {
      // Go up by said speed
      this.speedY = 8;
    } else {
      // Otherwise, go down by said speed
      this.speedY = -8;
    }
  
    //Update ball position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
  }  
}