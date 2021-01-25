class End extends State {
  constructor() {
    super();
    this.mod = 1;
  }

  draw() {
    super.draw();
    this.modulate();
  }

  modulate() {
    theme.rate(this.mod);

    if (this.mod > 0) {
      this.mod -= 0.01;
    }
    else {
      this.mod = 0.1;
    }
  }

  text() {
    this.outerRing += 0.01;
    this.innerRing += 0.02;

    push();
    stanza5.fill(0, 127, 255);
    stanza5.textFont(font);
    stanza5.textSize(10);
    stanza5.text(`Your wish has gone and`, 0, 0);
    rotate(this.outerRing);
    texture(stanza5);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza6.fill(0, 127, 255);
    stanza6.textFont(font);
    stanza6.textSize(10);
    stanza6.text(`left Now what will you do?`, 0, 0);
    rotate(31 * PI/32)
    rotate(this.outerRing);
    texture(stanza6);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza7.fill(0, 127, 255);
    stanza7.textFont(font);
    stanza7.textSize(10);
    stanza7.text(`cling to it and hold it tight`, 0, 0);
    rotate(this.innerRing);
    texture(stanza7);
    torus(700, 400, 24, 2);
    pop();

    push();
    stanza8.fill(0, 127, 255);
    stanza8.textFont(font);
    stanza8.textSize(10);
    stanza8.text(`as if it were your truth`, 0, 0);
    rotate(35 * PI/32);
    rotate(this.innerRing);
    texture(stanza8);
    torus(700, 400, 24, 2);
    pop();
  }

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

  mousePressed() {
    super.mousePressed();
  }

  keyReleased() {
    super.keyReleased();
  }

  keyPressed() {
    super.keyPressed();
  }

}
