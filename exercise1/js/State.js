class State {
  constructor() {
    this.rotationX = 0;
    this.rotationY = 0;
  }

  draw() {
    background(250);
    this.display();
    this.text();
  }

  text() {

  }

  display() {

    for (let i = 0; i < flowers.length; i++) {
      let flower = flowers[i];
      flower.drawFlower();
      flower.levitate();
      if (!flower.active) {
        flowers.splice(i, 1);
      }
    }
  }

  keyPressed() {
    let flower = random(flowers);
    flower.movement = true;
    console.log(flowers.length);
  }
}
