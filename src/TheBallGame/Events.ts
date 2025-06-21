import { resizeCanvas } from "../JSTools";
import { background, canvas } from "./Initialization";
import { game } from "./Main";

var lastKey;
var upIsDown = false;
var leftIsDown = false;
var rightIsDown = false;
var downIsDown = false;
document.body.onkeydown = function (event) {
  lastKey = event.which || event.keyCode || event.code;
  if (lastKey === 38 || lastKey === 87) {
    upIsDown = true;
  }
  if (lastKey === 37 || lastKey === 65) {
    leftIsDown = true;
  }
  if (lastKey === 39 || lastKey === 68) {
    rightIsDown = true;
  }
  if (lastKey === 40 || lastKey === 83) {
    downIsDown = true;
  }
};
document.body.onkeyup = function (event) {
  lastKey = event.which || event.keyCode || event.code;
  if (lastKey === 38 || lastKey === 87) {
    upIsDown = false;
  }
  if (lastKey === 37 || lastKey === 65) {
    leftIsDown = false;
  }
  if (lastKey === 39 || lastKey === 68) {
    rightIsDown = false;
  }
  if (lastKey === 40 || lastKey === 83) {
    downIsDown = false;
  }
};
var mouseX: number, mouseY: number, mouseIsDown: boolean;
document.body.onmousemove = function (event) {
  mouseX =
    (event.clientX -
      Number(canvas.style.left.replace('px', '')) -
      game.x * (window as any).globals.canvasScale) /
    (window as any).globals.canvasScale;
  mouseY =
    (event.clientY -
      Number(canvas.style.top.replace('px', '')) -
      game.y * (window as any).globals.canvasScale) /
    (window as any).globals.canvasScale;
};
document.body.onmousedown = function () {
  mouseIsDown = true;
};
document.body.onmouseup = function () {
  mouseIsDown = false;
};
document.body.onresize = onresize;
function onresize() {
  resizeCanvas();
  background.style.width = innerWidth + "px";
  background.style.height = innerHeight + "px";
}

function setKeyStates(states: {
  upIsDown?: boolean;
  leftIsDown?: boolean;
  rightIsDown?: boolean;
  downIsDown?: boolean;
}) {
  if (typeof states.upIsDown === "boolean") upIsDown = states.upIsDown;
  if (typeof states.leftIsDown === "boolean") leftIsDown = states.leftIsDown;
  if (typeof states.rightIsDown === "boolean") rightIsDown = states.rightIsDown;
  if (typeof states.downIsDown === "boolean") downIsDown = states.downIsDown;
}

export {
  mouseX,
  mouseY,
  mouseIsDown,
  lastKey,
  upIsDown,
  leftIsDown,
  rightIsDown,
  downIsDown,
  setKeyStates,
  onresize,
};
