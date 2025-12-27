import { canvasPadding } from './Initialization';
import { Board } from './Classes';
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


game.container.board = new Board(0, 0);
AnimationLOOP(function(){
  game.draw();
});