class GuitarString {
  constructor(y, f) {
    this.y = y;
    this.frequency = f;
    this.xSpacing = 8;
    this.width = 432;
    this.theta = 0;
    this.amplitude = 0;
    this.period = 216;
    this.deltaX = (TWO_PI / this.period) * this.xSpacing;
    this.yValues = new Array(floor(this.width / this.xSpacing));
  }

  vibrate() {
    // I borrowed this function from the p5.js examples page
    // https://p5js.org/examples/math-sine-wave.html
    // it calculates the amplitude values of a sine wave
    // this is meant to resemble a plucked guitar string
    this.theta += this.frequency;
    let x = this.theta;
    for (let i = 0; i < this.yValues.length; i++) {
      this.yValues[i] = sin(x) * this.amplitude;
      x += this.deltaX;
    }
  }

  hitDetection(thumbCoords, indexCoords, middleCoords, sound) {
    if (thumbCoords.y < this.y + (this.xSpacing/4) &&
    thumbCoords.y > this.y - (this.xSpacing/4) &&
    thumbCoords.x <= this.width ||
    indexCoords.y < this.y + (this.xSpacing/4) &&
    indexCoords.y > this.y - (this.xSpacing/4) &&
    indexCoords.x <= this.width ||
    middleCoords.y < this.y + (this.xSpacing/4) &&
    middleCoords.y > this.y - (this.xSpacing/4) &&
    middleCoords.x <= this.width) {
      // play the note
      sound.playMode(`untilDone`);
      sound.play();
    } if (sound.isPlaying()) {
      // get amplitude of the note while active
      let getAmp = amp.getLevel();
      this.amplitude = getAmp * 2;
    } else {
      // if a note isn't active,
      // ensure the amplitude is zero
      this.amplitude = 0;
    }
  }

  display() {
    // displays the segments which make up the string
    push();
    fill(0);
    beginShape();
    for (let i = 0; i < this.yValues.length; i++) {
      vertex(i * this.xSpacing, this.y + this.yValues[i]);
    }
    endShape();
    pop();
  }
}
