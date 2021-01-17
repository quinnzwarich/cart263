class  Flower {
  constructor(x, y, z, r, g, b, v, sA, pA) {
    this.petals = {
      x1: 0,
      y1: 15,
      x2: 0,
      y2: 0,
      x3: 5,
      y3: 10,
      total: 8,
    };
    this.stem = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 60,
    };
    this.arguments = {
      position: createVector(x, y, z),
      velocity: createVector(0, 0, v),
      red: r,
      green: g,
      blue: b,
      stemAngle: sA,
      petalAngle: pA,
    };
    this.acceleration = createVector(0, 0, 0.1);
    this.active = true;
    this.movement = false;
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
      translate(this.arguments.position.x, this.arguments.position.y, this.arguments.position.z);
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
      this.arguments.position.add(this.arguments.velocity);
      if (this.arguments.position.z > height) {
        this.active = false;
      }
    }
  }
}
