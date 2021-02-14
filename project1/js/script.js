"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

let lyricData;

function preload() {
  lyricData = loadJSON(`assets/data/lyrics.json`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
}

// function assessRate() {
//   let morrison = lyricData.verse1_0.morrison;
//   let reed = lyricData.verse1_0.reed;
//
//   let mPercent = 100 / morrison.elements;
//   let rPercent = 100 / reed.elements;
//
//   let ratio = mPercent / rPercent;
//   return ratio;
// }

function recitedMorrison() {
  let morrison = lyricData.verse1_0.morrison;

  responsiveVoice.speak(morrison.join(`  `), "UK English Male", {onstart: reciteReed});
}

function reciteReed() {
  let morrison = lyricData.verse1_0.morrison;
  let reed = lyricData.verse1_0.reed;

  let mPercent = 100 / morrison.length;
  let rPercent = 100 / reed.length;

  let ratio = mPercent / rPercent;

  responsiveVoice.speak(reed.join(`  `), "UK English Male", {rate: ratio});
}

function mousePressed() {
  recitedMorrison();
}
