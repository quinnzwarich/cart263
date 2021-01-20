class  Flower {
  constructor(x, y, z, r, g, b, v, sA, pA) {
    this.arguments = {
      position1: createVector(x, y, z),
      velocity: createVector(0, 0, v),
      red: r,
      green: g,
      blue: b,
      stemAngle: sA,
      petalAngle: pA,
    };
    this.position2 = p5.Vector.mult(this.arguments.position1, 1.1);
    this.acceleration = createVector(0, 0, 0.1);
    this.active = true;
    this.movement = false;
    this.petals = {
      x1: this.position2.x,
      y1: this.position2.y + 15,
      x2: this.position2.x,
      y2: this.position2.y,
      x3: this.position2.x + 5,
      y3: this.position2.y + 10,
      total: 8,
    };
    this.stem = {
      x1: this.position2.x,
      y1: this.position2.y,
      x2: this.arguments.position1.x,
      y2: this.arguments.position1.y + 60,
    };
  }

  drawStem() {
    line(this.stem.x1, this.stem.y1, this.stem.x2, this.stem.y2);
  }

  drawPetals() {
    for (let i = 0; i < this.petals.total; i++) {
      rotateY(this.arguments.petalAngle);
      rotate(PI / 4);
      triangle(this.petals.x1, this.petals.y1, this.petals.x2, this.petals.y2, this.petals.x3, this.petals.y3);
    }
  }

  drawFlower() {
    if (this.active) {
      push();
      translate(0, 0, this.arguments.position1.z);
      rotateZ(this.arguments.stemAngle);
      strokeWeight(0.33);
      stroke(this.arguments.red, this.arguments.green, this.arguments.blue);
      this.drawStem();
      fill(this.arguments.red, this.arguments.green, this.arguments.blue);
      rotateX(PI);
      this.drawPetals();
      pop();
    }
  }

  levitate() {
    if (this.movement) {
      this.arguments.velocity.add(this.acceleration);
      this.arguments.position1.add(this.arguments.velocity);
      if (this.arguments.position1.z > height) {
        this.active = false;
      }
    }
  }
}
