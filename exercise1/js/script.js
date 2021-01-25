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
let theme;
let impulse;
let bobfx;
let selectfx;
let correctfx;
let currentState;
let stanza1;
let stanza2;
let stanza3;
let stanza4;
let stanza5;
let stanza6;
let stanza7;
let stanza8;

let flowrs = [];
let globe = [];
let shading = [];

const TOTAL = 9;
let spacebar = false;
let radius = 200;
let randomIndexI = 0;
let randomIndexJ = 0;

function preload() {
  font = loadFont("assets/fonts/grotesk.otf");
  theme = loadSound(`assets/sounds/lonelyplanettheme.mp3`);
  impulse = createConvolver(`assets/sounds/impulse.mp3`);
  bobfx = loadSound(`assets/sounds/bobsound.mp3`);
  selectfx = loadSound(`assets/sounds/selectsound.mp3`);
  correctfx = loadSound(`assets/sounds/correctsound.mp3`);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  userStartAudio();
  currentState = new Title;

  theme.disconnect();
  impulse.process(theme);
  bobfx.playMode(`untilDone`);
  selectfx.playMode(`untilDone`);
  correctfx.playMode(`untilDone`);

  stanza1 = createGraphics(200, 200, WEBGL);
  stanza2 = createGraphics(200, 200, WEBGL);
  stanza3 = createGraphics(200, 200, WEBGL);
  stanza4 = createGraphics(200, 200, WEBGL);
  stanza5 = createGraphics(200, 200, WEBGL);
  stanza6 = createGraphics(200, 200, WEBGL);
  stanza7 = createGraphics(200, 200, WEBGL);
  stanza8 = createGraphics(200, 200, WEBGL);

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

function mousePressed() {
  currentState.mousePressed();
}

function keyReleased() {
  currentState.keyReleased();
}

function keyPressed() {
  currentState.keyPressed();
}
