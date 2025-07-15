import { distance } from "../JSTools";
import { Ball } from "./Classes";
import { ballsBox, randomPosition, randomSpeed, speedBox } from "./Initialization";
import { balls, rect, setSpeed } from "./Main";

let oldBalls;

speedBox.oninput = function(){
  setSpeed(+speedBox.value);
};
randomPosition.onclick = function () {
  for (let i = 0; i < balls.length; i++) {
    balls[i].goToRandomPos(rect);
    var ballisTouchingAnotherBall = false;
    for (let j = 0; j < balls.length; j++) {
      if (i !== j) {
        try {
          var dist = distance(balls[j].x, balls[j].y, balls[i].x, balls[i].y);
          if (dist < balls[j].radius + balls[i].radius + 10) {
            ballisTouchingAnotherBall=true;
          }
        } catch(err) {
          console.log("ball[i]:"+balls[i]);
          console.log("i:"+i);
          console.log("ball.length:"+balls.length);
          throw err + "MYERROR";
        }
      }
    }
    if (ballisTouchingAnotherBall) {
      i--;
    }
  }
};
randomSpeed.onclick = function () {
  var rand = Math.random() * Number(speedBox.max);
  setSpeed(rand);
};
ballsBox.oninput = function () {
  if (parseInt(ballsBox.value) > parseInt(ballsBox.max)) {
    ballsBox.value = ballsBox.max;
  }
  if (parseInt(ballsBox.value) < parseInt(ballsBox.min) || ballsBox.value === "") {
    ballsBox.value = ballsBox.min;
  }
  ballsBox.value = String(Math.floor(Number(ballsBox.value)));

  var maxSpeed = 1000 / Number(ballsBox.value);
  oldBalls = balls.length;
  if (Number(ballsBox.value) < balls.length) {
    for (let m = 0; m < oldBalls - Number(ballsBox.value); m++) {
      balls.pop();
    }
  } else {
    (window as any).globals.numberOfBalls = Number(ballsBox.value);
    for (let i = oldBalls; i < (window as any).globals.numberOfBalls; i++) {
      balls[i] = new Ball(0, 0, i);
    }
    for (let i = oldBalls; i < balls.length; i++) {
      balls[i].goToRandomPos(rect);
      var balliTouchingAnotherBall = false;
      for (let j = 0; j < balls.length; j++) {
        if (i !== j) {
          var dist = distance(balls[j].x, balls[j].y, balls[i].x, balls[i].y);
          if (dist < balls[j].radius + balls[i].radius + 10) {
            balliTouchingAnotherBall=true;
          }
        }
      }
      if (balliTouchingAnotherBall) {
        i--;
      }
    }
  }
  setSpeed(balls[0].speed);

  speedBox.max = String(maxSpeed);
  if (Number(speedBox.value) > maxSpeed) {
    setSpeed(maxSpeed);
  }
};
