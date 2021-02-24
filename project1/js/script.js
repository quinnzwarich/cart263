"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

let lyricData;

let search = ``;
let url = ``;

let findLyric = {
  verse: 0,
  stanza: 0,
  index: 0
};
let morrison = {
  rate: 0,
  images: [],
  words: []
};
let reed = {
  rate: 0,
  images: [],
  words: []
};

function preload() {
  lyricData = loadJSON(`assets/data/lyrics.json`);
}

function setup() {
  noCanvas();
  assessRate();
  setInterval(updateMorrison, morrison.rate);
}

function assessRate() {
  let mLength = lyricData.verses[findLyric.verse][findLyric.stanza].morrison.length;
  let rLength = lyricData.verses[findLyric.verse][findLyric.stanza].reed.length;

  let mPercent = 100 / mLength;
  let rPercent = 100 / rLength;
  let ratio = mPercent / rPercent;

  morrison.rate = 500;
  reed.rate = morrison.rate * ratio;
}

function sequenceMorrison() {
  if (
    findLyric.index <=
    lyricData.verses[findLyric.verse][findLyric.stanza].morrison.length
  ) {
    findLyric.index++;
  } else if (
    findLyric.index >
    lyricData.verses[findLyric.verse][findLyric.stanza].morrison.length
  ) {
    findLyric.stanza++;
    findLyric.index = 0;
    assessRate();
    if (findLyric.stanza > lyricData.verses[findLyric.verse].length * 2) {
      findLyric.verse++;
      assessRate();
      if (findLyric.verse > lyricData.verses.length) {
        findLyric.index = 0;
        findLyric.stanza = 0;
        findLyric.verse = 0;
      }
    }
  }
}


function getMorrisonImage() {
  search = lyricData.verses[findLyric.verse][findLyric.stanza].morrison[findLyric.index];
  url = `https://loremflickr.com/320/240/${search}`;
  if (morrison.images.length === 0) {
    // display the image
    let img = createImg(url, ``,
    `anonymous`, displayMorrisonWord);
    morrison.images.push(img);
  }
  else {
    // remove the previous image
    let trash = morrison.images[0];
    trash.remove();
    morrison.images.shift();
    // remove the previous word
    let garbage = morrison.words[0];
    garbage.remove();
    morrison.words.shift();
    // display the current image
    let img = createImg(url, ``,
    `anonymous`, displayMorrisonWord);
    morrison.images.push(img);
  }
}

function displayMorrisonWord() {
  // display the current word
  let word = createDiv(`${search}`);
  morrison.words.push(word);
}

function getReedImage() {
  let search = lyricData.verses[findLyric.verse][findLyric.stanza].reed[findLyric.index];
  let url = `https://loremflickr.com/320/240/${search}`;
  if (reed.images.length === 0) {
    // display the image
    let img = createImg(url);
    reed.images.push(img);
    // display the word
    let word = createDiv(`${search}`);
    reed.words.push(word);
  }
  else {
    // remove the previous image
    let trash = reed.images[0];
    trash.remove();
    reed.images.shift();
    // remove the previous word
    let garbage = reed.words[0];
    garbage.remove();
    reed.words.shift();
    // display the current image
    let img = createImg(url);
    reed.images.push(img);
    // display the current word
    let word = createDiv(`${search}`);
    reed.words.push(word);
  }
}

function updateMorrison() {
  sequenceMorrison();
  getMorrisonImage();
}

function mousePressed() {

}
