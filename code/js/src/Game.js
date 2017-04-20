var Game = function(board){
  this.players = [];
  this.size = 0;
  this.board = board;
  this.zombies = [];
  this.players = [];
  this.bullets = [];
  this.objects = [];
  this.gameTime = 60000;
  this.gameTimeID = null;
  this.playOn=true
};

Game.prototype.insertZombie = function (zombie) {
  this.zombies.push(zombie);

  var top;
  var left;
  for (i=0; i < this.zombies.length; i++) {
    top = this.zombies[i].top;
    left = this.zombies[i].left;
    $("#"+top+"-"+left).append("<div class='zombie zombie-right'></div>");
  }
};

Game.prototype.insertPlayer = function (player) {
  this.players.push(player);
  var top;
  var left;
  for (i=0; i < this.players.length; i++) {
    top = this.players[i].top;
    left = this.players[i].left;
    $("#"+top+"-"+left).append("<div class='player1-down'></div>");
  }
  //$("#"+player.top+"-"+player.left).append("<div class='player1 player1-down'></div>");
};

Game.prototype.initGame = function (map) {
  this.board = new Board(20,30,24, this);
  this.zombies = [];
  this.players = [];
  this.board.map = map;

  this.board.init();
  this.insertZombie(new Zombie(1,1));
  this.insertPlayer(new Player(10,15));
  this.startGameTime();
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

Game.prototype.startGameTime = function(){
  var count = 0;
  var that = this;
  game.updatePaths(this.players[0].top, this.players[0].left);
  this.playSound("iwillsurvive");
  that.gameTimeId = setInterval(function(time){
    if (count >= that.gameTime) {
      console.log(count);
      clearInterval(that.gameTimeId);
      that.gameEnd("TIMEOUT");
    } else {
      count+=2000;
      that.insertZombie(new Zombie(1,1));
    }
  }, 2000);
};

Game.prototype.gameEnd = function(message){
  //Stop zombies


  var that = this;
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }
  if (message == "TIMEOUT") {
    this.stopSound("iwillsurvive");
    alert("You have survived !!!");
    clearInterval(that.gameTimeId);
  } else if (message == "DEAD"){
    this.stopSound("iwillsurvive");
    this.playSound("dead");

    clearInterval(that.gameTimeId);

    //alert("Graaaa... You are dead!!!");
  }
};





Game.prototype.playSound = function(sound){
  var audio = document.getElementById(sound);
  if (audio.paused === false) {
       audio.pause();
   } else {
       audio.play();
   }
  document.getElementById(sound).play();
};

Game.prototype.stopSound = function(sound){
  document.getElementById(sound).pause();
};
