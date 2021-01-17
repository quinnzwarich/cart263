"use strict";

/**************************************************
Field of Artificial Flowers
Quinn Zwarich

This simulation generates a field of flowers using perlin noise.
The idea behind the interaction is that it becomes an unending game of
"loves me... loves me not..." that the user plays through uprooting flowers
(as opposed to delicately plucking pedals). In doing so, they also generate notes
from a minor pentatonic scale.
**************************************************/

let pedals = {
  x1: 0,
  y1: 15,
  x2: 0,
  y2: 0,
  x3: 5,
  y3: 10,
};

let stem = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 60,
};

let levitate = {
  z: 0,
  maxSpeed: 5,
  accel: 0.25,
};

let cnv;
let font;
let note1;
let note2;
let note3;
let note4;
let note5;

let frames;

let columns = 0;
let rows = 0;
let scale = 50;

let movements = new Array(columns);
let zCoordinates = new Array(columns);
let flowers = new Array(columns);
let flowerAngles = new Array(columns);
let flowerColours = new Array(columns);

let state = `title`;

function preload() {
  font = loadFont("assets/fonts/england.ttf");
  note1 = loadSound(`assets/sounds/Fsharp3.wav`);
  note2 = loadSound(`assets/sounds/A3.wav`);
  note3 = loadSound(`assets/sounds/B3.wav`);
  note4 = loadSound(`assets/sounds/Csharp4.wav`);
  note5 = loadSound(`assets/sounds/E4.wav`);
}

function setup() {

  // aligns the canvas so that it displays from the center of the window
  // taken from the wiki
  let cnv = createCanvas(1000, 1000, WEBGL);
  let cnvX = (windowWidth - width) / 2;
  let cnvY = (windowHeight - height) / 2;
  cnv.position(cnvX, cnvY);

  columns = width / scale;
  rows = height / scale;

  writeArray();
}

function draw() {
  if (state === `title`) {
    title();
  } else if (state === `lovesMe`) {
    lovesMe();
  } else if (state === `lovesMeNot`) {
    lovesMeNot();
  }
}

// the flower is drawn by rotating a series of triangles along the origin of a line,
// various transformations are applied to have the design register as being 3 dimensional
function drawFlower(x, y, z, pedalsR, pedalsG, pedalsB, angle) {
  push();
  translate(250, 650, 250);
  translate(x, y, z);
  rotateX(-PI / 2);
  strokeWeight(0.5);
  stroke(211, 255, 204);
  drawStem();
  fill(pedalsR, pedalsG, pedalsB);
  stroke(pedalsR, pedalsG, pedalsB);
  rotateX(PI);
  rotateY(2 * PI);
  drawPedals(angle);
  pop();
}

function drawPedals(tempAngle) {
  for (let numPedals = 0; numPedals < 8; numPedals++) {
    rotateY(tempAngle);
    rotate(PI / 4);
    triangle(pedals.x1, pedals.y1, pedals.x2, pedals.y2, pedals.x3, pedals.y3);
  }
}

function drawStem() {
  line(stem.x1, stem.y1, stem.x2, stem.y2);
}

// if the background were drawn in setup, you would see multiples of the flowers as they grew !
function title() {
  background(0, 127, 255);

  push();
  fill(255);
  translate(0, -275, 250);
  textFont(font);
  textSize(70);
  textAlign(CENTER, CENTER);
  text(`Field of Artificial Flowers`, 0, 0);
  pop();

  push();
  rotateX(PI / 3);
  drawGrass();
  pop();
  push();
  rotateX(PI / 3);
  drawFlowers();
  pop();
}

function lovesMe() {
  background(0, 127, 255);

  push();
  fill(255);
  rotateX(PI / 3);
  translate(-87.5, 600, 250);
  textFont(font);
  textSize(35);
  text(`loves me`, 0, 0);
  pop();

  push();
  rotateX(PI / 3);
  drawGrass();
  pop();
  push();
  rotateX(PI / 3);
  drawFlowers();
  pop();
}

function lovesMeNot() {
  background(0, 127, 255);

  push();
  fill(255);
  rotateX(PI / 3);
  translate(-87.5, 600, 250);
  textFont(font);
  textSize(35);
  text(`loves me not`, 0, 0);
  pop();

  push();
  rotateX(PI / 3);
  drawGrass();
  pop();
  push();
  rotateX(PI / 3);
  drawFlowers();
  pop();
}

function writeArray() {

  // two dimensional arrays store values from noise space
  // I learned concepts involving arrays from the coding train
  let xOffset = 0;
  let yOffset = 0;
  for (let x = 0; x < columns; x++) {
    flowerColours[x] = new Array(rows);
    flowerAngles[x] = new Array(rows);
    flowers[x] = new Array(rows);
    movements[x] = new Array(rows);
    zCoordinates[x] = new Array(rows);
    for (let y = 0; y < rows - 1; y++) {
      flowerColours[x][y] = map(noise(xOffset, yOffset), 0, 1, 0, 255);
      flowerAngles[x][y] = map(noise(xOffset, yOffset), 0, 1, PI, 2 * PI);
      yOffset = yOffset + 1.75;

      movements[x][y] = 0;
      zCoordinates[x][y] = 0;
    }
    xOffset = xOffset + 1.75;
  }
}

function drawGrass() {
  translate(-width / 2, -height / 2);
  push();
  translate(0, 0, 150);
  noStroke();
  fill(186, 230, 179);
  rect(-width / 4, height / 6, width * 2, height);
  pop();
}

function drawFlowers() {
  randomSeed = 99;
  translate(-width / 2, -height / 2);

  // levitation accelerates as the user continues to press
  if (mouseIsPressed) {
    movements[randomPick.x][randomPick.y] =
      movements[randomPick.x][randomPick.y] + levitate.accel;
    movements[randomPick.x][randomPick.y] = constrain(
      movements[randomPick.x][randomPick.y],
      0,
      levitate.maxSpeed
    );
    zCoordinates[randomPick.x][randomPick.y] =
      zCoordinates[randomPick.x][randomPick.y] +
      movements[randomPick.x][randomPick.y];
  }
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 1; y++) {

      // draws patches of flowers according to noise values
      // if the flower is being levitated change its colour
      if (flowerColours[x][y] > 155) {
        let rValue = flowerColours[x];
        if (
          randomPick != undefined &&
          x === randomPick.x &&
          y === randomPick.y
        ) {
          rValue = flowerColours[y];
        }
        drawFlower(
          (x * scale) / 2,
          (y * scale) / 2,
          zCoordinates[x][y],
          rValue,
          flowerColours[y],
          flowerColours[x][y],
          flowerAngles[x][y]
        );
      }
    }
  }
}

// I received generous amounts of help from sam on this picking algorithm
// in order to find the locations of flowers, a while loop searches for random values
// until it finds one that is above 155 (the metric I used to plant flowers according to perlin noise)
let randomPick;
function mousePressed() {
  randomPick = {
    x: floor(random(columns)),
    y: floor(random(rows)),
  };

  while (flowerColours[randomPick.x][randomPick.y] < 155) {
    randomPick = {
      x: floor(random(columns)),
      y: floor(random(rows)),
    };
  }

  if (flowerColours[randomPick.x][randomPick.y] > 155) {
    if (state === `title`) {
      state = `lovesMe`;
    } else if (state === `lovesMe`) {
      state = `lovesMeNot`;
    } else if (state === `lovesMeNot`) {
      state = `lovesMe`;
    }
  }

  // play notes according to noise values, specifically those which have informed the location of a flower
  if (
    flowerColours[randomPick.x][randomPick.y] > 155 &&
    flowerColours[randomPick.x][randomPick.y] <= 160
  ) {
    note1.play();
  } else if (
    flowerColours[randomPick.x][randomPick.y] > 160 &&
    flowerColours[randomPick.x][randomPick.y] <= 165
  ) {
    note2.play();
  } else if (
    flowerColours[randomPick.x][randomPick.y] > 165 &&
    flowerColours[randomPick.x][randomPick.y] <= 170
  ) {
    note3.play();
  } else if (
    flowerColours[randomPick.x][randomPick.y] > 170 &&
    flowerColours[randomPick.x][randomPick.y] <= 175
  ) {
    note4.play();
  } else if (
    flowerColours[randomPick.x][randomPick.y] > 175 &&
    flowerColours[randomPick.x][randomPick.y] <= 255
  ) {
    note5.play();
  }
}
