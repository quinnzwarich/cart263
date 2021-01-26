"use strict";

/**************************************************
Lonely Planet
Quinn Zwarich

This was aesthetically inspired by the game Lovely Planet
though in any other regard it is not very similar. It strays
a little far from sausage dog but makes use of most of the ideas
from the activity such as using polymorphism to create a special
object that the user must find.
**************************************************/

let grotesk;
let theme;
let impulse;
let bobfx;
let selectfx;
let correctfx;
let cam;
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
  grotesk = loadFont("assets/fonts/grotesk.otf");
  theme = loadSound(`assets/sounds/lonelyplanettheme.mp3`);
  impulse = createConvolver(`assets/sounds/impulse.mp3`);
  bobfx = loadSound(`assets/sounds/bobsound.mp3`);
  selectfx = loadSound(`assets/sounds/selectsound.mp3`);
  correctfx = loadSound(`assets/sounds/correctsound.mp3`);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  userStartAudio();
  currentState = new Title();

  // audio settings
  theme.disconnect();
  impulse.process(theme);
  bobfx.playMode(`untilDone`);
  selectfx.playMode(`untilDone`);
  correctfx.playMode(`untilDone`);

  // text initialization
  stanza1 = createGraphics(200, 200, WEBGL);
  stanza2 = createGraphics(200, 200, WEBGL);
  stanza3 = createGraphics(200, 200, WEBGL);
  stanza4 = createGraphics(200, 200, WEBGL);
  stanza5 = createGraphics(200, 200, WEBGL);
  stanza6 = createGraphics(200, 200, WEBGL);
  stanza7 = createGraphics(200, 200, WEBGL);
  stanza8 = createGraphics(200, 200, WEBGL);

  // where the star is created depends upon this random integer pair
  randomIndexI = floor(random(0, TOTAL));
  randomIndexJ = floor(random(0, TOTAL));

  // code involving spherical geometry has been grifted from the spherical geometry coding challenge
  // it is important that flowers are stored in a 2D array so that they can be more easily accessed using the arrow keys
  // coordinates for the sphere and its corresponding greyscale values are stored as well
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
        flowrs[i][j] = new FreakieFlowr(
          x,
          y,
          z,
          r1,
          g1,
          b1,
          latitude,
          longitude,
          r2,
          g2,
          b2
        );
      } else {
        flowrs[i][j] = new Flowr(x, y, z, r, g, b, a, latitude, longitude);
      }
      globe[i][j] = createVector(x, y, z);
      shading[i][j] = (r + g + b) / 3 - 32;
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
