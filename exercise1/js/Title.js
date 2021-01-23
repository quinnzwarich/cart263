class Title extends State {
  constructor() {
    super();
    this.outerRing = 0;
    this.innerRing = 0;
  }

  draw() {
    super.draw();
  }

  text() {
    this.outerRing += 0.01;
    this.innerRing += 0.02;

    push();
    stanza1.fill(0, 127, 255);
    stanza1.textFont(font);
    stanza1.textSize(10);
    stanza1.text(`somewhere on this planet`, 0, 0);
    rotate(this.outerRing);
    texture(stanza1);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza2.fill(0, 127, 255);
    stanza2.textFont(font);
    stanza2.textSize(10);
    stanza2.text(`you'll find a wishing star`, 0, 0);
    rotate(this.outerRing + 33 * PI/32);
    texture(stanza2);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza3.fill(0, 127, 255);
    stanza3.textFont(font);
    stanza3.textSize(10);
    stanza3.text(`wish upon its place of rest`, 0, 0);
    rotate(this.innerRing);
    texture(stanza3);
    torus(700, 400, 24, 2);
    pop();

    push();
    stanza4.fill(0, 127, 255);
    stanza4.textFont(font);
    stanza4.textSize(10);
    stanza4.text(`and surely you'll go far`, 0, 0);
    rotate(this.innerRing + 17 * PI/16);
    texture(stanza4);
    torus(700, 400, 24, 2);
    pop();
  }

  keyReleased() {
    super.keyReleased();
  }

  keyPressed() {
    super.keyPressed();
  }
}
