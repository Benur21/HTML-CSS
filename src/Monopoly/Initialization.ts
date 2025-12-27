import { Place } from "./Classes";
import { element, resizeCanvas, getCookie, backToIndex } from "../JSTools";
import { setLanguage } from "../languages/Monopoly";
import '../globals';

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

document.body.onresize = resizeCanvas;
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    setLanguage(getCookie("language") as "pt" | "en");
  });
} else {
  // `DOMContentLoaded` has already fired
  resizeCanvas();
  setLanguage(getCookie("language") as "pt" | "en");
}

//toolBar
element("backToIndex")!.onclick = backToIndex;
element('reloadButton')!.onclick = () =>
  (location.reload as (forceGet: boolean) => void)(true);
dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
if (ctx == null) {
  throw new Error("Canvas context is null.");
}
const canvasPadding = 10;
resizeCanvas();

export { canvasPadding };

