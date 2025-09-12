// Abstrakt generativ konst – tryck R för ny komposition
let particles = [];
let paletteSets = [
  ["#0E0F19","#F34213","#FF8C42","#FFDD57","#0FA3B1"],
  ["#120309","#E01A4F","#F15946","#F9C22E","#53B3CB"],
  ["#0B1D26","#1B4353","#F2545B","#F5DFBB","#C5D86D"],
  ["#0D0C1D","#FF6F59","#254441","#43AA8B","#B2B09B"]
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  let currentSeed; function reseed(seed) { if (seed == null) seed = Math.floor(random()*1e9); currentSeed = seed; noiseSeed(currentSeed); randomSeed(currentSeed); }
  init();
}

function init() {
  background(10, 10, 18);
  blendMode(ADD);
  particles = [];
  const palette = random(paletteSets);
  const layers = int(random(4, 7));

  for (let l = 0; l < layers; l++) {
    const hueCol = color(random(palette));
    for (let i = 0; i < 1200; i++) {
      particles.push(makeParticle(hueCol, l));
    }
  }

  // Lätt textur
  push();
  blendMode(OVERLAY);
  for (let i=0;i<8000;i++){
    stroke(255, random(4,14));
    point(random(width), random(height));
  }
  pop();
}

function makeParticle(baseCol, layer) {
  return {
    x: random(width),
    y: random(height),
    a: random(TAU),
    life: random(180, 420),
    age: 0,
    w: random(0.6, 2.4) * (1 + layer*0.15),
    col: lerpColor(baseCol, color(255), random(0.0, 0.25)),
    jitter: random(0.2, 1.2),
  };
}

function draw() {
  // Lätt dimslöja för motion blur
  noStroke();
  fill(5, 7, 15, 5);
  rect(0,0,width,height);

  let steps = 25000; // hur många partiklar uppdateras / frame
  for (let n=0; n<steps; n++) {
    const p = random(particles);
    if (!p) continue;
    updateParticle(p);
  }
}

function updateParticle(p) {
  // Flow field via simplex/noise
  let scale = 0.0016;
  let ang = noise(p.x * scale, p.y * scale, p.age * 0.002) * TAU * 2.0;
  ang += sin(p.age * 0.02) * 0.4;
  p.a = ang;

  let speed = 0.6 + 0.6 * noise(p.x * scale * 0.5, p.y * scale * 0.5);
  p.x += cos(p.a) * speed;
  p.y += sin(p.a) * speed;

  // Wrap
  if (p.x < 0) p.x += width;
  if (p.x > width) p.x -= width;
  if (p.y < 0) p.y += height;
  if (p.y > height) p.y -= height;

  // Ritning
  strokeWeight(p.w);
  const alpha = map(sin(p.age * 0.01), -1, 1, 10, 120) * (1 - p.age / p.life);
  const c = p.col;
  stroke(red(c), green(c), blue(c), alpha);
  point(p.x + randomGaussian()*p.jitter, p.y + randomGaussian()*p.jitter);

  p.age++;
  if (p.age > p.life) {
    // återföd
    Object.assign(p, makeParticle(p.col, 0));
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    clear();
    init();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}