import "../languages/TheBallGame";
import { AnimationLOOP, download, Label, Rectangle } from "../JSTools";
import { c } from "./Initialization";
import { setKeyStates } from "./Events";
import { Ball, GameState, TextButton } from "./Classes";

var game = new GameState();
var mainMenu = new GameState();
var options = new GameState();
mainMenu.visible = true;
//game
/*var rect = new Rectangle();
rect.doTranslate = true; Isto é o antigo rect.*/
game.container.player = new Ball(100+15, game.height / 2 + 15);

game.container.lava = new Rectangle(game.width / 2 - 50, game.height - 130, 100, 130);
game.container.lava.doPattern = "diagonals";
game.container.lava.color = "orange";
game.container.lava.outlineColor = "red";
game.container.lava.outlineWidth = 2;
game.container.lava.outlinePosition = "inner";
game.container.backToMenu_opt = new TextButton(game.width/2, 50, (window as any).globals.backToMenu_lang, "center", 40, 5);
game.container.backToMenu_opt.updateLanguage = function(){this.text=(window as any).globals.backToMenu_lang};
mainMenu.container.playGame_opt = new TextButton(game.width/2, 130, (window as any).globals.playGameOption_lang, "center", 50, 5);
mainMenu.container.playGame_opt.updateLanguage = function(){this.text=(window as any).globals.playGameOption_lang};
mainMenu.container.options_opt = new TextButton(game.width/2, 220, (window as any).globals.optionsOption_lang, "center", 50, 5);
mainMenu.container.options_opt.updateLanguage = function(){this.text=(window as any).globals.optionsOption_lang};
mainMenu.container.download_opt = new TextButton(game.width/2, 310, (window as any).globals.downloadOption_lang, "center", 50, 5);
mainMenu.container.download_opt.updateLanguage = function(){this.text=(window as any).globals.downloadOption_lang};
options.container.exitOptions_opt = new TextButton(30, 30, (window as any).globals.exitOptionsButton_lang, "start", 30, 5);
options.container.exitOptions_opt.updateLanguage = function(){this.text=(window as any).globals.exitOptionsButton_lang};
options.container.optionsSoon = new Label(game.width/2, game.height/2 - 15, (window as any).globals.optionsSoon_lang, "center");
options.container.optionsSoon.textHeight = 100;
options.container.optionsSoon.updateLanguage = function(){this.text=(window as any).globals.optionsSoon_lang};
{ // onClick events for the TextButtons
  game.container.backToMenu_opt.onclick = function () {
    game.visible = false;
    mainMenu.visible = true;
    options.visible = false;
  };
  mainMenu.container.playGame_opt.onclick = function () {
    game.visible = true;
    mainMenu.visible = false;
    options.visible = false;
    game.container.player.restart();
  };
  mainMenu.container.options_opt.onclick = function () {
    game.visible = false;
    mainMenu.visible = false;
    options.visible = true;
  };
  mainMenu.container.download_opt.onclick = function () {
    download('https://www.dropbox.com/s/0stlwtfyvryq57w/Jogo%20da%20Bolinha.rar?dl=1');
  };
  options.container.exitOptions_opt.onclick = function () {
    game.visible = false;
    mainMenu.visible = true;
    options.visible = false;
  };
}

//debug
var debugMode = false;
var debugTax = 6;
var debugFrameRate: number;
var debugTimer: number;

// (window as any).globals.w = new JSWindow(700, 500);
// (window as any).globals.w.visible = true;
// (window as any).globals.w.show();

//var gameState = "mainMenu"; /*	'mainMenu'	'game'	'options'	*/
/*------------------------------------LOOP-----------------------------------------*/  
AnimationLOOP(function(){
  /*rect.draw();*/
  game.draw();
  mainMenu.draw();
  options.draw();
  // (window as any).globals.w.draw();
  // (window as any).globals.w.updatePos();
  /*switch (gameState) {
  case 'game':
    lava.draw();
    player.drawText();
    player.checkPos();
    player.draw();
    player.updatePos();
    backToMenu_opt.draw();
    backToMenu_opt.updateEvents();
    backToMenu_opt.text = backToMenu_lang;

    player.delayStop();
    break;
  case 'mainMenu':
    rect.color = "#2f538e";
    playGame_opt.draw();
    playGame_opt.updateEvents();
    playGame_opt.text = playGameOption_lang;
    options_opt.draw();
    options_opt.updateEvents();
    options_opt.text = optionsOption_lang;
    download_opt.draw();
    download_opt.updateEvents();
    download_opt.text = downloadOption_lang;
    break;
  case 'options':
    optionsSoon.draw();
    optionsSoon.text = optionsSoon_lang;
    exitOptions_opt.draw();
    exitOptions_opt.updateEvents();
    exitOptions_opt.text = exitOptionsButton_lang;
    break;
  }*/
  
  drawDebug();
});

/*------------------------------------FUNCTIONS------------------------------------*/
function drawDebug() { /* collapseit */
  if (!document.hasFocus()) {
    setKeyStates({
      upIsDown: false,
      leftIsDown: false,
      rightIsDown: false,
    })
  }
  if (debugMode) {
    c.fillStyle = "white";
    c.font = "bold 15px Tahoma";
    debugTax++;
    if (debugTax > 6) {
      debugTax = 0;
      debugFrameRate = (new Date().getTime()) - debugTimer;
    }
    c.fillText(String(debugFrameRate), game.width - 40, 40);
  }
  debugTimer = new Date().getTime();
}

export { game };