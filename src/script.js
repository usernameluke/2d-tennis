window.onload = function () {
  //Access difficulty buttons/name input
  const easyStartButton = document.getElementById("easy");
  const mediumStartButton = document.getElementById("medium");
  const hardStartButton = document.getElementById("hard");
  const restartButton = document.getElementById("restart-button");
  const playerName = document.getElementById("name");


  //Create eventlistener for #name (input) which enables the startButton
  playerName.addEventListener("input", () => {
    easyStartButton.disabled = playerName.value.trim() === "";
    mediumStartButton.disabled = playerName.value.trim() === "";
    hardStartButton.disabled = playerName.value.trim() === "";
  });

  // Create game variable outside of startGame() function so it's externally available
  let game;

  //Create game difficulty variable
  let selectedDifficulty;

  //EventListeners to start game for whichever difficulty button clicked
  easyStartButton.addEventListener("click", function () {
    selectedDifficulty = "easy";
    startGame();
  });

  mediumStartButton.addEventListener("click", function () {
    selectedDifficulty = "medium";
    startGame();
  });

  hardStartButton.addEventListener("click", function () {
    selectedDifficulty = "hard";
    startGame();
  });
  // Make the above game variable become a new Game class and then make it use the start() method from game.js
  function startGame() {
    //Make changeable variable become new Game class
    game = new Game(selectedDifficulty);
    // Hides startScreen, shows gameScreen, and starts game loop (check game.js ---> start() method)
    game.start();
  }

  //Create eventlistener for restartButton that starts the game again (goes from #game-end to #intro)
  restartButton.addEventListener("click", function restartGame() {
    location.reload();
  });

  //Make player's paddle move when up or down arrow key pressed
  window.addEventListener("keydown", (event) => {
    // const possibleKeys = ["ArrowUp", "ArrowDown"];
    const possibleKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeys.includes(event.key)) {
      event.preventDefault();
      // Update player's directionY (position / speed) based on the key pressed
      switch (event.key) {
        case "ArrowUp":
          game.player.directionY = -5;
          break;
        case "ArrowDown":
          game.player.directionY = 5;
          break;
        // Update player's directionX (position / speed) based on the key pressed
        case "ArrowLeft":
          game.player.directionX = -5;
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          break;
      }
    }
  });

  //Make player's paddle stop moving when up or down arrow key released
  window.addEventListener("keyup", (event) => {
    // const possibleKeys = ["ArrowUp", "ArrowDown"];
    const possibleKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeys.includes(event.key)) {
      event.preventDefault();
      //Make directionY's position/speed stop
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
          game.player.directionY = 0;
          break;
        //Make directionX's position/speed stop
        case "ArrowLeft":
        case "ArrowRight":
          game.player.directionX = 0;
          break;
      }
    }
  });

  window.addEventListener("mousedown", (event) => {
    
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    const possibleButtons = [upButton, downButton, leftButton, rightButton];

    if (possibleButtons.includes(event.target)) {
      event.preventDefault();

      switch (event.target) {
        case upButton:
          game.player.directionY = -5;
          break;
        case downButton:
          game.player.directionY = 5;
          break;
        // Update player's directionX (position / speed) based on the key pressed
        case leftButton:
          game.player.directionX = -5;
          break;
        case rightButton:
          game.player.directionX = 5;
          break;
      }
    }
  });

  window.addEventListener("mouseup", (event) => {
    
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    const possibleButtons = [upButton, downButton, leftButton, rightButton];

    if (possibleButtons.includes(event.target)) {
      event.preventDefault();

      switch (event.target) {
        case upButton:
        case downButton:
          game.player.directionY = 0;
          break;
          
        case leftButton:
        case rightButton:
          game.player.directionX = 0;
          break;
      }
    }
  });

  window.addEventListener("touchstart", (event) => {
    
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    const possibleButtons = [upButton, downButton, leftButton, rightButton];

    if (possibleButtons.includes(event.target)) {
      event.preventDefault();

      switch (event.target) {
        case upButton:
          game.player.directionY = -5;
          break;
        case downButton:
          game.player.directionY = 5;
          break;
        // Update player's directionX (position / speed) based on the key pressed
        case leftButton:
          game.player.directionX = -5;
          break;
        case rightButton:
          game.player.directionX = 5;
          break;
      }
    }
  });

  window.addEventListener("touchend", (event) => {
    
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    const possibleButtons = [upButton, downButton, leftButton, rightButton];

    if (possibleButtons.includes(event.target)) {
      event.preventDefault();

      switch (event.target) {
        case upButton:
        case downButton:
          game.player.directionY = 0;
          break;
          
        case leftButton:
        case rightButton:
          game.player.directionX = 0;
          break;
      }
    }
  });
};
