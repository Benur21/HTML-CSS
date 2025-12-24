import { canvasPadding } from './Initialization';
import { Place } from './Classes';
import { AnimationLOOP, GameState, JSWindow, TextButton } from '../JSTools';

const canvas = (window as any).globals.canvas;

const game = new GameState();
game.x = canvasPadding;
game.y = canvasPadding;
//Space 980x980
game.width = canvas.width - canvasPadding * 2;
game.height = canvas.height - canvasPadding * 2;
game.color = "#B0B3B7";
game.outlinePosition = "outer";
game.showIndex = 1;
game.visible = true;

const startWindow = new JSWindow(game.width-40,game.height-40);
game.container.startWindow = startWindow;
startWindow.color = "#263599";
startWindow.showIndex = 100;
startWindow.show();

(window as any).globals.startWindow = startWindow;

startWindow.container.closeButton = new TextButton(game.width-60, 20, "X", "center", 20, 5);
startWindow.container.closeButton.updateLanguage = function() {this.text="X"};
startWindow.container.closeButton.onclick = () => {
  startWindow.hide();
}

var pathWidth = 195*canvas.width/1000;
var normalPlacesStep = (game.width-pathWidth*2)/5;

for (let i = 0; i < 24; i++) { //Creating and Moving Places
  switch (true) { //Places are 100x195
  //Corner Places
  case (i==0):
    game.container[i] = new Place(game.width-pathWidth, game.height-pathWidth, pathWidth, pathWidth, "cornerA");
    game.container[i].color = "#FF793F";
    break;
  case (i==6):
    game.container[i] = new Place(0, game.height-pathWidth, pathWidth, pathWidth, "cornerB");
    game.container[i].color = "#FF793F";
    break;
  case (i==12):
    game.container[i] = new Place(0, 0, pathWidth, pathWidth, "cornerC");
    game.container[i].color = "#FF793F";
    break;
  case (i==18):
    game.container[i] = new Place(game.width-pathWidth, 0, pathWidth, pathWidth, "cornerD");
    game.container[i].color = "#FF793F";
    break;
  //Normal Places
  case (i>=1&&i<=5):
    game.container[i] = new Place(game.width-pathWidth-normalPlacesStep*(i%6), game.height-pathWidth, normalPlacesStep, pathWidth, "normalA"+(i%6));
    game.container[i].color = "#95CCF9";
    break;
  case (i>=7&&i<=11):
    game.container[i] = new Place(0, game.height-pathWidth-normalPlacesStep*(i%6), pathWidth, normalPlacesStep, "normalB"+(i%6));
    game.container[i].color = "#95CCF9";
    break;
  case (i>=13&&i<=17):
    game.container[i] = new Place(pathWidth+normalPlacesStep*((i%6)-1), 0, normalPlacesStep, pathWidth, "normalC"+(i%6));
    game.container[i].color = "#95CCF9";
    break;
  case (i>=19&&i<=23):
    game.container[i] = new Place(game.width-pathWidth, pathWidth+normalPlacesStep*((i%6)-1), pathWidth, normalPlacesStep, "normalD"+(i%6));
    game.container[i].color = "#95CCF9";
    break;
  }
  game.container[i].showIndex = 50;
  game.container[i].outlinePosition = "center";
}

AnimationLOOP(function(){
  game.draw();
});