class State {
  constructor() {
    this.selectedI = 0;
    this.selectedJ = 0;
    this.outerRing = 0;
    this.innerRing = 0;
  }

  draw() {
    this.display();
    this.text();
  }

  text() {

  }

  // code for drawing the surface also grifted from spherical geometry coding challenge
  surface() {
    for (let i = 0; i < TOTAL; i++) {
      beginShape(TRIANGLE_STRIP);
      for (let j = 0; j < TOTAL + 1; j++) {
        let shade = shading[i][j];
        noStroke();
        fill(shade);
        let v1 = globe[i][j];
        vertex(v1.x, v1.y, v1.z);
        let v2 = globe[i + 1][j];
        vertex(v2.x, v2.y, v2.z);
      }
      endShape();
    }
  }

  flowrs() {

  }

  perspective() {
    
  }

  display() {
    this.surface();
    this.flowrs();
  }

  // ensures that the user won't be stuck at the end of a column or row
  bounds() {
    if (this.selectedI > TOTAL) {
      this.selectedI = 0;
    }
    else if (this.selectedI < 0) {
      this.selectedI = TOTAL;
    }
    if (this.selectedJ > TOTAL) {
      this.selectedJ = 0;
    }
    else if (this.selectedJ < 0) {
      this.selectedJ = TOTAL;
    }
  }

  // selects flowers using the arrow keys
  // there are some problems with using this system but it generally works
  // for example, the direction will sometimes become inverted when the user switches indices
  keyReleased() {
    this.bounds();

    if (keyCode === LEFT_ARROW) {
      this.selectedI--;
    }
    else if (keyCode === RIGHT_ARROW) {
      this.selectedI++;
    }
    else {
      this.selectedI = this.selectedI;
    }

    if (keyCode === UP_ARROW) {
      this.selectedJ++;
    }
    else if (keyCode === DOWN_ARROW) {
      this.selectedJ--;
    }
    else {
      this.selectedJ = this.selectedJ;
    }
  }

  // starts music when the user presses a key relevant to the controls
  // this music was sampled from a strange rabbit plushy I have
  keyPressed() {
    if (keyCode === LEFT_ARROW ||
    keyCode === RIGHT_ARROW ||
    keyCode === UP_ARROW ||
    keyCode === DOWN_ARROW ||
    keyCode === 32) {
      if (!theme.isPlaying()) {
        theme.loop();
      }
    }

    if (keyCode === 32) {
      spacebar = true;
    }
    else {
      spacebar = false;
    }
  }
}
