class State {
  constructor() {

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
    for (let i = 0; i < flowrs.length; i++) {
      let flower = flowrs[i];
      flower.display();
      flower.states();
    }
  }

  display() {
    this.surface();
    this.flowrs();
  }

  keyPressed() {

  }
}
