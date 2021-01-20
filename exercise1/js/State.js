class State {
  constructor() {
    this.rotationX = 0;
    this.rotationY = 0;
  }

  draw() {
    background(250);
    this.display();
    this.text();
  }

  text() {

  }

  display() {
    for (let i = 0; i < flowrs.length; i++) {
      let flower = flowrs[i];
      flower.display();
    }
  }

  keyPressed() {

  }
}
