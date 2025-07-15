import { Circle, distance, random, Rectangle } from "../JSTools";

class Ball extends Circle {
  // Ball class that inherits from Circle
  // It has properties like index, color, speed, speedX, speedY, directionX, directionY, slope
  // It has methods to set speed, go to random position, check position and update position
  index: number;
  color: string;
  speed: number;
  speedX: number;
  speedY: number;
  directionX: number;
  directionY: number;
  slope: number;
  // Constructor initializes the ball with position (x, y), index, and sets default values for other properties
  // It also calculates the initial speedX and speedY based on the speed
  // If a random condition is met, it inverts the speedY
  constructor(x: number, y: number, index: number) {
    super(x, y, 10); // Inherit from Circle
    this.index = index;
    this.color = "blue";
    this.speed = 2;
    this.speedX = random(-this.speed, this.speed, 0.1);
    this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));
    this.directionX = Math.sign(this.speedX);
    this.directionY = Math.sign(this.speedY);
    this.slope = this.speedY / this.speedX;
    if (random(0, 1, 1) === 1) {
      this.speedY *= -1;
    }
  }
  
  setSpeed (newSpeed: number) {
    this.speed = newSpeed;
  
    if (this.speedY !== 0 && this.speedX !== 0) {
      this.slope = this.speedY / this.speedX;
    }
  
    this.speedX = Math.cos(Math.atan(this.slope)) * newSpeed;
    this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));
  
    this.speedX = Math.abs(this.speedX) * this.directionX;
    this.speedY = Math.abs(this.speedY) * this.directionY;
  };
  
  goToRandomPos (rect: Rectangle) {
    this.goTo(Math.random() * (rect.width - this.radius * 2), Math.random() * (rect.height - this.radius * 2));
  };
  
  checkPos (balls: Ball[], rect: Rectangle) {
    if (this.x > rect.width - this.radius) {
      this.directionX = -1;
      this.speedX = Math.abs(this.speedX) * this.directionX;
    }
    if (this.x < this.radius) {
      this.directionX = 1;
      this.speedX = Math.abs(this.speedX) * this.directionX;
    }
    if (this.y > rect.height - this.radius) {
      this.directionY = -1;
      this.speedY = Math.abs(this.speedY) * this.directionY;
    }
    if (this.y < this.radius) {
      this.directionY = 1;
      this.speedY = Math.abs(this.speedY) * this.directionY;
    }
    if (balls.length > 1) {
      for (let j = 0; j < balls.length; j++) {
        if (this.index !== j) {
          var dist = distance(balls[j].x, balls[j].y, this.x, this.y);
          if (dist < balls[j].radius + this.radius) {
  
            var a = (balls[j].y - this.y) / (balls[j].x - this.x);
            var b = this.speedY - a * this.speedX;
            var c =  - (1 / a);
            var d = 0;
  
            this.speedX = ((d - b) / (a - c)) + (((d - b) / (a - c)) - this.speedX);
            this.speedY = (a * ((d - b) / (a - c)) + b) + ((a * ((d - b) / (a - c)) + b) - this.speedY);
  
            if (this.speedY !== 0 && this.speedX !== 0) {
              this.slope = this.speedY / this.speedX;
            }
            this.directionX = Math.sign(this.speedX);
            this.directionY = Math.sign(this.speedY);
          }
        }
      }
    }
  };
  
  updatePos (balls: Ball[], rect: Rectangle) {
    for (let h = 0; h < this.speed * 10; h++) {
      this.x += this.speedX / (this.speed * 10);
      this.y += this.speedY / (this.speed * 10);
      this.checkPos(balls, rect);
    }
  };
}


export { Ball };