let mode = "molnar"; 
let variation = 1;
let seed = 1234;
let overlapFactor = 1;

let palette;

function setup() {
  createCanvas(600, 600);
  noLoop();
  rectMode(CENTER);

  // Enkel färgpalett (halvtransparent)
  palette = [
    color(30, 30, 30, 180),    // nästan svart
    color(200, 50, 50, 120),   // rödton
    color(50, 100, 200, 100),  // blåton
    color(250, 200, 80, 150),  // gulorange
    color(20, 180, 120, 100)   // grön
  ];
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background(250);

  // // Liten textur i bakgrunden
  // for (let i = 0; i < 600; i++) {
  //   stroke(0, 10);
  //   line(random(width), random(height), random(width), random(height));
  // }

  if (mode === "molnar") {
    drawMolnar(variation);
  } else if (mode === "riley") {
    drawRiley(variation);
  }
}

function drawMolnar(v) {
  let cols = 30;
  let rows = 30;
  let cellW = width / cols;
  let cellH = height / rows;

  stroke(0);
  strokeWeight(3);
  noFill();
  rect(width / 2, height / 2, width - 20, height - 20); // ram

  // Suddat lager
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

      // Slumpmässigt val av transformation
      let choice = floor(random(3));
      if (choice === 0) rotate(radians(random(-40, 40)));
      if (choice === 1) translate(random(-cellW/3, cellW/3), random(-cellH/3, cellH/3));
      if (choice === 2) scale(random(0.7, 1.4));

      stroke(random(palette));

      // Slumpad form
      let shapeType = random();
      if (shapeType < 0.5) rect(0, 0, w, h);
      else if (shapeType < 0.8) ellipse(0, 0, w, h);
      else line(-w/2, -h/2, w/2, h/2);

      pop();
    }
  }
  drawingContext.restore();

  // Skarpa linjer ovanpå
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

// Enkel interaktivitet
function keyPressed() {
  if (key === '1') variation = 1;
  if (key === '2') variation = 2;
  if (key === '3') variation = 3;
  if (key === 'm') mode = "molnar";
  if (key === 'r') mode = "riley";
  redraw();
}
