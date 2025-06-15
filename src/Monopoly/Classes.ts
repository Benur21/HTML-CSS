import { Rectangle } from "../JSTools";

class Place extends Rectangle {
  type: string;
  price: number;
  constructor(x: number, y: number, width: number, height: number, type: string) {
    super(x, y, width, height); //Inherit from Rectangle
    this.type = type;
    this.price = 20;
  }
}

class JSWindow extends Rectangle {
  name: string;
  color: string;
  visible: boolean;
  constructor(x: number, y: number, width: number, height: number, name: string) {
    super(x, y, width, height); //Inherit from Rectangle
    this.name = name;
    this.color = 'grey';
    this.visible = false;
  }
  
  show() {
    this.y = -this.height - this.outlineWidth*2;
    for (let i = 0; i < (this.initY - this.y) * 100; i+=1) {
      this.y += 1/100;
    }
  }
}

export { Place, JSWindow };