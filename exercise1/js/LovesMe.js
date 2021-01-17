class LovesMe extends State {
  constructor() {
    super();
  }

  draw() {
    super.draw();
  }

  text() {
    push();
    fill(255);
    rotateX(PI / 3);
    translate(-87.5, 600, 250);
    textFont(font);
    textSize(35);
    text(`loves me`, 0, 0);
    pop();
  }

  keyPressed() {
    super.keyPressed();
  }
}
