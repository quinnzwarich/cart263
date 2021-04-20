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

let user;

function setup() {
  createCanvas(1000, 1000, WEBGL);

  // thruForest();
  // setInterval(thruForest, 500);

  user = createVector(0, 0);

  for (let i = 0; i < 2; i++) {
    let x = width/2;
    let y = height - 50;
    flock.push(new Boid(x, y));
  }
}

function draw() {
  background(255);
  translate(-width/2, -height/2);

  user = createVector(mouseX, mouseY);

  for (let boid of flock) {
    boid.edges();
    boid.viewBorders();
    boid.flock(flock, user);
    boid.update();
    boid.show();
  }
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
