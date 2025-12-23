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

export { Place };