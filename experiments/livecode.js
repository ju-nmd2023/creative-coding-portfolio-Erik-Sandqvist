let positon;
let velocity;
let segments = 6;


function setup() {
    createCanvas(innerWidth, innerHeight);
    position = createVector(100, 100);
    velocity = createVector(5, 8);
    background(250);
}

function draw() {
noStroke();

push();
fill(15, random(100), 53);
ellipse(position.x, position.y, random(60));
ellipse(width - position.x, height - position.y, random(60));
pop();

push();
fill(80, random(255), 200);
ellipse(position.x, height - position.y, random(60));
ellipse(width - position.x, position.y, random(60));
pop();

if (position.x > width || position.x < 0) {
    velocity.x *= -1;
}

if (position.y > height || position.y < 0) {
    velocity.y *= -1;
}

const mouse = createVector(mouseX, mouseY);
acceleration = p5.Vector.sub(mouse, position);

velocity.add(acceleration);
velocity.limit(10);
position.add(velocity);

}

