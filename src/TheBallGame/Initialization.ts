import { element, resizeCanvas, getCookie, backToIndex, download } from "../JSTools";
import { setLanguage } from "../../resources/languages/TheBallGame";
import '../globals';
import { onresize } from "./Events";

// <select> "ONLOAD"=
var dropdownLanguage = element('dropdownLanguage') as HTMLSelectElement;
if (getCookie('language') != undefined && getCookie('language') != '') {
  dropdownLanguage.value = getCookie('language');
} else {
  dropdownLanguage.value = 'pt';
}

const canvas = element("canvas") as HTMLCanvasElement;
if (canvas == null) {
  throw new Error("Canvas is null.");
}

//Creating variables for the elements...
const background = element("background")!;

document.body.onresize = onresize;
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", onresize);
} else {
  // `DOMContentLoaded` has already fired
  onresize();
}

setLanguage(getCookie("language") as "pt" | "en");

//toolBar
element("backToIndex")!.onclick = backToIndex;
element('reloadButton')!.onclick = () =>
  (location.reload as (forceGet: boolean) => void)(true);
element('downloadGame')!.onclick = () =>
  download('https://www.dropbox.com/s/0stlwtfyvryq57w/Jogo%20da%20Bolinha.rar?dl=1');
dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");


//Setting values...
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
if (ctx == null) {
  throw new Error("Canvas context is null.");
}
const toolBar = element("toolBar");
if (toolBar) toolBar.style.height = (window as any).globals.toolBarHeight + "px";
canvas.style.top = (window as any).globals.toolBarHeight + "px";
background.style.width = innerWidth + "px";
background.style.height = innerHeight + "px";
ctx.lineJoin = "round";
//Loading Audio...
var click = new Audio("resources/Click.wav");
var bellRing = new Audio("resources/BellRing.wav");
//Resizing Canvas...
resizeCanvas();

export { canvas, ctx as c, click, bellRing, background };