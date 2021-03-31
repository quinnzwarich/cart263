/**************************************************
project 2 proposal
Quinn Zwarich

I only got as far as making the model of the pencil,
I wanted to implement a mechanism to actually unfold it to
reveal an image inside but I haven't much luck yet in this regard.
**************************************************/

let regularHex = [];
let smallerHex = [];
let pencilBody = [];
let alphas = [];

let radius = 18;
let segments = 10;

let peelFinished = false;

let index;

function setup() {
  createCanvas(500, 500, WEBGL);
  // end of pencil
  polygon(0, 0, 0, radius, 6, regularHex);
  // graphite tip
  polygon(0, 0, -33, radius/3, 6, smallerHex);
  // body of pencil ?
  for (let i = 0; i < segments; i++) {
    polygon(0, 0, i * 33, radius, 6, pencilBody);
  }
  for (let i = 0; i < pencilBody.length; i++) {
    let alpha = 255;
    alphas.push(alpha);
  } index = alphas.length;
}


function draw() {
  background(250);
  orbitControl();

  translate(0, height/4, 0);
  rotateX(PI/2);
  bottom();
  middle();
  eraser();
}

function polygon(x, y, z, radius, npoints, array) {
  let angle = 2 * PI / npoints;
  for (let i = 0; i < 2 * PI; i += angle) {
    let coordinates = createVector(x + cos(i) * radius, y + sin(i) * radius, z);
    array.push(coordinates);
  }
}

function bottom() {
  for (let i = 0; i < regularHex.length - 1; i++) {
    let coords1 = regularHex[i];
    let coords2 = regularHex[i + 1];
    let coords3 = smallerHex[i + 1];
    let coords4 = smallerHex[i];
    // end of the pencil
    push();
    fill(244, 226, 198);
    noStroke();
    beginShape();
    vertex(coords1.x, coords1.y, coords1.z);
    vertex(coords2.x, coords2.y, coords2.z);
    vertex(coords3.x, coords3.y, coords3.z);
    vertex(coords4.x, coords4.y, coords4.z);
    endShape(CLOSE);
    pop();
    // graphite tip
    push();
    fill(32);
    noStroke();
    beginShape();
    vertex(coords3.x, coords3.y, coords3.z);
    vertex(coords4.x, coords4.y, coords4.z);
    vertex(0, 0, -54);
    endShape(CLOSE);
    pop();
  }
}

function middle() {
  for (let i = 0; i < pencilBody.length - 7; i++) {
    let coords1 = pencilBody[i];
    let coords2 = pencilBody[i + 1];
    let coords3 = pencilBody[i + 7];
    let coords4 = pencilBody[i + 6];
    if (i < 56) {
      // body of pencil ?
      push();
      fill(237, 145, 33, alphas[i]);
      noStroke();
      beginShape();
      vertex(coords1.x, coords1.y, coords1.z);
      vertex(coords2.x, coords2.y, coords2.z);
      vertex(coords3.x, coords3.y, coords3.z);
      vertex(coords4.x, coords4.y, coords4.z);
      endShape(CLOSE);
      pop();
    }
    else {
      // metal part
      push();
      fill(192, 192, 192, alphas[i]);
      noStroke();
      beginShape();
      vertex(coords1.x, coords1.y, coords1.z);
      vertex(coords2.x, coords2.y, coords2.z);
      vertex(coords3.x, coords3.y, coords3.z);
      vertex(coords4.x, coords4.y, coords4.z);
      endShape(CLOSE);
      pop();
    }
  }
}

function eraser() {
  push();
  noStroke();
  fill(255, 182, 193);
  translate(0, 0, 290);
  sphere(15);
  pop();
}

// function keyPressed() {
//   peel(alphas[index]);
// }
//
// function peel(alpha) {
//   alpha--;
//   alpha = alphas[index];
//   if (alpha > 0) {
//     requestAnimationFrame(function() {
//       peel(alpha);
//     });
//   }
//   else {
//     index--;
//   }
// }
