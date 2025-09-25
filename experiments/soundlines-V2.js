//This code is based of the previous soundlines.js but I myself added nosie to the lines to make them go wiggiley

let x1, y1, x2, y2; 
let progress = 0;
let speed = 1;
let paletteSets = [
  ["#06128f","#F34213","#deb514","#0FA3B1"],
  ["#E01A4F","#b51b07"],
  ["#0B1D26","#1B4353","#F2545B","#f89900ff"],
  ["#0D0C1D","#595cffff","#254441","#43AA8B","#1b33ebff"]
];
let currentColor;

let synth;
let playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 18);
  frameRate(60);

  synth = new Tone.Synth().toDestination();
  newLine();
}

function newLine() {
  let edge1 = int(random(4));
  let edge2;
  do {
    edge2 = int(random(4));
  } while (edge2 === edge1);

  function randomPointOnEdge(edge) {
    if (edge === 0) return { x: 0, y: random(height) };        
    if (edge === 1) return { x: width, y: random(height) };     
    if (edge === 2) return { x: random(width), y: 0 };        
    if (edge === 3) return { x: random(width), y: height };    
  }

  let p1 = randomPointOnEdge(edge1);
  let p2 = randomPointOnEdge(edge2);

  x1 = p1.x;
  y1 = p1.y;
  x2 = p2.x;
  y2 = p2.y;

  progress = 0;
  speed = random(1, 6);
  currentColor = random(random(paletteSets));

  let freq = map(speed, 0.5, 8, 100, 1200);
  synth.triggerAttack(freq);
  playing = true;
}

function draw() {
  if (!playing) return;

  // Gör flera steg per frame beroende på hastighet
  let steps = int(speed * 3); // fler steg ju snabbare hastighet
  for (let s = 0; s < steps; s++) {
    progress += 0.5; // mindre stegstorlek för tätare punkter

    // Grundposition längs en rak linje
    let t = progress / 100;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    let noiseScale = 0.01;
    let offsetX = map(noise(t * 5, frameCount * noiseScale), 0, 1, -50, 50);
    let offsetY = map(noise(t * 5 + 100, frameCount * noiseScale), 0, 1, -50, 50);

    stroke(currentColor);
    strokeWeight(2);
    point(x + offsetX, y + offsetY);

    if (progress >= 100) {
      synth.triggerRelease();
      playing = false;
      newLine();
      break; 
    }
  }

  if (frameCount % 25 === 0) { 
    speed += random(-2, 2);
    speed = constrain(speed, 0.5, 12);

    let freq = map(speed, 0.5, 12, 100, 2000);
    synth.frequency.linearRampTo(freq, 0.1); 
  }
}


function keyPressed() {
  if (key === 'r' || key === 'R') {
    clear();
    background(10, 10, 18);
    newLine();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 18);
}
