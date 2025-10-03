// I do not want to take much credit for this because I mostly coded along to Daniel Shiffman
// and juste changed a few thing but i thought it was cool.
// https://youtu.be/IKB1hWWedMk


var cols, rows;
var scl = 20;
var w, h;

var flying = 0;

var terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  w = windowWidth * 2; 
  h = windowHeight * 2; 
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  flying -= 0.1;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  background(0);
  translate(0, 50);
  fill(255, 100, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth * 2;
  h = windowHeight * 2;
  cols = w / scl;
  rows = h / scl;

  terrain = [];
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}
