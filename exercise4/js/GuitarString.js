class GuitarString {
  constructor(y) {
    this.y = y;
    this.xSpacing = 8;
    this.width = 432;
    this.theta = 0;
    this.amplitude = 0;
    this.period = 432;
    this.deltaX = (TWO_PI / this.period) * this.xSpacing;
    this.yValues = new Array(floor(this.width / this.xSpacing));
  }

  vibrate() {
    this.theta += 0.5;
    let x = this.theta;
    for (let i = 0; i < this.yValues.length; i++) {
      this.yValues[i] = sin(x) * this.amplitude;
      x += this.deltaX;
    }
  }

  display() {
    push();
    fill(255);
    beginShape();
    for (let i = 0; i < this.yValues.length; i++) {
      vertex(i * this.xSpacing, this.y + this.yValues[i]);
    }
    endShape();
    pop();
  }
}
