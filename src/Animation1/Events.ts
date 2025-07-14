speedBox.oninput = function(){
  setSpeed(+speedBox.value);
};
randomPosition.onclick = function () {
  for (i = 0; i < ball.length; i++) {
    ball[i].goToRandomPos();
    var ballisTouchingAnotherBall = false;
    for (j = 0; j < ball.length; j++) {
      if (i !== j) {
        try {
          var dist = distance(ball[j].x, ball[j].y, ball[i].x, ball[i].y);
          if (dist < ball[j].radius + ball[i].radius + 10) {
            ballisTouchingAnotherBall=true;
          }
        } catch(err) {
          console.log("ball[i]:"+ball[i]);
          console.log("i:"+i);
          console.log("ball.length:"+ball.length);
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
  var rand = Math.random() * speedBox.max;
  setSpeed(rand);
};
ballsBox.oninput = function () {
  if (parseInt(ballsBox.value) > parseInt(ballsBox.max)) {
    ballsBox.value = ballsBox.max;
  }
  if (parseInt(ballsBox.value) < parseInt(ballsBox.min) || ballsBox.value === "") {
    ballsBox.value = ballsBox.min;
  }
  ballsBox.value = Math.floor(ballsBox.value);

  var maxSpeed = 1000 / ballsBox.value;
  oldBalls = ball.length;
  if (ballsBox.value < ball.length) {
    for (m = 0; m < oldBalls - ballsBox.value; m++) {
      ball.pop();
    }
  } else {
    numberOfBalls = ballsBox.value;
    for (i = oldBalls; i < numberOfBalls; i++) {
      ball[i] = new Ball(0, 0, i);
    }
    for (i = oldBalls; i < ball.length; i++) {
      ball[i].goToRandomPos();
      var balliTouchingAnotherBall = false;
      for (j = 0; j < ball.length; j++) {
        if (i !== j) {
          var dist = distance(ball[j].x, ball[j].y, ball[i].x, ball[i].y);
          if (dist < ball[j].radius + ball[i].radius + 10) {
            balliTouchingAnotherBall=true;
          }
        }
      }
      if (balliTouchingAnotherBall) {
        i--;
      }
    }
  }
  setSpeed(ball[0].speed);

  speedBox.max = maxSpeed;
  if (speedBox.value > maxSpeed) {
    setSpeed(maxSpeed);
  }
};