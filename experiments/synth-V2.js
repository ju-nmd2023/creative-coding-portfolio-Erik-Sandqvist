let synth;
let reverb, delay;
let firstInteraction = false;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  synth = new Tone.FMSynth({
    harmonicity: 2,
    modulationIndex: 8,
    oscillator: { type: "sine" },
    envelope: { attack: 0.3, decay: 0.5, sustain: 0.4, release: 2 },
    modulation: { type: "triangle" },
    modulationEnvelope: { attack: 0.2, decay: 0.3, sustain: 0.2, release: 1 }
  });

  reverb = new Tone.Reverb({ decay: 6, wet: 0.5 });
  delay = new Tone.FeedbackDelay("8n", 0.3);

  synth.chain(delay, reverb, Tone.Destination);

  noStroke();
}

function draw() {
  background(20, 20, 30, 40);

  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    fill(c.color[0], c.color[1], c.color[2], c.alpha);
    ellipse(c.x, c.y, c.size);

    c.size += 1.5;
    c.alpha -= 2;

    if (c.alpha <= 0) {
      circles.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (!firstInteraction) {
    Tone.start();
    firstInteraction = true;
  }
}

function mouseMoved() {
  if (firstInteraction) {
    let freq = map(mouseX, 0, width, 200, 800); 
    synth.triggerAttackRelease(freq, "8n");

    let hue = map(freq, 200, 800, 180, 300);
    let c = color(`hsla(${hue}, 70%, 60%, 0.8)`);

    circles.push({
      x: mouseX,
      y: mouseY,
      size: 40,
      alpha: 200,
      color: [red(c), green(c), blue(c)]
    });
  }
}
