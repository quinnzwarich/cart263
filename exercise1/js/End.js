class End extends State {
  constructor() {
    super();
    this.mod = 1;
    this.bg = 0;
    this.shake = 0;
    this.rumble = 0;
  }

  draw() {
    background(this.bg);
    super.draw();
    this.modulate();
  }

  // slows the music as well as changes the background colour
  // goes from 1 to 0 and then to 0.1 and then back to zero in perpetuity
  // this creates a pulsating in the music
  modulate() {
    theme.rate(this.mod);

    if (this.mod > 0) {
      this.mod -= 0.01;
    }
    else {
      this.mod = 0.1;
    }

    this.bg = map(this.mod, 1, 0, 250, 0);
  }

  // apart from displaying other text, its colour also changes to become red
  text() {
    this.outerRing += 0.01;
    this.innerRing += 0.02;

    push();
    stanza5.fill(255, 0, 0);
    stanza5.textFont(grotesk);
    stanza5.textSize(10);
    stanza5.text(`Your wish has left you all`, 0, 0);
    rotate(this.outerRing);
    texture(stanza5);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza6.fill(255, 0, 0);
    stanza6.textFont(grotesk);
    stanza6.textSize(10);
    stanza6.text(`alone What are you to do?`, 0, 0);
    rotate(31 * PI/32)
    rotate(this.outerRing);
    texture(stanza6);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza7.fill(255, 0, 0);
    stanza7.textFont(grotesk);
    stanza7.textSize(10);
    stanza7.text(`cling to it and hold it tight`, 0, 0);
    rotate(this.innerRing);
    texture(stanza7);
    torus(700, 400, 24, 2);
    pop();

    push();
    stanza8.fill(255, 0, 0);
    stanza8.textFont(grotesk);
    stanza8.textSize(10);
    stanza8.text(`as if it were your truth`, 0, 0);
    rotate(35 * PI/32);
    rotate(this.innerRing);
    texture(stanza8);
    torus(700, 400, 24, 2);
    pop();
  }

  // causes all flowers apart from the star to float away
  flowrs() {
    for (let i = 0; i < TOTAL + 1; i++) {
      for (let j = 0; j < TOTAL + 1; j++) {
        let flower = flowrs[i][j];
        flower.display();
        flower.states();
        if (!flower.id) {
          flower.state = `departing`;
        }
      }
    }
  }

  // returns back to the initial perspective as the text has changed
  // camera snaps toward the star as the music pulses
  perspective() {
    let vector = globeCopy[0][0];
    let vantage = p5.Vector.mult(vector, this.zoom);
    this.shake = random(-PI/256, PI/256);
    this.rumble = random(-PI/256, PI/256);

    if (this.mod > 0) {
      cam.setPosition(vantage.x, vantage.y, vantage.z);
      cam.lookAt(vector.x, vector.y, vector.z);
      cam.pan(this.shake);
      cam.tilt(this.rumble);
    }
    else {
      cam.setPosition(vecPositions[1].x, vecPositions[1].y, vecPositions[1].z);
      cam.lookAt(vanPositions[1].x, vanPositions[1].y, vanPositions[1].z);
    }
  }

  keyReleased() {
    super.keyReleased();
  }

  keyPressed() {
    super.keyPressed();
  }

}
