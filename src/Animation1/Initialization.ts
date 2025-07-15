import { backToIndex, element, getCookie, resizeCanvas } from "../JSTools";
import { setLanguage } from "../languages/Animation1";

// <select> ONLOAD=
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
(window as any).globals.canvas = canvas;

var speedBox = element("speedBox") as HTMLInputElement;
var randomPosition = element("randomPosition") as HTMLButtonElement;
var randomSpeed = element("randomSpeed") as HTMLButtonElement;
var ballsBox = element("ballsBox") as HTMLInputElement;

const toolBarHeight = (window as any).globals.toolBarHeight;

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

ballsBox!.value = String(1);
element("toolBar")!.style.height = toolBarHeight + "px";
canvas.style.top = toolBarHeight + "px";

setLanguage(getCookie("language") as "pt" | "en");

element("backToIndex")!.onclick = backToIndex;
element('reloadButton')!.onclick = () =>
  (location.reload as (forceGet: boolean) => void)(true);
dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");

export { speedBox, randomPosition, randomSpeed, ballsBox };