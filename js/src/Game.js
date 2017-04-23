var Game = function(board){
  this.players = [];
  this.size = 0;
  this.board = board;
  this.zombies = [];
  this.players = [];
  this.bullets = [];
  this.objects = [];
  this.gameTime = 20 * 1000;
  this.zombieGenerationInterval = 2 * 1000;
  this.gameTimeID = null;
  this.playOn=true;
  this.level = 0 ;
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
  var currentTop, currentLeft, positionTop, positionLeft;
  for (i=0; i < this.players.length; i++) {
    currentTop = this.players[i].top;
    currentLeft = this.players[i].left;
    positionTop = currentTop * this.board.tileSize;
    positionLeft = currentLeft * this.board.tileSize;
    if (this.players[i].playerNumber === 0){
      $("#board").append("<div id='player1' class='player player1-down'></div>");
      $("#player1").css({left: positionLeft, top:positionTop});
      this.board.map[currentTop][currentLeft] = this.players[i].playerNumber;
    } else {
      $("#board").append("<div id='player2' class='player player2-down'></div>");
      $("#player2").css({left: positionLeft, top:positionTop});
      this.board.map[currentTop][currentLeft] = this.players[i].playerNumber;
    }
  }

};

Game.prototype.initGame = function (level) {
  this.clean();
  this.gameTime = level.gametime;
  this.level = level.id;
  this.board = new Board(20,30,32,this);
  this.zombies = [];
  this.players = [];
  this.board.map = convert2grid(levels[this.level]);

  this.board.init();
  this.insertZombie(new Zombie(1,1));

  if (document.getElementById('nPlayers').innerHTML=="2 PLAYERS") {
    this.insertPlayer(new Player(11,15,0));
    this.insertPlayer(new Player(11,14,1));
  } else {
    this.insertPlayer(new Player(11,15,0));
  }
  this.startGameTime();
  console.log(this.board.map.toString());
};

Game.prototype.updatePaths = function(){
  var that = this;
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }
  for (i=0; i < game.zombies.length; i++) {
    var targetPlayer = game.players[Math.floor(Math.random() * game.players.length)];
    game.zombies[i].movePath((new Path([game.zombies[i].top, game.zombies[i].left], [targetPlayer.top, targetPlayer.left], game.board)) );
  }
};

Game.prototype.startGameTime = function(){
  var count = 0;
  var that = this;

  this.stopSound("ace");
  this.playSound("iwillsurvive");

  document.getElementById("time").innerHTML = (that.gameTime / 1000);
  game.updatePaths(this.players[0].top, this.players[0].left);

  this.gameOverTimer = setInterval(function(){
    //Call function stopGame, winning
    that.stopGame("TIMEOUT");
  },this.gameTime);

  //Start game
  this.resetTimer();

  this.zombieTimer = setInterval(function(){
    if (that.board.map[1][1]=="*") {
      that.insertZombie(new Zombie(1,1));
    }
  },this.zombieGenerationInterval);
};

Game.prototype.resetTimer = function(){
  var that = this;
  var gameTime = this.gameTime;
  var timerSpeed = 100;
  this.gameTimer = setInterval(function(){
    that.setGameTimer(gameTime/1000);
    gameTime -= timerSpeed;

  }, timerSpeed);
};

Game.prototype.stopGame = function(gameDeadType){
  clearInterval(this.zombieTimer);
  clearInterval(this.gameTimer);
  clearInterval(this.gameOverTimer);

  var that = this;
  //Stop zombies intervals
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }

  //Eventos de final
  if (gameDeadType == "TIMEOUT") {
    this.stopSound("iwillsurvive");
    this.playSound("ace");
    document.getElementById("message").innerHTML="YOU'VE SURVIVE!!!";
    $("#message").removeClass('hide');
  } else if (gameDeadType == "DEAD"){
    this.stopSound("iwillsurvive");
    this.playSound("dead");
    document.getElementById("message").innerHTML="GAME OVER";
    $("#message").removeClass('hide');
  } else if (gameDeadType == "STOP") {
    this.stopSound("iwillsurvive");
    this.stopSound("ace");
  }
  document.getElementById("start").innerHTML = "Start";
};

Game.prototype.setGameTimer = function(value){
  document.getElementById("time").innerHTML = parseInt(value) + " SEC";
};

Game.prototype.clean = function(sound){
  for (var z=this.zombies.length-1; z===0; z--){
    this.zombies[z].push();
  }
  for (var p=this.players.length-1; p===0; p--){
    this.players[p].push();
  }
  $("#board").empty();
};

Game.prototype.playSound = function(sound){
  var audio = document.getElementById(sound);
  if (audio.paused) audio.play();
};

Game.prototype.stopSound = function(sound){
  var audio = document.getElementById(sound);
  if (!audio.paused) audio.pause();
};
