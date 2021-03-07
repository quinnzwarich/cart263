"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

let lyricData;
let cnv;

let dimI = 480;
let dimJ = 360;

let morrison = {
  toggle: false,
  rate: 0,
  images: [],
  words: [],
  index: 0,
  stanza: 0,
  verse: 0,
  timer: undefined,
  paragraph: undefined,
  xCoords: [],
  yCoords: [],
  values: [],
};
let reed = {
  rate: 0,
  images: [],
  words: [],
  index: 0,
  stanza: 0,
  verse: 0,
  timer: undefined,
  paragraph: undefined,
  xCoords: [],
  yCoords: [],
  values: [],
};

function preload() {
  lyricData = loadJSON(`assets/data/lyrics.json`);
}

function setup() {
  // position canvas above text
  cnv = createCanvas(1020, 405);
  cnv.parent("canvas");
  assessRateMorrison();
  assessRateReed();
  startMorrison();
  startReed();
  morrison.paragraph = document.getElementById("morrison");
  reed.paragraph = document.getElementById("reed");
}

function draw() {
  background(0);
  display();
}

function assessRateMorrison() {
  let mLength = lyricData.verses[morrison.verse][morrison.stanza].morrison.length;
  let rLength = lyricData.verses[reed.verse][reed.stanza].reed.length;
  // compare the length of each vocalists stanza
  let mPercent = 100 / mLength;
  let rPercent = 100 / rLength;
  let ratio = mPercent / rPercent;
  // determine sterling's rate in relation to the ratio
  morrison.rate = 3000 / ratio;
}

function assessRateReed() {
  let mLength = lyricData.verses[morrison.verse][morrison.stanza].morrison.length;
  let rLength = lyricData.verses[reed.verse][reed.stanza].reed.length;
  // compare the length of each vocalists stanza
  let mPercent = 100 / mLength;
  let rPercent = 100 / rLength;
  let ratio = mPercent / rPercent;
  // determine lou's rate in relation to sterling's
  reed.rate = morrison.rate / ratio;
}

function startMorrison() {
  morrison.timer = setInterval(updateMorrison, morrison.rate);
}

function startReed() {
  reed.timer = setInterval(updateReed, reed.rate);
}

function sequenceMorrison() {
  if (morrison.index <
  lyricData.verses[morrison.verse][morrison.stanza].morrison.length &&
  morrison.callback) {
    morrison.index++;
    if (morrison.index >=
    lyricData.verses[morrison.verse][morrison.stanza].morrison.length) {
      assessRateMorrison();
      morrison.index = 0;
      morrison.stanza++;
      if (morrison.stanza >= lyricData.verses[morrison.verse].length) {
        morrison.stanza = 0;
        morrison.verse++;
        if (morrison.verse >= lyricData.verses.length) {
          morrison.verse = 0;
        }
      }
    }
  }
}

function sequenceReed() {
  if (reed.index <
  lyricData.verses[reed.verse][reed.stanza].reed.length &&
  reed.callback) {
    reed.index++;
     if (reed.index >=
      lyricData.verses[reed.verse][reed.stanza].reed.length) {
      assessRateReed();
      reed.index = 0;
      reed.stanza++;
      if (reed.stanza >= lyricData.verses[reed.verse].length) {
        reed.stanza = 0;
        reed.verse++;
        if (reed.verse >= lyricData.verses.length) {
          reed.verse = 0;
        }
      }
    }
  }
}

function loadMorrison() {
  if (morrison.images === 0) {
    // find the first image
    let search = lyricData.verses[morrison.verse][morrison.stanza].morrison[morrison.index];
    let url = `https://loremflickr.com/480/360/${search}`;
    // cue the sequence
    morrison.callback = true;
    // append the first lyric
    let word = document.createTextNode(`${search} `);
    morrison.paragraph.appendChild(word);
    morrison.words.push(word);
    // render the image
    let img = loadImage(url, renderMorrison);
    morrison.images.push(img);
  }
  else {
    // find the current image
    let search = lyricData.verses[morrison.verse][morrison.stanza].morrison[morrison.index];
    let url = `https://loremflickr.com/480/360/${search}`;
    // cue the sequence
    morrison.callback = true;
    // remove the previous image
    morrison.values.length = 0;
    morrison.xCoords.length = 0;
    morrison.yCoords.length = 0;
    morrison.images.shift();
    // clear the paragraph when the stanza ends
    if (morrison.words.length > morrison.index + 1) {
      morrison.paragraph.innerHTML = "";
      morrison.words.length = 0;
      // then append current lyric
      let word = document.createTextNode(`${search} `);
      morrison.paragraph.appendChild(word);
      morrison.words.push(word);
    } else { // otherwise just append the current lyric
      let word = document.createTextNode(`${search} `);
      morrison.paragraph.appendChild(word);
      morrison.words.push(word);
    }  // render the current image
    let img = loadImage(url, renderMorrison);
    morrison.images.push(img);
  }
}

function renderMorrison() {
  let index = morrison.images.length - 1;
  let img = morrison.images[index];
  img.loadPixels();

  for (let j = 45; j < dimJ; j+= 2) {
    for (let i = 60; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let bright = (r + g + b) / 3;
      if (bright < 150) {
        morrison.xCoords.push(i);
        morrison.yCoords.push(j);
        morrison.values.push(bright);
      } else {
        morrison.xCoords.push(i);
        morrison.yCoords.push(j);
        morrison.values.push(0);
      }
    }
  }
  // cue the sequence
  morrison.callback = false;
}

function updateMorrison() {
  loadMorrison();
  sequenceMorrison();
}

function loadReed() {
  if (reed.images.length === 0) {
    // find the first image
    let search = lyricData.verses[reed.verse][reed.stanza].reed[reed.index];
    let url = `https://loremflickr.com/480/360/${search}`;
    // cue the sequence
    reed.callback = true;
    // append the first lyric
    let word = document.createTextNode(`${search} `);
    reed.paragraph.appendChild(word);
    reed.words.push(word);
    // render the image
    let img = loadImage(url, renderReed);
    reed.images.push(img);
  }
  else if (reed.images.length === 1) {
    // find the current image
    let search = lyricData.verses[reed.verse][reed.stanza].reed[reed.index];
    let url = `https://loremflickr.com/480/360/${search}`;
    // cue the sequence
    reed.callback = true;
    // remove the previous image
    reed.values.length = 0;
    reed.xCoords.length = 0;
    reed.yCoords.length = 0;
    reed.images.shift();
    // clear the paragraph when the stanza ends
    if (reed.words.length > reed.index + 1) {
      reed.paragraph.innerHTML = "";
      reed.words.length = 0;
      // then append current lyric
      let word = document.createTextNode(`${search} `);
      reed.paragraph.appendChild(word);
      reed.words.push(word);
    } else { // otherwise just append the current lyric
      let word = document.createTextNode(`${search} `);
      reed.paragraph.appendChild(word);
      reed.words.push(word);
    }  // render the current image
    let img = loadImage(url, renderReed);
    reed.images.push(img);
  }
}

function renderReed() {
  let index = reed.images.length - 1;
  let img = reed.images[index];
  img.loadPixels();

  for (let j = 45; j < dimJ; j+= 2) {
    for (let i = 60; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let bright = (r + g + b) / 3;
      if (bright < 150) {
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(bright);
      } else {
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(0);
      }
    }
  }
  // cue the sequence
  reed.callback = false;
}

function updateReed() {
  loadReed();
  sequenceReed();
}

function display() {
  noStroke();
  for (let i = 0; i < morrison.yCoords.length; i++) {
    if (i % 2 === 0) {
      if (morrison.values[i] !== 0) {
        // display bright coordinates as ellipses
        push();
        fill(255, morrison.values[i]);
        ellipse(morrison.xCoords[i], morrison.yCoords[i], morrison.values[i]/12);
        pop();
      } else {
        // display dark coordinates as points
        push();
        strokeWeight(5);
        point(morrison.xCoords[i], morrison.yCoords[i]);
        pop();
      }
    } else {
      if (reed.values[i] !== 0) {
        // display bright coordinates as ellipses
        push();
        fill(255, reed.values[i]);
        ellipse(reed.xCoords[i] + 480, reed.yCoords[i], reed.values[i]/12);
        pop();
      } else {
        // display dark coordinates as points
        push();
        strokeWeight(5);
        point(reed.xCoords[i] + 480, reed.yCoords[i]);
        pop();
      }
    }
  }
}

// antiquated code from previous iteration below

function displayMorrison() {
  if (morrison.images.length === 0) {
    // search for the first image
    let search = lyricData.verses[morrison.verse][morrison.stanza].morrison[morrison.index];
    let url = `https://loremflickr.com/g/480/360/${search}`;
    // cue the sequence
    morrison.callback = true;
    // display the first word
    let word = createDiv(`${search}`);
    word.class('morrison'); morrison.words.push(word);
    // display the first image
    let img = createImg(url, ``,
    `anonymous`, morrisonCallback);
    img.class('morrison'); morrison.images.push(img);
  }
  else {
    // search for the current image
    let search = lyricData.verses[morrison.verse][morrison.stanza].morrison[morrison.index];
    let url = `https://loremflickr.com/g/480/360/${search}`;
    // cue the sequence
    morrison.callback = true;
    // remove the previous image
    let trash = morrison.images[0];
    trash.remove();
    morrison.images.shift();
    // display the current word
    let word = createDiv(`${search}`);
    word.class('morrison'); morrison.words.push(word);
    // display the current image
    let img = createImg(url, ``,
    `anonymous`, morrisonCallback);
    img.class('morrison'); morrison.images.push(img);
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

function displayReed() {
  if (reed.images.length === 0) {
    // search for the first image
    let search = lyricData.verses[reed.verse][reed.stanza].reed[reed.index];
    let url = `https://loremflickr.com/g/480/360/${search}`;
    // cue the sequence
    reed.callback = true;
    // display the first word
    let word = createDiv(`${search}`);
    word.class('reed'); reed.words.push(word);
    // display the first image
    let img = createImg(url, ``,
    `anonymous`, reedCallback);
    img.class('reed'); reed.images.push(img);
  }
  else {
    // search for the current image
    let search = lyricData.verses[reed.verse][reed.stanza].reed[reed.index];
    let url = `https://loremflickr.com/g/480/360/${search}`;
    // cue the sequence
    reed.callback = true;
    // remove the previous image
    let trash = reed.images[0];
    trash.remove();
    reed.images.shift();
    // display the current word
    let word = createDiv(`${search}`);
    word.class('reed'); reed.words.push(word);
    // display the current image
    let img = createImg(url, ``,
    `anonymous`, reedCallback);
    img.class('reed'); reed.images.push(img);
  }
}

function reedCallback() {
  // remove the previous word
  let garbage = reed.words[0];
  garbage.remove();
  reed.words.shift();
  // cue the sequence
  reed.callback = false;
}
