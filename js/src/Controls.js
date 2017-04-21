var Controls = function(){
  this.direction="";
};

Controls.prototype.goForward = function() {
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

Snake.prototype.goBackward = function() {
  switch(this.direction) {
    case 'N':
      this.top++;
      break;
    case 'E':
      this.left--;
      break;
    case 'S':
      this.top--;
      break;
    case 'W':
      this.left++;
      break;
  }
};

Snake.prototype.turnLeft = function(){
  switch(this.direction) {
    case 'N':
      this.direction = "W";
      break;
    case 'E':
      this.direction = "N";
      break;
    case 'S':
      this.direction = "E";
      break;
    case 'W':
      this.direction = "S";
      break;
  }
};

Snake.prototype.turnRight = function(){
  switch(snake.direction) {
    case 'N':
      this.direction = "E";
      break;
    case 'E':
      this.direction = "S";
      break;
    case 'S':
      this.direction = "W";
      break;
    case 'W':
      this.direction = "N";
      break;
  }
};

Snake.prototype.moveLeft = function() {
  this.turnLeft();
  this.moveForward();
};

Snake.prototype.moveRight = function() {
  this.turnRight();
  this.moveForward();
};

Snake.prototype.updatePosition = function(x,y) {
  this.top = y;
  this.left = x;
};

Ball.prototype.move = function(){
  var topIncrement;
  var leftIncrement;
  switch (this.direction) {
    case "NE":
      topIncrement = -1;
      leftIncrement = +1;
      break;
    case "SE":
      topIncrement = +1;
      leftIncrement = +1;
      break;
    case "NW":
      topIncrement = -1;
      leftIncrement = -1;
      break;
    case "SW":
      topIncrement = +1;
      leftIncrement = -1;
      break;
    default:

  }
  this.top += (this.velocity * topIncrement);
  this.left += (this.velocity * leftIncrement);
  this.updatePosition();
  this.checkBorders();
};

Ball.prototype.changeDirection = function(direction, borders){

  switch (borders) {
    case "top":
      switch (direction) {
        case "NE":
            this.direction = "SE";
            break;
        case "NW":
            this.direction= "SW";
            break;
      }
      break;
    case "bottom":
      switch (direction) {
        case "SE":
            this.direction= "NE";
            break;
        case "SW":
            this.direction= "NW";
            break;
      }
      break;
    case "left":
      switch (direction) {
        case "SW":
            this.direction= "SE";
            break;
        case "NW":
            this.direction= "NE";
            break;
      }
      break;
    case "right":
      switch (direction) {
        case "SE":
            this.direction= "SW";
            break;
        case "NE":
            this.direction= "NW";
            break;
      }
      break;
    default:
  }
};
