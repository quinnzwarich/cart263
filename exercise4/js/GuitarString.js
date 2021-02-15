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
    this.state = `resting`;
  }

  vibrate() {
    this.theta += 0.66;
    let x = this.theta;
    for (let i = 0; i < this.yValues.length; i++) {
      this.yValues[i] = sin(x) * this.amplitude;
      x += this.deltaX;
    }
  }

  hitDetection(thumbCoords) {
    if (thumbCoords.y < this.y + (this.xSpacing/4) &&
    thumbCoords.y > this.y - (this.xSpacing/4) &&
    thumbCoords.x <= this.width) {
      this.state = `excited`;
    }
  }

  resting() {
    if (this.state === `resting`) {
      this.amplitude = 0;
    }
  }

  excited() {
    if (this.state === `excited`) {
      this.amplitude += 0.05;
      console.log(this.amplitude);
      if (this.amplitude >= 1) {
        this.amplitude -= 0.05;
        console.log(`true`);
        if (this.amplitude <= 0) {
          this.state = `resting`;
        }
      }
    }
  }

  states() {
    this.resting();
    this.excited();
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
