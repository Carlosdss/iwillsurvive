var Player = function(top, left){
  this.top = top || 10;
  this.left = left || 15;
  this.direction = "S";
  this.size = 0;
  this.symbol = 0;
  this.playerNumber = 0;
};

Player.prototype.moveForward = function() {
  switch(this.direction) {
    case 'N':
      this.top--;
      break;
    case 'E':
      this.left++;
      break;
    case 'S':
      this.top++;
      break;
    case 'W':
      this.left--;
      break;
  }
};

Player.prototype.moveUp = function() {
    if (this.direction == "N") {
      this.moveForward();
    } else {
      this.direction="N";
    }
};

Player.prototype.moveDown = function() {
  if (this.direction == "S") {
    this.moveForward();
  } else {
    this.direction="S";
  }
};

Player.prototype.moveLeft = function() {
    //alert("left");
    if (this.direction == "W") {
      this.moveForward();
    } else {
      this.direction="W";
    }
};

Player.prototype.moveRight = function() {
  if (this.direction == "E") {
    this.moveForward();
  } else {
    this.direction="E";
  }
};


Player.prototype.move = function(moveOption) {
  preCoordY = this.top;
  preCoordX = this.left;
  preDirection = this.direction;

  switch (moveOption) {
    case "F":
      this.moveUp();
      break;
    case "B":
      this.moveDown();
      break;
    case "R":
      this.moveRight();
      break;
    case "L":
      this.moveLeft();
      break;
    default:
  }

  var tile = game.board.getItemAtPosition(this.top, this.left);

  switch (tile) {
    case "*":
    case "P":
      //move
      this.playSound();
      this.render(preCoordY, preCoordX);
      //this.render(this.top, this.left);
      //update paths
      game.updatePaths(this.top, this.left);
      //update map
      break;
    case "Z":
      alert("you death!!");
      //Death
      break;
    default:
    //Stay
      this.top = preCoordY;
      this.left = preCoordX;
      this.direction = preDirection;
  }
};

Player.prototype.render = function(preCoordY, preCoordX){

  ion.sound.play("tap");
  var top;
  var left;
  var that = this;
  var classDirection = 'player1-down';
      switch (that.direction) {
        case "N":
          classDirection = 'player1-up';
          break;
        case "S":
          classDirection = 'player1-down';
          break;
        case "E":
          classDirection = 'player1-right';
          break;
        case "W":
          classDirection = 'player1-left';
            break;
        default:
      }

      //Limpiar casilla anterior
      var elementString = "#"+preCoordY+"-"+preCoordX;
      $(elementString).empty();
      //game.board.map[preCoordY][preCoordX] = "*";
      elementString = "#"+that.top+"-"+that.left;
      //game.board.map[that.top][that.left] = "1";
      //board.map[that.top][that.left]="*";
      //board.map[that.top][that.left]="Z";
      $(elementString).append("<div class='"+classDirection+"'></div>");
};



Player.prototype.updatePosition = function(x,y) {
  this.top = y;
  this.left = x;
};

Player.prototype.shoot = function(){

};

Player.prototype.init = function(){

};

Player.prototype.checkCollides = function(){

};

Player.prototype.updatePosition = function(){

};

Player.prototype.playSound = function() {
  document.getElementById("myAudio").play();
  //$('#myAudio').play();
};
