var rover = {
  direction:'N',
  x: 0,
  y: 0,
  travelLog: [],
  controlGrid: false,
  controlRocks: false
}

var grid = [
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,"rock",null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,"rock",null,null],
  [null,"rock",null,null,null,null,null,"rock",null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  ["rock",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
]

function turnLeft(rover){
  switch (rover.direction){
    case ("N"):
      return rover.direction ="W"
      break;
    case ("W"):
      return rover.direction ="S"
      break;
    case ("S"):
      return rover.direction ="E"
      break;
    case ("E"):
      return rover.direction ="N"
      break;
  }
}

function turnRight(rover){
    switch (rover.direction){
    case ("N"):
      return rover.direction ="E"
      break;
    case ("E"):
      return rover.direction ="S"
      break;
    case ("S"):
      return rover.direction ="W"
      break;
    case ("W"):
      return rover.direction ="N"
      break;
  }
}

function outOfGrid(){
  console.log("Oops... You are trying to roam the Rover off the map! Luckily it has moved to position [0,0] again");
  rover.x = 0;
  rover.y = 0;
  rover.controlGrid = true;
}

function moveForward(rover){
  switch(rover.direction){
    case ("N"):
      if (rover.y - 1 < 0){
        outOfGrid();
      } else {
        if (grid[rover.y - 1][rover.x] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.y = rover.y - 1;
        }
      }       
      break;
    case ("W"):
      if (rover.x - 1 < 0){
        outOfGrid();
      } else {
        if (grid[rover.y][rover.x - 1] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.x = rover.x - 1;
        }
      }
      break;
    case ("S"):
      if (rover.y + 1 > 10){
        outOfGrid();
      } else {
        if (grid[rover.y + 1][rover.x] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.y = rover.y + 1;
        }
      }
      break;
    case ("E"):
      if (rover.x + 1 > 10){
        outOfGrid();
      } else {
        if (grid[rover.y][rover.x + 1] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.x = rover.x + 1;
        }
      }
      break;
  }
}

function moveBackward(rover){
  switch(rover.direction){
    case ("N"):
      if (rover.y + 1 > 10){
        outOfGrid();
      } else {
        if (grid[rover.y + 1][rover.x] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.y = rover.y + 1;
        }
      }
      break;
    case ("W"):
      if (rover.x + 1 > 10){
        outOfGrid();
      } else {
        if (grid[rover.y][rover.x + 1] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.x = rover.x + 1;
        }
      }
      break;
    case ("S"):
      if (rover.y - 1 < 0){
        outOfGrid();
      } else {
        if (grid[rover.y - 1][rover.x] === "rock"){
          rover.controlRocks = true;
        } else {
          rover.y = rover.y - 1;
        }
      }
      break;
    case ("E"):
      if (rover.x - 1 < 0){
        outOfGrid();
      } else {
        if (grid[rover.y][rover.x - 1] === "rock"){
          rover.controlRocks = true;
        } else {  
          rover.x = rover.x - 1;
        }
      }
      break;
  }
}

function controlSequence(commands){
  var commandsArray = Array.from(commands);
  function check(c) {
    return c !== "f" && c !== "l" && c !== "r" && c !== "b";
  }
  if (commandsArray.some(check) === true){
  console.log("Invalid sequence. You must use f-b-l-r characters or the rover won't move!");
  }
  
  else{
    for (var i = 0; i < commands.length; i++){
      
      switch(commands[i]){
        case ("f"):
          moveForward(rover);
            if (rover.controlRocks === false){
              rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
            }
          break;
        case ("b"):
          moveBackward(rover);
            if (rover.controlRocks === false){
              rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
            }
          break;
        case ("l"):
          turnLeft(rover)
          break;
        case ("r"):
          turnRight(rover)
          break;
        }
        if (rover.controlGrid === true){
          rover.controlGrid = false;
          break;
        }
        else if (rover.controlRocks === true){
          console.log("Mars Rover has stopped just before to crash into a martian rock!");
          rover.controlRocks = false;
          break;          
        }
      }
    if (commands.includes("f") || commands.includes("b") ){
    console.log("Mars Rover travelled over positions " + rover.travelLog);
    }
  }
}