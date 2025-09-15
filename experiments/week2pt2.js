// https://chatgpt.com/share/68c8211b-7a0c-800b-b976-d514ba1c1f9a

let particles = [];
let paletteSets = [
  ["#0E0F19","#F34213","#FF8C42","#FFDD57","#0FA3B1"],
  ["#120309","#E01A4F","#F15946","#F9C22E","#53B3CB"],
  ["#0B1D26","#1B4353","#F2545B","#F5DFBB","#C5D86D"],
  ["#0D0C1D","#FF6F59","#254441","#43AA8B","#B2B09B"]
];
let currentPalette; 
const TAU = Math.PI * 2;
const MAX_PARTICLES = 2000; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  init();
}

function init() {
  background(10, 10, 18);
  blendMode(ADD);
  particles = [];
  currentPalette = random(paletteSets);

  push();
  blendMode(OVERLAY);
  strokeWeight(1);
  for (let i = 0; i < 2; i++) {
    stroke(255, random(4, 14));
    point(random(width), random(height));
  }
  pop();

  for (let i = 0; i < 200; i++) {
    particles.push(makeParticle(color(random(currentPalette)), 0));
  }
}

function makeParticle(baseCol, layer, x, y) {
  const px = x !== undefined ? x : random(width);
  const py = y !== undefined ? y : random(height);
  return {
    x: px,
    y: py,
    prevX: px,
    prevY: py,
    vx: random(-0.6, 0.6) * (1 + (layer||0)*0.1),
    vy: random(-0.6, 0.6) * (1 + (layer||0)*0.1),
    ax: 0,
    ay: 0,
    mass: random(0.6, 2.2),
    life: random(240, 520),
    age: 0,
    w: random(0.6, 2.4) * (1 + (layer||0)*0.15),
    col: lerpColor(baseCol, color(255), random(0.0, 0.25)),
    jitter: random(0.15, 1.4),
  };
}

function draw() {
  noStroke();
  fill(5, 7, 15, 6);
  rect(0, 0, width, height);


  for (let i = 0; i < particles.length; i++) {
    updateParticle(particles[i], i);
  }


  emitParticles(mouseX, mouseY, 12);

  while (particles.length > MAX_PARTICLES) particles.shift();
}

function updateParticle(p, idx) {
  p.ax = 0;
  p.ay = 0;

  let scale = 0.0016;
  let t = frameCount * 0.002 + p.age * 0.0008;
  let n = noise(p.x * scale, p.y * scale, t);
  let angle = n * TAU * 2.0 + sin(p.age * 0.02) * 0.35;
  let forceMag = 0.12; 
  p.ax += cos(angle) * forceMag / p.mass;
  p.ay += sin(angle) * forceMag / p.mass;

  p.ay += 0.006;

  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let dx = mouseX - p.x;
    let dy = mouseY - p.y;
    let d = sqrt(dx * dx + dy * dy) + 0.001;
    let maxRange = 400;
    if (d < maxRange) {
      let att = map(d, 0, maxRange, 0.9, 0.005);
      p.ax += (dx / d) * att / p.mass;
      p.ay += (dy / d) * att / p.mass;
    }
  }

  let drag = 1.293;
  p.vx *= drag;
  p.vy *= drag;

  p.vx += p.ax;
  p.vy += p.ay;
  p.prevX = p.x;
  p.prevY = p.y;
  p.x += p.vx;
  p.y += p.vy;

  if (p.x < 0) p.x += width;
  if (p.x > width) p.x -= width;
  if (p.y < 0) p.y += height;
  if (p.y > height) p.y -= height;

  // Rita — punkt med lite jitter
  strokeWeight(p.w);
  const alpha = map(sin(p.age * 0.02), -1, 1, 18, 160) * (1 - p.age / p.life);
  const c = p.col;
  stroke(red(c), green(c), blue(c), alpha);
  point(
    p.x + randomGaussian() * p.jitter,
    p.y + randomGaussian() * p.jitter
  );


  p.age++;
  if (p.age > p.life) {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
      Object.assign(p, makeParticle(p.col, 0, mouseX + random(-40, 40), mouseY + random(-40, 40)));
    } else {
      Object.assign(p, makeParticle(p.col, 0));
    }
  }
}

function emitParticles(x, y, count) {
  if (x < 0 || x > width || y < 0 || y > height) return;

  const baseCol = color(random(currentPalette));
  for (let i = 0; i < count; i++) {
    particles.push(makeParticle(baseCol, 0, x + random(-40, 40), y + random(-40, 40)));
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    init();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}
