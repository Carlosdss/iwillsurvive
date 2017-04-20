
var game;
$(document).ready(function() {

  //Crear tablero
  game = new Game(new Board(20,30,24));
  game.initGame(convert2grid(levels[0]));

  //Eventos
  $(document).on( "keyup", keyupWindow);
  //$(".square").on("click", clickBoard);
  $('#levelSelector').change(clickLevelSelector);

  function keyupWindow(e) {
      var chCode = ('charCode' in e) ? e.charCode : e.keyCode;
      var userMove;
      //alert ("keyCode: " + event.keyCode + " Unicode charcode: " + chCode + " StringFrom charcode: "+ String.fromCharCode(chCode));
      switch (e.keyCode) {
        case 38: //up     keycode(70)=F
          userMove="F";
          break;
        case 40: //down   keycode(66)=B
          userMove="B";
          break;
        case 39: //right  keycode(82)=R
          userMove="R";
          break;
        case 37: //left   keycode(77)=L
          userMove="L";
          break;
        default:
          userMove = String.fromCharCode(chCode).toUpperCase();
          break;
      }
      
      game.players[0].move(userMove);
  }

  function clickLevelSelector(e){
    game.initGame(convert2grid(levels[e.currentTarget.selectedIndex]));
  }

});
