import { Place } from "./Classes";
import { element, resizeCanvas, getCookie, backToIndex } from "../JSTools";
import { setLanguage } from "../../resources/languages/Monopoly";

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

document.body.onresize = resizeCanvas;
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", resizeCanvas);
} else {
  // `DOMContentLoaded` has already fired
  resizeCanvas();
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
const places: Place[] = [];

setLanguage(getCookie("language") as "pt" | "en")

export { canvas, ctx as c, canvasPadding, places };

