let synth;
let firstInteraction = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 0.5 }
  }).toDestination();
}

function draw() {
  background(30);
  fill(200, 100, 150);
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);
}

function mousePressed() {
  if (!firstInteraction) {
    Tone.start().then(() => {
      console.log("AudioContext started");
    });
    firstInteraction = true;
  }
}

function mouseMoved() {
  if (firstInteraction) {
    let freq = map(mouseX, 0, width, 200, 1000);
    synth.triggerAttackRelease(freq, "8n"); 
  }
}
