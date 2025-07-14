import { backToIndex, element, getCookie, getRandomColor, random } from "../JSTools";
import { setLanguage } from "../languages/Animation2";

// <select> ONLOAD=
var dropdownLanguage = element('dropdownLanguage') as HTMLSelectElement;
if (getCookie('language') != undefined && getCookie('language') != '') {
  dropdownLanguage.value = getCookie('language');
} else {
  dropdownLanguage.value = 'pt';
}


element("backToIndex")!.onclick = backToIndex;
element('reloadButton')!.onclick = () =>
  (location.reload as (forceGet: boolean) => void)(true);
dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");


var width = window.innerWidth;
var height = window.innerHeight;
const canvas = element("myCanvas") as HTMLCanvasElement;
if (canvas == null) {
  throw new Error("Canvas is null.");
}

var c = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = innerWidth;
canvas.height = innerHeight;

var memCanvas = document.createElement('canvas');
var memD = memCanvas.getContext('2d');

document.body.onresize = resizeCanvas;
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    //Define language
    setLanguage(getCookie("language") as "pt" | "en");
  });
} else {
  // `DOMContentLoaded` has already fired
  resizeCanvas();
  //Define language
  setLanguage(getCookie("language") as "pt" | "en");
}

function resizeCanvas() {
  if (canvas) {
    memCanvas.width = canvas.width;
    memCanvas.height = canvas.height;
    if (memD) {
      memD.drawImage(canvas, 0, 0);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.drawImage(memCanvas, 0, 0);
  }
}

window.requestAnimationFrame(loop);
function loop() {
  width = window.innerWidth;
  height = window.innerHeight;
  drawRandomPixel(random(0, width, 1), random(0, height, 1));
  window.requestAnimationFrame(loop);
}

function drawRandomPixel(x: number, y: number) {
  c.beginPath();
  c.strokeStyle = getRandomColor();
  c.moveTo(x, y);
  c.lineTo(x + 1, y + 1);
  c.stroke();
}