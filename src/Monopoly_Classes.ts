import { Rectangle } from "./JSTools";

class Place extends Rectangle {
  type: string;
  price: number;
  constructor(x, y, width, height, type) {
    super(x, y, width, height); //Inherit from Rectangle
    this.type = type;
    this.price = 20;
  }
}

class JSWindow extends Rectangle {
  name: string;
  color: string;
  visible: boolean;
  constructor(x, y, width, height, name: string) {
    super(x, y, width, height); //Inherit from Rectangle
    this.name = name;
    this.color = 'grey';
    this.visible = false;
  }
}

export { Place, JSWindow };