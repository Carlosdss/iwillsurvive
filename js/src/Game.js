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
    if (this.players[i].playerNumber === 0){
      $("#"+top+"-"+left).append("<div class='player1-down'></div>");
    } else {
      $("#"+top+"-"+left).append("<div class='player2-down'></div>");
    }
  }
  //$("#"+player.top+"-"+player.left).append("<div class='player1 player1-down'></div>");
};

Game.prototype.initGame = function (map) {
  this.clean();
  this.board = new Board(20,30,24, this);
  this.zombies = [];
  this.players = [];
  this.board.map = map;

  this.board.init();
  this.insertZombie(new Zombie(1,1));

  if (document.getElementById('nPlayers').innerHTML=="2 PLAYERS") {
    this.insertPlayer(new Player(10,15,0));
    this.insertPlayer(new Player(10,14,1));
  } else {
    this.insertPlayer(new Player(10,15,0));
  }
  this.startGameTime();
};

Game.prototype.updatePaths = function(playerTop, playerLeft){
  var that = this;
  for (i=0; i < game.zombies.length; i++) {
    clearInterval(game.zombies[i].id);
  }

  for (i=0; i < game.zombies.length; i++) {
    var targetPlayer = Math.floor(Math.random() * game.players.length);
    game.zombies[i].movePath((new Path([game.zombies[i].top, game.zombies[i].left], [playerTop, playerLeft], game.board)) );
  }
};

Game.prototype.startGameTime = function(){
  var count = 0;
  var that = this;

  this.playSound("ace");
  this.playSound("iwillsurvive");

  document.getElementById("time").innerHTML = (that.gameTime / 1000);
  game.updatePaths(this.players[0].top, this.players[0].left);

  this.gameOverTimer = setInterval(function(){
    that.stopGame("TIMEOUT");
    console.log("TIMEOUT. GAME OVER");
    // LLAMAR A LA FUNCION GAME OVER
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


  //Stop zombies
  var that = this;
  //Parar los intervals de los zombies
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
  }

  document.getElementById("start").innerHTML = "Start";
};

Game.prototype.setGameTimer = function(value){
  document.getElementById("time").innerHTML = parseInt(value) +" SEC";
};


Game.prototype.clean = function(sound){
  for (var z=this.zombies.length-1; z===0; z--){
    this.zombies[z].push();
  }
  console.log(this.zombies);
  for (var p=this.players.length-1; p===0; p--){
    this.players[p].push();
  }
  console.log(this.players);
  //this.board=null;
  $("#board").empty();
};

Game.prototype.playSound = function(sound){
  var audio = document.getElementById(sound);
  if (audio.paused === false) {
       audio.pause();
   } else {
       audio.play();
   }
  //document.getElementById(sound).play();
};

Game.prototype.stopSound = function(sound){
  var audio = document.getElementById(sound);
  if (!audio.paused) {
    document.getElementById(sound).pause();
  }

};
