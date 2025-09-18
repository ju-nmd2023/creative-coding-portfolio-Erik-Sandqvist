// ---------- KONFIG ----------
const WHITE_KEYS = ['C','D','E','F','G','A','B'];
const WHITE_POS = [0, 2, 4, 5, 7, 9, 11];
const BLACK_EXISTS = [true, true, false, true, true, true, false];

const KEYBOARD_MAP = {
  'z': {note:'C', accidental:0, idx:0},
  's': {note:'C', accidental:1, idx:0},
  'x': {note:'D', accidental:0, idx:1},
  'd': {note:'D', accidental:1, idx:1},
  'c': {note:'E', accidental:0, idx:2},
  'v': {note:'F', accidental:0, idx:3},
  'g': {note:'F', accidental:1, idx:3},
  'b': {note:'G', accidental:0, idx:4},
  'h': {note:'G', accidental:1, idx:4},
  'n': {note:'A', accidental:0, idx:5},
  'j': {note:'A', accidental:1, idx:5},
  'm': {note:'B', accidental:0, idx:6},
  ',': 'octDown',
  '.': 'octUp'
};

// ---------- Tone.js ----------
const poly = new Tone.PolySynth(Tone.Synth, {
  maxPolyphony: 10,
  oscillator: { type: 'sawtooth' },
  envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 1.0 }
}).toDestination();

let baseOctave = 4;
let sustainOn = false;
let activeNotes = {};
let firstInteraction = false;

let keyRects = [];
let whiteKeyCount = 14; // två oktaver

// ---------- p5.js ----------
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateKeys();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateKeys();
}

function draw() {
  background(30);
  drawKeyboard();
}

function calculateKeys() {
  keyRects = [];
  const whiteW = width / whiteKeyCount;

  for (let i = 0; i < whiteKeyCount; i++) {
    const degree = i % 7;
    const octaveShift = Math.floor(i / 7);
    const octave = baseOctave + octaveShift;
    const noteName = WHITE_KEYS[degree] + octave;
    keyRects.push({
      x: i * whiteW, y: height*0.3, w: whiteW, h: height*0.65,
      note: noteName, isBlack: false
    });
  }

  for (let i = 0; i < whiteKeyCount; i++) {
    const degree = i % 7;
    if (BLACK_EXISTS[degree]) {
      const octaveShift = Math.floor(i / 7);
      const octave = baseOctave + octaveShift;
      const white = keyRects[i];
      const bx = white.x + white.w * 0.66;
      const bw = white.w * 0.66;
      keyRects.push({
        x: bx, y: height*0.3, w: bw, h: height*0.4,
        note: WHITE_KEYS[degree] + '#' + octave, isBlack: true
      });
    }
  }
  keyRects.sort((a,b)=>a.isBlack - b.isBlack);
}

function drawKeyboard() {
  for (const k of keyRects.filter(k=>!k.isBlack)) {
    fill(activeNotes[k.note] ? 200 : 240);
    rect(k.x, k.y, k.w, k.h);
    fill(0);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text(k.note, k.x + k.w/2, k.y + k.h - 4);
  }
  for (const k of keyRects.filter(k=>k.isBlack)) {
    fill(activeNotes[k.note] ? 100 : 20);
    rect(k.x, k.y, k.w, k.h);
  }
}

// ---------- Input ----------
function mousePressed() {
  if (!firstInteraction) { Tone.start(); firstInteraction = true; }
  handlePointer(mouseX, mouseY);
}

function mouseReleased() {
  if (!sustainOn) for (const n in activeNotes) noteOff(n);
}

function handlePointer(px, py) {
  let found = keyRects.find(k => px>=k.x && px<=k.x+k.w && py>=k.y && py<=k.y+k.h && k.isBlack) ||
              keyRects.find(k => px>=k.x && px<=k.x+k.w && py>=k.y && py<=k.y+k.h);
  if (found) noteOn(found.note);
}

const pressedKeys = {};
function keyPressed() {
  const k = key.toLowerCase();
  const map = KEYBOARD_MAP[k];
  if (!map) return;

  if (map==='octUp') { baseOctave=min(6,baseOctave+1); calculateKeys(); return; }
  if (map==='octDown'){ baseOctave=max(1,baseOctave-1); calculateKeys(); return; }

  if (pressedKeys[k]) return;
  pressedKeys[k]=true;

  const match = keyRects.find(r=>{
    const name=r.note.replace(/[0-9]/g,'');
    const octave=parseInt(r.note.replace(/[^0-9]/g,''));
    const base=name.replace('#','');
    const sharp=name.includes('#')?1:0;
    return base===map.note && sharp===map.accidental && octave>=baseOctave;
  });
  if (match) noteOn(match.note);
}

function keyReleased() {
  const k=key.toLowerCase();
  pressedKeys[k]=false;
  if (!sustainOn) for (const n in activeNotes) noteOff(n);
}

// ---------- Note on/off ----------
function noteOn(note) {
  if (!firstInteraction) { Tone.start(); firstInteraction=true; }
  poly.triggerAttack(note);
  activeNotes[note]=true;
}

function noteOff(note) {
  poly.triggerRelease(note);
  delete activeNotes[note];
}
