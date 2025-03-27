/*--------------------------------------Function-1------------------------------------------------------------------*/
function backToIndex(){
  var currentURL = window.location.href;
  window.location.href = currentURL.slice(0, currentURL.lastIndexOf("/"));
}
/*--------------------------------------Function-2------------------------------------------------------------------*/
function element(id){
  return document.getElementById(id);
}
/*--------------------------------------Function-3------------------------------------------------------------------*/
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*--------------------------------------Function-4------------------------------------------------------------------*/
var windowRatio;
var canvasRatio;
var toolBarHeight;
function resizeCanvas(){
  //Get Window Ratio
  windowRatio = window.innerWidth / (window.innerHeight - toolBarHeight);
  //Get Canvas Ratio
  canvasRatio = canvas.width / canvas.height;
  if (canvasRatio>windowRatio) {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = "";
	canvas.style.left = "0px";
	canvas.style.top = ((window.innerHeight-toolBarHeight)/2 - (window.innerWidth/canvasRatio)/2 + toolBarHeight) + "px";
  } else if (canvasRatio<=windowRatio){
    canvas.style.width = "";
    canvas.style.height = window.innerHeight-toolBarHeight + "px";
	canvas.style.left = (window.innerWidth/2 - ((window.innerHeight-toolBarHeight)*canvasRatio)/2) + "px";
	canvas.style.top = toolBarHeight + "px";
  }
}
/*--------------------------------------Function-5------------------------------------------------------------------*/
function toRadian(deg) {
  return deg * Math.PI/180;
}
/*--------------------------------------Function-6------------------------------------------------------------------*/
function toDegree(rad) {
  return rad * 180 / Math.PI;
}
/*--------------------------------------Function-7------------------------------------------------------------------*/
function random(min,max,exp) {
  rand = Math.random();
  rand = rand*(max-min)+min;
  if (exp<1&&exp>0) {
	rand = rand*invertFraction(exp,1);
  } else {
	rand = rand/exp;
  }
  rand = Math.round(rand);
  if (exp<1&&exp>0) {
	return rand/invertFraction(exp,1);
  } else {
	return rand*exp;
  }
  
}
/*--------------------------------------Function-8------------------------------------------------------------------*/
function invertFraction(numerator,denominator){
  var arr = [numerator,denominator];
  arr.reverse();
  return arr[0]/arr[1];
}
/*--------------------------------------Function-8------------------------------------------------------------------*/
function distance(x1,y1,x2,y2){
  var difX = x1-x2;
  var difY = y1-y2;
  return Math.sqrt(Math.abs(difX*difX+difY*difY));
}
/*--------------------------------------Function-9------------------------------------------------------------------*/
function download(url){
  var downloadFrame = document.createElement("iframe");
  downloadFrame.height = "0px";
  downloadFrame.width = "0px";
  downloadFrame.src = url;
  document.body.appendChild(downloadFrame);
  setTimeout(function(){removeElement(downloadFrame)},10000);
}
/*--------------------------------------Function-10-----------------------------------------------------------------*/
function removeElement(elem) {
  elem.parentNode.removeChild(elem);
}
/*--------------------------------------Function-11-----------------------------------------------------------------*/