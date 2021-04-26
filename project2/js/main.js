/**
project 2
Quinn Zwarich

:(
*/

"use strict";

let flock = [];
let cam;

let image = {
	xCoords: [],
	yCoords: [],
	values: [],
	newValues: [],
	colours: {
		r: [],
		g: [],
		b: []
	}
}
let chairs;
let dimI = 640;
let dimJ = 384;

let goose = {
	direction: `right`
};

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`,
		arcade: {
			gravity: { y: 600 }
		}
  },
  scene: [Boot, Play]
};

// let game = new Phaser.Game(config);

function preload() {
	chairs = loadImage(`assets/images/defaultclassroom.png`);
}

function setup() {
	createCanvas(dimI, dimJ);
	renderImage();
}
// noise(i / j, j / i, i)
// noise(i / j, j / i, j)
// noise(j / i, i / j, i / j)
function renderImage() {
  chairs.loadPixels();
  for (let j = 0; j < dimJ; j+= 2) {
    for (let i = 0; i < dimI; i+= 2) {
      let index = (j * dimI + i) * 4;
      let r = chairs.pixels[index + 0];
      let g = chairs.pixels[index + 1];
      let b = chairs.pixels[index + 2];
      let bright = (r + g + b) / 3;
      // select the most bright values of the image
      // record how bright they were
      if (bright >= 0) {
        let red = map(noise(i / j, noise(i / j, j / i, j), i), 0, 1, 150, 255);
        let blue = map(noise(i / j, j / i, noise(j / i, i / j, i / j)), 0, 1, 150, 255);
        let green = map(noise(noise(i / j, j / i, i), i / j, i / j), 0, 1, 150, 255);
				let newBright = (red + green + blue) / 3;
        image.xCoords.push(i);
        image.yCoords.push(j);
        image.values.push(bright);
				image.newValues.push(newBright);
        image.colours.r.push(red);
        image.colours.g.push(green);
        image.colours.b.push(blue);
      } else { // make the least bright values all dark
        image.xCoords.push(i);
        image.yCoords.push(j);
        image.values.push(0);
      }
    }
  }
}

function draw() {
	background(0);
	// blendMode(SCREEN);
	noStroke();

	for (let i = 0; i < image.yCoords.length; i++) {
    if (image.values[i] > 0) {
      // display bright coordinates as colourful translucent ellipses
      push();
      fill(image.colours.r[i], image.colours.g[i], image.colours.b[i], image.values[i]);
      ellipse(image.xCoords[i], image.yCoords[i], image.newValues[i]/(image.values[i] * 0.85));
      pop();
    } else {
      // display dark coordinates as points
      // push();
			// stroke(0);
      // strokeWeight(5);
      // point(image.xCoords[i], image.yCoords[i]);
      // pop();
    }
	}
}
