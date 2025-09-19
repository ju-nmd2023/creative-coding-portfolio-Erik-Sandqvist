// ---------- Input ----------
function mousePressed() {
  if (!firstInteraction) { Tone.start(); firstInteraction = true; }
  handlePointer(mouseX, mouseY);
}

function mouseReleased() {
  if (!sustainOn) for (const n in activeNotes) noteOff(n);
}

function handlePointer(px, py) {
  // Kontrollera om ett tangent-objekt under musen
  let found = keyRects.find(k => px>=k.x && px<=k.x+k.w && py>=k.y && py<=k.y+k.h && k.isBlack) ||
              keyRects.find(k => px>=k.x && px<=k.x+k.w && py>=k.y && py<=k.y+k.h);
  if (found) noteOn(found.note);
}

// ---------- Tangentbord ----------
const pressedKeys = {};
function keyPressed() {
  const k = key.toLowerCase();
  const map = KEYBOARD_MAP[k];
  if (!map) return;

  if (map==='octUp') { baseOctave=Math.min(6,baseOctave+1); calculateKeys(); return; }
  if (map==='octDown'){ baseOctave=Math.max(1,baseOctave-1); calculateKeys(); return; }

  if (pressedKeys[k]) return;
  pressedKeys[k]=true;

  const match = keyRects.find(r=>{
    const baseNote = r.note.replace(/[0-9]/g,'').replace('#','');
    const isSharp = r.note.includes('#') ? 1 : 0;
    const octave = parseInt(r.note.replace(/[^0-9]/g,''));
    return baseNote===map.note && isSharp===map.accidental && octave===baseOctave;
  });
  if (match) noteOn(match.note);
}

function keyReleased() {
  const k = key.toLowerCase();
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
