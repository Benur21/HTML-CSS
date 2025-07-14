//RECT THINGS
var rect = new Rectangle(50,50,840,483);
rect.outlineWidth = 2;
rect.outlinePosition = "center";
rect.doTranslate = true;

canvas.width = rect.x * 2 + rect.width;
canvas.height = rect.y * 2 + rect.height;
//BALL THINGS
var ball = [];
var numberOfBalls = ballsBox.value;
var oldBalls;
for (i = 0; i < numberOfBalls; i++) {
  ball[i] = new Ball(0, 0, i);
}
for (i = 0; i < ball.length; i++) {
  ball[i].goToRandomPos();
}
setSpeed(ball[0].speed);
/*------------------------------------LOOP-----------------------------------------*/
resizeCanvas();
AnimationLOOP(function(){
  rect.draw();
  for (i = 0; i < ball.length; i++) {
    ball[i].draw();
    ball[i].updatePos();
  }
});
/*------------------------------------FUNCTIONS------------------------------------*/
function setSpeed(newSpeed) {
  // MAKE SURE THAT SPEED IS BETWEEN ITS MAX AND MIN
  if (newSpeed > speedBox.max) {
    newSpeed = speedBox.max;
  }
  if (newSpeed < speedBox.min) {
    newSpeed = speedBox.min;
  }
  newSpeed = Math.floor(newSpeed * 10) / 10;
  // END SPEED HANDLING

  speedBox.value = newSpeed;
  for (n = 0; n < ball.length; n++) {
    ball[n].setSpeed(newSpeed);
  }
}
