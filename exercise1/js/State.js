class State {
  constructor() {
    this.selectedI = 0;
    this.selectedJ = 0;
    this.outerRing = 0;
    this.innerRing = 0;
  }

  draw() {
    background(250);
    this.display();
    this.text();
  }

  text() {

  }

  // code also grifted from spherical geometry coding challenge
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

  display() {
    this.surface();
    this.flowrs();
  }

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

  mousePressed() {
    if (!theme.isPlaying()) {
       theme.loop();
     }
  }

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

  keyPressed() {
    if (keyCode === 32) {
      spacebar = true;
    }
    else {
      spacebar = false;
    }
  }
}
