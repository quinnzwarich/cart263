"use strict";

/**
The Murder Mystery
Quinn Zwarich

A visualization of The Murder Mystery, written by The Velvet Underground.
It is not only meant to be an intrepetation of the song but as well a tool for understanding the dense lyricism.
*/

// I made this JSON file myself
// it is meant to organize stanzas and verses as well as who says what
let lyricData;
// this is the first half of the title
let title1;
// this is the second half of the title
let title2;
// canvas
let cnv;

let dimI = 480;
let dimJ = 360;
let user = true;

let morrison = {
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
  colours: {
    r: [],
    g: [],
    b: []
  }
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
  title1 = loadImage(`assets/images/themurde.png`);
  title2 = loadImage(`assets/images/ermystery.png`);
}

function setup() {
  // position canvas above text
  cnv = createCanvas(1020, 405);
  cnv.parent("canvas");
  // determine rates
  assessRate();
  // render the title screen
  renderTitle1();
  renderTitle2();
  // order the document
  morrison.paragraph = document.getElementById("morrison");
  reed.paragraph = document.getElementById("reed");
}

// responsible for displaying images
function draw() {
  background(0);
  display();
}

function assessRate() {
  // How fast should the slowest lyric be
  let baseRate = 10000;
  // Get references to the arrays of the current lyric
  let morrisonLyric = lyricData.verses[morrison.verse][morrison.stanza].morrison.length;
  let reedLyric = lyricData.verses[reed.verse][reed.stanza].reed.length;
  // Get the length of the longest set of lyrics
  let maxLength = Math.max(morrisonLyric, reedLyric);
  // Get the rates
  reed.rate = baseRate * morrisonLyric / maxLength;
  morrison.rate = baseRate * reedLyric / maxLength;
}

// I initially made these timers into functions thinking they would allow for more control over the rate
function startMorrison() {
  morrison.timer = setInterval(updateMorrison, morrison.rate);
}

// though I wasn't able to figure out a way to restart them without causing a terrible feedback loop
function startReed() {
  reed.timer = setInterval(updateReed, reed.rate);
}

function sequenceMorrison() {
  // advance through words
  if (morrison.index <
  lyricData.verses[morrison.verse][morrison.stanza].morrison.length &&
  morrison.callback) {
    morrison.index++;
    if (morrison.index >=
    lyricData.verses[morrison.verse][morrison.stanza].morrison.length) {
      // advance through stanzas and recalculate the rate
      clearInterval(morrison.timer);
      assessRate();
      startMorrison();
      morrison.index = 0;
      morrison.stanza++;
      if (morrison.stanza >= lyricData.verses[morrison.verse].length) {
        // advance through verses
        morrison.stanza = 0;
        morrison.verse++;
        if (morrison.verse >= lyricData.verses.length) {
          // do it all over again
          morrison.verse = 0;
        }
      }
    }
  }
}

function sequenceReed() {
  // advance through words
  if (reed.index <
  lyricData.verses[reed.verse][reed.stanza].reed.length &&
  reed.callback) {
    reed.index++;
     if (reed.index >=
      lyricData.verses[reed.verse][reed.stanza].reed.length) {
      // advance through stanzas and recalculate the rate
      clearInterval(reed.timer);
      assessRate();
      startReed();
      reed.index = 0;
      reed.stanza++;
      if (reed.stanza >= lyricData.verses[reed.verse].length) {
        // advance through verses
        reed.stanza = 0;
        reed.verse++;
        if (reed.verse >= lyricData.verses.length) {
          // do it all over again
          reed.verse = 0;
        }
      }
    }
  }
}

function loadMorrison() {
  // find the current image
  let search = lyricData.verses[morrison.verse][morrison.stanza].morrison[morrison.index];
  let url = `https://loremflickr.com/480/360/${search}`;
  // remove the previous image
  morrison.colours.length = 0;
  morrison.values.length = 0;
  morrison.xCoords.length = 0;
  morrison.yCoords.length = 0;
  morrison.images.shift();
  // cue the sequence
  morrison.callback = true;
  // grab random colours
  let r = random(morrison.colours.r);
  let g = random(morrison.colours.g);
  let b = random(morrison.colours.b);
  // clear the paragraph when the stanza ends
  if (morrison.words.length > morrison.index + 1) {
    morrison.paragraph.innerHTML = "";
    morrison.words.length = 0;
    // then append current lyric and colour it
    let word = document.createTextNode(`${search} `);
    let span = document.createElement(`span`);
    span.style.color = `rgb(${r}, ${g}, ${b})`;
    span.appendChild(word);
    morrison.paragraph.appendChild(span);
    morrison.words.push(word);
  } else { // otherwise just append and colour the current lyric
    let word = document.createTextNode(`${search} `);
    let span = document.createElement(`span`);
    span.style.color = `rgb(${r}, ${g}, ${b})`;
    span.appendChild(word);
    morrison.paragraph.appendChild(span);
    morrison.words.push(word);
  }  // render the current image
  let img = loadImage(url, renderMorrison);
  morrison.images.push(img);
}

function renderMorrison() {
  // choose the most recent image
  let index = morrison.images.length - 1;
  let img = morrison.images[index]; img.loadPixels();
  noiseSeed(morrison.index); 
  for (let j = 0; j < dimJ; j+= 2) {
    for (let i = 0; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let bright = (r + g + b) / 3;
      // select the least bright values from the image
      // record how bright they were
      if (bright < 150) {
        let red = map(noise(i / j), 0, 1, 150, 255);
        let blue = map(noise(j / i), 0, 1, 150, 255);
        let green = map(noise(i / j, j / i), 0, 1, 150, 255);
        // if a value is NaN or all three values make white
        // make the value so small that the ellipse won't be seen
        if (isNaN(red) || isNaN(green) || isNaN(blue)) {
          morrison.xCoords.push(i);
          morrison.yCoords.push(j);
          morrison.values.push(0);
          morrison.colours.r.push(red);
          morrison.colours.g.push(green);
          morrison.colours.b.push(blue);
        } else if (floor(red) === floor(green) &&
        floor(red) === floor(blue)) {
          morrison.xCoords.push(i);
          morrison.yCoords.push(j);
          morrison.values.push(0);
          morrison.colours.r.push(red);
          morrison.colours.g.push(green);
          morrison.colours.b.push(blue);
        } else {
          morrison.xCoords.push(i);
          morrison.yCoords.push(j);
          morrison.values.push(bright);
          morrison.colours.r.push(red);
          morrison.colours.g.push(green);
          morrison.colours.b.push(blue);
        }
      } else { // make the bright values all dark
        morrison.xCoords.push(i);
        morrison.yCoords.push(j);
        morrison.values.push(0);
      }
    }
  }
  // cue the sequence
  morrison.callback = false;
}

// these functions are triggered by setInterval
function updateMorrison() {
  loadMorrison();
  sequenceMorrison();
}

function loadReed() {
  // find the current image
  let search = lyricData.verses[reed.verse][reed.stanza].reed[reed.index];
  let url = `https://loremflickr.com/480/360/${search}`;
  // remove the previous image
  reed.values.length = 0;
  reed.xCoords.length = 0;
  reed.yCoords.length = 0;
  reed.images.shift();
  // cue the sequence
  reed.callback = true;
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

function renderReed() {
  // choose the most recent image
  let index = reed.images.length - 1;
  let img = reed.images[index]; img.loadPixels();
  for (let j = 0; j < dimJ; j+= 2) {
    for (let i = 0; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let bright = (r + g + b) / 3;
      // select the least bright values from the image
      // record how bright they were
      if (bright < 150) {
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(bright);
      } else { // make the most bright values all dark
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(0);
      }
    }
  }
  // cue the sequence
  reed.callback = false;
}

// these functions are triggered by setInterval
function updateReed() {
  loadReed();
  sequenceReed();
}

function display() {
  noStroke();
  for (let i = 0; i < morrison.yCoords.length; i++) {
    if (i % 2 === 0) {
      if (morrison.values[i] !== 0) {
        // display bright coordinates as colourful translucent ellipses
        push();
        fill(morrison.colours.r[i], morrison.colours.g[i], morrison.colours.b[i], morrison.values[i]);
        ellipse(morrison.xCoords[i] + 60, morrison.yCoords[i] + 45, morrison.values[i]/12);
        pop();
      } else {
        // display dark coordinates as points
        push();
        strokeWeight(5);
        point(morrison.xCoords[i] + 60, morrison.yCoords[i] + 45);
        pop();
      }
    } else {
      if (reed.values[i] !== 0) {
        // display bright coordinates as white translucent ellipses
        push();
        fill(255, reed.values[i]);
        ellipse(reed.xCoords[i] + 540, reed.yCoords[i] + 45, reed.values[i]/12);
        pop();
      } else {
        // display dark coordinates as points
        push();
        strokeWeight(5);
        point(reed.xCoords[i] + 540, reed.yCoords[i] + 45);
        pop();
      }
    }
  }
}

function renderTitle1() {
  title1.loadPixels();
  for (let j = 0; j < dimJ; j+= 2) {
    for (let i = 0; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = title1.pixels[index + 0];
      let g = title1.pixels[index + 1];
      let b = title1.pixels[index + 2];
      let bright = (r + g + b) / 3;
      // select the most bright values of the image
      // record how bright they were
      if (bright > 150) {
        let red = map(noise(i / j), 0, 1, 150, 255);
        let blue = map(noise(j / i), 0, 1, 150, 255);
        let green = map(noise(i / j, j / i), 0, 1, 150, 255);
        morrison.xCoords.push(i);
        morrison.yCoords.push(j);
        morrison.values.push(bright);
        morrison.colours.r.push(red);
        morrison.colours.g.push(green);
        morrison.colours.b.push(blue);
      } else { // make the least bright values all dark
        morrison.xCoords.push(i);
        morrison.yCoords.push(j);
        morrison.values.push(0);
      }
    }
  }
}

function renderTitle2() {
  title2.loadPixels();
  for (let j = 0; j < dimJ; j+= 2) {
    for (let i = 0; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = title2.pixels[index + 0];
      let g = title2.pixels[index + 1];
      let b = title2.pixels[index + 2];
      let bright = (r + g + b) / 3;
      // select the most bright values of the image
      // record how bright they were
      if (bright > 150) {
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(bright);
      } else { // make the least bright values all dark
        reed.xCoords.push(i);
        reed.yCoords.push(j);
        reed.values.push(0);
      }
    }
  }
}

function keyPressed() {
  if (user) {
    // start timers
    startMorrison();
    startReed();
    // get rid of the title completely
    morrison.colours.length = 0;
    morrison.values.length = 0;
    morrison.xCoords.length = 0;
    morrison.yCoords.length = 0;
    reed.values.length = 0;
    reed.xCoords.length = 0;
    reed.yCoords.length = 0;
    // ensure that the timers are only called once
    user = false;
  }
}
