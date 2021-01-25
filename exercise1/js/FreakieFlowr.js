class FreakieFlowr extends Flowr {
  constructor(x, y, z, r, g, b, lat, lon, r2, g2, b2) {
    super(x, y, z, r, g, b, lat, lon);
    this.red2 = r2;
    this.green2 = g2;
    this.blue2 = b2;
    this.radius1 = 7.5;
    this.radius2 = 22.5;
    this.numPoints = 5;
    this.angle = (2 * PI) / this.numPoints;
    this.halfAngle = this.angle / 2;
    this.id = true;
  }

  petals() {
    push();
    translate(this.v2);
    for (let i = 0; i < 2 * PI; i += this.angle) {
      let sx = cos(i) * this.radius2;
      let sy = sin(i) * this.radius2;
      strokeWeight(0.5);
      stroke(this.red, this.green, this.blue);
      fill(this.red, this.green, this.blue);
      beginShape();
      vertex(sx, sy, 0);
      vertex(0, 0, 15);
      sx = cos(i + this.halfAngle) * this.radius1;
      sy = sin(i + this.halfAngle) * this.radius1;
      vertex(sx, sy, 0);
      endShape(CLOSE);
    }
    for (let i = 0; i < 2 * PI; i += this.angle) {
      let sx = cos(i) * this.radius2;
      let sy = sin(i) * this.radius2;
      strokeWeight(0.5);
      stroke(this.red2, this.green2, this.blue2);
      fill(this.red2, this.green2, this.blue2);
      beginShape();
      vertex(sx, sy, 0);
      vertex(0, 0, -15);
      sx = cos(i + this.halfAngle) * this.radius1;
      sy = sin(i + this.halfAngle) * this.radius1;
      vertex(sx, sy, 0);
      endShape(CLOSE);
    }
    pop();
  }
}
