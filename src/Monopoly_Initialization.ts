import { Place } from "./Monopoly_Classes";
import { element, resizeCanvas, getCookie } from "./JSTools";
import { setLanguage } from "../resources/languages/Monopoly";

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
const ctx = canvas.getContext("2d");
const canvasPadding = 10;
resizeCanvas();
const places: Place[] = [];

setLanguage(getCookie("language") as "pt" | "en")

export { canvas, ctx as c, canvasPadding, places };

