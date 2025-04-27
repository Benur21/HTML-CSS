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

document.body.onresize = resizeCanvas;
document.body.onload = resizeCanvas;

//toolBar
element("backToIndex")!.onclick = backToIndex;
element('reloadButton')!.onclick = () =>
  (location.reload as (forceGet: boolean) => void)(true);
dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");

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

