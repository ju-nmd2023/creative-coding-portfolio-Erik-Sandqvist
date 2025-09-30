//This artwork is a continuation of the previous one and all done by me after looking around on the p5 site and documentation

let params = {
  w: 600,
  h: 600,
  cols: 5,
  rows: 5,
  r: 50,
  baseLines: 1,
  lineStep: 5,
  speed: 2
};

let currentLine = 0;
let anglesGrid = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  stroke(255);
  noFill();

  for (let gy = 0; gy < params.rows; gy++) {
    for (let gx = 0; gx < params.cols; gx++) {
      let index = gy * params.cols + gx;
      let totalLines = params.baseLines + index * params.lineStep;

      let circleAngles = [];
      for (let i = 0; i < totalLines; i++) {
        circleAngles.push(random(TWO_PI));
      }
      anglesGrid.push(circleAngles);
    }
  }
}

function draw() {
  background('rgba(9, 97, 190, 1)');

  let cellW = width / params.cols;
  let cellH = height / params.rows;

  for (let gy = 0; gy < params.rows; gy++) {
    for (let gx = 0; gx < params.cols; gx++) {
      let cx = gx * cellW + cellW / 2;
      let cy = gy * cellH + cellH / 2;

      let index = gy * params.cols + gx;
      let totalLines = params.baseLines + index * params.lineStep;
      let angles = anglesGrid[index];

      push();
      translate(cx, cy);

      

    
      let linesToDraw = min(currentLine, totalLines);
      for (let i = 0; i < linesToDraw; i++) {
        let a = angles[i];

        let x1 = cos(a) * params.r;
        let y1 = sin(a) * params.r;
        let x2 = cos(a + PI) * params.r;
        let y2 = sin(a + PI) * params.r;

        let jitter = 1;
        x1 += random(-jitter, jitter);
        y1 += random(-jitter, jitter);
        x2 += random(-jitter, jitter);
        y2 += random(-jitter, jitter);

        line(x1, y1, x2, y2);
      }

      pop();
    }
  }

  currentLine += params.speed;
 
  let maxLines = params.baseLines + (params.cols * params.rows - 1) * params.lineStep;
  if (currentLine > maxLines) {
    noLoop();
  }
}
