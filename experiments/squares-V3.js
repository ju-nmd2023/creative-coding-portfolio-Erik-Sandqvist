let mode = "molnar"; 
let variation = 1;
let seed = 1234;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
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
  let cols = 30;
  let rows = 30;
  let cellW = 1000 / cols;
  let cellH = 1000 / rows;

  stroke(0);
  push();
  // Centrera rutnätet i canvasen
  translate((width-1000)/2, (height-1000)/2);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;

      push();
      translate(x, y);

      if (v === 1) {
        rotate(radians(random(-30, 30)));
        rectMode(CENTER);
        rect(0, 0, cellW * 0.7, cellH * 0.7);
      } else if (v === 2) {
        let dx = random(-cellW / 4, cellW / 4);
        let dy = random(-cellH / 4, cellH / 4);
        rectMode(CENTER);
        rect(dx, dy, cellW * 0.7, cellH * 0.7);
      } else if (v === 3) {
        let n = noise(i * 0.2, j * 0.2) * TWO_PI;
        rotate(n);
        rectMode(CENTER);
        rect(0, 0, cellW * 0.7, cellH * 0.7);
      }
      pop();
    }
  }
  pop();
}

function drawRiley(v) {
  stroke(0);
  noFill();

  let spacing = 20;
  for (let y = 0; y < height; y += spacing) {
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let n;
      if (v === 1) {

        n = sin(x * 0.05 + y * 0.02) * 20;
      } else if (v === 2) {

        n = noise(x * 0.01, y * 0.01) * 100 - 50;
      } else if (v === 3) {

        n = sin(x * 0.05) * 30 + noise(x * 0.02, y * 0.02) * 50 - 25;
      }
      vertex(x, y + n);
    }
    endShape();
  }
}

// --- Controls ---
function keyPressed() {
  if (key === "1") { mode = "molnar"; variation = 1; redraw(); }
  if (key === "2") { mode = "molnar"; variation = 2; redraw(); }
  if (key === "3") { mode = "molnar"; variation = 3; redraw(); }
  if (key === "4") { mode = "riley"; variation = 1; redraw(); }
  if (key === "5") { mode = "riley"; variation = 2; redraw(); }
  if (key === "6") { mode = "riley"; variation = 3; redraw(); }
  if (key === "r") { seed = int(random(999999)); redraw(); } 
}
