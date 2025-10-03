let mode = "molnar"; 
let variation = 1;
let seed = 1234;
let overlapFactor = 1;

let palette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  rectMode(CENTER);

  palette = [
    color(30, 30, 30, 180),   
    color(200, 50, 50, 120),
    color(50, 100, 200, 100),
    color(250, 200, 80, 150),
    color(20, 180, 120, 100)
  ];
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background('rgb(31, 135, 135)');


  if (mode === "molnar") {
    drawMolnar(variation);
  } else if (mode === "riley") {
    drawRiley(variation);
  }
}

function drawMolnar(v) {
  let cols = 20;
  let rows = 20;
  let cellW = 900 / cols;
  let cellH = 900 / rows;

  noStroke();
  noFill();

  translate((width-900)/2, (height-900)/2);
  drawingContext.save();
  drawingContext.filter = 'blur(2px)';

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      let w = cellW * 0.7 * overlapFactor;
      let h = cellH * 0.7 * overlapFactor;

      push();
      translate(x, y);

      //Her I let copilot decide more on the placement of the shapes and i reviewed the code
      let choice = floor(random(3));
      if (choice === 0) rotate(radians(random(-40, 40)));
      if (choice === 1) translate(random(-cellW/3, cellW/3), random(-cellH/3, cellH/3));
      if (choice === 2) scale(random(0.7, 1.4));

      stroke(random(palette));

      let shapeType = random();
      if (shapeType < 0.5) rect(0, 0, w, h);
      else if (shapeType < 0.8) ellipse(0, 0, w, h);
      else line(-w/2, -h/2, w/2, h/2);

      pop();
    }
  }
  drawingContext.restore();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      let w = cellW * 0.7 * overlapFactor;
      let h = cellH * 0.7 * overlapFactor;

      push();
      translate(x, y);

      let choice = floor(random(3));
      if (choice === 0) rotate(radians(random(-40, 40)));
      if (choice === 1) translate(random(-cellW/3, cellW/3), random(-cellH/3, cellH/3));
      if (choice === 2) scale(random(0.7, 1.4));

      stroke(random(palette));
      strokeWeight(1);

      let shapeType = random();
      if (shapeType < 0.5) rect(0, 0, w, h);
      else if (shapeType < 0.8) ellipse(0, 0, w, h);
      else line(-w/2, -h/2, w/2, h/2);

      pop();
    }
  }
}

function drawRiley(v) {
  push();
  noFill();
  let freq = 0.02;
  let amp = 30;

  for (let y = 40; y < height - 40; y += 20) {
    beginShape();
    stroke(random(palette));
    strokeWeight(2);
    for (let x = 40; x < width - 40; x += 10) {
      let off = 0;
      if (v === 1) {
        off = sin(x * freq + y * 0.05) * amp;
      } else if (v === 2) {
        off = noise(x * 0.01, y * 0.01) * 60 - 30;
      } else if (v === 3) {
        off = sin(x * 0.05) * cos(y * 0.03) * amp;
      }
      vertex(x, y + off);
    }
    endShape();
  }
  pop();
}

function keyPressed() {
  if (key === '1') variation = 1;
  if (key === '2') variation = 2;
  if (key === '3') variation = 3;
  if (key === 'm') mode = "molnar";
  if (key === 'r') mode = "riley";
  redraw();
}
