class Flowr {
  constructor(x, y, z, r, g, b, a, lat, lon) {
    this.v1 = createVector(x, y, z);
    this.v2 = p5.Vector.mult(this.v1, 1.2);
    this.red = r;
    this.green = g;
    this.blue = b;
    this.angle = a;
    this.latitude = lat;
    this.longitude = lon;
    this.totalPetals = 8;
    this.mod = 0;
    this.move = 0;
    this.v3 = p5.Vector.fromAngles(this.latitude, this.longitude);
    this.original = {
      x: x,
      y: y,
      z: z
    };
    this.state = `still`
    this.id = false;
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
    rotateX(this.v3.x);
    rotateY(this.v3.y);
    for (let i = 0; i < this.totalPetals; i++) {
      strokeWeight(0.5);
      stroke(this.red, this.green, this.blue);
      fill(this.red, this.green, this.blue);
      rotateY(this.angle);
      rotate(PI/4);
      beginShape();
      vertex(0, 15, 0);
      vertex(0, 0, 0);
      vertex(5, 10, 0);
      endShape(CLOSE);
    }
    pop();
  }

  still() {
    if (this.state === `still`) {
      this.mod = 0;
      this.move = 1;
      this.v1.set(this.original.x,
      this.original.y, this.original.z);
      this.v2 = p5.Vector.mult(this.v1, 1.2);
      this.v1 = p5.Vector.mult(this.v1, this.move);
      this.v2 = p5.Vector.mult(this.v1, this.move + 0.2);
    }
  }

  bob() {
    if (this.state === `bobbing`) {
      this.mod += 0.25;
      this.move = map(cos(this.mod), -1, 1, 0.99, 1.02);
      this.v1.set(this.original.x,
      this.original.y, this.original.z);
      this.v2 = p5.Vector.mult(this.v1, 1.2);
      this.v1 = p5.Vector.mult(this.v1, this.move);
      this.v2 = p5.Vector.mult(this.v2, this.move);
    }
  }

  select() {
    if (this.state === `selected`) {
      this.mod += 5;
      this.move = map(cos(this.mod), -1, 1, 0.99, 1.02);
      this.v1 = p5.Vector.mult(this.v1, this.move);
      this.v2 = p5.Vector.mult(this.v2, this.move);
      if (this.mod > 60) {
        this.mod = 0;
        this.state = `bobbing`;
        spacebar = false;
      }
    }
  }

  depart() {
    if (this.state === `departing`) {
      this.mod += 0.01;
      this.move = 1 + this.mod;
      this.v1.set(this.original.x,
      this.original.y, this.original.z);
      this.v2 = p5.Vector.mult(this.v1, 1.2);
      this.v1 = p5.Vector.mult(this.v1, this.move);
      this.v2 = p5.Vector.mult(this.v2, this.move);
    }
  }

  states() {
    this.still();
    this.bob();
    this.select();
    this.depart();
  }

  display() {
    this.stem();
    this.petals();
  }
}
