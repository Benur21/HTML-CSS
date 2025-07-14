function Ball(x, y, index) {
  Circle.call(this, x, y, 10); //Inherit from Circle
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
Ball.prototype = Object.create(Circle.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.setSpeed = function (newSpeed) {
  this.speed = newSpeed;

  if (this.speedY !== 0 && this.speedX !== 0) {
    this.slope = this.speedY / this.speedX;
  }

  this.speedX = Math.cos(Math.atan(this.slope)) * newSpeed;
  this.speedY = Math.sqrt(Math.pow(this.speed, 2) - Math.pow(this.speedX, 2));

  this.speedX = Math.abs(this.speedX) * this.directionX;
  this.speedY = Math.abs(this.speedY) * this.directionY;
};
Ball.prototype.goToRandomPos = function () {
  this.goTo(Math.random() * (rect.width - this.radius * 2), Math.random() * (rect.height - this.radius * 2));
};
Ball.prototype.checkPos = function () {
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
    if (ball.length > 1) {
      for (j = 0; j < ball.length; j++) {
        if (this.index !== j) {
          var dist = distance(ball[j].x, ball[j].y, this.x, this.y);
          if (dist < ball[j].radius + this.radius) {

            var a = (ball[j].y - this.y) / (ball[j].x - this.x);
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
Ball.prototype.updatePos = function () {
  for (h = 0; h < this.speed * 10; h++) {
    this.x += this.speedX / (this.speed * 10);
    this.y += this.speedY / (this.speed * 10);
    this.checkPos();
  }
};