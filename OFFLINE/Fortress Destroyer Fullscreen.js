var a = document.getElementsByTagName('embed') [0];
var b = document.getElementById('play-page');
var c = document.getElementById('content');
var d = document.getElementById('primary');
var e = document.getElementById('unityPlayer');
var f = document.getElementsByTagName('link') [3];
a.width = screen.width + 'px';
a.height = screen.height + 'px';
a.style.width = screen.width + 'px';
a.style.height = screen.height + 'px';
b.style.margin = '0px';
c.style.margin = '0px';
d.style.margin = '0px';
e.style.margin = '0px';
f.href = 'hi';
while (b.hasChildNodes() && b.firstChild !== c) {
  if (b.firstChild !== c) {
    b.removeChild(b.firstChild);
  }
}
while (b.hasChildNodes() && b.lastChild !== c) {
  if (b.lastChild !== c) {
    b.removeChild(b.lastChild);
  }
}
while (c.hasChildNodes() && c.firstChild !== d) {
  if (c.firstChild !== d) {
    c.removeChild(c.firstChild);
  }
}
while (c.hasChildNodes() && c.lastChild !== d) {
  if (c.lastChild !== d) {
    c.removeChild(c.lastChild);
  }
}
while (d.hasChildNodes() && d.firstChild !== e) {
  if (d.firstChild !== e) {
    d.removeChild(d.firstChild);
  }
}
while (d.hasChildNodes() && d.lastChild !== e) {
  if (d.lastChild !== e) {
    d.removeChild(d.lastChild);
  }
}
