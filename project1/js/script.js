"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

let lyricData;
let findLyric = {
  verse: `verse0_0`,
  numVerse: 0,
  subVerse: 0,
  index: 0
};
let images = [];
let words = [];

function preload() {
  lyricData = loadJSON(`assets/data/lyrics.json`);
}

function setup() {
  noCanvas();
  setInterval(morrison, 2000);
}

function assessRate() {
  let morrison = lyricData.verse1_0.morrison;
  let reed = lyricData.verse1_0.reed;

  let mPercent = 100 / morrison.elements;
  let rPercent = 100 / reed.elements;

  let ratio = mPercent / rPercent;
  return ratio;
}

function sequenceMorrison() {
  findLyric.index++;
  if (findLyric.index ===
  lyricData.verse0_0.morrison.length) {
    findLyric.index = 0;
  }
}

function getMorrisonImage() {
  let search = lyricData.verse0_0.morrison[findLyric.index];
  let url = `https://loremflickr.com/320/240/${search}`;
  if (images.length === 0) {
    // display the image
    let img = createImg(url);
    images.push(img);
    // display the word
    let word = createDiv(`${search}`);
    words.push(word);
  }
  else {
    // remove the previous image
    let trash = images[0];
    trash.remove();
    images.shift();
    // remove the previous word
    let garbage = words[0];
    garbage.remove();
    words.shift();
    // display the current image
    let img = createImg(url);
    images.push(img);
    // display the current word
    let word = createDiv(`${search}`);
    words.push(word);
  }
}

function morrison() {
  sequenceMorrison();
  getMorrisonImage();
}

// function getReedImage(verse, subVerse, index) {
//   let search = lyricData.`verse${verse}_${subVerse}`.reed[index];
//   let url = `https://loremflickr.com/320/240/${search}`;
//   let img = createImg(url);
// }

function mousePressed() {

}
