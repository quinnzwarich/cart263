/**************************************************
project 2 proposal
Quinn Zwarich

I only got as far as making the model of the pencil,
I wanted to implement a mechanism to actually unfold it to
reveal an image inside but I haven't much luck yet in this regard.
**************************************************/

const grid = [];
const xCoords = [];
const yCoords = [];
const flock = [];

const columns = 10;
const rows = 10;
const unit = 50;

let xOff = 0;
let yOff = 0;
let movement = 0;

let cam;

function setup() {
  createCanvas(640, 480, WEBGL);

  // thruForest();
  // setInterval(thruForest, 500);

  user = createVector(width/2, height/2);
  cam = createCamera();

  for (let i = 0; i < 3; i++) {
    let x = width/2;
    let y = height/2;
    flock.push(new Boid(x, y));
  }
}

function draw() {
  background(255);
  translate(-width/2, -height/2);

  console.log(centerOfBoids());

  let cameraPos = centerOfBoids();
  cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  // console.log(cameraPos);

  for (let boid of flock) {
    // boid.edges();
    boid.viewBorders();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}

function centerOfBoids() {
  let centerPos = createVector(0, 0);

  for (let i = 0; i < flock.length; i++) {
    let boid = flock[i];
    centerPos.add(boid.position);
  }
  centerPos.div(flock.length);
  centerPos.z = (height/2.0) / tan(PI*30.0 / 180.0);
  return centerPos;
}

function thruForest() {
  // clear old coordinates
  xCoords.length = 0;
  yCoords.length = 0;
  // generate new coordinates
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i][j] = noise(xOff, yOff);
      if (grid[i][j] > 0.7) {
        let x = i * unit + unit/2;
        let y = j * unit + unit/2
        xCoords.push(x);
        yCoords.push(y);
      }
      xOff += 0.618;
    }
    yOff += 0.618;
  }
}

function drawForest() {
  for (let i = 0; i < xCoords.length; i++) {
    let x = xCoords[i];
    let y = yCoords[i];
    ellipse(x, y, unit/2);
  }
}
