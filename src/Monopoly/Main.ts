import { canvasPadding } from './Initialization';
import { Board } from './Classes';
import { AnimationLOOP, GameState, JSWindow, Label, JSImage, TextButton } from '../JSTools';

const canvas = (window as any).globals.canvas;

const game = new GameState();
game.x = canvasPadding;
game.y = canvasPadding;
game.width = canvas.width - canvasPadding * 2;
game.height = canvas.height - canvasPadding * 2;
game.color = "#B0B3B7";
game.outlinePosition = "outer";
game.showIndex = 1;
game.visible = true;

const startWindow = new JSWindow(1300, 900);
game.container.startWindow = startWindow;
startWindow.color = "#263599";
startWindow.showIndex = 100;
startWindow.show();

(window as any).globals.startWindow = startWindow;

startWindow.container.closeButton = new TextButton(startWindow.width-20, 20, "X", "center", 20, 5);
startWindow.container.closeButton.updateLanguage = function() {this.text="X"};
startWindow.container.closeButton.onclick = () => {
  startWindow.hide();
}

startWindow.container.welcomeText = new Label(650, 450, "Welcome! 😀", "center");
startWindow.container.welcomeText.updateLanguage = function(){this.text="Bem vindo(a)!\nBrevemente aqui será\npossível jogar ao"};

startWindow.container.txt2 = new Label(650, 550+10, "Welcome! 😀", "center");
startWindow.container.txt2.updateLanguage = function(){this.text="                                          !"};

startWindow.container.img = new JSImage(650, 300, "/resources/HTML5.png", "middle", "middle");
startWindow.container.img.scale = 0.3;

startWindow.container.img2 = new JSImage(650, 550, "/resources/Monopoly.svg", "middle", "middle");
startWindow.container.img2.scale = 0.3;

game.container.board = new Board(0, 0);
AnimationLOOP(function(){
  game.draw();
});