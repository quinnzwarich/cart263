/**
I know it's a little sad that this went unused but it will be eventually.
I had the idea to use it to animate the phrase 'do you want to keep going'
but I feel that I've run out of time to implement to my liking.

Many a regretful decisions have been made. 
*/
class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, -1);
    // this.velocity.setMag(random(1.5, 2.5 ));
    this.acceleration = createVector();
    this.maxForce = 0.05;
    this.maxSpeed = 3;
    this.perception = 200;
    this.radius = 10;
    this.fov = radians(115);
    this.fovCCW = createVector(
      cos(this.fov / 2) * this.perception,
      sin(this.fov / 2) * this.perception
    );
    this.fovCW = createVector(
      cos(-this.fov / 2) * this.perception,
      sin(-this.fov / 2) * this.perception
    );
    this.fovArray = [
      this.position,
      this.fovCCW,
      this.fovCW
    ];
  }

  edges() {
    // console.log("edges()")
    if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }
    else if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
    }
    else if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    }
    else if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
    }
  }

  separate(boids) {
    let count = 0;
    let steer = createVector(0, 0);

    for (let i = 0; i < boids.length; i++) {
      let distance = p5.Vector.dist(this.position, boids[i].position);

      if (distance > 0 && distance < this.perception) {
        let difference = p5.Vector.sub(this.position, boids[i].position);
        difference.normalize();
        difference.div(distance);
        steer.add(difference);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    let count = 0;
    let sum = createVector(0, 0);

    for (let i = 0; i < boids.length; i++) {
      let distance = p5.Vector.dist(this.position, boids[i].position);

      if (distance > 0 && distance < this.perception) {
        sum.add(boids[i].velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);

      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let count = 0;
    let sum = createVector(0, 0);
    for (let i = 0; i < boids.length; i++) {
      let distance = p5.Vector.dist(this.position, boids[i].position);

      if (distance > 0 && distance < this.perception) {
        sum.add(boids[i].position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);

    desired.normalize();
    desired.mult(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids, user) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let viewGeese = this.viewGeese(boids);

    separation.mult(1.75);
    alignment.mult(1.5);
    cohesion.mult(1.25);
    viewGeese.mult(2);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(viewGeese);
  }

  update() {
    this.velocity.add(this.acceleration);

    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  show() {
    // rotate fov
    let theta = this.velocity.heading();
    // goose visualized
    push();
    fill(127);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius);
    pop();
    // fov visualized
    push();
    fill(127, 32);
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(theta);
    triangle(
      0,
      0,
      this.fovCCW.x,
      this.fovCCW.y,
      this.fovCW.x,
      this.fovCW.y
    );
    pop();
  }
}
