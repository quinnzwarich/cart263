/**
project 2
Quinn Zwarich

:(
*/

"use strict";

let flock = [];
let cam;

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

function setup() {
  createCanvas(640, 480, WEBGL);

  cam = createCamera();

  for (let i = 0; i < 5; i++) {
    let x = width/2;
    let y = height/2;
    flock.push(new Boid(x, y));
  }
}

function draw() {
  background(255);
  translate(-width/2, -height/2);

  // console.log(centerOfBoids());

  // let cameraPos = centerOfBoids();
  // cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  // console.log(cameraPos);

  for (let boid of flock) {
  	boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}

function centerOfBoids() {
  let centerPos = createVector(0, 0);

  for (let i = 0; i < flock.length; i++) {
    let boid = flock[i];
    centerPos.add(boid.position);
  }
  centerPos.div(flock.length);
  centerPos.z = (height/2.0) / tan(PI*30.0 / 180.0);
  return centerPos;
}
