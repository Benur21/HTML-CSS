import { AnimationLOOP, Rectangle, resizeCanvas } from "../JSTools";
import { Ball } from "./Classes";
import { ballsBox, speedBox } from "./Initialization";

//RECT THINGS
var rect = new Rectangle(50,50,840,483);
rect.outlineWidth = 2;
rect.outlinePosition = "center";
rect.doTranslate = true;

const canvas = (window as any).globals.canvas as HTMLCanvasElement;

canvas.width = rect.x * 2 + rect.width;
canvas.height = rect.y * 2 + rect.height;
//BALL THINGS
var balls: Array<Ball> = [];
(window as any).globals.numberOfBalls = ballsBox.value;
for (let i = 0; i < (window as any).globals.numberOfBalls; i++) {
  balls[i] = new Ball(0, 0, i);
}
for (let i = 0; i < balls.length; i++) {
  balls[i].goToRandomPos(rect);
}
setSpeed(balls[0].speed);
/*------------------------------------LOOP-----------------------------------------*/
resizeCanvas();
AnimationLOOP(function(){
  rect.draw();
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].updatePos(balls, rect);
  }
});
/*------------------------------------FUNCTIONS------------------------------------*/
function setSpeed(newSpeed: number) {
  // MAKE SURE THAT SPEED IS BETWEEN ITS MAX AND MIN
  if (newSpeed > Number(speedBox.max)) {
    newSpeed = Number(speedBox.max);
  }
  if (newSpeed < Number(speedBox.min)) {
    newSpeed = Number(speedBox.min);
  }
  newSpeed = Math.floor(newSpeed * 10) / 10;
  // END SPEED HANDLING

  speedBox.value = String(newSpeed);
  for (let n = 0; n < balls.length; n++) {
    balls[n].setSpeed(newSpeed);
  }
}

export { rect, balls, setSpeed };
