var Board = function(rows, cols, tileSize, game){
  this.height = (rows-1)*tileSize;
  this.width = (cols-1)*tileSize;
  this.rows = rows;
  this.cols = cols;
  this.tileSize = tileSize;
  this.map = [];
  this.zombies = [];
  this.emptyCell = "*";
  this.bounds = true;
  this.game = game;
  //console.log("new board");
};

Board.prototype.init = function(){
  this.render();
};
/*
Board.prototype.renderZombie = function (zombie) {
  this.map[1][1] = "Z";
};

Board.prototype.renderPlayer = function (zombie) {
  this.map[1][3] = "1";
};
*/
Board.prototype.render = function(){
  var html = "";
  $("#board").empty();

  for (var y = 0; y < this.rows; y++){
    for (var x = 0; x < this.cols; x++){
      var tileClass;
      if (this.map[y][x] == "*") {
        tileClass = "tile empty";
      } else {
        tileClass = "tile wall";
      }
      html +=("<div id='"+ y +"-"+ x +"' class='square " + tileClass + "' style='{top: " + (y*this.tileSize) + "px;left:"  + (x*this.tileSize) + "px;}'></div>");
    }
  }
  $('#board').append(html);
  $(".square").on("click", this.clickBoard);

};

/*
Board.prototype.clickBoard = function(e){
  var that = this;

  var id = e.currentTarget.id;
  var separator = e.currentTarget.id.indexOf("-");
  var top = id.substr(0, separator);
  var left = id.substr(separator + 1, id.length);
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }

  for (i=0; i < game.zombies.length; i++) {
    game.zombies[i].movePath((new Path([game.zombies[i].top, game.zombies[i].left], [top, left], game.board)) );
  }
};
*/


//-------------------


Board.prototype.placeItemAtEmpty = function(item,x,y){

  if (this.map[y][x] == "*") {

    this.map[y][x] = item.direction;
    item.top = y;
    item.left = x;
    return true;
  } else {
    return false;
  }
};

//mode: random | fixed
Board.prototype.removeItem = function(x,y){
  this.map[y][x] = "*";
};

Board.prototype.validMovement = function(x,y){
  var that = this;
  //alert((((x>=0) && (x<that.cols)) && ((y>=0) && (y<that.rows))) && (that.map[y][x] === "*") );
  return ( (((x>=0) && (x<that.cols)) && ((y>=0) && (y<that.rows))) && (that.map[y][x] === "*") ) ? true : false;
};

Board.prototype.getItemAtPosition = function(x,y){
  var that = this;
  if (this.validMovement(y,x)) {
    return that.map[x][y];
  } else {
    return "OUTERLIMITS";
  }
};
