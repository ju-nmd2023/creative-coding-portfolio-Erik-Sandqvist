// https://chatgpt.com/share/68d43716-11ac-800b-a75f-7233f46ee7e6 

let x1, y1, x2, y2; 
let progress = 0;
let speed = 1;
let paletteSets = [
  ["#06128f","#F34213","#deb514","#0FA3B1"],
  ["#7d0736","#E01A4F","#b51b07","#F9C22E","#53B3CB"],
  ["#0B1D26","#1B4353","#F2545B","#F5DFBB","#a8be42ff"],
  ["#0D0C1D","#595cffff","#254441","#43AA8B","#B2B09B"]
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

  progress += speed;

  let x = lerp(x1, x2, progress / 100);
  let y = lerp(y1, y2, progress / 100);

  stroke(currentColor);
  strokeWeight(2);
  line(x1, y1, x, y);

  if (frameCount % 20 === 0) { 
    speed += random(-1.5, 1.5);
    speed = constrain(speed, 0.5, 10);

    let freq = map(speed, 0.5, 10, 100, 1500);
    synth.frequency.linearRampTo(freq, 0.1); 
  }

  if (progress >= 100) {
    synth.triggerRelease();
    playing = false;
    newLine();
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
