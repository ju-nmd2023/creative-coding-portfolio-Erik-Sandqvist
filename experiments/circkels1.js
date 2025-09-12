let params = {
    w: 600,    
    h: 600,
    margin: 60,  
    bg: 'rgba(9, 97, 190, 1)',
    ink: 'rgba(255, 255, 255, 1)', 
    cols: 12,
    rows: 18,
    freeRows: 3, 
    seed: 1
  };
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2);
    noLoop();
    redrawAll();
  }
  
  function redrawAll() {
    randomSeed(params.seed);
    background(params.bg);
    noStroke();
    fill(params.bg);
    rect(0, 0, width, height);
    drawGridArt();
  }
  
  function drawGridArt() {
    const { margin, cols, rows } = params;
    const gridW = width - margin * 2;
    const gridH = height - margin * 2;
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    const r = Math.min(cellW, cellH) * 0.42;
  
    stroke(params.ink);
    noFill();
  
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const cx = margin + gx * cellW + cellW / 2;
        const cy = margin + gy * cellH + cellH / 2;
  
        const steps = floor(map(gy, 0, rows - 1, 20, 320));
        const useClip = gy >= params.freeRows;
  
        if (useClip) {
          beginClipCircle(cx, cy, r);
        }
  
        push();
        translate(cx, cy);
        drawCell(steps, r);
        pop();
  
        if (useClip) {
          endClip();
        }
      }
    }
  }
  
  function drawCell(steps, r) {
    strokeWeight(1);
    const loops = 6;
    for (let i = 0; i < loops; i++) randomWalk(steps, r);
  }
  
  function randomWalk(steps, r) {
    let x = random(-r, r), y = random(-r, r);
    beginShape();
    for (let i = 0; i < steps; i++) {
      vertex(x, y);
      const ang = random(TWO_PI);
      const stepLen = r * 0.2 * random(0.2, 1);
      x += cos(ang) * stepLen;
      y += sin(ang) * stepLen;
    }
    endShape();
  }
  
  function beginClipCircle(x, y, r) {
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(x, y, r, 0, Math.PI * 2);
    drawingContext.clip();
  }
  
  function endClip() {
    drawingContext.restore();
  }
  