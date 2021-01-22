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

let font;
let note1;
let note2;
let note3;
let note4;
let note5;
let currentState;

let flowrs = [];
let globe = [];
let shading = [];

const TOTAL = 12;
let radius = 200;
let randomIndexI = 0;
let randomIndexJ = 0;

function preload() {
  font = loadFont("assets/fonts/england.ttf");
  note1 = loadSound(`assets/sounds/Fsharp3.wav`);
  note2 = loadSound(`assets/sounds/A3.wav`);
  note3 = loadSound(`assets/sounds/B3.wav`);
  note4 = loadSound(`assets/sounds/Csharp4.wav`);
  note5 = loadSound(`assets/sounds/E4.wav`);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  currentState = new Title;

  randomIndexI = floor(random(0, TOTAL));
  randomIndexJ = floor(random(0, TOTAL));

  // code grifted from spherical geometry coding challenge
  for (let i = 0; i < TOTAL + 1; i++) {
    let latitude = map(i, 0, TOTAL + 1, 0, PI);
    flowrs[i] = [];
    globe[i] = [];
    shading[i] = [];
    for (let j = 0; j < TOTAL + 1; j++) {
      let longitude = map(j, 0, TOTAL, 0, 2 * PI);
      let x = radius * sin(latitude) * cos(longitude);
      let y = radius * sin(latitude) * sin(longitude);
      let z = radius * cos(latitude);
      let r = map(noise(latitude), 0, 1, 127, 255);
      let g = map(noise(longitude), 0, 1, 127, 255);
      let b = map(noise(latitude, longitude), 0, 1, 127, 255);
      let a = map(noise(longitude), 0, 1, -PI, PI);
      if (randomIndexI === i && randomIndexJ === j) {
        let r1 = 255;
        let g1 = 255;
        let b1 = 204;
        let r2 = r1 - 32;
        let g2 = g1 - 32;
        let b2 = b1 - 32;
        flowrs[i][j] = new FreakieFlowr(x, y, z, r1, g1, b1, latitude, longitude, r2, g2, b2);
      }
      else {
        flowrs[i][j] = new Flowr(x, y, z, r, g, b, a, latitude, longitude);
      }
      globe[i][j] = createVector(x, y, z);
      shading[i][j] = ((r + g + b) / 3) - 32;
    }
  }
}

function draw() {
  orbitControl();
  currentState.draw();
}

function keyReleased() {
  currentState.keyReleased();
}

function keyPressed() {
  currentState.keyPressed();
}
