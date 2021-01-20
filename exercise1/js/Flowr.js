class Flowr {
  constructor(x, y, z, r, g, b, lat, lon) {
    this.v1 = createVector(x, y, z);
    this.v2 = p5.Vector.mult(this.v1, 1.2);
    this.red = r;
    this.green = g;
    this.blue = b;
    this.latitude = lat;
    this.longitude = lon;
    this.totalPetals = 8;
  }

  stem() {
    push();
    strokeWeight(0.5);
    stroke(this.red, this.green, this.blue);
    line(this.v1.x, this.v1.y, this.v1.z,
    this.v2.x, this.v2.y, this.v2.z);
    pop();
  }

  petals() {
    push();
    translate(this.v2);
    // rotateX(this.longitude);
    // rotateY(this.latitude);
    for (let i = 0; i < this.totalPetals; i++) {
      strokeWeight(0.5);
      stroke(this.red, this.green, this.blue);
      fill(this.red, this.green, this.blue);
      rotate(PI/4);
      beginShape();
      vertex(0, 15, 0);
      vertex(0, 0, 0);
      vertex(5, 10, 0);
      endShape(CLOSE);
    }
    pop();
  }

  display() {
    this.stem();
    this.petals();
  }
}
