let currentIndex = -1,
  buttonClick = 0,
  startTime = 0,
  endTime = 0,
  ballNumber = 5,
  difficulty = 50,
  settingsOpen = true,
  gameType,
  highScore5_35 = 100,
  highScore5_50 = 100,
  highScore5_75 = 100,
  highScore10_35 = 100,
  highScore10_50 = 100,
  highScore10_75 = 100,
  highScore15_35 = 100,
  highScore15_50 = 100,
  highScore15_75 = 100,
  numOfSpikes,
  buttonID,
  spikeTemp,
  spikeName,
  spin,
  gameSpinArray = [],
  spikeX,
  spikeY,
  spikeArrayTemp = [],
  spike = [],
  gameGoal,
  gamePlayer;
const aimBallButtons = ["aimOne", "aimTwo", "aimThree"],
  aimDifficultyButtons = ["aimEasy", "aimMedium", "aimHard"],
  colorNames = ["Blue", "Red", "Yellow", "Green", "Pink", "Purple"],
  gameButtons = ["button5", "button10", "button15"],
  colorHexes = [
    "#0000FF",
    "#FF0000",
    "#FFFF00",
    "#008000",
    "#FFC0CB",
    "#800080",
  ];

function colorChange() {
  // colorChange Proj : all of the ColorChange Proj in 1 function
  let randIndex = Math.floor(Math.random() * colorNames.length);
  if (currentIndex != randIndex) {
    let colorName = colorNames[randIndex];
    let colorHex = colorHexes[randIndex];
    document.getElementById("colorFlipper").style.backgroundColor =
      colorHexes[randIndex];
    document.getElementById("colorTextColor").style.color = colorHex;
    document.getElementById("colorTextColor").innerHTML = colorName;
    document.getElementById("colorHexText").innerHTML = "Hex: " + colorHex;
    currentIndex = randIndex;
  } else {
    let randIndex = Math.floor(Math.random() * colorNames.length);
    if (currentIndex == randIndex) {
      randIndex = Math.floor(Math.random() * colorNames.length);
    }
    let colorName = colorNames[randIndex];
    let colorHex = colorHexes[randIndex];
    document.getElementById("colorFlipper").style.backgroundColor =
      colorHexes[randIndex];
    document.getElementById("colorTextColor").style.color = colorHex;
    document.getElementById("colorTextColor").innerHTML = colorName;
    document.getElementById("colorHexText").innerHTML = "Hex: " + colorHex;
    currentIndex = randIndex;
  }
}

function settingsChange(clicked_id) {
  // aimGame Proj : all of the setting changing (i.e. changing color of button selection, changing target size, and changing amount of balls you have to click)
  let currentDifficultyId = "aimMedium";
  let currentBallCountId = "aimOne";
  if (
    aimBallButtons.includes(clicked_id) == true &&
    aimDifficultyButtons.includes(clicked_id) == false &&
    document.getElementById(clicked_id).style.color != "red"
  ) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.color = "white";
    }
    document.getElementById(clicked_id).style.color = "red";
    currentBallCountId = clicked_id;
    if (currentBallCountId == "aimTwo") {
      ballNumber = 10;
    } else if (currentBallCountId == "aimThree") {
      ballNumber = 15;
    } else {
      ballNumber = 5;
    }
    aimGameType(ballNumber, difficulty);
    aimHighScoreTime();
  } else if (
    aimBallButtons.includes(clicked_id) == false &&
    aimDifficultyButtons.includes(clicked_id) == true &&
    document.getElementById(clicked_id).style.color != "red"
  ) {
    for (i = 0; i < aimDifficultyButtons.length; i++) {
      document.getElementById(aimDifficultyButtons[i]).style.color = "white";
    }
    document.getElementById(clicked_id).style.color = "red";
    currentDifficultyId = clicked_id;
    if (currentDifficultyId == "aimEasy") {
      difficulty = 75;
    } else if (currentDifficultyId == "aimHard") {
      difficulty = 35;
    } else {
      difficulty = 50;
    }
    aimGameType(ballNumber, difficulty);
    aimHighScoreTime();
  }
}

function aimSettingsOpenClosed() {
  // aimGame Proj : when you press the settings button, opens all setting or closes all settings
  if (settingsOpen != true) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.visibility = "visible";
      document.getElementById(aimDifficultyButtons[i]).style.visibility =
        "visible";
    }
    settingsOpen = true;
  } else if (settingsOpen != false) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.visibility = "hidden";
      document.getElementById(aimDifficultyButtons[i]).style.visibility =
        "hidden";
    }
    settingsOpen = false;
  }
}

function aimStart() {
  // aimGame Proj : when you press the start button runs all of the functions that make the game work and keeps other buttons hidden while game is going, also formats the timer time using other functions
  if (startTime == 0) {
    aimStartTimer();
  }
  aimButtonOrBall();
  for (i = 0; i < aimBallButtons.length; i++) {
    document.getElementById(aimDifficultyButtons[i]).style.visibility =
      "hidden";
    document.getElementById(aimBallButtons[i]).style.visibility = "hidden";
  }
  document.getElementById("aimSettings").style.visibility = "hidden";
  settingsOpen = false;
  document.getElementById("aimTimer").style.visibility = "hidden";
  document.getElementById("aimHighScore").style.visibility = "hidden";
  aimRandomPoint();
  buttonClick++;
  if (buttonClick >= ballNumber + 1) {
    aimButtonOrBall();
    buttonClick = 0;
    if (endTime == 0) {
      aimEndTimer();
    }
    let finalTime = (endTime - startTime) / 1000;
    aimGameType(ballNumber, difficulty);
    aimHighScoreTimeCalc(finalTime);
    document.getElementById("aimTimerTime").innerHTML =
      finalTime.toFixed(3) + " seconds";
    aimHighScoreTime();
    startTime = 0;
    endTime = 0;
  }
}

function aimGameType(ballNumber, difficulty) {
  // aimGame Proj : turns the settings buttons chosen into a string for other functions to use
  if (ballNumber == 5) {
    if (difficulty == 35) {
      gameType = "5 35";
    } else if (difficulty == 50) {
      gameType = "5 50";
    } else if (difficulty == 75) {
      gameType = "5 75";
    }
  } else if (ballNumber == 10) {
    if (difficulty == 35) {
      gameType = "10 35";
    } else if (difficulty == 50) {
      gameType = "10 50";
    } else if (difficulty == 75) {
      gameType = "10 75";
    }
  } else if (ballNumber == 15) {
    if (difficulty == 35) {
      gameType = "15 35";
    } else if (difficulty == 50) {
      gameType = "15 50";
    } else if (difficulty == 75) {
      gameType = "15 75";
    }
  }
}

function aimHighScoreTimeCalc(finalTime) {
  // aimGame Proj : formats high score times (could possible combine with aimHighScoreTime() but ill come back to it)
  if (gameType === "5 75" && highScore5_75 > finalTime) {
    highScore5_75 = finalTime.toFixed(3);
  } else if (gameType === "5 50" && highScore5_50 > finalTime) {
    highScore5_50 = finalTime.toFixed(3);
  } else if (gameType === "5 35" && highScore5_35 > finalTime) {
    highScore5_35 = finalTime.toFixed(3);
  } else if (gameType === "10 75" && highScore10_75 > finalTime) {
    highScore10_75 = finalTime.toFixed(3);
  } else if (gameType === "10 50" && highScore10_50 > finalTime) {
    highScore10_50 = finalTime.toFixed(3);
  } else if (gameType === "10 35" && highScore10_35 > finalTime) {
    highScore10_35 = finalTime.toFixed(3);
  } else if (gameType === "15 75" && highScore15_75 > finalTime) {
    highScore15_75 = finalTime.toFixed(3);
  } else if (gameType === "15 50" && highScore15_50 > finalTime) {
    highScore15_50 = finalTime.toFixed(3);
  } else if (gameType === "15 35" && highScore15_35 > finalTime) {
    highScore15_35 = finalTime.toFixed(3);
  }
}

function aimHighScoreTime() {
  // aimGame Proj : uses gameType to determine if the new time is faster than previous time of same gameType
  if (gameType === "5 75" && highScore5_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_75 + " seconds";
  } else if (gameType === "5 50" && highScore5_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_50 + " seconds";
  } else if (gameType === "5 35" && highScore5_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_35 + " seconds";
  } else if (gameType === "10 75" && highScore10_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_75 + " seconds";
  } else if (gameType === "10 50" && highScore10_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_50 + " seconds";
  } else if (gameType === "10 35" && highScore10_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_35 + " seconds";
  } else if (gameType === "15 75" && highScore15_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_75 + " seconds";
  } else if (gameType === "15 50" && highScore15_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_50 + " seconds";
  } else if (gameType === "15 35" && highScore15_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_35 + " seconds";
  } else {
    document.getElementById("aimHighScoreTime").innerHTML = "N/A";
  }
}

function aimStartTimer() {
  // aimGame Proj : sets start time to right after the game is started (its called right at the beginning of game start)
  startTime = Date.now();
}

function aimEndTimer() {
  // aimGame Proj : sets end time to when the game ends (its called right at the end of game start)
  endTime = Date.now();
}

function aimButtonOrBall() {
  // aimGame Proj : when the start button is pressed turns the button into a ball until game is over, then it turns it back and makes the timer, settings, and high score visible again
  if (buttonClick >= ballNumber + 1) {
    document.getElementById("aimButton").innerHTML = "Try again?";
    document.getElementById("aimButton").style.visibility = "visible";
    document.getElementById("aimButton").style.width = 15 + "%";
    document.getElementById("aimButton").style.height = "fit-content";
    document.getElementById("aimButton").style.borderRadius = 1 + "vw";
    document.getElementById("aimButton").style.backgroundColor = "black";
    document.getElementById("aimButton").style.left = 37.5 + "%";
    document.getElementById("aimButton").style.top = 75 + "%";
    document.getElementById("aimTimer").style.visibility = "visible";
    document.getElementById("aimHighScore").style.visibility = "visible";
    document.getElementById("aimSettings").style.visibility = "visible";
  } else if (buttonClick != ballNumber + 1) {
    document.getElementById("aimButton").innerHTML = "";
    document.getElementById("aimButton").style.width = difficulty + "px";
    document.getElementById("aimButton").style.height = difficulty + "px";
    document.getElementById("aimButton").style.borderRadius = 50 + "%";
    document.getElementById("aimButton").style.backgroundColor = "green";
  }
}

function aimRandomPoint() {
  // aimGame Proj : moves the ball to a random x/y coordinate inside the game area
  let min = 5;
  let max = 90;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  document.getElementById("aimButton").style.left = x + "%";
  document.getElementById("aimButton").style.top = y + "%";
}

function gameStart() {
  // codeLearningGame Proj : starts the game on button press
  for (i = 0; i < numOfSpikes; i++) {
    let spikeToRemove = document.getElementById("gameSpike" + i);
    if (spikeToRemove != undefined) {
      spikeToRemove.remove();
    }
  }
  console.log("\n");
  console.log("-----NEW GAME-----");
  gameSpawnEntities();
  testIfPossible();
  if (testIfPossible(true)) {
    gamePlaceOnGrid();
    gameSpawnedOnSpike();
  } else {
    console.log("not possible");
    gameStart();
  }
}

function gameSpawnEntities() {
  // codeLearningGame Proj : uses other functions to spawn all the entities (spikes, player, goal)
  gameRandomSpikeSpawn();
  gameRandomGoalSpawn();
  gameRandomPlayerSpawn();
}

function gameRandomGoalSpawn() {
  // codeLearningGame Proj : moves the goal to a random spot in the bottom right of the grid
  let min = 11;
  let max = 14;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  gameGoal = { x: x, y: y };
}

function gameRandomPlayerSpawn() {
  // codeLearningGame Proj : moves the player to a random spot in the top left of the grid
  let min = 2;
  let max = 5;
  let minSpin = 1;
  let maxSpin = 4;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  spin = Math.floor(minSpin + Math.random() * (maxSpin - minSpin + 1));
  gamePlayer = { x: x, y: y };
}

function gameNumberOfSpike() {
  // codeLearningGame Proj : sets the number of spikes = difficulty selected (Currently not hooked up to any button)
  if (buttonID == "buttonEasy") {
    numOfSpikes = 15;
  } else if (buttonID == "buttonMedium") {
    numOfSpikes = 30;
  } else if (buttonID == "buttonHard") {
    numOfSpikes = 45;
  } else {
    numOfSpikes = 100;
  }
}

function gameRandomSpikeSpawn(clicked_id) {
  console.log("spawning spikes");
  // codeLearningGame Proj : spawns spike in random grid space, logs all the coords, then if a spike spawns ontop of another spike, deletes later spike
  spike = [];
  buttonID = clicked_id;
  gameNumberOfSpike();
  for (i = 0; i < numOfSpikes; i++) {
    let min = 1;
    let max = 15;
    spikeX = Math.floor(min + Math.random() * (max - min + 1));
    spikeY = Math.floor(min + Math.random() * (max - min + 1));
    spikeArrayTemp.push({ id: i, x: spikeX, y: spikeY });
  }

  for (i = 0; i < spikeArrayTemp.length; i++) {
    let spikeTestX = spikeArrayTemp[i].x;
    let spikeTestY = spikeArrayTemp[i].y;
    for (j = i; j < spikeArrayTemp.length; j++) {
      if (
        spikeTestX == spikeArrayTemp[j].x &&
        spikeTestY == spikeArrayTemp[j].y &&
        i != j
      ) {
        let spikeToRemove = document.getElementById(
          "gameSpike" + spikeArrayTemp[j].id
        );
        if (spikeToRemove != undefined) {
          spikeToRemove.remove();
          spikeArrayTemp.splice(j, 1);
        }
      }
    }
  }
  for (i = 0; i < spikeArrayTemp.length; i++) {
    if (spikeArrayTemp[i] != null) {
      spike.push(spikeArrayTemp[i]);
    }
  }
  spikeArrayTemp = [];
}

function gameSpawnedOnSpike() {
  // codeLearningGame Proj : checks if player or goal spawns ontop of spike, if it does, deletes it
  for (i = 0; i < spike.length; i++) {
    if (spike[i].x == gameGoal.x && spike[i].y == gameGoal.y) {
      console.log("Goal spawned on gameSpike" + spike[i].id);
      let spikeToRemove = document.getElementById("gameSpike" + spike[i].id);
      if (spikeToRemove != undefined) {
        spikeToRemove.remove();
        spike.splice(i, 1);
      }
    }
  }
  for (i = 0; i < spike.length; i++) {
    if (spike[i].x == gamePlayer.x && spike[i].y == gamePlayer.y) {
      console.log("Player spawned on gameSpike" + spike[i].id);
      let spikeToRemove = document.getElementById("gameSpike" + spike[i].id);
      if (spikeToRemove != undefined) {
        spikeToRemove.remove();
        spike.splice(i, 1);
      }
    }
  }
}

function gamePlaceOnGrid() {
  document.getElementById("gamePlayer").style.gridArea =
    gamePlayer.x + "/" + gamePlayer.y;
  if (spin == 2) {
    document.getElementById("gamePlayer").style.rotate = 90 + "deg";
  } else if (spin == 3) {
    document.getElementById("gamePlayer").style.rotate = 180 + "deg";
  } else if (spin == 4) {
    document.getElementById("gamePlayer").style.rotate = 270 + "deg";
  } else {
    document.getElementById("gamePlayer").style.rotate = 0 + "deg";
  }

  document.getElementById("gameGoal").style.gridArea =
    gameGoal.x + "/" + gameGoal.y;

  for (i = 0; i < spike.length; i++) {
    spikeTemp = document.createElement("div");
    spikeTemp.classList.add("gameSpike");
    spikeTemp.setAttribute("id", "gameSpike" + i);
    spikeTemp.innerHTML = "*";
    document.getElementById("gameArea").appendChild(spikeTemp);
    document.getElementById("gameSpike" + i).style.gridArea =
      spike[i].x + "/" + spike[i].y;
  }
}

function gameMovement() {
  // codeLearningGame Proj : allows player to move using 3 buttons, before moves, checks spin of player to move accordingly
  gameTurning();
  if (gameSpikeCollision()) {
  } else if (gameGoalCollision()) {
    if (spin == 1) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayer.x - 1;
    } else if (spin == 2) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayer.y + 1;
    } else if (spin == 3) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayer.x + 1;
    } else if (spin == 4) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayer.y - 1;
    }
    if (gameGoal.x == gamePlayer.x && gameGoal.y == gamePlayer.y) {
      console.log("you win");
    }
    console.log("you win");
  } else if (gamePlayer.x <= 15 && gamePlayer.y <= 15) {
    if (spin == 1) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayer.x - 1;
      gamePlayer.x--;
    } else if (spin == 2) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayer.y + 1;
      gamePlayer.y++;
    } else if (spin == 3) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayer.x + 1;
      gamePlayer.x++;
    } else if (spin == 4) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayer.y - 1;
      gamePlayer.y--;
    }
    if (gamePlayer.x == 0) {
      gamePlayer.x = 1;
    }
    if (gamePlayer.x == 16) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayer.x - 1;
      gamePlayer.x = 15;
    }
    if (gamePlayer.y == 0) {
      gamePlayer.y = 1;
    }
    if (gamePlayer.y >= 16) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayer.y - 1;
      gamePlayer.y = 15;
    }
  }
}

function gameTurning(clicked_id) {
  // codeLearningGame Proj : sets player rotation based on spin that player is currently at
  let x = 0;
  if (spin == 1) {
    gameSpinArray = [1, 2, 3, 4];
  } else if (spin == 2) {
    gameSpinArray = [2, 3, 4, 1];
  } else if (spin == 3) {
    gameSpinArray = [3, 4, 1, 2];
  } else if (spin == 4) {
    gameSpinArray = [4, 1, 2, 3];
  }

  if (clicked_id == "gameTurnLeft") {
    x = gameSpinArray.pop();
    gameSpinArray.unshift(x);
    spin = gameSpinArray[0];
  } else if (clicked_id == "gameTurnRight") {
    x = gameSpinArray.shift();
    gameSpinArray.push(x);
    spin = gameSpinArray[0];
  }

  if (spin == 1) {
    document.getElementById("gamePlayer").style.rotate = 0 + "deg";
  } else if (spin == 2) {
    document.getElementById("gamePlayer").style.rotate = 90 + "deg";
  } else if (spin == 3) {
    document.getElementById("gamePlayer").style.rotate = 180 + "deg";
  } else if (spin == 4) {
    document.getElementById("gamePlayer").style.rotate = 270 + "deg";
  }
}

function gameSpikeCollision() {
  // codeLearningGame Proj : checks is player is going to touch spike, if they are, wont let them move (will be changed to lose life and restart)
  touchingSpike = false;
  for (i = 0; i < spike.length; i++) {
    let spikeValueAtIndexX = spike[i].x;
    let spikeValueAtIndexY = spike[i].y;
    if (
      spikeValueAtIndexX + 1 === gamePlayer.x &&
      gamePlayer.y === spike[i].y &&
      spin == 1
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexY - 1 === gamePlayer.y &&
      gamePlayer.x === spike[i].x &&
      spin == 2
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexX - 1 === gamePlayer.x &&
      gamePlayer.y === spike[i].y &&
      spin == 3
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexY + 1 === gamePlayer.y &&
      gamePlayer.x === spike[i].x &&
      spin == 4
    ) {
      return (touchingSpike = true);
    }
  }
}

function gameGoalCollision() {
  // codeLearningGame Proj : checks if player is on top of goal
  touchingGoal = false;
  if (
    gameGoal.x + 1 === gamePlayer.x &&
    gamePlayer.y === gameGoal.y &&
    spin == 1
  ) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (
    gameGoal.y - 1 === gamePlayer.y &&
    gamePlayer.x === gameGoal.x &&
    spin == 2
  ) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (
    gameGoal.x - 1 === gamePlayer.x &&
    gamePlayer.y === gameGoal.y &&
    spin == 3
  ) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (
    gameGoal.y + 1 === gamePlayer.y &&
    gamePlayer.x === gameGoal.x &&
    spin == 4
  ) {
    touchingGoal = true;
    return touchingGoal;
  }
}

function cellLocation(x, y, d) {
  //used in testIfPossible to track x, y, and distance from start
  this.x = x;
  this.y = y;
  this.d = d;
}

function testIfPossible() {
  // codeLearningGame Proj : creates a map based on player, goal, and spike spawns, then moves through each available cell to check if the game is actually possible
  var X = 15;
  var Y = 15;
  let map = Array.from(Array(X), () => Array(Y).fill(" "));
  // map is an array the length of X, that is then filled with arrays, the length of Y, that are filled with empty spaces
  // if .fill wasnt used, the Y arrays inside the X array, would have "empty" spaces, which can be filled but its easier to do when initializing
  let marked = Array.from(Array(X), () => Array(Y).fill(" "));

  for (i = 0; i < map.length; i++) {
    // generates map the size of the gameArea, fills it with player, goal, and spike locations
    let found = spike.filter(({ x }) => x == i + 1);
    for (j = 0; j < found.length; j++) {
      let y = found[j].y - 1;
      let x = found[j].x - 1;
      if (gamePlayer.x - 1 == x) {
        map[x].splice(gamePlayer.y - 1, 1, "P");
      }
      if (gameGoal.x - 1 == x) {
        map[x].splice(gameGoal.y - 1, 1, "G");
      }
      map[x].splice(y, 1, "x");
    }
  }

  let start = new cellLocation(0, 0, 0);

  for (i = 0; i < X; i++) {
    //marks spikes as true in the marked map so the function doesnt try to run into them
    for (j = 0; j < Y; j++) {
      if (map[i][j] == "x") {
        marked[i][j] = true;
      } else {
        marked[i][j] = false;
      }
      if (map[i][j] == "P") {
        //sets start location using cellLocation
        start.x = i;
        start.y = j;
      }
    }
  }

  let queue = [];
  queue.push(start); //puts start location into the queue of spots to search
  marked[start.x][start.y] = true; // marks start so it doesnt return
  while (queue.length != 0) {
    //while there is something in queue, run code again
    let current = queue[0]; // set current to first thing in queue
    queue.shift(); // removes first thing in queue

    //end
    if (map[current.x][current.y] == "G") {
      // if current matches with goal in the "map" sets minDistance to the current.d (which is current distance from start)
      return true;
    }

    //up
    if (current.x - 1 >= 0 && marked[current.x - 1][current.y] == false) {
      // if above current isnt 0 and the location hasnt been marked, add it to queue then mark it
      queue.push(new cellLocation(current.x - 1, current.y, current.d + 1));
      marked[current.x - 1][current.y] = true;
    }
    //right
    if (current.y + 1 < 15 && marked[current.x][current.y + 1] == false) {
      // if to the right current isnt 0 and the location hasnt been marked, add it to queue then mark it
      queue.push(new cellLocation(current.x, current.y + 1, current.d + 1));
      marked[current.x][current.y + 1] = true;
    }
    //down
    if (current.x + 1 < 15 && marked[current.x + 1][current.y] == false) {
      // if below current isnt 0 and the location hasnt been marked, add it to queue then mark it
      queue.push(new cellLocation(current.x + 1, current.y, current.d + 1));
      marked[current.x + 1][current.y] = true;
    }
    //left
    if (current.y - 1 >= 0 && marked[current.x][current.y - 1] == false) {
      // if to the left current isnt 0 and the location hasnt been marked, add it to queue then mark it
      queue.push(new cellLocation(current.x, current.y - 1, current.d + 1));
      marked[current.x][current.y - 1] = true;
    }
  }
  return false;
}

let numOfButtons = 0;

function gameButtonActions(clicked_id) {
  //dont forget to do (this.id) in html
  let buttonTemp;
  if (clicked_id == "gameTurnLeft") {
    buttonTemp = document.createElement("div");
    buttonTemp.classList.add("gameButtonsInPanel");
    buttonTemp.innerHTML = "turn left";
    document.getElementById("rightPressedButtons").appendChild(buttonTemp);
    numOfButtons++;
  }
  if (clicked_id == "gameMoveForward") {
    buttonTemp = document.createElement("div");
    buttonTemp.classList.add("gameButtonsInPanel");
    buttonTemp.innerHTML = "forward";
    document.getElementById("rightPressedButtons").appendChild(buttonTemp);
    numOfButtons++;
  }
  if (clicked_id == "gameTurnRight") {
    buttonTemp = document.createElement("div");
    buttonTemp.classList.add("gameButtonsInPanel");
    buttonTemp.innerHTML = "turn right";
    document.getElementById("rightPressedButtons").appendChild(buttonTemp);
    numOfButtons++;
  }
  if (clicked_id == "gameForLoop") {
    //   buttonTemp = document.createElement("div");
    //   buttonTemp.classList.add("gameButtonsInPanelFor");
    //   buttonTemp.innerHTML = "for loop";
    //   buttonTemp.setAttribute("id", "forLoop");
    //   document.getElementById("rightPressedButtons").appendChild(buttonTemp);
    // buttonTemp = document.createElement("input");
    // buttonTemp = classList.add("forLoopInput");
    // buttonTemp.setAttribute("type", "number");
    // buttonTemp.setAttribute("min", "1");
    // buttonTemp.setAttribute("max", "100");
    // // document.getElementById("forLoop").appendChild(buttonTemp);
    // document.getElementById("rightPressedButtons").appendChild(buttonTemp);
    numOfButtons++;
  }
}

function gameButtonsClear() {
  const pressedButtons = document.getElementById("rightPressedButtons");
  while (pressedButtons.hasChildNodes()) {
    pressedButtons.removeChild(pressedButtons.firstChild);
  }
}
