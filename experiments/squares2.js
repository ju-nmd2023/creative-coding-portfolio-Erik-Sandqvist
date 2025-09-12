let mode = "molnar"; // "molnar" or "riley"
let variation = 1;
let seed = 1234;
// Faktor > 1 gör att kvadrater överlappar grannceller
let overlapFactor = 1.35; 

function setup() {
  createCanvas(800, 800);
  noLoop();
  rectMode(CENTER);
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
  strokeWeight(4);
  noFill();
  rect(width / 2, height / 2, width - 20, height - 20); // ram med liten marginal

  // Rita suddiga linjer först
  drawingContext.save();
  drawingContext.filter = 'blur(2px)';

  stroke(0, 100); // Halvtransparent svart för suddiga linjer
  strokeWeight(1);
  noFill();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      let w = cellW * 0.7 * overlapFactor;
      let h = cellH * 0.7 * overlapFactor;

      push();
      translate(x, y);

      if (v === 1) {
        rotate(radians(random(-30, 30)));
        rect(0, 0, w, h);
      }
      pop();
    }
  }
  drawingContext.restore(); // Återställ för att sluta använda blur

  // Rita skarpa linjer ovanpå
  stroke(0); // Svart för skarpa linjer
  strokeWeight(1);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;
      let w = cellW * 0.7 * overlapFactor;
      let h = cellH * 0.7 * overlapFactor;

      push();
      translate(x, y);

      if (v === 1) {
        rotate(radians(random(-30, 30)));
        rect(0, 0, w, h);
      }
      pop();
    }
  }
}

// Tips: ändra overlapFactor live i konsolen och kör redraw():
// overlapFactor = 1.8; redraw();
// Sätt tillbaka till 1 för ingen överlapp.
function drawRiley(v) {
  // Placeholder så att mode "riley" inte kraschar om du byter.
  // Lägg egen implementation här senare.
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  let s = 60;
  for (let y = s; y < height - s; y += s) {
    beginShape();
    for (let x = s; x < width - s; x += s) {
      let off = sin((x + y) * 0.05) * 12;
      vertex(x, y + off);
    }
    endShape();
  }
  pop();
}
