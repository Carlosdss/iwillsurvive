var Zombie = function(top, left){
  this.direction="";
  this.name="Z";
  this.top = top;
  this.left = left;
  this.size = 24;
  this.symbol = 0;
  this.path = [];
  this.moving = "moving";
  this.id = null;
};

Zombie.prototype.movePath = function(path){
  this.path = path;

  var index = 0;
  var that = this;

  that.id = setInterval(function(){
    console.log(game.board.map.join("\n"));
    var classDirection = "zombie zombie-down";
    console.log(index);
    that.moving = true;
    if (index < path.length && that.moving) {
      var elementString = "#"+that.top+"-"+that.left;
      $(elementString).empty();
      elementString = "#"+that.path[index][0]+"-"+that.path[index][1];

      if (that.path[index][0]>that.top){
        classDirection = "zombie zombie-down";
      } else if (that.path[index][0]<that.top) {
        classDirection = "zombie zombie-up";
      } else if (that.path[index][1]>that.left) {
        classDirection = "zombie zombie-right";
      } else if (that.path[index][1]<that.left) {
        classDirection = "zombie zombie-left";
      }

      game.board.map[that.top][that.left]="*";
      game.board.map[that.path[index][0]][that.path[index][1]]="Z";
      // console.log(that.path[index][1]+","+that.path[index][0]+":" +game.board.map[that.path[index][1]][that.path[index][0]]);
      // console.log([that.top]+","+[that.left]+":" +game.board.map[that.top][that.left]);

      that.top=that.path[index][0];
      that.left=that.path[index][1];
      if (that.top == game.players[0].top && that.left == game.players[0].left) {
        game.gameEnd("DEAD");
      }
      console.log(game.board.map);

      $(elementString).append("<div class='"+classDirection+"'></div>");
      index++;
    } else {
      clearInterval(that.id);
    }
  }, 250);
};
