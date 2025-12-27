import { Control, Rectangle } from "../JSTools";

const canvas = (window as any).globals.canvas as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

class Place extends Rectangle {
  type: string;
  price: number;
  constructor(x: number, y: number, width: number, height: number, type: string) {
    super(x, y, width, height); //Inherit from Rectangle
    this.type = type;
    this.price = 20;
  }
}

class Board extends Control {
  width: number;
  height: number;
  places: Place[];
  constructor(x: number, y: number) {
    super(x, y);
    this.width = 980;
    this.height = 980;
    this.places = [];
    
    // Width of the board path
    var pathWidth = 195*canvas.height/1000;
    // Width of normal places
    var normalPlacesWidth = (this.width-pathWidth*2)/5;

    for (let i = 0; i < 24; i++) { //Creating and Moving Places
      switch (true) { //Places are 100x195
      //Corner Places
      case (i==0):
        this.places[i] = new Place(this.width - pathWidth, this.height - pathWidth, pathWidth, pathWidth, "start");
        this.places[i].color = "#FF793F";
        break;
      case (i==6):
        this.places[i] = new Place(0, this.height - pathWidth, pathWidth, pathWidth, "prison_visit");
        this.places[i].color = "#FF793F";
        break;
      case (i==12):
        this.places[i] = new Place(0, 0, pathWidth, pathWidth, "free_parking");
        this.places[i].color = "#FF793F";
        break;
      case (i==18):
        this.places[i] = new Place(this.width - pathWidth, 0, pathWidth, pathWidth, "police");
        this.places[i].color = "#FF793F";
        break;
      //Normal Places
      case (i>=1&&i<=5):
        this.places[i] = new Place(this.width - pathWidth-normalPlacesWidth*(i%6), this.height - pathWidth, normalPlacesWidth, pathWidth, "normalA"+(i%6));
        this.places[i].color = "#95CCF9";
        break;
      case (i>=7&&i<=11):
        this.places[i] = new Place(0, this.height - pathWidth-normalPlacesWidth*(i%6), pathWidth, normalPlacesWidth, "normalB"+(i%6));
        this.places[i].color = "#95CCF9";
        break;
      case (i>=13&&i<=17):
        this.places[i] = new Place(pathWidth+normalPlacesWidth*((i%6)-1), 0, normalPlacesWidth, pathWidth, "normalC"+(i%6));
        this.places[i].color = "#95CCF9";
        break;
      case (i>=19&&i<=23):
        this.places[i] = new Place(this.width - pathWidth, pathWidth+normalPlacesWidth*((i%6)-1), pathWidth, normalPlacesWidth, "normalD"+(i%6));
        this.places[i].color = "#95CCF9";
        break;
      }
      this.places[i].showIndex = 50;
      this.places[i].outlinePosition = "center";
    }
  }
  
  draw(): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    for (let i = 0; i < this.places.length; i++) {
      this.places[i].draw();
    }
    ctx.restore();
  }
}

export { Place, Board };