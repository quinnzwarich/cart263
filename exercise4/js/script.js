"use strict";

/**
bubble popper
Quinn Zwarich

peepee poopoo
*/

let video;
let handpose;
let predictions = [];
let strings = [];

const NUM_STRINGS = 6;

function preload() {

}

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < NUM_STRINGS; i++) {
    let increment = i * (80 / 6);
    let y = 200 + (80/12) + increment;
    let string = new GuitarString(y);
    strings.push(string);
  }

  // video = createCapture(VIDEO);
  // video.hide();
  //
  // handpose = ml5.handpose(video, {
  //   flipHorizontal:  true
  // }, function() {
  //   console.log(`model loaded`);
  // });
  //
  // handpose.on(`predict`, function (results) {
  //   // console.log(results);
  //   predictions = results;
  // });
}

function draw() {
  background(0);
  displayGuitar();

  // if (predictions.length > 0) {
  //   let hand = predictions[0];
  //   let index = hand.annotations.indexFinger;
  //   let tip = index[3];
  //   let base = index[0];
  //   let tipX = tip[0];
  //   let tipY = tip[1];
  //   let baseX = base[0];
  //   let baseY = base[1];
  // }
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
