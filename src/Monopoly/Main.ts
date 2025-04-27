import { canvas, canvasPadding, places } from './Initialization';
import { Place, JSWindow } from './Classes';
import { AnimationLOOP, Rectangle } from '../JSTools';

var gameBoard = new Rectangle(canvasPadding, canvasPadding, canvas.width-canvasPadding*2, canvas.height-canvasPadding*2);
gameBoard.doTranslate = true; //Space 980x980
gameBoard.color = "#B0B3B7";
gameBoard.outlinePosition = "outer";


const startWindow = new JSWindow(20,20,gameBoard.width-40,gameBoard.height-40,"Start Window");
// @ts-ignore
window.startWindow = startWindow;
startWindow.visible = true;
startWindow.color = "#263599";

var pathWidth = 195*canvas.width/1000;
var normalPlacesStep = (gameBoard.width-pathWidth*2)/5;

for (let i = 0; i < 24; i++) { //Creating and Moving Places
  switch (true) { //Places are 100x195
    //Corner Places
    case (i==0):
      places[i] = new Place(gameBoard.width-pathWidth, gameBoard.height-pathWidth, pathWidth, pathWidth, "cornerA");
      places[i].color = "#FF793F";
      break;
    case (i==6):
      places[i] = new Place(0, gameBoard.height-pathWidth, pathWidth, pathWidth, "cornerB");
      places[i].color = "#FF793F";
      break;
    case (i==12):
      places[i] = new Place(0, 0, pathWidth, pathWidth, "cornerC");
      places[i].color = "#FF793F";
      break;
    case (i==18):
      places[i] = new Place(gameBoard.width-pathWidth, 0, pathWidth, pathWidth, "cornerD");
      places[i].color = "#FF793F";
      break;
    //Normal Places
    case (i>=1&&i<=5):
      places[i] = new Place(gameBoard.width-pathWidth-normalPlacesStep*(i%6), gameBoard.height-pathWidth, normalPlacesStep, pathWidth, "normalA"+(i%6));
      places[i].color = "#95CCF9";
      break;
    case (i>=7&&i<=11):
      places[i] = new Place(0, gameBoard.height-pathWidth-normalPlacesStep*(i%6), pathWidth, normalPlacesStep, "normalB"+(i%6));
      places[i].color = "#95CCF9";
      break;
    case (i>=13&&i<=17):
      places[i] = new Place(pathWidth+normalPlacesStep*((i%6)-1), 0, normalPlacesStep, pathWidth, "normalC"+(i%6));
      places[i].color = "#95CCF9";
      break;
    case (i>=19&&i<=23):
      places[i] = new Place(gameBoard.width-pathWidth, pathWidth+normalPlacesStep*((i%6)-1), pathWidth, normalPlacesStep, "normalD"+(i%6));
      places[i].color = "#95CCF9";
      break;
  }
  places[i].outlinePosition = "center";
}

AnimationLOOP(function(){
  gameBoard.draw();
  for (let i=0;i<places.length;i++) {
    places[i].draw();
  }
  var windows = JSWindow.getAllInstances().sort(function(a,b){return a.showIndex-b.showIndex});
  for (let i=0;i<windows.length;i++) {
    windows[i].draw();
  }
});