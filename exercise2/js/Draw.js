class Draw {
  constructor() {
    this.values = [];
    this.bounds = 64;
    this.offset = 8;
    this.mouse = false;
    for (let i = 0; i < this.bounds; i++) {
      this.values[i] = [];
      for (let j = 0; j < this.bounds; j++) {
          this.values[i][j] = 255;
      }
    }
  }

  grid() {
    for (let i = 0; i < this.bounds; i++) {
      for (let j = 0; j < this.bounds; j++) {
        let x = i * this.offset;
        let y = j * this.offset;
        if (
          x + this.offset > mouseX &&
          x < mouseX &&
          y + this.offset > mouseY &&
          y < mouseY &&
          this.mouse === true
        ) {
          this.values[i][j] = 0;
        }
        push();
        fill(this.values[i][j]);
        rect(x, y, this.offset);
        pop();
      }
    }
  }

  mouseDragged() {
    this.mouse = true;
  }

  mouseReleased() {
    this.mouse = false;
  }
}
