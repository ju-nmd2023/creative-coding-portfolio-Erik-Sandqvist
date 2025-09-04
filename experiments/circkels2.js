let params = {
  w: 600,
  h: 600,
  r: 200,           
  totalLines: 800,  // antal linjer som ritas totalt
  speed: 4          // hur många linjer per frame
};

let angleStep;
let currentLine = 0;

function setup() {
  createCanvas(params.w, params.h);
  angleMode(RADIANS);
  stroke(0);
  noFill();

 
  angleStep = TWO_PI / params.totalLines;
}

function draw() {

  background('rgba(9, 97, 190, 1)');

  // cirkel med kant
  ellipse(width / 2, height / 2, params.r * 2);

  translate(width / 2, height / 2);

  // rita linjer hittills
  for (let i = 0; i < currentLine; i++) {
    let a = i * angleStep;
    let x1 = cos(a) * params.r;
    let y1 = sin(a) * params.r;
    let x2 = cos(a + PI) * params.r;
    let y2 = sin(a + PI) * params.r;

    line(x1, y1, x2, y2);
  }

  // uppdatera antal linjer per frame
  currentLine += params.speed;

  // stoppa när alla är ritade
  if (currentLine > params.totalLines) {
    noLoop();
  }
}
