"use strict";

/**
Jandek Simulator
Quinn Zwarich

A simulator designed to allow users to emulate the guitar stylings of
Jandek. Jandek would most often only play open strings with strange tunings,
which is an approach to guitar that works well with handpose as it would be far too
difficult to design a program where a user could fret and strum at the same time.
*/

let video;
let handpose;
let predictions = [];
let strings = [];
let sounds = [];
let amp;

let toggle = true;
const NUM_STRINGS = 6;

function preload() {
  // I recorded these samples myself
  // it is approximately the same tuning from Ready For The House
  for (let i = 0; i < NUM_STRINGS; i++) {
    let guitString = loadSound(`assets/sounds/guitstring${i}.wav`);
    sounds.push(guitString);
  }
}

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < NUM_STRINGS; i++) {
    let increment = i * (80 / 6);
    let y = 200 + (80 / 12) + increment;
    let f = map(i, 0, NUM_STRINGS - 1, 0.5, 1);
    let string = new GuitarString(y, f);
    strings.push(string);
  }

  // I could have approached measuring amplitude better
  // but I found using setInput along with multiple amplitudes to be confusing for whatever reason
  amp = new p5.Amplitude();

  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    console.log(`model loaded`);
    toggle = false;
  });

  handpose.on(`predict`, function (results) {
    predictions = results;
  });
}

function draw() {
  background(0);
  displayGuitar();
  displayText();

  if (predictions.length > 0) {
    // the program uses the the thumb, index finger, and middle finger
    // I want the user to approach playing as though they were finger picking,
    // without needing to have more hit detection than is necessary
    let hand = predictions[0];
    let thumb = hand.annotations.thumb[3];
    let thumbCoords = { x: thumb[0], y: thumb[1] };
    let index = hand.annotations.indexFinger[3];
    let indexCoords = { x: index[0], y: index[1] };
    let middle = hand.annotations.middleFinger[3];
    let middleCoords = { x: middle[0], y: middle[1] };

    // display the finger tips
    push();
    noStroke();
    ellipse(thumbCoords.x, thumbCoords.y, 20);
    ellipse(indexCoords.x, indexCoords.y, 20);
    ellipse(middleCoords.x, middleCoords.y, 20);
    pop();

    for (let i = 0; i < strings.length; i++) {
      let string = strings[i];
      let sound = sounds[i];
      string.hitDetection(thumbCoords, indexCoords, middleCoords, sound);
    }
  }
}

function displayGuitar() {
  // frame
  push();
  noStroke();
  fill(222, 184, 135);
  rectMode(CENTER);
  rect(width/3, height/2, 240, 240, 50);
  ellipse(2 * width/3, height/2, width / 1.6);
  pop();

  // soundhole
  push();
  noStroke();
  fill(0);
  ellipse((2 * width/3) - (width/4), height/2, height/4);
  pop();

  // bridge
  push();
  noStroke();
  fill(139, 69, 19);
  rectMode(CENTER);
  rect(2 * width/3, height/2, height/24, height/4);
  pop();

  // fretboard
  push();
  noStroke();
  fill(139, 69, 19);
  rectMode(CENTER);
  rect(width/6, height/2, width/3, height/6);
  pop();

  for (let i = 0; i < strings.length; i++) {
    let string = strings[i];
    string.vibrate();
    string.display();
  }
}

function displayText() {
  // the title doubles as an intro and a mechanism to let you know that the model is ready
  if (toggle) {
    push();
    fill(255);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(32);
    text(`jandek\nsimulator`, width / 6, height / 12);
    pop();
  }
}
