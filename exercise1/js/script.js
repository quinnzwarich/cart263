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

let flowers = [];
let flowrs = [];
let globe = [];

const TOTAL = 12;
const RADIUS = 200;

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

  // code grifted from spherical geometry coding challenge
  for (let i = 0; i < TOTAL; i++) {
    let latitude = map(i, 0, TOTAL, 0, PI);
    for (let j = 0; j < TOTAL; j++) {
      let longitude = map(j, 0, TOTAL, 0, 2 * PI);
      let r = map(noise(latitude), 0, 1, 127, 255);
      let g = map(noise(longitude), 0, 1, 127, 255);
      let b = map(noise(latitude, longitude), 0, 1, 127, 255);
      let x = RADIUS * sin(latitude) * cos(longitude);
      let y = RADIUS * sin(latitude) * sin(longitude);
      let z = RADIUS * cos(latitude);
      let flower = new Flowr(x, y, z, r, g, b, latitude, longitude);
      flowrs.push(flower);
    }
  }
}

function draw() {
  orbitControl();
  currentState.draw();
}

function keyPressed() {
  currentState.keyPressed();
}
