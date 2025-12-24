import { setMouseProvider } from "../JSTools";

const canvas = (window as any).globals.canvas as HTMLCanvasElement;

let mouseX: number, mouseY: number, mouseIsDown: boolean;
document.body.onmousemove = function (event) {
  // Compute mouse coordinates in canvas drawing coordinate space.
  // Use getBoundingClientRect to account for page layout and CSS scaling.
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  // Scale from CSS pixels to canvas pixels (handles HiDPI and CSS sizing).
  mouseX = x * (canvas.width / rect.width);
  mouseY = y * (canvas.height / rect.height);
};
document.body.onmousedown = function () {
  mouseIsDown = true;
};
document.body.onmouseup = function () {
  mouseIsDown = false;
};


setMouseProvider(() => ({ x: mouseX, y: mouseY, isDown: mouseIsDown }));
