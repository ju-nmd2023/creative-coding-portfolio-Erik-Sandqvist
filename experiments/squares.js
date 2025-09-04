let mode = "molnar"; // "molnar" or "riley"
let variation = 1;
let seed = 1234;

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background(255);

  if (mode === "molnar") {
    drawMolnar(variation);
  } else if (mode === "riley") {
    drawRiley(variation);
  }
}

function drawMolnar(v) {
  let cols = 20;
  let rows = 20;
  let cellW = width / cols;
  let cellH = height / rows;

  stroke(0);
  noFill();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;

      push();
      translate(x, y);

      if (v === 1) {
        // Random rotation
        rotate(radians(random(-30, 30)));
        rectMode(CENTER);
        rect(0, 0, cellW * 0.7, cellH * 0.7);
      } else if (v === 2) {
        // Random displacement
        let dx = random(-cellW / 4, cellW / 4);
        let dy = random(-cellH / 4, cellH / 4);
        rectMode(CENTER);
        rect(dx, dy, cellW * 0.7, cellH * 0.7);
      } else if (v === 3) {
        // Perlin noise distortion
        let n = noise(i * 0.2, j * 0.2) * TWO_PI;
        rotate(n);
        rectMode(CENTER);
        rect(0, 0, cellW * 0.7, cellH * 0.7);
      }
      pop();
    }
  }
}