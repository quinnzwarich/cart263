class Title extends State {
  constructor() {
    super();
  }

  draw() {
    background(250);
    super.draw();
  }

  // each string is mapped onto one half of a torus (it only displays on one half for some reason)
  // this has led to a bug where the text that must be rotated flashes as soon as the user changes the camera's perspective
  // I don't mind this all too much as it adds to the effect of the text functioning as the rings of the planet as well as information
  text() {
    this.outerRing += 0.01;
    this.innerRing += 0.02;

    push();
    stanza1.fill(0, 127, 255);
    stanza1.textFont(grotesk);
    stanza1.textSize(10);
    stanza1.text(`Somewhere on this planet`, 0, 0);
    rotate(this.outerRing);
    texture(stanza1);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza2.fill(0, 127, 255);
    stanza2.textFont(grotesk);
    stanza2.textSize(10);
    stanza2.text(`You'll find a wishing star`, 0, 0);
    rotate(33 * PI/32);
    rotate(this.outerRing);
    texture(stanza2);
    torus(800, 400, 24, 2);
    pop();

    push();
    stanza3.fill(0, 127, 255);
    stanza3.textFont(grotesk);
    stanza3.textSize(10);
    stanza3.text(`wish upon its place of rest`, 0, 0);
    rotate(this.innerRing);
    texture(stanza3);
    torus(700, 400, 24, 2);
    pop();

    push();
    stanza4.fill(0, 127, 255);
    stanza4.textFont(grotesk);
    stanza4.textSize(10);
    stanza4.text(`and surely you'll go far`, 0, 0);
    rotate(17 * PI/16);
    rotate(this.innerRing);
    texture(stanza4);
    torus(700, 400, 24, 2);
    pop();
  }

  // selected flowers will bob in place
  // if the spacebar is pressed, the current flower will shake to indicate this
  // if the spacebar is pressed while the star is selected, this will trigger the ending state
  flowrs() {
    for (let i = 0; i < TOTAL + 1; i++) {
      for (let j = 0; j < TOTAL + 1; j++) {
        let flower = flowrs[i][j];
        flower.display();
        flower.states();
        if (i === this.selectedI &&
            j === this.selectedJ) {
          flower.state = `bobbing`;
          if (spacebar) {
            flower.state = `selected`;
            if (flower.id) {
              currentState = new End();
              correctfx.play();
            }
          }
        }
        else {
          flower.state = `still`;
        }
      }
    }
  }

  // begins with camera overlooking the planet so the user can read the text
  // after this point the camera snaps toward each selected flower
  perspective() {
    let vector = globeCopy[this.selectedI][this.selectedJ];
    let vantage = p5.Vector.mult(vector, this.zoom);

    vecPositions.push(vector);
    if (vecPositions.length > MAX_POSITIONS) {
      vecPositions.shift();
    }
    vanPositions.push(vantage);
    if (vanPositions.length > MAX_POSITIONS) {
      vanPositions.shift();
    }

    let interVector = p5.Vector.lerp(vecPositions[0], vecPositions[1], 0.1, vecPositions[0]);
    let interVantage = p5.Vector.lerp(vanPositions[0], vanPositions[1], 0.1, vanPositions[0]);

    cam.setPosition(interVantage.x, interVantage.y, interVantage.z);
    cam.lookAt(interVector.x, interVector.y, interVector.z);
  }

  // responsible for playing sound effects
  // all sound effects were made using BeepBox
  keyReleased() {
    super.keyReleased();

    if (keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === DOWN_ARROW) {
      bobfx.play();
      this.zoom = 2;
    }

    if (keyCode === 32) {
      selectfx.play();
      this.zoom = 2;
    }
  }

  keyPressed() {
    super.keyPressed();
  }
}
