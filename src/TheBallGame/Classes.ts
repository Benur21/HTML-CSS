import { Circle, distance, Label, Rectangle, transparent } from "../JSTools";
import { downIsDown, leftIsDown, mouseIsDown, mouseX, mouseY, rightIsDown, setKeyStates, upIsDown } from "./Events";
import { bellRing, click } from "./Initialization";
import { game } from "./Main";

const c = (window as any).globals.canvas.getContext('2d') as CanvasRenderingContext2D;

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
    if (!this.isFocused()) {
      return;
    }
    
    // Map global mouse coords into the current canvas transform's local space so
    // hit-testing matches where the control is actually drawn (considering translate). (Copilot code)
    let localMouseX = mouseX;
    let localMouseY = mouseY;
    try {
      const inv = c.getTransform();
      inv.invertSelf(); // invertSelf is supported in modern browsers
      const p = new DOMPoint(mouseX, mouseY).matrixTransform(inv);
      localMouseX = p.x;
      localMouseY = p.y;
    } catch (e) {
      console.warn("Could not invert canvas transform for mouse hit-testing.", e);
      // fallback to global mouse coords if transform inversion fails
    }
    // (Copilot code end)
    let hovering1, hovering2, hovering3, hovering4;
    if (this.xAlign == "center") { //Para sincronizar o hovering com os align, e para verificar se há hovering.
      hovering1 = localMouseX > this.x - c.measureText(this.text).width / 2 - this.hoveringHeightIncrement;
      hovering2 = localMouseX < this.x + c.measureText(this.text).width / 2 + this.hoveringHeightIncrement;
      hovering3 = localMouseY > this.y - this.textHeight / 2 - this.hoveringHeightIncrement;
      hovering4 = localMouseY < this.y + this.textHeight / 2 + this.hoveringHeightIncrement;
    } else if (this.xAlign == "start") {
      hovering1 = localMouseX > this.x - this.hoveringHeightIncrement;
      hovering2 = localMouseX < this.x + c.measureText(this.text).width + this.hoveringHeightIncrement;
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
      if (mouseIsDown) { //Se isto for verdade, ou seja está-se clicando em cima do botão, só falta largar para a...
        this.internal_waitingForRelease = true; //...condição seguinte ser executada.
      }
      if (!mouseIsDown && this.internal_waitingForRelease) { //É isto que fica à espera de Release.
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

class PlayerInfo extends Label {/*collapseit*/
  type: "lives" | "score";
  count: number;
  constructor(x: number, y: number, type: "lives" | "score", xAlign: "start" | "center", startCount: number) {
    super(x, y, "", xAlign);
    this.type = type;
    this.count = startCount;
    switch (this.type.toLowerCase()) {
    case "lives":
      this.text = (window as any).globals.livesText_lang;
      break;
    case "score":
      this.text = (window as any).globals.scoreText_lang;
      break;
    }
  }
}

class Ball extends Circle {
  speedX = 0;
  speedY = 0;
  color = "#0000FF";
  walkSpeed = 2;
  jumpSpeed = 20;
  side: "left" | "right" = "left";
  touchingLava = false;
  delaying = false;
  delayed = 0;
  finalDelayTime = 0;
  lives: PlayerInfo;
  score: PlayerInfo;
  initX: number;
  initY: number;
  visible = true;

  constructor(x: number, y: number) {
    super(x, y, 15);
    this.initX = x;
    this.initY = y;
    this.lives = new PlayerInfo(10, 40, "lives", "start", 5);
    this.score = new PlayerInfo(10, 80, "score", "start", 0);
  }

  drawText() {
    this.lives.text = (window as any).globals.livesText_lang + " = " + this.lives.count;
    this.lives.updateContext();
    this.lives.draw();
    this.score.text = (window as any).globals.scoreText_lang + " = " + this.score.count;
    this.score.updateContext();
    this.score.draw();
  }

  updateX() {
    if (!this.delaying) {
      this.speedX *= 0.7;
      if (leftIsDown && this.x > this.radius) this.speedX -= this.walkSpeed;
      if (rightIsDown && this.x < game.width - this.radius) this.speedX += this.walkSpeed;
      this.x += this.speedX;

      if (this.x < this.radius) {
        if (this.speedX < 0) click.play();
        this.speedX = 0;
        this.x = this.radius;
      }
      if (this.x > game.width - this.radius) {
        if (this.speedX > 0) click.play();
        this.speedX = 0;
        this.x = game.width - this.radius;
      }
    }
  }

  updateY() {
    if (!this.delaying) {
      if (this.speedY === 1 && this.y > game.height - this.radius - 1 && upIsDown) {
        this.speedY = -this.jumpSpeed;
      }
      if (downIsDown) this.speedY += 1;
      this.y += this.speedY;

      if (this.y > game.height - this.radius) {
        if (this.speedY > 10) click.play();
        this.speedY = 0;
        this.y = game.height - this.radius;
      }
      this.speedY++;

      if (this.y < this.radius) {
        if (this.speedY < -10) click.play();
        this.speedY = 0;
        this.y = this.radius;
      }
    }
  }

  checkPos() {
    if (!this.delaying) {
      const lava = game.container.lava;

      if (this.y > lava.y - this.radius && this.x > lava.x - this.radius + 5 && this.x < lava.x + lava.width + 5) {
        this.speedX = 0;
        this.speedY = 0;
        this.y = lava.y - this.radius;
        this.touchingLava = true;
      }
      if (this.x > lava.x - this.radius && this.y > lava.y - this.radius && this.x < lava.x + lava.width / 2) {
        this.speedX = 0;
        this.x = lava.x - this.radius;
        this.touchingLava = true;
      }
      if (this.x > lava.x + lava.width / 2 && this.y > lava.y - this.radius && this.x < lava.x + lava.width + this.radius) {
        this.speedX = 0;
        this.x = lava.x + lava.width + this.radius;
        this.touchingLava = true;
      }

      if (this.touchingLava || this.delayed > 0) {
        this.touchingLava = false;

        if (this.delayed === 0) this.delay(100);
        if (!this.delaying && this.delayed === 1) {
          bellRing.play();
          this.delay(650);
        }
        if (!this.delaying && this.delayed === 2) {
          this.lives.count--;
          this.delay(650);
        }
        if (!this.delaying && this.delayed >= 2) {
          this.side = "left";
          this.x = 100 + this.radius;
          this.y = game.height / 2 + this.radius;
          this.speedX = 0;
          this.speedY = 5;
          this.delayed = 0;
          if (this.lives.count <= 0) {
            alert(`Perdeste com ${this.score.count} Ponto${this.score.count === 1 ? "" : "s"}!!`);
            this.score.count = 0;
            this.lives.count = 5;
            setKeyStates({
              upIsDown: false,
              rightIsDown: false,
              leftIsDown: false,
            });
          }
        }
      }

      if (this.side === "left" && this.x > game.width / 2 && this.y > game.height - this.radius - 2) {
        this.side = "right";
        this.score.count++;
      }
      if (this.side === "right" && this.x < game.width / 2 && this.y > game.height - this.radius - 2) {
        this.side = "left";
        this.score.count++;
      }
    }
  }

  updatePos() {
    this.updateX();
    this.updateY();
  }

  delay(ms: number) {
    this.finalDelayTime = Date.now() + ms;
    this.delaying = true;
    this.delayed++;
  }

  delayStop() {
    if (this.delaying && Date.now() > this.finalDelayTime) {
      this.delaying = false;
      this.finalDelayTime = 0;
    }
  }

  restart() {
    this.x = this.initX;
    this.y = this.initY;
    this.walkSpeed = 2;
    this.jumpSpeed = 20;
    this.lives.count = 5;
    this.score.count = 0;
    this.side = "left";
    this.touchingLava = false;
    this.delaying = false;
    this.delayed = 0;
    this.finalDelayTime = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.visible = true;
  }
}


// function Ball(x, y) { /*collapseit*/
//   Circle.call(this, x, y, 15);
//   this.speedX = 0;
//   this.speedY = 0;
//   this.color = "#0000FF";
//   this.walkSpeed = 2;
//   this.jumpSpeed = 20;
//   this.side = "left";
//   this.touchingLava = false;
//   this.delaying = false;
//   this.delayed = 0;
//   this.finalDelayTime = 0;
//   this.lives = new PlayerInfo(10, 40, "lives", "start", 5);
//   this.score = new PlayerInfo(10, 80, "score", "start", 0);
// }
// Ball.prototype = Object.create(Circle.prototype);
// Ball.prototype.constructor = Ball;
// Ball.prototype.drawText = function () { /*collapseit*/
//   this.lives.text = livesText_lang + " = " + this.lives.count;
//   this.lives.updateContext();
//   this.lives.draw();
//   this.score.text = scoreText_lang + " = " + this.score.count;
//   this.score.updateContext();
//   this.score.draw();
// };
// Ball.prototype.updateX = function () { /*collapseit*/
//   if (!this.delaying) {
//     this.speedX = this.speedX * 0.7;
//     if (leftIsDown && this.x > this.radius) {
//       this.speedX = this.speedX - this.walkSpeed;
//     }
//     if (rightIsDown && this.x < game.width - this.radius) {
//       this.speedX = this.speedX + this.walkSpeed;
//     }
//     this.x = this.x + this.speedX;
//     //console.log(this.speedX);
//     if (this.x < this.radius) {
//       if (this.speedX < 0) {
//         click.play();
//       }
//       this.speedX = 0;
//       this.x = this.radius;
//     }
//     if (this.x > game.width - this.radius) {
//       if (this.speedX > 0) {
//         click.play();
//       }
//       this.speedX = 0;
//       this.x = game.width - this.radius;
//     }
//   }
// };
// Ball.prototype.updateY = function () { /*collapseit*/
//   if (!this.delaying) {
//     if (this.speedY === 1 && this.y > game.height - this.radius - 1 && upIsDown) {
//       this.speedY = -this.jumpSpeed;
//     }
//     if (downIsDown) {
//       this.speedY += 1;
//     }
//     this.y = this.y + this.speedY;
//     if (this.y > game.height - this.radius) {
//       if (this.speedY > 10) {
//         click.play();
//       }
//       this.speedY = 0;
//       this.y = game.height - this.radius;
//     }
//     this.speedY++;
//     if (this.y < this.radius) {
//       if (this.speedY < -10) {
//         click.play();
//       }
//       this.speedY = 0;
//       this.y = this.radius;
//     }
//   }
// };
// Ball.prototype.checkPos = function () { /*collapseit*/
//   if (!this.delaying) {
//   var lava = game.container.lava;
//     if (this.y > lava.y - this.radius && this.x > lava.x - this.radius + 5 && this.x < lava.x + lava.width + 5) {
//       this.speedX = 0;
//       this.speedY = 0;
//       this.y = lava.y - this.radius;
//       this.touchingLava = true;
//     }
//     if (this.x > lava.x - this.radius && this.y > lava.y - this.radius && this.x < lava.x + lava.width / 2) {
//       this.speedX = 0;
//       this.x = lava.x - this.radius;
//       this.touchingLava = true;
//     }
//     if (this.x > lava.x + lava.width / 2 && this.y > lava.y - this.radius && this.x < lava.x + lava.width + this.radius) {
//       this.speedX = 0;
//       this.x = lava.x + lava.width + this.radius;
//       this.touchingLava = true;
//     }
//     if (this.touchingLava || this.delayed > 0) {
//       this.touchingLava = false;

//       if (this.delayed === 0) {
//         this.delay(100);
//       }
//       if (!this.delaying) {
//         if (this.delayed === 1) {
//           bellRing.play();
//           this.delay(650);
//         }
//         if (!this.delaying) {
//           if (this.delayed === 2) {
//             this.lives.count--;
//             this.delay(650);
//           }
//           if (!this.delaying) {
//             this.side = "left";
//             this.x = 100 + this.radius
//             this.y = game.height / 2 + this.radius;
//             this.speedX = 0;
//             this.speedY = 5;
//             this.delayed = 0;
//             if (this.lives.count <= 0) { //Game Ended
//               if (this.score.count === 1) {
//                 alert("Perdeste com " + this.score.count + " Ponto!!");
//               } else {
//                 alert("Perdeste com " + this.score.count + " Pontos!!");
//               }
//               this.score.count = 0;
//               this.lives.count = 5;
//               upIsDown = false;
//               rightIsDown = false;
//               leftIsDown = false;
//             }
//           }
//         }
//       }
//     } //SCORE
//     if (this.side === "left" && this.x > game.width / 2 && this.y > game.height - this.radius - 2) {
//       this.side = "right";
//       this.score.count++;
//     }
//     if (this.side === "right" && this.x < game.width / 2 && this.y > game.height - this.radius - 2) {
//       this.side = "left";
//       this.score.count++;
//     }
//   }
// };
// Ball.prototype.updatePos = function () { /*collapseit*/
//   this.updateX();
//   this.updateY();
// };
// Ball.prototype.delay = function (ms) { /*collapseit*/
//   ms += new Date().getTime();
//   this.finalDelayTime = ms;
//   this.delaying = true;
//   this.delayed++;
// };
// Ball.prototype.delayStop = function () { /*collapseit*/
//   if (this.delaying) {
//     if (new Date().getTime() > this.finalDelayTime) {
//       this.delaying = false;
//       this.finalDelayTime = 0;
//     }
//   }
// };
// Ball.prototype.restart = function () { /*collapseit*/
//   this.x = this.initX;
//   this.y = this.initY;
//   this.walkSpeed = 2;
//   this.jumpSpeed = 20;
//   this.lives.count = 5;
//   this.score.count = 0;
//   this.side = "left";
//   this.touchingLava = false;
//   this.delaying = false;
//   this.delayed = 0;
//   this.finalDelayTime = 0;
//   this.speedX = 0;
//   this.speedY = 0;
//   this.visible = true;
// };


export { TextButton, PlayerInfo, Ball };