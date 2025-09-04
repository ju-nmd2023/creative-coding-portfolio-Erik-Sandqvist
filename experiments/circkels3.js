let params = {
    w: 600,
    h: 600,
    cols: 5,           // antal kolumner
    rows: 5,           // antal rader
    r: 50,             // radie på varje cirkel
    baseLines: 5,     // första cirkelns linjer
    speed: 1           // hur många linjer per frame
  };
  
  let currentLine = 0;
  
  function setup() { 
    createCanvas(params.w, params.h);
    angleMode(RADIANS);
    stroke(0);
    noFill();
  }
  
  function draw() {
    background('rgba(9, 97, 190, 1)');
  
    let cellW = width / params.cols;
    let cellH = height / params.rows;
  
    for (let gy = 0; gy < params.rows; gy++) {
      for (let gx = 0; gx < params.cols; gx++) {
        let cx = gx * cellW + cellW / 2;
        let cy = gy * cellH + cellH / 2;
  
        // cirkelns index i gridet (0–24)
        let index = gy * params.cols + gx;
  
        // beräkna max antal linjer för denna cirkel
        // beräkna max antal linjer för denna cirkel
    let totalLines = params.baseLines + index;
        let angleStep = TWO_PI / totalLines;
  
        push();
        translate(cx, cy);
  
        // rita cirkelns kant
        ellipse(0, 0, params.r * 2);
  
        // rita linjer för denna cirkel
        let linesToDraw = min(currentLine, totalLines);
        for (let i = 0; i < linesToDraw; i++) {
          let a = i * angleStep;
          let x1 = cos(a) * params.r;
          let y1 = sin(a) * params.r;
          let x2 = cos(a + PI) * params.r;
          let y2 = sin(a + PI) * params.r;
          line(x1, y1, x2, y2);
        }
  
        pop();
      }
    }
  
    // uppdatera antal linjer per frame
    currentLine += params.speed;
  
    // stoppa när sista cirkeln är klar
    let maxLines = params.baseLines * (params.cols * params.rows);
    if (currentLine > maxLines) {
      noLoop();
    }
  }
  