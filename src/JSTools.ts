import './globals';
let mouseProvider: (() => { x: number; y: number; isDown: boolean }) | null = null;
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
  const canvas = (window as any).globals.canvas;
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
  const canvas = (window as any).globals.canvas;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  if (!functionSaved) {
    functionSave = funct;
    functionSaved = true;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transforms
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
  parent?: Control;
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
  doPattern: string;
  constructor (x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.outlineWidth = 4;
    this.outlinePosition = "center";
    this.doPattern = "";
  }
  
  public draw() {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    if (this.visible) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineWidth;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.drawParts_outline();
      this.drawParts_patterns();
    }
  }
  
  drawParts_outline() {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
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
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
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
class Circle extends Control {
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y); // Inherit from Control
    this.radius = radius;
  }

  draw() {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
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

  goTo(newX: number, newY: number) {
    this.x = newX + this.radius;
    this.y = newY + this.radius;
  }
}
/*--------------------------------------Function-20-----------------------------------------------------------------*/
class Label extends Control {
  text: string;
  textHeight: number;
  fontFamily: string;
  xAlign: "start" | "center";
  yAlign: "middle" | "top";
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
  /**
   * Call before Lable.draw
   */
  updateContext () {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    if (this.visible) {
      ctx.fillStyle = this.color;
      ctx.textAlign = this.xAlign;
      ctx.textBaseline = this.yAlign;
      ctx.strokeStyle = this.outlineColor;
      ctx.lineWidth = this.outlineWidth;
      ctx.font = "bold " + this.textHeight + "px " + this.fontFamily;
    }
  }
  /**
   * Call after Label.updateContext
   */
  draw () {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    if (this.visible) {
      // support multi-line text
      const lines = this.text.split(/\r?\n/);
      const lineHeight = this.textHeight * 1.2;

      // Use 'middle' baseline for consistent vertical centering per line
      if (this.yAlign === "middle") ctx.textBaseline = "middle"
      else if (this.yAlign === "top") ctx.textBaseline = "top";

      // Compute starting Y so multi-line block is centered when yAlign === "middle"
      let startY: number;
      if (this.yAlign === "middle") {
        startY = this.y - ((lines.length - 1) / 2) * lineHeight;
      } else {
        // fallback: align first line at this.y
        startY = this.y;
      }

      for (let i = 0; i < lines.length; i++) {
        const lineY = startY + i * lineHeight;
        ctx.strokeText(lines[i], this.x, lineY);
        ctx.fillText(lines[i], this.x, lineY);
      }
    }
  };
  updateLanguage () {
    this.text = "<!ERROR!>";
  };
}
/*--------------------------------------Function-20-----------------------------------------------------------------*/
// function Button(x: number, y: number, width: number, height: number, text: string) {
//   Rectangle.call(this, x, y, 50, 81); 
//   this.label = new Label(x, y, text, 'center');
//   this.label.outlineWidth = 6;
//   this.label.outlineColor = "black";
//   this.autoResize = "true";
//   this.color = "#3e7fe8";
// }
// Button.prototype = Object.create(Rectangle.prototype);
// Button.prototype.constructor = Button;
// Button.prototype.draw = function () {
//   const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
  
//   if (this.visible) {
//     //RECTANGLE DRAWING;
//     //Configs:
//     ctx.fillStyle = this.color;
//     ctx.lineWidth = this.outlineWidth;
//     ctx.strokeStyle = this.outlineColor;
//     //AutoResize:
//     var textWidth = ctx.measureText(this.label.text).width;
//     var textHeight = this.label.textHeight;
//     if (this.autoResize) {
//       if (this.width < textWidth) {
//         this.width = textWidth;
//       }
//       if (this.height < textHeight) {
//         this.height = textHeight + 20;
//       }
//     }
//     //Updating init coordinates:
//     this.initX = this.x;
//     this.initY = this.y;
//     //Centering Button:
//     this.x = this.initX-this.width/2;
//     this.y = this.initY-this.height/2;
//     //Filling Rectangle:
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//     //Stroke Drawing:
//     this.drawParts_outline();
//     //Recovering coordinates:
//     this.x = this.initX;
//     this.y = this.initY;
//     //Rectangle Done.
    
//     //TEXT DRAWING;
//     //Updating label coordinates to be the same as the button ones:
//     this.label.x = this.x;
//     this.label.y = this.y;
//     //Drawing Text:
//     this.label.draw();
//     //Label Done.
//   }
// }
// Button.prototype.onhover = function () {
//   const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
  
//   if (this.xAlign == "center") { //Para sincronizar o hovering com os align, e para verificar se há hovering.
//     var hovering1 = mouseX > this.x - ctx.measureText(this.text).width / 2 - this.hoveringHeightIncrement;
//     var hovering2 = mouseX < this.x + ctx.measureText(this.text).width / 2 + this.hoveringHeightIncrement;
//     var hovering3 = mouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
//     var hovering4 = mouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
//   } else if (this.xAlign == "start") {
//     var hovering1 = mouseX > this.x - this.hoveringHeightIncrement;
//     var hovering2 = mouseX < this.x + ctx.measureText(this.text).width + this.hoveringHeightIncrement;
//     var hovering3 = mouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
//     var hovering4 = mouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
//   }
//   this.internal_hovered = hovering1 && hovering2 && hovering3 && hovering4;
//   if (this.internal_hovered) {
//     if (!this.internal_mouseEnter) {
//       this.internal_mouseEnter = true;
//       this.textHeight += this.hoveringHeightIncrement;
//     }
//     this.internal_mouseLeave = false;
//     this.outlineColor = "black";
//   } else {
//     if (!this.internal_mouseLeave) {
//       this.internal_mouseLeave = true;
//       this.textHeight -= this.hoveringHeightIncrement;
//     }
//     this.internal_mouseEnter = false;
//     this.internal_waitingForRelease = false;
//     this.outlineColor = transparent;
//   }
// };
/*--------------------------------------Function-21-----------------------------------------------------------------*/
class GameState extends Rectangle { /*collapseit*/
  container: { [key: string]: any };
  constructor() {
    const canvas = (window as any).globals.canvas;
    super(canvas.width / 2 - 500, canvas.height / 2 - 300, 1000, 600);
    this.outlinePosition = "outer";
    this.color = "#2f538e";
    this.visible = false;
    this.container = new Proxy({}, {
      set: (target: any, prop: string | symbol, value: any) => {
        target[prop as any] = value;
        if (value && typeof value === "object" && "parent" in value) {
          try { value.parent = this; } catch (e) { /* ignore readonly */ }
        }
        return true;
      }
    });
  }
  // getAllProperties() {
  //   var properties = [];
  //   for (var prop in this) {
  //     if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
  //       properties.push(this[prop]);
  //     }
  //   }
  //   return properties;
  // };
  draw() { /*collapseit*/
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transforms
    super.draw();
    if (this.visible) {
      var contents = this.container.getAllProperties() as Array<any>;
      
      //Order controls by showIndex
      var indices = [];
      var controls = [];
      for (let i = 0; i < contents.length; i++) {
        if (typeof contents[i] == "object" && typeof contents[i].showIndex == "number") {
          indices.push(i);
          controls.push(contents[i]);
        }
      }
      controls.sort((a, b) => a.showIndex - b.showIndex); //Lower is drawn first, in back.
      for (let i = 0; i < controls.length; i++) {
        contents[indices[i]] = controls[i];
      }
      
      // Draw contents relative to GameState position
      ctx.save();
      ctx.translate(this.x, this.y);
      
      //Draw everything in its container
      for (let i = 0; i < contents.length; i++) { //Lembrar que também há um destes na JSWindow.
        switch (typeof(contents[i])) {
        case "object":
          contents[i].update && contents[i].update();
          contents[i].updateLanguage && contents[i].updateLanguage();
          contents[i].updateContext && contents[i].updateContext();
          contents[i].drawText && contents[i].drawText();
          contents[i].checkPos && contents[i].checkPos();
          contents[i].draw && contents[i].draw();
          contents[i].updatePos && contents[i].updatePos();
          contents[i].delayStop && contents[i].delayStop();
          break;
        case "function":
          if (!(contents[i].toString().includes("getAllInstances")||contents[i].toString().includes("getAllProperties"))) {
            contents[i]();
          }
          break;
        }
      }
      ctx.restore();
    }
  };
}
/*--------------------------------------Function-22-----------------------------------------------------------------*/
/*
 * JSWindow is a class that represents a window in the game, which can be shown or hidden.
 * It extends the Rectangle class and has properties for size, position, and visibility.
 * It also has methods for drawing the window, updating its position, and showing or hiding it.
 * To use, its draw() and updatePos() methods should be called in the main loop.
 */
class JSWindow extends Rectangle { /*collapseit*/
  maxYMoveSpeed: number;
  showing: boolean;
  hiding: boolean;
  container: { [key: string]: any };
  parent?: JSWindow | GameState;
  constructor(width: number, height: number) {
    const canvas = (window as any).globals.canvas;
    // By default the JSWindow is centered in the canvas. If a parent is
    // supplied we'll initialize relative to the parent's coordinates.
    super(canvas.width/2 - width/2, -height, width, height);
    this.color = "#1062e8";
    this.outlinePosition = "inner";
    this.maxYMoveSpeed = 40;
    this.showing = false;
    this.hiding = false;
    this.container = new Proxy({}, {
      // Add parent to any object added to the container
      set: (target: any, prop: string | symbol, value: any) => {
        target[prop as any] = value;
        if (value && typeof value === "object" && "parent" in value) {
          try { value.parent = this; } catch (e) { /* ignore readonly */ }
        }
        return true;
      }
    });
    this.parent = undefined;
  }
  draw() { /*collapseit*/
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    super.draw();
    if (this.visible) {
      var contents = this.container.getAllProperties();
      //Order controls by showIndex
      var indices = [];
      var controls = [];
      for (let j = 0; j < contents.length; j++) {
        if (typeof contents[j] == "object" && typeof contents[j].showIndex == "number") {
          indices.push(j);
          controls.push(contents[j]);
        }
      }
      controls.sort(function(a,b){return b.showIndex-a.showIndex});
      for (let j = 0; j < controls.length; j++) {
        contents[indices[j]] = controls[j];
      }
      
      // Draw contents relative to JSWindow position
      ctx.save();
      ctx.translate(this.x, this.y);
      
      //Draw everything in its container
      for (let j = 0; j < contents.length; j++) { //Lembrar que também há um destes na GameState.
        switch (typeof(contents[j])) {
        case "object":
          contents[j].update && contents[j].update();
          contents[j].updateLanguage && contents[j].updateLanguage();
          contents[j].updateContext && contents[j].updateContext();
          contents[j].drawText && contents[j].drawText();
          contents[j].checkPos && contents[j].checkPos();
          contents[j].draw && contents[j].draw();
          contents[j].updatePos && contents[j].updatePos();
          contents[j].delayStop && contents[j].delayStop();
          break;
        case "function":
          if (!(contents[j].toString().includes("getAllInstances")||contents[j].toString().includes("getAllProperties"))) {
            contents[j]();
          }
          break;
        }
      }
      ctx.restore();
    }
  };
  
  updatePos() { /*collapseit*/
    const canvas = (window as any).globals.canvas;
    // Compute show/hide targets relative to parent if present, otherwise use canvas
    const targetShowY = this.parent ? (-this.parent.y + canvas.height / 2 - this.height / 2) : (canvas.height / 2 - this.height / 2);
    const startShowY = this.parent ? (-this.parent.y - this.height) : -this.height;
    const targetHideY = this.parent ? (-this.parent.y + canvas.height) : canvas.height;

    const showProgress = distance(0, this.y, 0, targetShowY) /*Current*/ /
                         distance(0, startShowY, 0, targetShowY) /*Total*/;
    const hideProgress = distance(0, this.y, 0, targetHideY) /*Current*/ /
                         distance(0, targetShowY, 0, targetHideY) /*Total*/;

    if (this.showing) {
      this.visible = true;
      this.y += this.maxYMoveSpeed * showProgress;
      if (Math.round(this.y) === Math.round(targetShowY)) {
        this.showing = false;
      }
    }
    if (this.hiding) {
      this.y += this.maxYMoveSpeed * (1 - hideProgress) + 1;
      if (this.y > targetHideY) {
        this.hiding = false;
        this.visible = false;
      }
    }
  };
  
  show() { /*collapseit*/
    const canvas = (window as any).globals.canvas;
    // Starting position
    this.x = this.parent ? (-this.parent.x + canvas.width / 2 - this.width / 2) : (canvas.width / 2 - this.width / 2);
    this.y = this.parent ? (-this.parent.y - this.height) : -this.height;
    this.showing = true;
    this.hiding = false;
  };
  
  hide() { /*collapseit*/
    const canvas = (window as any).globals.canvas;
    // Starting position
    this.x = this.parent ? (-this.parent.x + canvas.width / 2 - this.width / 2) : (canvas.width / 2 - this.width / 2);
    this.y = this.parent ? (-this.parent.y + canvas.height / 2 - this.height / 2) : (canvas.height / 2 - this.height / 2);
    this.showing = false;
    this.hiding = true;
  };
  /**
   * @returns Returns true if this window is the topmost visible window.
   */
  isTopWindow(): boolean {
    const jsWindows = JSWindow.getAllInstances() as Array<JSWindow>;
    let topWindow: JSWindow | null = null;
    let topShowIndex = -Infinity;
    for (let i = 0; i < jsWindows.length; i++) {
      if (jsWindows[i].visible && jsWindows[i].showIndex > topShowIndex) {
        topShowIndex = jsWindows[i].showIndex;
        topWindow = jsWindows[i];
      }
    }
    return topWindow === this;
  }
}
/*--------------------------------------Function-23-----------------------------------------------------------------*/
class TextButton extends Label {
  hoveringHeightIncrement: number;
  onclick: undefined | (() => void);
  
  internal_hovered: boolean;
  internal_waitingForRelease: boolean;
  internal_mouseEnter: boolean;
  internal_mouseLeave: boolean;
  constructor(x: number, y: number, text: string, xAlign: "start" | "center", textHeight: number, hoveringHeightIncrement: number) {
    super(x, y, text, xAlign);
    this.outlineWidth = 8;
    this.textHeight = textHeight;
    this.hoveringHeightIncrement = hoveringHeightIncrement;
    this.onclick; //Função que define aquilo que vai acontecer ao clicar no botão. Será definida mais tarde, com um objeto mais específico.
    //Variáveis internas que não deverão ser alteradas, pois não têm a ver com personalização:
    this.internal_hovered = false; //Esta variável diz se o cursor em cima do botão.
    this.internal_waitingForRelease = false;
    this.internal_mouseEnter = false; //Esta só serve para o tamanho apenas aumentar uma vez quando o rato entrar no objeto.
    this.internal_mouseLeave = true; //Para o tamanho apenas diminuir uma vez quando o rato sair do objeto.
  }
  
  onhover() { /*collapseit*/
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!this.isFocused()) {
      return;
    }
    
    // Map global mouse coords into the current canvas transform's local space so
    // hit-testing matches where the control is actually drawn (considering translate). (Copilot code)
    let localMouseX = getMouse().x;
    let localMouseY = getMouse().y;
    try {
      const inv = ctx.getTransform()
      inv.invertSelf(); // invertSelf is supported in modern browsers
      const p = new DOMPoint(getMouse().x, getMouse().y).matrixTransform(inv);
      localMouseX = p.x;
      localMouseY = p.y;
    } catch (e) {
      console.warn("Could not invert canvas transform for mouse hit-testing.", e);
      // fallback to global mouse coords if transform inversion fails
    }
    // (Copilot code end)
    let hovering1, hovering2, hovering3, hovering4;
    if (this.xAlign == "center") { //Para sincronizar o hovering com os align, e para verificar se há hovering.
      hovering1 = localMouseX > this.x - ctx.measureText(this.text).width / 2 - this.hoveringHeightIncrement;
      hovering2 = localMouseX < this.x + ctx.measureText(this.text).width / 2 + this.hoveringHeightIncrement;
      hovering3 = localMouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
      hovering4 = localMouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
    } else if (this.xAlign == "start") {
      hovering1 = localMouseX > this.x - this.hoveringHeightIncrement;
      hovering2 = localMouseX < this.x + ctx.measureText(this.text).width + this.hoveringHeightIncrement;
      hovering3 = localMouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
      hovering4 = localMouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
    } else {
      console.error("Invalid xAlign value on TextButton.");
    }
    this.internal_hovered = hovering1! && hovering2! && hovering3! && hovering4!;
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
  
  onClickEvent () { /*collapseit*/
    if (!this.isFocused()) {
      return;
    }
    
    if (this.internal_hovered) {
      if (getMouse().isDown) { //Se isto for verdade, ou seja está-se clicando em cima do botão, só falta largar para a...
        this.internal_waitingForRelease = true; //...condição seguinte ser executada.
      }
      if (!getMouse().isDown && this.internal_waitingForRelease) { //É isto que fica à espera de Release.
        this.onclick && this.onclick();
        this.internal_waitingForRelease = false;
      }
    }
  };
  
  updateLanguage (){ /*collapseit*/
    this.text = "<!ERROR!>";
  };
  
  update () { /*collapseit*/
    this.updateContext();
    this.onhover();
    this.onClickEvent();
    this.updateLanguage();
  };
  
  isFocused(): boolean {
    // To prevent clicks and hover effects when it's not on the top window or
    // on a GameState when there's no window open
    if (this.parent instanceof JSWindow) {
      return this.parent.isTopWindow();
    } else if (this.parent instanceof GameState) {
      // Check if an window is open
      const jsWindows = JSWindow.getAllInstances() as Array<JSWindow>;
      for (let i = 0; i < jsWindows.length; i++) {
        if (jsWindows[i].visible) {
          // If it's on a GameState and there's a window open, it's not focused
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  }
}
/*--------------------------------------Function-24-----------------------------------------------------------------*/
function setMouseProvider(fn: () => {x: number, y: number, isDown: boolean}) {
  mouseProvider = fn;
}
/*--------------------------------------Function-25-----------------------------------------------------------------*/
function getMouse() {
  if (mouseProvider) return mouseProvider();
  return { x: 0, y: 0, isDown: false };
}
/*--------------------------------------Function-26-----------------------------------------------------------------*/
/**
 * Supports both SVG and PNG.
 */
class JSImage extends Control {
  src: string;
  img: HTMLImageElement;
  scale: number;
  xAlign: "left" | "middle";
  yAlign: "top" | "middle";
  constructor(x: number, y: number, src: string, xAlign: "left" | "middle" = "left", yAlign: "top" | "middle" = "top") {
    super(x, y);
    this.src = src;
    this.xAlign = xAlign;
    this.yAlign = yAlign;
    
    this.img = new Image();
    this.img.src = this.src;
    
    this.scale = 1;
  }
  
  draw() {
    const ctx = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    ctx.save();
    ctx.scale(this.scale, this.scale)
    ctx.drawImage(
      this.img,
      this.x / this.scale - (this.xAlign === 'middle' ? this.img.width / 2 : 0),
      this.y / this.scale - (this.yAlign === "middle" ? this.img.height / 2 : 0)
    );
    ctx.restore();
  }
}

export {
  backToIndex,
  element,
  getRandomColor,
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
  // Button,
  GameState,
  JSWindow,
  TextButton,
  setMouseProvider,
  JSImage
};





