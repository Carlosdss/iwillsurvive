var Game = function(board){
  this.players = [];
  this.size = 0;
  this.board = board;
  this.zombies = [];
  this.players = [];
  this.bullets = [];
  this.objects = [];
};

Game.prototype.insertZombie = function (zombie) {
  this.zombies.push(zombie);
};

Game.prototype.insertPlayer = function (player) {
  this.players.push(player);
  //$("#"+player.top+"-"+player.left).append("<div class='player1 player1-down'></div>");
};

Game.prototype.initGame = function (map) {
  this.board = new Board(20,30,24, this);
  this.zombies = [];
  this.players = [];
  this.board.map = map;
  this.insertZombie(new Zombie(1,1));
  this.insertPlayer(new Player(10,15));
  this.board.init();

  //game.insertPlayer(new Player());
};

Game.prototype.updatePaths = function(playerTop, playerLeft){
  var that = this;
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }

  for (i=0; i < game.zombies.length; i++) {
    game.zombies[i].movePath((new Path([game.zombies[i].top, game.zombies[i].left], [playerTop, playerLeft], game.board)) );
  }
};
