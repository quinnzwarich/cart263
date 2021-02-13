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

  let verse = lyricData.verse1_0.morrison;
  console.log(verse.join(` `));
}

function draw() {
  background(255);
}
