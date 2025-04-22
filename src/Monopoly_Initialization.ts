import { Place } from "./Monopoly_Classes";

const canvas = element("canvas") as HTMLCanvasElement;
if (canvas == null) {
  throw new Error("Canvas is null.");
  process.exit();
}
const ctx = canvas.getContext("2d");
const canvasPadding = 10;
resizeCanvas();
const places: Place[] = [];

export { canvas, ctx as c, canvasPadding, places };

