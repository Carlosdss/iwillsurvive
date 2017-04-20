
var game;

$(document).ready(function() {




  //Eventos
  $(document).on( "keyup", keyupWindow);
  //$(".square").on("click", clickBoard);
  $('#levelSelector').change(clickLevelSelector);
  $('#start').on("click",clickStart);

  function clickStart(e){
    //Crear tablero
    alert(e.currentTarget.innerHTML);
    if (e.currentTarget.innerHTML == "Start") {
      game = new Game(new Board(20,30,24));
      game.initGame(convert2grid(levels[0]));
      e.currentTarget.innerHTML = "Stop";
    } else {
      e.currentTarget.innerHTML = "Start";
    }

  }

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
    switch (e.currentTarget.selectedIndex) {
      case 0:
        game.gameTime = 60000;
        break;
      case 1:
        game.gameTime = 30000;
        break;
      case 2:
        game.gameTime = 40000;
        break;
      case 3:
        game.gameTime = 50000;
        break;
      case 4:
        game.gameTime = 60000;
        break;
      default:
    }
    game.initGame(convert2grid(levels[e.currentTarget.selectedIndex]));
  }


  function playSounds (){
    ion.sound({
        sounds: [
            {
                name: "button_tiny"
            },
            {
                name: "tap",
                volume: 0.2
            },
            {
                name: "light_bulb_breaking",
                volume: 0.3,
                preload: false
            }
        ],
        volume: 0.5,
        path: "./../libs/ion.sound-3.0.7/sounds/",
        preload: true
    });
  }
});
