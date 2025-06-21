import { c as ctx, canvas } from "./Monopoly/Initialization";
import './globals';

/*--------------------------------------Function-1------------------------------------------------------------------*/
function backToIndex(){ /*collapse(1,313)*/
  var currentURL = location.href;
  location.href = currentURL.slice(0, currentURL.lastIndexOf("/")) + "/index.html";
}
/*--------------------------------------Function-2------------------------------------------------------------------*/
function element(id: string){
  return document.getElementById(id);
}
/*--------------------------------------Function-3------------------------------------------------------------------*/
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*--------------------------------------Function-4------------------------------------------------------------------*/
function resizeCanvas(){
  //Get Window Ratio
  (window as any).globals.windowRatio = window.innerWidth / (window.innerHeight - (window as any).globals.toolBarHeight);
  //Get Canvas Ratio
  (window as any).globals.canvasRatio = canvas.width / canvas.height;
  if ((window as any).globals.canvasRatio > (window as any).globals.windowRatio) {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = "";
    canvas.style.left = "0px";
    canvas.style.top = ((window.innerHeight - (window as any).globals.toolBarHeight) / 2 - (window.innerWidth / (window as any).globals.canvasRatio) / 2 + (window as any).globals.toolBarHeight) + "px";
    (window as any).globals.canvasScale = Number(canvas.style.width.replace("px", "")) / canvas.width;
  } else if ((window as any).globals.canvasRatio <= (window as any).globals.windowRatio) {
    canvas.style.width = "";
    canvas.style.height = window.innerHeight - (window as any).globals.toolBarHeight + "px";
    canvas.style.left = (window.innerWidth / 2 - ((window.innerHeight - (window as any).globals.toolBarHeight) * (window as any).globals.canvasRatio) / 2) + "px";
    canvas.style.top = (window as any).globals.toolBarHeight + "px";
    (window as any).globals.canvasScale = Number(canvas.style.height.replace("px", "")) / canvas.height;
  }
}
/*--------------------------------------Function-5------------------------------------------------------------------*/
function toRadian(deg: number) {
  return deg * Math.PI/180;
}
/*--------------------------------------Function-6------------------------------------------------------------------*/
function toDegree(rad: number) {
  return rad * 180 / Math.PI;
}
/*--------------------------------------Function-7------------------------------------------------------------------*/
function random(min: number, max: number, exp: number) {
  let rand = Math.random();
  rand = rand * (max - min) + min;
  if (exp < 1 && exp > 0) {
    rand = rand * invertFraction(exp, 1);
  } else {
    rand = rand / exp;
  }
  rand = Math.round(rand);
  if (exp < 1 && exp > 0) {
    return rand / invertFraction(exp, 1);
  } else {
    return rand * exp;
  }
}
/*--------------------------------------Function-8------------------------------------------------------------------*/
function invertFraction(numerator: number, denominator: number){
  return denominator/numerator;
}
/*--------------------------------------Function-8------------------------------------------------------------------*/
function distance(x1: number,y1: number,x2: number,y2: number){
  var difX = x1-x2;
  var difY = y1-y2;
  return Math.sqrt(Math.abs(difX*difX+difY*difY));
}
/*--------------------------------------Function-9------------------------------------------------------------------*/
function download(url: string){
  var downloadFrame = document.createElement("iframe");
  downloadFrame.height = "0px";
  downloadFrame.width = "0px";
  downloadFrame.src = url;
  document.body.appendChild(downloadFrame);
  setTimeout(function(){removeElement(downloadFrame)},10000);
}
/*--------------------------------------Function-10-----------------------------------------------------------------*/
function removeElement(elem: HTMLElement) {
  elem.parentNode!.removeChild(elem);
}
/*--------------------------------------Function-11-----------------------------------------------------------------*/
function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/*--------------------------------------Function-12-----------------------------------------------------------------*/
Function.prototype.getAllInstances = function () {
  //getAllInstances (!IMPORTANT!)
  var arr = [];
  for (let property in window) {
    if (window[property] instanceof this){
      arr.push(window[property]);
    }
  }
  return arr;
}
/*--------------------------------------Function-13-----------------------------------------------------------------*/
Object.prototype.getAllProperties = function () {
  //getAllProperties (!IMPORTANT!)
  var arr = [];
  for (let property in this) {
    if (
      !(this as { [a: string]: any })[property]
        .toString()
        .includes('getAllInstances') &&
      !(this as { [a: string]: any })[property]
        .toString()
        .includes('getAllProperties')
    ) {
      arr.push((this as { [a: string]: any })[property]);
    }
  }
  return arr;
}
/*--------------------------------------Function-14-----------------------------------------------------------------*/
Array.prototype.getControlByName = function (name: string) { //Ver se é mesmo necessário, não deve ser, então é pra apagar.
  return this.find(function(control){return control.name.toLowerCase() == name.toLowerCase()})
}
/*--------------------------------------Function-15-----------------------------------------------------------------*/
//Function.prototype.callIndex = 0;
/*--------------------------------------Function-16-----------------------------------------------------------------*/
var functionSaved = false;
var functionSave: () => void;
function AnimationLOOP (funct: () => void) {
  if (!functionSaved) {
    functionSave = funct;
    functionSaved = true;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  functionSave();
  requestAnimationFrame(AnimationLOOP as any);
}
/*--------------------------CLASSES-----Function-17-----------------------------------------------------------------*/
var transparent = "rgba(0,0,0,0)";
class Control {
  x: number;
  y: number;
  initX: number;
  initY: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  visible: boolean;
  showIndex: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.initX = x; //[Inserir razão destes dois]
    this.initY = y;
    this.color = transparent;
    this.outlineColor = "black";
    this.outlineWidth = 2;
    this.visible = true;
    this.showIndex = 0; //Lower is drawn first, in back.
    //this.name = ""; //Ver função getControlByName
    
    // @ts-ignore
    window[this.constructor.name + Math.random() * 10**18] = this;
  }
  
  /**
   * show
   */
  public show() {
    this.visible = true;
  }
  public hide() {
    this.visible = false;
  };
  
}
/*--------------------------------------Function-18-----------------------------------------------------------------*/
class Rectangle extends Control {
  width: number;
  height: number;
  outlinePosition: string;
  doTranslate: boolean;
  doPattern: string;
  constructor (x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.outlineWidth = 4;
    this.outlinePosition = "center";
    this.doTranslate = false;
    this.doPattern = "";
  }
  
  public draw() {
    if (this.visible) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineWidth;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.drawParts_outline();
      this.drawParts_patterns();
      if (this.doTranslate) {
        ctx.translate(this.x, this.y);
      }
    }
  }
  
  drawParts_outline() {
    switch (this.outlinePosition.toLowerCase()) {
    case "inner":
      ctx.strokeRect(this.x + this.outlineWidth / 2, this.y + this.outlineWidth / 2, this.width - this.outlineWidth, this.height - this.outlineWidth);
      break;
    case "center":
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      break;
    case "outer":
      ctx.strokeRect(this.x - this.outlineWidth / 2, this.y - this.outlineWidth / 2, this.width + this.outlineWidth, this.height + this.outlineWidth);
      break;
    }
  }
  
  drawParts_patterns() {
    switch (this.doPattern.toLowerCase()) {
    case "diagonals":
      ctx.beginPath();
      var x1 = this.x;
      var y1 = this.y;
      var x2 = this.x;
      var y2 = this.y;
      var increment = 6;
      var count = 0;
      while (!(x1 == this.x + this.width)) {
        x1++;
        y2++;
        count++;
        if (count == increment) {
          count = 0;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
      while (!(y2 == this.y + this.height)) {
        y1++;
        y2++;
        count++;
        if (count == increment) {
          count = 0;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
      while (!(y1 == this.y + this.height)) {
        y1++;
        x2++;
        count++;
        if (count == increment) {
          count = 0;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
      ctx.stroke();
      this.x = this.initX;
      this.y = this.initY;
      break;
    } //
  };
}
/*--------------------------------------Function-19-----------------------------------------------------------------*/
function Circle(x: number, y: number, radius: number) {
  Control.call(this, x, y); //Inherit from Control
  this.radius = radius;
}
Circle.prototype = Object.create(Control.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.draw = function () {
  if (this.visible) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.outlineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
Circle.prototype.goTo = function (newX: number, newY: number) {
  this.x = newX + this.radius;
  this.y = newY + this.radius;
};
/*--------------------------------------Function-20-----------------------------------------------------------------*/
class Label extends Control {
  text: string;
  textHeight: number;
  fontFamily: string;
  xAlign: "start" | "center";
  yAlign: CanvasTextBaseline;
  constructor(x: number, y: number, text: string, xAlign: "start" | "center") {
    super(x, y); //Inherit from Control
    this.text = text;
    this.color = "white";
    this.outlineColor = transparent;
    this.textHeight = 30;
    this.fontFamily = "Tahoma";
    this.xAlign = xAlign; //Horizontal Aligning
    this.yAlign = "middle"; //Vertical Aligning
  }
  updateContext () {
    if (this.visible) {
      ctx.fillStyle = this.color;
      ctx.textAlign = this.xAlign;
      ctx.textBaseline = this.yAlign;
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineWidth;
      ctx.font = "bold " + this.textHeight + "px " + this.fontFamily;
    }
  }
  draw () {
    if (this.visible) {
      /*
      var something;
      if (this.xAlign) {
        something = this.x - c.measureText(this.text).width / 2;
      } else {
        something = this.x;
      }*/ //Substituido por c.textAlign
      
      ctx.strokeText(this.text, this.x, this.y);
      ctx.fillText(this.text, this.x, this.y);
    }
  };
  updateLanguage () {
    this.text = "<!ERROR!>";
  };
}
/*--------------------------------------Function-20-----------------------------------------------------------------*/
function Button(x: number, y: number, width: number, height: number, text: string) {
  Rectangle.call(this, x, y, 50, 81); 
  this.label = new Label(x, y, text, 'center');
  this.label.outlineWidth = 6;
  this.label.outlineColor = "black";
  this.autoResize = "true";
  this.color = "#3e7fe8";
}
Button.prototype = Object.create(Rectangle.prototype);
Button.prototype.constructor = Button;
Button.prototype.draw = function () {
  if (this.visible) {
    //RECTANGLE DRAWING;
    //Configs:
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.outlineWidth;
    ctx.strokeStyle = this.outlineColor;
    //AutoResize:
    var textWidth = ctx.measureText(this.label.text).width;
    var textHeight = this.label.textHeight;
    if (this.autoResize) {
      if (this.width < textWidth) {
        this.width = textWidth;
      }
      if (this.height < textHeight) {
        this.height = textHeight + 20;
      }
    }
    //Updating init coordinates:
    this.initX = this.x;
    this.initY = this.y;
    //Centering Button:
    this.x = this.initX-this.width/2;
    this.y = this.initY-this.height/2;
    //Filling Rectangle:
    ctx.fillRect(this.x, this.y, this.width, this.height);
    //Stroke Drawing:
    this.drawParts_outline();
    //Recovering coordinates:
    this.x = this.initX;
    this.y = this.initY;
    //Rectangle Done.
    
    //TEXT DRAWING;
    //Updating label coordinates to be the same as the button ones:
    this.label.x = this.x;
    this.label.y = this.y;
    //Drawing Text:
    this.label.draw();
    //Label Done.
  }
}
Button.prototype.onhover = function () {
  if (this.xAlign == "center") { //Para sincronizar o hovering com os align, e para verificar se há hovering.
    var hovering1 = mouseX > this.x - ctx.measureText(this.text).width / 2 - this.hoveringHeightIncrement;
    var hovering2 = mouseX < this.x + ctx.measureText(this.text).width / 2 + this.hoveringHeightIncrement;
    var hovering3 = mouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
    var hovering4 = mouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
  } else if (this.xAlign == "start") {
    var hovering1 = mouseX > this.x - this.hoveringHeightIncrement;
    var hovering2 = mouseX < this.x + ctx.measureText(this.text).width + this.hoveringHeightIncrement;
    var hovering3 = mouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
    var hovering4 = mouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
  }
  this.internal_hovered = hovering1 && hovering2 && hovering3 && hovering4;
  if (this.internal_hovered) {
    if (!this.internal_mouseEnter) {
      this.internal_mouseEnter = true;
      this.textHeight += this.hoveringHeightIncrement;
    }
    this.internal_mouseLeave = false;
    this.outlineColor = "black";
  } else {
    if (!this.internal_mouseLeave) {
      this.internal_mouseLeave = true;
      this.textHeight -= this.hoveringHeightIncrement;
    }
    this.internal_mouseEnter = false;
    this.internal_waitingForRelease = false;
    this.outlineColor = transparent;
  }
};

export {
  backToIndex,
  element,
  getRandomColor,
  windowRatio,
  canvasRatio,
  canvasScale,
  resizeCanvas,
  toRadian,
  toDegree,
  random,
  invertFraction,
  distance,
  download,
  removeElement,
  getCookie,
  AnimationLOOP,
  transparent,
  Control,
  Rectangle,
  Circle,
  Label,
  Button,
};





