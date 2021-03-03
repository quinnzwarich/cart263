"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

let lyricData;

let findLyric = {
  verse: 0,
  stanza: 0,
  index: 0
};
let morrison = {
  rate: 4000,
  images: [],
  words: [],
  searches: [],
  callback: false
};
let reed = {
  rate: 0,
  images: [],
  words: [],
  searches: [],
  callback: false
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
  // compare the length of each vocalists stanza
  let mPercent = 100 / mLength;
  let rPercent = 100 / rLength;
  let ratio = mPercent / rPercent;
  // determine the rate at which sterling speaks
  // in relation to how quickly his image can be loaded
  if (morrison.callback) {
    morrison.rate = 0;
    morrison.rate++;
  }
  // lou always speaks fewer words
  // so determine his rate in relation to sterling's
  reed.rate = morrison.rate * ratio;
}

function sequenceMorrison() {
  console.log(findLyric.index);
  console.log(findLyric.stanza);
  console.log(findLyric.verse);
  console.log(morrison.searches);

  if (findLyric.index <
  lyricData.verses[findLyric.verse][findLyric.stanza].morrison.length &&
  morrison.callback) {
    assessRate();
    findLyric.index++;
    if (findLyric.index >=
    lyricData.verses[findLyric.verse][findLyric.stanza].morrison.length) {
      findLyric.index = 0;
      findLyric.stanza++;
      if (findLyric.stanza >= lyricData.verses[findLyric.verse].length) {
        findLyric.stanza = 0;
        findLyric.verse++;
        if (findLyric.verse > lyricData.verses.length) {
          findLyric.verse = 0;
        }
      }
    }
  }
}


function displayMorrison() {
  if (morrison.searches.length === 0) {
    // search for the first image
    let search = lyricData.verses[findLyric.verse][findLyric.stanza].morrison[findLyric.index];
    let url = `https://loremflickr.com/320/240/${search}`;
    morrison.searches.push(search);
    // cue the sequence
    morrison.callback = true;
    // display the first word
    let word = createDiv(`${search}`);
    morrison.words.push(word);
    // display the first image
    let img = createImg(url, ``,
    `anonymous`, morrisonCallback);
    morrison.images.push(img);
  }
  else if (morrison.searches.length === 1) {
    // find the previous and current search
    let previousSearch = morrison.searches[0];
    let search = lyricData.verses[findLyric.verse][findLyric.stanza].morrison[findLyric.index];
    let url = `https://loremflickr.com/320/240/${previousSearch},${search}/all`;
    morrison.searches.push(search);
    // cue the sequence
    morrison.callback = true;
    // remove the previous image
    let trash = morrison.images[0];
    trash.remove();
    morrison.images.shift();
    // display the current word
    let word = createDiv(`${search}`);
    morrison.words.push(word);
    // display the current image
    let img = createImg(url, ``,
    `anonymous`, morrisonCallback);
    morrison.images.push(img);
  }
  else {
    // remove the least recent search
    morrison.searches.shift();
    // find the previous and current search
    let previousSearch = morrison.searches[0];
    let search = lyricData.verses[findLyric.verse][findLyric.stanza].morrison[findLyric.index];
    let url = `https://loremflickr.com/320/240/${previousSearch},${search}/all`;
    morrison.searches.push(search);
    // cue the sequence
    morrison.callback = true;
    // remove the previous image
    let trash = morrison.images[0];
    trash.remove();
    morrison.images.shift();
    // display the current word
    let word = createDiv(`${search}`);
    morrison.words.push(word);
    // display the current image
    let img = createImg(url, ``,
    `anonymous`, morrisonCallback);
    morrison.images.push(img);
  }
}

function morrisonCallback() {
  // remove the previous word
  let garbage = morrison.words[0];
  garbage.remove();
  morrison.words.shift();
  // cue the sequence
  morrison.callback = false;
}

function updateMorrison() {
  displayMorrison();
  sequenceMorrison();
}

function mousePressed() {

}
