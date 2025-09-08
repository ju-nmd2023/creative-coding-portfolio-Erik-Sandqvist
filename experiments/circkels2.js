let params = {
  w: 600,
  h: 600,
  r: 200,           
  totalLines: 500, 
  speed: 1          
};

let angles = [];   
let currentLine = 0;

function setup() {
  createCanvas(params.w, params.h);
  angleMode(RADIANS);
  stroke(255);
  noFill();

  for (let i = 0; i < params.totalLines; i++) {
    angles.push(random(TWO_PI));
  }
}

function draw() {
  background('rgba(9, 97, 190, 1)');

  ellipse(width / 2, height / 2, params.r * 2);

  translate(width / 2, height / 2);

  for (let i = 0; i < currentLine; i++) {
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

  currentLine += params.speed;

  if (currentLine > params.totalLines) {
    noLoop();
  }
} 
